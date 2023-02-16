import './App.css';
import CreateTools from './components/CreateTools/createTool'
import { ChakraProvider } from '@chakra-ui/react'
import { Box } from '@chakra-ui/react'
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./components/home/Home";
import Login from "./components/login/Login";
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
          <Link to="/"> Hjem </Link>
          {/* Check if user is signed in, if not show login link*/}


          <Link to="/tool"> Ny annonse </Link>

          <Link to="/"> Mine annonser </Link>
          <Link to="/"> Mine sammlinger </Link>
          <Link> Chat </Link>

          {/* Router guard */}
          {!currentUser ? (
            <Link to="/login"> Login </Link>
          ) :
            (<button className="buttonSignout" onClick={() => auth.signOut()}>Logg ut</button>)
          }
        </nav>
        <Routes>
          <Route path="/" element={<Home user={currentUser} />} />

          <Route path="/login" element={<Login />} />

          <Route path="/signUp" element={<SignUp />} />
          <Route path="/tool" element={<CreateTools />} />

        </Routes>
      </AuthService>
    </Router>
  );
}
export default App;
