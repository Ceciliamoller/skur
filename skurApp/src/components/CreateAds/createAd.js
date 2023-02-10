import React from 'react'
import "../../App.js"
import "./createAd.css"
import { Box } from '@chakra-ui/react'


export default function createAd() {

    return(
        <Box bg='tomato' w='100%' p={4} color='white'>
        This is the Box
        </Box>
    )
}


/* <form>
            <fieldset>
                <legend>Opprett annonse</legend>
                    <div id="ad">
                        <label id="tittel">Tittel</label><br/>
                        <input type="text"></input><br/><br/>
                        <label id="pris">Pris</label><br/>
                        <input type="number"></input><label>kr</label><br/><br/>
                        <label>Beskrivelse</label><br/>
                        <input type="text" id="inputBeskrivelse"></input><br/><br/>
                        <button type="submit">Opprett annonse</button> 
                    </div>
            </fieldset>
        </form> */
