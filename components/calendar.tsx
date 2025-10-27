import { themeColors, useThemeStore } from "@/hooks/use-theme";
import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface CalendarProps {
	onDateSelect?: (date: Date) => void;
	selectedDate?: Date;
}

export default function Calendar({ onDateSelect, selectedDate }: CalendarProps) {
	const theme = useThemeStore((state) => state.theme);
	const colors = themeColors[theme];
	const [currentMonth, setCurrentMonth] = useState(new Date());
	const [selected, setSelected] = useState(selectedDate || new Date());

	const daysInMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
	const firstDayOfMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay();

	const handleDateSelect = (day: number) => {
		const newDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
		setSelected(newDate);
		onDateSelect?.(newDate);
	};

	const handlePrevMonth = () => {
		setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
	};

	const handleNextMonth = () => {
		setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
	};

	const monthName = currentMonth.toLocaleString("default", { month: "long", year: "numeric" });
	const daysArray = [];

	// Add empty cells for days before the first day of the month
	for (let i = 0; i < firstDayOfMonth(currentMonth); i++) {
		daysArray.push(null);
	}

	// Add days of the month
	for (let day = 1; day <= daysInMonth(currentMonth); day++) {
		daysArray.push(day);
	}

	const weeks = [];
	for (let i = 0; i < daysArray.length; i += 7) {
		weeks.push(daysArray.slice(i, i + 7));
	}

	const isToday = (day: number | null) => {
		if (!day) return false;
		const today = new Date();
		return (
			day === today.getDate() &&
			currentMonth.getMonth() === today.getMonth() &&
			currentMonth.getFullYear() === today.getFullYear()
		);
	};

	const isSelected = (day: number | null) => {
		if (!day) return false;
		return (
			day === selected.getDate() &&
			currentMonth.getMonth() === selected.getMonth() &&
			currentMonth.getFullYear() === selected.getFullYear()
		);
	};

	return (
		<View style={[styles.container, { backgroundColor: colors.bgSecondary, borderColor: colors.border }]}>
			<View style={styles.header}>
				<TouchableOpacity onPress={handlePrevMonth}>
					<MaterialIcons name="chevron-left" size={28} color={colors.accent} />
				</TouchableOpacity>
				<Text style={[styles.monthYear, { color: colors.text }]}>{monthName}</Text>
				<TouchableOpacity onPress={handleNextMonth}>
					<MaterialIcons name="chevron-right" size={28} color={colors.accent} />
				</TouchableOpacity>
			</View>

			<View style={styles.weekDays}>
				{["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
					<Text key={day} style={[styles.weekDay, { color: colors.textSecondary }]}>
						{day}
					</Text>
				))}
			</View>

			{weeks.map((week, weekIndex) => (
				<View key={`week-${weekIndex}-${currentMonth.getMonth()}`} style={styles.week}>
					{week.map((day, dayIndex) => (
						<TouchableOpacity
							key={`day-${day}-${dayIndex}-${currentMonth.getMonth()}`}
							onPress={() => day && handleDateSelect(day)}
							style={[
								styles.dayButton,
								isToday(day) && [styles.todayButton, { borderColor: colors.accent, backgroundColor: `${colors.accent}15` }],
								isSelected(day) && [styles.selectedButton, { backgroundColor: colors.accent }],
							]}
						>
							<Text
								style={[
									styles.dayText,
									{ color: colors.text },
									!day && styles.emptyDay,
									isToday(day) && [styles.todayText, { color: colors.accent }],
									isSelected(day) && styles.selectedText,
								]}
							>
								{day}
							</Text>
						</TouchableOpacity>
					))}
				</View>
			))}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		borderRadius: 16,
		padding: 16,
		borderWidth: 1,
	},
	header: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 20,
	},
	monthYear: {
		fontSize: 18,
		fontWeight: "bold",
	},
	weekDays: {
		flexDirection: "row",
		marginBottom: 12,
	},
	weekDay: {
		flex: 1,
		textAlign: "center",
		fontSize: 12,
		fontWeight: "600",
	},
	week: {
		flexDirection: "row",
		marginBottom: 8,
	},
	dayButton: {
		flex: 1,
		aspectRatio: 1,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 12,
		marginHorizontal: 2,
	},
	dayText: {
		fontSize: 14,
		fontWeight: "500",
	},
	emptyDay: {
		color: "transparent",
	},
	todayButton: {
		borderWidth: 2,
	},
	todayText: {
		fontWeight: "bold",
	},
	selectedButton: {},
	selectedText: {
		color: "#fff",
		fontWeight: "bold",
	},
});
