import React from "react";
import LottieView from "lottie-react-native";
import { siginStyles } from "@/styles/signinStyles";
import CustomerSafeAreaView from "@/components/ui/CustomerSafeAreaView";
import CustomText from "@/components/ui/CustomText";
import { Image, Text, TouchableOpacity } from "react-native";
import { signInWithGoogle } from "@/service/api/authService";
import { useRouter } from "expo-router";

const Page = () => {
  const router = useRouter();
  const handleSignin = async () => {
    // await signInWithGoogle();
    router.push("/home");
  };

  const handleSignup = async () => {
    router.push("/signup");
  };

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
      <TouchableOpacity style={siginStyles.loginBtn} onPress={handleSignup}>
        <Text style={{ color: "red" }}>Sign in with Google</Text>
      </TouchableOpacity>
    </CustomerSafeAreaView>
  );
};

export default Page;
