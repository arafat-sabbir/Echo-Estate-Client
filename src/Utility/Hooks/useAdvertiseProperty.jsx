import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../AxiosSecure/useAxiosSecure';

const useAdvertiseProperty = () => {
    const axiosSecure = useAxiosSecure()
    const {
        data: advertise,
        isLoading,
        isError,
        refetch
      } = useQuery({
        queryKey: ["advertise"],
        queryFn: async () => {
          const res = await axiosSecure.get("/getAdvertiseProperty");
          return res.data;
        },
      });
      return {advertise,isLoading,isError,refetch}
};

export default useAdvertiseProperty;