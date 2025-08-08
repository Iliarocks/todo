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
  signIn: () => void;
  signOut: () => void;
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
  signIn: () => {},
  signOut: () => {},
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
      .then(() => {
        router.push("/codeStep");
      })
      .catch((err) => {
        alert("Uh oh :" + err.body?.message);
      });
  };

  const signIn = () => {
    db.auth
      .signInWithMagicCode({ email, code })
      .then(() => {
        router.replace("/");
      })
      .catch((err) => {
        alert("Uh oh :" + err.body?.message);
      });
  };

  const signOut = () => {
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
        signIn,
        signOut,
        user,
        isLoading,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
