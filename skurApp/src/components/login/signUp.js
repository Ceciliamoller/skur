import React from "react";
import './login.css';


function SignUp(){


    return (
        <div className="signUpPage">
            <div className="container">
                <h2>Eller lag en bruker:</h2>
                <input type="text" placeholder="Navn" />
                <input type="email" placeholder="Email" />
                <input type="password" placeholder="Passord" />
                <button className="sighUpBtn">Lag bruker</button>
            </div>
        </div>
    );
}

export default SignUp;
