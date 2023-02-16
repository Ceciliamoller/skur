import React, { useState } from "react";
import './login.css';
import { useNavigate } from 'react-router-dom'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../../services/firebaseConfig';
import { collection, doc, setDoc } from "firebase/firestore";
import { firestoreService } from '../../services/firebaseConfig';


function SignUp() {

    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const onSignup = (e) => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
                // Signed in
                const user = userCredential.user;
                await updateProfile(auth.currentUser, {
                    displayName: name,
                    email
                })
                try {
                    await setDoc(doc(firestoreService, "users", user.uid), {
                        name,
                        email,
                    });
                    navigate("/")
                } catch (e) {
                    console.error("Error adding document: ", e);
                }

            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // TODO: add responsetext to user
                console.log(errorCode, errorMessage)
            });

    }

    return (
        <div className="signUpPage">
            <form onSubmit={onSignup}>
                <div className="container">
                    <h2>Eller lag en bruker:</h2>
                    <input type="text" placeholder="Navn" onChange={(e) => setName(e.target.value)} />
                    <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" placeholder="Passord" onChange={(e) => setPassword(e.target.value)} />
                    <button type="submit" className="sighUpBtn">Lag bruker</button>
                </div>
            </form>
        </div>
    );
}

export default SignUp;
