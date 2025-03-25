import React, {useEffect} from "react";
import { Formik } from "formik";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Select,
  Textarea,
  Spinner,
  VStack,
} from "@chakra-ui/react";
import * as Yup from 'yup';
import FullScreenSection from "./FullScreenSection";
import useSubmit from "../hooks/useSubmit";
import {useAlertContext} from "../context/alertContext";

const LandingSection = () => {
  const {isLoading, response, submit} = useSubmit();
  const { onOpen } = useAlertContext();

  useEffect(() => {
    if (response) {
      onOpen(response.type, response.message)
    }
  }, [onOpen, response])

  return (
    <FullScreenSection
      backgroundColor="#2A4365"
      isDarkBackground
      p={8}
      alignItems="flex-start"
      spacing={8}
      width="100%"
    >
      <Heading as="h1" id="contactme-section" >
        Contact me
      </Heading>
      <VStack width="100%">
        <Box py={6} width={{base: "400px", md: "750px"}} rounded="md" >
          <Formik
            initialValues={{ firstName: '', email: '', reason: '', message: '' }}
            onSubmit={(values, { resetForm }) => {
              submit('https://dhdmjop4ywcsbgyiwncrg4amdi0ksjqm.lambda-url.us-east-2.on.aws', values)
              resetForm()
            }}
            validationSchema={Yup.object({
              firstName: Yup.string().max(15, 'Must be 15 characters or less').required('Required'),
              email: Yup.string().email('Invalid email address').required('Required'),
              message: Yup.string().required('Required')
            })}
          >
            {formik => (
              <form onSubmit={formik.handleSubmit}>
                <VStack spacing={4}>
                  <FormControl isInvalid={formik.touched.firstName && !!formik.errors.firstName}>
                    <FormLabel htmlFor="firstName">Name</FormLabel>
                    <Input
                      id="firstName"
                      {...formik.getFieldProps('firstName')}
                    />
                    <FormErrorMessage>{formik.errors.firstName}</FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={formik.touched.email && !!formik.errors.email}>
                    <FormLabel htmlFor="email">Email Address</FormLabel>
                    <Input
                      id="email"
                      type="email"
                      {...formik.getFieldProps('email')}
                    />
                    <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
                  </FormControl>
                  <FormControl>
                    <FormLabel htmlFor="reason">Type of enquiry</FormLabel>
                    <Select
                      id="reason"
                      placeholder=" "
                      {...formik.getFieldProps('reason')}
                      >
                      <option value="recruitment">
                        Recruitment/hiring proposal
                      </option>
                      <option value="hireMe">Freelance project proposal</option>
                      <option value="other">Other</option>
                    </Select>
                  </FormControl>
                  <FormControl isInvalid={formik.touched.message && !!formik.errors.message}>
                    <FormLabel htmlFor="message">Your message</FormLabel>
                    <Textarea
                      id="comment"
                      height={250}
                      {...formik.getFieldProps('message')}
                    />
                    <FormErrorMessage>{formik.errors.message}</FormErrorMessage>
                  </FormControl>
                  <Button type="submit" isDisabled={isLoading} colorScheme="purple" width="full">
                    {isLoading ? <Spinner /> : 'Submit'}
                  </Button>
                </VStack>
              </form>
            )}
          </Formik>
        </Box>
      </VStack>
    </FullScreenSection>
  );
};

export default LandingSection;
