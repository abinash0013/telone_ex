import { BASE_URL } from "../config";
import axios from "axios";

export const uploadFile = async (data: any) => {
  try {
    const formData = new FormData() as any;
    formData?.append("image", {
      uri: data?.uri,
      name: data?.name,
      type: data?.tyhpe,
    });
    const res = await axios.post(`${BASE_URL}/file/upload`, formData, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    return res.data?.mediaUrl;
  } catch (error) {
    console.log("errorLoggg", error);
    return null;
  }
};
