import axios from "axios";
import {decodeToken} from "react-jwt";

axios.defaults.baseURL = "https://web4-sm.herokuapp.com";

type DecodedToken = {
  exp: number;
  iat: number;
  id: string;
};

export const fetchUserData = async (tokenOrUsername: string) => {
  const decoded: DecodedToken | null = decodeToken(tokenOrUsername);
  if (decoded !== null) {
    try {
      const response: any = await axios.get(`/api/users/${decoded.id}/`);
      return response.data;
    } catch (err) {
      console.log(err);
    }
  } else {
    try {
      const response: any = await axios.get(`/api/users/?username=${tokenOrUsername}`);
      return response.data;
    } catch (err) {
      console.log(err);
    }
  }
};

export const uploadImage = async (formData: any, token: string) => {
  if (formData.get("file") !== "null") {
    const decoded: DecodedToken | null = decodeToken(token);

    if (decoded !== null) {
      try {
        let response: any = await axios.post(
            `/api/${decoded.id}/images`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
        );
        return response.data;
      } catch (error: any) {
        console.log(error.response.data.message);
      }
    }
  }
};