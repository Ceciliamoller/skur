import { Avatar, Box, Flex, Card, Image, Stack, CardBody, Heading, Text, CardFooter, Button, ChakraProvider } from "@chakra-ui/react";
import React from "react";

function User(){
    return(
        <ChakraProvider>
            <Flex flexDirection="column" justifyContent="center">
                
                
                <Box>
                    <Avatar bg="blue.500"></Avatar>
                    <Heading size='md'>Navn</Heading>

                    <Text py='2'>
                        Legg inn mail
                    </Text>

                    <Box>Her kommer rating</Box>

                </Box>
                <Box id="userAdds"> HISTORIKKK, ALLE TING DE HAR LEID
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
                    </Card > */}
                
                </Box>
                
            </Flex>
            
        </ChakraProvider>
    );

}
export default User;