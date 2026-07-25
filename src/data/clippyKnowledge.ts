/**
 * Cliply's knowledge base. Fully scripted, keyword-matched, client-side only —
 * no LLM calls, no network requests, nothing about the visitor is stored or sent
 * anywhere. Every answer below is a canned string; the "matching" is just
 * substring lookups against the phrase list, in priority order.
 */

interface ClippyIntent {
  id: string;
  phrases: string[];
  responses: string[];
}

const INTENTS: ClippyIntent[] = [
  {
    id: "greeting",
    phrases: ["hello", "hi ", "hi!", "hi?", "hey", "yo ", "howdy", "greetings", "sup"],
    responses: [
      "Hi there! I'm Cliply. Ask me about Delian's projects, his experience, or how to get in touch — or tap a suggestion below.",
    ],
  },
  {
    id: "thanks",
    phrases: ["thank", "thx", "appreciate", "cheers"],
    responses: ["Anytime! Anything else you'd like to know about Delian or his work?"],
  },
  {
    id: "bye",
    phrases: ["bye", "goodbye", "see ya", "later", "cya"],
    responses: ["See you around! Click my avatar anytime you have more questions."],
  },
  {
    id: "cliply-identity",
    phrases: ["who are you", "what are you", "your name", "cliply", "clippy"],
    responses: [
      "I'm Cliply, a small scripted guide living in the corner of this site — no AI model, no data collection, just canned answers about Delian and his work. Try asking about his projects, experience, or how to reach him.",
    ],
  },
  {
    id: "about-delian",
    phrases: ["who is delian", "about delian", "tell me about him", "who made this site", "who built this"],
    responses: [
      "Delian Petrov is a Senior Software Engineer with 11+ years of experience, currently on Meta's Monetization team. He's shipped 6 products across fintech, AI, e-commerce, and mobile — full stack, from React/TypeScript front ends to Rails and serverless back ends.",
    ],
  },
  {
    id: "current-job",
    phrases: [" meta ", " meta.", " meta,", " meta?", " meta!", "facebook", "messenger", "current job", "where does he work", "works now", "job now"],
    responses: [
      "Delian is a Senior Software Engineer on Meta's Monetization team. He's shipped AI-driven upsell flows for Facebook and Messenger (iOS & Android) and built the paygating feature that limits link-sharing in posts — covered by BBC News, TechCrunch, and Engadget. He joined after 73 companies and ~200 interviews over 6 months.",
    ],
  },
  {
    id: "project-spx",
    phrases: ["spx", "iron condor", "trading dashboard", "options trading", "schwab"],
    responses: [
      "SPX Iron Condor Dashboard: a personal trading tool with a live Schwab options chain, a market-condition score from VIX/IV rank and trend, a P&L payoff diagram, and FOMC/CPI/NFP events mapped onto the expiration calendar. Built with React, TypeScript, and Chart.js. Click the card in the Projects section for the full writeup.",
    ],
  },
  {
    id: "project-fridgeguide",
    phrases: ["fridgeguide", "fridge guide", "fridge", "grocery", "recipe", "food pantry", "ai for good"],
    responses: [
      "FridgeGuide AI: started as a consumer app that tracked groceries and generated recipes, then pivoted into a B2B tool for food pantries — inventory, expiration tracking, and meal planning. Delian was Principal Software Engineer, using ChatGPT streaming for real-time voice and receipt scanning. It was showcased at the UN AI for Good Global Summit.",
    ],
  },
  {
    id: "project-seastatus",
    phrases: ["seastatus", "sea status", "marine weather", "sofar"],
    responses: [
      "SeaStatus: an iOS marine-weather app Delian co-founded and led engineering for. MVP shipped in 4 months, grew 290% to 2.9K monthly active users, won $25K at the Xprize Big Ocean Button Challenge, and was eventually acquired by Sofar Ocean Technologies.",
    ],
  },
  {
    id: "project-visage",
    phrases: ["visage", "design tool", "brand creation"],
    responses: [
      "Visage: a web-based brand creation and visualization tool with drag-and-drop design, templates, and PNG/PDF export. Delian worked as a Full Stack Engineer on it — it was adopted by LinkedIn offices in the US, UK, and India for workforce reporting.",
    ],
  },
  {
    id: "project-metrogroup",
    phrases: ["metrogroup", "metro group", "realty finance", "amcharts"],
    responses: [
      "MetroGroup Realty Finance: a financial reporting pipeline Delian built with AWS Lambda pulling from Google Sheets and rendering interactive AmCharts on the front end — serverless, so it stayed cheap and easy to maintain.",
    ],
  },
  {
    id: "project-wanderful",
    phrases: ["wanderful", "tanzania", "safari", "woocommerce"],
    responses: [
      "WanderfulTanzania: a safari tour company's WordPress site where Delian is webmaster. He built a custom plugin bridging WooCommerce with Stripe to support flexible payment plans for high-value safari bookings.",
    ],
  },
  {
    id: "projects-general",
    phrases: ["project", "portfolio", "what has he built", "what did he build", "work he's done", "his work"],
    responses: [
      "Delian has shipped 6 products: the SPX Iron Condor Dashboard, FridgeGuide AI, SeaStatus, MetroGroup Realty Finance, Visage, and WanderfulTanzania. Ask me about any of them by name, or scroll down to the Projects section to see them all.",
    ],
  },
  {
    id: "experience",
    phrases: ["experience", "career", "timeline", "work history", "companies", "background"],
    responses: [
      "Delian's career: Meta (2025, Senior SWE) → FridgeGuide AI (2024, Co-Founder) → SalonInteractive (2022) → Cryoport (2020) → LegalShield (2018) → SeaStatus (2016, Co-Founder) → Visage (2015). He graduated from UC Irvine with a B.S. in Informatics in 2015. Click any entry in the Career section for the full story.",
    ],
  },
  {
    id: "education",
    phrases: ["education", "degree", "college", "university", "uci", "school", "informatics"],
    responses: [
      "Delian holds a B.S. in Informatics (Minor in Management) from UC Irvine, graduating in 2015. He was also a Google Student Ambassador there in 2014.",
    ],
  },
  {
    id: "skills",
    phrases: ["skills", "tech stack", "technologies", "languages", "stack", "what can he do"],
    responses: [
      "Across his career Delian's worked with React, TypeScript, Ruby on Rails, React Native, AWS (Lambda, S3), Google Cloud, GraphQL, Elastic Search, Stripe, and more — full stack, from mobile apps to serverless backends. He speaks 7 programming languages and 3 spoken languages.",
    ],
  },
  {
    id: "resume",
    phrases: ["resume", "cv ", "download resume"],
    responses: [
      "You can view or download Delian's resume — click \"View Resume\" near the top of the page, or scroll up to the hero section.",
    ],
  },
  {
    id: "contact",
    phrases: ["contact", "hire", "email", "reach", "freelance", "recruit", "get in touch", "work with him", "hiring"],
    responses: [
      "Best way to reach Delian is the contact form at the bottom of this page, or hello@delianpetrov.com. He's also on GitHub (@delian7), LinkedIn, and CodePen — links are in the footer.",
    ],
  },
  {
    id: "social",
    phrases: ["github", "linkedin", "codepen", "social link", "social media"],
    responses: [
      "GitHub: github.com/delian7 · LinkedIn: linkedin.com/in/delianpetrov · CodePen: codepen.io/delian7 — all linked as icons in the Contact section at the bottom of the page.",
    ],
  },
  {
    id: "testimonials",
    phrases: ["testimonial", "reference", "recommend", "said about him", "review"],
    responses: [
      "Colleagues from Meta, SalonInteractive, LegalShield, and Visage have called out Delian's technical strength, communication, and ability to bridge business needs with engineering. Scroll to the Testimonials section to read them.",
    ],
  },
  {
    id: "joke",
    phrases: ["joke", "fun fact", "something fun", "tell me a joke"],
    responses: [
      "Fun fact: Delian joined Meta after 73 companies and roughly 200 interviews over 6 months. That's less a job search and more a boss fight.",
    ],
  },
  {
    id: "help",
    phrases: ["help", "what can you do", "commands", "options"],
    responses: [
      "I can tell you about Delian's projects, his career/experience, his skills, his education, or how to contact him. Try tapping one of the suggestion chips below, or just type a question.",
    ],
  },
];

const FALLBACK_RESPONSES = [
  "I don't have a scripted answer for that one — I only know about Delian's projects, experience, skills, and contact info. Try one of the suggestions below!",
];

export const CLIPPY_SUGGESTIONS = [
  "Tell me about his projects",
  "What's his experience?",
  "What are his skills?",
  "How do I contact him?",
  "What's the weather?",
];

function pick(responses: string[]): string {
  return responses[Math.floor(Math.random() * responses.length)];
}

export function getClippyResponse(message: string): string {
  const normalized = ` ${message.toLowerCase().trim()} `;
  for (const intent of INTENTS) {
    if (intent.phrases.some((phrase) => normalized.includes(phrase))) {
      return pick(intent.responses);
    }
  }
  return pick(FALLBACK_RESPONSES);
}
