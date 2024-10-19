import { View, Text, Image, Button, LogBox, Alert } from "react-native";
import React, { useEffect } from "react";
import { splashStyles } from "@/styles/splashStyles";
import { resetAndNavigate } from "@/utils/LibraryHelpers";
import { tokenStorage } from "@/service/storage";
import { jwtDecode } from "jwt-decode";
import { refresh_token } from "@/service/api/apiInterceptors";

interface DecodedToken {
  exp: number;
}
LogBox.ignoreAllLogs();

const Main = () => {
  useEffect(() => {
    const timeoutId = setTimeout(tokenCheck, 1000);
    return () => clearTimeout(timeoutId);
  }, []);

  const tokenCheck = async () => {
    const accessToken = tokenStorage.getString("accessToken") as string;
    const refreshToken = tokenStorage.getString("refreshToken") as string;

    if (accessToken) {
      const decodeAccessToken = jwtDecode<DecodedToken>(accessToken);
      const decodeRefreshToken = jwtDecode<DecodedToken>(refreshToken);

      const currentTime = Date.now() / 1000;
      if (decodeRefreshToken?.exp < currentTime) {
        resetAndNavigate("/(auth)/signin");
        Alert.alert("Session Expired, Please Login Again");
        return false;
      }
      if (decodeAccessToken?.exp < currentTime) {
        try {
          refresh_token;
        } catch (error) {
          console.log("errorLoggg", error);
          Alert.alert("There was an error");
          return false;
        }
      }
      resetAndNavigate("/(home)/home");
      return true;
    }
    resetAndNavigate("/(auth)/signin");
    return false;
  };
  useEffect(() => {
    setTimeout(() => {
      resetAndNavigate("./(auth)/signin");
    }, 300);
  }, []);

  return (
    <View style={splashStyles.container}>
      <Image
        source={require("@/assets/images/adaptive-icon.png")}
        style={splashStyles.logo}
      />
      <Text>adfafd</Text>
    </View>
  );
};

export default Main;
