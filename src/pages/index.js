import Table from '@/components/Table/TableBody/Table';
import Body from '@/components/common/Body';
import Header from '@/components/common/Header';
import TextSemi from '@/components/ui/text/TextSemi';
import { useActions } from '@/hooks/useActions';
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