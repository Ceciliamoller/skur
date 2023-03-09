import './App.css';
import CreateTools from './components/CreateTools/createTool'
import { ChakraProvider, Button, useColorMode, toggleColorMode, IconButton } from '@chakra-ui/react'
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./components/home/Home";
import Login from "./components/login/Login";
import MyTools from "./components/myTools/MyTools";
import { auth } from './services/firebaseConfig';
import SignUp from './components/login/signUp';
import User from './components/user/user';
import { AuthService } from './services/AuthService'
import { SunIcon, MoonIcon } from '@chakra-ui/icons'


function App() {
  const [currentUser, setCurrentUser] = useState(null)
  const { colorMode, toggleColorMode } = useColorMode()



  //https://css-tricks.com/user-registration-authentication-firebase-react/#managing-user-state-with-react-context-api
  useEffect(() => {

    document.title = 'Skur';

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
            <Link className="navoption" id="buttonSignin" to="/login">
              <Button colorScheme="blue">Logg inn</Button>
            </Link>

          ) : [

            <Button className='navoption' colorScheme="blue" id="buttonSignout" onClick={() => auth.signOut()}>Logg ut </Button>,
            <IconButton className='navoption' icon={colorMode === 'dark' ? <SunIcon /> : <MoonIcon />} size='md' onClick={toggleColorMode}>
            </IconButton>,
            <Link className='navoption' to="/tool"> Ny annonse </Link>,
            <Link className='navoption' to="/mineannonser"> Mine annonser </Link>,
            <Link className='navoption' to="/"> Mine samlinger </Link>,
            <Link className='navoption' to={`/user/${currentUser.uid}`}> Min Profil </Link>
          ]
          }



        </nav >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/tool" element={<CreateTools />} />
          <Route path="/mineannonser" element={<MyTools />} />
          <Route path="/user/:uid" element={<User />} />

        </Routes>
      </AuthService>
    </Router >

  );
}
export default App;
