import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage, ref } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCANmOEE0Lec840y1_3-dJRs4IIDjJ7w34',
  authDomain: 'eden-cms-54719.firebaseapp.com',
  databaseURL: 'https://eden-cms-54719-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'eden-cms-54719',
  storageBucket: 'eden-cms-54719.appspot.com',
  messagingSenderId: '104103528113',
  appId: '1:104103528113:web:63a8fc0de950e37850c490',
  measurementId: 'G-8YXRZVRH4Z',
};

const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
export const storage = getStorage(app);
export const storageRef = ref(app);
export const auth = getAuth(app);
