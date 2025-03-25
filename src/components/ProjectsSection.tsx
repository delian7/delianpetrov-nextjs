"use client";

import FullScreenSection from "./FullScreenSection";
import { Box, Heading } from "@chakra-ui/react";
import Card from "./Card";
import { useModalContext } from '../context/modalContext'; // Import the hook


import SeastatusModalContent from "./SeastatusModalContent";
import FridgeGuideModalContent from "./FridgeGuideModalContent";
import MetroGroupModalContent from "./MetroGroupModalContent";
import VisageModalContent from "./VisageModalContent";

import fridgeGuideLogo from '../images/fridgeguide/fridgeguide_logo.png';
import fridgeGuideHero from '../images/fridgeguide/hero2.png';
import metroGroupLogo from '../images/metrogroup/logo.png';
import metroGroupHero from '../images/metrogroup/card.png';
import seastatusLogo from '../images/seastatus_logo.png';
import seastatusHero from '../images/seastatus/new-home.png';
import visageLogo from '../images/visage_logo_white.png';
import visageHero from '../images/visage/card.png';


interface Project {
  title: string;
  description: string;
  logo: () => string;
  hero: () => string;
  modalContent: React.ReactNode;
}

const projects: Project[] = [
  {
    title: "FridgeGuide Ai",
    description:
      "AI designed to categorize groceries and create new recipes",
    logo: () => fridgeGuideLogo.src,
    hero: () => fridgeGuideHero.src,
    modalContent: <FridgeGuideModalContent />
  },
  {
    title: "MetroGroup Realty Finance",
    description:
      "Reporting financial metrics using AWS Lambda & interactive charts",
    logo: () => metroGroupLogo.src,
    hero: () => metroGroupHero.src,
    modalContent: <MetroGroupModalContent />
  },
  {
    title: "SeaStatus",
    description:
      "iOS On-the-Go Marine Weather App",
    logo: () => seastatusLogo.src,
    hero: () => seastatusHero.src,
    modalContent: <SeastatusModalContent />
  },
  {
    title: "Visage",
    description:
      "Brand creation and visualization tool",
    logo: () => visageLogo.src,
    hero: () => visageHero.src,
    modalContent: <VisageModalContent />
  },
];

const ProjectsSection = () => {
  const { openModal, setModalContent, setModalTitle } = useModalContext();

  const handleOpenModal = (project: Project) => {
    setModalTitle(`${project.title}: ${project.description}`)
    setModalContent(project.modalContent);
    openModal();
  };

  return (
    <FullScreenSection
      backgroundColor="#53143A"
      isDarkBackground
      p={8}
      alignItems="flex-start"
      spacing={8}
    >
      <Heading as="h1" id="projects-section">
        Featured Projects
      </Heading>
      <Box
        display="grid"
        gridTemplateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
        gridGap={8}
      >
        {projects.map((project) => (
          <Card
            modalOpen={() => handleOpenModal(project)}
            key={project.title}
            title={project.title}
            description={project.description}
            logo={project.logo()}
            hero={project.hero()}
          />
        ))}
      </Box>

      <div style={{ display: 'none' }}>
        {projects.map((project) => (
          <div key={project.title} id={`modal-content-${project.title}`}>
            {project.modalContent}
          </div>
        ))}
      </div>
    </FullScreenSection>
  );
};

export default ProjectsSection;
