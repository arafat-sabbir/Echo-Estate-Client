import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../../Hooks/AxiosSecure/useAxiosSecure";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { IoWarningOutline } from "react-icons/io5";
import Loading from "../../../../../Components/Loading/Loading";
import useGetUser from "../../../../../Hooks/GetUserInfo/useGetUser";
import SectionTitle from "../../../../../Utils/SectionTitle/SectionTitle";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const { userinfo } = useGetUser();
  const {
    data: users = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/getallUsers");
      return res.data;
    },
  });
  // Make a user admin
  const handleMakeAdmin = (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You Want to Make The User Admin!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#0e3c49da",
      confirmButtonText: "Yes, Make Admin!",
    }).then((result) => {
      if (result.isConfirmed) {
        const swal = toast.loading("Making User Admin");
        axiosSecure.patch(`/changeRole/${user._id}?role=admin`).then((res) => {
          if (res.data.modifiedCount > 0) {
            toast.success(`${user.name} is a Admin Now`, { id: swal });
            refetch();
          }
        });
      }
    });
  };
  // Make a user Agent
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
            toast.success(`${user.name} is a Agent Now`, { id: swal });
            refetch();
          }
        });
      }
    });
  };
  // Make a Agent Fraud
  const handleMakeFraud = (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You Want to Make The User Fraud!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#0e3c49da",
      confirmButtonText: "Yes, Make Fraud!",
    }).then((result) => {
      if (result.isConfirmed) {
        const toastId = toast.loading("Making User Fraud");
        axiosSecure
          .patch(`/makeFraud/${user._id}?role=fraud&&email=${user.email}`)
          .then((res) => {
            if (res.data.modifiedCount > 0) {
              toast.success("Modified User SuccessFully", { id: toastId });
              refetch();
            }
          });
      }
    });
  };
  // Delete a user Data From Database
  const handleDeleteUser = (user) => {
    if (user.email === userinfo.email) {
      return toast.error("Your can't Delete Your own Account");
    }
    Swal.fire({
      title: "Are you sure?",
      text: "You Want To Delete The User!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#0e3c49da",
      confirmButtonText: "Yes, Delete!",
    }).then((result) => {
      if (result.isConfirmed) {
        const swal = toast.loading("Deleting User");
        axiosSecure.delete(`/delete-User/${user._id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            toast.success(`${user.name} Has Been Deleted`, { id: swal });
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
  <div className="flex flex-col">
     <div className="ml-16">
     <SectionTitle
        title={"Manage User"}
        subtitle={"Manage All The User Of Your Site"}
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
                      Make Admin
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                    >
                      Make Agent
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                    >
                      Make As Fraud
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase"
                    >
                      Delete User
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {users?.map((item) => (
                    <tr key={item._id}>
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
                        {item.role !== "admin" ? (
                          item.role !== "fraud" ? (
                            <button
                              className="flex shadow-2xl justify-center items-center gap-2 w-24 h-8 cursor-pointer rounded-2xl  text-white font-semibold bg-gradient-to-r from-[#072730] via-[#0e3c49da] to-[#0a3a47da] hover:shadow-xl hover:shadow-[#072730] hover:scale-105 duration-300 hover:from-[#072730da] hover:to-[#072730da]"
                              onClick={() => handleMakeAdmin(item)}
                            >
                              Make Admin
                            </button>
                          ) : (
                            <p className="flex items-center text-red-500 font-bold text-[15px]">
                              <span className="text-red-500 text-xl mr-1">
                                <IoWarningOutline />
                              </span>
                              Fraud
                            </p>
                          )
                        ) : (
                          ""
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                        {item.role !== "agent" ? (
                          item.role !== "fraud" ? (
                            <button
                              className="flex shadow-2xl justify-center items-center gap-2 w-24 h-8 cursor-pointer rounded-2xl  text-white font-semibold bg-gradient-to-r from-[#072730] via-[#0e3c49da] to-[#0a3a47da] hover:shadow-xl hover:shadow-[#072730] hover:scale-105 duration-300 hover:from-[#072730da] hover:to-[#072730da]"
                              onClick={() => handleMakeAgent(item)}
                            >
                              Make Agent
                            </button>
                          ) : (
                            <p className="flex items-center text-red-500 font-bold text-[15px]">
                              <span className="text-red-500 text-xl mr-1">
                                <IoWarningOutline />
                              </span>
                              Fraud
                            </p>
                          )
                        ) : (
                          ""
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                        {item.role === "agent" ? (
                          <button
                            className="w-24  h-8 rounded-full cursor-pointer  shadow-2xl text-white font-semibold bg-gradient-to-r from-[#fb7185] via-[#e11d48] to-[#be123c] hover:shadow-xl hover:shadow-red-500 hover:scale-105 duration-300 hover:from-[#be123c] hover:to-[#fb7185]"
                            onClick={() => handleMakeFraud(item)}
                          >
                            Make Fraud
                          </button>
                        ) : (
                          ""
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                        <button
                          onClick={() => handleDeleteUser(item)}
                          type="button"
                          className="w-24 h-8 rounded-full cursor-pointer  shadow-2xl text-white font-semibold bg-gradient-to-r from-[#fb7185] via-[#e11d48] to-[#be123c] hover:shadow-xl hover:shadow-red-500 hover:scale-105 duration-300 hover:from-[#be123c] hover:to-[#fb7185]"
                        >
                          Delete
                        </button>
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

export default ManageUsers;
