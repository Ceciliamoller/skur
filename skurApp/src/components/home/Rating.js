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
  return sum / count;

}

async function handleToolRating(e,tool,uid) {
  console.log("rating: " + e);
  console.log("tool: " + tool);
  console.log("uid: " + uid)
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

const Rating = React.forwardRef(
  ({ size, icon, scale, fillColor, strokeColor, data, currentUser, doc }, ref) => {
    const [rating, setRating] = useState(0);
    const buttons = [];

    const onClick = idx => {
      if (!isNaN(idx)) {
          setRating(idx);
      }
    };

const [buttonColor, setButtonColor] = useState("teal");

    const RatingButton = ({ idx, fill, buttonColor }) => {
      return (

/*         <Box display='flex' mt='2' alignItems='center'>
        {Array(5)
          .fill('')
          .map((_, i) => (
            <StarIcon 
              size="35px"
              key={i}
              color={i < rating ? 'teal.500' : 'gray.300'}
            />
          ))}
      </Box> */

        <IconButton
        colorScheme={buttonColor}
        variant="ghost"
        size="lg"
        
        onClick={() => {
          onClick(idx);
          handleToolRating(rating,data,currentUser.uid);
        }}
        fill={fill}
        aria-label={`Rate ${idx}`} 
        icon={<AiOutlineStar size="35px"/>}
        >
        </IconButton> 
      );
    };

    for (let i = 1; i <= scale; i++) {
      buttons.push(<RatingButton key={i} idx={i} fill={i <= rating}/>);
  }

    return (
      <Stack spacing="-3" isInline mt={8} justify="center">
        <input name="rating" type="hidden" value={rating} ref={ref} />
        {buttons}
        <Box width={`${size * 1.5}px`} textAlign="center">
          <Text fontSize="sm" textTransform="uppercase">
            Rating
          </Text>
          <Text fontSize="2xl" fontWeight="semibold" lineHeight="1.2em">
            {rating}
          </Text>
        </Box>
      </Stack>
    );
  }
);

Rating.displayName = "Rating";

export default Rating;
