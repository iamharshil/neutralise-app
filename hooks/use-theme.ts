import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type ThemeMode = "light" | "dark";

interface ThemeState {
	theme: ThemeMode;
	setTheme: (theme: ThemeMode) => void;
	toggleTheme: () => void;
}

export const useThemeStore = create<ThemeState>()(
	persist(
		(set, get) => ({
			theme: "dark",

			setTheme: (theme) => set({ theme }),

			toggleTheme: () => {
				const current = get().theme;
				set({ theme: current === "dark" ? "light" : "dark" });
			},
		}),
		{
			name: "theme-storage",
			storage: createJSONStorage(() => AsyncStorage),
		},
	),
);

// Theme color definitions
export const themeColors = {
	dark: {
		bg: "#0f172a",
		bgSecondary: "#1e293b",
		bgTertiary: "#334155",
		text: "#f8fafc",
		textSecondary: "#94a3b8",
		textTertiary: "#64748b",
		accent: "#06b6d4",
		border: "#334155",
		red: "#ef4444",
		green: "#10b981",
		amber: "#f59e0b",
		blue: "#3b82f6",
		purple: "#8b5cf6",
	},
	light: {
		bg: "#f8fafc",
		bgSecondary: "#f1f5f9",
		bgTertiary: "#e2e8f0",
		text: "#0f172a",
		textSecondary: "#475569",
		textTertiary: "#64748b",
		accent: "#0891b2",
		border: "#cbd5e1",
		red: "#dc2626",
		green: "#059669",
		amber: "#d97706",
		blue: "#2563eb",
		purple: "#7c3aed",
	},
};
