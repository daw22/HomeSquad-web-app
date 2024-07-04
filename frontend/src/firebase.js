// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAgU5tncy2q6PeRph6zrW9XPXE-ObX8VFc",
  authDomain: "homesquad-e26cc.firebaseapp.com",
  projectId: "homesquad-e26cc",
  storageBucket: "homesquad-e26cc.appspot.com",
  messagingSenderId: "149398124554",
  appId: "1:149398124554:web:27c65f1d85eeb29d3c87f3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);