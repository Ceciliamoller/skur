import './Home.css';
import React, { useState, useEffect } from 'react';
import {
    Card,
    CardBody,
    CardFooter,
    Image,
    Stack,
    Link,

    Heading, Text, Divider, ButtonGroup, Button, Box, Select, VStack
} from '@chakra-ui/react'
import { ChakraProvider } from '@chakra-ui/react'
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { firestoreService } from '../../services/firebaseConfig';
import { useAuthValue } from '../../services/AuthService';

async function handleRentTool(id){
    console.log(id);

    //TODO set available to false
    //TODO update snapshot 
}


function buildCard(data, id, signedIn) {

    var imageLink = ("");
    if (data.category === "Hammer") {
        imageLink = 'http://clipart-library.com/image_gallery2/Tool-PNG-Picture.png?fbclid=IwAR1JRSmtP6hK-Xjvz7tI4-tZkGrj1BZOb9GvAEk4j4nNhmRejubO2EFCLr0'
    }
    else if (data.category === "Skrutrekker") {
        imageLink = 'https://cdn.pixabay.com/photo/2012/04/13/21/06/screwdriver-33634__480.png'
    }
    else {
        imageLink = 'https://m.media-amazon.com/images/I/71ecpTA4rwL.jpg'
    }

    var buttonText = ("");
    if (data.type === "request") {
        buttonText = "Lei ut nå"
    }
    else {
        buttonText = "Lei nå"
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
                        <b>Kategori:</b> {data.category}
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
                <ButtonGroup spacing='2'>
                    <Button isDisabled={!signedIn} id="rentBtn" variant='solid' colorScheme='blue' onClick={() => handleRentTool(id)} >
                        {buttonText}
                    </Button>
                    <Link isDisabled={!signedIn} href={"mailto:" + data.creatorEmail + "?subject=Angående din annonse på Skur: " + data.toolName} id="contactBtn" variant='ghost' colorScheme='blue'>
                        Kontakt eier
                    </Link>
                </ButtonGroup >
            </CardFooter >
        </Card >
    )
}


const Home = () => {

    const { currentUser } = useAuthValue()

    const [tools, setTools] = useState([]);
    const [toolCategory, setToolCategory] = useState(null);
    const [sortBy, setSortBy] = useState();
    const [isSignedIn, setIsSignedIn] = useState(currentUser ? true : false);
    const [requestOrShare, setrequestOrShare] = useState("");





    useEffect(() => {

        if (currentUser) {
            setIsSignedIn(true)
        }

        let ref = collection(firestoreService, "tools")
        //real time update
        

        if (toolCategory) {
            ref = query(ref, where('category', '==', toolCategory))
        }



        const unsub = onSnapshot(ref, (snapshot) => {
            const newData = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            setTools(newData);
        })

        return unsub
    }, [toolCategory, isSignedIn])

    if (currentUser) {
        return (
            <ChakraProvider>
                <div className="homePage">
                    <Box id="categories">
                        <VStack mt="50px" spacing="20px">
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

                            {/*       <Select required width="200px" placeholder="Velg pris" value={priceCategory} onChange={(event) => setPriceCategory(event.target.value)}>
                                <option value="<100">
                                    Under 100 kr
                                </option>
                                <option value="asc">
                                    Stigende pris
                                </option>

                                <option value=">300">
                                    Over 300 kr
                                </option>
                            </Select>  
                            <Select required width="200px" placeholder="Leie/leie ut" value={requestOrShare} onChange={(event) => setrequestOrShare(event.target.value)}>
                                <option value="request">
                                    Leie
                                </option>
                                <option value="share">
                                    Leie ut
                                </option>
                            </Select>  */}
                        </VStack >

                    </Box >
                    <Box id="tools" mt="50px">
                        {
                            // FIXME: Does not fire when user signs out. Buttons is enabled when user signs out
                            // https://stackoverflow.com/questions/55030208/react-passing-state-value-as-parameter-to-method
                            tools?.map((data, id) => (
                                buildCard(data, id, isSignedIn)
                            ))
                        }
                    </Box>
                </div >
            </ChakraProvider >
        )
    }
}
export default Home;
