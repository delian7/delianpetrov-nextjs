import { Box } from '@chakra-ui/react';
import '../styles/MacbookFrame.css';

interface FrameProps {
  image?: string;
  children?: React.ReactNode;
}

const PhoneFrame: React.FC<FrameProps> = ({image, children}) => {
  return (
    <Box
      position={'relative'}
      bottom={{md: "5em"}}
      width={{md: '10px'}}
      transform={{base: "scale(0.9)", md: "scale(0.5)"}}
    >
      <div className="mac-screen">
          {children}
      </div>
      <div className="mac-base"></div>
      <div className="mac-foot-wrapper">
          <div className="mac-foot"></div>
          <div className="mac-foot"></div>
      </div>
    </Box>
  )
}

export default PhoneFrame;