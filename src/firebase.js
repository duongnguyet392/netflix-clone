import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth, 
  signInWithEmailAndPassword,
  signOut } from 'firebase/auth'
import {
  addDoc, 
  collection, 
  getFirestore } from 'firebase/firestore';
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyC5Uflrnhrb32JyDjgdCsETQuzPpLrf2YA",
  authDomain: "netflix-clone-8b0dd.firebaseapp.com",
  projectId: "netflix-clone-8b0dd",
  storageBucket: "netflix-clone-8b0dd.appspot.com",
  messagingSenderId: "788955092118",
  appId: "1:788955092118:web:1f591cc72421d0db331eb7"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app)

const signup = async (name, email, password) => {
    try{
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const user = res.user;
      await addDoc(collection(db,"user"), {
        uid: user.uid,
        name,
        authProvider: "local",
        email,
      });
    } catch(error) {
      console.log(error);
      toast.error(error.code.split('/')[1].split('-').join(" "))
    }
}

const login = async (email, password) =>{
  try{
    await signInWithEmailAndPassword(auth, email, password)
  }catch(error){
    console.log(error);
    toast.error(error.code.split('/')[1].split('-').join(" "))
  }
}

const logout = ()=>{
  signOut(auth)
}

export {auth, db, login, signup, logout};