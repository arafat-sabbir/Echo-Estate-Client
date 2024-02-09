import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./AxiosInstance/useAxiosPublic";
import useAuth from "./useAuth";



const useUserInfo = () => {
    const axiosPublic = useAxiosPublic();
    const { user } = useAuth();
    const { data: userinfo = [], isLoading, isError, refetch } = useQuery({
        queryKey: ["getUserinfo", user],
        queryFn: async () => {
            const res = await axiosPublic.get(`/getuser?email=${user.email}`);
            return res.data;
        },
    });
    return { userinfo, refetch, isLoading, isError };
};

export default useUserInfo;
