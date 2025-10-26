import { StyleSheet, Text, View } from "react-native";

export default function Home() {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>Neutralize Tracker</Text>
			<Text style={styles.subtitle}>Welcome back!</Text>

			<View style={styles.card}>
				<Text style={styles.cardTitle}>Today's Calories</Text>
				<Text style={styles.calories}>1,250 / 2,000</Text>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1, padding: 20, backgroundColor: "#f9f9f9" },
	title: { fontSize: 28, fontWeight: "bold", textAlign: "center", marginTop: 40 },
	subtitle: { fontSize: 16, color: "#666", textAlign: "center", marginBottom: 30 },
	card: {
		backgroundColor: "white",
		padding: 20,
		borderRadius: 15,
		alignItems: "center",
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 5,
		elevation: 3,
		marginBottom: 20,
	},
	cardTitle: { fontSize: 16, color: "#666" },
	calories: { fontSize: 32, fontWeight: "bold", color: "#007AFF", marginTop: 5 },
});
