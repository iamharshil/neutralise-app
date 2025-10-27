import { useAuthStore } from "@/hooks/use-auth";
import { Stack, useRootNavigationState, useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";

export default function AuthLayout() {
	const [hydrated, setHydrated] = useState(false);
	const router = useRouter();
	const navigationState = useRootNavigationState();
	const hasNavigated = useRef(false);

	useEffect(() => {
		// Wait until Zustand has restored state from AsyncStorage
		const unsub = useAuthStore.persist.onFinishHydration(() => setHydrated(true));
		setHydrated(useAuthStore.persist.hasHydrated()); // handle case where it's already done
		return () => unsub();
	}, []);

	useEffect(() => {
		// Only navigate once, after both hydration is complete AND navigation state is ready
		if (hydrated && navigationState?.key && !hasNavigated.current) {
			hasNavigated.current = true;
			// Use a small delay to ensure navigation stack is fully ready
			const timer = setTimeout(() => {
				router.replace("/(auth)/login");
			}, 150);
			return () => clearTimeout(timer);
		}
	}, [hydrated, navigationState?.key, router]);

	if (!hydrated) {
		return null;
	}

	return (
		<Stack screenOptions={{ headerShown: false }}>
			<Stack.Screen name="index" />
			<Stack.Screen name="login" />
			<Stack.Screen name="signup" />
		</Stack>
	);
}
