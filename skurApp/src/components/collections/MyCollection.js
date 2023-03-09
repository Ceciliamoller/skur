import React from "react";

import {Box, Stack, Select, Heading} from '@chakra-ui/react';
import { TriangleDownIcon } from '@chakra-ui/icons';
import "./MyCollection.css";



function MyCollection(){
    return(
        <Box className="collectionPage">
            <Heading mb="2%">Mine samlinger</Heading>
            <Stack spacing={3} id="chooseCollection">
                <Select icon={<TriangleDownIcon/>} placeholder='Alle' size='lg'>
                    <option>Samling #</option>
                </Select>
            </Stack>
            <Box className="myCollections">
                {/* Her legger vi inn card-elementene som er annonsene som har blitt lagret */}
                
            </Box>
                
        </Box>
        
    )

}
export default MyCollection;