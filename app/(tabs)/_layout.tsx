import { themeColors, useThemeStore } from "@/hooks/use-theme";
import { MaterialIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabLayout() {
	const theme = useThemeStore((state) => state.theme);
	const colors = themeColors[theme];

	return (
		<Tabs
			screenOptions={{
				headerShown: false,
				tabBarShowLabel: false,
				tabBarStyle: {
					backgroundColor: colors.bgSecondary,
					borderTopColor: colors.border,
					borderTopWidth: 1,
				},
				tabBarActiveTintColor: colors.accent,
				tabBarInactiveTintColor: colors.textSecondary,
			}}
		>
			<Tabs.Screen
				name="index"
				options={{
					title: "Home",
					tabBarIcon: ({ focused }) => (
						<MaterialIcons name="home" size={28} color={focused ? colors.accent : colors.textSecondary} />
					),
				}}
			/>
			<Tabs.Screen
				name="calendar"
				options={{
					title: "Calendar",
					tabBarIcon: ({ focused }) => (
						<MaterialIcons name="calendar-month" size={28} color={focused ? colors.accent : colors.textSecondary} />
					),
				}}
			/>
			<Tabs.Screen
				name="create"
				options={{
					title: "Create",
					tabBarIcon: ({ focused }) => (
						<MaterialIcons name="add-circle" size={28} color={focused ? colors.accent : colors.textSecondary} />
					),
				}}
			/>
			<Tabs.Screen
				name="insights"
				options={{
					title: "Insights",
					tabBarIcon: ({ focused }) => (
						<MaterialIcons name="insights" size={28} color={focused ? colors.accent : colors.textSecondary} />
					),
				}}
			/>
			<Tabs.Screen
				name="settings"
				options={{
					title: "Settings",
					tabBarIcon: ({ focused }) => (
						<MaterialIcons name="settings" size={28} color={focused ? colors.accent : colors.textSecondary} />
					),
				}}
			/>
		</Tabs>
	);
}
