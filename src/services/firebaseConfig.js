import { initializeApp } from "firebase/app";

const firebaseConfig = {
	apiKey: "AIzaSyDAHqP4ut5vmuJ7yNH0FrLgW4M5rIHDlEA",
	authDomain: "super-pupper.firebaseapp.com",
	databaseURL: "https://super-pupper-default-rtdb.firebaseio.com",
	projectId: "super-pupper",
	storageBucket: "super-pupper.appspot.com",
	messagingSenderId: "628746708449",
	appId: "1:628746708449:web:6e370df09910e80a02dea0",
};

const firebase = initializeApp(firebaseConfig);

export default firebase;
