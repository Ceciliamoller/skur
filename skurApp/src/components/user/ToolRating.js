import React,  { useState, forwardRef } from "react";
import { AiOutlineStar } from 'react-icons/ai';
import {Box, Icon, IconButton, Stack, Text, useStatStyles } from '@chakra-ui/react'
import {doc, updateDoc} from "firebase/firestore";
import firebaseService, { firestoreService } from '../../services/firebaseConfig';
//import StarIcon from 'material-ui-icons/Star';
function getRatingAvg(ratings){
    let sum = 0;
    let count = 0;

  for (const user in ratings) {
    const value = ratings[user];
    sum += value;
    count++;
  }
  console.log(sum/count);
  return  Math.floor((sum / count)*10)/10;

}

async function handleToolRating(e,tool,uid) {
  const rating = e;
  tool.ratings[uid] = rating;
  const toolRef = doc(firestoreService, "tools", tool.id);
  let ratingAvg = getRatingAvg(tool.ratings);
  await updateDoc(toolRef, {
      ratings: tool.ratings,
      rating: ratingAvg,
  })
}

//Kode basert på: https://codesandbox.io/s/y8zfo?file=/src/Rating.js:898-907

var ratingValue=2;

const ToolRating = React.forwardRef(
  ({ size, icon, scale, fillColor, strokeColor, data, currentUser, doc }, ref) => {
    const [rating, setRating] = useState(0);
    const buttons = [];
    const [starColor,setStarColor] = useState("white");

    const onClick = idx => {
      if (!isNaN(idx)) {
          setRating(Math.round((idx) * 10) / 10);
          console.log({ratingValue})
      }
    };

    const RatingButton = ({ idx, fill, buttonColor }) => {
      return (

        <IconButton
        colorScheme={buttonColor}
        variant="ghost"
        size="lg"
        
        onClick={() => {
          onClick(idx);
          handleToolRating(idx,data,currentUser.uid);
        }}
        fill={fill}
        aria-label={`Rate ${idx}`} 
        icon={<AiOutlineStar size="35px" color={buttonColor} />}
        >
        </IconButton> 
      );
    };
    for (let i = 1; i <= scale; i++) {
      buttons.push(<RatingButton key={i} idx={i} buttonColor={i <= rating ? 'yellow' : 'gray'}/>);
  }
    return (
      <Stack spacing="-3" isInline mt={8} justify="center">
        <input name="rating" type="hidden" value={rating} ref={ref} />
        {buttons}
        <Box width={`${size * 1.5}px`} textAlign="center">
        </Box>
      </Stack>
    );
  }
);

ToolRating.displayName = "ToolRating";

export {ratingValue};
export default ToolRating;
