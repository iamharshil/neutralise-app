import CaloriesBar from "@/components/calories-bar";
import { StyleSheet, Text, View } from "react-native";
import { Card } from "tamagui";

const mockWeekData = [
	{ day: "Mon", calories: 2000, goal: 2000 },
	{ day: "Tue", calories: 1890, goal: 2000 },
	{ day: "Wed", calories: 2200, goal: 2000 },
	{ day: "Thu", calories: 1950, goal: 2000 },
	{ day: "Fri", calories: 2100, goal: 2000 },
	{ day: "Sat", calories: 2300, goal: 2000 },
	{ day: "Today", calories: 1780, goal: 2000, isToday: true },
];

export default function Home() {
	const avgCalories = Math.round(mockWeekData.reduce((sum, day) => sum + day.calories, 0) / mockWeekData.length);

	return (
		<View style={styles.container}>
			<View>
				<Text style={styles.title}>Your Week</Text>
				<Text style={styles.subtitle}>
					You averaged
					<Text style={styles.subAvg}> {avgCalories.toLocaleString()} kcal/day</Text> this week
				</Text>
			</View>

			<Card style={styles.CaloriesCard}>
				{mockWeekData.map((data) => (
					<CaloriesBar key={data.day} day={data.day} calories={data.calories} goal={data.goal} isToday={data.isToday} />
				))}
			</Card>

			<Card style={styles.card}>
				<Text style={styles.cardTitle}>Today's Calories</Text>
				<Text style={styles.calories}>1,250 / 2,000</Text>
			</Card>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		backgroundColor: "#f8fafc",
		justifyContent: "flex-start",
	},
	title: {
		fontSize: 30,
		fontWeight: "bold",
		textAlign: "left",
		marginTop: 60,
		marginBottom: 10,
		color: "#22223b",
		letterSpacing: 0.5,
	},
	subtitle: {
		fontSize: 14,
		color: "#4a4e69",
		textAlign: "left",
		marginBottom: 17,
	},
	subAvg: {
		fontWeight: "bold",
		color: "#3b82f6",
	},
	CaloriesCard: {
		flexDirection: "row",
		padding: 10,
		paddingTop: 28,
		marginBottom: 22,
		backgroundColor: "#fff",
		borderRadius: 22,
		borderWidth: 0,
		shadowColor: "#3b82f6",
		shadowOffset: { width: 0, height: 6 },
		shadowOpacity: 0.1,
		shadowRadius: 16,
		elevation: 8,
	},
	card: {
		backgroundColor: "#fff",
		padding: 10,
		borderRadius: 22,
		alignItems: "center",
		borderWidth: 0,
		shadowColor: "#3b82f6",
		shadowOffset: { width: 0, height: 6 },
		shadowOpacity: 0.1,
		shadowRadius: 16,
		elevation: 8,
		marginBottom: 32,
	},
	cardTitle: {
		fontSize: 18,
		color: "#4a4e69",
		marginBottom: 8,
		fontWeight: "600",
	},
	calories: {
		fontSize: 38,
		fontWeight: "bold",
		color: "#3b82f6",
		marginTop: 10,
		letterSpacing: 1,
	},
});
