import { useState } from "react";
import { router } from "expo-router";
import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import {
  ActivityIndicator,
  Alert,
  Image,
  TouchableOpacity,
  View,
} from "react-native";
import CustomerSafeAreaView from "@/components/ui/CustomerSafeAreaView";
import { RFValue } from "react-native-responsive-fontsize";
import { signupStyles } from "@/styles/signupStyles";
import { launchGallery } from "@/utils/LibraryHelpers";
import CustomText from "@/components/ui/CustomText";
import { uploadFile } from "@/service/api/fileService";
import { checkUsername, signUpWithGoogle } from "@/service/api/authService";
import CustomInput from "@/components/ui/CustomInput";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [profilePic, setProfilePic] = useState<any>("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleImagePick = async () => {
    const res = await launchGallery();
    if (res) {
      setProfilePic(res);
    }
  };

  const createAccount = async () => {
    router.push("/(home)");
  };

  // const createAccount = async () => {
  //   if (!userName || !firstName || !lastName || !profilePic) {
  //     Alert.alert("Error", "Please bhai sare details toh bhar de");
  //     return;
  //   }
  //   setLoading(true);
  //   try {
  //     // const mediaUrl = await uploadFile(profilePic);
  //     router.push("/(home)");
  //     // await signUpWithGoogle({
  //     //   user_name: userName,
  //     //   first_name: firstName,
  //     //   last_name: lastName,
  //     //   profile_picture: profilePic,
  //     // });
  //   } catch (error) {
  //     setLoading(false);
  //   }
  // };

  // const validateUsername = async (name: string) => {
  //   console.log("validateUsername");

  //   //   if (name.length > 4) {
  //   //     const isValid = await checkUsername(name);
  //   //     return isValid;
  //   //   }
  //   //   return false;
  // };

  return (
    <CustomerSafeAreaView style={signupStyles.container}>
      <TouchableOpacity onPress={() => router.back()}>
        <Ionicons name="arrow-back-outline" size={RFValue(20)} color="#fff" />
      </TouchableOpacity>
      <TouchableOpacity
        style={signupStyles.cameraIcon}
        onPress={handleImagePick}
      >
        {profilePic?.uri ? (
          <Image source={{ uri: profilePic?.uri }} style={signupStyles.image} />
        ) : (
          <MaterialCommunityIcons
            name="camera"
            size={RFValue(18)}
            color="#fff"
          />
        )}
      </TouchableOpacity>
      <CustomText variant="h4" style={signupStyles.profileText}>
        Profile Info
      </CustomText>
      <CustomText style={signupStyles.instructions}>
        Enter your unique username, name, and add profile photo
      </CustomText>

      <CustomInput
        label="Username"
        value={userName}
        onChangeText={setUserName}
        showValidationIcon
        // validationFunction={validateUsername}
      />
      <CustomInput
        label="Firstname"
        value={firstName}
        onChangeText={setFirstName}
      />
      <CustomInput
        label="Lastname"
        value={lastName}
        onChangeText={setLastName}
      />

      <View style={signupStyles.footer}>
        <CustomText style={signupStyles.termsText}>
          By signing up, you agree to the Terms & Services
        </CustomText>
        <TouchableOpacity
          style={signupStyles.submitButton}
          onPress={createAccount}
        >
          {!loading ? (
            <MaterialIcons name="arrow-right" size={RFValue(24)} color="#fff" />
          ) : (
            <ActivityIndicator color="#fff" size="small" />
          )}
        </TouchableOpacity>
      </View>
    </CustomerSafeAreaView>
  );
};

export default Signup;
