import React, { useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import {
  Moon,
  Sun,
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Download,
  ExternalLink
} from 'lucide-react';
import './Resume.css';

const Resume = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.body.className = darkMode ? 'dark-theme' : 'light-theme';
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <div className="resume-container">
      {/* Dark Mode Toggle */}
      <motion.button
        onClick={toggleDarkMode}
        className="theme-toggle"
        whileHover={{ scale: 1.1, rotate: 180 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        {darkMode ? (
          <Sun className="icon sun-icon" />
        ) : (
          <Moon className="icon moon-icon" />
        )}
      </motion.button>

      {/* Download Button */}
      <motion.button
        className="download-btn"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        onClick={() => window.print()}
      >
        <Download className="icon" />
        Download
      </motion.button>

      <div className="resume-content">
        <Header />

        <div className="main-grid">
          <div className="left-column">
            <ContactInfo />
            <Skills />
            <Languages /> {/* Languages component is now active */}
            <ExtracurricularActivities /> {/* Extracurricular Activities section added below Languages */}
          </div>

          <div className="right-column">
            <Experience /> {/* Renamed from Internships in previous step to Experience as per user provided code in this turn*/}
            <Education />
            <Projects />
            <Achievements/> {/* Achievements section added */}
          </div>
        </div>
      </div>
    </div>
  );
};

// Animated Section Component
const AnimatedSection = ({ children, delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.div>
  );
};

// Header Component
const Header = () => (
  <AnimatedSection>
    <motion.div
      className="header-section"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.2 }}
        className="profile-avatar"
      >
        AP
      </motion.div>

      <motion.h1
        className="name"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        Agnibha Pal
      </motion.h1>

      <motion.p
        className="title"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        Computer Engineering Student
      </motion.p>

      <motion.p
        className="description"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        A highly motivated and fast learner with a strong foundation in programming. Proficient in various programming
        languages with a proven ability to quickly adapt to new technologies and environments. Demonstrates excellent
        problem-solving skills and a keen interest in continuous learning and professional development
      </motion.p>
    </motion.div>
  </AnimatedSection>
);

// Contact Info Component
const ContactInfo = () => (
  <AnimatedSection delay={0.2}>
    <div className="card contact-card">
      <h3 className="card-title">Contact</h3>

      {[
        { icon: Mail, text: "agnibha.blaze@gmail.com", href: "mailto:agnibha.blaze@gmail.com" },
        { icon: Phone, text: "+91 7044389562", href: "tel:+(91) 7044389562" },
        { icon: MapPin, text: "Bhubaneshwar, Odisha" },
        { icon: Github, text: "Take A Look", href: "https://github.com/Flyingsunshine" },
        { icon: Linkedin, text: "Connect With Me", href: "https://www.linkedin.com/feed/" }
      ].map((item, index) => (
        <motion.div
          key={index}
          className="contact-item"
          whileHover={{ x: 5 }}
          transition={{ duration: 0.2 }}
        >
          <item.icon className="contact-icon" />
          {item.href ? (
            <a href={item.href} className="contact-link" target="_blank" rel="noopener noreferrer">
              {item.text}
              <ExternalLink className="external-icon" />
            </a>
          ) : (
            <span className="contact-text">{item.text}</span>
          )}
        </motion.div>
      ))}
    </div>
  </AnimatedSection>
);

