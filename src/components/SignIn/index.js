
import { useRouter } from "next/router";
import { useState } from "react";

import * as Yup from "yup";
import { Field, Formik, useFormik } from "formik";

import { Box, Button, Checkbox, Flex, Image, Link, Text } from "@chakra-ui/react";


import ErrorText from "../ui/error/error_text";

import CustomInput from "../ui/input";
import TextReg from "../ui/text/TextReg";
import TextSemi from "../ui/text/TextSemi";
import { useSignInMutation } from "../../services/auth.services";
import TextBold from "../ui/text/TextBold";





export default function SignIn() {
    const [signIn] = useSignInMutation();

    const [passwordShown, setPasswordShown] = useState(false);
    const togglePasswordShown = () => {
        setPasswordShown(!passwordShown);
    };
    //   const { logIn, googleSignIn } = useActions();

    //   const [getLastWorkspace] = useLazyGetLastWorkspaceQuery()
    const router = useRouter();

    const basicSchemaValidation = Yup.object({
        username: Yup.string()
            .required("Введіть username, бо це обов'язкове поле!"),
        password: Yup.string()
            .required("Введіть пароль, бо це обов'язкове поле!")
            .min(8, 'Введіть пароль від 8 символів!'),
    });

    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",

        },
        onSubmit: async (values) => {

            const user = {
                username: values.username,
                password: values.password,
            };
            console.log(user);


            signIn({
                incomeData: user,
                action: () => router.push('/'),

            });

        },
        validationSchema: basicSchemaValidation,
    });

    return (
        <Flex minH={'100vh'} backgroundColor={'#EFF2F6'} w={'100%'} justifyContent={'center'} alignItems={'center'} >
            <Box h={'72px'} mb={'65px'}>

            </Box>

            <Flex w={'600px'} gap={'40px'} p={{ base: '40px 20px', sm: "40px 40px", lg: '40px 64px' }} borderRadius={'16px'} backgroundColor={'white'} flexDir={'column'}>

                <Flex justifyContent={'center'} alignItems={'center'}>
                    <Image mr={'23px'} src={'https://avatars.githubusercontent.com/u/7658037?s=200&v=4'} borderRadius={'50%'} w={'40px'} h={'40px'} />
                    <TextBold text={'SWTable'} fontSize={'23px'} />
                </Flex>


                <form method="post" onSubmit={formik.handleSubmit}>

                    <Flex flexDir={'column'} gap={'24px'}>
                        <Box pos={'relative'}>
                            <CustomInput
                                title='Username'
                                type="text"
                                name="username"
                                placeholder={`my_username`}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.email}
                            />
                            {formik.errors["username"] && formik.touched["username"] && (
                                <ErrorText title={formik.errors["username"]} />
                            )}
                        </Box>
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
                            {formik.errors["password"] && formik.touched["password"] && (
                                <ErrorText
                                    title={formik.errors["password"]}

                                />
                            )}

                        </Box>



                        <Button
                            type='submit'
                            disabled={!formik.isValid}
                            borderRadius={'8px'}
                            w={'100%'}
                            padding={'20px 32px'}
                            backgroundColor={!formik.isValid ? 'gray' : '#137F63'}
                            _hover={{
                                backgroundColor: !formik.isValid ? 'gray' : '#51c2a4'
                            }}
                            id={'log_in'}
                        >
                            <TextSemi text='Увійти' fontSize={'16px'} color={'#fff'} />
                        </Button>
                    </Flex>

                </form>



            </Flex>
        </Flex>
    );
}
