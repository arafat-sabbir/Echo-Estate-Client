import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { FaHome, FaUser, FaListUl } from "react-icons/fa";
import { FaUsersRays } from "react-icons/fa6";
import { GoCodeReview, GoListUnordered } from "react-icons/go";
import { IoIosGitPullRequest } from "react-icons/io";
import { MdOutlineReviews } from "react-icons/md";
import { TbBrandWish, TbHomeDollar } from "react-icons/tb";
import {
  RiAdvertisementLine,
  RiGitPullRequestFill,
  RiMoneyEuroCircleLine,
} from "react-icons/ri";
import { HiOutlineFolderAdd } from "react-icons/hi";
import { MdOutlineHolidayVillage } from "react-icons/md";
import { Helmet } from "react-helmet";
import useAuth from "../../Utility/Hooks/useAuth";
import useUserInfo from "../../Utility/Hooks/useUserInfo";

// ... (previous imports and useGetUser hook)

const DashBoard = () => {
  const { userinfo } = useUserInfo();
  const { signOutUser } = useAuth();
  const navigate = useNavigate();
  const handleSignOut = () => {
    signOutUser()
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const role = userinfo?.role;
  const dashboardItem = (
    <ul className="menu p-4 space-y-2 uppercase ">
      {role === "admin" ? (
        <>
          {/* admin sidebar */}
          <li>
            <NavLink to={"/dashboard/myProfile"}>
              <FaUser />
              Admin Profile
            </NavLink>
          </li>
          <li>
            <NavLink to={"/dashboard/manageProperties"}>
              <MdOutlineHolidayVillage /> Manage ProperTies
            </NavLink>
          </li>
          <li>
            <NavLink to={"/dashboard/manageUsers"}>
              <FaUsersRays />
              Manage Users
            </NavLink>
          </li>
          <li>
            <NavLink to={"/dashboard/manageReviews"}>
              <MdOutlineReviews />
              Manage Reviews
            </NavLink>
          </li>
          <li>
            <NavLink to={"/dashboard/adverTiseProperty"}>
              <RiAdvertisementLine />
              AdverTise Property
            </NavLink>
          </li>
          <li>
            <NavLink to={"/dashboard/agentRequest"}>
              <RiGitPullRequestFill />
              Agent Request
            </NavLink>
          </li>
        </>
      ) : role === "user" ? (
        // user navbar
        <>
          <li>
            <NavLink to={"/dashboard/myProfile"}>
              <FaUser /> My Profile
            </NavLink>
          </li>
          <li>
            <NavLink to={"/dashboard/wishlist"}>
              <TbBrandWish /> WishList
            </NavLink>
          </li>
          <li>
            <NavLink to={"/dashboard/propertyBought"}>
              <TbHomeDollar /> Property Bought
            </NavLink>
          </li>
          <li>
            <NavLink to={"/dashboard/myReview"}>
              <GoCodeReview /> My Review
            </NavLink>
          </li>
        </>
      ) : role === "agent" ? (
        <>
          <li>
            <NavLink to={"/dashboard/myProfile"}>
              <FaUser /> Agent Profile
            </NavLink>
          </li>
          <li>
            <NavLink to={"/dashboard/addProperty"}>
              <HiOutlineFolderAdd /> Add Property
            </NavLink>
          </li>
          <li>
            <NavLink to={"/dashboard/addedProperties"}>
              <GoListUnordered /> My Added Properties
            </NavLink>
          </li>
          <li>
            <NavLink to={"/dashboard/soldProperties"}>
              <RiMoneyEuroCircleLine /> My Sold Properties
            </NavLink>
          </li>
          <li>
            <NavLink to={"/dashboard/requestedProperties"}>
              <IoIosGitPullRequest /> Requested Properties
            </NavLink>
          </li>
        </>
      ) : (
        ""
      )}
      <div className="divider divider-error"></div>
      <li>
        <NavLink to={"/"}>
          <FaHome></FaHome> Home
        </NavLink>
      </li>
      <div className="pb-2 mx-auto" onClick={handleSignOut}>
        <button
          className="relative px-24 py-2   bg-[#072730] text-white  isolation-auto z-10 border rounded-full border-dashed border-main 
          before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-right-full before:hover:right-0 before:rounded-full  before:bg-main hover:text-white before:-z-10  before:aspect-square before:hover:scale-150 overflow-hidden before:hover:duration-700"
        >
          Sign Out
        </button>
      </div>
    </ul>
  );

  return (
    <div className="flex">
      <Helmet>
        <title>Echo Estate || DashBoard</title>
      </Helmet>
      <div className="fixed h-screen  w-72 bg-[#F2FFE9] rounded-2xl hidden lg:block">
        <img
          src={userinfo.photo}
          className="w-20 h-20 rounded-full p-4 mx-auto border border-dashed border-main  mt-6"
          alt=""
        />
        <h3 className="text-lg font-semibold text-center">Welcome Back</h3>
        <h3 className="text-center text-2xl font-semibold mt-1">
          <span className="text-main  font-bold">{userinfo.name}</span>
        </h3>
        <div className="divider divider-error px-4 -mb-1"></div>
        {dashboardItem}
      </div>
      <div className="drawer  lg:hidden">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Page content here */}
          <div className="flex justify-center">
            <div className="flex">
              <label
                htmlFor="my-drawer"
                className="drawer-button z-50 absolute"
              >
                <p className="pt-4 pl-4 text-2xl">
                  <FaListUl></FaListUl>
                </p>
              </label>
              <div className="flex lg:hidden">
                <Outlet></Outlet>
              </div>
            </div>
          </div>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu p-4 bg-[#F2FFE9] text-base-content h-screen">
            <div>
              <img
                src={userinfo.photo}
                className="w-20 h-20 rounded-full p-4 mx-auto border border-dashed border-main  mt-6"
                alt=""
              />
              <h3 className="text-center text-xl font-semibold mt-1">
                Hello{" "}
                <span className="text-main font-bold">{userinfo.name}</span>
              </h3>
              <div className="divider divider-error px-4 -mb-1"></div>
              <div>{dashboardItem}</div>
            </div>
          </ul>
        </div>
      </div>
      <div className="flex-1 ml-72 hidden lg:block">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default DashBoard;
