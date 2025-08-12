import Footer from "@/components/Footer";
import NavigationButton from "@/components/NavigationButton";
import ScreenView from "@/components/ScreenView";
import { View } from "react-native";

export default function Index() {
  return (
    <ScreenView>
      <View className="flex-auto justify-center gap-4xl px-xl">
        <NavigationButton href="/inbox" size="xl">
          inbox
        </NavigationButton>
        <NavigationButton href="/today" size="xl">
          today
        </NavigationButton>
        <NavigationButton href="/upcoming" size="xl">
          upcoming
        </NavigationButton>
      </View>
      <Footer />
    </ScreenView>
  );
}
