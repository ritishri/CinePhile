
import { initializeApp } from "firebase/app";
import {getFirestore ,collection} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyAFqPddcjWr03yp6SkZ--PoVQrqvfYzaIc",
  authDomain: "cinephile-d3101.firebaseapp.com",
  projectId: "cinephile-d3101",
  storageBucket: "cinephile-d3101.appspot.com",
  messagingSenderId: "857727123764",
  appId: "1:857727123764:web:d8ba0651be57630f6a2561"
};


const app = initializeApp(firebaseConfig);
export const db=getFirestore(app);
export const moviesRef=collection(db,"movies");
export const reviewsRef=collection(db,"reviews");
export const usersRef=collection(db,"users");

export default app;