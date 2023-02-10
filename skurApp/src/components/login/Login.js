import React, { useState } from "react";
import './login.css';
import { useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../config/firebaseConfig';

function Login() {

    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const onLogin = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
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

    //Skal legges inn onclick={} is alle buttons (som gir popups kanksje??)
    return (
        <div className="loginPage">
            <form onSubmit={onLogin}>
                <div className="container" >
                    <div className="loginContainer">
                        <h2>Logg inn:</h2>
                        <button className="loginWithGoogleBtn">Logg inn med Google</button>
                        <h2>Eller logg inn med email</h2>
                        <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                        <button type="submit" id="loginWithEmailBtn" >Logg inn</button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Login;
