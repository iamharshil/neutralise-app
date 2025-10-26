"use client";

import fetchCall from "@/utils/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";

export default function Index() {
	const [isLoading, setIsLoading] = useState(true);
	const [shouldRedirect, setShouldRedirect] = useState<"auth" | "tabs" | null>(null);

	useEffect(() => {
		const checkAuth = async () => {
			try {
				const token = await AsyncStorage.getItem("token");

				if (!token) {
					setShouldRedirect("auth");
					return;
				}

				const res = await fetchCall(`/auth/verify?token=${token}`);
				if (!res?.success) {
					await AsyncStorage.removeItem("token");
					setShouldRedirect("auth");
				} else {
					setShouldRedirect("tabs");
				}
			} catch (error) {
				console.error("Auth check failed:", error);
				setShouldRedirect("auth");
			} finally {
				setIsLoading(false);
			}
		};

		checkAuth();
	}, []); // Empty dependency array - runs only once

	if (isLoading) {
		return (
			<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
				<ActivityIndicator size="large" />
			</View>
		);
	}

	if (shouldRedirect === "auth") {
		return <Redirect href="/(auth)/login" />;
	}

	if (shouldRedirect === "tabs") {
		return <Redirect href="/(tabs)" />;
	}

	return null;
}
