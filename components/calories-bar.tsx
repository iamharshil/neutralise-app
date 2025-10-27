import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import { Card, Text, View } from "tamagui";

export default function CaloriesBar({ day, calories, goal, isToday }: { day: string; calories: number; goal: number; isToday?: boolean; }) {
    const percentage = Math.min((calories / goal) * 100, 100);
    const isOverGoal = calories > goal;
    const difference = calories - goal;

    const getStatusColor = () => {
        const diff = Math.abs(difference);
        if (diff <= 100) return "green";
        if (isOverGoal) return "orange";
        return "blue";
    };

    const getTrendIcon = () => {
        const diff = Math.abs(difference);
        if (diff === 0) return <MaterialIcons size={16} name="remove" className="w-3 h-3" />;
        return isOverGoal ? <MaterialIcons size={16} name="trending-up" className="w-3 h-3" /> : <MaterialIcons size={16} name="trending-down" className="w-3 h-3" />;
    };

    return (
        <View style={styles.container}>
            {/* Calories bar implementation goes here */}
            <Card unstyled={true} style={styles.card}>
                <Card style={{ ...styles.bar, backgroundColor: getStatusColor(), height: `${percentage}%` }}><Text></Text></Card>
            </Card>
            {/* : {calories} / {goal} kcal {isToday ? "(Today)" : ""} */}
            <Text style={{ ...styles.day, ...(isToday ? { color: "#007BFF" } : {}) }}>{day}</Text>
            <Text style={styles.calories}>{(calories).toLocaleString()}</Text>
            <Text style={styles.icon}>
                {getTrendIcon()}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        // width: "100%",
        marginTop: 0,
        marginBottom: 4,
        // backgroundColor: "#f5f5f5",
        height: 150,
        padding: 4,
        alignItems: "flex-end",
        justifyContent: "flex-end",
        paddingBottom: 0,
    },
    card: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
        alignSelf: "center",
        width: "90%",
        backgroundColor: "#e0e0e0",
        padding: 0,
        margin: 0,
        marginBottom: 6,
    },
    bar: {
        width: "100%",
    },
    day: {
        marginTop: 3,
        textAlign: "center",
        alignSelf: "center",
        marginBottom: 0,
    },
    calories: {
        fontSize: 12,
        textAlign: "center",
        alignSelf: "center",
        marginBottom: 4,
        color: "#333",
    },
    icon: {
        textAlign: "center",
        alignSelf: "center",
        color: "#555",
    }
})