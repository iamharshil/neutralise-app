import fetchCall from "@/utils/api";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { Link, router } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

const initError = {
	name: "",
	email: "",
	password: "",
};

export default function signup() {
	const [pending, setPending] = useState(false);
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [error, setError] = useState(initError);
	const [err, setErr] = useState("");

	const resetError = (name: string) => {
		setErr("");
		setError((prev) => ({
			...prev,
			[name]: "",
		}));
	};

	const handleSignUp = async () => {
		setPending(true);
		setErr("");

		const res = await fetchCall("/auth/register", {
			method: "POST",
			body: JSON.stringify({ name, email, password }),
		});

		if (!res.success) {
			setPending(false);
			if (res.type === "global" || !res?.type) {
				return setErr(res.message);
			}
			return setError({
				...error,
				[res.type]: res.message,
			});
		}

		router.push("/(auth)/login");
	};

	return (
		<View style={styles.container}>
			<View style={styles.content}>
				<Text style={styles.title}>Sign Up</Text>
				<Text style={styles.subtitle}>Create your account to get started</Text>

				<View style={styles.form}>
					<View style={styles.inputWrapper}>
						<FontAwesome name="user" size={16} style={styles.icon} />
						<TextInput
							style={styles.input}
							placeholder="Name"
							value={name}
							autoCapitalize="words"
							onChangeText={(value) => {
								resetError("name");
								setName(value);
							}}
							placeholderTextColor="#999"
						/>
					</View>

					{error?.name?.length > 0 && (
						<View style={styles.errorContainer}>
							<MaterialIcons style={styles.errorIcon} name="error" size={16} color="red" />
							<Text style={styles.errorMessage}>{error.name}</Text>
						</View>
					)}

					<View style={styles.inputWrapper}>
						<FontAwesome name="envelope" size={16} style={styles.icon} />
						<TextInput
							style={styles.input}
							placeholder="Email"
							value={email}
							onChangeText={(value) => {
								resetError("email");
								setEmail(value);
							}}
							keyboardType="email-address"
							autoCapitalize="none"
							placeholderTextColor="#999"
						/>
					</View>

					{error?.email?.length > 0 && (
						<View style={styles.errorContainer}>
							<MaterialIcons style={styles.errorIcon} name="error" size={16} color="red" />
							<Text style={styles.errorMessage}>{error.email}</Text>
						</View>
					)}

					<View style={styles.inputWrapper}>
						<FontAwesome name="lock" size={16} style={styles.icon} />
						<TextInput
							style={styles.input}
							placeholder="Password"
							value={password}
							onChangeText={(value) => {
								resetError("password");
								setPassword(value);
							}}
							secureTextEntry={!showPassword}
							placeholderTextColor="#999"
						/>
						<TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
							<FontAwesome name={showPassword ? "eye-slash" : "eye"} size={16} color="#999" />
						</TouchableOpacity>
					</View>

					{error?.password?.length > 0 && (
						<View style={styles.errorContainer}>
							<MaterialIcons style={styles.errorIcon} name="error" size={16} color="red" />
							<Text style={styles.errorMessage}>{error.password}</Text>
						</View>
					)}

					{err?.length > 0 && (
						<View style={styles.errorContainer}>
							<MaterialIcons style={styles.errorIcon} name="error" size={16} color="red" />
							<Text style={styles.errorMessage}>{err}</Text>
						</View>
					)}

					<Pressable
						style={[styles.button, pending && styles.buttonDisabled]}
						onPress={handleSignUp}
						disabled={pending}
					>
						<Text style={styles.buttonText}>{pending ? "Creating..." : "Sign Up"}</Text>
					</Pressable>
				</View>

				<View style={styles.loginLink}>
					<Text style={styles.loginText}>Already have an account? </Text>
					<Link href="/(auth)/login">
						<Text style={styles.loginLinkText}>Login</Text>
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
	loginLink: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
	},
	loginText: {
		fontSize: 14,
		color: "#666",
	},
	loginLinkText: {
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
