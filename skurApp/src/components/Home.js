import React from "react";
import { auth } from "../config/firebaseConfig"

const Home = ({ user }) => {

    if (user) {
        return (

            <div className="home">
                <h1>Hello, <span></span>{user.displayName}</h1>
                <img src={user.photoURL} alt="" />
                <button className="button signout" onClick={() => auth.signOut()}>Sign out</button>
            </div>

        )
    }
    else {
        return <h1>Ikke logget inn</h1>
    }
}
export default Home;