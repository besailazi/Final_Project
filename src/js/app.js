/*import {firebaseConfig} from "./firebaseConfig"

import { initializeApp } from "firebase/app"

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth"

initializeApp(firebaseConfig)

const authService = getAuth();*/

document.addEventListener('DOMContentLoaded', function() {
	const icons = document.querySelectorAll('.icons a');
	const popupOverlay = document.querySelector('#popup');
	const errorMessage = document.querySelector('.error-message');
 
	function openPopup() {
	  popupOverlay.style.display = 'flex';
	}
 
	function closePopup() {
	  popupOverlay.style.display = 'none';
	}
 
	icons.forEach(icon => {
	  icon.addEventListener('click', function(event) {
		 event.preventDefault();
		 openPopup();
	  });
	});
 
	const closeBtn = document.querySelector('.close-btn');
	closeBtn.addEventListener('click', closePopup);
 
	// Function to show error message
	function showError() {
	  errorMessage.style.display = 'block';
	}
 
	// Function to hide error message
	function hideError() {
	  errorMessage.style.display = 'none';
	}
 
	
	const signInButton = document.querySelector('.sign-in-button');
	signInButton.addEventListener('click', function(event) {
	  
	  const signInSuccess = false; 
 
	  if (!signInSuccess) {
		 showError();
	  } else {
		 hideError();
	  }
	});
 });
 