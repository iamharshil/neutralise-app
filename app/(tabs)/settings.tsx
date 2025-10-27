import { useAuthStore } from "@/hooks/use-auth";
import { themeColors, useThemeStore } from "@/hooks/use-theme";
import fetchCall from "@/utils/api";
import { MaterialIcons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { useRouter } from "expo-router";
import React from "react";
import { Alert, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface UserProfile {
	name: string;
	email: string;
	age?: number;
	gender?: "male" | "female" | "other";
	height?: number;
	weight?: number;
	dailyGoal?: number;
}

export default function Settings() {
	const router = useRouter();
	const logoutStore = useAuthStore((s) => s.logout);
	const theme = useThemeStore((s) => s.theme);
	const toggleTheme = useThemeStore((s) => s.toggleTheme);
	const colors = themeColors[theme];
	const insets = useSafeAreaInsets();

	// Profile state
	const [isEditingProfile, setIsEditingProfile] = React.useState(false);
	const [userProfile, setUserProfile] = React.useState<UserProfile>({
		name: "John Doe",
		email: "john@example.com",
		age: 28,
		gender: "male",
		height: 180,
		weight: 75,
		dailyGoal: 2000,
	});
	const [editedProfile, setEditedProfile] = React.useState<UserProfile>(userProfile);

	// Preferences state
	const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
	const [mealRemindersEnabled, setMealRemindersEnabled] = React.useState(true);
	const [autoSync, setAutoSync] = React.useState(true);
	const [lastSyncTime, setLastSyncTime] = React.useState("2 hours ago");

	// Password change state
	const [showPasswordChange, setShowPasswordChange] = React.useState(false);
	const [currentPassword, setCurrentPassword] = React.useState("");
	const [newPassword, setNewPassword] = React.useState("");
	const [confirmPassword, setConfirmPassword] = React.useState("");
	const [showPasswords, setShowPasswords] = React.useState(false);

	// Data/Sync state
	const [isSyncing, setIsSyncing] = React.useState(false);
	const [syncStatus, setSyncStatus] = React.useState("All data synced");

	// Scroll state for blur effect
	const [scrollY, setScrollY] = React.useState(0);
	const showBlur = scrollY > 10;

	const handleSaveProfile = async () => {
		setUserProfile(editedProfile);
		setIsEditingProfile(false);
		Alert.alert("Success", "Profile updated successfully!");
	};

	const handleCancelEdit = () => {
		setEditedProfile(userProfile);
		setIsEditingProfile(false);
	};

	const handleChangePassword = async () => {
		if (!currentPassword.trim()) {
			return Alert.alert("Error", "Please enter your current password");
		}
		if (!newPassword.trim()) {
			return Alert.alert("Error", "Please enter a new password");
		}
		if (newPassword !== confirmPassword) {
			return Alert.alert("Error", "Passwords do not match");
		}
		if (newPassword.length < 6) {
			return Alert.alert("Error", "Password must be at least 6 characters");
		}

		// Call API to change password
		const res = await fetchCall("/auth/change-password", {
			method: "POST",
			body: JSON.stringify({
				currentPassword,
				newPassword,
			}),
		});

		if (res.success) {
			Alert.alert("Success", "Password changed successfully!");
			setCurrentPassword("");
			setNewPassword("");
			setConfirmPassword("");
			setShowPasswordChange(false);
		} else {
			Alert.alert("Error", res.message || "Failed to change password");
		}
	};

	const handleDataSync = async () => {
		setIsSyncing(true);
		setSyncStatus("Syncing...");

		// Simulate sync delay
		setTimeout(() => {
			setLastSyncTime("just now");
			setSyncStatus("All data synced");
			setIsSyncing(false);
			Alert.alert("Success", "Data synced successfully!");
		}, 2000);
	};

	const handleClearCache = async () => {
		Alert.alert("Clear Cache", "This will remove all cached data. Continue?", [
			{ text: "Cancel", style: "cancel" },
			{
				text: "Clear",
				style: "destructive",
				onPress: async () => {
					// Call API to clear cache
					const res = await fetchCall("/settings/clear-cache", { method: "POST" });
					if (res.success) {
						Alert.alert("Success", "Cache cleared successfully!");
					}
				},
			},
		]);
	};

	const handleLogout = async () => {
		Alert.alert("Log Out", "Are you sure you want to log out?", [
			{ text: "Cancel", style: "cancel" },
			{
				text: "Log Out",
				style: "destructive",
				onPress: async () => {
					const res = await fetchCall("/auth/logout");
					if (!res.success) {
						return Alert.alert(res.message);
					}
					logoutStore();
					return router.replace("/(auth)");
				},
			},
		]);
	};

	return (
		<View style={[styles.wrapper, { backgroundColor: colors.bg }]}>
			<ScrollView
				style={[styles.container, { backgroundColor: colors.bg, paddingTop: insets.top + 8 }]}
				showsVerticalScrollIndicator={false}
				scrollEnabled={true}
				onScroll={(event) => {
					setScrollY(event.nativeEvent.contentOffset.y);
				}}
				scrollEventThrottle={16}
			>
				{/* Header */}
				<View style={styles.headerContainer}>
					<Text style={[styles.pageTitle, { color: colors.text }]}>Settings</Text>
				</View>

				{/* User Profile Card */}
				<View style={[styles.profileCard, { backgroundColor: colors.bgSecondary, borderColor: colors.border }]}>
					<View style={styles.profileHeader}>
						<View style={[styles.avatarContainer, { backgroundColor: colors.accent }]}>
							<MaterialIcons name="person" size={40} color="#fff" />
						</View>
						<View style={{ flex: 1 }}>
							<Text style={[styles.profileName, { color: colors.text }]}>{userProfile.name}</Text>
							<Text style={[styles.profileEmail, { color: colors.textSecondary }]}>{userProfile.email}</Text>
						</View>
						{!isEditingProfile && (
							<TouchableOpacity onPress={() => setIsEditingProfile(true)}>
								<MaterialIcons name="edit" size={24} color={colors.accent} />
							</TouchableOpacity>
						)}
					</View>

					{/* Profile Info Display Mode */}
					{!isEditingProfile && (
						<View style={styles.profileInfoContainer}>
							<View style={[styles.infoRow, { borderBottomColor: colors.border }]}>
								<View style={styles.infoLabel}>
									<MaterialIcons name="person-outline" size={18} color={colors.textSecondary} />
									<Text style={[styles.infoLabelText, { color: colors.textSecondary }]}>Age</Text>
								</View>
								<Text style={[styles.infoValue, { color: colors.text }]}>{userProfile.age} years</Text>
							</View>

							<View style={[styles.infoRow, { borderBottomColor: colors.border }]}>
								<View style={styles.infoLabel}>
									<MaterialIcons name="wc" size={18} color={colors.textSecondary} />
									<Text style={[styles.infoLabelText, { color: colors.textSecondary }]}>Gender</Text>
								</View>
								<Text style={[styles.infoValue, { color: colors.text }]}>
									{userProfile.gender ? userProfile.gender.charAt(0).toUpperCase() + userProfile.gender.slice(1) : "-"}
								</Text>
							</View>

							<View style={[styles.infoRow, { borderBottomColor: colors.border }]}>
								<View style={styles.infoLabel}>
									<MaterialIcons name="height" size={18} color={colors.textSecondary} />
									<Text style={[styles.infoLabelText, { color: colors.textSecondary }]}>Height</Text>
								</View>
								<Text style={[styles.infoValue, { color: colors.text }]}>{userProfile.height} cm</Text>
							</View>

							<View style={[styles.infoRow, { borderBottomColor: colors.border }]}>
								<View style={styles.infoLabel}>
									<MaterialIcons name="balance" size={18} color={colors.textSecondary} />
									<Text style={[styles.infoLabelText, { color: colors.textSecondary }]}>Weight</Text>
								</View>
								<Text style={[styles.infoValue, { color: colors.text }]}>{userProfile.weight} kg</Text>
							</View>

							<View style={styles.infoRow}>
								<View style={styles.infoLabel}>
									<MaterialIcons name="whatshot" size={18} color={colors.textSecondary} />
									<Text style={[styles.infoLabelText, { color: colors.textSecondary }]}>Daily Goal</Text>
								</View>
								<Text style={[styles.infoValue, { color: colors.accent }]}>{userProfile.dailyGoal} kcal</Text>
							</View>
						</View>
					)}

					{/* Profile Info Edit Mode */}
					{isEditingProfile && (
						<View style={styles.editFormContainer}>
							<View style={styles.editFormGroup}>
								<Text style={[styles.editLabel, { color: colors.textSecondary }]}>Full Name</Text>
								<TextInput
									style={[
										styles.editInput,
										{
											backgroundColor: colors.bg,
											color: colors.text,
											borderColor: colors.border,
										},
									]}
									value={editedProfile.name}
									onChangeText={(value) => setEditedProfile({ ...editedProfile, name: value })}
									placeholderTextColor={colors.textSecondary}
								/>
							</View>

							<View style={styles.editFormGroup}>
								<Text style={[styles.editLabel, { color: colors.textSecondary }]}>Email</Text>
								<TextInput
									style={[
										styles.editInput,
										{
											backgroundColor: colors.bg,
											color: colors.text,
											borderColor: colors.border,
										},
									]}
									value={editedProfile.email}
									onChangeText={(value) => setEditedProfile({ ...editedProfile, email: value })}
									keyboardType="email-address"
									placeholderTextColor={colors.textSecondary}
								/>
							</View>

							<View style={styles.twoColumnRow}>
								<View style={[styles.editFormGroup, { flex: 1, marginRight: 8 }]}>
									<Text style={[styles.editLabel, { color: colors.textSecondary }]}>Age</Text>
									<TextInput
										style={[
											styles.editInput,
											{
												backgroundColor: colors.bg,
												color: colors.text,
												borderColor: colors.border,
											},
										]}
										value={editedProfile.age?.toString()}
										onChangeText={(value) => setEditedProfile({ ...editedProfile, age: Number(value) })}
										keyboardType="numeric"
										placeholderTextColor={colors.textSecondary}
									/>
								</View>

								<View style={[styles.editFormGroup, { flex: 1, marginLeft: 8 }]}>
									<Text style={[styles.editLabel, { color: colors.textSecondary }]}>Gender</Text>
									<View style={[styles.genderPicker, { borderColor: colors.border }]}>
										<TouchableOpacity
											style={[
												styles.genderOption,
												editedProfile.gender === "male" && { backgroundColor: colors.accent },
											]}
											onPress={() => setEditedProfile({ ...editedProfile, gender: "male" })}
										>
											<Text
												style={{
													color: editedProfile.gender === "male" ? "#fff" : colors.textSecondary,
													fontWeight: "600",
												}}
											>
												M
											</Text>
										</TouchableOpacity>
										<TouchableOpacity
											style={[
												styles.genderOption,
												editedProfile.gender === "female" && { backgroundColor: colors.accent },
											]}
											onPress={() => setEditedProfile({ ...editedProfile, gender: "female" })}
										>
											<Text
												style={{
													color: editedProfile.gender === "female" ? "#fff" : colors.textSecondary,
													fontWeight: "600",
												}}
											>
												F
											</Text>
										</TouchableOpacity>
										<TouchableOpacity
											style={[
												styles.genderOption,
												editedProfile.gender === "other" && { backgroundColor: colors.accent },
											]}
											onPress={() => setEditedProfile({ ...editedProfile, gender: "other" })}
										>
											<Text
												style={{
													color: editedProfile.gender === "other" ? "#fff" : colors.textSecondary,
													fontWeight: "600",
												}}
											>
												O
											</Text>
										</TouchableOpacity>
									</View>
								</View>
							</View>

							<View style={styles.twoColumnRow}>
								<View style={[styles.editFormGroup, { flex: 1, marginRight: 8 }]}>
									<Text style={[styles.editLabel, { color: colors.textSecondary }]}>Height (cm)</Text>
									<TextInput
										style={[
											styles.editInput,
											{
												backgroundColor: colors.bg,
												color: colors.text,
												borderColor: colors.border,
											},
										]}
										value={editedProfile.height?.toString()}
										onChangeText={(value) => setEditedProfile({ ...editedProfile, height: Number(value) })}
										keyboardType="numeric"
										placeholderTextColor={colors.textSecondary}
									/>
								</View>

								<View style={[styles.editFormGroup, { flex: 1, marginLeft: 8 }]}>
									<Text style={[styles.editLabel, { color: colors.textSecondary }]}>Weight (kg)</Text>
									<TextInput
										style={[
											styles.editInput,
											{
												backgroundColor: colors.bg,
												color: colors.text,
												borderColor: colors.border,
											},
										]}
										value={editedProfile.weight?.toString()}
										onChangeText={(value) => setEditedProfile({ ...editedProfile, weight: Number(value) })}
										keyboardType="numeric"
										placeholderTextColor={colors.textSecondary}
									/>
								</View>
							</View>

							<View style={styles.editFormGroup}>
								<Text style={[styles.editLabel, { color: colors.textSecondary }]}>Daily Calorie Goal</Text>
								<TextInput
									style={[
										styles.editInput,
										{
											backgroundColor: colors.bg,
											color: colors.text,
											borderColor: colors.border,
										},
									]}
									value={editedProfile.dailyGoal?.toString()}
									onChangeText={(value) => setEditedProfile({ ...editedProfile, dailyGoal: Number(value) })}
									keyboardType="numeric"
									placeholderTextColor={colors.textSecondary}
								/>
							</View>

							{/* Save/Cancel Buttons */}
							<View style={styles.editButtonsContainer}>
								<TouchableOpacity
									style={[styles.editButton, { backgroundColor: colors.accent }]}
									onPress={handleSaveProfile}
								>
									<MaterialIcons name="check" size={20} color="#fff" />
									<Text style={styles.editButtonText}>Save</Text>
								</TouchableOpacity>
								<TouchableOpacity
									style={[styles.editButton, { backgroundColor: colors.border }]}
									onPress={handleCancelEdit}
								>
									<MaterialIcons name="close" size={20} color={colors.text} />
									<Text style={[styles.editButtonText, { color: colors.text }]}>Cancel</Text>
								</TouchableOpacity>
							</View>
						</View>
					)}
				</View>

				{/* Appearance Section */}
				<View style={[styles.section, { backgroundColor: colors.bgSecondary, borderColor: colors.border }]}>
					<View style={styles.sectionHeader}>
						<MaterialIcons name="palette" size={20} color={colors.accent} />
						<Text style={[styles.sectionTitle, { color: colors.text }]}>Appearance</Text>
					</View>

					<TouchableOpacity style={[styles.settingRow, { borderBottomColor: colors.border }]} onPress={toggleTheme}>
						<View style={styles.settingLabel}>
							<MaterialIcons name={theme === "dark" ? "dark-mode" : "light-mode"} size={20} color={colors.accent} />
							<View style={{ marginLeft: 12 }}>
								<Text style={[styles.settingName, { color: colors.text }]}>Theme</Text>
								<Text style={[styles.settingValue, { color: colors.textSecondary }]}>
									{theme === "dark" ? "Dark Mode" : "Light Mode"}
								</Text>
							</View>
						</View>
						<MaterialIcons name="arrow-forward" size={20} color={colors.textSecondary} />
					</TouchableOpacity>
				</View>

				{/* Preferences Section */}
				<View style={[styles.section, { backgroundColor: colors.bgSecondary, borderColor: colors.border }]}>
					<View style={styles.sectionHeader}>
						<MaterialIcons name="tune" size={20} color={colors.accent} />
						<Text style={[styles.sectionTitle, { color: colors.text }]}>Preferences</Text>
					</View>

					<TouchableOpacity
						style={[styles.settingRow, { borderBottomColor: colors.border }]}
						onPress={() => setNotificationsEnabled(!notificationsEnabled)}
					>
						<View style={styles.settingLabel}>
							<MaterialIcons name="notifications" size={20} color={colors.accent} />
							<View style={{ marginLeft: 12 }}>
								<Text style={[styles.settingName, { color: colors.text }]}>Notifications</Text>
								<Text style={[styles.settingValue, { color: colors.textSecondary }]}>
									{notificationsEnabled ? "Enabled" : "Disabled"}
								</Text>
							</View>
						</View>
						<View
							style={[styles.toggleSwitch, { backgroundColor: notificationsEnabled ? colors.green : colors.border }]}
						>
							<View
								style={[
									styles.toggleDot,
									{
										transform: [{ translateX: notificationsEnabled ? 24 : 2 }],
										backgroundColor: "#fff",
									},
								]}
							/>
						</View>
					</TouchableOpacity>

					<TouchableOpacity
						style={[styles.settingRow, { borderBottomColor: colors.border }]}
						onPress={() => setMealRemindersEnabled(!mealRemindersEnabled)}
					>
						<View style={styles.settingLabel}>
							<MaterialIcons name="schedule" size={20} color={colors.accent} />
							<View style={{ marginLeft: 12 }}>
								<Text style={[styles.settingName, { color: colors.text }]}>Meal Reminders</Text>
								<Text style={[styles.settingValue, { color: colors.textSecondary }]}>
									{mealRemindersEnabled ? "Daily reminders" : "Disabled"}
								</Text>
							</View>
						</View>
						<View
							style={[styles.toggleSwitch, { backgroundColor: mealRemindersEnabled ? colors.green : colors.border }]}
						>
							<View
								style={[
									styles.toggleDot,
									{
										transform: [{ translateX: mealRemindersEnabled ? 24 : 2 }],
										backgroundColor: "#fff",
									},
								]}
							/>
						</View>
					</TouchableOpacity>

					<TouchableOpacity
						style={[styles.settingRow, { borderBottomColor: colors.border }]}
						onPress={() => setAutoSync(!autoSync)}
					>
						<View style={styles.settingLabel}>
							<MaterialIcons name="cloud-sync" size={20} color={colors.accent} />
							<View style={{ marginLeft: 12 }}>
								<Text style={[styles.settingName, { color: colors.text }]}>Auto Sync</Text>
								<Text style={[styles.settingValue, { color: colors.textSecondary }]}>Last synced {lastSyncTime}</Text>
							</View>
						</View>
						<View style={[styles.toggleSwitch, { backgroundColor: autoSync ? colors.green : colors.border }]}>
							<View
								style={[
									styles.toggleDot,
									{
										transform: [{ translateX: autoSync ? 24 : 2 }],
										backgroundColor: "#fff",
									},
								]}
							/>
						</View>
					</TouchableOpacity>

					<TouchableOpacity style={styles.settingRow} onPress={handleDataSync} disabled={isSyncing}>
						<View style={styles.settingLabel}>
							<MaterialIcons name="sync" size={20} color={colors.accent} />
							<View style={{ marginLeft: 12 }}>
								<Text style={[styles.settingName, { color: colors.text }]}>Sync Data</Text>
								<Text style={[styles.settingValue, { color: colors.textSecondary }]}>{syncStatus}</Text>
							</View>
						</View>
						{isSyncing && <MaterialIcons name="hourglass-empty" size={20} color={colors.textSecondary} />}
						{!isSyncing && <MaterialIcons name="arrow-forward" size={20} color={colors.textSecondary} />}
					</TouchableOpacity>
				</View>

				{/* Account Section */}
				<View style={[styles.section, { backgroundColor: colors.bgSecondary, borderColor: colors.border }]}>
					<View style={styles.sectionHeader}>
						<MaterialIcons name="security" size={20} color={colors.accent} />
						<Text style={[styles.sectionTitle, { color: colors.text }]}>Account</Text>
					</View>

					<TouchableOpacity
						style={[styles.settingRow, { borderBottomColor: colors.border }]}
						onPress={() => setShowPasswordChange(!showPasswordChange)}
					>
						<View style={styles.settingLabel}>
							<MaterialIcons name="lock" size={20} color={colors.amber} />
							<View style={{ marginLeft: 12 }}>
								<Text style={[styles.settingName, { color: colors.text }]}>Change Password</Text>
								<Text style={[styles.settingValue, { color: colors.textSecondary }]}>Update your password</Text>
							</View>
						</View>
						<MaterialIcons
							name={showPasswordChange ? "expand-less" : "expand-more"}
							size={20}
							color={colors.textSecondary}
						/>
					</TouchableOpacity>

					{/* Password Change Form */}
					{showPasswordChange && (
						<View style={[styles.expandedContent, { backgroundColor: colors.bg, borderTopColor: colors.border }]}>
							<View style={styles.passwordInputGroup}>
								<Text style={[styles.inputLabel, { color: colors.textSecondary }]}>Current Password</Text>
								<View style={[styles.passwordInputContainer, { borderColor: colors.border }]}>
									<TextInput
										style={[styles.passwordInput, { color: colors.text }]}
										placeholder="Enter current password"
										placeholderTextColor={colors.textSecondary}
										secureTextEntry={!showPasswords}
										value={currentPassword}
										onChangeText={setCurrentPassword}
									/>
									<TouchableOpacity onPress={() => setShowPasswords(!showPasswords)}>
										<MaterialIcons
											name={showPasswords ? "visibility" : "visibility-off"}
											size={20}
											color={colors.textSecondary}
										/>
									</TouchableOpacity>
								</View>
							</View>

							<View style={styles.passwordInputGroup}>
								<Text style={[styles.inputLabel, { color: colors.textSecondary }]}>New Password</Text>
								<View style={[styles.passwordInputContainer, { borderColor: colors.border }]}>
									<TextInput
										style={[styles.passwordInput, { color: colors.text }]}
										placeholder="Enter new password"
										placeholderTextColor={colors.textSecondary}
										secureTextEntry={!showPasswords}
										value={newPassword}
										onChangeText={setNewPassword}
									/>
								</View>
							</View>

							<View style={styles.passwordInputGroup}>
								<Text style={[styles.inputLabel, { color: colors.textSecondary }]}>Confirm Password</Text>
								<View style={[styles.passwordInputContainer, { borderColor: colors.border }]}>
									<TextInput
										style={[styles.passwordInput, { color: colors.text }]}
										placeholder="Confirm new password"
										placeholderTextColor={colors.textSecondary}
										secureTextEntry={!showPasswords}
										value={confirmPassword}
										onChangeText={setConfirmPassword}
									/>
								</View>
							</View>

							<View style={styles.passwordButtonsContainer}>
								<TouchableOpacity
									style={[styles.passwordButton, { backgroundColor: colors.accent }]}
									onPress={handleChangePassword}
								>
									<MaterialIcons name="check" size={18} color="#fff" />
									<Text style={styles.passwordButtonText}>Update</Text>
								</TouchableOpacity>
								<TouchableOpacity
									style={[styles.passwordButton, { backgroundColor: colors.border }]}
									onPress={() => {
										setShowPasswordChange(false);
										setCurrentPassword("");
										setNewPassword("");
										setConfirmPassword("");
									}}
								>
									<MaterialIcons name="close" size={18} color={colors.text} />
									<Text style={[styles.passwordButtonText, { color: colors.text }]}>Cancel</Text>
								</TouchableOpacity>
							</View>
						</View>
					)}

					<TouchableOpacity style={[styles.settingRow, { borderBottomColor: colors.border }]} onPress={handleLogout}>
						<View style={styles.settingLabel}>
							<MaterialIcons name="logout" size={20} color={colors.red} />
							<View style={{ marginLeft: 12 }}>
								<Text style={[styles.settingName, { color: colors.text }]}>Log Out</Text>
								<Text style={[styles.settingValue, { color: colors.textSecondary }]}>Sign out from your account</Text>
							</View>
						</View>
						<MaterialIcons name="arrow-forward" size={20} color={colors.textSecondary} />
					</TouchableOpacity>

					<TouchableOpacity style={styles.settingRow} onPress={handleClearCache}>
						<View style={styles.settingLabel}>
							<MaterialIcons name="delete-sweep" size={20} color={colors.red} />
							<View style={{ marginLeft: 12 }}>
								<Text style={[styles.settingName, { color: colors.text }]}>Clear Cache</Text>
								<Text style={[styles.settingValue, { color: colors.textSecondary }]}>Remove cached data</Text>
							</View>
						</View>
						<MaterialIcons name="arrow-forward" size={20} color={colors.textSecondary} />
					</TouchableOpacity>
				</View>

				<View style={styles.footer} />
			</ScrollView>

			{/* Blur Header on Scroll */}
			{showBlur && <BlurView intensity={90} style={[styles.blurHeader, { height: insets.top }]} />}
		</View>
	);
}

const styles = StyleSheet.create({
	wrapper: {
		flex: 1,
	},
	container: {
		flex: 1,
		padding: 16,
	},
	blurHeader: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		zIndex: 100,
		pointerEvents: "none",
	},
	headerContainer: {
		paddingVertical: 12,
		paddingHorizontal: 4,
	},
	pageTitle: {
		fontSize: 32,
		fontWeight: "bold",
		letterSpacing: 0.5,
	},
	// Profile Card Styles
	profileCard: {
		borderRadius: 16,
		borderWidth: 1,
		padding: 16,
		marginBottom: 20,
		marginTop: 8,
	},
	profileHeader: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 16,
		gap: 12,
	},
	avatarContainer: {
		width: 60,
		height: 60,
		borderRadius: 30,
		justifyContent: "center",
		alignItems: "center",
	},
	profileName: {
		fontSize: 18,
		fontWeight: "bold",
		marginBottom: 4,
	},
	profileEmail: {
		fontSize: 12,
		fontWeight: "500",
	},
	profileInfoContainer: {
		borderTopWidth: 1,
		paddingTop: 12,
	},
	infoRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingVertical: 12,
		borderBottomWidth: 1,
	},
	infoLabel: {
		flexDirection: "row",
		alignItems: "center",
		gap: 8,
	},
	infoLabelText: {
		fontSize: 12,
		fontWeight: "600",
	},
	infoValue: {
		fontSize: 13,
		fontWeight: "600",
	},
	// Edit Mode Styles
	editFormContainer: {
		borderTopWidth: 1,
		paddingTop: 16,
		gap: 16,
	},
	editFormGroup: {
		gap: 6,
	},
	editLabel: {
		fontSize: 12,
		fontWeight: "600",
		marginLeft: 4,
	},
	editInput: {
		borderRadius: 10,
		borderWidth: 1,
		paddingHorizontal: 12,
		paddingVertical: 10,
		fontSize: 14,
		fontWeight: "500",
	},
	twoColumnRow: {
		flexDirection: "row",
		gap: 0,
	},
	genderPicker: {
		flexDirection: "row",
		borderRadius: 10,
		borderWidth: 1,
		overflow: "hidden",
		height: 40,
	},
	genderOption: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		borderRightWidth: 1,
	},
	editButtonsContainer: {
		flexDirection: "row",
		gap: 12,
		marginTop: 12,
	},
	editButton: {
		flex: 1,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		gap: 8,
		paddingVertical: 12,
		borderRadius: 10,
	},
	editButtonText: {
		fontSize: 14,
		fontWeight: "600",
		color: "#fff",
	},
	// Section Styles
	section: {
		borderRadius: 16,
		borderWidth: 1,
		marginBottom: 16,
		overflow: "hidden",
	},
	sectionHeader: {
		flexDirection: "row",
		alignItems: "center",
		paddingHorizontal: 16,
		paddingVertical: 12,
		gap: 10,
		borderBottomWidth: 1,
	},
	sectionTitle: {
		fontSize: 14,
		fontWeight: "700",
		letterSpacing: 0.3,
		textTransform: "uppercase",
	},
	settingRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingHorizontal: 16,
		paddingVertical: 14,
		borderBottomWidth: 1,
	},
	settingLabel: {
		flexDirection: "row",
		alignItems: "center",
		flex: 1,
	},
	settingName: {
		fontSize: 14,
		fontWeight: "600",
		marginBottom: 2,
	},
	settingValue: {
		fontSize: 11,
		fontWeight: "500",
	},
	// Toggle Switch Styles
	toggleSwitch: {
		width: 52,
		height: 28,
		borderRadius: 14,
		padding: 2,
		justifyContent: "center",
	},
	toggleDot: {
		width: 24,
		height: 24,
		borderRadius: 12,
	},
	// Password Change Styles
	expandedContent: {
		borderTopWidth: 1,
		paddingHorizontal: 16,
		paddingVertical: 16,
		gap: 14,
	},
	passwordInputGroup: {
		gap: 6,
	},
	inputLabel: {
		fontSize: 12,
		fontWeight: "600",
		marginLeft: 4,
	},
	passwordInputContainer: {
		flexDirection: "row",
		alignItems: "center",
		borderRadius: 10,
		borderWidth: 1,
		paddingHorizontal: 12,
		height: 40,
		gap: 8,
	},
	passwordInput: {
		flex: 1,
		fontSize: 14,
		fontWeight: "500",
	},
	passwordButtonsContainer: {
		flexDirection: "row",
		gap: 12,
		marginTop: 8,
	},
	passwordButton: {
		flex: 1,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		gap: 8,
		paddingVertical: 10,
		borderRadius: 10,
	},
	passwordButtonText: {
		fontSize: 13,
		fontWeight: "600",
		color: "#fff",
	},
	footer: {
		height: Platform.OS === "android" ? 80 : 32,
	},
});
