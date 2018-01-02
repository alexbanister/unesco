import firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyCUWwWKxkJxlwKJFJjqP9IhVaG418JC5n8',
  authDomain: 'unesco-f9c1a.firebaseapp.com',
  databaseURL: 'https://unesco-f9c1a.firebaseio.com',
  projectId: 'unesco-f9c1a',
  storageBucket: 'unesco-f9c1a.appspot.com',
  messagingSenderId: '796106198729'
};

const fire = firebase.initializeApp(config);
export default fire;