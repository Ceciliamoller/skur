import './Home.css';
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import ReactDOM from "react-dom";
import { ThemeProvider, CSSReset, Icon, Input } from '@chakra-ui/react'
import Rating from "./Rating";
import { AiOutlineStar } from 'react-icons/ai';
import { AiOutlineHeart } from 'react-icons/ai';
import { FiSave } from "react-icons/fi";

import {
    Card,
    CardBody,
    CardFooter,
    Flex,
    Image,
    Stack,
    Heading, Text, Divider, Button, Box, Select, VStack, Avatar,
    HStack,
    VisuallyHidden,
    IconButton,
    useDisclosure,
    useToast,
    Menu,
    MenuButton,
    MenuList,
    MenuGroup,
    MenuItem,
    color,

} from '@chakra-ui/react'
import { collection, onSnapshot, query, where, doc, updateDoc, increment, addDoc, arrayUnion } from "firebase/firestore";
import firebaseService, { firestoreService } from '../../services/firebaseConfig';
import { useAuthValue } from '../../services/AuthService';
import { CloseIcon } from '@chakra-ui/icons';


async function handleRentTool(id, address, uid) {
    const toolRef = doc(firestoreService, "tools", id);
    await updateDoc(toolRef, {
        available: false,
        rentedBy: uid
    });
    openmaps(address)
}

function openmaps(address) {
    let urlAddress = address.replace(/\s+/g, '+');
    let googleMapsUrl = "https://www.google.com/maps/dir/?api=1&destination=" + urlAddress;
    window.open(googleMapsUrl, '_blank');
}
function alertForRent(data, currentUser) {
    if (window.confirm("Du er i ferd med å leie dette verktøyet, hvis du er sikker på at du vil leie det og inngå en avtale med uteleier: velg Ok, hvis ikke avbryt.") == true) {
        handleRentTool(data.id, data.address, currentUser.uid);
    }
}

async function createNewList(name, uid, e, setNewListName) {
    e.stopPropagation()
    setNewListName("")
    let ref = collection(firestoreService, `users/${uid}/list`)

    await addDoc(ref, {
        listName: name
    });


}


async function uploadToList(uid, e, toolId, list, toast) {

    e.stopPropagation()
    let ref = doc(firestoreService, `users/${uid}/list`, list.id)


    await updateDoc(ref, {
        tools: arrayUnion(toolId)
    }).then(() => {
        toast({
            title: `Lagt til i liste: ${list.listName}`,
            status: 'success',
            duration: 4000,
            isClosable: true,
        })
    })


}
function buildCard(data, id, signedIn, currentUser, newListName, setNewListName, allLists, toast) {


    //const [ratingValue, setRatingValue] = useState(2);
    var toolRating = 0;
    var toolVisibility = "true";
    var ratingVisibility = "none";


    // eslint-disable-next-line react-hooks/rules-of-hooks
    //const [ratingVisibility, setRatingVisibility] =useState(true)
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

    var buttonText = ("");
    if (data.type === "request") {
        buttonText = "Tilby utleie"
    }
    else {
        buttonText = "Lei nå"
    }


    return (
        <Card key={id} maxW='xs' padding="5%">

            <CardBody>

                <HStack ml="-10px" spacing="190px">
                    <HStack>
                        <Icon
                            as={AiOutlineStar}
                            boxSize="25px"
                        ></Icon>
                        <Text> {data.rating} </Text>
                    </HStack>
                    <Menu>
                        <MenuButton as={Button} rightIcon={<AiOutlineHeart size="35px" />} colorScheme="white" color="blue.500" />
                        <MenuList>
                            <MenuGroup title='Dine lister'>
                                {
                                    allLists?.map((listData, id) => (
                                        <MenuItem key={id} onClick={(e) => uploadToList(currentUser.uid, e, data.id, listData, toast)}>
                                            {listData.listName}
                                        </MenuItem>
                                    ))
                                }
                            </MenuGroup>
                            <MenuGroup title='Lag en ny liste' closeOnSelect="false">
                                <MenuItem>
                                    <Input placeholder='Ny liste' value={newListName} onClick={e => e.stopPropagation()} onChange={(e) => setNewListName(e.target.value)} />
                                    <Button ml="4px" onClick={(e) => createNewList(newListName, currentUser.uid, e, setNewListName)}>Lag</Button>
                                </MenuItem>
                            </MenuGroup>
                        </MenuList>
                    </Menu>
                </HStack>
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
                    <Text id="toolAddress" color='blue.600' fontSize='ml'>
                        {data.address}
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
            <Box display={ratingVisibility} id="ratingBox" >
                <Text mt="20px"> Legg igjen rating:</Text>
                <Box mt="-20px">
                    <CSSReset />
                    <Rating
                        size={48}
                        icon="star"
                        scale={5}
                        fillColor="gold"
                        strokeColor="grey"
                        data={data}
                        currentUser={currentUser}
                        doc={doc}
                    />
                </Box>
            </Box>
            <CardFooter>
                <HStack spacing='10'>
                    <Button isDisabled={!signedIn} id="rentBtn" variant='solid' colorScheme='blue' onClick={() => alertForRent(data, currentUser)}>
                        {buttonText}
                    </Button>
                    <Link className='chakra-button' isDisabled={!signedIn} href={"mailto:" + data.creatorEmail + "?subject=Angående din annonse på Skur: " + data.toolName} id="contactBtn" variant='ghost' colorScheme='blue'>
                        <Button>Kontakt</Button>
                    </Link>
                </HStack >
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
    const [typeOfAd, setTypeOfAd] = useState(null);
    const [newListName, setNewListName] = useState("");
    const [allLists, setAllLists] = useState(null);

    const toast = useToast();





    useEffect(() => {
        let ref = query(collection(firestoreService, "tools"), where('available', '==', true))

        if (currentUser) {
            setIsSignedIn(true)
            ref = query(ref, where('creator', '!=', currentUser.uid))
            let listRef = collection(firestoreService, `users/${currentUser.uid}/list`)


            onSnapshot(listRef, (snapshot) => {
                const newData = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
                setAllLists(newData);
            })
        }
        //real time update


        if (typeOfAd) {
            ref = query(ref, where('type', '==', typeOfAd))
        }

        if (toolCategory) {
            ref = query(ref, where('category', '==', toolCategory))
        }




        const unsub = onSnapshot(ref, (snapshot) => {
            const newData = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            setTools(newData);
        })






        return unsub
    }, [toolCategory, isSignedIn, typeOfAd, currentUser])

    if (currentUser) {
        return (
            <div className="homePage">
                <Box id="categories">
                    <VStack mt="50px" spacing="20px">
                        <Text fontSize="xl"> Type annonse </Text>
                        <Select width="200px" placeholder="Alle" value={typeOfAd} onChange={(event) => setTypeOfAd(event.target.value)}>
                            <option value="share">
                                Til utleie
                            </option>
                            <option value="request">
                                Ønsker å leie
                            </option>
                        </Select>

                        <Text fontSize="xl"> Filtrer søk </Text>
                        <Select width="200px" placeholder="Alle" value={toolCategory} onChange={(event) => setToolCategory(event.target.value)}>
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
                    </VStack >

                </Box >
                <Box id="tools" mt="50px">
                    {
                        tools?.map((data, id) => (
                            buildCard(data, id, isSignedIn, currentUser, newListName, setNewListName, allLists, toast)
                        ))
                    }
                </Box>
            </div >
        )
    }

}

export default Home;