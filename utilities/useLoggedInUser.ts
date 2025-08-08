import { AuthContext } from "@/utilities/authContext";
import { useContext } from "react";

export default function useLoggedInUser() {
  const { user } = useContext(AuthContext);
  if (!user)
    throw new Error(
      "There was no user. Make sure to call `useLoggedInUser` under a logged in tree",
    );
  return user;
}
