"use client";

import { Fade } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { IconButton } from "@chakra-ui/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
// import { ArrowUpIcon } from "@chakra-ui/icons";

const BackToTopButton = () => {
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScroll(window.scrollY > 300); // Show icon after scrolling down 300px
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <Fade in={showScroll}>
        <IconButton
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          icon={<FontAwesomeIcon icon={faArrowUp} />}
          position="fixed"
          bottom="20px"
          right="20px"
          zIndex="1000"
          size={'lg'}
          aria-label="Back to Top"
        />
      </Fade>
    </>

  )
}

export default BackToTopButton;