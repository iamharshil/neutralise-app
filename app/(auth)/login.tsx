import { useAuthStore } from "@/hooks/use-auth";
import fetchCall from "@/utils/api";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { Link, router } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function login() {
	const [pending, setPending] = useState(false);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [error, setError] = useState("");
	const setToken = useAuthStore((s) => s.setToken);

	const handleChange = (name: string, value: string) => {
		setError("");
		if (name === "email") {
			setEmail(value);
		} else if (name === "password") {
			setPassword(value);
		}
	};

	const handleLogin = async () => {
		setPending(true);
		setError("");

		const res = await fetchCall("/auth/login", {
			method: "POST",
			body: JSON.stringify({ email, password }),
		});

		if (!res.success) {
			setPending(false);
			return setError(res.message);
		}

		setToken(res.data);
		router.replace("/(tabs)");
	};

	return (
		<View style={styles.container}>
			<View style={styles.content}>
				<Text style={styles.title}>Log In</Text>
				<Text style={styles.subtitle}>Welcome back! Please sign in to your account</Text>

				<View style={styles.form}>
					<View style={styles.inputWrapper}>
						<FontAwesome name="envelope" size={16} style={styles.icon} />
						<TextInput
							autoFocus={true}
							style={styles.input}
							placeholder="Email"
							value={email}
							onChangeText={(e) => handleChange("email", e)}
							keyboardType="email-address"
							autoCapitalize="none"
							placeholderTextColor="#999"
						/>
					</View>

					<View style={styles.inputWrapper}>
						<FontAwesome name="lock" size={16} style={styles.icon} />
						<TextInput
							style={styles.input}
							placeholder="Password"
							value={password}
							onChangeText={(e) => handleChange("password", e)}
							secureTextEntry={!showPassword}
							placeholderTextColor="#999"
						/>
						<TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
							<FontAwesome name={showPassword ? "eye-slash" : "eye"} size={16} color="#999" />
						</TouchableOpacity>
					</View>

					{error?.length > 0 && (
						<View style={styles.errorContainer}>
							<MaterialIcons style={styles.errorIcon} name="error" size={16} color="red" />
							<Text style={styles.errorMessage}>{error}</Text>
						</View>
					)}

					<Pressable style={[styles.button, pending && styles.buttonDisabled]} onPress={handleLogin} disabled={pending}>
						<Text style={styles.buttonText}>{pending ? "Signing In..." : "Log In"}</Text>
					</Pressable>
				</View>

				<View style={styles.signupLink}>
					<Text style={styles.signupText}>Don't have an account? </Text>
					<Link href="/(auth)/signup">
						<Text style={styles.signupLinkText}>Sign Up</Text>
					</Link>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		justifyContent: "center",
	},
	content: {
		paddingHorizontal: 32,
		paddingVertical: 40,
	},
	title: {
		fontSize: 28,
		fontWeight: "700",
		color: "#000",
		textAlign: "center",
		marginBottom: 8,
	},
	subtitle: {
		fontSize: 16,
		color: "#666",
		textAlign: "center",
		marginBottom: 48,
	},
	form: {
		marginBottom: 32,
	},
	inputWrapper: {
		flexDirection: "row",
		alignItems: "center",
		borderBottomWidth: 1,
		borderBottomColor: "#e0e0e0",
		paddingVertical: 16,
		marginBottom: 8,
	},
	icon: {
		color: "#999",
		marginRight: 12,
		width: 20,
	},
	input: {
		flex: 1,
		fontSize: 16,
		color: "#000",
		paddingVertical: 0,
	},
	eyeIcon: {
		padding: 4,
		marginLeft: 8,
	},
	button: {
		backgroundColor: "#000",
		paddingVertical: 16,
		borderRadius: 8,
		marginTop: 24,
	},
	buttonDisabled: {
		opacity: 0.6,
	},
	buttonText: {
		color: "#fff",
		fontSize: 16,
		fontWeight: "600",
		textAlign: "center",
	},
	signupLink: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
	},
	signupText: {
		fontSize: 14,
		color: "#666",
	},
	signupLinkText: {
		fontSize: 14,
		color: "#000",
		fontWeight: "600",
	},
	errorContainer: {
		flexDirection: "row",
		padding: 5,
		alignItems: "center",
	},
	errorIcon: {
		marginRight: 5,
	},
	errorMessage: {
		color: "red",
	},
});
