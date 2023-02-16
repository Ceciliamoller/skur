import './App.css';
import CreateTools from './components/CreateTools/createTool'
import { ChakraProvider, Button } from '@chakra-ui/react'
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./components/home/Home";
import Login from "./components/login/Login";
import MyTools from "./components/myTools/MyTools";
import { auth } from './services/firebaseConfig';
import SignUp from './components/login/signUp';
//import createAd from "./components/CreateAd/createAd";
import { AuthService } from './services/AuthService'

function App() {
  const [currentUser, setCurrentUser] = useState(null)


  //https://css-tricks.com/user-registration-authentication-firebase-react/#managing-user-state-with-react-context-api
  useEffect(() => {
    auth.onAuthStateChanged(user => {
      setCurrentUser(user)
    })
  }, [])

  return (

    <Router>
      <AuthService value={{ currentUser }}>
        <nav>
          <Link id='logo' to="/"><strong>⌂ skur</strong> </Link>

          {/* Router guard */}
          {!currentUser ? (
            <Link className="navoption" id="buttonSignin" to="/login"><ChakraProvider><Button colorScheme="blue">Logg inn</Button></ChakraProvider></Link>

          ) : [
            <ChakraProvider><Button className='navoption' colorScheme="blue" id="buttonSignout" onClick={() => auth.signOut()}>Logg ut </Button></ChakraProvider>,
            <Link className='navoption' to="/tool"> Ny annonse </Link>,
            <Link className='navoption' to="/mineannonser"> Mine annonser </Link>,
            <Link className='navoption' to="/"> Mine samlinger </Link>,
          ]
          }



        </nav >
        <Routes>
          <Route path="/" element={<Home user={currentUser} />} />

          <Route path="/login" element={<Login />} />

          <Route path="/signUp" element={<SignUp />} />
          <Route path="/tool" element={<CreateTools />} />

          <Route path="/mineannonser" element={<MyTools user={currentUser} />} />


        </Routes>
      </AuthService>
    </Router >

  );
}
export default App;
