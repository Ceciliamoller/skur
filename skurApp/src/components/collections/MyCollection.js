import React, { useState, useEffect } from 'react';

import { Box, VStack, Text, Select, Heading, Card, CardBody, Image, Stack, Link, Flex, Avatar, Divider, SliderMark, Slider, Button, HStack, CardFooter, SliderTrack, SliderThumb, SliderFilledTrack } from '@chakra-ui/react';
import { TriangleDownIcon } from '@chakra-ui/icons';
import "./MyCollection.css";
import { firestoreService } from '../../services/firebaseConfig';
import { collection, onSnapshot, query, where, doc, updateDoc, increment, arrayUnion, documentId } from "firebase/firestore";
import { useAuthValue } from '../../services/AuthService';


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

function buildCard(data, id) {

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


                    <Link className='chakra-button' href={"mailto:" + data.creatorEmail + "?subject=Angående din annonse på Skur: " + data.toolName} id="contactBtn" variant='ghost' colorScheme='blue'>
                        <Button>Kontakt</Button>
                    </Link>

                    {/* <button value={5} onClick = {(e) => handleRating(e,id,"value")}>Rate her</button> */}
                </HStack >
            </CardFooter >
        </Card >
    )
}

function MyCollection() {

    const { currentUser } = useAuthValue()
    const [tools, setTools] = useState([]);
    const [allLists, setAllLists] = useState([]);
    const [isEmpty, setisEmpty] = useState(false);
    const [typeOfCollection, setTypeOfCollection] = useState("");


    useEffect(() => {

        if (currentUser) {

            let ref = collection(firestoreService, `users/${currentUser.uid}/list`)
            let toolRef = collection(firestoreService, 'tools/')

            if (typeOfCollection !== "") {

                let selectedTool = allLists.find((element) => element.id === typeOfCollection)

                console.log(selectedTool.listName);


                if (!selectedTool.tools) {
                    setisEmpty(true)
                }


                if (selectedTool && selectedTool.tools != null) {
                    setisEmpty(false)
                    toolRef = query(toolRef, where(documentId(), "in", selectedTool.tools))
                }




                onSnapshot(toolRef, (snapshot) => {
                    const newData = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
                    setTools(newData);

                })

                console.log({ isEmpty });


            }
            const unsub = onSnapshot(ref, (snapshot) => {

                const newData = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
                setAllLists(newData);

            })
            return (unsub)

        }



    }, [typeOfCollection, currentUser])



    return (
        <Box className="collectionPage">
            <Heading mb="2%">Mine samlinger</Heading>
            <Box id="categories">
                <VStack mt="50px" spacing="20px">
                    <Text fontSize="xl"> Type annonse </Text>
                    <Select width="200px" placeholder="Velg en liste" value={typeOfCollection} onChange={(event) => setTypeOfCollection(event.target.value)}>
                        {
                            allLists?.map((data, id) => (
                                <option key={id} value={data.id}>
                                    {data.listName}
                                </option>
                            ))
                        }
                    </Select>
                </VStack >

            </Box >
            <Box className="myCollections">
                {


                    typeOfCollection === "" ? <Text>Velg en liste</Text> :

                        isEmpty ? <Text>Ingen verktøy lagt inn i {allLists.find((e) => e.id === typeOfCollection).listName}</Text> :
                            tools?.map((data, id) => (
                                buildCard(data, id)
                            ))
                }

            </Box>

        </Box>

    )

}
export default MyCollection;