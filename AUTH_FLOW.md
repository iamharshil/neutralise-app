# Auth Flow Architecture

## Overview
The authentication flow has been refactored for cleaner routing and better state management.

## Structure

### Root Layout (`app/_layout.tsx`)
- **Primary auth check** happens here
- Conditionally renders either `(auth)` or `(tabs)` stack based on token state
- Waits for Zustand hydration before rendering
- No Redirect needed in child layouts

### Auth Layout (`app/(auth)/_layout.tsx`) - NEW
- Container for all auth-related screens
- Manages auth stack routing
- Screens: Onboarding (index) → Login → Signup

### Tabs Layout (`app/(tabs)/_layout.tsx`)
- Simplified - now only renders tab screens
- No auth checks (handled at root level)
- Auth checks removed since root handles routing

## Screens

### Onboarding (`app/(auth)/index.tsx`)
- Initial landing page
- Displays app branding and value proposition
- Two buttons: "Log In" and "Sign Up"
- Only shown when user is not authenticated

### Login (`app/(auth)/login.tsx`)
- Email/password authentication
- Shows loading state during login
- Validation and error handling
- Link to signup page

### Signup (`app/(auth)/signup.tsx`)
- Name, email, password registration
- Field-level error validation
- Global error handling
- Link to login page

## Settings & Logout (`app/(tabs)/settings.tsx`)
- Logout button calls backend `/auth/logout`
- Clears Zustand token state
- Redirects to `/(auth)` (onboarding)
- Root layout handles conditional rendering

## Auth State Management (`hooks/use-auth.ts`)
- Zustand store with AsyncStorage persistence
- `token` - stores auth token
- `setToken()` - sets token after login
- `logout()` - clears token

## Flow Diagram

```
App Start
   ↓
Root Layout
   ├─ Hydrate Zustand from AsyncStorage
   ├─ Check token state
   │
   ├─ No Token → (auth) Stack
   │   ├─ index (Onboarding)
   │   ├─ login
   │   └─ signup
   │
   └─ Has Token → (tabs) Stack
       ├─ index (Home)
       ├─ calendar
       ├─ create
       ├─ insights
       └─ settings (Logout)
                ↓
            Clears token
                ↓
            Returns to (auth)
```

## Key Improvements
1. ✅ Centralized auth checking in root layout
2. ✅ Proper Zustand hydration handling
3. ✅ No auth redirects in tab layout (cleaner code)
4. ✅ Onboarding screen included in auth flow
5. ✅ Smooth logout experience
6. ✅ Persistent authentication state
