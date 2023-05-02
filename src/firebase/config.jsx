import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDeaNGdGTGUICVmVIi1EQeP3Hwu3P9-fng",
  authDomain: "socail-media-v2.firebaseapp.com",
  projectId: "socail-media-v2",
  storageBucket: "socail-media-v2.appspot.com",
  messagingSenderId: "619027647298",
  appId: "1:619027647298:web:919b830b3630e8fbdf56db",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

export const db = getFirestore(app);
