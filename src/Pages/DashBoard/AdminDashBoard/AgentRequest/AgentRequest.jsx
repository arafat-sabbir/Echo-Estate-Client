import toast from "react-hot-toast";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../../Hooks/AxiosSecure/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../../../Components/Loading/Loading";
import SectionTitle from "../../../../../Utils/SectionTitle/SectionTitle";
const AgentRequest = () => {
  const {
    data: users = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["getUserinfo"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/agentReq`);
      return res.data;
    },
  });
  const axiosSecure = useAxiosSecure();
  // Make a User Agent
  const handleMakeAgent = (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You Want to Make The User Agent!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#0e3c49da",
      confirmButtonText: "Yes, Make Agent!",
    }).then((result) => {
      if (result.isConfirmed) {
        const swal = toast.loading("Making User Agent");
        axiosSecure.patch(`/changeRole/${user._id}?role=agent`).then((res) => {
          if (res.data.modifiedCount > 0) {
            refetch();
            toast.success(`${user.name} is a Agent Now`, { id: swal });
          }
        });
      }
    });
  };
  if (isLoading) {
    return <Loading></Loading>;
  }
  console.log(users.length);
  console.log(users);
  return (
    <>
    {
      users?.length<1&&
      <div className="flex flex-col justify-items-center  h-screen justify-center items-center w-[80vw]">
        <img
          className="mx-auto"
          src="https://i.ibb.co/PFzsmpn/icons8-404-restricted-web-page-on-internet-browser-layout-100.png"
          alt=""
        />
        <h3 className="text-3xl font-semibold text-center text-main">
          No Agent Request
        </h3>
      </div>
    }
        <div>
          <div className="container mx-auto">
            <SectionTitle
              title={"Make Agent"}
              subtitle={"Mange All The Agent Request Made By User"}
            ></SectionTitle>
          </div>
          <div className="lg:container mx-auto w-[98vw]">
                <div className="overflow-x-auto border-2 p-4 rounded-xl">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead>
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                        >
                          User Name
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                        >
                          User Email
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                        >
                          User Role
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                        >
                          Requested Role
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                        >
                          Make Agent
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {users?.map((item) => (
                       item.role === "agent"|| <tr key={item._id}>
                       <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                         {item.name}
                       </td>
                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                         {item.email}
                       </td>
                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                         <h3 className="uppercase">{item.role}</h3>
                       </td>
                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                         <h3 className="uppercase">AGENT</h3>
                       </td>
                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                         <button
                           className="flex shadow-2xl justify-center items-center gap-2 w-24 h-8 cursor-pointer rounded-2xl  text-white font-semibold bg-gradient-to-r from-[#072730] via-[#0e3c49da] to-[#0a3a47da] hover:shadow-xl hover:shadow-[#072730] hover:scale-105 duration-300 hover:from-[#072730da] hover:to-[#072730da]"
                           onClick={() => handleMakeAgent(item)}
                         >
                           Make Agent
                         </button>
                       </td>
                     </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
    </>
  );
};

export default AgentRequest;
