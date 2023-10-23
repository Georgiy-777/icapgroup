import { Box, Heading } from '@chakra-ui/react';
import React from 'react';

const HeadText = ({ title, color, textAlign}) => {
    return (
    <Heading color={color || '#0B0D0E'}  textAlign={textAlign ||'left'} fontSize={'28px'} fontWeight={'600'} lineHeight={'130%'}>{title}</Heading>
    );
};

export default HeadText;