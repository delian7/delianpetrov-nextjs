import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAlertContext } from '../context/alertContext';
import { Box } from '@chakra-ui/react';

const RedirectPage = () => {
  const router = useRouter();
  const { name } = router.query; // Access the dynamic "name" parameter from the URL
  const { onOpen } = useAlertContext();

  useEffect(() => {
    const fetchAndRedirect = async () => {
      if (!name) return;

      try {
        const response = await fetch(
          `https://qpqyy5wg42qcon34ph6mhljct40wtmpl.lambda-url.us-east-2.on.aws/?name=${name}`
        );

        if (response.ok) {
          const data = await response.json();

          if (data.url) {
            router.push(data.url);
            onOpen('error', 'The short link was not found');
          } else {
            router.push('/'); // Redirect to homepage if URL is not found
            onOpen('error', 'The short link was not found');
          }
        } else {
          router.push('/'); // Handle error and redirect to homepage
          onOpen('error', 'The short link was not found');
        }
      } catch (error) {
        console.error('Error fetching URL:', error);
        router.push('/');
      }
    };

    fetchAndRedirect();
  }, [name, onOpen, router]); // Re-run effect when "name" changes

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      background={'lavender'}
    >
      <div className="flex justify-center items-center h-screen">
        <div className="border-t-4 border-blue-500 border-solid w-16 h-16 rounded-full animate-spin"></div>
      </div>
    </Box>
  );
};

export default RedirectPage;
