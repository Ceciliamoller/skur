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
import { firestoreService } from '../../services/firebaseConfig';


export default function createTools() {

    


    const [newTitle, setNewTitle] = useState("");
    const [newDescription, setNewDescription] = useState("");
    const [newPrice, setNewPrice] = useState("");
    const [toolCategory, setNewToolCategory] = useState("");

    /* Method for creating new tool in firebase */

    
    async function handleCreateTool(e) {

        e.preventDefault();

        try {
            const docRef = await addDoc(collection(firestoreService, "tools"), {
                toolName: newTitle,
                price: parseInt(newPrice),
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
            <form onSubmit={(event) => handleCreateTool(event)}>
            <Box alignItems="center">
                <VStack mt="50px" spacing="50px" mb="50px">
                    <Text fontSize="40px" mb="-20px"> Opprett en annonse</Text>
                    <Box>
                    <Text fontSize="large" textColor="black"> Tittel </Text>
                        <Input required id="titleID" placeholder='Skriv inn tittel...' value={newTitle} w="500px"  focusBorderColor='567189' onChange={(event) => setNewTitle(event.target.value)} />                
                    </Box>
                    <Box>
                        <FormLabel> Beskrivelse </FormLabel>
                        <Input required id="descriptionID" placeholder='Skriv inn en beskrivelse...' value={newDescription}  w="500px" h="200px" focusBorderColor='567189' onChange={(event) => setNewDescription(event.target.value)} />
                    </Box>
                    <Box>
                        <FormLabel> Pris </FormLabel>
                        <Input required type="number" id="priceID" placeholder='Skriv inn en pris...' value={newPrice} w="500px" focusBorderColor='#567189' onChange={(event) => setNewPrice(event.target.value)} />
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
                    <Button colorScheme='blue' type='submit'> Opprett annonse
                    </Button>
                </VStack>
            </Box>
            </form>
        </ChakraProvider>
    )
}


