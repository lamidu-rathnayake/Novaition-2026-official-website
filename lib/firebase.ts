import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: process.env.Firebase_Apikey,
    authDomain: process.env.Firebase_AuthDomain,
    projectId: process.env.Firebase_ProjectId,
    storageBucket: process.env.Firebase_StorageBucket,
    messagingSenderId: process.env.Firebase_MessagingSenderId,
    appId: process.env.Firebase_AppId,
};
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);