import { Box, Flex } from '@chakra-ui/react';
import React, { useState } from 'react';
import Table from '../Table/TableBody/Table';
import countriesData from "../Table/fakeData";

const Body = () => {
    const [countries] = useState([...countriesData]);

    return (
        <Flex bg={'#EFF2F6'} h='100vh' alignItems={'start'} justifyContent={'center'}
            px={{ base: '20px', sm: "40px", lg: '100px' }}
        >
            <Box
                w={'100%'}
                mt={'100px'}
            >
                <Table data={countries} rowsPerPage={3} />

            </Box>
        </Flex>
    );
};

export default Body;