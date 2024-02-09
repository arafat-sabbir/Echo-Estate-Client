import { MdDelete } from "react-icons/md";

const ReviewCard = ({ item, handleDelete }) => {
  return (
    <div className="w-full max-w-md px-8 py-4 mt-16 relative bg-white h-[250px] border border-dashed border-main rounded-lg shadow-lg dark:bg-gray-800">
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

      <div className="flex justify-between items-center mt-6 mb-3 absolute bottom-2 right-0 left-0 px-10 ">
        <p
          className="text-lg font-medium  dark:text-blue-300"
          tabIndex="0"
        >
         Agent :  <span className="text-main">{item.agentName}</span>
        </p>
        <button
          onClick={() => handleDelete(item._id)}
          className="flex justify-center items-center gap-2 w-12 h-12 cursor-pointer rounded-full shadow-2xl text-white font-semibold bg-gradient-to-r from-[#fb7185] via-[#e11d48] to-[#be123c] hover:shadow-xl hover:shadow-red-500 hover:scale-105 duration-300 hover:from-[#be123c] hover:to-[#fb7185]"
        >
          <MdDelete></MdDelete>
        </button>
      </div>
    </div>
  );
};

export default ReviewCard;
