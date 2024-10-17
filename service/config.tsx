import { Platform } from "react-native";

export const BASE_URL =
  Platform.OS === "android"
    ? "http://192.168.1.18:8001"
    : "http://localhost:3000";

export const SOCKET_URL =
  Platform.OS === "android" ? "ws://192.168.1.18:8001" : "ws://localhost:3000";
