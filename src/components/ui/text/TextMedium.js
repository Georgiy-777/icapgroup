import { Box, Text } from '@chakra-ui/react';
import React from 'react';

const TextMedium = ({color, fontSize, text}) => {
    return (
        <Text display={'inline'} color={color || '#393F47'} fontSize={fontSize || '14px'} fontWeight={500} lineHeight={'130%'}>{text}</Text>
    );
};

export default TextMedium;