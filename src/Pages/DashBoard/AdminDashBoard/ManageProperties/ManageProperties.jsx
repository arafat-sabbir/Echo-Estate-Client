import useProperties from "../../../../../Hooks/GetProperties/useProperties";
import { MdOutlineCancel } from "react-icons/md";
import { FaCheck } from "react-icons/fa6";
import useAxiosSecure from "../../../../../Hooks/AxiosSecure/useAxiosSecure";
import toast from "react-hot-toast";
import Loading from "../../../../../Components/Loading/Loading";
import SectionTitle from "../../../../../Utils/SectionTitle/SectionTitle";

const ManageProperties = () => {
  // Get all the property
  const { properties, refetch, isLoading } = useProperties();
  const axiosSecure = useAxiosSecure();
  // Verify a Property For Showing On the All Property Page
  const handleVerifyProperty = (id) => {
    axiosSecure.patch(`/updateStatus/${id}?status=verified`).then((res) => {
      console.log(res.data);
      if (res.data.modifiedCount > 0) {
        refetch();
        toast.success("Property Verified Successfully");
      }
    });
  };
// Reject a Property
  const handleRejectProperty = (id) => {
    axiosSecure.patch(`/updateStatus/${id}?status=rejected`).then((res) => {
      console.log(res.data);
      if (res.data.modifiedCount > 0) {
        refetch();
        toast.success("Property Rejected Successfully");
      }
    });
  };
  if (isLoading) {
    return <Loading></Loading>;
  }
  return (
    <div className="flex flex-col">
     <div className="ml-16">
      <SectionTitle title={"Manage Properties"} subtitle={"Manage Property Added By Agent"}> </SectionTitle>
     </div>
        <div>
          <div className="lg:container mx-auto w-[98vw]">
                <div className="overflow-x-auto border-2 p-4 rounded-xl">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead>
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                        >
                          Property Title
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                        >
                          Property Location
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                        >
                          Agent Name
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                        >
                          Agent Email
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                        >
                          Price Range
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase"
                        >
                          Verify
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase"
                        >
                          Reject
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {properties?.map((item) => (
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
                          <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                            {item.propertyVerificationStatus === "verified" ? (
                              <p className="uppercase">
                                {item.propertyVerificationStatus}
                              </p>
                            ) : item.propertyVerificationStatus ===
                              "rejected" ? (
                              <p className="uppercase">
                                {item.propertyVerificationStatus}
                              </p>
                            ) : (
                              <button
                                onClick={() => handleVerifyProperty(item._id)}
                                type="button"
                                className="px-3 py-3 z-50 justify-center items-center gap-2 cursor-pointer rounded-full shadow-2xl text-white font-semibold bg-[#17645a] hover:shadow-xl hover:shadow-[#072730da] hover:scale-110 duration-300"
                              >
                                <FaCheck />
                              </button>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                            {item.propertyVerificationStatus === "rejected" ? (
                              <p className="uppercase">
                                {item.propertyVerificationStatus}
                              </p>
                            ) : item.propertyVerificationStatus ===
                              "verified" ? (
                              <p className="uppercase">
                                {item.propertyVerificationStatus}
                              </p>
                            ) : (
                              <button
                                onClick={() => handleRejectProperty(item._id)}
                                type="button"
                                className="px-3 py-3 z-50 justify-center items-center gap-2 cursor-pointer rounded-full shadow-2xl text-white font-semibold bg-red-500 hover:shadow-xl hover:shadow-red-500 hover:scale-110 duration-300"
                              >
                                <MdOutlineCancel />
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
    </div>
  );
};

export default ManageProperties;
