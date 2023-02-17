import './Home.css';
import React, { useState, useEffect } from 'react';
import { Card,
    CardHeader,
    CardBody,
    CardFooter,
    Image,
    Stack,
    Heading, Text, Divider, ButtonGroup, Button, Box, Input, Select, VStack} from '@chakra-ui/react'
import { ChakraProvider } from '@chakra-ui/react'
import { collection, onSnapshot } from "firebase/firestore";
import { firestoreService } from '../../services/firebaseConfig';

function buildCard(data, id) {
    return (
        <Card key={id} maxW='xs' padding="5%">
            <CardBody>
                <Image
                    src='http://clipart-library.com/image_gallery2/Tool-PNG-Picture.png?fbclid=IwAR1JRSmtP6hK-Xjvz7tI4-tZkGrj1BZOb9GvAEk4j4nNhmRejubO2EFCLr0'
                />
                <Stack mt='6' spacing='3'>
                    <Heading id="toolTitle" size='md'>{data.toolName}</Heading>
                    <Text id="toolDescription">
                        {data.toolDescription}
                    </Text>
                    <Text id="toolPrice" color='blue.600' fontSize='2xl'>
                        {data.price} kr
                    </Text>
                </Stack>
            </CardBody>
            <Divider />
            <CardFooter>
                <ButtonGroup spacing='2'>
                    <Button id="rentBtn" variant='solid' colorScheme='blue'>
                        Lei nå
                    </Button>
                    <Button id="contactBtn" variant='ghost' colorScheme='blue'>
                        Kontakt eier
                    </Button>
                </ButtonGroup>
            </CardFooter>
        </Card>
    )
}


const Home = ({ user }) => {

    var [tools, setTools] = useState([]);
    const [toolCategory, setToolCategory] = useState("");
    const [priceCategory, setPriceCategory] = useState("");

    useEffect(() => {
        const ref = collection(firestoreService, "tools")
        //real time update
        onSnapshot(ref, (snapshot) => {
            const newData = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            setTools(newData);
            console.log(tools, newData);
        })
    }, [])

    if (user) {
        return (
            <ChakraProvider>
                <div className="homePage">
                    <Box id="categories">
                        <VStack  mt="50px" spacing="20px"> 
                            <Text fontSize="xl"> Filtrer søk </Text>
                             <Select required width="200px" placeholder="Velg kategori" value={toolCategory} onChange={(event) => setToolCategory(event.target.value)}>
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
                            <Select required width="200px" placeholder="Velg pris" value={priceCategory} onChange={(event) => setPriceCategory(event.target.value)}>
                                <option value="<100">
                                    Under 100 kr
                                </option>
                                <option value="100-300">
                                    100-300 kr
                                </option>
                                <option value=">300">
                                    Over 300 kr
                                </option>
                            </Select>  
                        </VStack>
                      
                    </Box>
                    <Box id="tools" mt="50px">
                        {
                            tools?.map((data, id) => (
                                buildCard(data, id)
                            ))
                        }
                    </Box>
                </div>
            </ChakraProvider>

        )
    }
    else {
        <ChakraProvider></ChakraProvider>
        return <h1>Ikke logget inn</h1>
    }
}
export default Home;