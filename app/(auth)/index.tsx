import { themeColors, useThemeStore } from "@/hooks/use-theme";
import { MaterialIcons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";

const { height } = Dimensions.get("window");

export default function Onboarding() {
	const theme = useThemeStore((state) => state.theme);
	const colors = themeColors[theme];

	const dynamicStyles = {
		container: { ...styles.container, backgroundColor: colors.bg },
		logoContainer: styles.logoContainer,
		logoBg: { ...styles.logoBg, backgroundColor: `${colors.accent}15`, borderColor: colors.accent },
		appName: { ...styles.appName, color: colors.text },
		tagline: { ...styles.tagline, color: colors.textSecondary },
		featureCard: { ...styles.featureCard, backgroundColor: colors.bgSecondary, borderColor: colors.border },
		featureIcon: { ...styles.featureIcon, backgroundColor: `${colors.accent}15` },
		featureTitle: { ...styles.featureTitle, color: colors.text },
		featureDesc: { ...styles.featureDesc, color: colors.textSecondary },
		primaryButton: { ...styles.primaryButton, backgroundColor: colors.accent },
		primaryButtonText: { ...styles.primaryButtonText, color: colors.text },
		secondaryButton: { ...styles.secondaryButton, backgroundColor: colors.bgSecondary, borderColor: colors.border },
		secondaryButtonText: { ...styles.secondaryButtonText, color: colors.accent },
	};

	return (
		<View style={dynamicStyles.container}>
			<ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
				{/* Hero Section */}
				<View style={styles.heroSection}>
					<View style={dynamicStyles.logoContainer}>
						<View style={dynamicStyles.logoBg}>
							<MaterialIcons name="fastfood" size={48} color={colors.accent} />
						</View>
					</View>
					<Text style={dynamicStyles.appName}>NutriTrack</Text>
					<Text style={dynamicStyles.tagline}>Master Your Nutrition Journey</Text>
				</View>

				{/* Features */}
				<View style={styles.featuresSection}>
					<View style={dynamicStyles.featureCard}>
						<View style={dynamicStyles.featureIcon}>
							<MaterialIcons name="show-chart" size={24} color={colors.accent} />
						</View>
						<Text style={dynamicStyles.featureTitle}>Track Daily</Text>
						<Text style={dynamicStyles.featureDesc}>Monitor your calorie & macro intake in real-time</Text>
					</View>

					<View style={dynamicStyles.featureCard}>
						<View style={dynamicStyles.featureIcon}>
							<MaterialIcons name="emoji-events" size={24} color={colors.accent} />
						</View>
						<Text style={dynamicStyles.featureTitle}>Achieve Goals</Text>
						<Text style={dynamicStyles.featureDesc}>Unlock badges and build your streak</Text>
					</View>

					<View style={dynamicStyles.featureCard}>
						<View style={dynamicStyles.featureIcon}>
							<MaterialIcons name="insights" size={24} color={colors.accent} />
						</View>
						<Text style={dynamicStyles.featureTitle}>Get Insights</Text>
						<Text style={dynamicStyles.featureDesc}>Deep analytics on your nutrition patterns</Text>
					</View>
				</View>

				{/* CTA Buttons */}
				<View style={styles.buttonContainer}>
					<Link href="/(auth)/login" asChild>
						<View style={[styles.button, dynamicStyles.primaryButton]}>
							<MaterialIcons name="login" size={20} color={colors.text} />
							<Text style={[styles.buttonText, dynamicStyles.primaryButtonText]}>Log In</Text>
						</View>
					</Link>
					<Link href="/(auth)/signup" asChild>
						<View style={[styles.button, dynamicStyles.secondaryButton]}>
							<MaterialIcons name="person-add" size={20} color={colors.accent} />
							<Text style={[styles.buttonText, dynamicStyles.secondaryButtonText]}>Create Account</Text>
						</View>
					</Link>
				</View>
			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	content: {
		paddingHorizontal: 20,
		paddingVertical: 40,
		minHeight: height,
		justifyContent: "space-between",
	},
	heroSection: {
		alignItems: "center",
		marginTop: 40,
		marginBottom: 40,
	},
	logoContainer: {
		marginBottom: 24,
	},
	logoBg: {
		width: 80,
		height: 80,
		borderRadius: 20,
		justifyContent: "center",
		alignItems: "center",
		borderWidth: 2,
	},
	appName: {
		fontSize: 40,
		fontWeight: "800",
		marginBottom: 12,
		letterSpacing: -0.5,
	},
	tagline: {
		fontSize: 16,
		textAlign: "center",
		letterSpacing: 0.3,
	},
	featuresSection: {
		gap: 16,
		marginVertical: 32,
	},
	featureCard: {
		borderWidth: 1,
		borderRadius: 16,
		padding: 16,
		alignItems: "center",
	},
	featureIcon: {
		marginBottom: 12,
	},
	featureTitle: {
		fontSize: 14,
		fontWeight: "700",
		marginBottom: 6,
	},
	featureDesc: {
		fontSize: 12,
		textAlign: "center",
	},
	buttonContainer: {
		gap: 12,
		marginBottom: 20,
	},
	button: {
		paddingVertical: 14,
		paddingHorizontal: 20,
		borderRadius: 12,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		gap: 10,
		elevation: 5,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.3,
		shadowRadius: 8,
	},
	primaryButton: {},
	secondaryButton: {
		borderWidth: 1.5,
	},
	buttonText: {
		fontWeight: "700",
		fontSize: 16,
	},
	primaryButtonText: {},
	secondaryButtonText: {},
});
