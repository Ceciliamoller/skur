import React from 'react'
import "./createAd.css"

export default function createAd() {
    return (
        <div id="ad">
            <h1>Opprett annonse</h1>
            <label id="tittel">Tittel</label><br/>
            <input type="text"></input><br/><br/>
            <label id="pris">Pris</label><br/>
            <input type="number"></input><label>kr</label><br/><br/>
            <label>Beskrivelse</label><br/>
            <input type="text" id="inputBeskrivelse"></input>

        </div>
    )
}
