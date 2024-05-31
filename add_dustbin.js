// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getDatabase, ref, push, update } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCFzLeAaiPwfbVwEDPMQwviz9ZaBkqHE4E",
  authDomain: "waste-management-ab299.firebaseapp.com",
  databaseURL: "https://waste-management-ab299-default-rtdb.firebaseio.com",
  projectId: "waste-management-ab299",
  storageBucket: "waste-management-ab299.appspot.com",
  messagingSenderId: "823587844034",
  appId: "1:823587844034:web:00d7ddf236131e42daf05b",
  measurementId: "G-YTHZ14GG53"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

document.addEventListener('DOMContentLoaded', (event) => {
    const addDustbinForm = document.getElementById('add-dustbin-form');

    addDustbinForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const dustbinID = document.getElementById('dustbin-id').value;
        const insertDate = document.getElementById('insert-date').value;
        const location = document.getElementById('location').value;

        if (!dustbinID || !insertDate || !location) {
            alert('All fields are required!');
            return;
        }

        const newDustbin = {
            dustbinID: dustbinID,
            insertDate: insertDate,
            location: location,
        };

        const newDustbinKey = push(ref(database, 'dustbins')).key;

        const updates = {};
        updates['/dustbins/' + newDustbinKey] = newDustbin;

        update(ref(database), updates)
            .then(() => {
                alert('Dustbin added successfully!');
                addDustbinForm.reset();
            })
            .catch((error) => {
                console.error('Error adding dustbin:', error);
            });
    });
});
