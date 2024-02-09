import { FaLocationDot } from "react-icons/fa6";
import { MdDelete, MdOutlinePendingActions } from "react-icons/md";
import { Link } from "react-router-dom";

const WishlistCard = ({ handleDelete, item }) => {
  const {
    agentImage,
    agentName,
    propertyImage,
    propertyTitle,
    propertyLocation,
    minPrice,
    maxPrice,
    propertyVerificationStatus,
    _id,
  } = item;
  return (
    <div>
      <div className="flex flex-col max-w-lg p-6 space-y-6 overflow-hidden rounded-lg shadow-[0_0_5px_#FF573B] border border-dashed border-main  text-black">
        <div className="flex space-x-4">
          <img
            alt=""
            src={agentImage}
            className="object-cover w-12 h-12 rounded-full shadow bg-gray-500 "
          />
          <div className="flex flex-col space-y-1">
            <a
              rel="noopener noreferrer"
              href="#"
              className="text-sm font-semibold"
            >
              {agentName}
            </a>
            <span className="text-xs text-black">
              {Math.floor(Math.random(1, 24) * 10)} hours Ago
            </span>
          </div>
        </div>
        <div>
          <img
            src={propertyImage}
            alt=""
            className="object-cover w-full mb-4 h-60 sm:h-96 bg-gray-500 rounded-xl"
          />
          <div className="mb-1 text-lg font-semibold flex justify-between">
            <h1>{propertyTitle}</h1>
            <h1 className="text-xs flex justify-center items-center">
              <FaLocationDot className="text-xl text-main"></FaLocationDot>
              <span className="ml-1">{propertyLocation}</span>
            </h1>
          </div>
          <div className="flex justify-between mt-2">
            <p className="text-md font-medium text-black">
              Price Range :{" "}
              <span className="font-bold">${minPrice}-${maxPrice}</span>
            </p>
            <p className="text-md font-medium flex justify-center items-center">
              Status :{" "}
              {propertyVerificationStatus == "pending" ? (
                <MdOutlinePendingActions className="ml-1 mr-[2px]"></MdOutlinePendingActions>
              ) : (
                ""
              )}{" "}
              {propertyVerificationStatus}
            </p>
          </div>
        </div>
        <div className="flex justify-between mt-4">
          <Link to={`/dashboard/makeAnOffer/${_id}`}>
            <button className="flex justify-center items-center gap-2 w-32 h-11 cursor-pointer rounded-md shadow-2xl text-white font-semibold bg-gradient-to-r from-[#072730] via-[#072730da] to-[#072730da] hover:shadow-xl hover:shadow-[#072730] hover:scale-105 duration-300 hover:from-[#072730da] hover:to-[#072730da]">
              Make An Offer
            </button>
          </Link>
          <button
            onClick={() => handleDelete(_id)}
            className="flex justify-center items-center gap-2 w-24 h-11 cursor-pointer rounded-md shadow-2xl text-white font-semibold bg-gradient-to-r from-[#fb7185] via-[#e11d48] to-[#be123c] hover:shadow-xl hover:shadow-red-500 hover:scale-105 duration-300 hover:from-[#be123c] hover:to-[#fb7185]"
          >
            <MdDelete></MdDelete>
          </button>
        </div>
      </div>
    </div>
  );
};

export default WishlistCard;
