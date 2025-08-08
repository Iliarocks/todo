import { useRouter } from "expo-router";
import { createContext, PropsWithChildren, useState } from "react";
import { db } from "./database";

type AuthState = {
  email: string;
  setEmail: (email: string) => void;
  code: string;
  setCode: (code: string) => void;
  sendCode: () => void;
  signIn: () => void;
  signOut: () => void;
};

export const AuthContext = createContext<AuthState>({
  email: "",
  setEmail: (email: string) => {},
  code: "",
  setCode: (code: string) => {},
  sendCode: () => {},
  signIn: () => {},
  signOut: () => {},
});

export function AuthProvider({ children }: PropsWithChildren) {
  const { isLoading } = db.useAuth();
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
