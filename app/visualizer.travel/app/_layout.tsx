import { Stack } from "expo-router";

import { createMMKV } from "react-native-mmkv";

export const storage = createMMKV();

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
