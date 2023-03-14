import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardBody, CardFooter, Image, Stack, Heading, Text, Divider, ButtonGroup, Button, Box, Input } from '@chakra-ui/react'
import { collection, deleteDoc, doc, onSnapshot, query, where } from "firebase/firestore";
import { firestoreService } from '../../services/firebaseConfig';
import './MyTools.css';
import { useAuthValue } from '../../services/AuthService';

async function deleteTool(id) {
    await deleteDoc(doc(firestoreService, "tools", id));
}

function buildCard(data, id, type) {

    var imageLink = ("");
    if (data.category === "Hammer") {
        imageLink = 'http://clipart-library.com/image_gallery2/Tool-PNG-Picture.png?fbclid=IwAR1JRSmtP6hK-Xjvz7tI4-tZkGrj1BZOb9GvAEk4j4nNhmRejubO2EFCLr0'
    }
    else if (data.category === "Skrutrekker") {
        imageLink = 'https://cdn.pixabay.com/photo/2012/04/13/21/06/screwdriver-33634__480.png'
    }
    else {
        imageLink = 'https://cdn-icons-png.flaticon.com/512/3417/3417080.png'
    }
    return (
        <Card key={id} maxW='xs' padding="5%">
            <CardBody>
                <Image
                    src={imageLink}
                />
                <Stack mt='6' spacing='3'>
                    <Heading id="toolTitle" size='md'>{data.toolName}</Heading>
                    <Text id="toolDescription">
                        Kategori: {data.category}
                    </Text>
                    <Text id="toolDescription">
                        {data.description}
                    </Text>
                    <Text id="toolPrice" color='blue.600' fontSize='2xl'>
                        {data.price} kr
                    </Text>
                </Stack>
            </CardBody>
            <Divider />
            <CardFooter>
                <ButtonGroup>
                    <Button id="rentBtn" variant='solid' colorScheme='blue'>
                        Se reservasjoner
                    </Button>

                    {type === "share" ? (
                        <Button id="contactBtn" variant='ghost' colorScheme='blue' onClick={() => deleteTool(data.id)}>
                            Slett
                        </Button>
                    ) : <Button id="contactBtn" variant='ghost' colorScheme='blue'>
                        Endre
                    </Button>}

                </ButtonGroup>
            </CardFooter>
        </Card >

    )
}


const MyTools = () => {

    const { currentUser } = useAuthValue()


    const [requestTool, setRequestTools] = useState([]);
    const [shareTool, setShareTools] = useState([]);

    const fetchData = async () => {

        const ref = collection(firestoreService, "tools")

        onSnapshot(query(ref, where("creator", "==", currentUser.uid), where("type", "==", "request")), (snapshot) => {
            const newData = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            setRequestTools(newData);
        })
        onSnapshot(query(ref, where("creator", "==", currentUser.uid), where("type", "==", "share")), (snapshot) => {
            const newData = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            setShareTools(newData);
        })
    }

    useEffect(() => {
        fetchData();
    }, [])

    if (currentUser) {
        return (
            <div id="MyTools">
                <div>
                    <h1 className='title'>Til utleie</h1>
                    <div id="toolsIown">
                        {
                            shareTool?.map((data, id) => (
                                buildCard(data, id, "share")
                            ))
                        }
                    </div>
                </div>
                <div>
                    <h1 className='title'>Ønskes leid</h1>
                    <div id="request">
                        {
                            requestTool?.map((data, id) => (
                                buildCard(data, id, "request")
                            ))
                        }

                    </div>
                </div>
            </div>

        )
    }
    else {
        return <h1>Ikke logget inn</h1>
    }
}
export default MyTools;
