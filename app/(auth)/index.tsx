import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function Onboarding() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome to Neutralize</Text>
            <Text style={styles.subtitle}>Set your goal to get started!</Text>

            <View style={styles.buttonContainer}>
                <Link href="/(auth)/signup" style={styles.button}>
                    <Text style={styles.buttonText}>Sign Up</Text>
                </Link>
                <Link href="/(auth)/login" style={styles.button}>
                    <Text style={styles.buttonText}>Log In</Text>
                </Link>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1, justifyContent: "center", alignItems: "center", padding: 20
    },
    title: {
        fontSize: 28, fontWeight: "bold", marginBottom: 10
    },
    subtitle: {
        fontSize: 16, color: "#666", marginBottom: 40
    },
    buttonContainer: {
        width: "100%", gap: 10
    },
    button: {
        backgroundColor: "#007AFF", padding: 15, borderRadius: 10, alignItems: "center"
    },
    buttonText: {
        color: "white", fontWeight: "600"
    }
});