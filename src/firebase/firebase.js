import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { firebaseConfig } from './config';

// Initialize Firebase
let app;
if (!getApps().length) {  
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}


export const auth = getAuth(app);
