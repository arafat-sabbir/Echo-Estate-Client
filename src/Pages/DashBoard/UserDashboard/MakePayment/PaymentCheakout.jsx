import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../../../Hooks/AxiosSecure/useAxiosSecure";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../../Utility/Hooks/useAuth";

const PaymentCheakout = ({ price, id }) => {
  const stripe = useStripe();
  const navigate = useNavigate();
  const [transactionId, settransactionId] = useState();
  const { user } = useAuth();
  const [clientSecret, setClientSecret] = useState(null);
  const axiosSecure = useAxiosSecure();
  const elements = useElements();
  useEffect(() => {
    axiosSecure.post("/createPaymentIntent", { price }).then((res) => {
      setClientSecret(res.data.clientSecret);
    });
  }, [axiosSecure, price]);
  const handleCheakoutSubmit = async (e) => {
    e.preventDefault();
    const toastid = toast.loading("Making Payment");
    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);
    if (card == null) {
      return;
    }
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    if (error) {
      return toast.error(error.message, { id:toastid});
    } else {
      console.log("payment Method", paymentMethod);
    }

    const { error: ConfirmError, paymentIntent } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: user?.displayName || "anonymous",
            email: user?.email || "anonymous",
          },
        },
      });
    if (ConfirmError) {
      return toast.error(
        ConfirmError.message,
        {
          style: {
            border: "1px solid #FF5B22",
            padding: "16px",
            color: "#000000",
          },
          iconTheme: {
            primary: "#d33",
            secondary: "#FFFAEE",
          },
        },
        { id: toastid }
      );
    } else {
      console.log("payment intent", paymentIntent);
    }
    if (paymentIntent?.status === "succeeded") {
      console.log(paymentIntent.id);
      settransactionId(paymentIntent.id);
      const updateDoc = {
        status: "bought",
        transactionId: paymentIntent.id,
        payment: "completed",
      };
      axiosSecure
        .patch(`/updateOfferStatus/${id}`, updateDoc)
        .then((res) => console.log(res.data));
      toast.success("Payment successful", { id: toastid });
      navigate("/dashboard/propertyBought");
    }
  };
  return (
    <div className="w-1/2 mx-auto mt-16 shadow-[0_0_10px_#FF573B] p-10 rounded-2xl ">
      <form onSubmit={handleCheakoutSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "20px",
                color: "#424770",
                "::placeholder": {
                  color: "#FF5B22",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <div className="flex justify-center mt-10">
          <button
            type="submit"
            disabled={!stripe || !clientSecret}
            className="relative px-8 py-2  bg-main text-white  isolation-auto z-10 border rounded-full border-dashed border-main 
            before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-right-full before:hover:right-0 before:rounded-full  before:bg-[#072730] hover:text-white before:-z-10  before:aspect-square before:hover:scale-150 overflow-hidden before:hover:duration-700"
          >
            Pay Now
          </button>
        </div>
      </form>
    </div>
  );
};

export default PaymentCheakout;
