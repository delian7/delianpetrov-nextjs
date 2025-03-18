import hero from '../images/visage/hero.png';
import visage from '../images/visage/visage-templates.png';
import visageColors from '../images/visage/visage-colors.png';

import { Box, Img } from '@chakra-ui/react';
import MacbookFrame from './MacbookFrame';

const VisageModalContent = () => {
    return (
      <div className="modal">
        <div className="modal-content">
          <Box
            mb={4}
            boxShadow={"0 2px 4px rgba(0, 0, 0, 0.5)"}
            borderRadius='lg'
            display="flex"
            flexDirection={{ base: 'column', md: 'row' }} // Responsive flex direction
            alignItems="center" // Center items vertically
          >
            <Img
              src={hero.src}
              borderRadius='lg'
              alt="Seastatus"
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
              <p>Visage Software is a web-based design platform that empowers users to create visual content and reports with ease. The platform is aimed at helping individuals and teams design high-quality, customized visual assets without requiring advanced design skills or software.</p>

              <h2>Challenges</h2>
              <p>One of the primary challenges was developing an intuitive, user-friendly interface that would cater to users with various levels of design experience. Additionally, ensuring that the platform could generate high-quality, responsive content that could be easily exported and integrated into reports was crucial. The project also had to scale efficiently to support growing user demand.</p>

              <h2>Solution</h2>
              <p>Built a web-based platform with drag-and-drop design functionality to allow users to create visuals and reports effortlessly.</p>
              <p>Developed customizable templates and asset libraries for users to quickly generate professional designs without starting from scratch.</p>
              <p>Implemented responsive design principles to ensure content rendered well across a variety of devices and screen sizes.</p>
              <p>Integrated export options for users to easily download designs in multiple formats (e.g., PNG, PDF) for seamless reporting.</p>
              <MacbookFrame>
                <Box height={"100%"}>
                  <Img src={visage.src} />
                </Box>
              </MacbookFrame>
            </Box>
            <Box
              className="column"
              flex={2}
            >
              <h2>Tech Used</h2>
              <p>Ruby on Rails, AWS S3, AWS Lambda, Knockout.js</p>
              <h2>Success</h2>
              <p>Visage Software provided a versatile, easy-to-use platform that enabled users to create professional-grade visual content and reports with minimal effort. The user-friendly interface, combined with responsive design and export features, made it an essential tool for teams looking to generate customized visuals at scale. The platform successfully met user needs, improving both design efficiency and overall user satisfaction.</p>
              <Box mt={5}>
                <Img boxShadow={"0 2px 4px rgba(0, 0, 0, 0.5)"}
            borderRadius='lg' src={visageColors.src} />
              </Box>
            </Box>
          </Box>
        </div>
      </div>
    );
};

export default VisageModalContent;