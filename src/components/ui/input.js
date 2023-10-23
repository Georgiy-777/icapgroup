import { Box, Button, Input } from '@chakra-ui/react';
import React, { useState } from 'react';
import Eye from "../../assets/images/svg/eye_auth.svg";
import TextMedium from './text/TextMedium';
const CustomInput = ({title, type, name, placeholder, onChange, onBlur, value, togglePasswordShown }) => {

    return (
        <>
            <TextMedium text={title}  color={'#0B0D0E'}></TextMedium>
            <Input
                p={'12px 16px'}
                w={'100%'}
                border={'1px solid #B8BFC6'}
                type={type}
                name={name}
                placeholder={placeholder}
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                // pos={'relative'}
            />
            {(name === 'password' || name === 'passwordConfirm' ) &&
                <Box
                pos={'absolute'}
                right={'5%'}
                cursor={'pointer'}
                top={'35%'}
                onClick={togglePasswordShown}
                    
                >
                    <Eye />
                </Box>
            }
        </>
    );
};

export default CustomInput;