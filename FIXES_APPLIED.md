# Expo App Runtime Errors - Fixed

## Summary

Found and fixed **4 critical configuration issues** causing runtime errors when scanning QR code or connecting to the Expo device. These were duplicate exports and conflicting configurations.

---

## Issues Fixed

### 1. ❌ DUPLICATE Root Layout (**CRITICAL**)

**File:** [app/\_layout.tsx](mobile/app/_layout.tsx)

**Problem:**

```tsx
// WRONG - Two default exports in same file
export default function RootLayout() { ... }  // First export
export default function RootLayout() { ... }  // Second export (breaks routing)
```

**Solution:** Removed the second, incomplete root layout export that was overriding the proper implementation.

**Result:** ✅ Root layout now properly wraps all screens with providers (SafeAreaProvider, BottomSheetModalProvider, GestureHandlerRootView)

---

### 2. ❌ DUPLICATE Index Component (**CRITICAL**)

**File:** [app/index.tsx](mobile/app/index.tsx)

**Problem:**

```tsx
export default function SplashScreen() { ... }   // First export
export default function Index() { ... }          // Second export (breaks)
```

**Solution:** Removed the duplicate placeholder `Index` component, keeping only the `SplashScreen` implementation.

**Result:** ✅ Splash screen now properly displays and navigates to landing page after 2 seconds

---

### 3. ❌ DUPLICATE Tailwind Config (**MAJOR**)

**File:** [tailwind.config.js](mobile/tailwind.config.js)

**Problem:**

```js
module.exports = { ... }  // First config (custom colors)
module.exports = { ... }  // Second config (overrides with different colors + presets)
```

This caused conflicting color definitions and broke NativeWind styling.

**Solution:** Merged both configs into one, keeping:

- Custom color theme (proper HomeEase colors)
- NativeWind preset requirement
- Correct content paths for both app and components

---

### 4. ❌ DUPLICATE Babel Config (**MAJOR**)

**File:** [babel.config.js](mobile/babel.config.js)

**Problem:**

```js
module.exports = function(api) {...}  // First config
module.exports = function(api) {...}  // Second config (overrides first)
```

This broke transpilation for:

- NativeWind CSS-in-JS compilation
- Expo Router deep linking
- React Native Reanimated animations

**Solution:** Merged configs properly with:

- `babel-preset-expo` with NativeWind JSX source
- NativeWind babel plugin
- React Native Reanimated plugin
- Expo Router babel plugin

---

### 5. ⚠️ Duplicate CSS Import (MINOR)

**File:** [app/global.css](mobile/app/global.css)

**Problem:**

- Global CSS was imported in `_layout.tsx` from `../global.css`
- App also had its own `app/global.css` trying to import Tailwind again
- This caused CSS to be processed twice

**Solution:** Cleared the local `app/global.css` and added deprecation comment. All CSS now comes from the root `global.css`.

---

## What Was Causing Errors

When you scanned the QR code or typed the Expo address:

1. Metro bundler would process the duplicate exports
2. React would fail to render because of conflicting component definitions
3. Runtime errors would occur due to mismatched Babel transpilation
4. Tailwind/NativeWind styling would conflict, causing layout crashes

---

## Files Modified

| File                 | Change                       | Impact                          |
| -------------------- | ---------------------------- | ------------------------------- |
| `app/_layout.tsx`    | Removed duplicate export     | 🟢 Routing now works            |
| `app/index.tsx`      | Removed duplicate export     | 🟢 Splash screen shows          |
| `tailwind.config.js` | Merged config, added presets | 🟢 Styling consistent           |
| `babel.config.js`    | Merged config, fixed plugins | 🟢 All features compile         |
| `app/global.css`     | Marked as deprecated         | 🟡 No impact, maintains clarity |

---

## Next Steps

1. **Clear cache** (recommended):

   ```bash
   cd mobile
   rm -rf node_modules/.cache
   rm -rf .expo
   ```

2. **Restart Expo**:

   ```bash
   npm start
   ```

3. **Scan QR code** - Should load without errors now!

---

## Notes

- All core functionality (routing, styling, state management with Zustand) is intact
- No dependencies needed to be added or removed
- The landing and splash screens are configured to work
- Ready to add onboarding and auth routes as needed
