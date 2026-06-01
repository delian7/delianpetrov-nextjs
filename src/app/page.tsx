"use client";

/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FaGithub,
  FaLinkedin,
  FaCodepen,
  FaEnvelope,
  FaExternalLinkAlt,
} from "react-icons/fa";

// Avatar
import delianAvatar from "../images/avatar.jpg";

// Project hero images
import fridgeGuideHero from "../images/fridgeguide/hero2.png";
import metroGroupHero from "../images/metrogroup/card.png";
import seastatusHero from "../images/seastatus/new-home.png";
import visageHero from "../images/visage/card.png";
import wanderfulHero from "../images/wanderfultanzania/safari3.png";

// Project logos
import fridgeGuideLogo from "../images/fridgeguide/fridgeguide_logo.png";
import metroGroupLogo from "../images/metrogroup/logo.png";
import seastatusLogo from "../images/seastatus_logo.png";
import visageLogo from "../images/visage_logo.png";
import wanderfulLogo from "../images/wanderfultanzania/wanderful-tanzania-logo-white.png";

// Project screenshots
import wanderfulWild from "../images/wanderfultanzania/wild-at-heart.png";
import wanderfulPayment from "../images/wanderfultanzania/payment-plans.png";
import wanderfulSnippets from "../images/wanderfultanzania/snippets.png";
import fridgeUiLoop from "../images/fridgeguide/ui-loop.gif";
import fridgeAdmin from "../images/fridgeguide/admin.png";
import fridgeAiGood from "../images/fridgeguide/ai-for-good.webp";
import metroHero from "../images/metrogroup/hero.png";
import metroChart from "../images/metrogroup/chart.png";
import seastatusCover from "../images/seastatus/seastatus-cs-cover.png";
import seastatusSofar from "../images/seastatus/sofar-product.png";
import visageHeroFull from "../images/visage/hero.png";
import visageColors from "../images/visage/visage-colors.png";
import visageTemplates from "../images/visage/visage-templates.png";

// Timeline logos
import metaLogo from "../images/meta_logo.png";
import salonLogo from "../images/saloninteractive_logo.png";
import cryoportLogo from "../images/cryoport_logo.jpg";
import legalshieldLogo from "../images/legalshield_logo.png";
import uciLogo from "../images/uci_logo.jpg";
import gsaLogo from "../images/gsa_logo.png";
import anttechLogo from "../images/anttech_logo.png";

gsap.registerPlugin(ScrollTrigger);

/* ─── TYPES ─── */

interface Project {
  key: string;
  monogram: string;
  gradient: string;
  tag: string;
  title: string;
  description: string;
  techs: string[];
  heroImage: string;
  logo: string;
  subtitle: string;
  role: string;
  overview: string;
  screenshots: string[];
  highlights: string[];
  fullTech: string[];
  link?: string;
}

interface TimelineEntry {
  year: string;
  role: string;
  company: string;
  logoSrc: string;
  noBg?: boolean;
  milestone?: boolean;
  description?: string;
  highlights?: string[];
  skills?: string[];
}

/* ─── DATA (sourced from repo modal components) ─── */

