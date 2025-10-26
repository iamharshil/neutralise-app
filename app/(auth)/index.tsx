import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function Onboarding() {
    return (
        <View style={styles.container}>
            <View style={styles.textContainer}>
                <Text style={styles.title}>Welcome to Neutralize</Text>
                <Text style={styles.subtitle}>Set your goal to get started!</Text>
            </View>

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
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingVertical: 40,
    },
    textContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#000',
        textAlign: 'center',
        marginBottom: 16,
        lineHeight: 40,
    },
    subtitle: {
        fontSize: 18,
        color: '#666',
        textAlign: 'center',
        marginBottom: 60,
        lineHeight: 24,
        paddingHorizontal: 20,
    },
    buttonContainer: {
        width: '100%',
        gap: 16,
        paddingBottom: 20,
    },
    button: {
        backgroundColor: '#000',
        paddingVertical: 16,
        paddingHorizontal: 24,
        borderRadius: 12,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    buttonText: {
        color: '#FFF',
        fontWeight: '600',
        fontSize: 16,
        textAlign: 'center',
    }
});