import React,  { useState, forwardRef } from "react";
import { AiOutlineStar } from 'react-icons/ai';
import {Box, Icon, IconButton, Stack, Text, useStatStyles } from '@chakra-ui/react'
//import StarIcon from 'material-ui-icons/Star';


//Kode basert på: https://codesandbox.io/s/y8zfo?file=/src/Rating.js:898-907

var ratingValue=2;

const Rating = React.forwardRef(
  ({ size, icon, scale, fillColor, strokeColor, ratingValue }, ref) => {
    const [rating, setRating] = useState(0);
    const buttons = [];
    const [starColor,setStarColor] = useState("white");

    const onClick = idx => {
      if (!isNaN(idx)) {
          setRating(idx);
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
          ratingValue=rating
          onClick(idx)
          
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