const projects: Project[] = [
  {
    key: "wanderfultanzania",
    monogram: "WT",
    gradient: "linear-gradient(135deg, rgba(26,92,46,0.7), rgba(61,163,93,0.7))",
    tag: "E-Commerce",
    title: "WanderfulTanzania",
    description: "WordPress site with WooCommerce and Stripe integration",
    techs: ["WordPress", "WooCommerce", "Stripe"],
    heroImage: wanderfulHero.src,
    logo: wanderfulLogo.src,
    subtitle: "WordPress site with WooCommerce and Stripe integration",
    role: "Webmaster",
    overview:
      "Wanderful Tanzania is a premium safari tour company that brings travelers into the wild heart of Tanzania. As their webmaster, I've been responsible for maintaining and enhancing their digital presence, focusing on creating seamless booking experiences for their luxury safari packages. I developed and integrated a custom WordPress plugin that bridges WooCommerce with Stripe's payment API, enabling flexible payment plans with dynamic business logic that automatically adjusts available payment options based on the safari's start date.",
    screenshots: [wanderfulWild.src, wanderfulPayment.src, wanderfulSnippets.src],
    highlights: [
      "Flexible payment system handling both full payments and installment plans for high-value safari packages",
      "Custom WordPress plugin bridging WooCommerce with Stripe payment API",
      "Dynamic business logic adjusting payment options based on safari start date",
      "Streamlined booking process increasing payment plan adoption",
    ],
    fullTech: ["WordPress", "WooCommerce", "PHP", "Stripe API", "Custom Plugin Development", "JavaScript", "MySQL"],
    link: "https://wanderfultanzania.com",
  },
  {
    key: "fridgeguide",
    monogram: "FG",
    gradient: "linear-gradient(135deg, rgba(74,26,138,0.7), rgba(124,58,237,0.7))",
    tag: "Artificial Intelligence",
    title: "FridgeGuide AI",
    description: "AI designed to categorize groceries and create new recipes",
    techs: ["Ruby on Rails", "React Native", "Azure"],
    heroImage: fridgeGuideHero.src,
    logo: fridgeGuideLogo.src,
    subtitle: "AI designed to categorize groceries and create new recipes",
    role: "Principal Software Engineer",
    overview:
      "FridgeGuide AI was born from a vision to revolutionize food interaction at home. Initially a consumer app, it integrated AI to track groceries, reduce waste, and generate personalized recipes. As it evolved, the technology pivoted to a B2B solution for food pantries — simplifying inventory management, tracking expiration dates, and creating meal plans using available resources. Features like donor logging and volunteer coordination streamline operations.",
    screenshots: [fridgeUiLoop.src, fridgeAdmin.src, fridgeAiGood.src],
    highlights: [
      "Food banks face challenges in tracking donations and managing expiration dates",
      "Pivoted from consumer app to B2B solution for food pantries",
      "User-friendly design and AI tools contributing to UN Sustainable Development Goals",
    ],
    fullTech: ["Ruby on Rails", "React Native", "Microsoft Azure", "Eden AI", "ChatGPT Streaming", "Firebase Push Notifications"],
  },
  {
    key: "metrogroup",
    monogram: "MG",
    gradient: "linear-gradient(135deg, rgba(26,58,92,0.7), rgba(37,99,235,0.7))",
    tag: "FinTech",
    title: "MetroGroup Realty Finance",
    description: "Reporting financial metrics using AWS Lambda & interactive charts",
    techs: ["AWS Lambda", "AmCharts", "Google Sheets"],
    heroImage: metroGroupHero.src,
    logo: metroGroupLogo.src,
    subtitle: "Reporting financial metrics using AWS Lambda & interactive charts",
    role: "Developer",
    overview:
      "MetroGroup Realty Finance needed a solution to track and visualize their daily financial data in a dynamic, user-friendly format, enabling the creation of a historical dataset for financial trend analysis. Automated the process of appending daily financial updates to a Google Sheet to build a historical dataset. Developed an AWS Lambda function to read the Google Sheet, parse the data into JSON format, and send it to the front-end. Integrated AmCharts to ingest the JSON data and render interactive line charts, providing a clear visual representation of financial trends.",
    screenshots: [metroHero.src, metroChart.src],
    highlights: [
      "Automating daily data updates and converting data into a format suitable for the front-end",
      "Cost-effective, reliable, and easily maintainable without complex infrastructure",
      "Serverless architecture minimized costs while maintaining scalability",
      "Seamless Google Sheets integration for straightforward data management",
    ],
    fullTech: ["Google Sheets API", "AWS Lambda (Ruby)", "AmCharts", "JSON"],
    link: "https://metrogroupfinance.com",
  },
  {
    key: "seastatus",
    monogram: "SS",
    gradient: "linear-gradient(135deg, rgba(12,74,110,0.7), rgba(6,182,212,0.7))",
    tag: "Mobile / iOS",
    title: "SeaStatus",
    description: "iOS On-the-Go Marine Weather App",
    techs: ["Ruby on Rails", "Ionic", "Google Cloud"],
    heroImage: seastatusHero.src,
    logo: seastatusLogo.src,
    subtitle: "iOS On-the-Go Marine Weather App",
    role: "Co-Founder & Lead Engineer",
    overview:
      "We developed a Ruby on Rails application delivering personalized marine weather data for SeaStatus, taking it from concept to MVP in just two months. The platform aggregates weather data from APIs like NOAA, Dark Sky, and PlanetOS, using Regex for time zone and location-based parsing. We utilized Ionic to efficiently build iOS, Android, and web apps from a single codebase. Cached location data with Amazon CloudFront for fast loading. Built the backend on Google Cloud to fetch and store data in Firestore via delayed jobs.",
    screenshots: [seastatusCover.src, seastatusSofar.src],
    highlights: [
      "Pre-seed startup requiring a cost-effective, resource-efficient solution",
      "Aggregated data from NOAA, Dark Sky, PlanetOS, WeatherFlow, and WorldTides",
      "Scheduled personalized push notifications using Node.js cloud functions",
      "Launched MVP in 2 months and won $25,000 from the Big Ocean Button Challenge",
      "Acquired by Sofar Ocean Technologies for a successful startup exit",
    ],
    fullTech: ["Ruby on Rails", "Google Cloud", "Firebase", "Ionic Framework"],
  },
  {
    key: "visage",
    monogram: "VS",
    gradient: "linear-gradient(135deg, rgba(88,28,135,0.7), rgba(168,85,247,0.7))",
    tag: "Design Tool",
    title: "Visage",
    description: "Brand creation and visualization tool",
    techs: ["Ruby on Rails", "AWS", "Knockout.js"],
    heroImage: visageHero.src,
    logo: visageLogo.src,
    subtitle: "Brand creation and visualization tool",
    role: "Full Stack Engineer",
    overview:
      "Visage Software is a web-based design platform that empowers users to create visual content and reports with ease. The platform is aimed at helping individuals and teams design high-quality, customized visual assets without requiring advanced design skills or software. Built with drag-and-drop design functionality, customizable templates and asset libraries, responsive design principles, and export options for PNG and PDF.",
    screenshots: [visageHeroFull.src, visageColors.src, visageTemplates.src],
    highlights: [
      "Intuitive interface catering to users with various levels of design experience",
      "Customizable templates and asset libraries for quick professional designs",
      "Responsive content rendering across all devices and screen sizes",
      "Export options in multiple formats (PNG, PDF) for seamless reporting",
    ],
    fullTech: ["Ruby on Rails", "AWS S3", "AWS Lambda", "Knockout.js"],
  },
];

