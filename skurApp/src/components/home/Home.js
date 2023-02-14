import React from "react";
import { Card, CardHeader, CardBody, CardFooter, Image, Stack, Heading, Text, Divider, ButtonGroup, Button, Box, Input } from '@chakra-ui/react'
import { ChakraProvider } from '@chakra-ui/react'
import './Home.css';


const Home = ({ user }) => {

    if (user) {
        return (
            <ChakraProvider>
            <div className="homePage">
                <Input id="searchBar" placeholder="Søk"></Input>

                <div id="categories">
                    <p>Her kommer det kategori-velger senere</p>
                </div>
                <div id="tools">
                    <Card maxW='xs' padding="5%">
                        <CardBody>
                            <Image
                            src='http://clipart-library.com/image_gallery2/Tool-PNG-Picture.png?fbclid=IwAR1JRSmtP6hK-Xjvz7tI4-tZkGrj1BZOb9GvAEk4j4nNhmRejubO2EFCLr0'
                            />
                            <Stack mt='6' spacing='3'>
                            <Heading id="toolTitle" size='md'>Hammer</Heading>
                            <Text id="toolDescription">
                                En ikke-fungerende hammer
                            </Text>
                            <Text id="toolPrice" color='blue.600' fontSize='2xl'>
                                20,-
                            </Text>
                            </Stack>
                        </CardBody>
                        <Divider />
                        <CardFooter>
                            <ButtonGroup spacing='2'>
                            <Button id="rentBtn" variant='solid' colorScheme='blue'>
                                Lei nå
                            </Button>
                            <Button id="contactBtn" variant='ghost' colorScheme='blue'>
                                Kontakt eier
                            </Button>
                            </ButtonGroup>
                        </CardFooter>
                        </Card>  
                        <Card maxW='xs' padding="5%">
                        <CardBody>
                            <Image
                            src='http://clipart-library.com/image_gallery2/Tool-PNG-Picture.png?fbclid=IwAR1JRSmtP6hK-Xjvz7tI4-tZkGrj1BZOb9GvAEk4j4nNhmRejubO2EFCLr0'
                            />
                            <Stack mt='6' spacing='3'>
                            <Heading id="toolTitle" size='md'>Hammer</Heading>
                            <Text id="toolDescription">
                                En ikke-fungerende hammer
                            </Text>
                            <Text id="toolPrice" color='blue.600' fontSize='2xl'>
                                20,-
                            </Text>
                            </Stack>
                        </CardBody>
                        <Divider />
                        <CardFooter>
                            <ButtonGroup spacing='2'>
                            <Button id="rentBtn" variant='solid' colorScheme='blue'>
                                Lei nå
                            </Button>
                            <Button id="contactBtn" variant='ghost' colorScheme='blue'>
                                Kontakt eier
                            </Button>
                            </ButtonGroup>
                        </CardFooter>
                        </Card>  
                        <Card maxW='xs' padding="5%">
                        <CardBody>
                            <Image
                            src='http://clipart-library.com/image_gallery2/Tool-PNG-Picture.png?fbclid=IwAR1JRSmtP6hK-Xjvz7tI4-tZkGrj1BZOb9GvAEk4j4nNhmRejubO2EFCLr0'
                            />
                            <Stack mt='6' spacing='3'>
                            <Heading id="toolTitle" size='md'>Hammer</Heading>
                            <Text id="toolDescription">
                                En ikke-fungerende hammer
                            </Text>
                            <Text id="toolPrice" color='blue.600' fontSize='2xl'>
                                20,-
                            </Text>
                            </Stack>
                        </CardBody>
                        <Divider />
                        <CardFooter>
                            <ButtonGroup spacing='2'>
                            <Button id="rentBtn" variant='solid' colorScheme='blue'>
                                Lei nå
                            </Button>
                            <Button id="contactBtn" variant='ghost' colorScheme='blue'>
                                Kontakt eier
                            </Button>
                            </ButtonGroup>
                        </CardFooter>
                        </Card>  
                        <Card maxW='xs' padding="5%">
                        <CardBody>
                            <Image
                            src='http://clipart-library.com/image_gallery2/Tool-PNG-Picture.png?fbclid=IwAR1JRSmtP6hK-Xjvz7tI4-tZkGrj1BZOb9GvAEk4j4nNhmRejubO2EFCLr0'
                            />
                            <Stack mt='6' spacing='3'>
                            <Heading id="toolTitle" size='md'>Hammer</Heading>
                            <Text id="toolDescription">
                                En ikke-fungerende hammer
                            </Text>
                            <Text id="toolPrice" color='blue.600' fontSize='2xl'>
                                20,-
                            </Text>
                            </Stack>
                        </CardBody>
                        <Divider />
                        <CardFooter>
                            <ButtonGroup spacing='2'>
                            <Button id="rentBtn" variant='solid' colorScheme='blue'>
                                Lei nå
                            </Button>
                            <Button id="contactBtn" variant='ghost' colorScheme='blue'>
                                Kontakt eier
                            </Button>
                            </ButtonGroup>
                        </CardFooter>
                        </Card>                                 
                </div>
            </div>
            </ChakraProvider>

        )
    }
    else {
        return <h1>Ikke logget inn</h1>
    }
}
export default Home;