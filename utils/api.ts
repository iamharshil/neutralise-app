import { useAuthStore } from "@/hooks/use-auth";

const API_URL = process.env.EXPO_PUBLIC_API_URL as string;

const fetchCall = async (endpoint: string, options: RequestInit = {}) => {
	const token = useAuthStore.getState()?.token || undefined;
	const url = `${API_URL}${endpoint}`;

	try {
		const response = await fetch(url, {
			...options,
			headers: {
				"Content-Type": "application/json",
				...(token ? { Authorization: `Bearer ${token}` } : {}),
			},
		});
		const res = await response.json();

		return res;
	} catch (error) {
		let errorMessage = "An unexpected error occurred";
		if (error instanceof Error) {
			errorMessage = error.message || errorMessage;
		} else if (typeof error === "string") {
			errorMessage = error;
		} else if (error && typeof error === "object" && "message" in error) {
			errorMessage = String(error.message) || errorMessage;
		}

		return { success: false, message: errorMessage };
	}
};

export default fetchCall;
