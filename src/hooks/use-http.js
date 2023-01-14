import { useState } from "react";

const useHttp = (resquestConfig, applyData) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = async (taskText) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(resquestConfig.url, {
        method: resquestConfig.method ? resquestConfig.method : "GET",
        headers: resquestConfig.headers ? resquestConfig.headers : {},
        body: resquestConfig.body ? JSON.stringify(resquestConfig.body) : null,
      });
      if (!response.ok) {
        throw new Error("Request failed!");
      }
      const data = await response.json();
      applyData(data);
    } catch (err) {
      setError(err.message || "Something went wrong!");
    }
    setIsLoading(false);
  };
  return {
    isLoading,
    error,
    sendRequest,
  };
};

export default useHttp;
