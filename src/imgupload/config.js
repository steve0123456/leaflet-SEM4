// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getStorage} from "firebase/storage";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBP74nG0YSy-M2o7K0x9Mls7ccNtZPQr5w",
  authDomain: "txt-img.firebaseapp.com",
  projectId: "txt-img",
  storageBucket: "txt-img.appspot.com",
  messagingSenderId: "9728120053",
  appId: "1:9728120053:web:c41fdc9452f622515121bc"
};




// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const imgdb = getStorage(app);
const textdb =getFirestore(app);
const storage = getStorage(app);
export {imgdb, textdb,firebaseConfig,storage};