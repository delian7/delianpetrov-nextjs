import '../styles/PhoneFrame.css';

interface PhoneProps {
  image?: string;
  video?: string;
}

const PhoneFrame: React.FC<PhoneProps> = ({image, video}) => {
  return (
    <div className="slider">
      <ul>
        <li>
          {image && (
            <img src={image} alt="" />
          )}
          {video && ( // Check if video prop is provided
            <video controls loop autoPlay playsInline>
              <source src={video} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
        </li>
      </ul>
    </div>
  )
}

export default PhoneFrame;