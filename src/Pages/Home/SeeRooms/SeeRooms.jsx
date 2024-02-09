import React from "react";
import SectionTitle from "../../../../Utils/SectionTitle/SectionTitle";

const SeeRooms = () => {
  return (
    <div className="max-w-6xl mx-auto mb-20 p-4">
        <SectionTitle title={"Take A Look"} subtitle={"See Some Of Our Properties Inside"}></SectionTitle>
        <div className="grid grid-cols-3 grid-rows-3 gap-4 justify-center items-center justify-items-center">
      <img src="https://i.ibb.co/mFmr3V3/1.jpg" className="row-span-2 rounded-lg" alt="" />
      <img src="https://i.ibb.co/nBT3f6Q/2.jpg" alt="" className="rounded-lg" />
      <img src="https://i.ibb.co/qNMfJ6J/3.jpg" alt="" className="rounded-lg" />
      <img src="https://i.ibb.co/R2PYkJK/4.jpg" alt="" className="rounded-lg"/>
      <img src="https://i.ibb.co/PzfVqqj/5-370x545.jpg" alt="" className="row-span-2 rounded-lg" />
      <img src="https://i.ibb.co/X3kz2rW/6.jpg" alt="" className="col-span-2 rounded-lg" />
    </div>
    </div>
  );
};

export default SeeRooms;
