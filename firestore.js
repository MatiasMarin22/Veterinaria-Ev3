import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-app.js"
import { addDoc, collection, deleteDoc, doc, getDoc, getFirestore, onSnapshot, updateDoc } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-firestore.js"

const firebaseConfig = {
    apiKey: "AIzaSyDHPkwvYFUZOUWlNrrnCH0g8hHPHouiJEg",
    authDomain: "evaluacion-3-fec1d.firebaseapp.com",
    projectId: "evaluacion-3-fec1d",
    storageBucket: "evaluacion-3-fec1d.appspot.com",
    messagingSenderId: "39397947523",
    appId: "1:39397947523:web:78136894bf4bfe17f303b6"
  };

const app = initializeApp(firebaseConfig)

const db = getFirestore(app)

export const save = (mascota) => {
    addDoc(collection(db, 'Mascotas'), mascota)
}

export const getData = (data) => {
    onSnapshot(collection(db, 'Mascotas'), data)
}

export const remove = (id) => {
    deleteDoc(doc(db, 'Mascotas', id))
}

export const selectOne = (id) => getDoc(doc(db, 'Mascotas', id))

export const edit = (id, mascota) => {
    updateDoc(doc(db, 'Mascotas', id), mascota)
}
