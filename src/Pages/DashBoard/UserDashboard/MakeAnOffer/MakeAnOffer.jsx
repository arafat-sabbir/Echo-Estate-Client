import { useLoaderData, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../../../Hooks/AxiosSecure/useAxiosSecure";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useEffect } from "react";
import useAuth from "../../../../Utility/Hooks/useAuth";

const MakeAnOffer = () => {
  const wish = useLoaderData();
  const { user } = useAuth();
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  const navigate = useNavigate();
  const {
    agentName,
    propertyImage,
    propertyLocation,
    propertyTitle, 
    minPrice,
    maxPrice,
    agentEmail,
    propertyId,
  } = wish;
  const axiosSecure = useAxiosSecure();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (item) => {
    const toastid = toast.loading("Offering Property");
    const offerData = {
      propertyTitle: propertyTitle,
      propertyLocation: propertyLocation,
      propertyImage: propertyImage,
      minPrice:minPrice,
      maxPrice:maxPrice,
      offerredPriceRange: item.OfferedPrice,
      offerredDate: item.OfferedDate,
      agentName: agentName,
      buyerEmail: user.email,
      buyerName: user.displayName,
      agentEmail: agentEmail,
      offerStatus: "pending",
      propertyId,
    };

    const offeredPrice = parseInt(item.OfferedPrice);
    if (offeredPrice < minPrice || offeredPrice > maxPrice) {
      toast.error("Offered Price Should Be Within Property Price Range", {
        id: toastid,
      });
    } else {
      axiosSecure.post("/addOffer", offerData).then((res) => {
        if (res.data.insertedId) {
          toast.success("Offered The Property SuccessFully", { id: toastid });
          navigate("/dashboard/propertyBought");
        }
      });
    }
  };
  return (
    <div className="mt-9">
      <div className="shadow-[0_0_20px_#E6E6E6] rounded-xl w-1/2 mx-auto ">
        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Property Title</span>
            </label>
            <input
              type="text"
              defaultValue={propertyTitle}
              name="title"
              disabled={true}
              className="input input-bordered bg-white border-dashed border-main focus:border-main"
              {...register("propertyTitle")}
            />
            {errors.propertyTitle && (
              <p className="text-red-500 mt-4">Please Add Property Title</p>
            )}
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Property Location</span>
            </label>
            <input
              type="text"
              defaultValue={propertyLocation}
              name="location"
              disabled={true}
              className="input input-bordered bg-white border-dashed border-main focus:border-main"
              {...register("propertyLocation")}
            />
            {errors.propertyLocation && (
              <p className="text-red-500 mt-4">Please Add Property Location</p>
            )}
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Agent Name</span>
            </label>
            <input
              type="text"
              placeholder="Property Location"
              name="location"
              defaultValue={agentName}
              {...register("agentName")}
              disabled={true}
              className="input input-bordered bg-white border-dashed border-main focus:border-main"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Buyer Name</span>
            </label>
            <input
              type="text"
              name="location"
              disabled={true}
              {...register("buyerName")}
              defaultValue={user.displayName}
              className="input input-bordered bg-white border-dashed border-main focus:border-main"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Buyer Email</span>
            </label>
            <input
              type="text"
              name="location"
              disabled={true}
              {...register("buyerEmail")}
              defaultValue={user.email}
              className="input input-bordered bg-white border-dashed border-main focus:border-main"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Price Range</span>
            </label>
            <input
              type="text"
              defaultValue={`$${minPrice}-$${maxPrice}`}
              name="location"
              disabled={true}
              className="input input-bordered bg-white border-dashed border-main focus:border-main"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">OfferedAmount</span>
            </label>
            <input
              type="text"
              placeholder="Offered Amount"
              name="location"
              {...register("OfferedPrice", { required: true })}
              className="input input-bordered bg-white border-dashed border-main focus:border-main"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Offered Date</span>
            </label>
            <input
              type="date"
              placeholder="Offer Date"
              name="location"
              {...register("OfferedDate", { required: true })}
              className="input input-bordered bg-white border-dashed border-main focus:border-main"
            />
          </div>

          <div className="form-control mt-6">
            <button
              className="relative px-8 py-2  bg-[#072730] text-white  isolation-auto z-10 border rounded-full border-dashed  
    before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-right-full before:hover:right-0 before:rounded-full  before:bg-main hover:text-white before:-z-10  before:aspect-square before:hover:scale-150 overflow-hidden before:hover:duration-700"
            >
              Offer Now
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MakeAnOffer;
