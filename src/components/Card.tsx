import React from "react";
import { Img } from "@chakra-ui/react";
import '../styles/Card.css';

interface CardProps {
  title: string;
  description: string;
  logo: string;
  hero: string;
  modalOpen?: () => void;
}

const Card: React.FC<CardProps> = ({ title, description, logo, hero, modalOpen }) => {

  const handleModalOpen = () => {
    if (modalOpen) {
      modalOpen();
    }
  }

  return (
    <div className="work-item-content" onClick={handleModalOpen}>
      <div className="item-content">
        <div className="item-details-content">
          <div className="img-content">
            <span>
              <Img src={hero} className="work-image" borderRadius="lg"/>
            </span>
          </div>
          <div className="job-name mt-3">
            <h3 className="project-name">{title}</h3>
            <div className="project-logo">
              <Img src={logo} className={`${title.toLowerCase().replace(/\s+/g, '-')} project-image`}/>
            </div>
          </div>
        </div>
        <div className="job-footer">
          <div className="link-job"><span className="label">{description}</span></div>
        </div>
      </div>
    </div>
  )
};

export default Card;
