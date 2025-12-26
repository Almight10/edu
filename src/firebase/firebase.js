import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
// PENTING: Ganti dengan konfigurasi Firebase Anda yang sebenarnya
export const firebaseConfig = {
  projectId: 'studio-8432650142-13775',
  appId: '1:443833292497:web:9c6c196a63505c8227b958',
  apiKey: "AIzaSyDSlqO7F6mF-ifwyo5i2p9A-V24zZNv5B4",
  authDomain: 'studio-8432650142-13775.firebaseapp.com',
  messagingSenderId: '443833292497',
  storageBucket: 'studio-8432650142-13775.appspot.com',
};


// Initialize Firebase
let app;
if (!getApps().length) {  
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

export const auth = getAuth(app);
