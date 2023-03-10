import {
    Avatar, Box, Button, CardBody, Stack, HStack, Image, CardFooter, Text, Link, Divider, Flex, Heading, Slider, WrapItem, Wrap, VStack, SliderTrack, Card,
    SliderFilledTrack,
    SliderThumb,
    SliderMark,
    Center
} from "@chakra-ui/react";
import { React, useEffect, useState } from "react";
import './user.css';
import { MdEmail } from 'react-icons/md';
import { useParams } from "react-router-dom";
import { getDoc, doc, query, collection, where, onSnapshot, updateDoc, documentId, arrayUnion } from "firebase/firestore";
import { firestoreService } from '../../services/firebaseConfig';
import { useAuthValue } from "../../services/AuthService";

async function handleRentTool(id, address, uid) {
    const toolRef = doc(firestoreService, "tools", id);
    await updateDoc(toolRef, {
        available: false
    });
    await updateDoc(doc(firestoreService, 'users', uid), {
        history: arrayUnion(id)
    })
    openmaps(address)
}

function openmaps(address) {
    let urlAddress = address.replace(/\s+/g, '+');
    let googleMapsUrl = "https://www.google.com/maps/dir/?api=1&destination=" + urlAddress;
    window.open(googleMapsUrl, '_blank');
}


function buildCard(data, id, currentUser, isMyUser) {

    var toolRating = 0;

    //const creatorData = await getCreatorData(data.creator)



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
            <Link to={`/user/${data.creator}`}>
                <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                    <Avatar bg="blue.500" size="sm" src={data.creatorPic}></Avatar>
                    <Heading size="sm">{data.creatorName ? data.creatorName : "Anonym"}</Heading>
                </Flex>
            </Link>
            <Divider />
            <Box display="none" id="ratingBox" >
                <Text> Legg igjen rating:</Text>

                <Slider mt="20px" mb="20px" min={1} max={5} aria-label='slider-ex-1' defaultValue={3} onChange={
                    (val) => {
                        toolRating = val;
                    }}>
                    <SliderMark value={1} mt='1' ml='-2.5' fontSize='sm'>
                        1
                    </SliderMark>
                    <SliderMark value={2} mt='1' ml='-2.5' fontSize='sm'>
                        2
                    </SliderMark>
                    <SliderMark value={3} mt='1' ml='-2.5' fontSize='sm'>
                        3
                    </SliderMark>
                    <SliderMark value={4} mt='1' ml='-2.5' fontSize='sm'>
                        4
                    </SliderMark>
                    <SliderMark value={5} mt='1' ml='-2.5' fontSize='sm'>
                        5
                    </SliderMark>
                    <SliderTrack>
                        <SliderFilledTrack />
                    </SliderTrack>
                    <SliderThumb />
                </Slider>
            </Box>
            <CardFooter>
                <HStack spacing='10'>
                    {!isMyUser ? <Button id="rentBtn" variant='solid' colorScheme='blue' onClick={() => handleRentTool(data.id, data.address, currentUser.email, currentUser.uid)}>
                        {buttonText}
                    </Button> : null
                    }

                    <Link className='chakra-button' href={"mailto:" + data.creatorEmail + "?subject=Angående din annonse på Skur: " + data.toolName} id="contactBtn" variant='ghost' colorScheme='blue'>
                        <Button>Kontakt eier</Button>
                    </Link>

                    {/* <button value={5} onClick = {(e) => handleRating(e,id,"value")}>Rate her</button> */}
                </HStack >
            </CardFooter >
        </Card >
    )
}

function User() {

    const { currentUser } = useAuthValue()
    const { uid } = useParams();
    const [userData, setUserData] = useState([])
    const [myUser, setMyUser] = useState(false)
    const [tools, setTools] = useState([]);


    useEffect(() => {

        const fetchUserData = async () => {
            try {
                await getDoc(doc(firestoreService, "users", uid)).then((snap) => {

                    setUserData(snap.data())

                })
                if (userData) {


                    let ref = collection(firestoreService, "tools")

                    console.log({ userData });

                    if (currentUser.uid === uid) {
                        setMyUser(true)

                        ref = query(ref, where(documentId(), 'in', userData.history))
                    } else {

                        ref = query(ref, where('creator', '==', uid))
                    }
                    const unsub = onSnapshot(ref, (snapshot) => {
                        if (snapshot) {

                            const newData = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
                            setTools(newData);
                        }
                    })

                    return unsub
                }

            } catch (e) {
                console.log('ERROR ', e);

            }
        }

        fetchUserData();
        console.log('Hello ', userData);




    }, [uid, myUser, currentUser])



    const [sliderValue, setSliderValue] = useState(50)

    const labelStyles = {
        mt: '2',
        ml: '-2.5',
        fontSize: 'sm',
    }

    return (
        <>
            <Card maxW="full" mt={0} centerContent overflow="hidden">
                <Flex>
                    <Box
                        borderRadius="lg"
                        h={600}
                        ml={50}
                    >
                        <Wrap spacing={{ base: 20, sm: 3, md: 5, lg: 20 }}>
                            <WrapItem>
                                <VStack py={{ base: 5, sm: 5, md: 8, lg: 10 }} mt={30} >
                                    <HStack spacing="75px" mb={50}>
                                        <Avatar bg="blue.200" src={userData.photo}></Avatar>
                                        <Heading size='md'>{userData.name}</Heading>
                                    </HStack>

                                    {/* <Text mt={{ sm: 3, md: 3, lg: 5 }} color="white"></Text> */}
                                    <Button
                                        size="md"
                                        height="48px"
                                        width="200px"
                                        variant="ghost"
                                        _hover={{ border: '2px solid #1C6FEB' }}
                                        leftIcon={<MdEmail size="20px" />}>
                                        Email til bruker
                                    </Button>
                                </VStack>
                            </WrapItem>
                        </Wrap>
                        <Slider aria-label='slider-ex-6' onChange={(val) => setSliderValue(val)} min={1} max={5} colorScheme='green'>
                            <SliderMark
                                value={sliderValue}
                                textAlign='center'
                                color='white'
                                mt='-10'
                                ml='-5'
                                w='12'
                            >
                                {/* {sliderValue} HER LEGGER VI INN GJENNOMSNITT */}
                            </SliderMark>
                            <SliderTrack>
                                <SliderFilledTrack />
                            </SliderTrack>
                            <SliderThumb />
                        </Slider>
                    </Box>
                </Flex>
            </Card>
            <Heading>{myUser ? "Historikk" : `${userData.name} sine annonser`}</Heading>
            {Object.keys(tools).length !== 0 ? <Box id="userAdsAndHistory" maxW="full" mt={0} centerContent overflow="hidden" ml="10%">
                {
                    tools?.map((data, id) => (
                        buildCard(data, id, currentUser, myUser)
                    ))
                }

            </Box> : <Center><Heading size="md">Ingen verktøy å vise</Heading></Center>
            }
        </>


    );

}
export default User;