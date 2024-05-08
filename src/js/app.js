import {firebaseConfig} from "./firebaseConfig"

import { initializeApp } from "firebase/app"

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth"

initializeApp(firebaseConfig)

const authService = getAuth();