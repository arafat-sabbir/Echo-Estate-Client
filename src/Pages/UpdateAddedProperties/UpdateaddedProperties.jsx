import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import Container from "../../../Utils/Container/Container";
import useAxiosPublic from "../../../Hooks/AxiosPublic/useAxiosPublic";
import { FaLocationDot } from "react-icons/fa6";
import useAxiosSecure from "../../../Hooks/AxiosSecure/useAxiosSecure";
import { useEffect } from "react";
import axios from "axios";
import SectionTitle from "../../../Utils/SectionTitle/SectionTitle";

const UpdateaddedProperties = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  const property = useLoaderData();
  const navigate = useNavigate();
  const {
    agentName,
    propertyImage,
    propertyLocation,
    propertyTitle,
    minPrice,
    maxPrice,
    _id,
    agentEmail,
  } = property;
  const imageHostingKey = import.meta.env.VITE_IMAGE_HOST_KEY;
  const axiosSecure = useAxiosSecure();
  const imageHostingAPi = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (item) => {
    const toastid = toast.loading("Updating Property");
    const imagefile = { image: item?.photoUrl[0] };
    const res = await axios.post(imageHostingAPi, imagefile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    const updateData = {
      propertyImage: res.data.data.display_url,
      propertyTitle: item.propertyTitle,
      propertyLocation: item.propertyLocation,
      minPrice:item.minPrice,
      maxPrice:item.maxPrice,
    };
    axiosSecure.patch(`/updateProperty/${_id}`, updateData).then((res) => {
      console.log(res.data);
      if (res.data.modifiedCount > 0) {
        toast.success("Updated Property Successfully", { id: toastid });
        navigate("/dashboard/addedProperties");
      }
    });
  };
  return (
    <div>
      <Container>
       <div className="ml-8 -mt-1">
       <SectionTitle title={'Update Property'} subtitle={"Update Your Existing Added Property"}></SectionTitle>
       </div>
        <div className="flex gap-8">
          <div className="cursor-pointer rounded-xl bg-white p-3 shadow-[0_0_20px_#E6E6E6] hover:shadow-[0_0_10px_#FF5B22] w-[640px] h-[550px] mx-auto">
            <div className="relative flex items-end overflow-hidden rounded-xl">
              <img src={propertyImage} alt="wallpaper" />
            </div>

            <div className="mt-1 p-2">
              <h2 className="text-slate-700 text-xl font-semibold mb-2">
                {propertyTitle}
              </h2>
              <p className="mt-1 text-sm text-slate-600 font-semibold flex gap-2">
                <FaLocationDot className="text-xl text-black"></FaLocationDot>
                {propertyLocation}
              </p>

              <div className="mt-3 flex items-end justify-between">
                <p>
                  <span className="text-lg font-bold text-orange-500">
                    ${minPrice}-${maxPrice}
                  </span>
                  <span className="text-sm text-slate-400">/Price</span>
                </p>
              </div>
            </div>
          </div>
          <div className="shadow-[0_0_20px_#E6E6E6] rounded-xl w-1/2 mx-auto">
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Photo</span>
                </label>
                <input
                  type="file"
                  className="file-input file-input-bordered file-input-error w-full border-dashed"
                  {...register("photoUrl", { required: true })}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Property Title</span>
                </label>
                <input
                  type="text"
                  defaultValue={propertyTitle}
                  name="title"
                  required
                  className="input input-bordered bg-white border-dashed border-main focus:border-main"
                  {...register("propertyTitle", { required: true })}
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
                  className="input input-bordered bg-white border-dashed border-main focus:border-main"
                  {...register("propertyLocation", { required: true })}
                />
                {errors.propertyLocation && (
                  <p className="text-red-500 mt-4">
                    Please Add Property Location
                  </p>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Min Price</span>
                </label>
                <input
                  type="text"
                  defaultValue={minPrice}
                  name="location"
                  className="input input-bordered bg-white border-dashed border-main focus:border-main"
                  {...register("minPrice", { required: true })}
                />
                {errors.minPrice && (
                  <p className="text-red-500 mt-4">Please Add a minPrice</p>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Max Price</span>
                </label>
                <input
                  type="text"
                  defaultValue={maxPrice}
                  name="location"
                  className="input input-bordered bg-white border-dashed border-main focus:border-main"
                  {...register("maxPrice", { required: true })}
                />
                {errors.maxPrice && (
                  <p className="text-red-500 mt-4">Please Add a MaxPrice</p>
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
                  disabled={true}
                  className="input input-bordered bg-white border-dashed border-main focus:border-main"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Agent Email</span>
                </label>
                <input
                  type="text"
                  placeholder="Property Location"
                  name="location"
                  defaultValue={agentEmail}
                  disabled={true}
                  className="input input-bordered bg-white border-dashed border-main focus:border-main"
                />
              </div>

              <div className="form-control mt-6">
                <button
                  className="relative px-8 py-2  bg-[#072730] text-white  isolation-auto z-10 border rounded-full border-dashed border-main 
    before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-right-full before:hover:right-0 before:rounded-full  before:bg-main hover:text-white before:-z-10  before:aspect-square before:hover:scale-150 overflow-hidden before:hover:duration-700"
                >
                  Update Property
                </button>
              </div>
            </form>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default UpdateaddedProperties;
