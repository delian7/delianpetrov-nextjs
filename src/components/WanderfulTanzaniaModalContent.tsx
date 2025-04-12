import { Box, Img } from '@chakra-ui/react';
import MacbookFrame from './MacbookFrame';
import wildAtHeart from '../images/wanderfultanzania/wild-at-heart.png'
import paymentPlans from '../images/wanderfultanzania/payment-plans.png'
import snippets from '../images/wanderfultanzania/snippets.png'

const WanderfulTanzaniaModalContent = () => {
    return (
      <div className="modal">
        <div className="modal-content">
          <Box
            mb={4}
            boxShadow={"0 2px 4px rgba(0, 0, 0, 0.5)"}
            borderRadius='lg'
            display="flex"
            flexDirection={{ base: 'column', md: 'row' }}
            alignItems="center"
          >
            <Img
              src={wildAtHeart.src}
              borderRadius='lg'
              alt="Wanderful Tanzania Safari Experience"
            />
          </Box>
          <Box
            className="row"
            display="flex"
            flexDirection={{ base: 'column', md: 'row' }}
          >
            <Box
              className="column"
              flex={3}
              borderRight={{base: '0px', md: "1px solid #ccc"}}
            >
              <h2>Background</h2>
              <p>
                Wanderful Tanzania is a premium safari tour company that brings travelers into the wild heart of Tanzania.
                As their webmaster, I&apos;ve been responsible for maintaining and enhancing their digital presence,
                focusing on creating seamless booking experiences for their luxury safari packages.
              </p>

              <h2>Challenge</h2>
              <p>
                The company needed a flexible payment system that could handle both full payments and installment plans
                for their high-value safari packages. The system needed to automatically adjust payment options based on
                the safari&apos;s start date, ensuring proper booking flow and business rules compliance.
              </p>

              <h2>Solution</h2>
              <p>
                I developed and integrated a custom WordPress plugin that bridges WooCommerce with Stripe&apos;s payment API,
                enabling flexible payment plans. The solution includes dynamic business logic that automatically adjusts
                available payment options based on the safari&apos;s start date, ensuring proper booking windows and payment
                schedules.
              </p>

              <h2>Success</h2>
              <p>
                The implementation streamlined the booking process and increased payment plan adoption.
                The automated system reduced administrative overhead while maintaining the high-touch
                service that Wanderful Tanzania is known for, with a modern, efficient payment experience.
              </p>


              <Box mt={4}>
                <MacbookFrame>
                  <Box height={"100%"}>
                    <Img
                      src={paymentPlans.src}
                      alt="Wanderful Tanzania booking system"
                    />
                  </Box>
                </MacbookFrame>
              </Box>
            </Box>
            <Box
              className="column"
              flex={2}
            >
              <h2>Tech Used</h2>
              <p>WordPress, WooCommerce, PHP, Stripe API, Custom Plugin Development, JavaScript, MySQL</p>

              <h2>Live Site</h2>
              <p>
                Check out the live site at <a href="https://wanderfultanzania.com" target="_blank" rel="noopener noreferrer"><span className="underline text-blue-950">Wanderful Tanzania</span></a>
              </p>

              <Img
                src={snippets.src}
                alt="Wanderful Tanzania code snippets"
                borderRadius='lg'
                mt={4}
                boxShadow={"0 2px 4px rgba(0, 0, 0, 0.5)"}
                display="block"
                maxWidth="100%"
              />
            </Box>
          </Box>
        </div>
      </div>
    );
};

export default WanderfulTanzaniaModalContent;
