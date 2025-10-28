rm -rf ios android
rm -rf node_modules && npm install

npx expo prebuild --platform android --clean
npx expo prebuild --platform ios --clean


<!-- for production -->
npx expo run:android --release


<!-- local apk build -->
eas build --platform android --local 2>&1 | tail -100