const timeline: TimelineEntry[] = [
  { year: "2025", role: "Senior Software Engineer", company: "Meta", logoSrc: metaLogo.src, milestone: true,
    description: "Monetization Team at Meta. After 73 companies, ~200 interviews, and 6 months of preparation, joined Meta as a Senior Software Engineer working on monetization infrastructure at scale.",
    highlights: ["Working on the Monetization Team building revenue-driving product infrastructure", "Joined after an intensive 6-month interview journey across 73 companies"],
    skills: ["iOS", "SQL", "React", "TypeScript", "GraphQL"],
  },
  { year: "2024", role: "Co-Founder, Principal Software Engineer", company: "FridgeGuide AI", logoSrc: fridgeGuideLogo.src,
    description: "Oversaw designing, developing, and implementing AI-driven features and scalable backend infrastructure for a grocery and meal planning mobile application, improving user engagement by 40%.",
    highlights: [
      "Implemented AI response streaming for real-time voice and receipt scanning using ChatGPT 4o, reducing user wait time by 80% through chunked delivery",
      "Developed custom AI prompts achieving a 95% success rate in identifying and categorizing groceries",
      "Showcased at the UN AI for Good Global Summit in Geneva, Switzerland",
      "Featured on the Foreign Founders podcast and interviewed for the #I_make_AI campaign",
      "Launched on the App Store with React Native",
    ],
    skills: ["Ruby on Rails", "React Native", "Azure", "Eden AI", "ChatGPT Streaming", "Firebase"],
  },
  { year: "2022", role: "Senior Software Engineer", company: "SalonInteractive", logoSrc: salonLogo.src, noBg: true,
    description: "Key player in both backend and frontend for a $1.2M business software solution company serving the professional beauty industry, improving application response times by 60%.",
    highlights: [
      "Transitioned infrastructure from Google Cloud to Heroku, reducing response times by 25% and increasing throughput by 40% during peak loads",
      "Directed migration of legacy code to Rails 6.0 with Webpacker, reducing boot time by 22% and server response time by 15%",
      "Designed subscription management system with Stripe, leading to $600/month revenue increase",
      "Established CircleCI automated testing suite, increasing code coverage from 78% to 89% and reducing post-deployment bugs by 25%",
    ],
    skills: ["Ruby on Rails", "React", "Alpine.js", "Stripe", "CircleCI", "K6"],
  },
  { year: "2020", role: "Software Engineer", company: "Cryoport", logoSrc: cryoportLogo.src, noBg: true,
    description: "Senior engineer for a $233M supply chain solutions company, implementing tracking systems integrating 4G and GPS-enabled devices for cryogenic shipments, improving reliability by 40%.",
    highlights: [
      "Built robust tracking system integrating 4G and GPS-enabled devices for cryogenic shipments",
      "Elevated to interim Scrum Master within 7 months, improving sprint velocity and burn-down performance by 30%",
      "Spearheaded JIRA linter GitHub Action preventing PR merges with missing fields, reducing communication errors by 43%",
    ],
    skills: ["JavaScript", "React", "OOP", "Data Modeling", "Scrum"],
  },
  { year: "2018", role: "Senior Software Engineer", company: "LegalShield", logoSrc: legalshieldLogo.src, noBg: true,
    description: "Integrated and optimized Elastic Search for over 11M users and 7M legal service requests, reducing average search time by 60% from 3 seconds to 1.2 seconds.",
    highlights: [
      "Optimized Elastic Search for 11M+ users, reducing search time by 60% (3s → 1.2s) and boosting satisfaction scores by 25%",
      "Introduced OKTA SSO OAuth2 strategy serving 50 partner firms, reducing login-related support tickets by 40% with 99.9% uptime",
    ],
    skills: ["Ruby on Rails", "Elastic Search", "OAuth2", "OKTA SSO"],
  },
  { year: "2016", role: "Co-Founder / Lead Engineer", company: "SeaStatus", logoSrc: seastatusLogo.src,
    description: "Launched the MVP in 4 months for a marine weather data aggregation platform, driving a 290% increase in monthly active users (2.9K within 18 months).",
    highlights: [
      "290% increase in monthly active users — 2.9K within 18 months",
      "Secured $25K by winning 2 categories in the Xprize Big Ocean Button Challenge",
      "Improved weather prediction accuracy by 35% by integrating multiple data sets",
      "Successful exit — acquired by Sofar Ocean Technologies",
    ],
    skills: ["Ruby on Rails", "Ionic", "Google Cloud", "Firebase", "NOAA API"],
  },
  { year: "2015", role: "Full Stack Engineer", company: "Visage", logoSrc: visageLogo.src,
    description: "Championed an enterprise solution for mapping user text and charts onto Google Sheets, leading to adoption by LinkedIn offices in the US, UK, and India, generating over 100 monthly workforce reports.",
    highlights: [
      "Adopted by LinkedIn offices in US, UK, and India generating 100+ monthly state and national workforce reports",
      "Evaluated in-house Selenium grid with AWS Docker Containers and Lambda, storing assets on S3",
      "Designed persistent download tracker using pub/sub and browser session storage",
      "Utilized FabricJS to create custom SVG shape/polygon editor",
      "Automated graphic asset delivery to third-party services via Zapier",
    ],
    skills: ["Ruby on Rails", "AWS S3", "AWS Lambda", "Knockout.js", "FabricJS", "Selenium"],
  },
  { year: "2015", role: "B.S. Informatics", company: "University of California, Irvine", logoSrc: uciLogo.src, noBg: true, milestone: true,
    description: "Graduated with a Bachelor of Science in Informatics with a Minor in Management from the University of California, Irvine.",
  },
  { year: "2014", role: "Google Student Ambassador", company: "UC Irvine", logoSrc: gsaLogo.src, noBg: true,
    description: "Selected as a Google Student Ambassador at UC Irvine, representing Google on campus and organizing tech events for the student community.",
  },
  { year: "2012", role: "Lead Technician", company: "AntTech Repair Center @ UCI", logoSrc: anttechLogo.src, noBg: true,
    description: "Oversaw 30 machines and reported to five managers. Led dynamic technical projects for university bookstore and maintained in-house computer integrity under strict campus firewall regulations.",
    highlights: [
      "Maintained and provided backup for Linux and macOS-based server systems through CRON shell scripts",
      "Earned certification as Apple Macintosh Technician for Mac, Windows, and Linux-based PCs",
      "Developed roadmap for other student technicians",
    ],
  },
];

/* ─── TESTIMONIALS DATA ─── */

