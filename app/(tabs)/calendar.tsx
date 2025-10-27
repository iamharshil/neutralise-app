import Calendar from "@/components/calendar";
import { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Card } from "tamagui";

export default function CalendarScreen() {
	const [selectedDate, setSelectedDate] = useState(new Date());

	// Mock data for selected date
	const getMealsForDate = (date: Date) => {
		const dateString = date.toLocaleDateString();
		const mockMeals: Record<string, Array<{ name: string; calories: number; time: string }>> = {
			[new Date().toLocaleDateString()]: [
				{ name: "Oatmeal with Berries", calories: 350, time: "08:00 AM" },
				{ name: "Grilled Chicken Salad", calories: 450, time: "01:00 PM" },
				{ name: "Salmon with Rice", calories: 600, time: "07:00 PM" },
				{ name: "Greek Yogurt", calories: 150, time: "10:00 PM" },
			],
		};
		return mockMeals[dateString] || [];
	};

	const meals = getMealsForDate(selectedDate);
	const totalCalories = meals.reduce((sum, meal) => sum + meal.calories, 0);

	return (
		<ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
			<View style={styles.header}>
				<Text style={styles.title}>Calendar</Text>
				<Text style={styles.subtitle}>View your daily nutrition</Text>
			</View>

			<View style={styles.calendarContainer}>
				<Calendar selectedDate={selectedDate} onDateSelect={setSelectedDate} />
			</View>

			<View style={styles.selectedDateInfo}>
				<Text style={styles.selectedDateLabel}>Selected Date</Text>
				<Text style={styles.selectedDateValue}>
					{selectedDate.toLocaleDateString("en-US", {
						weekday: "long",
						year: "numeric",
						month: "long",
						day: "numeric",
					})}
				</Text>
			</View>

			{/* Daily Summary */}
			<Card style={styles.summaryCard}>
				<View style={styles.summaryHeader}>
					<View>
						<Text style={styles.summaryLabel}>Total Calories</Text>
						<Text style={styles.summaryValue}>{totalCalories}</Text>
					</View>
					<View style={styles.summaryBadge}>
						<Text style={styles.summaryPercent}>{Math.round((totalCalories / 2000) * 100)}%</Text>
						<Text style={styles.summaryGoal}>of 2,000</Text>
					</View>
				</View>

				{totalCalories > 0 && (
					<View style={styles.progressBar}>
						<View
							style={[
								styles.progressFill,
								{
									width: `${Math.min((totalCalories / 2000) * 100, 100)}%`,
									backgroundColor: totalCalories > 2000 ? "#ef4444" : "#10b981",
								},
							]}
						/>
					</View>
				)}
			</Card>

			{/* Meals List */}
			{meals.length > 0 ? (
				<>
					<View style={styles.mealsHeader}>
						<Text style={styles.mealsTitle}>Meals ({meals.length})</Text>
					</View>

					{meals.map((meal) => (
						<Card key={`meal-${meal.name}-${meal.time}`} style={styles.mealCard}>
							<View style={styles.mealHeader}>
								<View style={styles.mealInfo}>
									<Text style={styles.mealName}>{meal.name}</Text>
									<Text style={styles.mealTime}>{meal.time}</Text>
								</View>
								<Text style={styles.mealCalories}>{meal.calories} kcal</Text>
							</View>
						</Card>
					))}
				</>
			) : (
				<Card style={styles.emptyCard}>
					<Text style={styles.emptyText}>No meals logged for this day</Text>
					<Text style={styles.emptySubtext}>Start logging your meals to see them here</Text>
				</Card>
			)}

			<View style={styles.footer} />
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		backgroundColor: "#f8fafc",
	},
	header: {
		marginTop: 60,
		marginBottom: 24,
	},
	title: {
		fontSize: 30,
		fontWeight: "bold",
		color: "#22223b",
		marginBottom: 8,
		letterSpacing: 0.5,
	},
	subtitle: {
		fontSize: 14,
		color: "#4a4e69",
	},
	calendarContainer: {
		marginBottom: 20,
	},
	selectedDateInfo: {
		marginBottom: 20,
		paddingHorizontal: 4,
	},
	selectedDateLabel: {
		fontSize: 12,
		color: "#4a4e69",
		fontWeight: "600",
		marginBottom: 6,
	},
	selectedDateValue: {
		fontSize: 18,
		color: "#22223b",
		fontWeight: "bold",
	},
	summaryCard: {
		backgroundColor: "#fff",
		padding: 16,
		borderRadius: 22,
		marginBottom: 20,
		borderWidth: 0,
		shadowColor: "#3b82f6",
		shadowOffset: { width: 0, height: 6 },
		shadowOpacity: 0.1,
		shadowRadius: 16,
		elevation: 8,
	},
	summaryHeader: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "flex-start",
		marginBottom: 12,
	},
	summaryLabel: {
		fontSize: 12,
		color: "#4a4e69",
		fontWeight: "600",
		marginBottom: 6,
	},
	summaryValue: {
		fontSize: 28,
		fontWeight: "bold",
		color: "#22223b",
	},
	summaryBadge: {
		backgroundColor: "#f0f9ff",
		paddingHorizontal: 12,
		paddingVertical: 8,
		borderRadius: 12,
		alignItems: "center",
	},
	summaryPercent: {
		fontSize: 16,
		fontWeight: "bold",
		color: "#3b82f6",
	},
	summaryGoal: {
		fontSize: 10,
		color: "#4a4e69",
		fontWeight: "500",
	},
	progressBar: {
		height: 8,
		backgroundColor: "#e2e8f0",
		borderRadius: 4,
		overflow: "hidden",
	},
	progressFill: {
		height: "100%",
		borderRadius: 4,
	},
	mealsHeader: {
		marginBottom: 12,
	},
	mealsTitle: {
		fontSize: 16,
		fontWeight: "bold",
		color: "#22223b",
	},
	mealCard: {
		backgroundColor: "#fff",
		padding: 12,
		borderRadius: 16,
		marginBottom: 10,
		borderWidth: 0,
		shadowColor: "#3b82f6",
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.08,
		shadowRadius: 12,
		elevation: 4,
	},
	mealHeader: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	mealInfo: {
		flex: 1,
	},
	mealName: {
		fontSize: 14,
		fontWeight: "600",
		color: "#22223b",
		marginBottom: 4,
	},
	mealTime: {
		fontSize: 12,
		color: "#4a4e69",
	},
	mealCalories: {
		fontSize: 14,
		fontWeight: "bold",
		color: "#3b82f6",
		marginLeft: 12,
	},
	emptyCard: {
		backgroundColor: "#f0f9ff",
		padding: 24,
		borderRadius: 16,
		alignItems: "center",
		borderWidth: 1,
		borderColor: "#bfdbfe",
		borderStyle: "dashed",
		shadowColor: "transparent",
		elevation: 0,
	},
	emptyText: {
		fontSize: 14,
		fontWeight: "600",
		color: "#22223b",
		marginBottom: 4,
	},
	emptySubtext: {
		fontSize: 12,
		color: "#4a4e69",
	},
	footer: {
		height: 32,
	},
});
