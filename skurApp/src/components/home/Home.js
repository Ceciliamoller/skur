import './Home.css';
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardBody, CardFooter, Image, Stack, Heading, Text, Divider, ButtonGroup, Button, Box, Input } from '@chakra-ui/react'
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
                    <Input id="searchBar" placeholder="Søk"></Input>

                    <div id="categories">
                        <p>Her kommer det kategori-velger senere</p>
                    </div>
                    <div id="tools">
                        {
                            tools?.map((data, id) => (
                                buildCard(data, id)
                            ))
                        }
                    </div>
                </div>
            </ChakraProvider>

        )
    }
    else {
        return <h1>Ikke logget inn</h1>
    }
}
export default Home;