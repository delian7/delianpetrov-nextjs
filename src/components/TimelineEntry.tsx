import { forwardRef } from "react";

interface TimelineEntryProps {
  year: number;
  index: number;
  description: string;
  heading: string;
  logo: string;
}

const TimelineEntry = forwardRef<HTMLLIElement, TimelineEntryProps>(
  ({ year, index, description, heading, logo }, ref) => {
    return (
      <li ref={ref} key={index} data-logo={logo}>
        <div className="item-inner">
          <div className="time-wrapper">
            <time>{year}</time>
          </div>
          <div className="details">
            <h3>{heading}</h3>
            <p>
              {description}
            </p>
          </div>
        </div>
      </li>
    );
});

TimelineEntry.displayName = "TimelineEntry";

export default TimelineEntry;