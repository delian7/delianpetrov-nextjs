import { Box } from "@chakra-ui/react";
import FullScreenSection from "./FullScreenSection";
import '../styles/avatar.css';
import ProfileCard from "./ProfileCard";


// Implement the UI for the LandingSection component according to the instructions.
// Use a combination of Avatar, Heading and VStack components.
const LandingSection = () => {
  return (
    <div className="landing-container">
    <FullScreenSection
      className="landing"
      justifyContent="space-between"
      alignItems="center"
      isDarkBackground
      backgroundColor="#2A4365"
      position="relative"
      maxWidth="99vw"
      w="100vw"
      flexDirection="column"
      height="100vh"
    >
      <Box className="profile-card" flex="0 1 auto">
        <header>
          <ProfileCard />
        </header>
      </Box>
    </FullScreenSection>
    </div>
  );
};

export default LandingSection;
