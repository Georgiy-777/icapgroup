
import { useRouter } from "next/router";
import { useState } from "react";

import * as Yup from "yup";
import { Field, Formik, useFormik } from "formik";

import { Box, Button, Checkbox, Flex, Image, Link, Text } from "@chakra-ui/react";
// import Facebook from "../svg/facebook.svg";
// import Google from "../svg/google.svg";
import { useTranslateText } from "../../hooks/useTranslateText";

import ErrorText from "../ui/error/error_text";
// import { useLazyGetLastWorkspaceQuery } from "../../app/workspace/wokrspace.api";
// import { getUserLastWorkspace } from "../../app/workspace/workspace.selector";
// import { useSelector } from "react-redux";
// import { useAuthState } from "react-firebase-hooks/auth";
// import { auth } from "../../../firebase-config";
import CustomInput from "../ui/input";
import TextReg from "../ui/text/TextReg";
import TextSemi from "../ui/text/TextSemi";
import TextMedium from "../ui/text/TextMedium";




export default function SignIn() {

    const [passwordShown, setPasswordShown] = useState(false);
    const togglePasswordShown = () => {
        setPasswordShown(!passwordShown);
    };
    //   const { logIn, googleSignIn } = useActions();

    //   const [getLastWorkspace] = useLazyGetLastWorkspaceQuery()
    const router = useRouter();
    const { locale } = router;
    //   const lastWorkspace = useSelector(getUserLastWorkspace());

    //   const [user] = useAuthState(auth);
    //   const googleSignInHandler = () => {

    //     googleSignIn(
    //       {
    //         lg: locale
    //       }
    //     )

    //   }

    const basicSchemaValidation = Yup.object({
        email: Yup.string()
            .email("Введіть адресу електронної пошти у форматі name@example.com")
            .required("Введіть email, бо це обов'язкове поле!"),
        password: Yup.string()
            .required("Введіть пароль, бо це обов'язкове поле!")
            .min(8, 'Введіть пароль від 8 символів!'),
        isPrivacy: Yup.bool().oneOf([true], "Підтвердіть, що ознайомилися і погоджуетеся з з Політикою конфіденційності та Умовами використання"),
    });

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            isPrivacy: false,
        },
        onSubmit: async (values) => {
          const user = {
            email: values.email,
            password: values.password            

          };
          console.log(user)
          register(user).then((res) =>{res?.payload === 'done'&& router.push("/sign-in"), console.log(res?.payload === 'done')});
        },
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
                <Flex justifyContent={'center'}>
                    <Link href={'/sign-up'}>
                        <Flex cursor={router.pathname === '/sign-in' ? 'pointer' : 'unset'} alignItems={'center'} borderRadius={'4px'} padding={'0 12px'} h={'32px'} backgroundColor={router.pathname === '/sign-up' ? '#137F63' : 'white'}>
                            <TextSemi text={'Реєстрація'} color={router.pathname === '/sign-up' ? 'white' : '#393F47'} />
                        </Flex>
                    </Link>
                    <Link href={'/sign-in'}>
                        <Flex cursor={router.pathname === '/sign-up' ? 'pointer' : 'unset'} alignItems={'center'} borderRadius={'4px'} padding={'0 12px'} h={'32px'} backgroundColor={router.pathname === '/sign-in' ? '#137F63' : 'white'}>
                            <TextSemi text={'Вхід'} color={router.pathname === '/sign-in' ? 'white' : '#393F47'} />
                        </Flex>
                    </Link>

                </Flex>


                <form method="post" onSubmit={formik.handleSubmit}>

                    <Flex flexDir={'column'} gap={'24px'}>
                        <Box pos={'relative'}>
                            <CustomInput
                                title='Email'
                                type="email"
                                name="email"
                                placeholder={`Teraz@example.mail`}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.email}
                            />
                            {formik.errors["email"] && formik.touched["email"] && (
                                <ErrorText title={formik.errors["email"]} />
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
                            <Flex w={'100%'} justifyContent={'end'} alignItems={'end'} mt={'5px'}>
                                <Box cursor={'pointer'} onClick={() => { router.push('/recovery') }}>
                                    {/* <Link href="/recovery"> */}
                                    <TextReg text="Забули пароль?" color={'#137F63'} />
                                    {/* </Link> */}
                                </Box>

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
                            <TextSemi text='Увійти' fontSize={'16px'} color={'#fff'} />
                        </Button>
                    </Flex>

                </form>


                <Flex alignItems="center" textAlign="center">
                    <Box flex="1" borderBottom="1px solid #EFF2F6" marginRight=".25em" />
                    <TextReg text='або' color={'#7E7C83'} fontSize={'16px'} />
                    <Box flex="1" borderBottom="1px solid #EFF2F6" marginLeft=".25em" />

                </Flex>

                <Flex
                    w={'100%'}
                    justifyContent={'center'}
                    padding={'20px 32px'}
                    backgroundColor={'#EFF2F6'}
                    backgroundImage={'url("/images/google-color.png")'}
                    backgroundRepeat={'no-repeat'}
                    backgroundPosition={'top 16px left 25%'}
                    cursor={'pointer'}
                    borderRadius={'8px'}
                >
                    <TextSemi text={'Увійти через Google'} fontSize={'16px'} />

                </Flex>

                <Flex pos={'relative'} alignItems={'start'} justifyContent={'space-between'} >
                    <Checkbox
                        size="lg"
                        // colorScheme="brand"
                        id="isPrivacy"
                        name="isPrivacy"
                        onChange={(e) => {
                            formik.handleChange(e);
                            console.log(formik.values.isPrivacy);
                        }}
                        isChecked={formik.values.isPrivacy}
                    >
                    </Checkbox>



                    <Box ml={'8px'} mt={'-5px'}>
                        <Text color={'#0B0D0E'} fontSize={'16px'} display={'inline'} fontWeight={400} lineHeight={'130%'}>Погоджуюсь з <Link href="#" color={'#137F63'}>Політикою конфіденційності</Link> та <Link href="#" color={'#137F63'}>Правилами сервісу </Link> і приймаю їх умови.</Text>
                    </Box>


                </Flex>
                {formik?.errors["isPrivacy"] && formik?.touched["isPrivacy"] && (
                    <ErrorText
                        title={formik?.errors["isPrivacy"]}
                        padding={'8px 12px'}
                        backgroundColor={'rgba(163, 25, 25, 0.10)'}

                    />
                )}
            </Flex>
        </Flex>
    );
}
