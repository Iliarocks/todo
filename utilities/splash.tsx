import { SplashScreen } from "expo-router";
import { useContext, useEffect } from "react";
import { AuthContext } from "./authContext";

// Prevent the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export function SplashScreenController() {
  const { isLoading } = useContext(AuthContext);

  useEffect(() => {
    if (!isLoading) {
      SplashScreen.hideAsync();
    }
  }, [isLoading]);

  return null;
}
