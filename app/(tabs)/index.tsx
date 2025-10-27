import { themeColors, useThemeStore } from "@/hooks/use-theme";
import { MaterialIcons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { useState } from "react";
import { Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Card } from "tamagui";

interface Badge {
	id: string;
	name: string;
	icon: string;
	achieved: boolean;
	color: string;
}

export default function Home() {
	const theme = useThemeStore((state) => state.theme);
	const colors = themeColors[theme];
	const insets = useSafeAreaInsets();
	const [scrollY, setScrollY] = useState(0);
	const showBlur = scrollY > 10;
	// Theme-aware blur intensity: higher for dark mode, lower for light mode
	const blurIntensity = theme === "dark" ? 90 : 70;

	const currentCalories = 1250;
	const goalCalories = 2000;
	const caloriePercentage = (currentCalories / goalCalories) * 100;

	const macros = {
		protein: { current: 45, goal: 150, unit: "g" },
		carbs: { current: 120, goal: 250, unit: "g" },
		fat: { current: 35, goal: 65, unit: "g" },
	};

	const badges: Badge[] = [
		{ id: "1", name: "7-Day Streak", icon: "local-fire-department", achieved: true, color: colors.red },
		{ id: "2", name: "Perfect Day", icon: "check-circle", achieved: true, color: colors.green },
		{ id: "3", name: "Consistent", icon: "trending-up", achieved: true, color: colors.blue },
		{ id: "4", name: "Century Club", icon: "emoji-events", achieved: false, color: colors.amber },
		{ id: "5", name: "Macro Master", icon: "restaurant", achieved: false, color: colors.purple },
		{ id: "6", name: "Beast Mode", icon: "psychology", achieved: false, color: colors.accent },
	];

	const dynamicStyles = {
		container: {
			...styles.container,
			backgroundColor: colors.bg,
			paddingTop: insets.top + 12,
			paddingBottom: Platform.OS === "android" ? insets.bottom + 12 : 0,
		},
		header: styles.header,
		greeting: { ...styles.greeting, color: colors.text },
		date: { ...styles.date, color: colors.textSecondary },
		ringBackground: { ...styles.ringBackground, backgroundColor: colors.bgSecondary },
		ringCenter: styles.ringCenter,
		calorieValue: { ...styles.calorieValue, color: colors.text },
		calorieLabel: { ...styles.calorieLabel, color: colors.textSecondary },
		calorieGoal: { ...styles.calorieGoal, color: colors.textTertiary },
		streakBadge: { ...styles.streakBadge, backgroundColor: colors.bgSecondary, borderColor: colors.border },
		streakCount: { ...styles.streakCount, color: colors.text },
		streakLabel: { ...styles.streakLabel, color: colors.textSecondary },
		sectionTitle: { ...styles.sectionTitle, color: colors.text },
		macroCard: { ...styles.macroCard, backgroundColor: colors.bgSecondary, borderColor: colors.border },
		macroName: { ...styles.macroName, color: colors.textSecondary },
		macroAmount: { ...styles.macroAmount, color: colors.text },
		macroBar: { ...styles.macroBar, backgroundColor: colors.bgTertiary },
		macroGoal: { ...styles.macroGoal, color: colors.textTertiary },
		badge: { ...styles.badge, backgroundColor: colors.bgSecondary, borderColor: colors.border },
		badgeName: { ...styles.badgeName, color: colors.text },
		badgeNameInactive: { color: colors.textSecondary },
		statCard: { ...styles.statCard, backgroundColor: colors.bgSecondary, borderColor: colors.border },
		statLabel: { ...styles.statLabel, color: colors.textSecondary },
		statValue: { ...styles.statValue, color: colors.text },
		achievementCount: { ...styles.achievementCount, color: colors.accent },
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
				{/* Header */}
				<View style={dynamicStyles.header}>
					<Text style={dynamicStyles.greeting}>Today's Progress</Text>
					<Text style={dynamicStyles.date}>
						{new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" })}
					</Text>
				</View>

				{/* Calorie Progress Bar */}
				<View style={styles.calorieSection}>
					<View style={styles.calorieHeader}>
						<Text style={dynamicStyles.calorieValue}>{currentCalories} kcal</Text>
						<Text style={dynamicStyles.calorieGoal}>Goal: {goalCalories}</Text>
					</View>
					<View style={[dynamicStyles.ringBackground, styles.progressBarContainer]}>
						<View
							style={[
								styles.progressBar,
								{
									width: `${Math.min(caloriePercentage, 100)}%`,
									backgroundColor:
										caloriePercentage > 100 ? colors.red : caloriePercentage > 80 ? colors.amber : colors.green,
								},
							]}
						/>
					</View>
					<View style={styles.progressInfo}>
						<Text style={dynamicStyles.calorieLabel}>{caloriePercentage.toFixed(0)}% consumed</Text>
						<Text style={dynamicStyles.calorieLabel}>{Math.max(0, goalCalories - currentCalories)} kcal remaining</Text>
					</View>
				</View>

				{/* Macros Grid */}
				<View style={styles.macrosSection}>
					<Text style={dynamicStyles.sectionTitle}>Macronutrients</Text>
					<View style={styles.macrosGrid}>
						{/* Protein */}
						<Card style={dynamicStyles.macroCard}>
							<View style={[styles.macroIcon, { backgroundColor: `${colors.red}15` }]}>
								<MaterialIcons name="egg" size={24} color={colors.red} />
							</View>
							<Text style={dynamicStyles.macroName}>Protein</Text>
							<Text style={dynamicStyles.macroAmount}>{macros.protein.current}g</Text>
							<View style={dynamicStyles.macroBar}>
								<View
									style={[
										styles.macroFill,
										{
											width: `${Math.min((macros.protein.current / macros.protein.goal) * 100, 100)}%`,
											backgroundColor: colors.red,
										},
									]}
								/>
							</View>
							<Text style={dynamicStyles.macroGoal}>Goal: {macros.protein.goal}g</Text>
						</Card>

						{/* Carbs */}
						<Card style={dynamicStyles.macroCard}>
							<View style={[styles.macroIcon, { backgroundColor: `${colors.blue}15` }]}>
								<MaterialIcons name="grain" size={24} color={colors.blue} />
							</View>
							<Text style={dynamicStyles.macroName}>Carbs</Text>
							<Text style={dynamicStyles.macroAmount}>{macros.carbs.current}g</Text>
							<View style={dynamicStyles.macroBar}>
								<View
									style={[
										styles.macroFill,
										{
											width: `${Math.min((macros.carbs.current / macros.carbs.goal) * 100, 100)}%`,
											backgroundColor: colors.blue,
										},
									]}
								/>
							</View>
							<Text style={dynamicStyles.macroGoal}>Goal: {macros.carbs.goal}g</Text>
						</Card>

						{/* Fat */}
						<Card style={dynamicStyles.macroCard}>
							<View style={[styles.macroIcon, { backgroundColor: `${colors.amber}15` }]}>
								<MaterialIcons name="local-dining" size={24} color={colors.amber} />
							</View>
							<Text style={dynamicStyles.macroName}>Fat</Text>
							<Text style={dynamicStyles.macroAmount}>{macros.fat.current}g</Text>
							<View style={dynamicStyles.macroBar}>
								<View
									style={[
										styles.macroFill,
										{
											width: `${Math.min((macros.fat.current / macros.fat.goal) * 100, 100)}%`,
											backgroundColor: colors.amber,
										},
									]}
								/>
							</View>
							<Text style={dynamicStyles.macroGoal}>Goal: {macros.fat.goal}g</Text>
						</Card>
					</View>
				</View>

				{/* Achievements */}
				<View style={styles.achievementsSection}>
					<View style={styles.achievementsHeader}>
						<Text style={dynamicStyles.sectionTitle}>Achievements</Text>
						<Text style={dynamicStyles.achievementCount}>
							{badges.filter((b) => b.achieved).length} / {badges.length}
						</Text>
					</View>
					<View style={styles.badgesGrid}>
						{badges.map((badge) => (
							<TouchableOpacity key={badge.id} style={[dynamicStyles.badge, !badge.achieved && styles.badgeInactive]}>
								<View
									style={[
										styles.badgeIcon,
										{ backgroundColor: badge.achieved ? `${badge.color}15` : `${colors.textSecondary}08` },
									]}
								>
									<MaterialIcons
										name={badge.icon as keyof typeof MaterialIcons.glyphMap}
										size={24}
										color={badge.achieved ? badge.color : colors.textSecondary}
									/>
								</View>
								<Text style={[dynamicStyles.badgeName, !badge.achieved && dynamicStyles.badgeNameInactive]}>
									{badge.name}
								</Text>
							</TouchableOpacity>
						))}
					</View>
				</View>

				{/* Quick Stats */}
				<View style={styles.statsSection}>
					<Card style={dynamicStyles.statCard}>
						<View style={styles.statItem}>
							<MaterialIcons name="calendar-today" size={20} color={colors.accent} />
							<View style={styles.statInfo}>
								<Text style={dynamicStyles.statLabel}>This Week</Text>
								<Text style={dynamicStyles.statValue}>14,220 kcal</Text>
							</View>
						</View>
					</Card>
					<Card style={dynamicStyles.statCard}>
						<View style={styles.statItem}>
							<MaterialIcons name="trending-up" size={20} color={colors.green} />
							<View style={styles.statInfo}>
								<Text style={dynamicStyles.statLabel}>Average</Text>
								<Text style={dynamicStyles.statValue}>2,031 kcal</Text>
							</View>
						</View>
					</Card>
				</View>

				<View style={[styles.footer, Platform.OS === "android" && { height: 60 }]} />
			</ScrollView>

			{showBlur && <BlurView intensity={blurIntensity} style={[styles.blurHeader, { height: insets.top }]} />}
		</View>
	);
}

const styles = StyleSheet.create({
	wrapper: {
		flex: 1,
	},
	container: {
		flex: 1,
		paddingHorizontal: 16,
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
		marginBottom: 24,
		paddingTop: 8,
	},
	greeting: {
		fontSize: 28,
		fontWeight: "700",
		letterSpacing: -0.5,
	},
	date: {
		fontSize: 14,
		marginTop: 4,
	},
	// Calorie Section
	calorieRingSection: {
		flexDirection: "column",
		alignItems: "stretch",
		marginBottom: 24,
	},
	calorieSection: {
		marginBottom: 24,
	},
	calorieHeader: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 12,
	},
	progressBarContainer: {
		height: 16,
		borderRadius: 8,
		overflow: "hidden",
		marginBottom: 12,
	},
	progressBar: {
		height: "100%",
		borderRadius: 8,
	},
	progressInfo: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	calorieRing: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		height: 200,
	},
	ringBackground: {
		width: "100%",
		height: 12,
		borderRadius: 6,
		overflow: "hidden",
		marginBottom: 16,
	},
	ringProgress: {
		height: "100%",
		borderRadius: 6,
	},
	ringCenter: {
		alignItems: "center",
	},
	calorieValue: {
		fontSize: 24,
		fontWeight: "700",
		letterSpacing: -0.5,
	},
	calorieLabel: {
		fontSize: 12,
		marginTop: 2,
	},
	calorieGoal: {
		fontSize: 12,
		marginTop: 1,
	},
	streakBadge: {
		borderRadius: 12,
		padding: 12,
		borderWidth: 1,
		alignItems: "center",
		justifyContent: "center",
		minWidth: 80,
	},
	streakCount: {
		fontSize: 14,
		fontWeight: "700",
		marginTop: 6,
	},
	streakLabel: {
		fontSize: 11,
		marginTop: 2,
	},
	// Macros Section
	macrosSection: {
		marginBottom: 32,
	},
	sectionTitle: {
		fontSize: 18,
		fontWeight: "700",
		marginBottom: 12,
		letterSpacing: -0.3,
	},
	macrosGrid: {
		gap: 12,
	},
	macroCard: {
		borderWidth: 1,
		borderRadius: 12,
		padding: 16,
		paddingVertical: 14,
	},
	macroIcon: {
		width: 40,
		height: 40,
		borderRadius: 8,
		justifyContent: "center",
		alignItems: "center",
		marginBottom: 10,
	},
	macroName: {
		fontSize: 13,
		fontWeight: "600",
		textTransform: "uppercase",
		letterSpacing: 0.5,
	},
	macroAmount: {
		fontSize: 20,
		fontWeight: "700",
		marginTop: 4,
		marginBottom: 10,
	},
	macroBar: {
		height: 6,
		borderRadius: 3,
		overflow: "hidden",
		marginBottom: 8,
	},
	macroFill: {
		height: "100%",
		borderRadius: 3,
	},
	macroGoal: {
		fontSize: 11,
	},
	// Achievements Section
	achievementsSection: {
		marginBottom: 32,
	},
	achievementsHeader: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 12,
	},
	achievementCount: {
		fontSize: 14,
		fontWeight: "600",
	},
	badgesGrid: {
		flexDirection: "row",
		flexWrap: "wrap",
		gap: 12,
	},
	badge: {
		flex: 1,
		minWidth: "30%",
		borderWidth: 1,
		borderRadius: 12,
		padding: 12,
		alignItems: "center",
	},
	badgeInactive: {
		opacity: 0.5,
	},
	badgeIcon: {
		width: 44,
		height: 44,
		borderRadius: 10,
		justifyContent: "center",
		alignItems: "center",
		marginBottom: 8,
	},
	badgeName: {
		fontSize: 11,
		fontWeight: "600",
		textAlign: "center",
	},
	badgeNameInactive: {},
	// Stats Section
	statsSection: {
		gap: 10,
		marginBottom: 20,
	},
	statCard: {
		borderWidth: 1,
		borderRadius: 12,
		padding: 16,
		paddingVertical: 14,
	},
	statItem: {
		flexDirection: "row",
		alignItems: "center",
		gap: 12,
	},
	statInfo: {
		flex: 1,
	},
	statLabel: {
		fontSize: 12,
		marginBottom: 2,
	},
	statValue: {
		fontSize: 16,
		fontWeight: "700",
	},
	footer: {
		height: Platform.OS === "android" ? 80 : 20,
	},
});
