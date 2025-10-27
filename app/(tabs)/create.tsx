import { themeColors, useThemeStore } from "@/hooks/use-theme";
import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import { Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface FoodItem {
	id: string;
	name: string;
	calories: number;
	protein: number;
	carbs: number;
	fat: number;
	servingSize: string;
}

export default function Create() {
	const theme = useThemeStore((state) => state.theme);
	const toggleTheme = useThemeStore((state) => state.toggleTheme);
	const colors = themeColors[theme];
	const insets = useSafeAreaInsets();
	const [foodName, setFoodName] = useState("");
	const [calories, setCalories] = useState("");
	const [protein, setProtein] = useState("");
	const [carbs, setCarbs] = useState("");
	const [fat, setFat] = useState("");
	const [servingSize, setServingSize] = useState("");
	const [recentFoods, setRecentFoods] = useState<FoodItem[]>([
		{ id: "1", name: "Chicken Breast", calories: 165, protein: 31, carbs: 0, fat: 3.6, servingSize: "100g" },
		{ id: "2", name: "Brown Rice", calories: 111, protein: 2.6, carbs: 23, fat: 0.9, servingSize: "100g" },
		{ id: "3", name: "Broccoli", calories: 34, protein: 2.8, carbs: 7, fat: 0.4, servingSize: "100g" },
		{ id: "4", name: "Salmon", calories: 208, protein: 20, carbs: 0, fat: 13, servingSize: "100g" },
	]);

	const handleAddFood = () => {
		if (foodName && calories) {
			const newFood: FoodItem = {
				id: Date.now().toString(),
				name: foodName,
				calories: Number(calories),
				protein: Number(protein) || 0,
				carbs: Number(carbs) || 0,
				fat: Number(fat) || 0,
				servingSize: servingSize || "1 serving",
			};
			setRecentFoods([newFood, ...recentFoods]);
			resetForm();
		}
	};

	const resetForm = () => {
		setFoodName("");
		setCalories("");
		setProtein("");
		setCarbs("");
		setFat("");
		setServingSize("");
	};

	const handleSelectFood = (food: FoodItem) => {
		console.log("Selected food:", food);
	};

	return (
		<ScrollView
			style={[styles.container, { backgroundColor: colors.bg, paddingTop: insets.top + 12 }]}
			showsVerticalScrollIndicator={false}
		>
			{/* Header */}
			<View style={styles.headerRow}>
				<View>
					<Text style={[styles.title, { color: colors.text }]}>Add Meal</Text>
					<Text style={[styles.subtitle, { color: colors.textSecondary }]}>Log your food intake</Text>
				</View>
				<TouchableOpacity onPress={toggleTheme} style={styles.themeToggle}>
					<MaterialIcons name={theme === "dark" ? "light-mode" : "dark-mode"} size={24} color={colors.accent} />
				</TouchableOpacity>
			</View>

			{/* Input Form */}
			<View style={[styles.formCard, { backgroundColor: colors.bgSecondary, borderColor: colors.border }]}>
				<View style={styles.formHeader}>
					<MaterialIcons name="edit" size={20} color={colors.accent} />
					<Text style={[styles.formTitle, { color: colors.text }]}>Add Food Details</Text>
				</View>

				{/* Food Name Input */}
				<View style={styles.formGroup}>
					<Text style={[styles.label, { color: colors.textSecondary }]}>Food Name</Text>
					<TextInput
						style={[styles.input, { backgroundColor: colors.bg, borderColor: colors.border, color: colors.text }]}
						placeholder="e.g., Chicken Breast"
						placeholderTextColor={colors.textTertiary}
						value={foodName}
						onChangeText={setFoodName}
					/>
				</View>

				{/* Calories Input */}
				<View style={styles.formGroup}>
					<Text style={[styles.label, { color: colors.textSecondary }]}>Calories (kcal)</Text>
					<TextInput
						style={[styles.input, { backgroundColor: colors.bg, borderColor: colors.border, color: colors.text }]}
						placeholder="e.g., 165"
						placeholderTextColor={colors.textTertiary}
						keyboardType="decimal-pad"
						value={calories}
						onChangeText={setCalories}
					/>
				</View>

				{/* Macros Row */}
				<View style={styles.macrosGrid}>
					<View style={[styles.macroInputGroup, { flex: 1 }]}>
						<Text style={[styles.label, { color: colors.textSecondary }]}>Protein (g)</Text>
						<TextInput
							style={[styles.input, { backgroundColor: colors.bg, borderColor: colors.border, color: colors.text }]}
							placeholder="0"
							placeholderTextColor={colors.textTertiary}
							keyboardType="decimal-pad"
							value={protein}
							onChangeText={setProtein}
						/>
					</View>
					<View style={[styles.macroInputGroup, { flex: 1 }]}>
						<Text style={[styles.label, { color: colors.textSecondary }]}>Carbs (g)</Text>
						<TextInput
							style={[styles.input, { backgroundColor: colors.bg, borderColor: colors.border, color: colors.text }]}
							placeholder="0"
							placeholderTextColor={colors.textTertiary}
							keyboardType="decimal-pad"
							value={carbs}
							onChangeText={setCarbs}
						/>
					</View>
					<View style={[styles.macroInputGroup, { flex: 1 }]}>
						<Text style={[styles.label, { color: colors.textSecondary }]}>Fat (g)</Text>
						<TextInput
							style={[styles.input, { backgroundColor: colors.bg, borderColor: colors.border, color: colors.text }]}
							placeholder="0"
							placeholderTextColor={colors.textTertiary}
							keyboardType="decimal-pad"
							value={fat}
							onChangeText={setFat}
						/>
					</View>
				</View>

				{/* Serving Size */}
				<View style={styles.formGroup}>
					<Text style={[styles.label, { color: colors.textSecondary }]}>Serving Size</Text>
					<TextInput
						style={[styles.input, { backgroundColor: colors.bg, borderColor: colors.border, color: colors.text }]}
						placeholder="e.g., 100g"
						placeholderTextColor={colors.textTertiary}
						value={servingSize}
						onChangeText={setServingSize}
					/>
				</View>

				{/* Add Button */}
				<TouchableOpacity style={[styles.addButton, { backgroundColor: colors.accent }]} onPress={handleAddFood}>
					<MaterialIcons name="add-circle" size={24} color="#fff" />
					<Text style={styles.addButtonText}>Add to Today's Intake</Text>
				</TouchableOpacity>
			</View>

			{/* Recent Foods Section */}
			{recentFoods.length > 0 && (
				<>
					<View style={styles.sectionHeader}>
						<View style={styles.sectionTitleRow}>
							<MaterialIcons name="history" size={20} color={colors.accent} />
							<Text style={[styles.sectionTitle, { color: colors.text }]}>Recent Foods</Text>
						</View>
						<Text style={[styles.sectionSubtitle, { color: colors.textSecondary }]}>Tap to add</Text>
					</View>

					{recentFoods.map((food) => (
						<TouchableOpacity key={food.id} onPress={() => handleSelectFood(food)} activeOpacity={0.6}>
							<View style={[styles.foodCard, { backgroundColor: colors.bgSecondary, borderColor: colors.border }]}>
								<View style={[styles.foodIconContainer, { backgroundColor: `${colors.accent}15` }]}>
									<MaterialIcons name="restaurant" size={20} color={colors.accent} />
								</View>

								<View style={styles.foodContent}>
									<View style={styles.foodTop}>
										<View style={{ flex: 1 }}>
											<Text style={[styles.foodName, { color: colors.text }]}>{food.name}</Text>
											<Text style={[styles.servingSize, { color: colors.textSecondary }]}>{food.servingSize}</Text>
										</View>
										<View style={styles.caloriesBadge}>
											<Text style={[styles.caloriesValue, { color: colors.accent }]}>{food.calories}</Text>
											<Text style={[styles.caloriesLabel, { color: colors.textSecondary }]}>kcal</Text>
										</View>
									</View>

									{(food.protein > 0 || food.carbs > 0 || food.fat > 0) && (
										<View style={styles.macrosRow}>
											{food.protein > 0 && (
												<View style={styles.macroBadge}>
													<Text style={[styles.macroBadgeLabel, { color: colors.textSecondary }]}>P</Text>
													<Text style={[styles.macroBadgeValue, { color: colors.text }]}>{food.protein}g</Text>
												</View>
											)}
											{food.carbs > 0 && (
												<View style={styles.macroBadge}>
													<Text style={[styles.macroBadgeLabel, { color: colors.textSecondary }]}>C</Text>
													<Text style={[styles.macroBadgeValue, { color: colors.text }]}>{food.carbs}g</Text>
												</View>
											)}
											{food.fat > 0 && (
												<View style={styles.macroBadge}>
													<Text style={[styles.macroBadgeLabel, { color: colors.textSecondary }]}>F</Text>
													<Text style={[styles.macroBadgeValue, { color: colors.text }]}>{food.fat}g</Text>
												</View>
											)}
										</View>
									)}
								</View>

								<TouchableOpacity style={[styles.addIconButton, { borderColor: colors.border }]}>
									<MaterialIcons name="add" size={20} color={colors.accent} />
								</TouchableOpacity>
							</View>
						</TouchableOpacity>
					))}
				</>
			)}

			<View style={styles.footer} />
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 16,
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
	// Form Card
	formCard: {
		padding: 16,
		borderRadius: 16,
		marginBottom: 24,
		borderWidth: 1,
	},
	formHeader: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 16,
		gap: 10,
	},
	formTitle: {
		fontSize: 16,
		fontWeight: "bold",
	},
	formGroup: {
		marginBottom: 14,
	},
	label: {
		fontSize: 12,
		fontWeight: "600",
		marginBottom: 6,
	},
	input: {
		borderWidth: 1,
		borderRadius: 10,
		paddingHorizontal: 12,
		paddingVertical: 10,
		fontSize: 14,
	},
	macrosGrid: {
		flexDirection: "row",
		gap: 10,
		marginBottom: 14,
	},
	macroInputGroup: {
		flex: 1,
	},
	addButton: {
		borderRadius: 12,
		paddingVertical: 12,
		marginTop: 8,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		gap: 8,
	},
	addButtonText: {
		color: "#fff",
		fontSize: 16,
		fontWeight: "bold",
	},
	// Section Header
	sectionHeader: {
		marginBottom: 12,
		marginTop: 8,
	},
	sectionTitleRow: {
		flexDirection: "row",
		alignItems: "center",
		gap: 8,
		marginBottom: 4,
	},
	sectionTitle: {
		fontSize: 16,
		fontWeight: "bold",
	},
	sectionSubtitle: {
		fontSize: 12,
	},
	// Food Card
	foodCard: {
		flexDirection: "row",
		alignItems: "center",
		padding: 12,
		borderRadius: 14,
		marginBottom: 10,
		borderWidth: 1,
		gap: 12,
	},
	foodIconContainer: {
		width: 44,
		height: 44,
		borderRadius: 10,
		justifyContent: "center",
		alignItems: "center",
	},
	foodContent: {
		flex: 1,
	},
	foodTop: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "flex-start",
		marginBottom: 8,
	},
	foodName: {
		fontSize: 13,
		fontWeight: "600",
		marginBottom: 2,
	},
	servingSize: {
		fontSize: 12,
		fontWeight: "400",
	},
	caloriesBadge: {
		alignItems: "center",
	},
	caloriesValue: {
		fontSize: 14,
		fontWeight: "bold",
		marginBottom: 2,
	},
	caloriesLabel: {
		fontSize: 10,
		fontWeight: "500",
	},
	macrosRow: {
		flexDirection: "row",
		gap: 6,
		flexWrap: "wrap",
	},
	macroBadge: {
		flexDirection: "row",
		paddingHorizontal: 6,
		paddingVertical: 3,
		borderRadius: 6,
		backgroundColor: "rgba(0, 0, 0, 0.05)",
		alignItems: "center",
		gap: 2,
	},
	macroBadgeLabel: {
		fontSize: 10,
		fontWeight: "600",
	},
	macroBadgeValue: {
		fontSize: 10,
		fontWeight: "500",
	},
	addIconButton: {
		width: 36,
		height: 36,
		borderRadius: 8,
		justifyContent: "center",
		alignItems: "center",
		borderWidth: 1,
	},
	footer: {
		height: Platform.OS === "android" ? 80 : 32,
	},
});
