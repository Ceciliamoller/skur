import {
    Avatar, Box, Button, CardBody, Stack, HStack, Image, CardFooter, Text, Link, Divider, Flex, Heading, WrapItem, Wrap, VStack, Card,
    Center,
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
        rentedBy: null,
        sharedBy: null
    });
}

function openmaps(address) {
    let urlAddress = address.replace(/\s+/g, '+');
    let googleMapsUrl = "https://www.google.com/maps/dir/?api=1&destination=" + urlAddress;
    window.open(googleMapsUrl, '_blank');
}


function buildCard(data, id, currentUser, isMyUser, isRented, newRatingVisibility) {

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
            <Box mt="5%" display={newRatingVisibility} id="ratingBox" >
                <Text ml="5%" mb="-10%"> Legg igjen vurdering:</Text>
                <Rating
                    size={48}
                    icon="star"
                    scale={5}
                    fillColor="gold"
                    strokeColor="grey"
                />
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

                console.log(uid)
                await getDoc(doc(firestoreService, "users", uid)).then((snap) => {

                    const data = snap.data()
                    data.uid = snap.id

                    setUserData(data)
                })
                if (userData) {

                    let ref = collection(firestoreService, "tools")


                    if (currentUser.uid === uid) {
                        if (!myUser) {
                            setMyUser(true)
                        }
                        let ref2 = query(collection(firestoreService, "tools"), where('sharedBy', '==', uid), where('available', '==', false))
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


    }, [uid, currentUser, myUser])



    const labelStyles = {
        mt: '2',
        ml: '-2.5',
        fontSize: 'sm',
    }

    return (

        <div className="userPage">

            <Wrap>
                <WrapItem>

                    <VStack mt="50%" ml="30%" spacing={6}>
                        <Avatar size='xl' bg="blue.200" src={userData.photo}></Avatar>
                        <Heading size="md" > {userData.name} </Heading>
                        {!myUser ? <Link href={"mailto:" + userData.email} >
                            <Button
                                size="xl"
                                height="48px"
                                width="200px"
                                variant="ghost"
                                _hover={{ border: '2px solid #1C6FEB' }}
                                leftIcon={<MdEmail size="25px" />}
                            >
                                Email
                            </Button>
                        </Link> : <div></div>}
                        {myUser ? <Box mt="-100%" mb="-100%" ></Box> :
                            <Box ml="500px" display="true" id="ratingBox" >
                                <Text mb="-15%" > Legg igjen vurdering:</Text>
                                <Rating

                                    icon="star"
                                    scale={5}
                                    fillColor="gold"
                                    strokeColor="grey"
                                    userData={userData}
                                    currentUser={currentUser}
                                    doc={doc}
                                />
                            </Box>
                        }
                        {/* <Text mt={{ sm: 3, md: 3, lg: 5 }} color="white"></Text> */}

                    </VStack>


                </WrapItem>
            </Wrap>


            <Box>
                <Heading ml="10%" mb={30} mt={70} size='lg'>{myUser ? "Historikk" : "Annonser"}</Heading>
                {
                    (Object.keys(tools).length !== 0 || (myUser && Object.keys(rentedTools).length !== 0)) ? <Box maxW="full" centerContent overflow="hidden">
                        {myUser ? <div id="MyTools">
                            <div>
                                <h1 className='title'>Leid</h1>
                                <div >
                                    {
                                        tools?.map((data, id) => (
                                            buildCard(data, id, currentUser, myUser, true)
                                        ))
                                    }
                                </div>
                                <div>
                                    <h1 className='title'>Utleid</h1>
                                    <div >
                                        {
                                            rentedTools?.map((data, id) => (
                                                buildCard(data, id, currentUser, myUser, false, "none")
                                            ))
                                        }
                                    </div>
                                </div>
                            </div> : <div className="toolGrid3">
                                {
                                    tools?.map((data, id) => (
                                        buildCard(data, id, currentUser, myUser, null, "none")
                                    ))
                                }
                            </div>
                            <div>
                                <h1 className='title'>Utleid</h1>
                                <div >
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
        </div >


    );

}
export default User;