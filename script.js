import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getDatabase, ref, push, onChildAdded } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC9mhEtFHh8vy_qqvdRZmpQSDYAn80rlpA",
    authDomain: "letstalk-32034.firebaseapp.com",
    databaseURL: "https://letstalk-32034-default-rtdb.firebaseio.com",
    projectId: "letstalk-32034",
    storageBucket: "letstalk-32034.appspot.com",
    messagingSenderId: "48080496391",
    appId: "1:48080496391:web:fbf074465a2fb61b4707a2"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const database = getDatabase();
const messagesRef = ref(database, 'messages');
// Check if user is authenticated
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in
    const { uid, displayName } = user;

    // Send message when send button is clicked
    document.getElementById('sendMessageBtn').addEventListener('click', () => {
      const messageInput = document.getElementById('messageInput').value;
      if (messageInput.trim() === '') return;

      const message = {
        text: messageInput,
        sender: displayName, // Add sender's name
        timestamp: firebase.database.ServerValue.TIMESTAMP,
        uid: uid // Add sender's UID for reference
      };

      push(messagesRef, message);
      document.getElementById('messageInput').value = '';
    });

    // Display messages
    onChildAdded(messagesRef, (snapshot) => {
      const message = snapshot.val();
      const chatMessages = document.getElementById('chatMessages');
      const messageElement = document.createElement('div');
      messageElement.textContent = `${message.sender}: ${message.text}`; // Display sender's name
      chatMessages.appendChild(messageElement);
    });
  } else {
    // User is signed out or not yet signed in
    console.log("User is not authenticated.");
  }
});
