import { useRouter } from "expo-router";
import { createContext, PropsWithChildren, useState } from "react";
import { init, User } from "@instantdb/react-native";

const APP_ID = "81185f3e-d773-4c94-a6cb-c08ebe7bdf22";
const db = init({ appId: APP_ID });

type AuthState = {
  setEmail: (email: string) => void;
  setCode: (code: string) => void;
  sendCode: () => void;
  logIn: () => void;
  logOut: () => void;
  user: User | null | undefined;
  isLoading: boolean;
  error: any;
};

export const AuthContext = createContext<AuthState>({
  setEmail: (email: string) => {},
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
    router.replace("/emailStep");
  };

  if (isLoading) {
    return null;
  }

  return (
    <AuthContext.Provider
      value={{
        setEmail,
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
