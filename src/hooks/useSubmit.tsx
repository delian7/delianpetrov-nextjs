"use client"
import {useState} from "react";
interface Response {
  type: 'success' | 'error';
  message: string;
}

const useSubmit = () => {
  const [isLoading, setLoading] = useState(false);
  const [response, setResponse] = useState<Response | null>(null);

  const submit = async (url: string, data: { firstName: string; }) => {
    setLoading(true);
    try {
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      setResponse({
        type: 'success',
        message: `Thanks for your submission ${data.firstName}, we will get back to you shortly!`,
      })
    } catch (error) {
      setResponse({
        type: 'error',
        message: 'Something went wrong, please try again later!',
      })
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return { isLoading, response, submit };
}

export default useSubmit;
