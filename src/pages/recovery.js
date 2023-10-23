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

export default function Recovery() {

  const router = useRouter();
  const { locale } = router;

 
  const handleSubmit = () => {
    recoveryPassword(recoveryEmail);
  };
  const basicSchemaValidation = Yup.object({
    email: Yup.string()
        .email("Введіть адресу електронної пошти у форматі name@example.com")
        .required("Введіть email, бо це обов'язкове поле!"),
  
});


const formik = useFormik({
    initialValues: {
        email: "",

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

        <Flex w={'600px'} gap={'40px'} p={{base:'40px 20px',sm:"40px 40px" ,lg:'40px 64px'}} borderRadius={'16px'} backgroundColor={'white'} flexDir={'column'}>
            <Flex justifyContent={'center'}>
                <Image src={"/images/teraz-work-full-log.png"} alt="logotype" maxW={'216px'} />

            </Flex>
            <Flex justifyContent={'center'} flexDir={'column'} gap={'12px'}>
                
                <HeadText title={'Відновлення пароля'} textAlign={'center'}/>
                <ContentText text={'Напишіть свій email, і ми надішлемо вам посилання для скидання пароля'} textAlign={'center'}/>


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
                            <ErrorText title={formik.errors["email"]}  />
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
                        <TextSemi text='Відправити' fontSize={'16px'} color={'#fff'} />
                    </Button>
                </Flex>
         
            </form>



        </Flex>
    </Flex>
);
}
