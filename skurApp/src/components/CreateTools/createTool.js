/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react'
import "../../App.js"
import "./createTool.css"
import { Box, Text, VStack, Button, Select } from '@chakra-ui/react'
import { Input } from '@chakra-ui/react'
import { ChakraProvider } from '@chakra-ui/react'
import { collection, addDoc } from "firebase/firestore";
import { firestoreService } from '../../config/firebaseConfig';


export default function createTools() {


    const [newTitle, setNewTitle] = useState("");
    const [newDescription, setNewDescription] = useState("");
    const [newPrice, setNewPrice] = useState("");
    const [toolCategory, setNewToolCategory] = useState("");

    /* Method for creating new tool in firebase */
    async function handleCreateTool() {

        try {
            const docRef = await addDoc(collection(firestoreService, "tools"), {
                toolName: newTitle,
                price: newPrice,
                description: newDescription,
                category: toolCategory
            });
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }

    }

    return (
        <ChakraProvider>
            <Box alignItems="center">

                <VStack mt="50px" spacing="50px" mb="50px">
                    <Text fontSize="40px" mb="-20px"> Opprett en annonse</Text>
                    <Box>
                        <Text fontSize="large" textColor="black"> Tittel </Text>
                        <Input id="titleID" placeholder='Skriv inn tittel...' w="500px" focusBorderColor='567189' onChange={(event) => setNewTitle(event.target.value)} />
                    </Box>
                    <Box>
                        <Text fontSize="large" textColor="black" > Beskrivelse </Text>
                        <Input id="descriptionID" placeholder='Skriv inn en beskrivelse...' w="500px" h="200px" focusBorderColor='567189' onChange={(event) => setNewDescription(event.target.value)} />
                    </Box>
                    <Box>
                        <Text fontSize="large" textColor="black" > Pris </Text>
                        <Input type="number" id="priceID" placeholder='Skriv inn en pris...' w="500px" focusBorderColor='#567189' onChange={(event) => setNewPrice(event.target.value)} />
                    </Box>
                    <Box>
                        <Text fontSize="large" textColor="black" > Kategori </Text>
                        <Select width="500px" placeholder="Velg kategori" onChange={(event) => setNewToolCategory(event.target.value)}>
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
                    <Button colorScheme='blue' onClick={handleCreateTool}> Opprett annonse
                    </Button>
                </VStack>
            </Box>
        </ChakraProvider>

    )
}


