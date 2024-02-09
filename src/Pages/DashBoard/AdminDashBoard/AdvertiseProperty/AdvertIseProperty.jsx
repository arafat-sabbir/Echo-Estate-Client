import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../../Hooks/AxiosSecure/useAxiosSecure";
import { FaCheck } from "react-icons/fa6";
import { MdOutlineCancel } from "react-icons/md";
import toast from "react-hot-toast";
import Loading from "../../../../../Components/Loading/Loading";
import useAdvertise from "../../../../../Hooks/useAdvertise/useAdvertise";
import useProperties from "../../../../../Hooks/GetProperties/useProperties";
import SectionTitle from "../../../../../Utils/SectionTitle/SectionTitle";

const AdvertiseProperty = () => {
  const axiosSecure = useAxiosSecure();
  const {
    advertise: advertisedProperty,
    isLoading: loading,
    refetch: retry,
  } = useAdvertise();
  const { properties } = useProperties();
  const {
    data: advertise = [],
    refetch,
    isLoading: isQueryLoading,
  } = useQuery({
    queryKey: ["advertise", properties],
    queryFn: async () => {
      const res = await axiosSecure.get("/getVerifiedProperty");
      return res.data;
    },
  });
// Advertise A Property
  const handleAdvertiseProperty = (id) => {
    if (advertisedProperty?.length > 5) {
      return toast.error("Can't advertise more than 6 properties");
    }
    axiosSecure.patch(`/updateAdvertise/${id}?advertiseStatus=advertise`).then((res) => {
      if (res.data.modifiedCount > 0) {
        refetch();
        toast.success("Property Advertised Successfully");
        retry();
      }
    });
  };

  const handleDisAdvertiseProperty = (id) => {
    axiosSecure.patch(`/updateAdvertise/${id}?advertiseStatus=disadvertise`).then((res) => {
      if (res.data.modifiedCount > 0) {
        refetch();
        toast.success("Property DisAdvertised Successfully");
        retry();
      }
    });
  };

  if (loading || isQueryLoading) {
    return <Loading />;
  }

  return (
   <div className="flex flex-col">
     <div className="mt-10 ml-16">
     <SectionTitle title={"AdverTise Property"} subtitle={"Advertise Property To Home Page"}></SectionTitle>

     </div>
     <div className="lg:container mx-auto w-[98vw]">
        <div className="overflow-x-auto border-2 p-4 rounded-xl">
          <table className="divide-y  w-full divide-gray-200 dark:divide-gray-700">
            <thead>
              <tr>
                <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">
                  Property Title
                </th>
                <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">
                  Property Location
                </th>
                <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">
                  Agent Name
                </th>
                <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">
                  Agent Email
                </th>
                <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">
                  Price Range
                </th>
                <th className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase">
                  Advertise
                </th>
                <th className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase">
                  DisAdvertise
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {advertise?.map((item) => (
                <tr key={item._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                    {item.propertyTitle}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                    {item.propertyLocation}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                    {item.agentName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                    {item.agentEmail}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                    ${item.minPrice}-${item.maxPrice}
                  </td>
                  <td className="py-4 whitespace-nowrap text-end text-sm font-medium">
                    {item.advertiseStatus !== "advertise" && (
                      <button
                        onClick={() => handleAdvertiseProperty(item._id)}
                        type="button"
                        className="px-3 py-3 flex z-50 items-center gap-2 cursor-pointer rounded-full shadow-2xl text-white font-semibold bg-[#17645a] hover:shadow-xl hover:shadow-[#072730da] hover:scale-110 duration-300"
                      >
                        <FaCheck />
                        Advertise
                      </button>
                    )}
                  </td>
                  <td className="py-4 whitespace-nowrap text-end text-sm font-medium">
                    {item.advertiseStatus !== "disadvertise" && (
                      <button
                        onClick={() => handleDisAdvertiseProperty(item._id)}
                        type="button"
                        className="px-3 py-3 z-50 flex items-center gap-2 cursor-pointer rounded-full shadow-2xl text-white font-semibold bg-red-500 hover:shadow-xl hover:shadow-red-500 hover:scale-110 duration-300"
                      >
                        <span>
                          <MdOutlineCancel />
                        </span>
                        Disadvertise
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

     </div>
      </div>
  );
};

export default AdvertiseProperty;
