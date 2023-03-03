import { Avatar, Box, Button, Container, Card, Divider, ButtonGroup, Stack, CardFooter, Text, CardHeader, CardBody, Flex, Heading, Slider, ChakraProvider, WrapItem, Wrap, VStack, SliderTrack,
    SliderFilledTrack,
    SliderThumb,
    SliderMark, Image } from "@chakra-ui/react";
import { React, useState } from "react";
import './user.css';
import {MdEmail} from 'react-icons/md';
import { Link } from "react-router-dom";

function User(){



    const [sliderValue, setSliderValue] = useState(50)
    
    const labelStyles = {
        mt: '2',
        ml: '-2.5',
        fontSize: 'sm',
    }

    return(
        <ChakraProvider>
            <Container  maxW="full" mt={0} centerContent overflow="hidden">
                <Flex>
                    <Box bg="blue.500"
                    color="white"
                    borderRadius="lg"
                    m={{ sm: 4, md: 16, lg: 10 }}
                    p={{ sm: 5, md: 5, lg: 16 }}>
                        <Wrap spacing={{ base: 20, sm: 3, md: 5, lg: 20 }}>
                            <WrapItem>
                                <VStack py={{ base: 5, sm: 5, md: 8, lg: 10 }}>
                                    <Avatar bg="blue.200" ></Avatar>
                                    <Heading size='md'>Navn</Heading>
                                    {/* <Text mt={{ sm: 3, md: 3, lg: 5 }} color="white"></Text> */}
                                    <Button
                                    size="md"
                                    height="48px"
                                    width="200px"
                                    variant="ghost"
                                    color="#DCE2FF"
                                    _hover={{ border: '2px solid #1C6FEB' }}
                                    leftIcon={<MdEmail color="#1970F1" size="20px" />}>
                                    email til bruker
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
            </Container>

                <Box id="userAddsAndHistory" maxW="full" mt={0} centerContent overflow="hidden" ml="10%">
                    {/* <Card key={id} maxW='xs' padding="5%">
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
                                <Button isDisabled={!signedIn} id="rentBtn" variant='solid' colorScheme='blue'>
                                    {buttonText}
                                </Button>
                                <Link isDisabled={!signedIn} href={"mailto:" + data.creatorEmail + "?subject=Angående din annonse på Skur: " + data.toolName} id="contactBtn" variant='ghost' colorScheme='blue'>
                                    Kontakt eier
                                </Link>
                            </ButtonGroup >
                        </CardFooter >
                    </Card >  */}
                
                </Box>
                
           
            
        </ChakraProvider>
    );

}
export default User;