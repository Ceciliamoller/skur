import React from "react";
import './login.css';
import { useNavigate } from "react-router-dom";

function Login(){

    let navigate = useNavigate();

    const signUpBtn = () => {
        navigate("/signUp");
    };


    return (

        <div className="loginPage">
            <div className="container">
            <h2>Logg inn:</h2>
            <button className="loginWithGoogleBtn">Logg inn med Google</button>
            <h2>Eller logg inn med email</h2>
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <button className="loginWithEmailBtn">Logg inn</button>
            <button id="signUpHereBtn" onClick={signUpBtn}>Har ikke bruker? Registrer deg her</button>
            </div>
        </div>
    );
}

export default Login;
