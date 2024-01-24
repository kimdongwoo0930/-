import axios from "axios";
import { useState } from "react";

const usePostAxios = () => {
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

  return { data, error, loaded, PostAxios };
};

export default usePostAxios;
