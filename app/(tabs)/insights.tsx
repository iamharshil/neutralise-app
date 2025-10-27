import { themeColors, useThemeStore } from "@/hooks/use-theme";
import { MaterialIcons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { useState } from "react";
import { Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface InsightData {
	label: string;
	value: string;
	change: string;
	isPositive: boolean;
	icon: string;
}

interface MacroBreakdown {
	label: string;
	value: number;
	color: string;
	percentage: number;
}

interface TopUser {
	rank: number;
	name: string;
	calories: number;
	streak: number;
	avatar?: string;
}

type TimeRange = "week" | "month" | "year";

export default function Insights() {
	const theme = useThemeStore((state) => state.theme);
	const colors = themeColors[theme];
	const insets = useSafeAreaInsets();
	const [timeRange, setTimeRange] = useState<TimeRange>("week");
	const [scrollY, setScrollY] = useState(0);
	const showBlur = scrollY > 10;

	const insights: InsightData[] = [
		{
			label: "Daily Average",
			value: "1,950 kcal",
			change: "+5% from last week",
			isPositive: false,
			icon: "restaurant",
		},
		{
			label: "Consistency",
			value: "6/7 days",
			change: "Great tracking!",
			isPositive: true,
			icon: "check-circle",
		},
		{
			label: "Goal Achievement",
			value: "85%",
			change: "On track for the week",
			isPositive: true,
			icon: "trending-up",
		},
		{
			label: "Best Streak",
			value: "12 days",
			change: "Keep it going!",
			isPositive: true,
			icon: "local-fire-department",
		},
	];

	const macroBreakdown: MacroBreakdown[] = [
		{ label: "Protein", value: 150, color: "#ef4444", percentage: 35 },
		{ label: "Carbs", value: 220, color: "#3b82f6", percentage: 45 },
		{ label: "Fat", value: 80, color: "#f59e0b", percentage: 20 },
	];

	const weeklyData = [
		{ day: "Mon", calories: 2000, goal: 2000, percentage: 100 },
		{ day: "Tue", calories: 1890, goal: 2000, percentage: 95 },
		{ day: "Wed", calories: 2200, goal: 2000, percentage: 110 },
		{ day: "Thu", calories: 1950, goal: 2000, percentage: 98 },
		{ day: "Fri", calories: 2100, goal: 2000, percentage: 105 },
		{ day: "Sat", calories: 2300, goal: 2000, percentage: 115 },
		{ day: "Sun", calories: 1780, goal: 2000, percentage: 89 },
	];

	const monthlyStats = [
		{ week: "Week 1", avg: 1950, goal: 2000 },
		{ week: "Week 2", avg: 2020, goal: 2000 },
		{ week: "Week 3", avg: 1890, goal: 2000 },
		{ week: "Week 4", avg: 2100, goal: 2000 },
	];

	const topUsers: { today: TopUser[]; week: TopUser[]; month: TopUser[] } = {
		today: [
			{ rank: 1, name: "Alex Chen", calories: 2100, streak: 45 },
			{ rank: 2, name: "Jordan Blake", calories: 2050, streak: 32 },
			{ rank: 3, name: "Sam Torres", calories: 1980, streak: 28 },
			{ rank: 4, name: "Morgan Lee", calories: 1950, streak: 25 },
			{ rank: 5, name: "Casey Kim", calories: 1920, streak: 22 },
		],
		week: [
			{ rank: 1, name: "Taylor Swift", calories: 14500, streak: 7 },
			{ rank: 2, name: "Jordan Blake", calories: 14200, streak: 7 },
			{ rank: 3, name: "Alex Chen", calories: 13900, streak: 6 },
			{ rank: 4, name: "Morgan Lee", calories: 13700, streak: 6 },
			{ rank: 5, name: "Casey Kim", calories: 13400, streak: 5 },
		],
		month: [
			{ rank: 1, name: "Alex Chen", calories: 58200, streak: 45 },
			{ rank: 2, name: "Taylor Swift", calories: 57800, streak: 28 },
			{ rank: 3, name: "Jordan Blake", calories: 57200, streak: 32 },
			{ rank: 4, name: "Morgan Lee", calories: 56500, streak: 25 },
			{ rank: 5, name: "Casey Kim", calories: 55900, streak: 22 },
		],
	};

	return (
		<View style={[styles.wrapper, { backgroundColor: colors.bg }]}>
			<ScrollView
				style={[styles.container, { paddingTop: insets.top + 12 }]}
				showsVerticalScrollIndicator={false}
				onScroll={(event) => {
					setScrollY(event.nativeEvent.contentOffset.y);
				}}
				scrollEventThrottle={16}
			>
				{/* Header */}
				<View style={styles.headerRow}>
					<View>
						<Text style={[styles.title, { color: colors.text }]}>Insights</Text>
						<Text style={[styles.subtitle, { color: colors.textSecondary }]}>Your nutrition analytics</Text>
					</View>
				</View>

				{/* Time Range Selector */}
				<View style={styles.timeRangeContainer}>
					{(["week", "month", "year"] as const).map((range) => (
						<TouchableOpacity
							key={range}
							style={[
								styles.timeRangeButton,
								{ borderColor: colors.border },
								timeRange === range && { backgroundColor: colors.accent, borderColor: colors.accent },
							]}
							onPress={() => setTimeRange(range)}
						>
							<Text
								style={[styles.timeRangeButtonText, { color: timeRange === range ? "#fff" : colors.textSecondary }]}
							>
								{range === "week" ? "Week" : range === "month" ? "Month" : "Year"}
							</Text>
						</TouchableOpacity>
					))}
				</View>

				{/* Key Metrics Grid */}
				<View style={styles.insightsGrid}>
					{insights.map((insight) => (
						<View
							key={`insight-${insight.label}`}
							style={[styles.insightCard, { backgroundColor: colors.bgSecondary, borderColor: colors.border }]}
						>
							<View style={[styles.insightIconContainer, { backgroundColor: `${colors.accent}15` }]}>
								<MaterialIcons
									name={insight.icon as keyof typeof MaterialIcons.glyphMap}
									size={24}
									color={colors.accent}
								/>
							</View>
							<Text style={[styles.insightLabel, { color: colors.textSecondary }]}>{insight.label}</Text>
							<Text style={[styles.insightValue, { color: colors.text }]}>{insight.value}</Text>
							<Text style={[styles.insightChange, { color: insight.isPositive ? colors.green : colors.amber }]}>
								{insight.isPositive ? "↑" : "↔"} {insight.change}
							</Text>
						</View>
					))}
				</View>

				{/* Macro Breakdown */}
				<View style={[styles.macroCard, { backgroundColor: colors.bgSecondary, borderColor: colors.border }]}>
					<View style={styles.cardHeader}>
						<MaterialIcons name="pie-chart" size={20} color={colors.accent} />
						<Text style={[styles.cardTitle, { color: colors.text }]}>Today's Macro Breakdown</Text>
					</View>

					<View style={styles.macroContainer}>
						{/* Macro List */}
						<View style={styles.macroList}>
							{macroBreakdown.map((macro) => (
								<View key={macro.label} style={[styles.macroRow, { borderBottomColor: colors.border }]}>
									<View style={styles.macroLabelContainer}>
										<View style={[styles.macroColorDot, { backgroundColor: macro.color }]} />
										<View>
											<Text style={[styles.macroLabel, { color: colors.textSecondary }]}>{macro.label}</Text>
											<Text style={[styles.macroValue, { color: colors.text }]}>{macro.value}g</Text>
										</View>
									</View>
									<Text style={[styles.macroPercentage, { color: colors.accent }]}>{macro.percentage}%</Text>
								</View>
							))}
						</View>

						{/* Macro Progress Bar */}
						<View style={styles.macroChart}>
							{macroBreakdown.map((macro, barIndex) => (
								<View
									key={`bar-${macro.label}`}
									style={[
										styles.macroBar,
										{
											flex: macro.percentage,
											backgroundColor: macro.color,
											borderTopLeftRadius: barIndex === 0 ? 8 : 0,
											borderBottomLeftRadius: barIndex === 0 ? 8 : 0,
											borderTopRightRadius: barIndex === macroBreakdown.length - 1 ? 8 : 0,
											borderBottomRightRadius: barIndex === macroBreakdown.length - 1 ? 8 : 0,
										},
									]}
								/>
							))}
						</View>
					</View>
				</View>

				{/* Weekly Trend Chart */}
				<View style={[styles.trendCard, { backgroundColor: colors.bgSecondary, borderColor: colors.border }]}>
					<View style={styles.cardHeader}>
						<MaterialIcons name="show-chart" size={20} color={colors.accent} />
						<Text style={[styles.cardTitle, { color: colors.text }]}>Weekly Trend</Text>
					</View>

					<View style={styles.trendData}>
						{weeklyData.map((item) => (
							<View key={item.day} style={styles.trendItem}>
								<View style={[styles.trendBarContainer, { backgroundColor: colors.bgTertiary }]}>
									<View
										style={[
											styles.trendBar,
											{
												height: `${Math.min((item.percentage / 115) * 100, 100)}%`,
												backgroundColor:
													item.percentage > 105 ? colors.red : item.percentage < 85 ? colors.amber : colors.green,
											},
										]}
									/>
								</View>
								<Text style={[styles.trendDay, { color: colors.textSecondary }]}>{item.day}</Text>
								<Text style={[styles.trendValue, { color: colors.text }]}>{item.calories}</Text>
							</View>
						))}
					</View>
				</View>

				{/* Monthly Stats - Show on Month selection */}
				{timeRange === "month" && (
					<View style={[styles.statsCard, { backgroundColor: colors.bgSecondary, borderColor: colors.border }]}>
						<View style={styles.cardHeader}>
							<MaterialIcons name="calendar-month" size={20} color={colors.accent} />
							<Text style={[styles.cardTitle, { color: colors.text }]}>Monthly Breakdown</Text>
						</View>

						{monthlyStats.map((stat) => (
							<View key={`month-${stat.week}`} style={styles.statRow}>
								<Text style={[styles.statLabel, { color: colors.textSecondary }]}>{stat.week}</Text>
								<View style={[styles.statBarBackground, { backgroundColor: colors.bgTertiary }]}>
									<View
										style={[styles.statBar, { width: `${(stat.avg / 2200) * 100}%`, backgroundColor: colors.accent }]}
									/>
								</View>
								<Text style={[styles.statValue, { color: colors.text }]}>{stat.avg}</Text>
							</View>
						))}
					</View>
				)}

				{/* Summary Card */}
				<View style={[styles.summaryCard, { backgroundColor: `${colors.accent}15`, borderColor: colors.accent }]}>
					<View style={styles.summaryRow}>
						<View style={styles.summaryItem}>
							<MaterialIcons name="whatshot" size={20} color={colors.accent} />
							<View style={{ marginLeft: 12, flex: 1 }}>
								<Text style={[styles.summaryLabel, { color: colors.textSecondary }]}>Total Calories</Text>
								<Text style={[styles.summaryValue, { color: colors.text }]}>14,220 kcal</Text>
							</View>
						</View>
						<View style={[styles.summaryDivider, { backgroundColor: colors.border }]} />
						<View style={styles.summaryItem}>
							<MaterialIcons name="trending-up" size={20} color={colors.accent} />
							<View style={{ marginLeft: 12, flex: 1 }}>
								<Text style={[styles.summaryLabel, { color: colors.textSecondary }]}>Weekly Avg</Text>
								<Text style={[styles.summaryValue, { color: colors.text }]}>2,031 kcal</Text>
							</View>
						</View>
					</View>
				</View>

				{/* Top 25 Users Leaderboard */}
				<View style={[styles.leaderboardCard, { backgroundColor: colors.bgSecondary, borderColor: colors.border }]}>
					<View style={styles.cardHeader}>
						<MaterialIcons name="leaderboard" size={20} color={colors.accent} />
						<Text style={[styles.cardTitle, { color: colors.text }]}>
							{timeRange === "week" ? "Top 5 This Week" : timeRange === "month" ? "Top 5 This Month" : "Top 5 Today"}
						</Text>
					</View>

					<View style={styles.leaderboardList}>
						{(timeRange === "week" ? topUsers.week : timeRange === "month" ? topUsers.month : topUsers.today).map(
							(user, index) => (
								<View key={`user-${user.rank}`} style={[styles.leaderboardRow, { borderBottomColor: colors.border }]}>
									<View style={styles.rankBadge}>
										{index === 0 ? (
											<MaterialIcons name="emoji-events" size={20} color="#FFD700" />
										) : index === 1 ? (
											<MaterialIcons name="emoji-events" size={20} color="#C0C0C0" />
										) : index === 2 ? (
											<MaterialIcons name="emoji-events" size={20} color="#CD7F32" />
										) : (
											<Text style={[styles.rankText, { color: colors.textSecondary }]}>#{user.rank}</Text>
										)}
									</View>

									<View style={styles.userInfo}>
										<Text style={[styles.userName, { color: colors.text }]} numberOfLines={1}>
											{user.name}
										</Text>
										<View style={styles.userStats}>
											<MaterialIcons name="local-fire-department" size={12} color={colors.red} />
											<Text style={[styles.streakText, { color: colors.textSecondary }]}>{user.streak} day streak</Text>
										</View>
									</View>

									<View style={styles.calorieInfo}>
										<Text style={[styles.calorieValue, { color: colors.accent }]}>
											{user.calories.toLocaleString()}
										</Text>
										<Text style={[styles.calorieLabel, { color: colors.textSecondary }]}>kcal</Text>
									</View>
								</View>
							),
						)}
					</View>
				</View>

				<View style={styles.footer} />
			</ScrollView>

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
		padding: 16,
	},
	blurHeader: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		zIndex: 100,
		pointerEvents: "none",
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
		marginBottom: 8,
		letterSpacing: 0.5,
	},
	subtitle: {
		fontSize: 14,
	},
	timeRangeContainer: {
		flexDirection: "row",
		gap: 8,
		marginBottom: 24,
		justifyContent: "center",
	},
	timeRangeButton: {
		paddingHorizontal: 14,
		paddingVertical: 8,
		borderRadius: 20,
		borderWidth: 1.5,
	},
	timeRangeButtonText: {
		fontSize: 12,
		fontWeight: "600",
	},
	insightsGrid: {
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "space-between",
		marginBottom: 20,
		gap: 10,
	},
	insightCard: {
		width: "48%",
		padding: 14,
		borderRadius: 14,
		borderWidth: 1,
	},
	insightIconContainer: {
		width: 40,
		height: 40,
		borderRadius: 10,
		justifyContent: "center",
		alignItems: "center",
		marginBottom: 10,
	},
	insightLabel: {
		fontSize: 11,
		fontWeight: "600",
		marginBottom: 6,
	},
	insightValue: {
		fontSize: 16,
		fontWeight: "bold",
		marginBottom: 4,
	},
	insightChange: {
		fontSize: 10,
		fontWeight: "500",
	},
	// Card Header with icon
	cardHeader: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 16,
		gap: 10,
	},
	cardTitle: {
		fontSize: 16,
		fontWeight: "bold",
	},
	// Macro Card
	macroCard: {
		padding: 16,
		borderRadius: 16,
		borderWidth: 1,
		marginBottom: 20,
	},
	macroContainer: {
		marginTop: 12,
	},
	macroList: {
		marginBottom: 14,
	},
	macroRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingVertical: 10,
		borderBottomWidth: 1,
	},
	macroLabelContainer: {
		flexDirection: "row",
		alignItems: "center",
		gap: 10,
		flex: 1,
	},
	macroColorDot: {
		width: 10,
		height: 10,
		borderRadius: 5,
	},
	macroLabel: {
		fontSize: 11,
		fontWeight: "600",
		marginBottom: 2,
	},
	macroValue: {
		fontSize: 13,
		fontWeight: "bold",
	},
	macroPercentage: {
		fontSize: 12,
		fontWeight: "bold",
	},
	macroChart: {
		flexDirection: "row",
		height: 20,
		borderRadius: 8,
		overflow: "hidden",
		gap: 0,
	},
	macroBar: {
		minWidth: 4,
	},
	// Trend Card
	trendCard: {
		padding: 16,
		borderRadius: 16,
		borderWidth: 1,
		marginBottom: 20,
	},
	trendData: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "flex-end",
		height: 180,
		gap: 6,
	},
	trendItem: {
		alignItems: "center",
		flex: 1,
		justifyContent: "flex-end",
	},
	trendBarContainer: {
		width: "100%",
		height: 120,
		borderRadius: 6,
		justifyContent: "flex-end",
		alignItems: "center",
		marginBottom: 8,
	},
	trendBar: {
		width: "80%",
		borderRadius: 4,
	},
	trendDay: {
		fontSize: 10,
		fontWeight: "600",
		marginBottom: 4,
	},
	trendValue: {
		fontSize: 10,
		fontWeight: "bold",
	},
	// Stats Card
	statsCard: {
		padding: 16,
		borderRadius: 16,
		borderWidth: 1,
		marginBottom: 20,
	},
	statRow: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 12,
		gap: 10,
	},
	statLabel: {
		width: 60,
		fontSize: 11,
		fontWeight: "600",
	},
	statBarBackground: {
		flex: 1,
		height: 8,
		borderRadius: 4,
		overflow: "hidden",
	},
	statBar: {
		height: "100%",
		borderRadius: 4,
	},
	statValue: {
		width: 40,
		fontSize: 11,
		fontWeight: "bold",
		textAlign: "right",
	},
	// Summary Card
	summaryCard: {
		padding: 16,
		borderRadius: 16,
		borderWidth: 1,
		marginBottom: 32,
	},
	summaryRow: {
		flexDirection: "row",
		justifyContent: "space-around",
		alignItems: "center",
	},
	summaryItem: {
		flex: 1,
		flexDirection: "row",
		alignItems: "center",
	},
	summaryLabel: {
		fontSize: 11,
		fontWeight: "600",
		marginBottom: 4,
	},
	summaryValue: {
		fontSize: 16,
		fontWeight: "bold",
	},
	summaryDivider: {
		width: 1,
		height: 50,
		marginHorizontal: 12,
	},
	// Leaderboard Card
	leaderboardCard: {
		padding: 16,
		borderRadius: 16,
		borderWidth: 1,
		marginBottom: 20,
	},
	leaderboardList: {
		marginTop: 12,
	},
	leaderboardRow: {
		flexDirection: "row",
		alignItems: "center",
		paddingVertical: 12,
		borderBottomWidth: 1,
		gap: 12,
	},
	rankBadge: {
		width: 40,
		height: 40,
		borderRadius: 20,
		justifyContent: "center",
		alignItems: "center",
	},
	rankText: {
		fontSize: 12,
		fontWeight: "bold",
	},
	userInfo: {
		flex: 1,
	},
	userName: {
		fontSize: 13,
		fontWeight: "600",
		marginBottom: 4,
	},
	userStats: {
		flexDirection: "row",
		alignItems: "center",
		gap: 4,
	},
	streakText: {
		fontSize: 10,
		fontWeight: "500",
	},
	calorieInfo: {
		alignItems: "flex-end",
	},
	calorieValue: {
		fontSize: 13,
		fontWeight: "bold",
		marginBottom: 2,
	},
	calorieLabel: {
		fontSize: 9,
		fontWeight: "500",
	},
	footer: {
		height: Platform.OS === "android" ? 80 : 32,
	},
});
