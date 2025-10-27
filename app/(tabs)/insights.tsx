import { themeColors, useThemeStore } from "@/hooks/use-theme";
import { MaterialIcons } from "@expo/vector-icons";
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

type TimeRange = "week" | "month" | "year";

export default function Insights() {
	const theme = useThemeStore((state) => state.theme);
	const toggleTheme = useThemeStore((state) => state.toggleTheme);
	const colors = themeColors[theme];
	const insets = useSafeAreaInsets();
	const [timeRange, setTimeRange] = useState<TimeRange>("week");

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

	const dynamicStyles = {
		container: { ...styles.container, backgroundColor: colors.bg, paddingTop: insets.top + 12 },
		header: styles.header,
		title: { ...styles.title, color: colors.text },
		subtitle: { ...styles.subtitle, color: colors.textSecondary },
		insightCard: { backgroundColor: colors.bgSecondary, borderColor: colors.border },
		insightLabel: { color: colors.textSecondary },
		insightValue: { color: colors.text },
		insightChange: { color: colors.textSecondary },
		timeRangeButton: { borderColor: colors.border },
		timeRangeButtonActive: { backgroundColor: colors.accent, borderColor: colors.accent },
		timeRangeButtonText: { color: colors.text },
		timeRangeButtonTextActive: { color: "#fff" },
		chartBar: { backgroundColor: colors.bgTertiary },
		macroCard: { backgroundColor: colors.bgSecondary, borderColor: colors.border },
		macroLabel: { color: colors.textSecondary },
		macroValue: { color: colors.text },
		sectionTitle: { color: colors.text },
	};

	return (
		<ScrollView style={dynamicStyles.container} showsVerticalScrollIndicator={false}>
			<View style={styles.headerRow}>
				<View>
					<Text style={dynamicStyles.title}>Insights</Text>
					<Text style={dynamicStyles.subtitle}>Your nutrition analytics</Text>
				</View>
				<TouchableOpacity onPress={toggleTheme} style={styles.themeToggle}>
					<MaterialIcons name={theme === "dark" ? "light-mode" : "dark-mode"} size={24} color={colors.accent} />
				</TouchableOpacity>
			</View>

			{/* Time Range Selector */}
			<View style={styles.timeRangeContainer}>
				{(["week", "month", "year"] as const).map((range) => (
					<TouchableOpacity
						key={range}
						style={[styles.timeRangeButton, timeRange === range && styles.timeRangeButtonActive]}
						onPress={() => setTimeRange(range)}
					>
						<Text style={[styles.timeRangeButtonText, timeRange === range && styles.timeRangeButtonTextActive]}>
							{range === "week" ? "Week" : range === "month" ? "Month" : "Year"}
						</Text>
					</TouchableOpacity>
				))}
			</View>

			{/* Key Metrics */}
			<View style={styles.insightsGrid}>
				{insights.map((insight) => (
					<View
						key={`insight-${insight.label}`}
						style={[styles.insightCard, { backgroundColor: colors.bgSecondary, borderColor: colors.border }]}
					>
						<View style={styles.insightIconContainer}>
							<MaterialIcons
								name={insight.icon as keyof typeof MaterialIcons.glyphMap}
								size={20}
								color={colors.accent}
							/>
						</View>
						<Text style={[styles.insightLabel, { color: colors.textSecondary }]}>{insight.label}</Text>
						<Text style={[styles.insightValue, { color: colors.text }]}>{insight.value}</Text>
						<Text
							style={[
								styles.insightChange,
								insight.isPositive ? styles.positive : styles.negative,
								{ color: insight.isPositive ? colors.green : colors.red },
							]}
						>
							{insight.change}
						</Text>
					</View>
				))}
			</View>

			{/* Macro Breakdown */}
			<View style={[styles.macroCard, { backgroundColor: colors.bgSecondary, borderColor: colors.border }]}>
				<Text style={[styles.cardTitle, { color: colors.text }]}>Today's Macro Breakdown</Text>
				<View style={styles.macroContainer}>
					<View style={styles.macroList}>
						{macroBreakdown.map((macro) => (
							<View key={macro.label} style={styles.macroRow}>
								<View style={styles.macroLabelContainer}>
									<View style={[styles.macroColorDot, { backgroundColor: macro.color }]} />
									<View>
										<Text style={styles.macroLabel}>{macro.label}</Text>
										<Text style={styles.macroValue}>{macro.value}g</Text>
									</View>
								</View>
								<View style={styles.macroPercentageContainer}>
									<Text style={styles.macroPercentage}>{macro.percentage}%</Text>
								</View>
							</View>
						))}
					</View>
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

			{/* Weekly Trend */}
			<View style={[styles.trendCard, { backgroundColor: colors.bgSecondary, borderColor: colors.border }]}>
				<Text style={styles.cardTitle}>Weekly Trend</Text>
				<View style={styles.trendData}>
					{weeklyData.map((item) => (
						<View key={item.day} style={styles.trendItem}>
							<View style={styles.trendBarContainer}>
								<View
									style={[
										styles.trendBar,
										{
											height: `${Math.min((item.percentage / 115) * 100, 100)}%`,
											backgroundColor: item.percentage > 105 ? "#ef4444" : item.percentage < 85 ? "#f59e0b" : "#10b981",
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

			{/* Monthly Stats */}
			{timeRange === "month" && (
				<View style={[styles.statsCard, { backgroundColor: colors.bgSecondary, borderColor: colors.border }]}>
					<Text style={[styles.cardTitle, { color: colors.text }]}>Monthly Breakdown</Text>
					{monthlyStats.map((stat) => (
						<View key={`month-${stat.week}`} style={styles.statRow}>
							<Text style={[styles.statLabel, { color: colors.textSecondary }]}>{stat.week}</Text>
							<View style={[styles.statBarBackground, { backgroundColor: colors.bgTertiary }]}>
								<View
									style={[styles.statBar, { width: `${(stat.avg / 2200) * 100}%`, backgroundColor: colors.accent }]}
								/>
							</View>
							<Text style={[styles.statValue, { color: colors.text }]}>{stat.avg} cal</Text>
						</View>
					))}
				</View>
			)}

			{/* Summary */}
			<View style={[styles.summaryCard, { backgroundColor: colors.bgSecondary, borderColor: colors.border }]}>
				<View style={styles.summaryRow}>
					<View>
						<Text style={[styles.summaryLabel, { color: colors.textSecondary }]}>Total Calories This Week</Text>
						<Text style={[styles.summaryValue, { color: colors.text }]}>14,220</Text>
					</View>
					<View style={[styles.summaryDivider, { backgroundColor: colors.border }]} />
					<View>
						<Text style={[styles.summaryLabel, { color: colors.textSecondary }]}>Weekly Average</Text>
						<Text style={[styles.summaryValue, { color: colors.text }]}>2,031</Text>
					</View>
				</View>
			</View>

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
	timeRangeContainer: {
		flexDirection: "row",
		gap: 8,
		marginBottom: 24,
		justifyContent: "center",
	},
	timeRangeButton: {
		paddingHorizontal: 16,
		paddingVertical: 8,
		borderRadius: 20,
		backgroundColor: "#e2e8f0",
	},
	timeRangeButtonActive: {
		backgroundColor: "#3b82f6",
	},
	timeRangeButtonText: {
		fontSize: 12,
		fontWeight: "600",
		color: "#4a4e69",
	},
	timeRangeButtonTextActive: {
		color: "#fff",
	},
	insightsGrid: {
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "space-between",
		marginBottom: 20,
	},
	insightCard: {
		width: "48%",
		backgroundColor: "#fff",
		padding: 14,
		borderRadius: 16,
		marginBottom: 12,
		borderWidth: 0,
		shadowColor: "#3b82f6",
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.08,
		shadowRadius: 12,
		elevation: 4,
	},
	insightIconContainer: {
		marginBottom: 8,
	},
	insightLabel: {
		fontSize: 12,
		color: "#4a4e69",
		fontWeight: "600",
		marginBottom: 6,
	},
	insightValue: {
		fontSize: 18,
		fontWeight: "bold",
		color: "#22223b",
		marginBottom: 4,
	},
	insightChange: {
		fontSize: 11,
		fontWeight: "500",
	},
	positive: {
		color: "#10b981",
	},
	negative: {
		color: "#f59e0b",
	},
	macroCard: {
		backgroundColor: "#fff",
		padding: 16,
		borderRadius: 22,
		borderWidth: 0,
		shadowColor: "#3b82f6",
		shadowOffset: { width: 0, height: 6 },
		shadowOpacity: 0.1,
		shadowRadius: 16,
		elevation: 8,
		marginBottom: 20,
	},
	macroContainer: {
		marginTop: 16,
	},
	macroList: {
		marginBottom: 16,
	},
	macroRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingVertical: 10,
		borderBottomWidth: 1,
		borderBottomColor: "#e2e8f0",
	},
	macroLabelContainer: {
		flexDirection: "row",
		alignItems: "center",
		gap: 12,
	},
	macroColorDot: {
		width: 12,
		height: 12,
		borderRadius: 6,
	},
	macroLabel: {
		fontSize: 12,
		color: "#4a4e69",
		fontWeight: "600",
	},
	macroValue: {
		fontSize: 14,
		color: "#22223b",
		fontWeight: "bold",
		marginTop: 2,
	},
	macroPercentageContainer: {
		backgroundColor: "#f1f5f9",
		paddingHorizontal: 12,
		paddingVertical: 4,
		borderRadius: 8,
	},
	macroPercentage: {
		fontSize: 12,
		fontWeight: "bold",
		color: "#3b82f6",
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
	trendCard: {
		backgroundColor: "#fff",
		padding: 16,
		borderRadius: 22,
		borderWidth: 0,
		shadowColor: "#3b82f6",
		shadowOffset: { width: 0, height: 6 },
		shadowOpacity: 0.1,
		shadowRadius: 16,
		elevation: 8,
		marginBottom: 20,
	},
	cardTitle: {
		fontSize: 16,
		fontWeight: "bold",
		color: "#22223b",
		marginBottom: 16,
	},
	trendData: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "flex-end",
		height: 180,
		gap: 8,
	},
	trendItem: {
		alignItems: "center",
		flex: 1,
		justifyContent: "flex-end",
	},
	trendBarContainer: {
		width: "100%",
		height: 120,
		backgroundColor: "#f1f5f9",
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
		fontSize: 11,
		color: "#4a4e69",
		fontWeight: "600",
		marginBottom: 4,
	},
	trendValue: {
		fontSize: 10,
		color: "#22223b",
		fontWeight: "bold",
	},
	statsCard: {
		backgroundColor: "#fff",
		padding: 16,
		borderRadius: 22,
		borderWidth: 0,
		shadowColor: "#3b82f6",
		shadowOffset: { width: 0, height: 6 },
		shadowOpacity: 0.1,
		shadowRadius: 16,
		elevation: 8,
		marginBottom: 20,
	},
	statRow: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 12,
		gap: 12,
	},
	statLabel: {
		width: 60,
		fontSize: 12,
		color: "#4a4e69",
		fontWeight: "600",
	},
	statBarBackground: {
		flex: 1,
		height: 8,
		backgroundColor: "#e2e8f0",
		borderRadius: 4,
		overflow: "hidden",
	},
	statBar: {
		height: "100%",
		backgroundColor: "#3b82f6",
		borderRadius: 4,
	},
	statValue: {
		width: 50,
		fontSize: 12,
		color: "#22223b",
		fontWeight: "bold",
		textAlign: "right",
	},
	summaryCard: {
		backgroundColor: "#f0f9ff",
		padding: 16,
		borderRadius: 22,
		borderWidth: 1,
		borderColor: "#bfdbfe",
		marginBottom: 32,
	},
	summaryRow: {
		flexDirection: "row",
		justifyContent: "space-around",
		alignItems: "center",
	},
	summaryLabel: {
		fontSize: 12,
		color: "#4a4e69",
		fontWeight: "600",
		marginBottom: 4,
	},
	summaryValue: {
		fontSize: 20,
		color: "#3b82f6",
		fontWeight: "bold",
	},
	summaryDivider: {
		width: 1,
		height: 50,
		backgroundColor: "#bfdbfe",
	},
	footer: {
		height: Platform.OS === "android" ? 80 : 32,
	},
});
