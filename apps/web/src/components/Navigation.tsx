"use client";

import React from "react";
import StaggeredMenu, { type MenuItem, type SocialItem } from "./StaggeredMenu";

interface NavigationProps {
  resumeUrl?: string;
}

const menuItems: MenuItem[] = [
  { label: "Home", ariaLabel: "Go to home section", link: "#home" },
  { label: "About", ariaLabel: "About Delight Cherubino", link: "#about" },
  { label: "Work", ariaLabel: "Selected Case Studies", link: "#work" },
  { label: "Projects", ariaLabel: "Digital Crafts", link: "#personal-projects" },
  { label: "Journey", ariaLabel: "Experience & Milestones", link: "#experience" },
  { label: "Stack", ariaLabel: "Technical Arsenal", link: "#skills" },
  { label: "Contact", ariaLabel: "Contact & Collaboration", link: "#contact" },
];

const socialItems: SocialItem[] = [
  { label: "GitHub", link: "https://github.com/Cherubinoo" },
  { label: "LinkedIn", link: "https://www.linkedin.com/in/delight-cherubino-bb8456291/" },
  { label: "Email", link: "mailto:delightcherubino@gmail.com" },
];

export default function Navigation({ resumeUrl }: NavigationProps) {
  const items = resumeUrl
    ? [...menuItems, { label: "Resume", ariaLabel: "Download Resume", link: resumeUrl }]
    : menuItems;

  return (
    <StaggeredMenu
      position="right"
      items={items}
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
