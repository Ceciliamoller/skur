/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react'
import "../../App.js"
import "./createTool.css"
import {
    Box,
    Text,
    VStack,
    Button,
    Select,
    FormLabel,
    FormErrorMessage,
    Stack,
    Radio,
    RadioGroup,
    Textarea,
} from '@chakra-ui/react'
import { Input } from '@chakra-ui/react'
import { collection, addDoc } from "firebase/firestore";
import { firestoreService } from '../../services/firebaseConfig';
import { useAuthValue } from '../../services/AuthService';
import { useNavigate } from "react-router-dom";



export default function CreateTools() {

    const { currentUser } = useAuthValue();
    const navigate = useNavigate();
    const [newTitle, setNewTitle] = useState("");
    const [newType, setType] = useState("share");
    const [newDescription, setNewDescription] = useState("");
    const [newPrice, setNewPrice] = useState("");
    const [newAddress, setNewAddress] = useState("");
    const [toolCategory, setNewToolCategory] = useState("");

    /* Method for creating new tool in firebase */
    async function handleCreateTool(e) {

        e.preventDefault();

        try {
            const docRef = await addDoc(collection(firestoreService, "tools"), {
                toolName: newTitle,
                price: newPrice,
                type: newType,
                description: newDescription,
                category: toolCategory,
                creator: currentUser.uid,
                creatorEmail: currentUser.email,
                creatorName: currentUser.displayName,
                creatorPic: currentUser.photoURL,
                available: true,
                address: newAddress
            });
            navigate('/mineannonser');
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    if (currentUser) {
        return (
            <form onSubmit={(event) => handleCreateTool(event)}>
                <Box alignItems="center">
                    <VStack mt="50px" spacing="50px" mb="50px">
                        <Text fontSize="40px" mb="-10px"> Opprett en annonse</Text>
                        <Box>
                            <RadioGroup onChange={setType} value={newType}>
                                <Stack direction='row'>
                                    <Radio value='share'> Ønsker å leie ut</Radio>
                                    <Radio mr="20px" value='request'> Ønsker å leie </Radio>
                                </Stack>
                            </RadioGroup>
                            <Text fontSize="large" mt="40px"> Tittel </Text>
                            <Input required id="titleID" placeholder='Skriv inn tittel...' value={newTitle} w="500px" focusBorderColor='567189' onChange={(event) => setNewTitle(event.target.value)} />
                        </Box>
                        <Box>
                            <FormLabel> Beskrivelse </FormLabel>
                            <Textarea required id="descriptionID" placeholder='Skriv inn en beskrivelse...' value={newDescription} w="500px" h="200px" focusBorderColor='567189' onChange={(event) => setNewDescription(event.target.value)} />
                        </Box>
                        <Box>
                            <FormLabel> Pris </FormLabel>
                            <Input required type="number" id="priceID" placeholder='Skriv inn en pris...' value={newPrice} min="0" w="500px" focusBorderColor='#567189' onChange={(event) => setNewPrice(event.target.value)} />
                        </Box>
                        <Box>
                            <FormLabel> Addresse </FormLabel>
                            <Input required type="text" id="priceID" placeholder='Skriv inn adressen din...' value={newAddress} min="0" w="500px" focusBorderColor='#567189' onChange={(event) => setNewAddress(event.target.value)} />
                        </Box>
                        <Box>
                            <FormLabel> Kategori </FormLabel>
                            <Select required width="500px" placeholder="Velg kategori" value={toolCategory} onChange={(event) => setNewToolCategory(event.target.value)}>
                                <option value="Hammer">
                                    Hammer
                                </option>
                                <option value="Skrutrekker">
                                    Skrutrekker
                                </option>
                                <option value="Sag">
                                    Sag
                                </option>
                            </Select>
                        </Box>
                        <FormErrorMessage> Alle felter må fylles inn før anonsen kan opprettes. </FormErrorMessage>
                        <Button colorScheme='blue' type='submit'> Opprett annonse </Button>

                    </VStack>
                </Box>
            </form>
        )
    } else {
        return <h1>Ikke logget inn</h1>
    }

}


