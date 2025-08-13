import { TextInput } from "react-native";

interface CustomTextInput {
  value: string;
  onChangeText: (text: string) => void;
  autoFocus?: boolean;
}

export default function CustomTextInput({
  onChangeText,
  value,
  autoFocus = false,
}: CustomTextInput) {
  return (
    <TextInput
      className="bg-neutral-5 text-text-0 rounded-xs p-md font-roboto-mono-md text-body-sm leading-base antialiased"
      value={value}
      onChangeText={(text) => onChangeText(text)}
      autoFocus={autoFocus}
      autoCapitalize="none"
    />
  );
}
