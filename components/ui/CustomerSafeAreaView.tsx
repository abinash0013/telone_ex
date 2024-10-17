import { View, ViewStyle, StyleSheet } from "react-native";
import React, { FC } from "react";
import { Colors } from "@/utils/Constants";
import { SafeAreaView } from "react-native-safe-area-context";

interface CustomProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

const CustomerSafeAreaView: FC<CustomProps> = ({ children, style }) => {
  return (
    <View style={[styles.container, style]}>
      <SafeAreaView />
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.secondary,
  },
});

export default CustomerSafeAreaView;
