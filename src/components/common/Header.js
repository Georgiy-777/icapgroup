import { Box, Button, Flex, Image } from '@chakra-ui/react';
import React from 'react';
import TextSemi from '../ui/text/TextSemi';
import { useActions } from '@/hooks/useActions';
import TextBold from '../ui/text/TextBold';

const Header = () => {
    const { setIsLoggedIn } = useActions()
    return (
        <Box boxShadow={'4px 27px 46px -41px rgba(0,0,0,1)'} pos={'fixed'} top={'0'} w={'100%'} px={{ base: '20px', sm: "40px", lg: '100px' }} backgroundColor={'#fff'}  >
            <Flex justifyContent={'space-between'} py={'20px'} >

            <Flex justifyContent={'center'} alignItems={'center'}>
                    <Image mr={'23px'} src={'https://avatars.githubusercontent.com/u/7658037?s=200&v=4'} borderRadius={'50%'} w={'40px'} h={'40px'} />
                    <TextBold text={'SWTable'} fontSize={'23px'} />
                </Flex>


                <Button
                    padding={'20px 32px'}
                    backgroundColor={'#137F63'}
                    _hover={{
                        backgroundColor: '#51c2a4'
                    }}
                    onClick={() => {
                        setIsLoggedIn(false)
                    }}> <TextSemi text='Вийти' fontSize={'16px'} color={'#fff'} /></Button>
            </Flex>
        </Box>
    );
};

export default Header;