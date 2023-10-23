import { Box } from '@chakra-ui/react';
import React from 'react';

const TextSemi = ({color, fontSize, text}) => {
    return (
        <Box color={color || '#393F47'} fontSize={fontSize || '14px'} fontWeight={600} lineHeight={'130%'}>{text}</Box>
    );
};

export default TextSemi;