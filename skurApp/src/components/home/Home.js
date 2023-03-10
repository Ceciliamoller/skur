import './Home.css';
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import {AiOutlineStar} from "react-icons/ai";

import {
    Card,
    CardBody,
    CardFooter,
    Flex,
    Image,
    Stack,
    Heading, Text, Divider, Button, Box, Select, VStack, Avatar,
    Slider,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb,
    SliderMark,
    HStack,
    VisuallyHidden,
    IconButton,

} from '@chakra-ui/react'
import { collection, onSnapshot, query, where, doc, updateDoc, getDoc, increment } from "firebase/firestore";
import firebaseService, { firestoreService } from '../../services/firebaseConfig';
import { useAuthValue } from '../../services/AuthService';

async function getRatingAvg(ratings){
    let cumulativeRating = 0;
    for (let i = 0; i < ratings.length; i++){
        cumulativeRating += ratings[i][1];
    }
    return cumulativeRating/ratings.length;
}

async function handleToolRating(e,tool,currentUser) {
    //get the rating from event e
    const rating = e.target.value;
    //get the tool reference
    const toolRef = doc(firestoreService, "tools", id);
    
    //add the rating to the list as a tuple (userID, rating) or change if user has already rated
    let find=1;
    for (let i=0; i<tool.ratings.length; i++){
        if (tool.ratings[i][0] === currentUser.id){
            tool.ratings[i][1] = rating;
            find=0;
            break;    
        }
    }
    if (find){
        tool.ratings.push([currentUser.id, rating]);
    }
    //update the tool rating using getRatingAvg(tool.ratings)
    await updateDoc(ref, {
        rating: getRatingAvg(tool.ratings),
    })
}

async function handleUserRating(e, id) {

    const ref = doc(firebaseService, "users", id)
    await updateDoc(ref, {
        ratingCount: increment(1),
        totalRating: increment(e.target.value),
    })
}

async function handleRentTool(id, address) {
    const toolRef = doc(firestoreService, "tools", id);
    await updateDoc(toolRef, {
        available: false
    });
    openmaps(address)
}

function openmaps(address) {
    let urlAddress = address.replace(/\s+/g, '+');
    let googleMapsUrl = "https://www.google.com/maps/dir/?api=1&destination=" + urlAddress;
    window.open(googleMapsUrl, '_blank');
}


function buildCard(data, id, signedIn) {

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
            <IconButton ml="85%" colorScheme='white' color="blue.500" icon={<AiOutlineStar size="35px"/> } />
            {/* En pop-up hvor man legger til annonsen i en liste man har laget tidligere eller lage en ny en
            Muligens legge til slik at hvis brukeren har lagret annonsen så vil stjernen fylles inn: AiFillStar*/}
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
            <Link to="/brukersiden">
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
                    <Button isDisabled={!signedIn} id="rentBtn" variant='solid' colorScheme='blue' onClick={() => handleRentTool(data.id, data.address)}>
                        {buttonText}
                    </Button>

                    <Link className='chakra-button' isDisabled={!signedIn} href={"mailto:" + data.creatorEmail + "?subject=Angående din annonse på Skur: " + data.toolName} id="contactBtn" variant='ghost' colorScheme='blue'>
                        <Button>Kontakt eier</Button>
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




    useEffect(() => {
        let ref = query(collection(firestoreService, "tools"), where('available', '==', true))

        if (currentUser) {
            setIsSignedIn(true)
            ref = query(ref, where('creatorEmail', '!=', currentUser.email))

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
        )
    }

}
export default Home;