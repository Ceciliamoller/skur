import './App.css';
import CreateTools from './components/CreateTools/createTool'
import { ChakraProvider } from '@chakra-ui/react'
import { Button } from '@chakra-ui/react'
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./components/home/Home";
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
        <Link id='logo' to="/"><strong>⌂skur</strong> </Link>
        
        {!user ? (
          <Link id="navoption" to="/login"> Login </Link>

        ) :
          (
            <ChakraProvider><Button id='navoption' colorScheme= "blue" className="buttonSignout" onClick={() => auth.signOut()}>Logg ut </Button></ChakraProvider>
          )

        }

        
        <Link id='navoption' to="/tool"> Ny annonse </Link>

        <Link id='navoption' to="/"> Mine annonser </Link>
        <Link id='navoption' to="/"> Mine sammlinger </Link>
        <Link id='navoption'> Chat </Link>



 
        

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
