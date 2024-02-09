import {PropTypes} from "prop-types"

const Button = ({title}) => {
  return (
    <button className="relative px-8 py-2 rounded-full  bg-[#072730] text-white  isolation-auto z-10 border  border-dashed border-main 
    before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-right-full before:hover:right-0  before:bg-main font-medium hover:text-white before:-z-10  before:aspect-square before:hover:scale-150 overflow-hidden before:hover:duration-700">{title}</button>
  );
};

export default Button;

Button.propTypes = {
  title: PropTypes.string.isRequired
}
