import { AuthContext } from "@/context/AuthContext";
import { useContext } from "react";

export function useUser() {
  const { user } = useContext(AuthContext);

  if (!user) throw new Error("No user");

  return user;
}
