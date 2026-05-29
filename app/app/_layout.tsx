import { Stack } from "expo-router";
import { Platform } from "react-native";
import * as Keychain from "react-native-keychain";
import crypto from "react-native-quick-crypto";

import { createMMKV } from "react-native-mmkv";
import { useEffect } from "react";

// const nukeKeychain = async () => {
//   const succesfullyDeleted = await Keychain.resetGenericPassword({
//     service: "invisible_auth",
//   });
// };

const processIosInvisibleLogin = async () => {
  try {
    const credentials = await Keychain.getGenericPassword({
      service: "invisible_auth",
      // cloudSync: true,
    });

    let privateKeyPem;

    if (credentials) {
      privateKeyPem = credentials.password;
    } else {
      const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
        modulusLength: 2048,
        publicKeyEncoding: {
          type: "spki",
          format: "pem",
        },
        privateKeyEncoding: {
          type: "pkcs8",
          format: "pem",
        },
      }) as {
        publicKey: string;
        privateKey: string;
      };

      privateKeyPem = privateKey;

      await Keychain.setGenericPassword("user_private_key", privateKey, {
        service: "invisible_auth",
        // cloudSync: true,
      });

      await fetch(`${process.env.EXPO_PUBLIC_API_URL}auth/register-ios`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          publicKey,
        }),
      });
    }

    console.log(privateKeyPem);
  } catch (error) {
    console.error("Invisible auth failed:", error);
  }
};

const authenticateUser = async () => {
  if (Platform.OS !== "ios") {
    console.log("You are using Android! :)");
  } else {
    await processIosInvisibleLogin();
  }
};

export const storage = createMMKV();

export default function RootLayout() {
  useEffect(() => {
    authenticateUser();
  }, []);

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
