import React, { useState } from "react";
import './login.css';
import { Link, useNavigate } from "react-router-dom";
import { auth, signInWithGoogle } from '../../services/firebaseConfig';
import { signInWithEmailAndPassword } from "firebase/auth";
import { Avatar, Box, Button, Flex, Heading, IconButton, Stack } from "@chakra-ui/react";



function Login() {

    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorText, setErrorText] = useState('');



    const onLogin = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                navigate("/")
                console.log(user);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = String(errorCode).replace('auth/', '');
                // TODO: add responsetext to user
                setErrorText(errorMessage)
                console.log(errorMessage)
            });

    }

    function googleSignin() {
        signInWithGoogle().then(() => navigate("/"))
    }

    return (




        <Flex flexDirection="column" width="100wh" height="100vh" justifyContent="center" alignItems="center">
            <Avatar bg="blue.600" />
            <Heading color="blue.500">Logg inn</Heading>

            <Box className="container" minW={{ base: "90%", md: "468px" }}>
                <form onSubmit={onLogin}>
                    <Stack spacing={4} p="1rem">
                        <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                        <h3 style={{ color: 'red' }} >{errorText}</h3>
                        <Button type="submit" id="loginWithEmailBtn" colorScheme="blue">Logg inn</Button>
                    </Stack>
                </form>
                <Stack spacing={4} p="1rem">
                    <button onClick={googleSignin} className="loginWithGoogleBtn">Logg inn med Google</button>
                    <Box>Har ikke bruker?<Link id="signUpHereBtn" to="/signUp">Opprett bruker her</Link></Box>
                </Stack>
            </Box>
        </Flex>
    );
}

export default Login;
