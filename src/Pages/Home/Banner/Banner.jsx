import { useState } from "react";
import { IoSearchOutline } from "react-icons/io5";


const Banner = () => {
  // https://i.ibb.co/QvxP2b3/frames-for-your-heart-2d4l-AQAlb-DA-unsplash.jpg
  // https://i.ibb.co/qxsnQcF/digital-marketing-agency-ntwrk-g39p1k-Djv-SY-unsplash.jpg
  // https://i.ibb.co/jHgyCMv/todd-carter-J8-v-XF8bpc-unsplash.jpg
  // https://i.ibb.co/ZTfGQt2/andreas-KRNVe-PAZw-Mg-unsplash.jpg
  // https://i.ibb.co/wBBx9gg/webaliser-TPTXZd9m-Oo-unsplash.jpg
  const [searchText, setSearchText] = useState("");
  const [priceSort, setPriceSort] = useState("");

  const handlePriceSort = (e) => {
    const sort = e.target.value;
    if (sort === "Low To High") {
      setPriceSort("asc");
    } else if (sort === "High To Low") {
      setPriceSort("desc");
    }
  };

  console.log(priceSort, searchText);

  return (
    <div className="mt-28w-full h-44 tracking-wider flex justify-center items-center leading-[60px] bg-[url('https://i.ibb.co/WyhVmvw/pexels-gdtography-950241.jpg')]">
      <form className="h-[56px]  p-10 flex justify-center items-center gap-2  border-2">
        <input type="text" name="title" placeholder="Search by Title" className="p-2" onChange={(e) => setSearchText(e.target.value)} id="" />
        <div className="custom-select">
          <select onChange={handlePriceSort} defaultValue={""} className="appearance-none border bg-transparent">
            <option value={""}>Search By Price</option>
            <option className="appearance-none">Low To High</option>
            <option className="appearance-none">High To Low</option>
          </select>
        </div>


        <button><IoSearchOutline /></button>

      </form>

    </div>
  );
};

export default Banner;
