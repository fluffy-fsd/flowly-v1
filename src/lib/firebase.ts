import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC4_6BVywXAhuzwwAb9XRsVFnabFirJsG8",
  authDomain: "fstudios-admin.firebaseapp.com",
  projectId: "fstudios-admin",
  storageBucket: "fstudios-admin.firebasestorage.app",
  messagingSenderId: "428320648682",
  appId: "1:428320648682:web:b6a49515656f5ec73c9693",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