const testimonials = [
  {
    initials: "MC",
    name: "Marta Chodulski-Squires",
    role: "Staff Technical Recruiter at TwelveLabs",
    context: "Worked together at Meta",
    quote: 'He was truly an exceptional candidate to partner with. Delian impressed me with his preparation, communication, and steady professionalism. He is not only technically strong, but he brings a thoughtful, collaborative mindset that any team would be lucky to have.',
  },
  {
    initials: "RA",
    name: "Rob Abney",
    role: "GTM Strategy & Brand Leader",
    context: "Worked together at SalonInteractive",
    quote: "Delian's technical expertise and problem-solving skills played a key role in building a platform that is both scalable and user-friendly. His impact wasn't just in development — he also contributed to our get-things-done mindset, ensuring the engineering team delivered high-quality work aligned with our business goals.",
  },
  {
    initials: "VH",
    name: "Vanessa Holland",
    role: "Engineering Manager",
    context: "Managed Delian at LegalShield",
    quote: 'He is able to bridge the gap between business requirements and engineering best practices. His "solve anything" attitude paired with his breadth of knowledge and ability to express his opinions in a humble yet assertive manner makes him emerge as a natural leader on any team.',
  },
  {
    initials: "RC",
    name: "Ross Crooks",
    role: "Co-founder @ Column Five",
    context: "Worked together at Visage",
    quote: "He possesses a rare mix of curiosity, excitement and confidence that makes working with him a joy. He's a strong communicator, always willing to shoot straight. I would highly recommend him as a strong addition to any team.",
  },
  {
    initials: "SP",
    name: "Sean Parent",
    role: "Senior Software Developer",
    context: "Worked together at Visage",
    quote: 'If I had to use one word to describe him, it would be "balanced." He strikes a wonderful balance between assertiveness and humility. In the constant tug-of-war between shipping quickly and crafting perfect code, he\'s able to play either side the situation calls for. He\'s proven equally adept at navigating front-end and back-end — a rare feat.',
  },
];

/* ─── THEME TOGGLE ─── */

function ThemeToggle() {
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "light") {
      document.documentElement.classList.add("light");
      setIsLight(true);
    }
  }, []);

  const toggle = () => {
    const next = !isLight;
    setIsLight(next);
    document.documentElement.classList.toggle("light", next);
    localStorage.setItem("theme", next ? "light" : "dark");
  };

  return (
    <button className="theme-toggle" onClick={toggle} aria-label="Toggle light/dark mode">
      <div className="theme-toggle-icons">
        <svg className="icon-moon" viewBox="0 0 24 24" width={12} height={12}>
          <path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9c0-.46-.04-.92-.1-1.36-.98 1.37-2.58 2.26-4.4 2.26-2.98 0-5.4-2.42-5.4-5.4 0-1.81.89-3.42 2.26-4.4-.44-.06-.9-.1-1.36-.1z" />
        </svg>
        <svg className="icon-sun" viewBox="0 0 24 24" width={12} height={12}>
          <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58c-.39-.39-1.03-.39-1.42 0-.39.39-.39 1.03 0 1.42l1.06 1.06c.39.39 1.03.39 1.42 0s.39-1.03 0-1.42L5.99 4.58zm12.37 12.37c-.39-.39-1.03-.39-1.42 0-.39.39-.39 1.03 0 1.42l1.06 1.06c.39.39 1.03.39 1.42 0 .39-.39.39-1.03 0-1.42l-1.06-1.06zm1.06-10.96c.39-.39.39-1.03 0-1.42-.39-.39-1.03-.39-1.42 0l-1.06 1.06c-.39.39-.39 1.03 0 1.42s1.03.39 1.42 0l1.06-1.06zM7.05 18.36c.39-.39.39-1.03 0-1.42-.39-.39-1.03-.39-1.42 0l-1.06 1.06c-.39.39-.39 1.03 0 1.42s1.03.39 1.42 0l1.06-1.06z" />
        </svg>
      </div>
      <div className="theme-toggle-knob" />
    </button>
  );
}

/* ─── LIGHTBOX ─── */

function Lightbox({
  images,
  index,
  onClose,
  onNav,
}: {
  images: string[];
  index: number;
  onClose: () => void;
  onNav: (dir: number) => void;
}) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onNav(-1);
      if (e.key === "ArrowRight") onNav(1);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose, onNav]);

  if (images.length === 0) return null;

  return (
    <div className={`lightbox ${images.length > 0 ? "active" : ""}`} onClick={onClose}>
      <button className="lightbox-close" onClick={onClose}>&times;</button>
      <button className="lightbox-nav lightbox-prev" onClick={(e) => { e.stopPropagation(); onNav(-1); }}>&#8249;</button>
      <img src={images[index]} alt="Screenshot" onClick={(e) => e.stopPropagation()} />
      <button className="lightbox-nav lightbox-next" onClick={(e) => { e.stopPropagation(); onNav(1); }}>&#8250;</button>
      <div className="lightbox-counter">{index + 1} / {images.length}</div>
    </div>
  );
}

/* ─── PROJECT MODAL ─── */

