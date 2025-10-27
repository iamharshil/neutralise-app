import { useAuthStore } from "@/hooks/use-auth";
import { useThemeStore } from "@/hooks/use-theme";
import { defaultConfig } from "@tamagui/config/v4";
import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { createTamagui, TamaguiProvider } from "tamagui";

const config = createTamagui(defaultConfig);

export default function RootLayout() {
	const token = useAuthStore((state) => state.token);
	const [hydrated, setHydrated] = useState(false);

	useEffect(() => {
		const unsub = useAuthStore.persist.onFinishHydration(() => {
			setHydrated(true);
			console.log("✅ Zustand has hydrated");
			console.log("Token after hydration:", useAuthStore.getState().token);
		});
		setHydrated(useAuthStore.persist.hasHydrated());
		return () => unsub();
	}, []);

	useEffect(() => {
		// Hydrate theme store
		useThemeStore.persist.rehydrate();
	}, []);

	if (!hydrated) {
		return null; // Show splash screen or loading state
	}

	return (
		<TamaguiProvider config={config}>
			{token ? (
				<Stack screenOptions={{ headerShown: false }}>
					<Stack.Screen name="(tabs)" />
				</Stack>
			) : (
				<Stack screenOptions={{ headerShown: false }}>
					<Stack.Screen name="(auth)" />
				</Stack>
			)}
		</TamaguiProvider>
	);
}
