import { useAuthStore } from "@/hooks/use-auth";
import { Stack } from "expo-router";
import { useEffect } from "react";

export default function RootLayout() {
	useEffect(() => {
		useAuthStore.persist.onFinishHydration(() => {
			console.log("✅ Zustand has hydrated");
			console.log("Token after hydration:", useAuthStore.getState().token);
		});
	}, []);

	return (
		<Stack screenOptions={{ headerShown: false }}>
			<Stack.Screen name="(auth)" />
			<Stack.Screen name="(tabs)" />
		</Stack>
	);
}
