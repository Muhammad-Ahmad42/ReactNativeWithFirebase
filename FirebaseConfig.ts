import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyAE9E-gqijmsC5tfb7f-tHdVctr_3mxSB0",
    authDomain: "odooauth-debd2.firebaseapp.com",
    databaseURL: "https://odooauth-debd2-default-rtdb.firebaseio.com",
    projectId: "odooauth-debd2",
    storageBucket: "odooauth-debd2.appspot.com",
    messagingSenderId: "818665979216",
    appId: "1:818665979216:web:77629958fc94565918c055",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db };
