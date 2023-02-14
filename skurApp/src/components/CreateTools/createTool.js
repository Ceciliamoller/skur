import React from 'react'
import "../../App.js"
import "./createTool.css"
import { Box, Text, VStack, Button, Select } from '@chakra-ui/react'
import { Input } from '@chakra-ui/react'
import { ChakraProvider } from '@chakra-ui/react'


export default function createTools() {

    return(
<ChakraProvider>
      <Box alignItems="center">
     


        <VStack mt="50px" spacing="50px" mb="50px">
            <Text fontSize="40px"  mb="-20px"> Opprett en annonse</Text>
            <Box>
                <Text  fontSize="large" textColor="black"> Tittel </Text>
                <Input id="titleID" placeholder='Skriv inn tittel...' w="500px" focusBorderColor='567189'/>
            </Box>
            <Box>
                <Text  fontSize="large" textColor="black" > Beskrivelse </Text>
                <Input id="descriptionID"  placeholder='Skriv inn en beskrivelse...' w="500px" h="200px" focusBorderColor='567189'/>
            </Box>
            <Box>
                <Text  fontSize="large" textColor="black" > Pris </Text>
                <Input id="priceID"  placeholder='Skriv inn en pris...' w="500px" focusBorderColor='#567189'/>
            </Box>
            <Box>
                <Text  fontSize="large" textColor="black" > Kategori </Text>
                <Select width="500px" placeholder="Velg kategori">
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
            </Box>
            <Button colorScheme='blue'> Opprett annonse
            </Button>
        </VStack>
        </Box>

</ChakraProvider>

    )
}


