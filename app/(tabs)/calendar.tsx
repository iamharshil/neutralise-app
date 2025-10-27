import Calendar from "@/components/calendar";
import { themeColors, useThemeStore } from "@/hooks/use-theme";
import { MaterialIcons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { useState } from "react";
import { Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function CalendarScreen() {
	const theme = useThemeStore((state) => state.theme);
	const colors = themeColors[theme];
	const insets = useSafeAreaInsets();
	const [selectedDate, setSelectedDate] = useState(new Date());
	const [scrollY, setScrollY] = useState(0);
	const showBlur = scrollY > 10;

	// Mock data for selected date
	const getMealsForDate = (date: Date) => {
		const dateString = date.toLocaleDateString();
		const mockMeals: Record<
			string,
			Array<{
				name: string;
				calories: number;
				time: string;
				icon: string;
				protein?: number;
				carbs?: number;
				fat?: number;
			}>
		> = {
			[new Date().toLocaleDateString()]: [
				{
					name: "Oatmeal with Berries",
					calories: 350,
					time: "08:00 AM",
					icon: "breakfast-dining",
					protein: 12,
					carbs: 54,
					fat: 6,
				},
				{
					name: "Grilled Chicken Salad",
					calories: 450,
					time: "01:00 PM",
					icon: "restaurant",
					protein: 42,
					carbs: 28,
					fat: 15,
				},
				{
					name: "Salmon with Rice",
					calories: 600,
					time: "07:00 PM",
					icon: "set-meal",
					protein: 38,
					carbs: 65,
					fat: 18,
				},
				{ name: "Greek Yogurt", calories: 150, time: "10:00 PM", icon: "local-dining", protein: 15, carbs: 12, fat: 4 },
			],
		};
		return mockMeals[dateString] || [];
	};

	const meals = getMealsForDate(selectedDate);
	const totalCalories = meals.reduce((sum, meal) => sum + meal.calories, 0);

	const dynamicStyles = {
		container: { ...styles.container, backgroundColor: colors.bg, paddingTop: insets.top + 12 },
		header: styles.header,
		title: { ...styles.title, color: colors.text },
		subtitle: { ...styles.subtitle, color: colors.textSecondary },
	};

	return (
		<View style={[styles.wrapper, { backgroundColor: colors.bg }]}>
			<ScrollView
				style={dynamicStyles.container}
				showsVerticalScrollIndicator={false}
				onScroll={(event) => {
					setScrollY(event.nativeEvent.contentOffset.y);
				}}
				scrollEventThrottle={16}
			>
				<View style={styles.headerRow}>
					<View>
						<Text style={dynamicStyles.title}>Calendar</Text>
						<Text style={dynamicStyles.subtitle}>Track your meals</Text>
					</View>
				</View>

				<View style={styles.calendarContainer}>
					<Calendar selectedDate={selectedDate} onDateSelect={setSelectedDate} />
				</View>

				{/* Date Info Card */}
				<View style={[styles.dateCard, { backgroundColor: colors.bgSecondary, borderColor: colors.border }]}>
					<View style={styles.dateIconContainer}>
						<MaterialIcons name="calendar-today" size={24} color={colors.accent} />
					</View>
					<View style={styles.dateContent}>
						<Text style={[styles.dateLabel, { color: colors.textSecondary }]}>Selected Date</Text>
						<Text style={[styles.dateValue, { color: colors.text }]}>
							{selectedDate.toLocaleDateString("en-US", {
								weekday: "short",
								month: "short",
								day: "numeric",
							})}
						</Text>
					</View>
					<View style={styles.dateStats}>
						<Text style={[styles.statsNumber, { color: colors.accent }]}>{meals.length}</Text>
						<Text style={[styles.statsLabel, { color: colors.textSecondary }]}>meals</Text>
					</View>
				</View>

				{/* Calorie Summary */}
				<View style={[styles.summaryCard, { backgroundColor: colors.bgSecondary, borderColor: colors.border }]}>
					<View style={styles.summaryTop}>
						<View>
							<Text style={[styles.summaryLabel, { color: colors.textSecondary }]}>Daily Intake</Text>
							<Text style={[styles.summaryValue, { color: colors.text }]}>{totalCalories}</Text>
							<Text style={[styles.summarySubtext, { color: colors.textTertiary }]}>kcal</Text>
						</View>
						<View style={styles.summaryDivider} />
						<View>
							<Text style={[styles.summaryLabel, { color: colors.textSecondary }]}>Daily Goal</Text>
							<Text style={[styles.summaryValue, { color: colors.text }]}>2,000</Text>
							<Text style={[styles.summarySubtext, { color: colors.textTertiary }]}>kcal</Text>
						</View>
						<View style={styles.summaryDivider} />
						<View style={styles.summaryBadge}>
							<Text style={[styles.summaryPercent, { color: colors.accent }]}>
								{Math.round((totalCalories / 2000) * 100)}%
							</Text>
							<Text style={[styles.summaryBadgeLabel, { color: colors.textSecondary }]}>done</Text>
						</View>
					</View>

					{totalCalories > 0 && (
						<View style={[styles.progressBar, { backgroundColor: colors.bgTertiary }]}>
							<View
								style={[
									styles.progressFill,
									{
										width: `${Math.min((totalCalories / 2000) * 100, 100)}%`,
										backgroundColor:
											totalCalories > 2000 ? colors.red : totalCalories > 1600 ? colors.amber : colors.green,
									},
								]}
							/>
						</View>
					)}
				</View>

				{/* Meals List */}
				{meals.length > 0 ? (
					<>
						<View style={styles.mealsSection}>
							<Text style={[styles.mealsTitle, { color: colors.text }]}>Meals Today</Text>
							<Text style={[styles.mealsCount, { color: colors.textSecondary }]}>{meals.length} logged</Text>
						</View>

						{meals.map((meal) => (
							<View
								key={`meal-${meal.name}-${meal.time}`}
								style={[styles.mealCard, { backgroundColor: colors.bgSecondary, borderColor: colors.border }]}
							>
								<View style={[styles.mealIconContainer, { backgroundColor: `${colors.accent}15` }]}>
									<MaterialIcons
										name={meal.icon as keyof typeof MaterialIcons.glyphMap}
										size={24}
										color={colors.accent}
									/>
								</View>
								<View style={styles.mealMainContent}>
									<View style={styles.mealTopRow}>
										<Text style={[styles.mealName, { color: colors.text }]}>{meal.name}</Text>
										<Text style={[styles.mealCalories, { color: colors.accent }]}>{meal.calories}</Text>
									</View>
									<Text style={[styles.mealTime, { color: colors.textSecondary }]}>{meal.time}</Text>
									{(meal.protein || meal.carbs || meal.fat) && (
										<View style={styles.mealMacros}>
											{meal.protein && (
												<View style={styles.macroTag}>
													<Text style={[styles.macroTagLabel, { color: colors.textSecondary }]}>P</Text>
													<Text style={[styles.macroTagValue, { color: colors.text }]}>{meal.protein}g</Text>
												</View>
											)}
											{meal.carbs && (
												<View style={styles.macroTag}>
													<Text style={[styles.macroTagLabel, { color: colors.textSecondary }]}>C</Text>
													<Text style={[styles.macroTagValue, { color: colors.text }]}>{meal.carbs}g</Text>
												</View>
											)}
											{meal.fat && (
												<View style={styles.macroTag}>
													<Text style={[styles.macroTagLabel, { color: colors.textSecondary }]}>F</Text>
													<Text style={[styles.macroTagValue, { color: colors.text }]}>{meal.fat}g</Text>
												</View>
											)}
										</View>
									)}
								</View>
								<TouchableOpacity style={[styles.mealActionButton, { borderColor: colors.border }]}>
									<MaterialIcons name="more-vert" size={20} color={colors.textSecondary} />
								</TouchableOpacity>
							</View>
						))}
					</>
				) : (
					<View style={[styles.emptyCard, { backgroundColor: colors.bgSecondary, borderColor: colors.border }]}>
						<MaterialIcons name="lunch-dining" size={48} color={colors.textSecondary} />
						<Text style={[styles.emptyText, { color: colors.text }]}>No meals logged</Text>
						<Text style={[styles.emptySubtext, { color: colors.textSecondary }]}>Add your first meal for this day</Text>
					</View>
				)}

				<View style={styles.footer} />
			</ScrollView>

			{/* Blur Header on Scroll */}
			{showBlur && <BlurView intensity={90} style={[styles.blurHeader, { height: insets.top }]} />}
		</View>
	);
}

const styles = StyleSheet.create({
	wrapper: {
		flex: 1,
	},
	container: {
		flex: 1,
		padding: 20,
		backgroundColor: "#f8fafc",
	},
	blurHeader: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		zIndex: 100,
		pointerEvents: "none",
	},
	header: {
		marginTop: 60,
		marginBottom: 24,
	},
	headerRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "flex-start",
		marginBottom: 24,
	},
	themeToggle: {
		padding: 8,
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
	// Date Card
	dateCard: {
		flexDirection: "row",
		alignItems: "center",
		padding: 16,
		borderRadius: 16,
		marginBottom: 20,
		borderWidth: 1,
		gap: 12,
	},
	dateIconContainer: {
		width: 48,
		height: 48,
		borderRadius: 12,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(59, 130, 246, 0.1)",
	},
	dateContent: {
		flex: 1,
	},
	dateLabel: {
		fontSize: 12,
		fontWeight: "500",
		marginBottom: 4,
	},
	dateValue: {
		fontSize: 14,
		fontWeight: "600",
	},
	dateStats: {
		alignItems: "center",
	},
	statsNumber: {
		fontSize: 18,
		fontWeight: "bold",
		marginBottom: 2,
	},
	statsLabel: {
		fontSize: 11,
		fontWeight: "500",
	},
	// Summary Card
	summaryCard: {
		padding: 16,
		borderRadius: 16,
		marginBottom: 20,
		borderWidth: 1,
	},
	summaryTop: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		marginBottom: 12,
		gap: 8,
	},
	summaryLabel: {
		fontSize: 12,
		fontWeight: "500",
		marginBottom: 6,
	},
	summaryValue: {
		fontSize: 24,
		fontWeight: "bold",
	},
	summarySubtext: {
		fontSize: 12,
		fontWeight: "400",
	},
	summaryDivider: {
		width: 1,
		height: 40,
		opacity: 0.2,
	},
	summaryBadge: {
		alignItems: "center",
	},
	summaryPercent: {
		fontSize: 16,
		fontWeight: "bold",
		marginBottom: 2,
	},
	summaryBadgeLabel: {
		fontSize: 11,
		fontWeight: "500",
	},
	progressBar: {
		height: 8,
		borderRadius: 4,
		overflow: "hidden",
	},
	progressFill: {
		height: "100%",
		borderRadius: 4,
	},
	// Meals Section
	mealsSection: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 12,
		paddingHorizontal: 4,
	},
	mealsTitle: {
		fontSize: 16,
		fontWeight: "bold",
	},
	mealsCount: {
		fontSize: 12,
		fontWeight: "500",
	},
	// Meal Card
	mealCard: {
		flexDirection: "row",
		alignItems: "center",
		padding: 12,
		borderRadius: 14,
		marginBottom: 10,
		borderWidth: 1,
		gap: 12,
	},
	mealIconContainer: {
		width: 44,
		height: 44,
		borderRadius: 10,
		justifyContent: "center",
		alignItems: "center",
	},
	mealMainContent: {
		flex: 1,
	},
	mealTopRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 4,
	},
	mealName: {
		fontSize: 13,
		fontWeight: "600",
		flex: 1,
	},
	mealCalories: {
		fontSize: 14,
		fontWeight: "bold",
		marginLeft: 8,
	},
	mealTime: {
		fontSize: 12,
		fontWeight: "400",
		marginBottom: 6,
	},
	mealMacros: {
		flexDirection: "row",
		gap: 6,
	},
	macroTag: {
		flexDirection: "row",
		paddingHorizontal: 6,
		paddingVertical: 3,
		borderRadius: 6,
		backgroundColor: "rgba(0, 0, 0, 0.05)",
		alignItems: "center",
		gap: 2,
	},
	macroTagLabel: {
		fontSize: 10,
		fontWeight: "600",
	},
	macroTagValue: {
		fontSize: 10,
		fontWeight: "500",
	},
	mealActionButton: {
		width: 36,
		height: 36,
		borderRadius: 8,
		justifyContent: "center",
		alignItems: "center",
		borderWidth: 1,
	},
	// Empty State
	emptyCard: {
		padding: 32,
		borderRadius: 16,
		alignItems: "center",
		borderWidth: 1,
		borderStyle: "dashed",
		marginBottom: 20,
	},
	emptyText: {
		fontSize: 14,
		fontWeight: "600",
		marginTop: 12,
		marginBottom: 4,
	},
	emptySubtext: {
		fontSize: 12,
		fontWeight: "400",
	},
	footer: {
		height: Platform.OS === "android" ? 80 : 32,
	},
});
