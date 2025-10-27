import { useAuthStore } from "@/hooks/use-auth";
import fetchCall from "@/utils/api";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Alert, StyleSheet, Text, View } from "react-native";
import { Button } from "tamagui";

export default function Settings() {
	const router = useRouter();
	const logout = useAuthStore((s) => s.logout);

	const handleLogout = async () => {
		const res = await fetchCall("/auth/logout");
		if (!res.success) {
			return Alert.alert(res.message);
		}

		// ✅ Clear token from Zustand (memory + persisted storage)
		logout();

		// ✅ Navigate to login/home
		return router.replace("/(auth)/login");
	};

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Settings Page</Text>

			<Button style={styles.logoutButton} onPress={handleLogout}>
				<MaterialIcons style={styles.logoutIcon} name="logout" size={20} />
				<Text style={styles.logoutText}>Log Out</Text>
			</Button>
		</View>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1, padding: 20, backgroundColor: "#f9f9f9" },
	title: { fontSize: 28, fontWeight: "bold", textAlign: "center", marginTop: 40 },
	logoutButton: {
		// backgroundColor: "red",
		// color: "white",
		marginTop: 10,
		// flexDirection: "row",
		// height: 40,
		// borderRadius: 10,
		// justifyContent: "center",
		// alignItems: "center",
	},
	logoutIcon: {
		marginRight: 5,
	},
	logoutText: {
		fontSize: 18,
		fontWeight: "500",
	},
});
