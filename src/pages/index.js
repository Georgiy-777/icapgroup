import Body from '../components/common/Body';
import Header from '../components/common/Header';
import { Box, Button, Flex, Image } from '@chakra-ui/react';
import React, { useState } from 'react';
const index = () => {
    return (
        <Box pos={'relative'}>
            <Header />
            <Body />
        </Box>

    );
};

export default index;