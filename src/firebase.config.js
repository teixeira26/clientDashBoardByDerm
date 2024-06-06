import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection } from 'firebase/firestore';


const firebaseConfig = {
  // apiKey: "AIzaSyD75kNLgS5Wgw_AzDnFqWDgv84WPSUqJV0",
  // authDomain: "bydermdeposito-39da9.firebaseapp.com",
  // projectId: "bydermdeposito-39da9",
  // storageBucket: "bydermdeposito-39da9.appspot.com",
  // messagingSenderId: "820073240355",
  // appId: "1:820073240355:web:956127cb97b8be9e831e96"

  apiKey: "AIzaSyCjFhGson3rMRAreevYI3cladnZuprjZNI",
  authDomain: "depositotemporary.firebaseapp.com",
  projectId: "depositotemporary",
  storageBucket: "depositotemporary.appspot.com",
  messagingSenderId: "682061232493",
  appId: "1:682061232493:web:5eb36598b0e782f07e4264"
};



  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app)
  
  export { auth }; 