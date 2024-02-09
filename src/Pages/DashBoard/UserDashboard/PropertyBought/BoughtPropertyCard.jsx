import { AiOutlineDollar } from "react-icons/ai";
import { FaLocationDot } from "react-icons/fa6";
import { Link } from "react-router-dom";
import PropTypes from "prop-types"

const BoughtPropertyCard = ({ item }) => {
  const {
    propertyImage,
    propertyTitle,
    propertyLocation,
    offerredPriceRange,
    offerStatus,
    agentName,
    _id,
    transactionId,
  } = item;
  return (
    <div>
      <div>
        <div className="cursor-pointer rounded-xl bg-white p-3 shadow-[0_0_20px_#E6E6E6] duration-300 hover:shadow-[0_0_10px_#FF5B22]  mx-auto">
          <div className="relative flex  items-end overflow-hidden rounded-xl  object-fill">
            <img src={propertyImage} alt="wallpaper" className="min-w-full max-h-[255px]" />
          </div>

          <div className="mt-1 p-2">
            <div className="flex justify-between">
              <h2 className="text-slate-700 text-lg font-semibold mb-2">
                {propertyTitle}
              </h2>
              <p className="font-semibold text-sm">
                Status :<span className="uppercase text-main">{offerStatus}</span>
              </p>
            </div>
            <div className="flex justify-between">
              <p>
                <span className="text-lg font-bold text-orange-500">
                  ${offerredPriceRange}
                </span>
                <span className="text-sm text-slate-400">/Offered-Price</span>
              </p>
              <p className="mt-1 text-sm text-slate-600 font-semibold flex gap-2">
                <FaLocationDot className="text-xl text-black"></FaLocationDot>
                {propertyLocation}
              </p>
            </div>

            <div className="mt-3 flex items-center justify-between">
              <p className="font-semibold">
                Agent : <span className="text-main">{agentName}</span>
              </p>
              <div className=" flex justify-end items-center">
                {offerStatus === "accepted" && (
                  <Link to={`/dashboard/makePayment/${_id}`}>
                    <button
                      className="relative px-1 text-sm py-1 flex items-center  bg-main text-white  isolation-auto z-10 border rounded-full border-dashed border-main
                  before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-right-full before:hover:right-0 before:rounded-full  before:bg-[#072730] hover:text-white before:-z-10  before:aspect-square before:hover:scale-150 overflow-hidden before:hover:duration-700"
                    >
                      {" "}
                      <span className="mr-1  text-xl">
                        <AiOutlineDollar />
                      </span>{" "}
                      Pay Now
                    </button>
                  </Link>
                )}
                {
                  offerStatus === "bought" && <p className="text-xs font-semibold">Tid : <span className="text-main">{transactionId}</span></p>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoughtPropertyCard;
BoughtPropertyCard.propTypes = {
  item:PropTypes.obj,
}