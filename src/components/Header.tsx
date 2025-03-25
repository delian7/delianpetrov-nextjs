import { Box } from "@chakra-ui/react";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import {
  faGithub,
  faLinkedin,
  faCodepen
} from "@fortawesome/free-brands-svg-icons";
import { useModalContext } from '../context/modalContext';
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";
import ResumeModalContent from "./ResumeModalContent";

const socials = [
  {
    icon: faEnvelope,
    url: "mailto: hello@delianpetrov.com",
    text: ''
  },
  {
    icon: faGithub,
    url: "https://github.com/delian7",
    text: ''
  },
  {
    icon: faLinkedin,
    url: "https://www.linkedin.com/in/delianpetrov",
    text: ''
  },
  {
    icon: faCodepen,
    url: "https://codepen.io/delian7",
    text: ''
  },
];

const Header = () => {
  const { openModal, setModalContent, setModalTitle } = useModalContext();

  const openResumeModal = () => {
    setModalTitle('My Resume')
    setModalContent(<ResumeModalContent />)
    openModal()
  }

  return (
    <>
      <DesktopNav socials={socials} openResumeModal={openResumeModal} />
      <Box display={{base: 'block', md: 'none'}}>
        <MobileNav socials={socials} openResumeModal={openResumeModal} />
      </Box>
    </>
  );
};
export default Header;
