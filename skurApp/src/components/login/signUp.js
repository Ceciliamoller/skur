import React, { useState } from "react";
import './login.css';
import { useNavigate } from 'react-router-dom'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { Avatar, Box, Button, Flex, Heading, Stack } from "@chakra-ui/react";
import { auth } from '../../services/firebaseConfig';
import { collection, doc, setDoc } from "firebase/firestore";
import { firestoreService } from '../../services/firebaseConfig';


function SignUp() {

    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const onSignup = (e) => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
                // Signed in
                const user = userCredential.user;
                await updateProfile(auth.currentUser, {
                    displayName: name,
                    email
                })
                try {
                    await setDoc(doc(firestoreService, "users", user.uid), {
                        name,
                        email,
                    });
                    navigate("/")
                } catch (e) {
                    console.error("Error adding document: ", e);
                }

            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // TODO: add responsetext to user
                console.log(errorCode, errorMessage)
            });

    }

    return (
        <Flex flexDirection="column" width="100wh" height="100vh" justifyContent="center" alignItems="center">
            <Avatar bg="blue.600" />
            <Heading color="blue.500">Opprett bruker og logg inn</Heading>
            <Box className="signUpPage" minW={{ base: "90%", md: "468px" }}>
                <form onSubmit={onSignup}>
                    <Stack spacing={4} p="1rem">
                        <input type="text" placeholder="Navn" onChange={(e) => setName(e.target.value)} />
                        <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                        <input type="password" placeholder="Passord" onChange={(e) => setPassword(e.target.value)} />
                        <Button type="submit" className="sighUpBtn" colorScheme="blue">Lag bruker</Button>
                    </Stack>
                </form>
            </Box>
        </Flex>
    );
}

export default SignUp;
