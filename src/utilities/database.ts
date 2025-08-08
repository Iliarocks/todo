import { init } from "@instantdb/react-native";
import schema from "@/instant.schema";

const APP_ID = process.env.EXPO_PUBLIC_INSTANT_APP_ID!;

export const db = init({ appId: APP_ID, schema });
