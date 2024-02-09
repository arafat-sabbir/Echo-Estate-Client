import useAxiosSecure from "../../../../../Hooks/AxiosSecure/useAxiosSecure";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import Loading from "../../../../../Components/Loading/Loading";
import useReview from "../../../../../Hooks/UseReview/useReview";
import SectionTitle from "../../../../../Utils/SectionTitle/SectionTitle";

const ManageReviews = () => {
  const axiosSecure = useAxiosSecure();
  const {reviews,refetch,isLoading }  = useReview()
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#0e3c49da",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const tid = toast.loading("Deleting Review");
        axiosSecure.delete(`/delete-review/${id}`).then((res) => {
          console.log(res.data);
          if (res.data.deletedCount > 0) {
            toast.success("Review Deleted", { id: tid });
            refetch();
          }
        });
      }
    });
  };
  if (isLoading) {
    return <Loading></Loading>;
  }
  return (
  <>
    <div className="container mx-auto">
      <div className="ml-10">
      <SectionTitle title={"User Review"} subtitle={"Manage ALl The Review Made By User"}></SectionTitle>
      </div>
      <div className="grid grid-cols-1 justify-center ml-5 md:ml-0 justify-items-center  lg:grid-cols-3 w-[90vw] lg:w-auto mx-auto">
        {reviews.map((item) => (
          <div
            key={item._id}
            className="w-full h-[250px] max-w-md px-8 relative  py-4 mt-16 bg-white border border-dashed border-main rounded-lg shadow-lg dark:bg-gray-800"
          >
            <div className="flex justify-center -mt-16 md:justify-end">
              <img
                src={item.reviewerPhoto}
                className="object-cover w-20 h-20 border-2 border-main rounded-full dark:border-blue-400"
                alt=""
              />
            </div>

            <h2 className="text-sm mb-2 font-semibold text-gray-800 dark:text-white md:mt-0">
              {item.reviewDate}
            </h2>
            <h2 className="mt-2 text-xl font-semibold text-gray-800 dark:text-white md:mt-0">
              {item.propertyTitle}
            </h2>

            <p className="mt-2 text-sm text-gray-600 dark:text-gray-200">
              {item.review}
            </p>

            <div className="flex justify-between items-center mt-6 mb-3 absolute bottom-2 left-0 right-0 mx-10 ">
              <button
                onClick={() => handleDelete(item._id)}
                className="flex justify-center items-center gap-2 w-12 h-12 cursor-pointer rounded-full shadow-2xl text-white font-semibold bg-gradient-to-r from-[#fb7185] via-[#e11d48] to-[#be123c] hover:shadow-xl hover:shadow-red-500 hover:scale-105 duration-300 hover:from-[#be123c] hover:to-[#fb7185]"
              >
                <MdDelete></MdDelete>
              </button>
              <p
                className="text-lg font-medium  dark:text-blue-300"
                tabIndex="0"
              >
                Agent : <span className="text-main">{item.agentName}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </>
  );
};

export default ManageReviews;
