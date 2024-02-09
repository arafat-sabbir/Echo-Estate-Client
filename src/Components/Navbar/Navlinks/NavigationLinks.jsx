import { NavLink } from "react-router-dom";
import PropTypes from 'prop-types';

const NavigationLinks = ({ isScrolled }) => {
  return (
    // Navbar Links
    <>
      <li
        className={`${isScrolled ? "!text-gray-600" : ""} ${location.pathname == "/" ? `hover:scale-110 duration-300 hover:text-main  tracking-wider font-bold` : "hover:scale-110 duration-300 hover:text-main"}`}>
        <NavLink to={"/"}>Home</NavLink>
      </li>
      <ul className="lg:flex drop-shadow-2xl ">
        <li
          className={`${isScrolled ? "!text-gray-600" : ""} ${location.pathname == "/" ? `hover:scale-110 duration-300 hover:text-main  tracking-wider font-bold` : "hover:scale-110 duration-300 hover:text-main"}`}
        >
          <NavLink to={"/allProperties"}>All Properties</NavLink>
        </li>
        <li
          className={
            ` ${isScrolled ? "!text-gray-600" : ""} ${location.pathname == "/"
              ? `hover:scale-110 duration-300 hover:text-main  tracking-wider font-bold`
              : "hover:scale-110 duration-300 hover:text-main"}`
          }
        >
          <NavLink to={"/dashboard/myProfile"}>DashBoard</NavLink>
        </li>
      </ul>
    </>
  );
};

export default NavigationLinks;
NavigationLinks.propTypes = {
  isScrolled: PropTypes.bool
}
