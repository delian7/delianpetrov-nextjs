
import { Text, Flex } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Social {
  text: string;
  url: string;
  icon: any; // You might want to replace `any` with a more specific type if possible
}

interface SocialListProps {
  socials: Social[];
}

function SocialList(props: SocialListProps) {

  const socials = props.socials;

  return (
    <>
      {socials.map((social, index) => {
        const text = social.text;
        return (
          <a key={index} target="_blank" href={social.url} rel="noreferrer">
            <Flex align="center">
              <FontAwesomeIcon icon={social.icon} size='2x' />
              {text && <Text marginLeft="2" className="text">{text}</Text>}
            </Flex>
          </a>
        );
      })}
    </>
  );
}

export default SocialList;