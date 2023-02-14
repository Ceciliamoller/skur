/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react'
import "../../App.js"
import "./createTool.css"
import { Box,
     Text, 
     VStack, 
     Button, 
     Select, 
     FormControl, 
     FormLabel,
     FormErrorMessage,
     FormHelperText,
} from '@chakra-ui/react'
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
            <form>
            <Box alignItems="center">
                <VStack mt="50px" spacing="50px" mb="50px">
                    <Text fontSize="40px" mb="-20px"> Opprett en annonse</Text>
                    <Box>
                    <Text fontSize="large" textColor="black"> Tittel </Text>
                        <Input required id="titleID" placeholder='Skriv inn tittel...' w="500px"  focusBorderColor='567189' onChange={(event) => setNewTitle(event.target.value)} />                
                    </Box>
                    <Box>
                        <FormLabel> Beskrivelse </FormLabel>
                        <Input required id="descriptionID" placeholder='Skriv inn en beskrivelse...' w="500px" h="200px" focusBorderColor='567189' onChange={(event) => setNewDescription(event.target.value)} />
                    </Box>
                    <Box>
                        <FormLabel> Pris </FormLabel>
                        <Input required type="number" id="priceID" placeholder='Skriv inn en pris...' w="500px" focusBorderColor='#567189' onChange={(event) => setNewPrice(event.target.value)} />
                    </Box>
                    <Box>
                        <FormLabel> Kategori </FormLabel>
                        <Select required width="500px" placeholder="Velg kategori" onChange={(event) => setNewToolCategory(event.target.value)}>
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
                    <Button colorScheme='blue' onClick={handleCreateTool} type='submit'> Opprett annonse
                    </Button>
                </VStack>
            </Box>
            </form>
        </ChakraProvider>
    )
}


