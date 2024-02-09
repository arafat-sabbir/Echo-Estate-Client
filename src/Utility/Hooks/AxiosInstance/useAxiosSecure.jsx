import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "../../Auth/UseAuth/useAuth";

const instance = axios.create({
  baseURL: "https://echo-state-server.vercel.app/api",
  withCredentials: true,
});

const useAxiosSecure = () => {
  const { logOut } = useAuth();
  const navigate = useNavigate();
  instance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("access-token");
      config.headers.authorization = `beared ${token}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const status = error.response.status;
      if (status == 401 || status == 403) {
        logOut();
        navigate("/signIn");
      }
      return Promise.reject(error);
    }
  );
  return instance;
};

export default useAxiosSecure;
