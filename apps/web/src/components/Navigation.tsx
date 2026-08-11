"use client";

import React from "react";
import StaggeredMenu, { type MenuItem, type SocialItem } from "./StaggeredMenu";

interface NavigationProps {
  resumeUrl?: string;
}

const sanitizeResumeUrl = (url?: string) => {
  if (!url || url.includes("drive.google.com") || (url.startsWith("http") && !url.includes("delightcherubino"))) {
    return "/delightcherubinoI.pdf";
  }
  return url;
};

export default function Navigation({ resumeUrl }: NavigationProps) {
  const activeResume = sanitizeResumeUrl(resumeUrl);

  const menuItems: MenuItem[] = [
    { label: "Home", ariaLabel: "Go to home section", link: "#home" },
    { label: "About", ariaLabel: "About Delight Cherubino", link: "#about" },
    { label: "Work", ariaLabel: "Selected Case Studies", link: "#work" },
    { label: "Projects", ariaLabel: "Digital Crafts", link: "#personal-projects" },
    { label: "Journey", ariaLabel: "Experience & Milestones", link: "#experience" },
    { label: "Stack", ariaLabel: "Technical Arsenal", link: "#skills" },
    { label: "Contact", ariaLabel: "Contact & Collaboration", link: "#contact" },
    { label: "Resume", ariaLabel: "View Resume PDF", link: activeResume },
  ];

  const socialItems: SocialItem[] = [
    { label: "GitHub", link: "https://github.com/Cherubinoo" },
    { label: "LinkedIn", link: "https://www.linkedin.com/in/delight-cherubino-bb8456291/" },
    { label: "Resume PDF", link: activeResume },
    { label: "Email", link: "mailto:delightcherubino@gmail.com" },
  ];

  return (
    <StaggeredMenu
      position="right"
      items={menuItems}
      socialItems={socialItems}
      displaySocials={true}
      displayItemNumbering={true}
      colors={["#E73F1E", "#FB6C00", "#F9B637"]}
      accentColor="#FB6C00"
      menuButtonColor="#ffffff"
      openMenuButtonColor="#ffffff"
      changeMenuColorOnOpen={true}
      isFixed={true}
    />
  );
}
