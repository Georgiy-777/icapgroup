
import ContentText from "../components/ui/text/ContentText";
import HeadText from "../components/ui/text/HeadText";
import { Box, Flex, Image } from "@chakra-ui/react";
import { useRouter } from "next/router";


// import { getRecoveryEmail } from "../app/auth/auth-selectors";
// import { useActions } from "../hooks/useActions";

export default function Check() {

  const router = useRouter();
  const { locale } = router;

 
  const handleSubmit = () => {
    recoveryPassword(recoveryEmail);
  };



  return (
    <Flex minH={'100vh'} backgroundColor={'#EFF2F6'} w={'100%'} justifyContent={'center'} alignItems={'center'} >
        <Box h={'72px'} mb={'65px'}>

        </Box>

        <Flex w={'600px'} gap={'40px'} p={{base:'40px 20px',sm:"40px 40px" ,lg:'40px 64px'}} borderRadius={'16px'} backgroundColor={'white'} flexDir={'column'}>
            <Flex justifyContent={'center'}>
                <Image src={"/images/teraz-work-full-log.png"} alt="logotype" maxW={'216px'} />

            </Flex>
            <Flex justifyContent={'center'} flexDir={'column'} gap={'12px'}>
                
                <HeadText title={'Відновлення пароля'} textAlign={'center'}/>
                <ContentText text={'Напишіть свій email, і ми надішлемо вам посилання для скидання пароля'} textAlign={'center'}/>

            </Flex>
            <Flex justifyContent={'center'} flexDir={'column'} >
 
                <ContentText text={'Ви можете надіслати посилання знову через 30 секунд'} color={'#137F63'} textAlign={'center'}/>

            </Flex>
        </Flex>
    </Flex>
);
}
