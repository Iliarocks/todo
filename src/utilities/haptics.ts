import * as Haptics from "expo-haptics";

export const HAPTIC_PATTERNS = {
  select: () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light),
  success: () =>
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success),
  error: () =>
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error),
  warning: () =>
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning),
  drag: () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy),
  navigate: () => Haptics.selectionAsync(),
};
