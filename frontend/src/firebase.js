// import { initializeApp } from "firebase/app";
// import { getAuth, GoogleAuthProvider } from "firebase/auth";

// // 👉 paste your config here
// const firebaseConfig = {
//   apiKey: "YOUR_API_KEY",
//   authDomain: "YOUR_AUTH_DOMAIN",
//   projectId: "YOUR_PROJECT_ID",
//   appId: "YOUR_APP_ID",
// };

// const app = initializeApp(firebaseConfig);

// // 🔐 authentication service
// export const auth = getAuth(app);

// // 🌐 google login provider
// export const googleProvider = new GoogleAuthProvider();


// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAuth, GoogleAuthProvider } from "firebase/auth";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyBwWps_l0bn0-VjhTRhapz-08TSZ_LAJ6s",
//   authDomain: "mockmateai-e0369.firebaseapp.com",
//   projectId: "mockmateai-e0369",
//   storageBucket: "mockmateai-e0369.firebasestorage.app",
//   messagingSenderId: "503445160470",
//   appId: "1:503445160470:web:d3b1d23bb50339ccfe6b37"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

// // MUST export like this
// const auth = getAuth(app);
// const googleProvider = new GoogleAuthProvider();

// export { auth, googleProvider };



import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBwWps_l0bn0-VjhTRhapz-08TSZ_LAJ6s",
  authDomain: "mockmateai-e0369.firebaseapp.com",
  projectId: "mockmateai-e0369",
  storageBucket: "mockmateai-e0369.appspot.com", // ✅ FIXED (important)
  messagingSenderId: "503445160470",
  appId: "1:503445160470:web:d3b1d23bb50339ccfe6b37"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Auth setup
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// Optional (recommended for Google login consistency)
googleProvider.setCustomParameters({
  prompt: "select_account"
});

// exports
export { auth, googleProvider };



