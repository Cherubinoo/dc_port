import { mutation } from "./_generated/server";

export const seedData = mutation({
  handler: async (ctx) => {
    // 1. Seed Profile
    const existingProfile = await ctx.db.query("profile").first();
    const profileData = {
      name: "Delight Cherubino",
      role: "President, Neoteric AI Association",
      bio: "I’m Delight Cherubino, an Artificial Intelligence and Data Science student at Ramco Institute of Technology, with a strong focus on building real-world, scalable AI solutions. I currently serve as the President of the Neoteric AI Association, where I actively contribute to technical initiatives, student development, and collaborative innovation.\n\nMy core interest lies in transforming theoretical concepts into practical systems. I don’t just focus on learning algorithms — I focus on how they can be applied effectively in real environments to solve meaningful problems.",
      vision: "My long-term goal is to build impactful technology solutions that solve real problems at scale. I aim to contribute to the development of intelligent systems that make processes smarter, faster, and more efficient.",
      approach: "I believe in:\n• Building solutions that are practical and usable\n• Focusing on real-world impact over theoretical perfection\n• Learning by building and experimenting\n• Continuously improving systems through iteration and feedback",
      leadership: "As President of the Neoteric AI Association, I actively:\n• Lead and coordinate technical initiatives\n• Work closely with teams on project development\n• Encourage collaborative problem-solving\n• Help create opportunities for students to build and innovate",
      current_focus: "Right now, I am focused on:\n• Building scalable AI-driven platforms\n• Developing student-centric tools and applications\n• Improving real-time system performance\n• Exploring advanced system design and architecture",
      email: "delightcherubino@gmail.com",
      phone: "+91 82207 89878",
      github: "https://github.com/Cherubinoo",
      linkedin: "https://www.linkedin.com/in/delight-cherubino-bb8456291/",
      resume: "/resume/delightcherubinoI.pdf",
      hero_image: "/images/1.jpg",
    };

    if (existingProfile) {
      await ctx.db.patch(existingProfile._id, profileData);
    } else {
      await ctx.db.insert("profile", profileData);
    }

    // 2. Seed Skills
    const existingSkills = await ctx.db.query("skills").collect();
    if (existingSkills.length === 0) {
      const skills = [
        { name: "Python", category: "Backend", proficiency: 95 },
        { name: "Computer Vision (YOLOv8)", category: "AI & ML", proficiency: 92 },
        { name: "Machine Learning", category: "AI & ML", proficiency: 90 },
        { name: "FastAPI", category: "Backend", proficiency: 88 },
        { name: "OCR Pipelines", category: "AI & ML", proficiency: 85 },
        { name: "Next.js / React", category: "Frontend", proficiency: 90 },
        { name: "Real-time System Architecture", category: "System Design", proficiency: 85 },
        { name: "Convex / PostgreSQL", category: "Backend", proficiency: 88 },
      ];
      for (const skill of skills) {
        await ctx.db.insert("skills", skill);
      }
    }

    // 3. Seed Experience
    const existingExp = await ctx.db.query("experience").collect();
    if (existingExp.length === 0) {
      const experiences = [
        {
          title: "President – Neoteric AI Association",
          company: "Ramco Institute of Technology",
          duration: "Aug 2025 – Present",
          description: "• Leading technical initiatives and coordinating activities within the Neoteric AI Association\n• Mentoring students in project development, AI concepts, and implementation strategies\n• Organizing workshops, technical events, and collaborative sessions\n• Driving innovation by encouraging real-world problem-solving among peers\n• Managing team coordination and ensuring smooth execution of association activities",
          is_academic: false,
        },
        {
          title: "AI & ML Lead",
          company: "Google Developer Groups on Campus - RIT",
          duration: "Oct 2025 – Present",
          description: "• Leading AI & ML initiatives, organizing technical sessions, and building a vibrant community of developer peers on campus.",
          is_academic: false,
        },
        {
          title: "Intern",
          company: "The Ramco Cements Limited",
          duration: "May 2024 – Aug 2024",
          description: "• Developed human detection project using AI with Python and computer vision libraries.\n• Contributed to data cleaning process in water analysis project.\n• Assisted in setting up an automated system to track water extraction and consumption.",
          is_academic: false,
        },
        {
          title: "Project Intern",
          company: "Igress Solutions LLP",
          duration: "Nov 2023 – Dec 2023",
          description: "• Collaborated with team members to analyze AWS telemetry data.\n• Assisted in cloud infrastructure project management tasks.\n• Implemented custom data visualization techniques for operational dashboards.",
          is_academic: false,
        },
        {
          title: "AI Developer",
          company: "Independent / Academic Projects",
          duration: "Ongoing",
          description: "• Designed and developed multiple AI-based systems focused on real-world industrial and educational applications.\n• Built computer vision solutions using YOLOv8.\n• Developed high-throughput backend services using FastAPI & Next.js.\n• Implemented OCR-based document extraction pipelines.",
          is_academic: true,
        },
      ];
      for (const exp of experiences) {
        await ctx.db.insert("experience", exp);
      }
    }

    // 4. Seed Projects
    const existingProjects = await ctx.db.query("projects").collect();
    if (existingProjects.length === 0) {
      const projects = [
        {
          title: "Safety Gear Monitoring",
          company: "The Ramco Cements Limited",
          category: "work",
          award_name: "1st Prize - INNOVANZA 2025 Hackathon",
          award_link: "https://www.linkedin.com/posts/delight-cherubino-bb8456291_hackathon-ai-ml-activity-7371875149031198721-Cx8f",
          description: "Awarded 1st Prize at INNOVANZA 2025 Hackathon! A comprehensive CV + ML + Microcontroller Industry Safety System designed for real-time monitoring and hazard prevention. Developed in collaboration with Subbhra Yashwanth kanth P, featuring YOLOv8-powered object detection integrated with industrial hardware for instant compliance alerts.",
          tech_stack: ["Python", "YOLOv8", "OpenCV", "Microcontrollers", "ML"],
          live_link: "https://www.linkedin.com/posts/delight-cherubino-bb8456291_ai-computervision-yolov8-activity-7358112735206821888-AYKt",
          github_link: "https://github.com/Cherubinoo/kamarajar-college",
          image: "/images/2.jpg",
          is_ongoing: false,
        },
        {
          title: "AI Question Generator",
          company: "Ramco Vidya Mandir School",
          category: "work",
          description: "Developed specifically for Ramco Vidya Mandir Senior Secondary School (Ariyalur), this automated tool leverages NLP to generate structured CBSE examination papers from textbook content. The system uses LLM-based text analysis to identify key concepts and generate diverse question types, reducing administrative workload.",
          tech_stack: ["FastAPI", "OpenAI API", "React", "PDFMiner"],
          github_link: "https://github.com/Cherubinoo/CBSE_GENERATION",
          is_ongoing: false,
        },
        {
          title: "Cement Bag Detection",
          company: "The Ramco Cements Limited",
          category: "work",
          description: "Developed specifically for industrial logistics, this system automates the counting and detection of cement bags on conveyor belts and in warehouses. Using a custom-trained YOLOv8 model, it achieves high precision even in dusty and low-light environments, significantly improving inventory accuracy.",
          tech_stack: ["Python", "YOLOv8", "OpenCV", "FastAPI"],
          is_ongoing: false,
        },
        {
          title: "Code2Day",
          company: "Replica Ecosystem",
          category: "personal",
          description: "A collaborative coding platform designed for daily practice and skill building. Part of the Replica ecosystem, Code2Day focuses on providing students with real-world coding challenges and a streamlined environment to showcase progress.",
          tech_stack: ["React", "Node.js", "Socket.io", "PostgreSQL"],
          live_link: "https://code2day.ramcoad.com",
          github_link: "http://github.com/Cherubinoo/code2day/tree/main",
          is_ongoing: true,
        },
        {
          title: "Student Project Hosting",
          company: "Replica Ecosystem",
          category: "personal",
          description: "An automated hosting solution specifically designed for student developers. It simplifies the deployment process for web applications and provides a centralized platform for academic projects to be live and accessible.",
          tech_stack: ["Docker", "Nginx", "Python", "Cloudflare"],
          is_ongoing: true,
        },
        {
          title: "Document Extraction",
          company: "Igress Solutions LLP",
          category: "personal",
          description: "A sophisticated OCR-based pipeline integrated with language models to extract structured data from unstructured business documents (invoices, forms, receipts). Uses post-processing logic to ensure high data accuracy.",
          tech_stack: ["FastAPI", "Tesseract", "Transformers", "Python"],
          is_ongoing: false,
        },
        {
          title: "Sentiment Analysis",
          company: "Academic Project",
          category: "personal",
          description: "A machine learning based sentiment analysis system designed to process and categorize emotional tones in large-scale text data. Utilizes natural language processing (NLP) techniques to identify positive, negative, and neutral sentiments.",
          tech_stack: ["Python", "NLTK", "Scikit-learn", "Flask"],
          is_ongoing: false,
        },
      ];
      for (const proj of projects) {
        await ctx.db.insert("projects", proj);
      }
    }

    return "Seeding completed successfully!";
  },
});
