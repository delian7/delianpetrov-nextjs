import {Box, Flex} from "@chakra-ui/react";

const Footer = () => {
  return (
    <Box backgroundColor="#18181b">
      <footer>
        <Flex
          margin="0 auto"
          px={12}
          color="white"
          justifyContent="center"
          alignItems="center"
          maxWidth="1024px"
          height={16}
        >
          <p>Made with ❤️ by Delian • © {new Date().getFullYear()}</p>
        </Flex>
      </footer>
    </Box>
  );
};
export default Footer;
