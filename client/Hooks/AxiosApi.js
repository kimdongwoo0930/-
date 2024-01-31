import axios from "axios";
import { useState } from "react";

const useAxiosApi = () => {
  const [error, setError] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [data, setData] = useState();

  const PostAxios = async (url, payload) => {
    try {
      const response = await axios.post(url, payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setData(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoaded(true);
    }
  };

  const GetAxios = async (url) => {
    try{
      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setData(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoaded(true);
    }
  }

  return { data, error, loaded, PostAxios, GetAxios };
};

export default useAxiosApi;
