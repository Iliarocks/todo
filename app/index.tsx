import { View, Text } from "react-native";
import { Link, RelativePathString } from "expo-router";
import Button from "@/components/Button";

export default function Index() {
  return (
    <View className="flex-1 bg-background px-xl">
      <View className="py-lg">
        <Text className="text-secondary-text font-roboto-mono-md text-body-sm">
          welcome
        </Text>
      </View>
      <View className="flex-1 justify-center gap-4xl">
        <PrimaryNavigationButton label="inbox" path="./inbox" />
        <PrimaryNavigationButton label="today" path="./today" />
        <PrimaryNavigationButton label="upcoming" path="./upcoming" />
      </View>
      <View className="flex-row items-center justify-between py-lg">
        <Text className="text-secondary-text font-roboto-mono-md text-body-sm">
          settings
        </Text>
        <View className="invisible">
          <Button type="icon" label="add" />
        </View>
      </View>
    </View>
  );
}

function PrimaryNavigationButton({
  label,
  path,
}: {
  label: string;
  path: RelativePathString;
}) {
  return (
    <Link
      href={path}
      className="text-primary-text font-roboto-mono-bd text-title-xl"
    >
      {label}
    </Link>
  );
}
