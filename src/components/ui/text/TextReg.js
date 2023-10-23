import { Box, Text } from '@chakra-ui/react';
import React from 'react';

const TextReg = ({color, fontSize, text}) => {
    return (
        
        <Text display={'inline'} color={color || '#393F47'} fontSize={fontSize || '14px'} fontWeight={400} lineHeight={'130%'}>{text}</Text>
    );
};

export default TextReg;