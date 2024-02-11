import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../AxiosSecure/useAxiosSecure";

const useReview = () => {
  const axiosSecure = useAxiosSecure();
  const {
    data: reviews = [],
    refetch,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const res = await axiosSecure.get("/getallReviews");
      return res.data;
    },
  });
  return { reviews, refetch, isLoading, isError };
};

export default useReview;
