import { useAuthStore } from "@/hooks/use-auth";
import { Platform } from "react-native";

let API_URL = process.env.EXPO_PUBLIC_API_URL as string;

// Fix for Android: localhost doesn't work on Android emulator/device
// Use 10.0.2.2 instead to reach the host machine
if (Platform.OS === "android" && API_URL?.includes("localhost")) {
	API_URL = API_URL.replace("localhost", "10.0.2.2");
	console.log("🔧 Android API URL adjusted:", API_URL);
}

const fetchCall = async (endpoint: string, options: RequestInit = {}) => {
	const token = useAuthStore.getState()?.token || undefined;
	const url = `${API_URL}${endpoint}`;

	console.log(`📡 [${Platform.OS}] Fetching: ${url}`);

	try {
		// Create abort controller for timeout
		const controller = new AbortController();
		const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 second timeout

		const response = await fetch(url, {
			...options,
			signal: controller.signal,
			headers: {
				"Content-Type": "application/json",
				...(token ? { Authorization: `Bearer ${token}` } : {}),
			},
		});

		clearTimeout(timeoutId);

		if (!response.ok) {
			// Handle HTTP errors
			const errorData = await response.json().catch(() => ({}));
			return {
				success: false,
				message: errorData.message || `HTTP ${response.status} error`,
				status: response.status,
			};
		}

		const res = await response.json();
		return res;
	} catch (error) {
		let errorMessage = "Network error occurred";

		if (error instanceof TypeError) {
			// Network error
			if (error.message.includes("Network request failed")) {
				errorMessage = "Network connection failed. Please check your internet connection.";
			} else if (error.message.includes("Failed to fetch")) {
				errorMessage = "Failed to connect to server. Please try again.";
			} else {
				errorMessage = error.message || "Network error";
			}
		} else if (error instanceof Error) {
			if (error.name === "AbortError") {
				errorMessage = "Request timeout. Please try again.";
			} else {
				errorMessage = error.message || errorMessage;
			}
		} else if (typeof error === "string") {
			errorMessage = error;
		} else if (error && typeof error === "object" && "message" in error) {
			errorMessage = String(error.message) || errorMessage;
		}

		console.error(`[API Error - ${Platform.OS}] ${endpoint}:`, errorMessage);
		console.error("Full error:", error);

		return { success: false, message: errorMessage };
	}
};

export default fetchCall;
