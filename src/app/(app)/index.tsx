import Footer from "@/components/Footer";
import Link from "@/components/Link";
import ScreenView from "@/components/ScreenView";
import { View } from "react-native";

export default function Index() {
  return (
    <ScreenView>
      <View className="flex-auto justify-center gap-4xl px-xl">
        <Link href="/inbox" size="xl">
          inbox
        </Link>
        <Link href="/today" size="xl">
          today
        </Link>
        <Link href="/upcoming" size="xl">
          upcoming
        </Link>
      </View>
      <Footer />
    </ScreenView>
  );
}
