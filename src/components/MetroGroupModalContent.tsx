import hero from '../images/metrogroup/hero.png';
import chart from '../images/metrogroup/chart.png';
import { Box, Img } from '@chakra-ui/react';
import MacbookFrame from './MacbookFrame';

const MetroGroupModalContent = () => {
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
              src={hero.src}
              borderRadius='lg'
              alt="MetroGroup Hero"
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
                <p>MetroGroup Realty Finance needed a solution to track and visualize their daily financial data in a dynamic, user-friendly format, enabling the creation of a historical dataset for financial trend analysis.</p>

                <h2>Challenges</h2>
                <p>The key challenges were automating the daily data updates, converting the data into a format suitable for the front-end, and ensuring seamless integration with the charting library. Additionally, the solution needed to be cost-effective, reliable, and easily maintainable without complex infrastructure.</p>

                <h2>Solution</h2>
                <p>
                  Automated the process of appending daily financial updates to a Google Sheet to build a historical
                  dataset. Developed an AWS Lambda function to read the Google Sheet, parse the data into JSON format,
                  and send it to the front-end.Integrated AmCharts to ingest the JSON data and render interactive line charts,
                  providing a clear visual representation of financial trends.
                </p>
            </Box>
            <Box
              className="column"
              flex={4}
            >
              <h2>Tech Used</h2>
              <p>Google Sheets API, AWS Lambda (Ruby), AmCharts, JSON</p>
              <h2>Success</h2>
                <p>
                  This solution streamlined the data visualization process, allowing MetroGroup Realty Finance to monitor financial trends in real-time through easily accessible charts. The use of serverless architecture minimized costs while maintaining scalability, and the seamless Google Sheets integration ensured straightforward data management. It can be viewed on <a href="https://metrogroupfinance.com" target="_blank" rel="noreferrer">https://metrogroupfinance.com</a>
                </p>
              <MacbookFrame>
                <Box height={"100%"}>
                  <Img height={"95%"} src={chart.src} />
                </Box>
              </MacbookFrame>
            </Box>
          </Box>
        </div>
      </div>
    );
};

export default MetroGroupModalContent;
