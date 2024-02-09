import { FaLocationDot } from "react-icons/fa6";
import Button from "../../../Shared/Button";
import { Link } from "react-router-dom";
import {PropTypes} from "prop-types"

const PropertyCard = ({ property }) => {
    const {agentImage,agentName,agentEmail,propertyImage,propertyLocation,propertyTitle,minPrice,maxPrice,_id}  = property;
  return (
    <>
      <div className="flex  lg:h-[660px] flex-col max-w-lg p-6 space-y-6 overflow-hidden rounded-lg shadow-[0_0_10px_#BFBFBF]  lg:w-[480px] w-[400px] text-black">
        <div className="flex space-x-4">
         <Link to={`/agentProfile/${agentEmail}`}>
         <img
            alt=""
            src={agentImage}
            className="object-cover w-12 h-12 rounded-full shadow bg-gray-500 "
          />
         </Link>
          <div className="flex flex-col space-y-1">
            <a
              rel="noopener noreferrer"
              href="#"
              className="text-sm font-semibold"
            >
              {agentName}
            </a>
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
           
            
          </div>
         <div className="flex justify-between mt-2">
         <p className="text-md font-medium text-black">Price Range : <span className="font-bold">${minPrice}-${maxPrice}</span></p>
         <h1 className="text-sm flex justify-center items-center">
              <FaLocationDot className="text-xs text-main"></FaLocationDot>
              <span className="ml-1 text-xs">{propertyLocation}</span>
            </h1>
         </div>
        </div>
        <Link to={`/propertyDetail/${_id}`} className="flex justify-end">
          <Button title={"See Detail"}></Button>
        </Link>
      </div>
    </>
  );
};

export default PropertyCard;

PropertyCard.propTypes = {
  property: PropTypes.obj
}