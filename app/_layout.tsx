import { useAuthStore } from "@/hooks/use-auth";
import { defaultConfig } from "@tamagui/config/v4";
import { Stack } from "expo-router";
import { useEffect } from "react";
import { createTamagui, TamaguiProvider } from "tamagui";

const config = createTamagui(defaultConfig);

export default function RootLayout() {
	useEffect(() => {
		useAuthStore.persist.onFinishHydration(() => {
			console.log("✅ Zustand has hydrated");
			console.log("Token after hydration:", useAuthStore.getState().token);
		});
	}, []);

	return (
		<TamaguiProvider config={config}>
			<Stack screenOptions={{ headerShown: false }}>
				<Stack.Screen name="(auth)" />
				<Stack.Screen name="(tabs)" />
			</Stack>
		</TamaguiProvider>
	);
}
