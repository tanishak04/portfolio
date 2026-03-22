"use client";

import React, { useState, useEffect, useRef } from "react";
import emailjs from "@emailjs/browser";
import { useTheme } from "next-themes";
import { Plus } from "lucide-react";
import Image from "next/image";

import { CustomThemeToggle } from "@/components/CustomThemeToggle";
import { NeuralNetwork } from "@/components/NeuralNetwork";

import { LoadingScreen } from "@/components/LoadingScreen";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function PortfolioPage() {
  const [openAccordion, setOpenAccordion] = useState<number | null>(1);
  const [openProject, setOpenProject] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const contactFormRef = useRef<HTMLFormElement>(null);

  // Scroll reveal refs
  const heroTitleRef = useScrollReveal<HTMLHeadingElement>({ delay: 100 });
  const heroSubRef = useScrollReveal<HTMLHeadingElement>({ delay: 300 });
  const bioRef = useScrollReveal<HTMLDivElement>({ delay: 200 });
  const certsRef = useScrollReveal<HTMLElement>({ delay: 100 });
  const journeyTitleRef = useScrollReveal<HTMLDivElement>({ delay: 100 });
  const servicesTitleRef = useScrollReveal<HTMLHeadingElement>({ delay: 100 });
  const servicesBodyRef = useScrollReveal<HTMLDivElement>({ delay: 250 });
  const contactTitleRef = useScrollReveal<HTMLHeadingElement>({ delay: 100 });
  const contactMeRef = useScrollReveal<HTMLHeadingElement>({ delay: 250 });
  const formRef = useScrollReveal<HTMLFormElement>({ delay: 200 });
  const footerInfoRef = useScrollReveal<HTMLDivElement>({ delay: 300 });

  return (
    <>
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      <div className="mx-auto min-h-screen bg-background text-foreground">

        {/* Fixed nav — top-left */}
        <nav
          style={{
            position: "fixed",
            top: "1.5rem",
            left: "1.5rem",
            display: "flex",
            gap: "1rem",
            zIndex: 100,
            fontFamily: "monospace",
            fontSize: "12px",
            textTransform: "uppercase",
          }}
        >
          <a href="#about" className="hover:underline text-foreground">ABOUT</a>
          <a href="#contact" className="hover:underline text-foreground">CONTACT</a>
        </nav>

        {/* Fixed toggle — top-right */}
        <CustomThemeToggle />

        {/* HEADER SECTION */}
        <header className="flex flex-col items-center gap-3 py-4 px-5 md:px-8 grid-border-b uppercase text-sm tracking-widest font-sans font-medium">
          <div className="text-center">TANISHAK MOHAN KATIYAR</div>
          <div className="flex items-center justify-center">
            <a
              href="https://drive.google.com/file/d/1TMEU7xTc_c7e8VnXCqBAmkGA7CqTV4EY/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full px-5 py-2 border border-foreground/40 hover:border-foreground hover:bg-foreground/5 transition-all duration-500"
              style={{ animation: 'pulse-glow 3s ease-in-out infinite', boxShadow: '0 2px 12px rgba(140,140,140,0.08)' }}
            >
              Download Résumé
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
            </a>
          </div>
        </header>

        {/* HERO SECTION */}
        <section className="flex flex-col items-center justify-center pt-16 md:pt-24 pb-16 px-5 md:px-8 grid-border-b text-center relative overflow-hidden">
          <h1 ref={heroTitleRef} className="text-5xl md:text-[9rem] font-display leading-[0.8] mb-4" style={{ letterSpacing: '-0.02em' }}>
            AI & ML <br className="md:hidden" />
            <span className="md:ml-4">DEVELOPER</span>
          </h1>
          <h2 ref={heroSubRef} className="text-5xl md:text-[9rem] font-display leading-[0.8] outline-text mb-12" style={{ letterSpacing: '-0.02em' }}>
            PORTFOLIO
          </h2>

          <div id="about" ref={bioRef} className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center max-w-4xl mx-auto px-8">
            <div className="w-48 h-48 md:w-64 md:h-64 border border-border relative overflow-hidden grayscale mx-auto" id="hero-portrait">
              <Image src="/pic.png" alt="Tanishak Mohan Katiyar" fill className="object-cover" />
            </div>
            <div className="text-left max-w-xs font-sans text-sm md:text-base leading-relaxed">
              Hi, I'm Tanishak — an AI & ML enthusiast, IEEE Member, Front-End Developer, and Python Programmer. Passionate about leveraging AI-driven technologies to build innovative solutions.
            </div>
          </div>
        </section>

        {/* MARQUEE */}
        <div className="grid-border-b py-3 overflow-hidden whitespace-nowrap bg-background">
          <div className="inline-flex animate-marquee">
            <span className="mx-4 text-lg font-bold tracking-widest uppercase inline-flex items-center gap-5"><span className="text-base leading-none">X</span> UPSKILLING AND PROJECTS</span>
            <span className="mx-4 text-lg font-bold tracking-widest uppercase inline-flex items-center gap-5"><span className="text-base leading-none">X</span> UPSKILLING AND PROJECTS</span>
            <span className="mx-4 text-lg font-bold tracking-widest uppercase inline-flex items-center gap-5"><span className="text-base leading-none">X</span> UPSKILLING AND PROJECTS</span>
            <span className="mx-4 text-lg font-bold tracking-widest uppercase inline-flex items-center gap-5"><span className="text-base leading-none">X</span> UPSKILLING AND PROJECTS</span>
            <span className="mx-4 text-lg font-bold tracking-widest uppercase inline-flex items-center gap-5"><span className="text-base leading-none">X</span> UPSKILLING AND PROJECTS</span>
            <span className="mx-4 text-lg font-bold tracking-widest uppercase inline-flex items-center gap-5"><span className="text-base leading-none">X</span> UPSKILLING AND PROJECTS</span>
            <span className="mx-4 text-lg font-bold tracking-widest uppercase inline-flex items-center gap-5"><span className="text-base leading-none">X</span> UPSKILLING AND PROJECTS</span>
            <span className="mx-4 text-lg font-bold tracking-widest uppercase inline-flex items-center gap-5"><span className="text-base leading-none">X</span> UPSKILLING AND PROJECTS</span>
            <span className="mx-4 text-lg font-bold tracking-widest uppercase inline-flex items-center gap-5"><span className="text-base leading-none">X</span> UPSKILLING AND PROJECTS</span>
            <span className="mx-4 text-lg font-bold tracking-widest uppercase inline-flex items-center gap-5"><span className="text-base leading-none">X</span> UPSKILLING AND PROJECTS</span>
            <span className="mx-4 text-lg font-bold tracking-widest uppercase inline-flex items-center gap-5"><span className="text-base leading-none">X</span> UPSKILLING AND PROJECTS</span>
            <span className="mx-4 text-lg font-bold tracking-widest uppercase inline-flex items-center gap-5"><span className="text-base leading-none">X</span> UPSKILLING AND PROJECTS</span>
            <span className="mx-4 text-lg font-bold tracking-widest uppercase inline-flex items-center gap-5"><span className="text-base leading-none">X</span> UPSKILLING AND PROJECTS</span>
            <span className="mx-4 text-lg font-bold tracking-widest uppercase inline-flex items-center gap-5"><span className="text-base leading-none">X</span> UPSKILLING AND PROJECTS</span>
            <span className="mx-4 text-lg font-bold tracking-widest uppercase inline-flex items-center gap-5"><span className="text-base leading-none">X</span> UPSKILLING AND PROJECTS</span>
            <span className="mx-4 text-lg font-bold tracking-widest uppercase inline-flex items-center gap-5"><span className="text-base leading-none">X</span> UPSKILLING AND PROJECTS</span>
          </div>
        </div>

        {/* PROJECT HIGHLIGHTS — Expandable Cards */}
        <section ref={certsRef} className="border-t border-foreground">
          {[
            {
              id: 'healthcare',
              title: 'HEALTHCARE RECOMMENDER SYSTEM',
              desc: 'AI-powered patient care suggestion engine leveraging machine learning algorithms for predictive healthcare recommendations.',
              tags: ['Scikit-learn', 'Flask', 'Python'],
              link: 'https://github.com/tanishak04/healthcare-recommender-system',
            },
            {
              id: 'jarvis',
              title: 'J.A.R.V.I.S.',
              desc: 'Voice-controlled AI assistant for hardware automation — a Python-powered system inspired by intelligent personal computing. (Under Development)',
              tags: ['NLP', 'Python', 'Hardware Automation'],
              link: '#',
            },
          ].map((project) => (
            <div key={project.id} className="border-b border-foreground">
              {/* Collapsed row */}
              <div
                className="flex justify-between items-center p-8 md:px-16 cursor-pointer select-none hover:bg-foreground/[0.03] transition-all duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)] group"
                onClick={() => setOpenProject(openProject === project.id ? null : project.id)}
              >
                <div className="flex items-center gap-6">
                  <span className="w-2 h-2 rounded-full bg-foreground/40 group-hover:bg-foreground transition-colors duration-300"></span>
                  <h3 className="text-sm md:text-2xl font-display uppercase tracking-tight leading-none">{project.title}</h3>
                </div>
                <Plus
                  size={20}
                  strokeWidth={1.5}
                  className={`transition-transform duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)] shrink-0 ml-4 ${openProject === project.id ? 'rotate-45' : 'group-hover:rotate-90'}`}
                />
              </div>
              {/* Expanded detail */}
              <div className={`overflow-hidden transition-all duration-[500ms] ease-[cubic-bezier(0.4,0,0.2,1)] ${openProject === project.id ? 'max-h-[500px]' : 'max-h-0'}`}>
                <div className="px-8 md:px-16 pb-8">
                  <p className="text-sm text-foreground/60 max-w-lg mb-6 font-sans leading-relaxed">
                    {project.desc}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag) => (
                      <span key={tag} className="px-3 py-1 border border-foreground text-[10px] uppercase tracking-widest">{tag}</span>
                    ))}
                  </div>
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] font-medium border-b border-foreground/30 pb-1 hover:border-foreground transition-colors duration-300">
                    View Project
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17L17 7M17 7H7M17 7v10"/></svg>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* PROCESS ACCORDION */}
        <section className="grid-border-b">
          <div ref={journeyTitleRef} className="py-12 px-8 md:px-16 text-center grid-border-b">
            <h2 className="text-6xl md:text-8xl font-display" style={{ letterSpacing: '-0.02em' }}>MY LEARNING</h2>
            <h2 className="text-6xl md:text-8xl font-display outline-text" style={{ letterSpacing: '-0.02em' }}>JOURNEY</h2>
          </div>
          <div className="flex flex-col font-sans uppercase">
            {[
              { id: 1, title: "EDUCATION", desc: "Bachelor of Technology in Computer Engineering from Galgotias College of Engineering and Technology, Greater Noida, UP, India (Oct 2024)." },
              { id: 2, title: "AI & ML", desc: "Hands-on experience with Generative AI, Prompt Engineering, ChatGPT, and Microsoft Copilot for building intelligent solutions." },
              { id: 3, title: "FRONT-END DEV", desc: "Proficient in HTML, CSS, and JavaScript for building compelling user interfaces and interactive web experiences." },
              { id: 4, title: "PYTHON", desc: "Core programming language for AI/ML prototyping, scripting, automation, and data-driven projects." },
              { id: 5, title: "DIGITAL MARKETING", desc: "Skills in content creation, communication strategy, and leveraging AI tools for marketing campaigns." },
              { id: 6, title: "IEEE MEMBER", desc: "Student member of the Institute of Electrical and Electronics Engineers (IEEE), actively engaged in the global tech community." },
            ].map((stage) => (
              <div
                key={stage.id}
                className="border-b border-foreground last:border-b-0 cursor-pointer select-none"
                onClick={() => setOpenAccordion(openAccordion === stage.id ? null : stage.id)}
              >
                <div className="flex justify-between items-center py-6 px-8 hover:bg-foreground/[0.03] transition-all duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)] group">
                  <div className="flex items-center gap-12 md:gap-24">
                    <span className="text-[11px] font-medium w-14 text-foreground/40 leading-none tracking-widest">PART {stage.id}</span>
                    <span className={`text-lg md:text-xl leading-none transition-all duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)] ${openAccordion === stage.id ? 'font-bold tracking-tight' : 'font-semibold tracking-tight group-hover:font-bold'}`}>{stage.title}</span>
                  </div>
                  <div className="ml-4">
                    <Plus
                      size={18}
                      strokeWidth={1.5}
                      className={`transition-transform duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)] ${openAccordion === stage.id ? 'rotate-45' : 'group-hover:rotate-90'}`}
                    />
                  </div>
                </div>
                <div className={`overflow-hidden transition-all duration-[500ms] ease-[cubic-bezier(0.4,0,0.2,1)] ${openAccordion === stage.id ? 'max-h-40' : 'max-h-0'}`}>
                  <div className="px-8 md:pl-[11rem] pr-8 pb-6 text-sm text-foreground/60 normal-case leading-relaxed max-w-3xl">
                    {stage.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SERVICES — Neural Network Background */}
        <section className="grid-border-b relative min-h-[500px] overflow-hidden">
          {/* Neural Network fills entire background */}
          <NeuralNetwork className="absolute inset-0 w-full h-full z-0" />

          {/* Content overlay — pointer-events-none on container, auto on interactive children */}
          <div className="relative z-10 p-5 md:p-16 flex flex-col items-center font-sans pointer-events-none">
            <div className="mb-12 text-center">
              <h2 ref={servicesTitleRef} className="text-3xl md:text-5xl font-display mb-2" style={{ letterSpacing: '-0.02em' }}>HOW <span className="outline-text">CAN</span> I HELP?</h2>
            </div>

            <div ref={servicesBodyRef} className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 text-xs md:text-sm leading-relaxed text-foreground/80 max-w-5xl text-justify">
              <p>I am an AI & ML enthusiast and Front-End Developer with a B.Tech in Computer Engineering. I specialize in leveraging generative AI tools like ChatGPT and Microsoft Copilot to drive productivity and innovation.</p>
              <p>I believe that technology, when applied strategically, can transform businesses. My focus is building AI-powered solutions, creating intuitive web experiences, and automating workflows through intelligent tools.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-xs uppercase tracking-widest font-medium max-w-5xl w-full mb-12">
              {/* Left column — Focus areas */}
              <div>
                <h4 className="border-b border-border pb-2 mb-6 inline-block text-[11px] tracking-[0.2em]">FOCUS AREAS</h4>
                <ul className="space-y-3 flex flex-col text-foreground/60">
                  <li>AI & Machine Learning</li>
                  <li>Front-End Development</li>
                  <li>Digital Marketing</li>
                  <li>Content Creation</li>
                  <li>Data Analysis</li>
                  <li>AI Productivity Hacks</li>
                </ul>
              </div>
              {/* Right column — Technical Expertise */}
              <div>
                <h4 className="border-b border-border pb-2 mb-6 inline-block text-[11px] tracking-[0.2em]">TECHNICAL EXPERTISE</h4>
                <ul className="space-y-3 flex flex-col text-foreground/60">
                  <li className="font-bold text-foreground/80">Python</li>
                  <li className="font-bold text-foreground/80">Generative AI</li>
                  <li className="font-bold text-foreground/80">NLP</li>
                  <li className="font-bold text-foreground/80">HTML / CSS / JS</li>
                  <li className="font-bold text-foreground/80">PyTorch / TensorFlow</li>
                  <li className="font-bold text-foreground/80">Flask</li>
                </ul>
              </div>
            </div>

            <div className="mb-8 text-center w-full max-w-5xl">
              <h2 className="text-2xl md:text-3xl font-display mb-2" style={{ letterSpacing: '-0.02em' }}>UPSKILLING & <span className="outline-text">CERTIFICATIONS</span></h2>
            </div>

            {/* KNOWLEDGE GRID — 3 columns */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-0 w-full max-w-5xl">
              {[
                { category: 'GENERATIVE AI', items: ['Career Essentials by Microsoft & LinkedIn'] },
                { category: 'ARTIFICIAL INTELLIGENCE', items: ['Introduction to Artificial Intelligence', 'What Is Generative AI?'] },
                { category: 'PROMPT ENGINEERING', items: ['Intro to Prompt Engineering for Gen AI', 'How to Talk to the AIs'] },
                { category: 'ETHICS & PRODUCTIVITY', items: ['Ethics in the Age of Generative AI', 'Gen AI Skills for Creative Content', 'AI Productivity Hacks for Workday'] },
                { category: 'COPILOT TOOLS', items: ['Copilot in PowerPoint', 'Excel with Copilot'] },
                { category: 'DATA ANALYSIS', items: ['Excel with Copilot: AI-Driven Data Analysis'] },
              ].map((card, idx) => (
                <div
                  key={idx}
                  className="border border-foreground/20 p-6 group cursor-default hover:bg-foreground hover:text-background transition-all duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)] pointer-events-auto"
                >
                  <h4 className="text-[11px] uppercase tracking-[0.2em] font-bold mb-4 text-foreground/80 group-hover:text-background/80 transition-colors duration-[400ms]">{card.category}</h4>
                  <ul className="space-y-2 text-[11px] uppercase tracking-widest text-foreground/50 group-hover:text-background/50 transition-colors duration-[400ms]">
                    {card.items.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FINAL CONTACT SECTION */}
        <footer id="contact" className="relative flex flex-col px-5 md:px-16 py-8 md:pt-20 md:pb-8">
          <h1 ref={contactTitleRef} className="text-6xl md:text-[10rem] font-display leading-[0.8]" style={{ letterSpacing: '-0.02em' }}>CONTACT</h1>

          <h1 ref={contactMeRef} className="text-6xl md:text-[10rem] font-display leading-[0.8] outline-text mb-2" style={{ letterSpacing: '-0.02em' }}>ME</h1>

          {/* Contact Form */}
          <form
            ref={contactFormRef}
            className="flex flex-col gap-5 font-sans max-w-2xl mt-8 mb-8"
            onSubmit={(e) => {
              e.preventDefault();
              if (formStatus === 'sending') return;
              setFormStatus('sending');
              emailjs.sendForm(
                'service_v37vg7i',
                'template_l99p59g',
                contactFormRef.current!,
                'TgtUYTN3-j3j462dn'
              ).then(() => {
                setFormStatus('sent');
                contactFormRef.current?.reset();
                setTimeout(() => setFormStatus('idle'), 5000);
              }).catch(() => {
                setFormStatus('error');
                setTimeout(() => setFormStatus('idle'), 4000);
              });
            }}
          >
            <h3 className="text-lg font-bold uppercase tracking-widest mb-2">Send a Message</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="from_name"
                placeholder="Your Name"
                required
                readOnly={formStatus === 'sending'}
                className={`w-full px-4 py-3 rounded-xl bg-transparent border border-border text-foreground placeholder:text-foreground/40 text-sm focus:outline-none focus:ring-2 focus:ring-foreground/20 transition-all duration-500 ${formStatus === 'sending' ? 'opacity-30 cursor-not-allowed' : ''}`}
              />
              <input
                type="email"
                name="reply_to"
                placeholder="Your Email"
                required
                readOnly={formStatus === 'sending'}
                className={`w-full px-4 py-3 rounded-xl bg-transparent border border-border text-foreground placeholder:text-foreground/40 text-sm focus:outline-none focus:ring-2 focus:ring-foreground/20 transition-all duration-500 ${formStatus === 'sending' ? 'opacity-30 cursor-not-allowed' : ''}`}
              />
            </div>

            <input
              type="text"
              name="subject"
              placeholder="Subject"
              readOnly={formStatus === 'sending'}
              className={`w-full px-4 py-3 rounded-xl bg-transparent border border-border text-foreground placeholder:text-foreground/40 text-sm focus:outline-none focus:ring-2 focus:ring-foreground/20 transition-all duration-500 ${formStatus === 'sending' ? 'opacity-30 cursor-not-allowed' : ''}`}
            />

            <textarea
              name="message"
              placeholder="Your Message"
              rows={5}
              required
              readOnly={formStatus === 'sending'}
              className={`w-full px-4 py-3 rounded-xl bg-transparent border border-border text-foreground placeholder:text-foreground/40 text-sm focus:outline-none focus:ring-2 focus:ring-foreground/20 transition-all duration-500 resize-none ${formStatus === 'sending' ? 'opacity-30 cursor-not-allowed' : ''}`}
            />

            {/* Morphing Submit Button */}
            <button
              type="submit"
              disabled={formStatus === 'sending'}
              className="self-start relative overflow-hidden flex items-center justify-center font-mono text-xs uppercase tracking-[0.25em] font-medium"
              style={{
                width: formStatus === 'sending' ? '48px' : formStatus === 'sent' ? '280px' : formStatus === 'error' ? '240px' : '220px',
                height: '48px',
                borderRadius: formStatus === 'sending' ? '50%' : '12px',
                border: formStatus === 'sent' ? '1px solid rgba(160,160,160,0.4)' : formStatus === 'error' ? '1px solid rgba(180,80,80,0.3)' : '1px solid rgba(160,160,160,0.3)',
                background: formStatus === 'sent' ? 'rgba(160,160,160,0.06)' : formStatus === 'error' ? 'rgba(180,80,80,0.06)' : 'transparent',
                color: formStatus === 'error' ? 'rgba(180,80,80,0.7)' : 'inherit',
                cursor: formStatus === 'sending' ? 'wait' : 'pointer',
                transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
            >
              {formStatus === 'sending' && (
                <div
                  className="w-5 h-5 rounded-full border-2 border-transparent"
                  style={{
                    borderTopColor: 'rgba(120,120,120,0.8)',
                    borderRightColor: 'rgba(120,120,120,0.25)',
                    animation: 'morph-spin 0.8s linear infinite',
                  }}
                />
              )}
              {formStatus === 'idle' && (
                <span className="flex items-center gap-2">
                  Send Message
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </span>
              )}
              {formStatus === 'sent' && (
                <span className="flex items-center gap-3">
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{
                      background: 'rgba(140,140,140,0.8)',
                      boxShadow: '0 0 6px rgba(140,140,140,0.4)',
                      animation: 'node-pulse 1.5s ease-in-out infinite',
                    }}
                  />
                  Sent Successfully
                </span>
              )}
              {formStatus === 'error' && (
                <span className="flex items-center gap-2">
                  Transmission Failed
                </span>
              )}
            </button>
          </form>

          {/* Socials & Contact — bottom */}
          <div ref={footerInfoRef} className="flex flex-row gap-16 text-sm uppercase tracking-widest border-t border-border pt-8 mb-8">
            <div className="flex flex-col gap-2 items-start">
              <span className="text-foreground/50 mb-2 font-bold">Socials</span>
              <a href="https://www.linkedin.com/in/tanishakmohan04" target="_blank" rel="noopener noreferrer" className="hover:text-foreground/70 transition-colors">LinkedIn</a>
              <a href="https://www.instagram.com/tanishak_mohan_katiyar?igsh=MTFzMWRrc3ZxZDNpYw==" target="_blank" rel="noopener noreferrer" className="hover:text-foreground/70 transition-colors">Instagram</a>
            </div>
            <div className="flex flex-col gap-2 items-start">
              <span className="text-foreground/50 mb-2 font-bold">Contact</span>
              <a href="tel:+916391297492" className="hover:text-foreground/70 transition-colors">+91 6391297492</a>
              <a href="mailto:mohantanishak@gmail.com" className="hover:text-foreground/70 transition-colors lowercase">mohantanishak@gmail.com</a>
            </div>
          </div>

          <div className="text-[10px] text-foreground/30 font-sans uppercase tracking-[0.2em] text-right">
            Tanishak Mohan Katiyar © 2026
          </div>
        </footer>



        {/* Keyframes inline for bespoke animations */}
        <style dangerouslySetInnerHTML={{
          __html: `
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        @keyframes spin-slow {
          100% { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 12s linear infinite;
        }
      `}} />
      </div>
    </>
  );
}
