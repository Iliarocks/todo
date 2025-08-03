import { TextInput } from "react-native";
import colors from "@/constants/Colors";

export default function CustomTextInput({ autoFocus }: { autoFocus: boolean }) {
  return (
    <TextInput
      className="rounded-xl bg-primary px-xl py-lg font-roboto-mono-md text-body-sm leading-base text-primary-text antialiased"
      autoFocus={autoFocus}
    />
  );
}
