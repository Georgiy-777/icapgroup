import { Box, Heading, Text } from '@chakra-ui/react';
import React from 'react';

const ContentText = ({ text, color, textAlign}) => {
    return (
    <Text display={'inline'}  color={color || '#393F47'}  textAlign={textAlign ||'left'} fontSize={'16px'} fontWeight={'400'} lineHeight={'130%'}>{text}</Text>
    );
};

export default ContentText;