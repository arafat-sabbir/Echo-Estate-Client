import { Link, useLocation } from "react-router-dom";
import useAuth from "../../Auth/UseAuth/useAuth";
import Button from "../../Shared/Button";
import useGetUser from "../../Hooks/GetUserInfo/useGetUser";
import { useEffect, useState } from "react";
import { NavLinks } from "./Navlinks";

const Navbar = () => {
    // Get The User Info From useGetUser Hooks
    const { userinfo } = useGetUser();

    // Use Location Hook To Get The Current Your Location Page
    const location = useLocation();

    // Navbar Scroll Effect
    const [isScrolled, setIsScrolled] = useState(false);
    // Check if the user has scrolled down
    useEffect(() => {
        const handleScroll = () => {
            // Check if the user has scrolled down
            const scrolled = window.scrollY > 0;
            setIsScrolled(scrolled);
        };

        // Attach the event listener when the component mounts
        window.addEventListener('scroll', handleScroll);

        // Clean up the event listener when the component unmounts
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // Geth Auth Related Function From UseAuth
    const { user, signOutUser } = useAuth();
    // SignOut User 
    const handleSignOut = () => {
        signOutUser()
            .then((result) => {
                console.log(result);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    // Navbar Jsx
    return (
        <div className={`transition duration-300 ${isScrolled ? "bg-white  fixed top-0 left-0 right-0 z-50" : "bg-white fixed top-0 left-0 right-0 z-50"}`}>
            <div className="container mx-auto  top-0">
                <div
                    className={
                        location.pathname == "/"
                            ? `navbar  justify-center  py-6 relative container mx-auto  z-50`
                            : "navbar  justify-center  py-6  container mx-auto z-50 "
                    }
                >
                    <div className="navbar-start">
                        <div className="dropdown">
                            <label tabIndex={0} className="btn btn-ghost lg:hidden">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h8m-8 6h16"
                                    />
                                </svg>
                            </label>
                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content font-semibold mx-2 mt-3 z-[50] p-2 shadow bg-base-100 rounded-box w-52 hover:scale-110"
                            >
                                {<NavLinks isScrolled={isScrolled} />}
                            </ul>
                        </div>
                        <div className="hidden lg:flex  font-semibold items-center">
                            <Link
                                to={"/"}
                                className={
                                    location.pathname == "/"
                                        ? `!flex font-black text-white  items-center  duration-300`
                                        : "!flex font-semibold items-center  duration-300"
                                }
                            >
                                <img
                                    className="w-22 h-12"
                                    src="https://i.ibb.co/rbX4J5H/Untitled-design-2.png"
                                    alt=""
                                />
                                <p className={`text-black text-2xl  font-semibold`}>Echo Estate</p>
                            </Link>
                        </div>
                    </div>
                    <div className="navbar-center hidden lg:flex">
                        <ul className="menu menu-horizontal  font-semibold gap-4 px-1 ">
                            {<NavLinks isScrolled={isScrolled} />}
                        </ul>
                    </div>
                    <div className="navbar-end">
                        <div className="dropdown dropdown-bottom dropdown-end z-50 ">
                            <label tabIndex={0} className="">
                                {user && (
                                    <img
                                        className="w-12 mr-4 h-12  rounded-full border-2 border-main  "
                                        src={userinfo?.photo}
                                        alt=""
                                    />
                                )}
                            </label>
                            {user && (
                                <ul className="p-2 shadow menu dropdown-content bg-[#072730da] z-[1]  rounded-box w-56">
                                    <img
                                        className=" w-16 h-16 mx-auto  rounded-full my-2 border-2 border-main"
                                        src={userinfo?.photo}
                                        alt=""
                                    />
                                    <p className="font-semibold text-center mr-2 mb-2 text-main ">
                                        {userinfo?.name}
                                    </p>
                                    <p className="font-semibold text-center mr-2 mb-2  text-main ">
                                        {userinfo?.email}
                                    </p>
                                    <div className="pb-2 mx-auto" onClick={handleSignOut}>
                                        <Button title={"Sign Out"}></Button>
                                    </div>
                                </ul>
                            )}
                        </div>
                        {user ? (
                            ""
                        ) : (
                            <div>
                                <Link to={"/signIn "} className="">
                                    <Button title={"Sign In"}></Button>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
