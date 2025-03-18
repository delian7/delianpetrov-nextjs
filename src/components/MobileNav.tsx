import { useState } from 'react'
import '../styles/MobileNav.css'
import SocialList from './SocialList';
import { Box, HStack } from '@chakra-ui/react';
import { useScroll } from '../context/ScrollContext';

interface MobileNavProps {
  socials: any[];
  openResumeModal: () => void;
}

const MobileNav: React.FC<MobileNavProps> = ({socials, openResumeModal}) => {
  const [showMenu, setShowMenu] = useState(false);
  const handleSmoothScroll = useScroll();
  const handleBurgerClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    setShowMenu(!showMenu);
  }

  return (
    <div className="mobile-nav" onClick={handleBurgerClick}>
      <div className={`burger ${showMenu ? 'clicked' : ''}`}>
        <span></span>
      </div>
      <nav className={showMenu ? 'show' : ''}>
        <ul className="main">
          <li><span onClick={openResumeModal}>Resume</span></li>
          <li><span id="#timeline-section" onClick={handleSmoothScroll}>My Career</span></li>
          <li><span id="#projects-section" onClick={handleSmoothScroll}>Projects</span></li>
          <li><span id="#contactme-section" onClick={handleSmoothScroll}>Contact Me</span></li>
        </ul>

        <HStack
          color="white"
          spacing={8}
          marginY={5}
        >
          <SocialList socials={socials.filter(social => social.url !== 'mailto: hello@delianpetrov.com')} />
        </HStack>
        <Box color='white' marginY={5} fontSize={'lg'} fontWeight={600} className="about">
          <a href="mailto:hello@delianpetrov.com" className="contact-email">hello@delianpetrov.com</a>
          <span> <br/></span>
          <a href="tel:+18582038510" className="contact-phone">(858) 203-8510</a>
        </Box>
      </nav>
      <div className={`overlay ${showMenu ? 'show' : ''}`}></div>
    </div>
  )
}

export default MobileNav;