import React, {useState} from 'react';
import './App.css';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';


firebase.initializeApp({
  apiKey: "AIzaSyD-fzVxyhQJBlyfauIYojEpabPVoI8cIn4",
  authDomain: "react-chat-6b6db.firebaseapp.com",
  databaseURL: "https://react-chat-6b6db.firebaseio.com",
  projectId: "react-chat-6b6db",
  storageBucket: "react-chat-6b6db.appspot.com",
  messagingSenderId: "761977692735",
  appId: "1:761977692735:web:c049882487841880ee4e8a",
  measurementId: "G-1GVJRBE6NS"
})

const auth = firebase.auth();
const firestore = firebase.firestore();
const [user] = useAuthState(auth);

function App() {
  return (
    <div className="App">
      <header className="App-header">
      </header>

      <section>
        {/* {user ? <ChatRoom /> : <SignIn />} */}
      </section>
    </div>
  );
}

function SignIn() {

  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }
  return(
    <button
    onClick={signInWithGoogle}
    >
      Sigin in with Google
    </button>
  )
}

export default App;
