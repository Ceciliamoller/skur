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
import { getDoc, doc, query, collection, where, onSnapshot, updateDoc, arrayUnion } from "firebase/firestore";
import { firestoreService } from '../../services/firebaseConfig';
import { useAuthValue } from "../../services/AuthService";
import Rating from "./Rating";

async function handleRentTool(id, address, uid) {
    const toolRef = doc(firestoreService, "tools", id);
    await updateDoc(toolRef, {
        available: false,
        rentedBy: uid
    });
    await updateDoc(doc(firestoreService, 'users', uid), {
        history: arrayUnion(id)
    })
    openmaps(address)
}

async function handleDeliverTool(id) {
    const toolRef = doc(firestoreService, "tools", id);
    await updateDoc(toolRef, {
        available: true,
        rentedBy: null
    });
}

function openmaps(address) {
    let urlAddress = address.replace(/\s+/g, '+');
    let googleMapsUrl = "https://www.google.com/maps/dir/?api=1&destination=" + urlAddress;
    window.open(googleMapsUrl, '_blank');
}


function buildCard(data, id, currentUser, isMyUser, isRented) {

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
                <HStack>
                    {!isMyUser ? <Button variant='solid' colorScheme='blue' onClick={() => handleRentTool(data.id, data.address, currentUser.uid)}>
                        Lei nå
                    </Button> :

                        <div>
                            {
                                isRented ? <Button variant='solid' colorScheme='blue' onClick={() => handleDeliverTool(data.id)}>
                                    Returner
                                </Button> :
                                    null
                            }

                        </div>

                    }

                    <Link className='chakra-button' href={"mailto:" + data.creatorEmail + "?subject=Angående din annonse på Skur: " + data.toolName} id="contactBtn" variant='ghost' colorScheme='blue'>
                        <Button>Kontakt</Button>
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
    const [rentedTools, setRentedTools] = useState([]);


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

                        let ref2 = query(collection(firestoreService, "tools"), where('creator', '==', uid), where('available', '==', false))
                        ref = query(ref, where('rentedBy', '==', uid))

                        onSnapshot(ref2, (snapshot) => {
                            if (snapshot) {

                                const newData = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
                                setRentedTools(newData);
                            }
                        })


                    } else {

                        ref = query(ref, where('creator', '==', uid), where('available', '==', true))
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
            <Card maxW="full" mt={0} minH="100vh" centerContent overflow="hidden" h="100%">
                <Flex h="100%">
                    <Box
                        borderRadius="lg"
                        h="100%"
                        ml={50}

                    >
                        <Wrap spacing={{ base: 20, sm: 3, md: 5, lg: 20 }}>
                            <WrapItem>
                                <HStack spacing={400}>
                                    <VStack py={{ base: 13, sm: 5, md: 8, lg: 10 }} spacing={6}>
                                        <Avatar size='xl' bg="blue.200" src={userData.photo}></Avatar>
                                        <Box pr={150}></Box>
                                        <Box ml="500px" display="true" id="ratingBox" >
                                            <Text  mb="-25px"> Legg igjen vurdering:</Text>
                                                <Rating
                                                        size={48}
                                                        icon="star"
                                                        scale={5}
                                                        fillColor="gold"
                                                        strokeColor="grey"
                                                        userData ={userData}
                                                        currentUser ={currentUser}
                                                        doc={doc}
                                                    />
                                        </Box>
                                    </VStack>
                                    <VStack alignItems="center" py={{ base: 5, sm: 5, md: 8, lg: 10 }} spacing={6}>
                                        <Heading size='lg'> {userData.name}</Heading>
                                        {/* <Text mt={{ sm: 3, md: 3, lg: 5 }} color="white"></Text> */}
                                        <Link href={"mailto:" + userData.email} >
                                            <Button
                                                size="md"
                                                height="48px"
                                                width="200px"
                                                variant="ghost"
                                                _hover={{ border: '2px solid #1C6FEB' }}
                                                leftIcon={<MdEmail size="20px" />}
                                                >
                                                Email til bruker
                                            </Button>
                                        </Link>
                                    </VStack>
                                </HStack>
                            </WrapItem>
                        </Wrap>


                        <Heading mb={30} mt={70} size='lg'>{myUser ? "Historikk" : `${userData.name} sine annonser`}</Heading>
                        {(Object.keys(tools).length !== 0 || (myUser && Object.keys(rentedTools).length !== 0)) ? <Box maxW="full" centerContent overflow="hidden">
                            {myUser ? <div id="MyTools">
                                <div>
                                    <h1 className='title'>Leid</h1>
                                    <div className="toolGrid">
                                        {
                                            tools?.map((data, id) => (
                                                buildCard(data, id, currentUser, myUser, true)
                                            ))
                                        }
                                    </div>
                                </div>
                                <div>
                                    <h1 className='title'>Utleid</h1>
                                    <div className="toolGrid">
                                        {
                                            rentedTools?.map((data, id) => (
                                                buildCard(data, id, currentUser, myUser, false)
                                            ))
                                        }

                                    </div>
                                </div>
                            </div> : <div className="toolGrid3">
                                {
                                    tools?.map((data, id) => (
                                        buildCard(data, id, currentUser, myUser, null)
                                    ))
                                }
                            </div>



                            }


                        </Box> : <Center><Heading size="md">Ingen verktøy å vise</Heading></Center>
                        }

                    </Box>
                </Flex>
            </Card>
        </>


    );

}
export default User;