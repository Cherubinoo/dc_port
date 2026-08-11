"use client";

import React, { useEffect } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@dc/backend/convex/_generated/api";

import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import PersonalProjects from "@/components/PersonalProjects";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import Footer from "@/components/Footer";

const DEFAULT_PROFILE = {
  name: "Delight Cherubino",
  role: "President, Neoteric AI Association",
  bio: "I’m Delight Cherubino, an Artificial Intelligence and Data Science student at Ramco Institute of Technology, with a strong focus on building real-world, scalable AI solutions. I currently serve as the President of the Neoteric AI Association.",
  vision: "My long-term goal is to build impactful technology solutions that solve real problems at scale. I aim to contribute to the development of intelligent systems that make processes smarter, faster, and more efficient.",
  current_focus: "Building scalable AI-driven platforms, student-centric tools, and real-time computer vision systems.",
  leadership: "President of the Neoteric AI Association @ Ramco Institute of Technology. Mentoring students, organizing workshops, and driving project innovation.",
  email: "delightcherubino@gmail.com",
  phone: "+91 82207 89878",
  github: "https://github.com/Cherubinoo",
  linkedin: "https://www.linkedin.com/in/delight-cherubino-bb8456291/",
  resume: "/resume/delightcherubinoI.pdf",
  hero_image: "/images/1.jpg"
};

const DEFAULT_PROJECTS = [
  {
    _id: "p1",
    title: "Safety Gear Monitoring",
    company: "The Ramco Cements Limited",
    category: "work",
    award_name: "1st Prize - INNOVANZA 2025 Hackathon",
    award_link: "https://www.linkedin.com/posts/delight-cherubino-bb8456291_hackathon-ai-ml-activity-7371875149031198721-Cx8f",
    description: "Awarded 1st Prize at INNOVANZA 2025 Hackathon! A comprehensive CV + ML + Microcontroller Industry Safety System designed for real-time monitoring and hazard prevention. Developed in collaboration with Subbhra Yashwanth kanth P, featuring YOLOv8-powered object detection.",
    tech_stack: ["Python", "YOLOv8", "OpenCV", "Microcontrollers", "ML"],
    live_link: "https://www.linkedin.com/posts/delight-cherubino-bb8456291_ai-computervision-yolov8-activity-7358112735206821888-AYKt",
    github_link: "https://github.com/Cherubinoo/kamarajar-college",
    image: "/images/2.jpg",
    is_ongoing: false
  },
  {
    _id: "p2",
    title: "AI Question Generator",
    company: "Ramco Vidya Mandir School",
    category: "work",
    description: "Developed specifically for Ramco Vidya Mandir Senior Secondary School (Ariyalur), this automated tool leverages NLP to generate structured CBSE examination papers from textbook content.",
    tech_stack: ["FastAPI", "OpenAI API", "React", "PDFMiner"],
    github_link: "https://github.com/Cherubinoo/CBSE_GENERATION",
    is_ongoing: false
  },
  {
    _id: "p3",
    title: "Cement Bag Detection",
    company: "The Ramco Cements Limited",
    category: "work",
    description: "Developed specifically for industrial logistics, this system automates the counting and detection of cement bags on conveyor belts using custom-trained YOLOv8 models.",
    tech_stack: ["Python", "YOLOv8", "OpenCV", "FastAPI"],
    is_ongoing: false
  },
  {
    _id: "p4",
    title: "Code2Day",
    company: "Replica Ecosystem",
    category: "personal",
    description: "A collaborative coding platform designed for daily practice and skill building.",
    tech_stack: ["React", "Node.js", "Socket.io", "PostgreSQL"],
    live_link: "https://code2day.ramcoad.com",
    github_link: "http://github.com/Cherubinoo/code2day/tree/main",
    is_ongoing: true
  },
  {
    _id: "p5",
    title: "Student Project Hosting",
    company: "Replica Ecosystem",
    category: "personal",
    description: "An automated hosting solution specifically designed for student developers.",
    tech_stack: ["Docker", "Nginx", "Python", "Cloudflare"],
    is_ongoing: true
  },
  {
    _id: "p6",
    title: "Document Extraction",
    company: "Igress Solutions LLP",
    category: "personal",
    description: "OCR-based document extraction pipeline integrated with language models to extract structured data from business documents.",
    tech_stack: ["FastAPI", "Tesseract", "Transformers", "Python"],
    is_ongoing: false
  },
  {
    _id: "p7",
    title: "Sentiment Analysis",
    company: "Academic Project",
    category: "personal",
    description: "Machine learning based sentiment analysis system designed to process and categorize emotional tones in large-scale text data.",
    tech_stack: ["Python", "NLTK", "Scikit-learn", "Flask"],
    is_ongoing: false
  }
];

