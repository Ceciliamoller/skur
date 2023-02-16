import './App.css';
import CreateTools from './components/CreateTools/createTool'
import { ChakraProvider } from '@chakra-ui/react'
import { Box } from '@chakra-ui/react'
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/login/Login";
import { auth } from './config/firebaseConfig';
import SignUp from './components/login/signUp';
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
        {/* Check if user is signed in, if not show login link*/}

        {!user ? (
          <Link to="/login"> Login </Link>
        ) :
          (
            <button className="button signout" onClick={() => auth.signOut()}>Sign out</button>
          )
        }
        <Link to="/tool"> Tools </Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home user={user} />} />

        <Route path="/login" element={<Login />} />

        <Route path="/signUp" element={<SignUp />} />
        <Route path="/tool" element={<CreateTools />} />

      </Routes>
    </Router>
  );
}
export default App;
