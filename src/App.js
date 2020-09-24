import React, {useRef, useState} from 'react';
import './App.css';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics';

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
const analytics = firebase.analytics();
const [user] = useAuthState(auth);

function App() {
  return (
    <div className="App">
      <header>
        <h1>Chat App <span>💬</span></h1>
        <SignOut />
      </header>

      <section>
        {user ? <ChatRoom /> : <SignIn />}
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
    <>
      <button
      className="sign-in"
      onClick={signInWithGoogle}
      >
        Sigin in with Google
      </button>
    </>
  )
}

function SignOut() {
  return auth.currentUser && (

    <button
     className="sign-out"
     onClick={() => auth.SignOut()}
    >
      Sign Out
    </button>
  )
}

function ChatRoom() {
  const dummy = useRef();
  const messagesRef = firestore.collection('messages');
  const query = messagesRef.orderBy('createdAt').limit(25);

  const [messages] = useCollectionData(query, {idField: 'id'});

  const [formValue, setFormValue] = useState('');

  const sendMessage = async(e) => {
    e.preventDefault();
    const { uid, photoURL} = auth.currentUser;
    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL
    });

    setFormValue('');
    dummy.current.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <>
      <main>
        {messages && messages.map(msg => 
        <ChatMessage key={msg.id} message={msg} />)}
      </main>
      <form onSubmit={sendMessage}>
        <input value={formValue} 
        onChange={(e) => setFormValue(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </>
  )
}

function ChatMessage(props) {
const {text, uid, photoURL} = props.message;
const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';

return (
  <div className={`message ${messageClass}`}>
    <img src={photoURL} />
    <p>{text}</p>
  </div>
)
}

export default App;
