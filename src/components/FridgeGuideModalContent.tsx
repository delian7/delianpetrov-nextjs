import uiLoop from "../images/fridgeguide/ui-loop.gif"
import adminUi from '../images/fridgeguide/admin.png'
import aiForGood from '../images/fridgeguide/ai-for-good.webp'
import { Box, Img } from '@chakra-ui/react';
import MacbookFrame from './MacbookFrame';

const FridgeGuideModalContent = () => {
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
              src={aiForGood.src}
              borderRadius='lg'
              alt="FridgeGuide at AI For Good Conference"
            />
          </Box>
          <Box
            className="row"
            display="flex"
            flexDirection={{ base: 'column', md: 'row' }} // Responsive flex direction
          >
            <Box
              className="column"
              flex={3}
              borderRight={{base: '0px', md: "1px solid #ccc"}}
            >
              <h2>Background</h2>
              <p>
                FridgeGuide Ai was born from a vision to revolutionize food interaction at home.
                Initially a consumer app, it integrated AI to track groceries, reduce waste,
                and generate personalized recipes. As it evolved, the technology aimed to help
                organizations like food pantries tackle inventory challenges.
              </p>

              <h2>Challenge</h2>
              <p>
                Food waste and inefficiency extend to organizations managing large inventories.
                Food banks face challenges in tracking donations and managing expiration dates,
                impacting their ability to serve communities effectively.
              </p>

              <h2>Solution</h2>
              <p>
                FridgeGuide Ai pivoted to a B2B solution for food pantries.
                It simplifies inventory management, tracks expiration dates,
                and creates meal plans using available resources.
                Features like donor logging and volunteer coordination streamline operations.
              </p>

              <h2>Success</h2>
              <p>
                Its user-friendly design and AI tools transform grocery management,
                contributing to global efforts aligned with the UN Sustainable Development Goals.
              </p>
              <MacbookFrame>
                <Box height={"100%"}>
                  <Img src={adminUi.src} />
                </Box>
              </MacbookFrame>
            </Box>
            <Box
              className="column"
              flex={2}
            >
              <h2>Tech Used</h2>
              <p>Ruby on Rails, React Native, Microsoft Azure, Eden Ai, ChatGPT Streaming, Firebase Push Notifications</p>
              <Box mt={4}>
                <Img
                  className="phone-frame"
                  alt="fridge guide ui loop"
                  src={uiLoop.src}
                />
              </Box>
            </Box>
          </Box>
        </div>
      </div>
    );
};

export default FridgeGuideModalContent;
