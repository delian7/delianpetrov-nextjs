import PhoneFrame from './PhoneFrame';
import hero from '../images/seastatus/hero.png';
import sofar from '../images/seastatus/sofar-product.png'
import { Box, Img } from '@chakra-ui/react';
import MacbookFrame from './MacbookFrame';

const SeastatusModalContent = () => {

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
              <p>
                We developed a Ruby on Rails application delivering personalized marine weather data for SeaStatus, taking it from concept to MVP in just two months. The platform aggregates weather data from APIs like NOAA, Dark Sky, and PlanetOS, using Regex for time zone and location-based parsing. We utilized a JavaScript cross-platform framework (Ionic) to efficiently build iOS, Android, and web apps from a single codebase.
              </p>

              <h2>Challenge</h2>
              <p>
                As a pre-seed startup, SeaStatus required a cost-effective, resource-efficient solution. We leveraged open-source libraries and frameworks, used cross-platform development to streamline processes, and relied on third-party APIs for rapid data integration and personalized weather updates.
              </p>

              <h2>Solution</h2>
              <p>
                Aggregated data from NOAA, Dark Sky, PlanetOS, WeatherFlow, and WorldTides into marine weather charts.
                Cached location data with Amazon CloudFront for fast loading.
                Built a Ruby on Rails backend on Google Cloud to fetch and store data in Firestore via delayed jobs.
                Scheduled personalized push notifications using Node.js cloud functions.
              </p>
              <MacbookFrame>
                <Box height={"100%"}>
                  <Img src={sofar.src} />
                </Box>
              </MacbookFrame>
            </Box>
            <Box
              className="column"
              flex={2}
            >
              <h2>Tech Used</h2>
              <p>Ruby on Rails, Google Cloud, Firebase, Ionic Framework</p>
              <h2>Success</h2>
              <p>
                We launched the SeaStatus MVP in 2 months of development time,
                and won a $25,000 prize from the Big Ocean Button Challenge!
                SeaStatus was acquired by Sofar Ocean Technologies for a successful
                startup exit!
              </p>
              <Box mt={5}>
                <PhoneFrame video={"/videos/seastatus.mp4"} />
              </Box>
            </Box>
          </Box>
        </div>
      </div>
    );
};

export default SeastatusModalContent;