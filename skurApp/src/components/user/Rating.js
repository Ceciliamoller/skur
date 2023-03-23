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

async function handleUserRating(e,user,uid) {
  const rating = e;
  user.ratings[uid] = rating;
  const userRef = doc(firestoreService, "users", user.uid);
  let ratingAvg = getRatingAvg(user.ratings);
  await updateDoc(userRef, {
      ratings: user.ratings,
      userRating: ratingAvg
  })
}

//Kode basert på: https://codesandbox.io/s/y8zfo?file=/src/Rating.js:898-907

var ratingValue=2;

const Rating = React.forwardRef(
  ({ size, icon, scale, fillColor, strokeColor, userData, currentUser, doc }, ref) => {
    const [rating, setRating] = useState(0);
    const buttons = [];
    const [starColor,setStarColor] = useState("white");

    const onClick = idx => {
      if (!isNaN(idx)) {
          setRating(idx);
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
          handleUserRating(idx,userData,currentUser.uid);
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

Rating.displayName = "Rating";

export {ratingValue};
export default Rating;
