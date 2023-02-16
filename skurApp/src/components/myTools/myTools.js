import './MyTools.css';
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardBody, CardFooter, Image, Stack, Heading, Text, Divider, ButtonGroup, Button, Box, Input } from '@chakra-ui/react'
import { ChakraProvider } from '@chakra-ui/react'
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestoreService } from '../../services/firebaseConfig';
import { useAuthValue } from '../../services/AuthService';

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
                        Se reservasjoner
                    </Button>
                    <Button id="contactBtn" variant='ghost' colorScheme='blue'>
                        slett
                    </Button>
                </ButtonGroup>
            </CardFooter>
        </Card>
    )
}


const MyTools = ({ user }) => {

    const { currentUser } = useAuthValue()

    console.log('CURRENTUSER: ', currentUser);


    const [tools, setTools] = useState([]);

    const fetchData = async () => {

        const ref = collection(firestoreService, "tools")
        await getDocs(query(ref, where("creator", "==", currentUser.uid))).then((querySnapshot) => {
            const newData = querySnapshot.docs
                .map((doc) => ({ ...doc.data(), id: doc.id }));
            setTools(newData);
        })

        await getDocs



    }

    useEffect(() => {
        fetchData();
    }, [])

    if (user) {
        return (
            <ChakraProvider>
                <div className="MyTools">
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
        <ChakraProvider></ChakraProvider>
        return <h1>Ikke logget inn</h1>
    }
}
export default MyTools;