import React, { useState } from "react";
import './login.css';
import { useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, signInWithGoogle } from '../../config/firebaseConfig';

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

    function googleSignin() {
        signInWithGoogle().then(() => navigate("/"))
    }

    return (

        <div className="loginPage">

            <div className="container" >
                <div className="loginContainer">
                    <h2>Logg inn:</h2>
                    <button onClick={googleSignin} className="loginWithGoogleBtn">Logg inn med Google</button>
                    <form onSubmit={onLogin}>
                        <h2>Eller logg inn med email</h2>
                        <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                        <button type="submit" id="loginWithEmailBtn" >Logg inn</button>
                        {/* <button id="signUpHereBtn" onClick={signUpBtn}>Har ikke bruker? Registrer deg her</button> */}
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
