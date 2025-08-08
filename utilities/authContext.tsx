import { useRouter } from "expo-router";
import { createContext, PropsWithChildren, useState } from "react";
import { User } from "@instantdb/react-native";
import { db } from "./database";

type AuthState = {
  email: string;
  setEmail: (email: string) => void;
  code: string;
  setCode: (code: string) => void;
  sendCode: () => void;
  logIn: () => void;
  logOut: () => void;
  user: User | null | undefined;
  isLoading: boolean;
  error: any;
};

export const AuthContext = createContext<AuthState>({
  email: "",
  setEmail: (email: string) => {},
  code: "",
  setCode: (code: string) => {},
  sendCode: () => {},
  logIn: () => {},
  logOut: () => {},
  user: null,
  isLoading: true,
  error: null,
});

export function AuthProvider({ children }: PropsWithChildren) {
  const { isLoading, user, error } = db.useAuth();
  const [email, setEmail] = useState<string>("");
  const [code, setCode] = useState<string>("");
  const router = useRouter();

  const sendCode = () => {
    db.auth
      .sendMagicCode({ email })
      .catch((err) => {
        alert("Uh oh :" + err.body?.message);
      })
      .then(() => {
        router.push("/codeStep");
      });
  };

  const logIn = () => {
    db.auth
      .signInWithMagicCode({ email, code })
      .catch((err) => {
        alert("Uh oh :" + err.body?.message);
      })
      .then(() => {
        router.replace("/");
      });
  };

  const logOut = () => {
    db.auth.signOut();
    setEmail("");
    setCode("");
    router.replace("/emailStep");
  };

  if (isLoading) {
    return null;
  }

  return (
    <AuthContext.Provider
      value={{
        email,
        setEmail,
        code,
        setCode,
        sendCode,
        logIn,
        logOut,
        user,
        isLoading,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
