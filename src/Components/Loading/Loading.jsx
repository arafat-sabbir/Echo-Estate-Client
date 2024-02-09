import { TraceSpinner } from "react-spinners-kit";

const Loading = () => {
  return (
    <div className="w-[80vw] mx-auto flex justify-center items-center h-[90vh]">
        <TraceSpinner size={50} frontColor="#FF5B22" />
    </div>
  );
};

export default Loading;
