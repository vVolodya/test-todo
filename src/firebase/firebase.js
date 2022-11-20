import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCNCBNMyo4DctUZe5-uFInwq9ie7uOXifE",
  authDomain: "todowomanup.firebaseapp.com",
  databaseURL:
    "https://todowomanup-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "todowomanup",
  storageBucket: "todowomanup.appspot.com",
  messagingSenderId: "37389168483",
  appId: "1:37389168483:web:2f9c19f83876b174b7ad56",
  measurementId: "G-ZB65B465Q2",
};

export const app = initializeApp(firebaseConfig);
