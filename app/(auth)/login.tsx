import { Link, router } from "expo-router";
import { useState } from "react";
import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";

export default function login() {
    const [pending, setPending] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        setPending(true);

        try {
            if (email === "text@mail.com" && password === "123456") {
                router.replace("/(tabs)");
                return;
            }

            Alert.alert("Error", "Invalid Credentials (try text@mail.com / 123456)");
        } catch (error) {
            console.error(error);
        } finally {
            setPending(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Log In</Text>

            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />

            <TextInput
                style={styles.input}
                placeholder="password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            <Button title="Log In" onPress={handleLogin} disabled={pending} />

            <Link href="/(auth)/signup" style={styles.link}>
                <Text>Don't have account? Sign Up</Text>
            </Link>
        </View>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, justifyContent: 'center' },
    title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 15,
        borderRadius: 10,
        marginBottom: 15,
        fontSize: 16,
    },
    link: { marginTop: 20, textAlign: 'center', color: '#007AFF' },
});