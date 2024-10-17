import React from "react";
import LottieView from "lottie-react-native";
import { siginStyles } from "@/styles/signinStyles";
import CustomerSafeAreaView from "@/components/ui/CustomerSafeAreaView";
import CustomText from "@/components/ui/CustomText";
import { Image, TouchableOpacity } from "react-native";

const Page = () => {
  const handleSignin = async () => {};
  return (
    <CustomerSafeAreaView style={siginStyles.container}>
      <LottieView
        autoPlay
        loop
        style={siginStyles.animation}
        source={require("@/assets/animations/telegram.json")}
      />
      <CustomText variant="h3" style={siginStyles.title}>
        Welcome to Telone
      </CustomText>
      <CustomText style={siginStyles.message}>
        Messages are heavily encrypted and can self-destruct
      </CustomText>
      <TouchableOpacity style={siginStyles.loginBtn} onPress={handleSignin}>
        <Image
          source={require("@/assets/icons/google.png")}
          style={siginStyles.googleIcon}
        />
        <CustomText style={siginStyles.loginBtnText}>
          Sign in with Google
        </CustomText>
      </TouchableOpacity>
    </CustomerSafeAreaView>
  );
};

export default Page;
