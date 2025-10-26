import { useAuthStore } from "@/hooks/use-auth";
import { MaterialIcons } from "@expo/vector-icons";
import { Redirect, Tabs } from "expo-router";
import { useEffect, useState } from "react";

export default function TabLayout() {
	const token = useAuthStore((s) => s.token);
	const [hydrated, setHydrated] = useState(false);

	useEffect(() => {
		// Wait until Zustand has restored state from AsyncStorage
		const unsub = useAuthStore.persist.onFinishHydration(() => setHydrated(true));
		setHydrated(useAuthStore.persist.hasHydrated()); // handle case where it’s already done
		return () => unsub();
	}, []);

	if (!hydrated) {
		return null; // could also show <SplashScreen />
	}

	if (!token) {
		return <Redirect href="/(auth)/login" />;
	}

	return (
		<Tabs screenOptions={{ headerShown: false, tabBarShowLabel: false }}>
			<Tabs.Screen
				name="index"
				options={{
					title: "Home",
					tabBarIcon: ({ focused }) => <MaterialIcons name="home" size={28} color={focused ? "#007AFF" : "#000"} />,
				}}
			/>
			<Tabs.Screen
				name="settings"
				options={{
					title: "Settings",
					tabBarIcon: ({ focused }) => <MaterialIcons name="settings" size={28} color={focused ? "#007AFF" : "#000"} />,
				}}
			/>
		</Tabs>
	);
}
