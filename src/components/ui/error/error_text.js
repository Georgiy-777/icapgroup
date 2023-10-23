import { Box, Flex, Text } from "@chakra-ui/react";
import Inform from "../../../assets/images/svg/information.svg"
const ErrorText = ({
  title,
  textAlign,
  padding,
  backgroundColor
}) => {
  return (

    <Flex
        padding={padding || '0px'}
        borderRadius={'8px'}
        backgroundColor={backgroundColor || 'transparent'}    
      alignItems={'start'}
      mt={'5px'}

    
    >
       <Box mr={'8px'}>
       <Inform />

       </Box>
      <Text
      display={'inline'}
        // ml={'8px'}
        textAlign={textAlign && textAlign}
        fontSize={"14px"}
        fontWeight={"400"}
        color={"#A31919"}
      >
        {title}
      </Text>
    </Flex>

  );
};

export default ErrorText;
