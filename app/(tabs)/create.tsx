import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Card } from "tamagui";

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
		// This would typically navigate or trigger an action to add the food to today's intake
		console.log("Selected food:", food);
	};

	return (
		<ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
			<View style={styles.header}>
				<Text style={styles.title}>Add Food</Text>
				<Text style={styles.subtitle}>Log your food intake</Text>
			</View>

			{/* Quick Add Form */}
			<Card style={styles.formCard}>
				<Text style={styles.formTitle}>Quick Add</Text>

				<View style={styles.formGroup}>
					<Text style={styles.label}>Food Name *</Text>
					<TextInput
						style={styles.input}
						placeholder="e.g., Chicken Breast"
						placeholderTextColor="#a0a0a0"
						value={foodName}
						onChangeText={setFoodName}
					/>
				</View>

				<View style={styles.formGroup}>
					<Text style={styles.label}>Calories (kcal) *</Text>
					<TextInput
						style={styles.input}
						placeholder="e.g., 165"
						placeholderTextColor="#a0a0a0"
						keyboardType="decimal-pad"
						value={calories}
						onChangeText={setCalories}
					/>
				</View>

				<View style={styles.row}>
					<View style={[styles.formGroup, { flex: 1, marginRight: 8 }]}>
						<Text style={styles.label}>Protein (g)</Text>
						<TextInput
							style={styles.input}
							placeholder="0"
							placeholderTextColor="#a0a0a0"
							keyboardType="decimal-pad"
							value={protein}
							onChangeText={setProtein}
						/>
					</View>
					<View style={[styles.formGroup, { flex: 1, marginRight: 8 }]}>
						<Text style={styles.label}>Carbs (g)</Text>
						<TextInput
							style={styles.input}
							placeholder="0"
							placeholderTextColor="#a0a0a0"
							keyboardType="decimal-pad"
							value={carbs}
							onChangeText={setCarbs}
						/>
					</View>
					<View style={[styles.formGroup, { flex: 1 }]}>
						<Text style={styles.label}>Fat (g)</Text>
						<TextInput
							style={styles.input}
							placeholder="0"
							placeholderTextColor="#a0a0a0"
							keyboardType="decimal-pad"
							value={fat}
							onChangeText={setFat}
						/>
					</View>
				</View>

				<View style={styles.formGroup}>
					<Text style={styles.label}>Serving Size</Text>
					<TextInput
						style={styles.input}
						placeholder="e.g., 100g"
						placeholderTextColor="#a0a0a0"
						value={servingSize}
						onChangeText={setServingSize}
					/>
				</View>

				<TouchableOpacity style={styles.addButton} onPress={handleAddFood}>
					<MaterialIcons name="add" size={24} color="#fff" />
					<Text style={styles.addButtonText}>Add Food</Text>
				</TouchableOpacity>
			</Card>

			{/* Recent Foods */}
			<View style={styles.recentSection}>
				<Text style={styles.sectionTitle}>Recent Foods</Text>
				<Text style={styles.sectionSubtitle}>Tap to add to today's intake</Text>
			</View>

			{recentFoods.map((food) => (
				<TouchableOpacity key={food.id} onPress={() => handleSelectFood(food)}>
					<Card style={styles.foodCard}>
						<View style={styles.foodHeader}>
							<View style={styles.foodInfo}>
								<Text style={styles.foodName}>{food.name}</Text>
								<Text style={styles.servingSize}>{food.servingSize}</Text>
							</View>
							<View style={styles.foodCalories}>
								<Text style={styles.caloriesValue}>{food.calories}</Text>
								<Text style={styles.caloriesLabel}>kcal</Text>
							</View>
						</View>

						{(food.protein > 0 || food.carbs > 0 || food.fat > 0) && (
							<View style={styles.macros}>
								{food.protein > 0 && (
									<View style={styles.macroItem}>
										<Text style={styles.macroLabel}>P</Text>
										<Text style={styles.macroValue}>{food.protein}g</Text>
									</View>
								)}
								{food.carbs > 0 && (
									<View style={styles.macroItem}>
										<Text style={styles.macroLabel}>C</Text>
										<Text style={styles.macroValue}>{food.carbs}g</Text>
									</View>
								)}
								{food.fat > 0 && (
									<View style={styles.macroItem}>
										<Text style={styles.macroLabel}>F</Text>
										<Text style={styles.macroValue}>{food.fat}g</Text>
									</View>
								)}
							</View>
						)}
					</Card>
				</TouchableOpacity>
			))}

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
	formCard: {
		backgroundColor: "#fff",
		padding: 16,
		borderRadius: 22,
		borderWidth: 0,
		shadowColor: "#3b82f6",
		shadowOffset: { width: 0, height: 6 },
		shadowOpacity: 0.1,
		shadowRadius: 16,
		elevation: 8,
		marginBottom: 24,
	},
	formTitle: {
		fontSize: 18,
		fontWeight: "bold",
		color: "#22223b",
		marginBottom: 16,
	},
	formGroup: {
		marginBottom: 12,
	},
	label: {
		fontSize: 12,
		fontWeight: "600",
		color: "#4a4e69",
		marginBottom: 6,
	},
	input: {
		backgroundColor: "#f1f5f9",
		borderWidth: 1,
		borderColor: "#e2e8f0",
		borderRadius: 12,
		paddingHorizontal: 12,
		paddingVertical: 10,
		fontSize: 14,
		color: "#22223b",
	},
	row: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
	addButton: {
		backgroundColor: "#3b82f6",
		borderRadius: 12,
		paddingVertical: 12,
		marginTop: 16,
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
	recentSection: {
		marginBottom: 12,
	},
	sectionTitle: {
		fontSize: 16,
		fontWeight: "bold",
		color: "#22223b",
		marginBottom: 4,
	},
	sectionSubtitle: {
		fontSize: 12,
		color: "#4a4e69",
	},
	foodCard: {
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
	foodHeader: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 8,
	},
	foodInfo: {
		flex: 1,
	},
	foodName: {
		fontSize: 14,
		fontWeight: "600",
		color: "#22223b",
		marginBottom: 2,
	},
	servingSize: {
		fontSize: 12,
		color: "#4a4e69",
	},
	foodCalories: {
		alignItems: "center",
	},
	caloriesValue: {
		fontSize: 18,
		fontWeight: "bold",
		color: "#3b82f6",
	},
	caloriesLabel: {
		fontSize: 10,
		color: "#4a4e69",
		fontWeight: "500",
	},
	macros: {
		flexDirection: "row",
		gap: 12,
		paddingTop: 8,
		borderTopWidth: 1,
		borderTopColor: "#e2e8f0",
	},
	macroItem: {
		flex: 1,
		alignItems: "center",
	},
	macroLabel: {
		fontSize: 10,
		fontWeight: "600",
		color: "#4a4e69",
		marginBottom: 2,
	},
	macroValue: {
		fontSize: 12,
		fontWeight: "bold",
		color: "#22223b",
	},
	footer: {
		height: 32,
	},
});
