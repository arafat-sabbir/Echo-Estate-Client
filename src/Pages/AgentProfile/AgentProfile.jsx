import { useLoaderData, useParams } from "react-router-dom";
import Navbar from "../../../Components/Navbar/Navbar";
import useAxiosSecure from "../../../Hooks/AxiosSecure/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { FaLocationDot } from "react-icons/fa6";
import SectionTitle from "../../../Utils/SectionTitle/SectionTitle";
import { useEffect } from "react";

const AgentProfile = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  const agentDetail = useLoaderData();
  const axiosSecure = useAxiosSecure();
  const { email } = useParams();
  const {
    data: Properties = [],
  } = useQuery({
    queryKey: ["getuserinfo"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/getProperty?email=${email}`);
      return res.data;
    },
  });
  return (
   <>
    <div className="container mx-auto">
      <Navbar></Navbar>
      <div className="flex justify-center items-center my-10">
        <div className=" md:max-w-xl w-[90vw] rounded-2xl overflow-hidden bg-white  shadow-2xl  md:shadow-[5px_5px_10px_#FF5B22] dark:bg-gray-800">
          <img
            className="w-96 h-96 mx-auto"
            src={agentDetail.photo}
            alt="avatar"
          />

          <div className="flex items-center px-6 py-3 bg-gray-900">
            <svg
              aria-label="headphones icon"
              className="w-6 h-6 text-white fill-current"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M17 21C15.8954 21 15 20.1046 15 19V15C15 13.8954 15.8954 13 17 13H19V12C19 8.13401 15.866 5 12 5C8.13401 5 5 8.13401 5 12V13H7C8.10457 13 9 13.8954 9 15V19C9 20.1046 8.10457 21 7 21H3V12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12V21H17ZM19 15H17V19H19V15ZM7 15H5V19H7V15Z"
              />
            </svg>

            <h1 className="mx-3 text-lg font-semibold text-white uppercase">
              {agentDetail.role}{" "}
            </h1>
          </div>

          <div className="px-6 py-4">
            <h1 className="text-xl font-semibold text-gray-800 dark:text-white">
              {agentDetail.name}
            </h1>
            <h1 className="text-md my-2 font-semibold text-gray-800 dark:text-white">
              Agent Since : {agentDetail.creationDate}
            </h1>

            <div className="flex items-center mt-4 text-gray-700 dark:text-gray-200">
              <svg
                aria-label="suitcase icon"
                className="w-6 h-6 fill-current"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M14 11H10V13H14V11Z" />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M7 5V4C7 2.89545 7.89539 2 9 2H15C16.1046 2 17 2.89545 17 4V5H20C21.6569 5 23 6.34314 23 8V18C23 19.6569 21.6569 21 20 21H4C2.34314 21 1 19.6569 1 18V8C1 6.34314 2.34314 5 4 5H7ZM9 4H15V5H9V4ZM4 7C3.44775 7 3 7.44769 3 8V14H21V8C21 7.44769 20.5522 7 20 7H4ZM3 18V16H21V18C21 18.5523 20.5522 19 20 19H4C3.44775 19 3 18.5523 3 18Z"
                />
              </svg>

              <h1 className="px-2 text-sm">Echo Estate</h1>
            </div>

            <div className="flex items-center mt-4 text-gray-700 dark:text-gray-200">
              <svg
                aria-label="email icon"
                className="w-6 h-6 fill-current"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M3.00977 5.83789C3.00977 5.28561 3.45748 4.83789 4.00977 4.83789H20C20.5523 4.83789 21 5.28561 21 5.83789V17.1621C21 18.2667 20.1046 19.1621 19 19.1621H5C3.89543 19.1621 3 18.2667 3 17.1621V6.16211C3 6.11449 3.00333 6.06765 3.00977 6.0218V5.83789ZM5 8.06165V17.1621H19V8.06199L14.1215 12.9405C12.9499 14.1121 11.0504 14.1121 9.87885 12.9405L5 8.06165ZM6.57232 6.80554H17.428L12.7073 11.5263C12.3168 11.9168 11.6836 11.9168 11.2931 11.5263L6.57232 6.80554Z"
                />
              </svg>

              <h1 className="px-2 text-sm">{agentDetail.email}</h1>
            </div>
          </div>
        </div>
        <div>
          <div></div>
        </div>
      </div>
      <div className="flex justify-center lg:justify-normal">
        <SectionTitle
          title={"View Property"}
          subtitle={"Added By This Agent"}
        ></SectionTitle>
      </div>
      <div className="grid grid-cols-1 justify-items-center gap-6 my-10  lg:grid-cols-3 ">
        {Properties.map((item) => (
          <div key={item._is}>
            <div className="flex flex-col max-w-lg p-6 space-y-6 overflow-hidden rounded-lg shadow-[0_0_5px_#FF573B] border border-dashed border-main lg:w-[480px] w-[400px] text-black">
              <div className="flex space-x-4">
                <img
                  alt=""
                  src={item.agentImage}
                  className="object-cover w-12 h-12 rounded-full shadow bg-gray-500 "
                />
                <div className="flex flex-col space-y-1">
                  <a
                    rel="noopener noreferrer"
                    href="#"
                    className="text-sm font-semibold"
                  >
                    {item.agentName}
                  </a>
                  <span className="text-xs text-black">
                    {Math.floor(Math.random(1, 24) * 10)} days Ago
                  </span>
                </div>
              </div>
              <div>
                <img
                  src={item.propertyImage}
                  alt=""
                  className="object-cover w-full mb-4 h-60 sm:h-96 bg-gray-500 rounded-xl"
                />
                <div className="mb-1 text-lg  font-semibold flex justify-between">
                  <h1 className="w-[300px]">{item.propertyTitle}</h1>
                  <h1 className="text-xs flex justify-center items-center ">
                    <FaLocationDot className="text-xl text-main"></FaLocationDot>
                    <span className="ml-1">{item.propertyLocation}</span>
                  </h1>
                </div>
                <div className="flex justify-between mt-2">
                  <p className="text-md font-medium text-black">
                    Price Range :
                    <span className="font-bold">
                      ${item.minPrice}-${item.maxPrice}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
   </>
  );
};

export default AgentProfile;