const DEFAULT_SKILLS = [
  { _id: "s1", name: "Python", category: "Backend", proficiency: 95 },
  { _id: "s2", name: "Computer Vision (YOLOv8)", category: "AI & ML", proficiency: 92 },
  { _id: "s3", name: "Machine Learning", category: "AI & ML", proficiency: 90 },
  { _id: "s4", name: "FastAPI", category: "Backend", proficiency: 88 },
  { _id: "s5", name: "OCR Pipelines", category: "AI & ML", proficiency: 85 },
  { _id: "s6", name: "Next.js / React", category: "Frontend", proficiency: 90 },
  { _id: "s7", name: "Real-time System Architecture", category: "System Design", proficiency: 85 },
  { _id: "s8", name: "Convex / PostgreSQL", category: "Backend", proficiency: 88 },
];

const DEFAULT_EXPERIENCES = [
  {
    _id: "e1",
    title: "President – Neoteric AI Association",
    company: "Ramco Institute of Technology",
    duration: "Aug 2025 – Present",
    description: "• Leading technical initiatives and coordinating activities within the Neoteric AI Association\n• Mentoring students in project development, AI concepts, and implementation strategies\n• Organizing workshops, technical events, and collaborative sessions\n• Driving innovation by encouraging real-world problem-solving among peers",
    is_academic: false
  },
  {
    _id: "e2",
    title: "AI & ML Lead",
    company: "Google Developer Groups on Campus - RIT",
    duration: "Oct 2025 – Present",
    description: "• Leading AI & ML initiatives, organizing technical sessions, and building a vibrant community of developer peers on campus.",
    is_academic: false
  },
  {
    _id: "e3",
    title: "Intern",
    company: "The Ramco Cements Limited",
    duration: "May 2024 – Aug 2024",
    description: "• Developed human detection project using AI with Python and computer vision libraries.\n• Contributed to data cleaning process in water analysis project.\n• Assisted in setting up an automated system to track water extraction and consumption.",
    is_academic: false
  },
  {
    _id: "e4",
    title: "Project Intern",
    company: "Igress Solutions LLP",
    duration: "Nov 2023 – Dec 2023",
    description: "• Collaborated with team members to analyze AWS telemetry data.\n• Implemented custom data visualization techniques for operational dashboards.",
    is_academic: false
  },
  {
    _id: "e5",
    title: "AI Developer",
    company: "Independent / Academic Projects",
    duration: "Ongoing",
    description: "• Designed and developed multiple AI-based systems focused on real-world industrial applications.\n• Built computer vision solutions using YOLOv8.\n• Developed high-throughput backend services using FastAPI & Next.js.",
    is_academic: true
  }
];

export default function Home() {
  const profile = useQuery(api.portfolio.getProfile);
  const projects = useQuery(api.portfolio.getProjects, {});
  const skills = useQuery(api.portfolio.getSkills);
  const experiences = useQuery(api.portfolio.getExperiences);
  const seedData = useMutation(api.seed.seedData);

  // Auto-seed if Convex is connected and empty
  useEffect(() => {
    if (profile === null && projects && projects.length === 0 && seedData) {
      seedData().catch((err: any) => console.error("Error auto-seeding portfolio:", err));
    }
  }, [profile, projects, seedData]);

  const activeProfile = profile || DEFAULT_PROFILE;
  const activeProjects = projects && projects.length > 0 ? projects : DEFAULT_PROJECTS;
  const activeSkills = skills && skills.length > 0 ? skills : DEFAULT_SKILLS;
  const activeExperiences = experiences && experiences.length > 0 ? experiences : DEFAULT_EXPERIENCES;

  return (
    <div className="min-h-screen bg-[#0a0c10] text-slate-100 selection:bg-blue-600 selection:text-white">
      <Navigation resumeUrl={activeProfile?.resume} />
      <Hero profile={activeProfile} />
      <About profile={activeProfile} />
      <Projects projects={activeProjects as any} />
      <PersonalProjects projects={activeProjects as any} />
      <Experience experiences={activeExperiences as any} />
      <Skills skills={activeSkills as any} />
      <Footer profile={activeProfile} />
    </div>
  );
}
