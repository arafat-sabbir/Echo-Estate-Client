import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Auth/UseAuth/useAuth";
import useAxiosSecure from "../../../Hooks/AxiosSecure/useAxiosSecure";

const UseagentProperty = ({email}) => {
  const axiosSecure = useAxiosSecure();
  const {
    data: Properties = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["getuserinfo"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/getProperty?email=${email}`);
      return res.data;
    },
  });
  return { Properties, refetch, isLoading, isError };
};

export default UseagentProperty;
