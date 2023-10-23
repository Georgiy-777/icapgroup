import React, { useState } from 'react';
import { useRouter } from "next/router";
import * as Yup from "yup";

// import { getRecoveryEmail } from "../app/auth/auth-selectors";
// import { useActions } from "../hooks/useActions";
import HeadText from "../components/ui/text/HeadText";
import ContentText from "../components/ui/text/ContentText";
import { Box, Button, Flex, Image } from "@chakra-ui/react";
import CustomInput from "../components/ui/input";
import TextSemi from "../components/ui/text/TextSemi";
import ErrorText from "../components/ui/error/error_text";
import { useFormik } from "formik";
import TextReg from '../components/ui/text/TextReg';
import Done from '../assets/images/svg/done.svg'
import X from '../assets/images/svg/x.svg'

const PassUpdate = () => {
    const [passwordShown, setPasswordShown] = useState(false);
    const [confirmPasswordShown, setConfirmPasswordShown] = useState(false);
  
    const togglePasswordShown = () => {
        setPasswordShown(!passwordShown);
      };
    
      const toggleConfirmPasswordShown = () => {
        setConfirmPasswordShown(!confirmPasswordShown);
      };

    const basicSchemaValidation = Yup.object({
        password: Yup.string()
            .required("Введіть пароль, бо це обов'язкове поле!")
            .min(8, 'Введіть пароль від 8 символів!'),
        passwordConfirm: Yup.string()
        .required("Введіть пароль, бо це обов'язкове поле!")
        .min(8, 'Введіть пароль від 8 символів!'),
        // .oneOf([yup.ref('password'), null], 'Пароли не совпадают')
        // /^[0-9]/
        // .matches(/[abcdefghijklmnopqrstuvwxyz]+/ , 'Is not in correct format')

    });

    const formik = useFormik({
        initialValues: {
            password: "",
            passwordConfirm: "",

        },
        // onSubmit: async (values) => {
        //   const user = {
        //     email: values.email,
        //     password: values.password,
        //     firstName: values.firstname,
        //     lastName: values.lastname,
        //     agree_privacy: values?.isPrivacy,
        //     lg: locale,   

        //   };
        //   console.log(user)
        //   register(user).then((res) =>{res?.payload === 'done'&& router.push("/sign-in"), console.log(res?.payload === 'done')});
        // },
        validationSchema: basicSchemaValidation,
    });
    return (
        <Flex minH={'100vh'} backgroundColor={'#EFF2F6'} w={'100%'} justifyContent={'center'} alignItems={'center'} >
            <Box h={'72px'} mb={'65px'}>

            </Box>

            <Flex w={'600px'} gap={'40px'} p={{ base: '40px 20px', sm: "40px 40px", lg: '40px 64px' }} borderRadius={'16px'} backgroundColor={'white'} flexDir={'column'}>
                <Flex justifyContent={'center'}>
                    <Image src={"/images/teraz-work-full-log.png"} alt="logotype" maxW={'216px'} />

                </Flex>
                <Flex justifyContent={'center'} flexDir={'column'} >

                    <HeadText title={'Новий пароль'} textAlign={'center'} />

                </Flex>
                <form method="post" onSubmit={formik.handleSubmit}>

                    <Flex flexDir={'column'} gap={'24px'}>

                        <Box pos={'relative'}>
                            <CustomInput
                                title='Пароль'
                                type={passwordShown ? "text" : "password"}
                                name="password"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder="***************"
                                value={formik.values.password}
                                togglePasswordShown={togglePasswordShown}
                            />
                            {formik?.errors["password"] && formik?.touched["password"] && (
                                <ErrorText
                                    title={formik?.errors["password"]}
                                          />
                            )}

                        </Box>
                        <Box pos={'relative'}>
                            <CustomInput
                                title='Повторіть пароль'
                                type={confirmPasswordShown ? "text" : "password"}
                                name="passwordConfirm"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder="***************"
                                value={formik.values.passwordConfirm}
                                togglePasswordShown={toggleConfirmPasswordShown}
                            />
                            {formik?.errors["passwordConfirm"] && formik?.touched["passwordConfirm"] && (
                                <ErrorText
                                    title={formik?.errors["passwordConfirm"]}
    
                                />
                            )}

                        </Box>
                        <Box>
                            <Flex alignItems={'center'}>
                                <Done/>
                                <Box ml={'8px'} ><TextReg text={'Великі і маленькі літери'}/></Box>
                            </Flex>
                            <Flex alignItems={'center'}>
                                <Done/>
                                <Box ml={'8px'} ><TextReg text={'Цифри 0-9'}/></Box>
                            </Flex>
                            <Flex alignItems={'center'}>
                                <Done/>
                                <Box ml={'8px'} ><TextReg text={'Спеціальні знаки (!№;%:?*)'}/></Box>
                            </Flex>
                            <Flex alignItems={'center'}>
                                <Done/>
                                <Box ml={'8px'} ><TextReg text={'Більше 8 символів'}/></Box>
                            </Flex>
                        </Box>
                        <Button
                            type="submit"
                            disabled={!formik.isValid}
                            borderRadius={'8px'}
                            w={'100%'}
                            padding={'20px 32px'}
                            backgroundColor={'#137F63'}
                        >
                            <TextSemi text='Зберегти' fontSize={'16px'} color={'#fff'} />
                        </Button>
                    </Flex>

                </form>



            </Flex>
        </Flex>
    );
};

export default PassUpdate