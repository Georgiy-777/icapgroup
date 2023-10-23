import { useRouter } from "next/router";
import { useState } from "react";


import * as Yup from "yup";
import { useFormik } from "formik";
import { Box, Button, Checkbox, Flex, Image, Link, Text } from "@chakra-ui/react";
import ErrorText from "../ui/error/error_text";
import TextSemi from "../ui/text/TextSemi";
import CustomInput from "../ui/input";
import TextReg from "../ui/text/TextReg";
// import translationRu from "/locales/ru";
// import translationEn from "/locales/en";
// import translationUa from "/locales/ua";
// import Eye from "../svg/eye.svg";
import { useActions } from "../../hooks/useActions";
// import ErrorText from "../ui/error_text";
// import { auth } from "../../../firebase-config";
// import { v4 as uuidv4 } from "uuid";
export default function SignUp() {
      const { register } = useActions();
    const [passwordShown, setPasswordShown] = useState(false);


    const router = useRouter();
    const { locale } = router;

    const togglePasswordShown = () => {
        setPasswordShown(!passwordShown);
    };

    const basicSchemaValidation = Yup.object({
        email: Yup.string()
            .email("Введіть адресу електронної пошти у форматі name@example.com")
            .required("Введіть email, бо це обов'язкове поле!"),
        password: Yup.string()
            .required("Введіть пароль, бо це обов'язкове поле!")
            .min(8, 'Введіть пароль від 8 символів!'),
        firstname: Yup.string()
            .required("Введіть прізвище, бо це обов'язкове поле!"),
        lastname: Yup.string()
            .required("Введіть ім'я, бо це обов'язкове поле!"),
        isPrivacy: Yup.bool().oneOf([true], "Підтвердіть що ознайомилися і погоджуетеся з з Політикою конфіденційності та Умовами використання"),
    });

    const formik = useFormik({
        initialValues: {
            email: "",
            firstname: "",
            lastname: "",
            password: "",
            isPrivacy: false,
        },
        onSubmit: async (values) => {
          const user = {
            email: values.email,
            password: values.password,
            firstName: values.firstname,
            lastName: values.lastname,
            agree_privacy: values?.isPrivacy,


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
                <Link href={'/sign-in'}>
                        <Flex cursor={router.pathname === '/sign-up' ? 'unset' : 'pointer'} alignItems={'center'} borderRadius={'4px'} padding={'0 12px'} h={'32px'} backgroundColor={router.pathname === '/sign-in' ? '#137F63' : 'white'}>
                            <TextSemi text={'Вхід'} color={router.pathname === '/sign-in' ? 'white' : '#393F47'} />
                        </Flex>
                    </Link>
                    <Link href={'/sign-up'}>
                        <Flex cursor={router.pathname === '/sign-in' ? 'pointer' : 'unset'} alignItems={'center'} borderRadius={'4px'} padding={'0 12px'} h={'32px'} backgroundColor={router.pathname === '/sign-up' ? '#137F63' : 'white'}>
                            <TextSemi text={'Реєстрація'} color={router.pathname === '/sign-up' ? 'white' : '#393F47'} />
                        </Flex>
                    </Link>


                </Flex>




                <form method="post" onSubmit={formik.handleSubmit}>
                    <Flex flexDir={'column'} gap={'24px'}>
                        <Flex justifyContent={'space-between'} flexDir={{ base: 'column', sm: "row" }} gap={'16px'}>
                            <Box pos={'relative'} >
                                <CustomInput
                                    title='Ім’я'
                                    type="text"
                                    name="lastname"
                                    placeholder={`Lisa`}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.lastname}
                                />
                                {formik?.errors["lastname"] && formik?.touched["lastname"] && (

                                    <ErrorText
                                        title={formik?.errors["lastname"]}
                                        // leftPosition={"5px"}
                                    />

                                )}
                            </Box>

                            <Box pos={'relative'} >

                                <CustomInput
                                    title='Прізвище'
                                    type="text"
                                    name="firstname"
                                    placeholder={`Alisa`}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.firstname}
                                />
                                {formik?.errors["firstname"] &&
                                    formik?.touched["firstname"] && (
                                        <ErrorText
                                            title={formik?.errors["firstname"]}                                            
                                        />
                                    )}
                            </Box>


                        </Flex>
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
                                <ErrorText title={formik.errors["email"]}/>
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
