import { loadStripe } from "@stripe/stripe-js";
import useAuth from "../../../../../Auth/UseAuth/useAuth";
import { Elements } from "@stripe/react-stripe-js";
import PaymentCheakout from "./PaymentCheakout";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../../Hooks/AxiosSecure/useAxiosSecure";
import { useParams } from "react-router-dom";
import Loading from "../../../../../Components/Loading/Loading";
const MakePayment = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { id } = useParams();
  const { data: PaymentData, isLoading } = useQuery({
    queryKey: ["paymentData"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/getOfferData/${id}`);
      return res.data;
    },
  });
  const price = PaymentData?.offerredPriceRange;
  if (isLoading) {
    return <Loading></Loading>;
  } else {
    console.log(price);
    const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK);
    return (
      <div>
        <h3 className="text-3xl font-semibold text-center mt-60">
          {" "}
          <span className="text-main font-bold">{user.displayName}</span> Pay $
          <span className="text-main">{price}</span> For Your Purchase
        </h3>
        <div>
          <Elements stripe={stripePromise}>
            <PaymentCheakout id={id} price={price}></PaymentCheakout>
          </Elements>
        </div>
      </div>
    );
  }
};

export default MakePayment;
