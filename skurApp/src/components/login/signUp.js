import React, { useState } from "react";
import './login.css';
import { useNavigate } from 'react-router-dom'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../config/firebaseConfig';


function SignUp() {

    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const onSignup = (e) => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                navigate("/")
                console.log(user);
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
                    <input type="text" placeholder="Navn" />
                    <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" placeholder="Passord" onChange={(e) => setPassword(e.target.value)} />
                    <button type="submit" className="sighUpBtn">Lag bruker</button>
                </div>
            </form>
        </div>
    );
}

export default SignUp;
