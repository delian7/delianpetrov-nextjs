import { Heading } from "@chakra-ui/react";
import FullScreenSection from "./FullScreenSection";
import '../styles/Timeline.css';
import { useEffect, useRef } from "react";
import TimelineEntry from "./TimelineEntry";

const ANIMATED_CLASS = "in-view";
const threshold = 0.5;

// function callback(entries: any[], observer: IntersectionObserver) {
//   entries.forEach((entry) => {
//     if (entry.intersectionRatio >= threshold) {
//       const elem = entry.target;
//       elem.classList.add(ANIMATED_CLASS);
//       observer.unobserve(elem);
//     }
//   });
// }

function addAnimatedClass(entries: IntersectionObserverEntry[], observer: IntersectionObserver) {
  entries.forEach((entry) => {
    const elem = entry.target;
    if (entry.isIntersecting) {
      elem.classList.add(ANIMATED_CLASS);

      const logoClass = (elem as HTMLElement).dataset.logo;
      if (logoClass) {
        (elem.querySelector('.time-wrapper') as HTMLElement)?.classList.add(logoClass);
      }
      observer.unobserve(elem);
    }
  });
}


const Timeline = () => {
  const liRefs = useRef<Map<number, HTMLLIElement>>(new Map());
  const timelineEntries = [
    { year: 2024, heading: "Principal Software Engineer", description: "FridgeGuide Ai", logo: 'fridgeguide-logo' },
    { year: 2022, heading: "Senior Software Engineer", description: "SalonInteractive", logo: 'saloninteractive-logo' },
    { year: 2021, heading: "Senior Software Engineer", description: "Cryoport", logo: 'cryoport-logo' },
    { year: 2019, heading: "Senior Software Engineer", description: "LegalShield", logo: 'legalshield-logo' },
    { year: 2017, heading: "Co-Founder/Principle Software Engineer", description: "Seatatus", logo: 'seastatus-logo'},
    { year: 2016, heading: "Full Stack Engineer", description: "Visage", logo: 'visage-logo' },
    { year: 2015, heading: "Software Engineer", description: "ApplicantLab", logo: 'applab-logo' },
    { year: 2015, heading: "Graduated University of California, Irvine", description: "B.S. in Informatics & Minor in Mangagement", logo: 'uci-logo' },
    { year: 2014, heading: "Google Student Ambassador", description: "University of California, Irvine", logo: 'gsa-logo' },
    { year: 2012, heading: "Lead Technician", description: "AntTech Repair Center @ UCI", logo: 'anttech-logo' },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(addAnimatedClass, {threshold});

    liRefs.current.forEach((li) => {
      if (li) {
        observer.observe(li);
      }
    });

    return () => {
      observer.disconnect();
    };

  }, [])

  return (
    <FullScreenSection
      backgroundColor="#14532d"
      isDarkBackground
      p={8}
      alignItems="flex-start"
      spacing={8}
    >
      <Heading as="h1" id="timeline-section">
        Career Timeline
      </Heading>

      <section className="timeline">
        <ol>
          {timelineEntries.map((entry, index) => (
              <TimelineEntry
                index={index}
                key={index}
                year={entry.year}
                heading={entry.heading}
                description={entry.description}
                logo={entry.logo}
                ref={(el) => {
                  if (el) {
                    liRefs.current.set(index, el);
                  } else {
                    liRefs.current.delete(index);
                  }
                }} // Passing the ref down to the TimelineEntry component
              />
            ))}
        </ol>
      </section>
    </FullScreenSection>
  )
};

export default Timeline;
