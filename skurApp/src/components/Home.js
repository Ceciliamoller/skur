import React from "react";

const Home = ({ user }) => {

    if (user) {
        return (

            <div className="home">
                <h1>Hello, <span></span>{user.displayName}</h1>
                <img src={user.photoURL} alt="" />

            </div>

        )
    }
    else {
        return <h1>Ikke logget inn</h1>
    }
}
export default Home;