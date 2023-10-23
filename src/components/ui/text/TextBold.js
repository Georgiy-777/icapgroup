import { Box } from '@chakra-ui/react';
import React from 'react';

const TextBold = ({color, fontSize, text}) => {
    return (
     <Box color={color || '#0B0D0E'} fontSize={fontSize || '14px'} fontWeight={500} lineHeight={'130%'}>{text}</Box>
    );
};

export default TextBold;