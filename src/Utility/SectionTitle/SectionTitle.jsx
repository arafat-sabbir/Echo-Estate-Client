const SectionTitle = ({ title, subtitle }) => {
  return (
    <div>
      <div className="my-10 mx-auto">
        <div className="flex items-center ">
          <img
            src="https://i.ibb.co/sgy8bKr/Arrow-4.png"
            className=""
            alt=""
          />
          <h3 className="text-main font-semibold text-xl -mt-2">{title}</h3>
        </div>
        <h3 className="text-2xl font-semibold mt-2 drop-shadow-xl">{subtitle}</h3>
      </div>
    </div>
  );
};

export default SectionTitle;
