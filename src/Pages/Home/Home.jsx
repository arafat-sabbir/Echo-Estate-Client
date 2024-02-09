import Banner from "./Banner/Banner";
import Advertise from "./Advertise/Advertise";
import LatestReview from "./LatestReview/LatestReview";
import SeeRooms from "./SeeRooms/SeeRooms";
import Ourpartner from "./OurPartner/Ourpartner";
import { Helmet } from "react-helmet";

const Home = () => {
  return (
    <div className="lg:mt-[100px]">
      <Helmet>
        <title>Echo Estate || Home</title>
      </Helmet>
      <Banner></Banner>,
      <Advertise></Advertise>,
      <LatestReview></LatestReview>,
      <SeeRooms></SeeRooms>,
      <Ourpartner></Ourpartner>
    </div>
  );
};

export default Home;
