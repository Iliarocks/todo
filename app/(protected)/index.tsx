import { View } from "react-native";
import { Link, RelativePathString } from "expo-router";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Index() {
  return (
    <View className="flex-1 bg-background px-xl">
      <Header text="welcome" />
      <View className="flex-1 justify-center gap-4xl py-sm">
        <NavigationButton label="inbox" path="./inbox" />
        <NavigationButton label="today" path="./today" />
        <NavigationButton label="upcoming" path="./upcoming" />
      </View>
      <Footer />
    </View>
  );
}

function NavigationButton({
  label,
  path,
}: {
  label: string;
  path: RelativePathString;
}) {
  return (
    <Link
      href={path}
      className="text-primary-text font-roboto-mono-bd leading-title-xl text-title-xl"
    >
      {label}
    </Link>
  );
}
