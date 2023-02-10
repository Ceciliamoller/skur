import './App.css';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/login/Login";
import { auth } from './config/firebaseConfig';
//import createAd from "./components/CreateAd/createAd";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      setUser(user);
    })
  }, [])


  return (
    <Router>
      <nav>
        <Link to="/"> Home </Link>
        <Link to="/login"> Login </Link>


      </nav>
      <Routes>
        <Route path="/" element={<Home user={user} />} />
        {/* Check if user is signed in, if not show login link*/}
        if (user) {
          <Route path="/login" element={<Login />} />
        }


      </Routes>
    </Router>
  );
}

export default App;