// Skills Component
const Skills = () => {
  const skills = [
    { name: "C/C++", level: 95 },
    { name: "JAVA", level: 95 },
    { name: "Python", level: 95 },
    { name: "SQL", level: 80 },
    { name: "React", level: 85 },
    { name: "Data Structures & Algorithms", level: 90 },
    { name: "HTML", level: 90 },
    { name: "CSS", level: 85 },
    { name: "Node Js", level: 75 },
    { name: "Express Js", level: 75}
  ];

  return (
    <AnimatedSection delay={0.4}>
      <div className="card skills-card">
        <h3 className="card-title">Skills</h3>

        {skills.map((skill, index) => (
          <motion.div
            key={index}
            className="skill-item"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * index }}
          >
            <div className="skill-header">
              <span className="skill-name">{skill.name}</span>
              <span className="skill-percentage">{skill.level}%</span>
            </div>
            <div className="skill-bar">
              <motion.div
                className="skill-progress"
                initial={{ width: 0 }}
                animate={{ width: `${skill.level}%` }}
                transition={{ duration: 1, delay: 0.2 * index }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </AnimatedSection>
  );
};

// Languages Component
const Languages = () => (
  <AnimatedSection delay={0.6}>
    <div className="card">
      <h3 className="card-title">Languages</h3>

      {[
        { lang: "English", level: "Native" },
        { lang: "Bengali", level: "Native" },
        { lang: "Hindi", level: "Fluent" }
      ].map((item, index) => (
        <motion.div
          key={index}
          className="language-item"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <span className="language-name">{item.lang}</span>
          <span className="language-level">{item.level}</span>
        </motion.div>
      ))}
    </div>
  </AnimatedSection>
);

// Experience Component
const Experience = () => {
  const experiences = [
    {
      title: "Python Full Stack Developer Intern",
      company: "AICTE Eduskills",
      period: "Oct - Dec 2024",
      description: "Successfully completed a 10-week virtual internship in Python Full Stack Development. Developed skills in Python, Django, and React.",
      achievements: ["Achieved an ’O’ (Outstanding) grade for performance"]
    },
    {
      title: "Full Stack Developer",
      company: "Alienity Technologies",
      period: "May - July 2025",
      description: "Successfully completed an eight-week summer internship on Full-stack Development (MERN) under Alienity Technologies OverTech Program",
      achievements: ["Built a web application using Node, Express and React", "Gained hands-on experience in MongoDB and RESTful APIs", "Collaborated with a team to enhance application features and performance"]
    }
  ];

  return (
    <AnimatedSection delay={0.3}>
      <div className="card experience-card">
        <h3 className="section-title">Experience</h3>

        {experiences.map((exp, index) => (
          <motion.div
            key={index}
            className="experience-item"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 * index }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="experience-content">
              <h4 className="experience-title">{exp.title}</h4>
              <p className="experience-company">{exp.company}</p>
              <p className="experience-period">{exp.period}</p>
              <p className="experience-description">{exp.description}</p>

              <ul className="achievement-list">
                {exp.achievements.map((achievement, i) => (
                  <motion.li
                    key={i}
                    className="achievement-item"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + (i * 0.1) }}
                  >
                    {achievement}
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </AnimatedSection>
  );
};

// Education Component
const Education = () => (
  <AnimatedSection delay={0.5}>
    <div className="card">
      <h3 className="section-title">Education</h3>

      <motion.div
        whileHover={{ scale: 1.02 }}
        className="education-item"
      >
        <h4 className="education-title">Bachelor of Technology in Computer Science and Engineering</h4>
        <p className="education-school">Kalinga Institue of Industrial Technology</p>
        <p className="education-period">2022 - 2026</p>
        <p className="education-gpa">SGPA: 9.50/10.0</p>
        <p className="education-gpa">CGPA: 8.26/10.0</p>
        <h4 className="education-title">Schooling:</h4>
        <p className="education-school">South Point School</p>
        <p className="education-period">2007 - 2021</p>
        <p className="education-score">Class 10: 92.8%(2020)</p>
        <p className="education-score">Class 12: 71.9%(2022)</p>
      </motion.div>
    </div>
  </AnimatedSection>
);

// Projects Component
const Projects = () => {
  const projects = [
    {
      name: "Size Matters: Clothing Size Recommendation System",
      description: "Developed a user-friendly application for clothing size recommendations based on body type, eliminating the need for precise measurements Features visual body type selection, personalized size and style tips across multiple clothing categories, and an intuitive user interface.",
      tech: ["Python", "SQL", "Machine Learning", "Flask"],
      link: "https://github.com/Flyingsunshine/Size_matters.git"
    },
    {
      name: "SPRINT BACKLOG PRIORITIZATION IN SOFTWARE DEVELOPMENT",
      description: "Developed and implemented ML models to predict sprint backlog priority based on business value, complexity, and dependencies. Increased sprint planning accuracy by integrating multiple data points and automated analysis, reducing manual prioritization effort by 40%.",
      tech: ["HTML", "CSS", "JS", "Python", "Flask", "Machine Learning"],
      link: "https://github.com/Flyingsunshine/Software-Project-Management"
    }
  ];

  return (
    <AnimatedSection delay={0.7}>
      <div className="card">
        <h3 className="section-title">Projects</h3>

        {projects.map((project, index) => (
          <motion.div
            key={index}
            className="project-item"
            whileHover={{ scale: 1.02, y: -2 }}
            transition={{ duration: 0.2 }}
          >
            <div className="project-header">
              <h4 className="project-name">{project.name}</h4>
              <a href={project.link} className="project-link" target="_blank" rel="noopener noreferrer">
                <ExternalLink className="icon" />
              </a>
            </div>

            <p className="project-description">{project.description}</p>

            <div className="tech-stack">
              {project.tech.map((tech, i) => (
                <motion.span
                  key={i}
                  className="tech-tag"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.1 }}
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </AnimatedSection>
  );
};

// ExtracurricularActivities Component
const ExtracurricularActivities = () => (
  <AnimatedSection delay={0.8}>
    <div className="card">
      <h3 className="card-title">Extracurricular Activities</h3>

      <ul className="extras-list">
        <motion.li
          className="extras-item"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          Swimming
        </motion.li>
        <motion.li
          className="extras-item"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          Table Tennis
        </motion.li>
        <motion.li
          className="extras-item"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          Point Of Contact Youth Red Cross (KIIT)
        </motion.li>
      </ul>
    </div>
  </AnimatedSection>
);
// Achievements Component
const Achievements = () => {
  const achievementsList = [
    {
      name: "Introduction to Cloud Computing",
      issuer: "IBM / Coursera",
      date: "Jun 20, 2025",
      verifyLink: "https://www.credly.com/badges/b582ed46-851a-4a70-96ef-1fd3bdba9c97"
    },
    {
      name: "Introduction to DevOps",
      issuer: "IBM / Coursera",
      date: "Jun 18, 2025",
      verifyLink: "https://www.credly.com/badges/591eb27a-0c77-4885-9060-6cc74eae5142"
    }
  ];

  return (
    <AnimatedSection delay={0.9}> {/* Adjust delay as needed */}
      <div className="card achievements-card">
        <h3 className="section-title">Achievements</h3>
        {achievementsList.map((achievement, index) => (
          <motion.div
            key={index}
            className="achievement-item-card" /* Using a new class name to avoid conflict with existing 'achievement-item' */
            whileHover={{ scale: 1.02, y: -2 }}
            transition={{ duration: 0.2 }}
          >
            <h4 className="achievement-name">{achievement.name}</h4>
            <p className="achievement-issuer">{achievement.issuer}</p>
            <p className="achievement-date">Issued on: {achievement.date}</p>
            <a href={achievement.verifyLink} className="achievement-verify-link" target="_blank" rel="noopener noreferrer">
              Verify Credential <ExternalLink className="icon external-icon" />
            </a>
          </motion.div>
        ))}
      </div>
    </AnimatedSection>
  );
};

export default Resume;