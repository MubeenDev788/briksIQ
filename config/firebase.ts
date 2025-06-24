import { initializeApp, getApps } from 'firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyBA20Ghz1FjdmJ_Db5pn0cxgdmje5w2YWA",
  authDomain: "briksiq.firebaseapp.com",
  projectId: "briksiq",
  storageBucket: "briksiq.firebasestorage.app",
  messagingSenderId: "228246328840",
  appId: "1:228246328840:android:2be76e0af70912a18063bd"
};

// Initialize Firebase
let app;
if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

// Initialize Auth
let auth;
if (Platform.OS === 'web') {
  auth = getAuth(app);
} else {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
  });
}

// Initialize Firestore
export const db = getFirestore(app);
export { auth };
export default app;