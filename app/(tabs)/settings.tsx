import { useAuthStore } from "@/hooks/use-auth";
import { themeColors, useThemeStore } from "@/hooks/use-theme";
import fetchCall from "@/utils/api";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Button } from "tamagui";

export default function Settings() {
	const router = useRouter();
	const logout = useAuthStore((s) => s.logout);
	const theme = useThemeStore((s) => s.theme);
	const toggleTheme = useThemeStore((s) => s.toggleTheme);

	const colors = themeColors[theme];

	const handleLogout = async () => {
		const res = await fetchCall("/auth/logout");
		if (!res.success) {
			return Alert.alert(res.message);
		}

		// ✅ Clear token from Zustand (memory + persisted storage)
		logout();

		// ✅ Navigate to auth onboarding
		return router.replace("/(auth)");
	};

	const dynamicStyles = {
		container: { ...styles.container, backgroundColor: colors.bg },
		title: { ...styles.title, color: colors.text },
		section: { ...styles.section, backgroundColor: colors.bgSecondary, borderColor: colors.border },
		sectionTitle: { ...styles.sectionTitle, color: colors.text },
		themeToggle: { ...styles.themeToggle, backgroundColor: colors.bgSecondary, borderColor: colors.border },
		themeLabel: { ...styles.themeLabel, color: colors.text },
		themeValue: { ...styles.themeValue, color: colors.accent },
		logoutButton: { ...styles.logoutButton, backgroundColor: colors.red },
		logoutButtonText: { ...styles.logoutButtonText, color: colors.text },
	};

	return (
		<View style={dynamicStyles.container}>
			<Text style={dynamicStyles.title}>Settings</Text>

			{/* Theme Toggle Section */}
			<View style={dynamicStyles.section}>
				<Text style={dynamicStyles.sectionTitle}>Appearance</Text>
				<TouchableOpacity style={dynamicStyles.themeToggle} onPress={toggleTheme}>
					<View style={{ flexDirection: "row", alignItems: "center", gap: 12, flex: 1 }}>
						<MaterialIcons name={theme === "dark" ? "dark-mode" : "light-mode"} size={24} color={colors.accent} />
						<View>
							<Text style={dynamicStyles.themeLabel}>Theme</Text>
							<Text style={dynamicStyles.themeValue}>{theme === "dark" ? "Dark" : "Light"}</Text>
						</View>
					</View>
					<MaterialIcons name="arrow-forward" size={20} color={colors.textSecondary} />
				</TouchableOpacity>
			</View>

			{/* Logout Button */}
			<Button style={dynamicStyles.logoutButton} onPress={handleLogout}>
				<MaterialIcons name="logout" size={20} color={colors.text} />
				<Text style={dynamicStyles.logoutButtonText}>Log Out</Text>
			</Button>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
	},
	title: {
		fontSize: 28,
		fontWeight: "bold",
		textAlign: "center",
		marginTop: 20,
		marginBottom: 32,
	},
	section: {
		borderRadius: 12,
		borderWidth: 1,
		padding: 16,
		marginBottom: 16,
	},
	sectionTitle: {
		fontSize: 14,
		fontWeight: "600",
		marginBottom: 12,
		textTransform: "uppercase",
		letterSpacing: 0.5,
	},
	themeToggle: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		borderRadius: 10,
		borderWidth: 1,
		padding: 14,
		paddingHorizontal: 16,
	},
	themeLabel: {
		fontSize: 13,
		fontWeight: "500",
	},
	themeValue: {
		fontSize: 11,
		fontWeight: "600",
		marginTop: 4,
		textTransform: "uppercase",
		letterSpacing: 0.3,
	},
	logoutButton: {
		marginTop: 24,
		paddingVertical: 14,
		paddingHorizontal: 20,
		borderRadius: 10,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		gap: 8,
	},
	logoutButtonText: {
		fontSize: 16,
		fontWeight: "600",
	},
});
