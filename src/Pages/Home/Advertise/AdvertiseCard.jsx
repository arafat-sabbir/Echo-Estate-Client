import { FaCheck, FaLocationDot } from "react-icons/fa6";
import { MdOutlineVerified } from "react-icons/md";
import { Link } from "react-router-dom";

const AdvertiseCard = ({ item }) => {
  const { propertyImage,minPrice,maxPrice,propertyTitle,propertyLocation,propertyVerificationStatus,_id } = item;
  return (
    <>
      <div className="flex flex-col items-center justify-center w-full max-w-2xl mx-auto">
        <div
          className="w-full h-96 bg-gray-300 bg-center bg-cover rounded-lg shadow-md"
          style={{ backgroundImage: `url(${propertyImage})` }}
        ></div>
        <div className="w-80 -mt-16 overflow-hidden bg-[#F2FFE9] rounded-lg shadow-lg md:w-[450px] dark:bg-gray-800">
          <h3 className="py-2 font-bold text-sm tracking-wide text-center text-gray-800 uppercase dark:text-white">
            {propertyTitle}
          </h3>

          <div className="flex items-center justify-between px-3 py-2 bg-gray-200 dark:bg-gray-700">
            <span className="font-semibold text-gray-800 dark:text-gray-200">
              Price : ${minPrice}-${maxPrice}
            </span>
            <button className="flex items-center">
            <MdOutlineVerified className="text-green-500 text-xl"></MdOutlineVerified> <span className="ml-[2px] font-semibold">{propertyVerificationStatus}</span>
            </button>
          </div>
          <div className="flex items-center justify-between px-3 py-2 bg-gray-200 dark:bg-gray-700">
            <span className="font-bold text-gray-800 dark:text-gray-200 flex items-center">
            <FaLocationDot></FaLocationDot> <span className="ml-1">{propertyLocation}</span>
            </span>
            <Link to={`propertyDetail/${_id}`}>
            <button className="relative px-2 text-sm py-1  bg-[#072730] text-white  isolation-auto z-10 border rounded-full border-dashed border-main 
            before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-right-full before:hover:right-0 before:rounded-full  before:bg-main hover:text-white before:-z-10  before:aspect-square before:hover:scale-150 overflow-hidden before:hover:duration-700">
              View Detail
            </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdvertiseCard;
