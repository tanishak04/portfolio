const config = {
  title: "Tanishak Mohan Katiyar | Developer",
  description: {
    long: "Explore the portfolio of Tanishak, an AI & ML Enthusiast, Front-End Developer, and Python Programmer. Discover my journey and projects leveraging cutting-edge technologies.",
    short:
      "Discover the portfolio of Tanishak Mohan Katiyar, an AI enthusiast and Front-End Developer.",
  },
  keywords: [
    "Tanishak",
    "Tanishak Mohan Katiyar",
    "portfolio",
    "developer",
    "AI",
    "ML",
    "Front-End",
    "Coding Ducks",
    "The Booking Desk",
    "Ghostchat",
    "web design",
    "GSAP",
    "React",
    "Next.js",
    "Spline",
    "Framer Motion",
  ],
  author: "Tanishak Mohan Katiyar",
  email: "mohantanishak@gmail.com",
  site: "https://tanishakmohan.com",

  // for github stars button
  githubUsername: "tanishakmohan04",
  githubRepo: "3d-portfolio",

  get ogImg() {
    return this.site + "/assets/seo/og-image.png";
  },
  social: {
    twitter: "https://x.com/Tanishakmohan",
    linkedin: "https://www.linkedin.com/in/tanishakmohan04",
    instagram: "https://www.instagram.com",
    facebook: "https://www.facebook.com",
    github: "https://github.com/tanishakmohan04",
  },
};
export { config };
