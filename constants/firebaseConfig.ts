import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCL1YZcWoQm1ktHg8P2eAGtIvMiTvPgeDA",
  authDomain: "focus-forge.firebaseapp.com",
  projectId: "focus-forge",
  storageBucket: "focus-forge.appspot.com",
  messagingSenderId: "99760921486",
  appId: "1:99760921486:web:14d37c77d3c78614ae22df",
  measurementId: "G-WHWS2DZF1J",
};

const app = initializeApp(firebaseConfig);

export default app;
