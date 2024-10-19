import axios from "axios";
import { BASE_URL } from "../config";
import { tokenStorage } from "../storage";
import { useAuthStorage } from "../authStorage";
import {
  GoogleSignin,
  GoogleSigninButton,
} from "@react-native-google-signin/google-signin";
import { resetAndNavigate } from "@/utils/LibraryHelpers";
import { appAxios } from "./apiInterceptors";

GoogleSignin.configure({
  // androidClientId:
  //   "590166497210-t7osfj51k07ui4lae9spdfd8n3uitjsc.apps.googleusercontent.com",
  webClientId:
    "590166497210-t9idcu7379q2tjsd1lq4babvhldv6i11.apps.googleusercontent.com",
  forceCodeForRefreshToken: true,
  offlineAccess: false,
  iosClientId: "",
});

export const signInWithGoogle = async () => {
  try {
    await GoogleSignin.hasPlayServices();
    await GoogleSignin.signOut();
    const res = await GoogleSignin.signIn();

    const apiRes = await axios.post(`${BASE_URL}/oauth/login`, {
      id_token: res.data?.idToken,
    });

    const { tokens, user } = apiRes.data;

    tokenStorage.set("accessToken", tokens?.access_token);
    tokenStorage.set("refreshToken", tokens?.refresh_token);

    const { setUser } = useAuthStorage.getState();
    setUser(user);
    resetAndNavigate("/(home)/home");
  } catch (error: any) {
    console.log(error.response.status);
    if (error.response.status == 400) {
      resetAndNavigate("/(auth)/signin");
    }
  }
};

export const signUpWithGoogle = async (data: any) => {
  try {
    await GoogleSignin.hasPlayServices();
    await GoogleSignin.signOut();
    const res = await GoogleSignin.signIn();

    const apiRes = await axios.post(`${BASE_URL}/oauth/login`, {
      id_token: res.data?.idToken,
      ...data,
    });

    const { tokens, user } = apiRes.data;

    tokenStorage.set("accessToken", tokens?.access_token);
    tokenStorage.set("refreshToken", tokens?.refresh_token);

    const { setUser } = useAuthStorage.getState();
    setUser(user);
    resetAndNavigate("/(home)/home");
  } catch (error: any) {
    console.log("Error in Signup", error);
  }
};

export const checkUsername = async (username: string) => {
  try {
    const apiRes = await axios.post(`${BASE_URL}/path/check-username`, {
      username,
    });
    return apiRes.data?.available;
  } catch (error) {
    console.log("checkUserName", error);
    return false;
  }
};
