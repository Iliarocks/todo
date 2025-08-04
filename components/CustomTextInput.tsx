import { TextInput, KeyboardTypeOptions } from "react-native";

export default function CustomTextInput({
  onChangeText,
  autoFocus,
  keyboardType = "default",
}: {
  onChangeText: (text: string) => void;
  autoFocus: boolean;
  keyboardType?: KeyboardTypeOptions;
}) {
  return (
    <TextInput
      className="rounded-xl bg-primary px-xl py-lg font-roboto-mono-md text-body-sm leading-base text-primary-text antialiased"
      autoFocus={autoFocus}
      onChangeText={(text) => onChangeText(text)}
      keyboardType={keyboardType}
    />
  );
}
