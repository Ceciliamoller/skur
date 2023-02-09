import React from "react";
import './login.css';

function Login(){


    //Skal legges inn onclick={} is alle buttons (som gir popups kanksje??)
    return (
        <div className="loginPage">
            <div className="container" >
                <div className="loginContainer">
                    <h2>Logg inn:</h2>
                    <button className="loginWithGoogleBtn">Logg inn med Google</button>
                    <h2>Eller logg inn med email</h2>
                    <input type="email" placeholder="Email" />
			        <input type="password" placeholder="Password" />
                    <button className="loginWithEmailBtn">Logg inn</button>
                </div>
                <div className="signUpContainer">
                    <h2>Eller lag en bruker:</h2>
                    <input type="text" placeholder="Navn" />
                    <input type="email" placeholder="Email" />
                    <input type="password" placeholder="Passord" />
                    <button className="sighUpBtn">Lag bruker</button>

                </div>
                
            </div>


            
        </div>
    );
}

export default Login;