function ProjectModal({
  project,
  onClose,
  onScreenshotClick,
}: {
  project: Project | null;
  onClose: () => void;
  onScreenshotClick: (images: string[], index: number) => void;
}) {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (project && contentRef.current) {
      gsap.fromTo(
        contentRef.current.children,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, stagger: 0.06, duration: 0.5, delay: 0.2, ease: "power2.out" }
      );
    }
  }, [project]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  useEffect(() => {
    document.body.classList.toggle("modal-open", !!project);
    return () => document.body.classList.remove("modal-open");
  }, [project]);

  return (
    <>
      <div className={`modal-overlay ${project ? "active" : ""}`} onClick={onClose} />
      <div className={`modal-container ${project ? "active" : ""}`}>
        {project && (
          <>
            <div className="modal-close">
              <span className="modal-close-label">Project Details</span>
              <button className="modal-close-btn" onClick={onClose}>&times;</button>
            </div>
            <div
              className="modal-hero-banner"
              style={{ backgroundImage: `url(${project.heroImage})`, backgroundSize: "cover", backgroundPosition: "center" }}
            >
              <div className="project-hero-overlay" style={{ background: project.gradient }} />
            </div>
            <div className="modal-content" ref={contentRef}>
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16, marginBottom: 8 }}>
                <div>
                  <div className="modal-tag">{project.tag}</div>
                  <h2 className="modal-title">{project.title}</h2>
                </div>
                <img
                  src={project.logo}
                  alt={project.title}
                  style={{ height: 48, objectFit: "contain", flexShrink: 0, marginTop: 4 }}
                />
              </div>
              <p className="modal-subtitle">{project.subtitle}</p>

              <div className="modal-role-badge">
                <span className="role-label">Role</span>
                {project.role}
              </div>

              <div className="modal-section" style={{ marginTop: 36 }}>
                <div className="modal-section-title">Overview</div>
                <p>{project.overview}</p>
              </div>

              <div className="modal-section">
                <div className="modal-section-title">Highlights</div>
                <ul className="modal-highlights">
                  {project.highlights.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
              </div>

              <div className="modal-section">
                <div className="modal-section-title">Tech Stack</div>
                <div className="modal-tech-grid">
                  {project.fullTech.map((t) => (
                    <span className="modal-tech-item" key={t}>{t}</span>
                  ))}
                </div>
              </div>

              {project.screenshots.length > 0 && (
                <div className="modal-section">
                  <div className="modal-section-title">Screenshots</div>
                  <div className="modal-gallery">
                    {project.screenshots.map((src, i) => (
                      <img
                        key={src}
                        src={src}
                        alt={`${project.title} screenshot ${i + 1}`}
                        className={project.screenshots.length === 1 ? "full-width" : ""}
                        loading="lazy"
                        onClick={() => onScreenshotClick(project.screenshots, i)}
                      />
                    ))}
                  </div>
                </div>
              )}

              {project.link && (
                <a href={project.link} target="_blank" rel="noopener noreferrer" className="modal-link">
                  Visit Project <FaExternalLinkAlt />
                </a>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
}

/* ─── RESUME MODAL ─── */

const RESUME_PDF_ID = "1v_0nUb3ROf64cBAjJzVWqS7zLsuzDT6u";

function ResumeModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  useEffect(() => {
    if (open) document.body.classList.add("modal-open");
    else document.body.classList.remove("modal-open");
    return () => document.body.classList.remove("modal-open");
  }, [open]);

  return (
    <>
      <div className={`modal-overlay ${open ? "active" : ""}`} onClick={onClose} />
      <div className={`modal-container ${open ? "active" : ""}`} style={{ width: "min(900px, 95vw)" }}>
        {open && (
          <>
            <div className="modal-close">
              <span className="modal-close-label">Resume</span>
              <button className="modal-close-btn" onClick={onClose}>&times;</button>
            </div>
            <div style={{ padding: "24px 32px 16px", display: "flex", gap: 12, justifyContent: "center" }}>
              <a
                href={`https://drive.google.com/uc?export=download&id=${RESUME_PDF_ID}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
                style={{ fontSize: 14, padding: "10px 24px", display: "inline-flex", alignItems: "center", gap: 8, textDecoration: "none" }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Download PDF
              </a>
              <a
                href={`https://drive.google.com/file/d/${RESUME_PDF_ID}/view`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
                style={{ fontSize: 14, padding: "10px 24px", display: "inline-flex", alignItems: "center", gap: 8, textDecoration: "none" }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
                Open in Drive
              </a>
            </div>
            <div style={{ padding: "0 32px 32px", height: "calc(100vh - 140px)" }}>
              <iframe
                title="Delian Petrov Resume"
                src={`https://drive.google.com/file/d/${RESUME_PDF_ID}/preview`}
                width="100%"
                height="100%"
                allow="autoplay"
                style={{ border: "none", borderRadius: 12, background: "var(--bg, #0a0a0a)" }}
              />
            </div>
          </>
        )}
      </div>
    </>
  );
}

/* ─── TIMELINE MODAL ─── */

function TimelineModal({ entry, onClose }: { entry: TimelineEntry | null; onClose: () => void }) {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (entry && contentRef.current) {
      gsap.fromTo(contentRef.current.children, { opacity: 0, y: 20 }, { opacity: 1, y: 0, stagger: 0.06, duration: 0.5, delay: 0.2, ease: "power2.out" });
    }
  }, [entry]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  useEffect(() => {
    document.body.classList.toggle("modal-open", !!entry);
    return () => document.body.classList.remove("modal-open");
  }, [entry]);

  return (
    <>
      <div className={`modal-overlay ${entry ? "active" : ""}`} onClick={onClose} />
      <div className={`modal-container ${entry ? "active" : ""}`}>
        {entry && (
          <>
            <div className="modal-close">
              <span className="modal-close-label">Experience</span>
              <button className="modal-close-btn" onClick={onClose}>&times;</button>
            </div>
            <div style={{ padding: "32px 40px 16px", display: "flex", alignItems: "center", gap: 20 }}>
              <img
                src={entry.logoSrc}
                alt={entry.company}
                className={entry.noBg ? "timeline-logo no-bg" : "timeline-logo"}
                style={{ position: "relative", left: "auto", top: "auto" }}
              />
              <div>
                <div className="modal-tag">{entry.year}</div>
                <h2 className="modal-title" style={{ fontSize: 28 }}>{entry.role}</h2>
                <p style={{ color: "var(--text-secondary)", fontSize: 15, marginTop: 4 }}>{entry.company}</p>
              </div>
            </div>
            <div className="modal-content" ref={contentRef} style={{ paddingTop: 24 }}>
              {entry.description && (
                <div className="modal-section">
                  <div className="modal-section-title">Overview</div>
                  <p>{entry.description}</p>
                </div>
              )}
              {entry.highlights && entry.highlights.length > 0 && (
                <div className="modal-section">
                  <div className="modal-section-title">Highlights</div>
                  <ul className="modal-highlights">
                    {entry.highlights.map((h) => (<li key={h}>{h}</li>))}
                  </ul>
                </div>
              )}
              {entry.skills && entry.skills.length > 0 && (
                <div className="modal-section">
                  <div className="modal-section-title">Skills & Tech</div>
                  <div className="modal-tech-grid">
                    {entry.skills.map((s) => (<span className="modal-tech-item" key={s}>{s}</span>))}
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
}

/* ─── CONTACT FORM ─── */

function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("idle");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="firstName">Name</label>
          <input id="firstName" name="firstName" type="text" placeholder="Your name" required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" placeholder="you@email.com" required />
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="reason">Type</label>
        <select id="reason" name="reason">
          <option value="">Select inquiry type</option>
          <option value="recruitment">Recruitment / Hiring</option>
          <option value="freelance">Freelance Project</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="message">Message</label>
        <textarea id="message" name="message" placeholder="Tell me about your project or idea..." required />
      </div>
      <button
        type="submit"
        className="btn-primary contact-submit"
        disabled={status === "sending"}
        style={status === "sent" ? { background: "#22c55e" } : undefined}
      >
        {status === "sending" ? "Sending..." : status === "sent" ? "Sent ✓" : "Send Message"}
      </button>
    </form>
  );
}

/* ─── MAIN PAGE ─── */

export default function HomePage() {
  const heroRef = useRef<HTMLElement>(null);
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [resumeOpen, setResumeOpen] = useState(false);
  const [activeTimeline, setActiveTimeline] = useState<TimelineEntry | null>(null);
  const [lightboxImages, setLightboxImages] = useState<string[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const closeModal = useCallback(() => setActiveProject(null), []);
  const closeLightbox = useCallback(() => setLightboxImages([]), []);
  const navLightbox = useCallback(
    (dir: number) =>
      setLightboxIndex((prev) => (prev + dir + lightboxImages.length) % lightboxImages.length),
    [lightboxImages.length]
  );
  const openLightbox = useCallback((images: string[], index: number) => {
    setLightboxImages(images);
    setLightboxIndex(index);
  }, []);

  /* ── GSAP Animations ── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set([".hero-badge", ".hero h1", ".hero-sub", ".hero-cta"], { y: 30 });
      const tl = gsap.timeline({ delay: 0.3 });
      tl.to(".hero-badge", { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" })
        .to(".hero h1", { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" }, "-=0.3")
        .to(".hero-sub", { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, "-=0.3")
        .to(".hero-cta", { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, "-=0.3")
        .to(".scroll-indicator", { opacity: 1, duration: 0.8 }, "-=0.2");

      gsap.set(".stat-item", { y: 30, opacity: 0 });
      ScrollTrigger.batch(".stat-item", {
        onEnter: (batch) => gsap.to(batch, { opacity: 1, y: 0, stagger: 0.1, duration: 0.6, ease: "power2.out" }),
        start: "top 85%",
        once: true,
      });

      gsap.set(".section-eyebrow, .section-title, .section-desc", { y: 40, opacity: 0 });
      ScrollTrigger.batch(".section-eyebrow, .section-title, .section-desc", {
        onEnter: (batch) => gsap.to(batch, { opacity: 1, y: 0, stagger: 0.08, duration: 0.7, ease: "power2.out" }),
        start: "top 85%",
        once: true,
      });

      gsap.set(".timeline-item", { x: -30, opacity: 0 });
      ScrollTrigger.batch(".timeline-item", {
        onEnter: (batch) => gsap.to(batch, { opacity: 1, x: 0, stagger: 0.08, duration: 0.6, ease: "power2.out" }),
        start: "top 90%",
        once: true,
      });
    });
    return () => ctx.revert();
  }, []);

  /* ── Tech Parallax Hero ── */
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Array<{x:number;y:number;size:number;speedX:number;speedY:number;opacity:number;color:string}>>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener("resize", resize);

    if (particlesRef.current.length === 0) {
      for (let i = 0; i < 60; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width, y: Math.random() * canvas.height,
          size: Math.random() * 2 + 0.5, speedX: (Math.random() - 0.5) * 0.3,
          speedY: (Math.random() - 0.5) * 0.2, opacity: Math.random() * 0.4 + 0.1,
          color: Math.random() > 0.5 ? "105,68,255" : "68,221,255",
        });
      }
    }

    let raf: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const light = document.documentElement.classList.contains("light");
      const ps = particlesRef.current;
      ps.forEach(p => {
        p.x += p.speedX; p.y += p.speedY;
        if (p.x < 0) p.x = canvas.width; if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height; if (p.y > canvas.height) p.y = 0;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        const c = light ? "90,58,232" : p.color;
        ctx.fillStyle = `rgba(${c},${light ? p.opacity * 0.6 : p.opacity})`; ctx.fill();
      });
      const lc = light ? "90,58,232" : "105,68,255";
      for (let i = 0; i < ps.length; i++) {
        for (let j = i + 1; j < ps.length; j++) {
          const dx = ps[i].x - ps[j].x, dy = ps[i].y - ps[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath(); ctx.moveTo(ps[i].x, ps[i].y); ctx.lineTo(ps[j].x, ps[j].y);
            ctx.strokeStyle = `rgba(${lc},${(light ? 0.08 : 0.06) * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5; ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(animate);
    };
    animate();

    // Scroll parallax for grid, orbs, geos
    const handleScroll = () => {
      const s = window.scrollY;
      const progress = Math.min(1, s / window.innerHeight);
      const grid = document.getElementById("gridPlane");
      const orb1 = document.getElementById("glowOrb1");
      const orb2 = document.getElementById("glowOrb2");
      const orb3 = document.getElementById("glowOrb3");
      if (grid) { grid.style.backgroundPosition = `0 ${progress * 200}px`; grid.style.opacity = String(Math.max(0.3, 1 - progress * 0.7)); }
      if (orb1) orb1.style.transform = `translate(${progress * 60}px, ${progress * 40}px)`;
      if (orb2) orb2.style.transform = `translate(${-progress * 50}px, ${-progress * 30}px)`;
      if (orb3) orb3.style.transform = `translate(${progress * 30}px, ${-progress * 50}px) scale(${1 + progress * 0.3})`;
      document.querySelectorAll<HTMLElement>(".geo-shape").forEach((g, i) => {
        const speed = (i + 1) * 15;
        const rot = (i % 2 === 0 ? 1 : -1) * progress * 90;
        g.style.transform = `translateY(${-progress * speed}px) rotate(${rot + i * 20}deg)`;
        g.style.opacity = String(Math.max(0.1, 0.3 - progress * 0.3));
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); window.removeEventListener("scroll", handleScroll); };
  }, []);

  /* ── Horizontal drag scroll ── */
  const trackRef = useRef<HTMLDivElement>(null);
  const dragState = useRef({ isDown: false, startX: 0, scrollLeft: 0, wasDrag: false });

  const onPointerDown = (e: React.PointerEvent) => {
    const track = trackRef.current?.parentElement;
    if (!track) return;
    dragState.current = { isDown: true, startX: e.clientX, scrollLeft: track.scrollLeft, wasDrag: false };
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragState.current.isDown) return;
    const dx = e.clientX - dragState.current.startX;
    if (Math.abs(dx) > 6) dragState.current.wasDrag = true;
    const track = trackRef.current?.parentElement;
    if (track) track.scrollLeft = dragState.current.scrollLeft - dx;
  };
  const onPointerUp = () => { dragState.current.isDown = false; };
  const handleCardClick = (project: Project) => {
    if (dragState.current.wasDrag) return;
    setActiveProject(project);
  };

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* NAV */}
      <nav>
        <div className="logo">D<span>.</span>Petrov</div>
        <div className="nav-right">
          <ul>
            <li><a href="#projects" onClick={(e) => { e.preventDefault(); scrollTo("projects"); }}>Work</a></li>
            <li><a href="#timeline" onClick={(e) => { e.preventDefault(); scrollTo("timeline"); }}>Career</a></li>
            <li><a href="#contact" onClick={(e) => { e.preventDefault(); scrollTo("contact"); }}>Contact</a></li>
          </ul>
          <ThemeToggle />
        </div>
      </nav>

      {/* HERO */}
      <section className="hero" ref={heroRef}>
        <div className="hero-sky" />
        <div id="heroGrid" style={{ position: "absolute", bottom: 0, left: "-20%", width: "140%", height: "50%", zIndex: 2, perspective: 400, overflow: "hidden" }}>
          <div id="gridPlane" style={{ width: "100%", height: "200%", transform: "rotateX(65deg)", transformOrigin: "center top", backgroundImage: "linear-gradient(rgba(105,68,255,0.15) 1px,transparent 1px),linear-gradient(90deg,rgba(105,68,255,0.15) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />
        </div>
        <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, zIndex: 3, pointerEvents: "none" }} />
        <div style={{ position: "absolute", inset: 0, zIndex: 4, pointerEvents: "none", overflow: "hidden" }}>
          <div className="geo-shape" style={{ position: "absolute", top: "15%", left: "12%", width: 60, height: 60, border: "1px solid rgba(105,68,255,0.3)", borderRadius: "50%" }} />
          <div className="geo-shape" style={{ position: "absolute", top: "25%", right: "15%", width: 40, height: 40, border: "1px solid rgba(68,221,255,0.25)", transform: "rotate(45deg)" }} />
          <div className="geo-shape" style={{ position: "absolute", top: "60%", left: "8%", width: 80, height: 80, border: "1px solid rgba(255,107,157,0.2)", borderRadius: 12, transform: "rotate(20deg)" }} />
          <div className="geo-shape" style={{ position: "absolute", top: "20%", left: "70%", width: 50, height: 50, border: "1px solid rgba(105,68,255,0.2)", borderRadius: "50%" }} />
          <div className="geo-shape" style={{ position: "absolute", top: "70%", right: "10%", width: 35, height: 35, border: "1px solid rgba(68,221,255,0.2)", transform: "rotate(30deg)" }} />
        </div>
        <div id="glowOrb1" style={{ position: "absolute", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle,rgba(105,68,255,0.25) 0%,transparent 70%)", top: "-5%", right: "-5%", zIndex: 1, filter: "blur(60px)" }} />
        <div id="glowOrb2" style={{ position: "absolute", width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle,rgba(68,221,255,0.15) 0%,transparent 70%)", bottom: "20%", left: "-5%", zIndex: 1, filter: "blur(60px)" }} />
        <div id="glowOrb3" style={{ position: "absolute", width: 250, height: 250, borderRadius: "50%", background: "radial-gradient(circle,rgba(255,107,157,0.12) 0%,transparent 70%)", top: "40%", left: "40%", zIndex: 1, filter: "blur(60px)" }} />
        <div style={{ position: "absolute", inset: 0, zIndex: 5, pointerEvents: "none", background: "repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(255,255,255,0.01) 3px,rgba(255,255,255,0.01) 4px)" }} />
        <div className="hero-content">
          <img
            src={delianAvatar.src}
            alt="Delian Petrov"
            style={{
              width: 120, height: 120, borderRadius: "50%", objectFit: "cover",
              margin: "0 auto 16px", display: "block",
              border: "3px solid rgba(105,68,255,0.4)",
              boxShadow: "0 0 40px rgba(105,68,255,0.3)",
            }}
          />
          <div className="hero-badge">
            <span className="dot" />
            Currently building at Meta
          </div>
          <h1>Delian<br /><span className="accent">Petrov</span></h1>
          <p className="hero-sub">
            Senior Software Engineer crafting full-stack experiences with React, TypeScript, and modern web technologies.
          </p>
          <div className="hero-cta">
            <button className="btn-primary" onClick={() => scrollTo("contact")}>Get in Touch</button>
            <button className="btn-secondary" onClick={() => setResumeOpen(true)}>View Resume</button>
          </div>
        </div>
        <div className="scroll-indicator"><div className="scroll-line" /></div>
      </section>

      {/* STATS */}
      <section className="stats-section">
        <div className="stats-grid">
          {[
            { n: "11+", l: "Years Experience" },
            { n: "7", l: "Languages" },
            { n: "5", l: "Shipped Products" },
            { n: "3", l: "Spoken Languages" },
          ].map((s) => (
            <div className="stat-item" key={s.l}>
              <div className="stat-number">{s.n}</div>
              <div className="stat-label">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* PROJECTS */}
      <div id="projects">
        <div className="section-header">
          <div className="section-eyebrow">Selected Work</div>
          <h2 className="section-title">Projects that<br />shaped my craft</h2>
          <p className="section-desc">From AI-powered apps to cross-platform tools — each one pushed the boundaries of what I knew.</p>
        </div>
      </div>

      <section className="projects-wrapper">
        <div
          className="projects-track"
          ref={trackRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
        >
          {projects.map((p) => (
            <div className="project-card" key={p.key} onClick={() => handleCardClick(p)}>
              <div className="project-hero">
                <div
                  className="project-hero-inner"
                  style={{ backgroundImage: `url(${p.heroImage})` }}
                >
                  <div className="project-hero-overlay" style={{ background: p.gradient }} />
                </div>
              </div>
              <div className="project-body">
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                  <div>
                    <div className="project-tag">{p.tag}</div>
                    <div className="project-name">{p.title}</div>
                  </div>
                  <img
                    src={p.logo}
                    alt={p.title}
                    style={{ height: 36, objectFit: "contain", flexShrink: 0 }}
                  />
                </div>
                <div className="project-desc">{p.description}</div>
                <div className="project-techs">
                  {p.techs.map((t) => (<span className="tech-pill" key={t}>{t}</span>))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TIMELINE */}
      <div id="timeline">
        <div className="section-header">
          <div className="section-eyebrow">Career</div>
          <h2 className="section-title">The path so far</h2>
        </div>
      </div>

      <section className="timeline-section">
        <div className="timeline">
          {timeline.map((t, i) => (
            <div
              className={`timeline-item ${t.milestone ? "milestone" : ""} ${t.description ? "clickable" : ""}`}
              key={`${t.year}-${i}`}
              onClick={() => t.description && setActiveTimeline(t)}
            >
              <img
                className={`timeline-logo ${t.noBg ? "no-bg" : ""}`}
                src={t.logoSrc}
                alt={t.company}
              />
              <div className="timeline-year">{t.year}</div>
              <div className="timeline-role">{t.role}</div>
              <div className="timeline-company">{t.company}</div>
              {t.description && <span className="timeline-chevron">&#8250;</span>}
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <div>
        <div className="section-header">
          <div className="section-eyebrow">Testimonials</div>
          <h2 className="section-title">What people say</h2>
        </div>
      </div>

      <section className="testimonials-section">
        <div className="testimonials-track">
          {testimonials.map((t) => (
            <div className="testimonial-card" key={t.name}>
              <p className="testimonial-quote">{t.quote}</p>
              <div className="testimonial-author">
                <div className="testimonial-avatar">{t.initials}</div>
                <div>
                  <div className="testimonial-name">{t.name}</div>
                  <div className="testimonial-role">{t.role}</div>
                </div>
              </div>
              <div className="testimonial-context">{t.context}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section className="contact-section" id="contact">
        <div className="section-eyebrow" style={{ textAlign: "center" }}>Let&apos;s Connect</div>
        <h2 className="section-title" style={{ textAlign: "center", maxWidth: 700, margin: "0 auto" }}>
          Have something in mind?
        </h2>
        <div className="contact-card">
          <ContactForm />
        </div>
        <div className="social-links">
          <a href="https://github.com/delian7" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="GitHub"><FaGithub /></a>
          <a href="https://www.linkedin.com/in/delianpetrov" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="LinkedIn"><FaLinkedin /></a>
          <a href="https://codepen.io/delian7" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="CodePen"><FaCodepen /></a>
          <a href="mailto:hello@delianpetrov.com" className="social-link" aria-label="Email"><FaEnvelope /></a>
        </div>
      </section>

      <footer>Built by Delian Petrov &middot; &copy; 2026</footer>

      {/* MODAL */}
      <ProjectModal project={activeProject} onClose={closeModal} onScreenshotClick={openLightbox} />
      <ResumeModal open={resumeOpen} onClose={() => setResumeOpen(false)} />
      <TimelineModal entry={activeTimeline} onClose={() => setActiveTimeline(null)} />

      {/* LIGHTBOX */}
      {lightboxImages.length > 0 && (
        <Lightbox images={lightboxImages} index={lightboxIndex} onClose={closeLightbox} onNav={navLightbox} />
      )}
    </>
  );
}
