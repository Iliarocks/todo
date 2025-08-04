import { useRouter } from "expo-router";
import { createContext, PropsWithChildren, useState } from "react";

type AuthState = {
  isLoggedIn: boolean;
  sendCode: () => void;
  logIn: () => void;
  logOut: () => void;
};

export const AuthContext = createContext<AuthState>({
  isLoggedIn: false,
  sendCode: () => {},
  logIn: () => {},
  logOut: () => {},
});

export function AuthProvider({ children }: PropsWithChildren) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  const sendCode = () => {
    router.replace("/codeStep");
  };

  const logIn = () => {
    setIsLoggedIn(true);
    router.replace("/");
  };

  const logOut = () => {
    setIsLoggedIn(false);
    router.replace("/emailStep");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, sendCode, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
}
