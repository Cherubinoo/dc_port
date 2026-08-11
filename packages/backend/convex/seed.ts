import { mutation } from "./_generated/server";

export const seedData = mutation({
  handler: async (ctx) => {
    // 1. Seed Profile
    const existingProfile = await ctx.db.query("profile").first();
    const profileData = {
      name: "Delight Cherubino I",
      role: "President, Neoteric AI Association",
      bio: "AI & Data Science practitioner specializing in LLM fine-tuning, open-source model training, and GenAI system engineering. Creator of Code2Day—a high-concurrency learning platform acquired by QuBrain.ai—with proven expertise in translating fine-tuned AI architectures into scalable enterprise solutions, LMS tools, and technical documentation.\n\nMy core focus lies in transforming theoretical machine learning models into high-performance, real-world edge and cloud applications.",
      vision: "My long-term goal is to build impactful technology solutions that solve real problems at scale. I aim to contribute to the development of intelligent systems that make processes smarter, faster, and more efficient.",
      approach: "I believe in:\n• Building solutions that are practical and usable\n• Focusing on real-world impact over theoretical perfection\n• Learning by building and experimenting\n• Continuously improving systems through iteration and feedback",
      leadership: "As President of the Neoteric AI Association, I actively:\n• Lead and coordinate technical initiatives\n• Work closely with teams on project development\n• Encourage collaborative problem-solving\n• Help create opportunities for students to build and innovate",
      current_focus: "Right now, I am focused on:\n• Building scalable AI-driven platforms\n• Developing student-centric tools and applications\n• Improving real-time system performance\n• Exploring advanced system design and architecture",
      email: "delightcherubino@gmail.com",
      phone: "+91 82207 89878",
      github: "https://github.com/Cherubinoo",
      linkedin: "https://www.linkedin.com/in/delight-cherubino/",
      resume: "/resume.pdf",
      hero_image: "/images/del-comic-sticker.png",
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
        // LLM Engineering & GenAI
        { name: "LLM Fine-Tuning (LoRA, PEFT, SFT)", category: "LLM Engineering & GenAI", proficiency: 96 },
        { name: "Quantization (GGUF, AWQ)", category: "LLM Engineering & GenAI", proficiency: 92 },
        { name: "RAG & Vector DB Architecture", category: "LLM Engineering & GenAI", proficiency: 94 },
        { name: "Ollama / Llama 3 8B & AWS Bedrock", category: "LLM Engineering & GenAI", proficiency: 95 },
        
        // Machine Learning & Computer Vision
        { name: "YOLOv8 Object Detection", category: "Computer Vision & ML", proficiency: 97.5 },
        { name: "ONNX Runtime Edge Inference", category: "Computer Vision & ML", proficiency: 92 },
        { name: "PyTorch & OpenCV Pipelines", category: "Computer Vision & ML", proficiency: 95 },
        { name: "Dataset Annotation & Augmentation", category: "Computer Vision & ML", proficiency: 90 },

        // Database & Storage Systems
        { name: "PostgreSQL & Relational Schemas", category: "Database & Storage Systems", proficiency: 94 },
        { name: "Redis Caching & In-Memory Queues", category: "Database & Storage Systems", proficiency: 90 },
        { name: "Vector DBs (ChromaDB, Pinecone)", category: "Database & Storage Systems", proficiency: 92 },
        { name: "Convex Realtime DB & AWS S3", category: "Database & Storage Systems", proficiency: 95 },
        { name: "Power BI & Python ETL Pipelines", category: "Database & Storage Systems", proficiency: 90 },

        // Full-Stack & DevOps
        { name: "Python / FastAPI / Django", category: "Full-Stack & Cloud DevOps", proficiency: 96 },
        { name: "React / Next.js / TypeScript", category: "Full-Stack & Cloud DevOps", proficiency: 92 },
        { name: "Docker Sandboxing & CI/CD", category: "Full-Stack & Cloud DevOps", proficiency: 90 },

        // Technical Architecture & L&D
        { name: "LMS Integration & Technical Documentation", category: "Architecture & Technical Writing", proficiency: 94 },
        { name: "Anti-Cheat Detection Algorithms", category: "Architecture & Technical Writing", proficiency: 90 },
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
          title: "ML Intern — Cement Bag Counting System",
          company: "The Ramco Cements Limited",
          duration: "Jan 2025 – Dec 2025",
          description: "• Engineered, trained, and optimized a custom YOLOv8 computer vision model (97.5% accuracy), handling end-to-end dataset annotation, augmentation, and hyperparameter tuning.\n• Optimized model inference using ONNX Runtime for real-time edge processing and authored setup documentation for factory personnel.\n• Built a PyQt5 inventory management dashboard and presented evaluation metrics, loss curves, and ROI findings directly to plant leadership.",
          is_academic: false,
        },
        {
          title: "AI & ML Intern — Human Detection & Security System",
          company: "The Ramco Cements Limited",
          duration: "May 2024 – Aug 2024",
          description: "• Developed human detection project using AI with Python and computer vision libraries.\n• Trained and deployed object detection models on multi-camera RTSP video feeds utilizing Python multithreading for concurrent batch inference.\n• Contributed to data cleaning process and setting up automated systems to track water extraction and consumption.",
          is_academic: false,
        },
        {
          title: "Data Analyst & Project Intern",
          company: "Igress Solutions LLP",
          duration: "Nov 2023 – Dec 2023",
          description: "• Designed Power BI sales analytics dashboards and engineered automated Python ETL pipelines for AWS sales & telemetry data.\n• Collaborated with team members on cloud infrastructure project management and operational dashboards.\n• Received Spot and Impact Awards within month one for data presentation clarity and precision ETL modeling.",
          is_academic: false,
        },
        {
          title: "President – Neoteric AI Association",
          company: "Ramco Institute of Technology",
          duration: "Aug 2025 – Present",
          description: "• Leading technical initiatives and coordinating activities within the Neoteric AI Association\n• Mentoring students in project development, AI concepts, and implementation strategies\n• Organizing workshops, technical events, and collaborative sessions",
          is_academic: true,
        },
        {
          title: "AI & ML Lead",
          company: "Google Developer Groups on Campus - RIT",
          duration: "Oct 2025 – Present",
          description: "• Leading AI & ML initiatives, organizing technical sessions, and building a vibrant community of developer peers on campus.",
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
          title: "Code2Day",
          company: "Acquired by QuBrain.ai",
          category: "work",
          award_name: "⭐ Acquired by QuBrain.ai & Flagship Platform",
          description: "Solo developer → 56+ deployments → 550+ active student and staff users → Acquired by QuBrain.ai!\nIntegrated and fine-tuned open-source Llama 3 8B via Ollama/PyTorch for automated domain-specific question generation with structured JSON validation. Architected Docker-isolated code execution sandboxes supporting 6 languages for 320+ concurrent users with custom prompt engineering guardrails.",
          tech_stack: ["React", "Django", "PostgreSQL", "Redis", "Docker", "Ollama", "PyTorch"],
          live_link: "https://code2day.ramcoad.com",
          github_link: "http://github.com/Cherubinoo/code2day",
          image: "/images/code2day.png",
          is_ongoing: true,
        },
        {
          title: "Safety Gear Monitoring System",
          company: "The Ramco Cements Limited",
          category: "work",
          award_name: "1st Prize - INNOVANZA 2025 Hackathon",
          award_link: "https://www.linkedin.com/posts/delight-cherubino-bb8456291_hackathon-ai-ml-activity-7371875149031198721-Cx8f",
          description: "Awarded 1st Prize at INNOVANZA 2025 Hackathon! Trained custom YOLOv8 safety compliance models (helmet & vest detection); authored job aids and trained factory personnel on live inference and automated alert monitoring over ESP8266 & OpenCV microcontrollers.",
          tech_stack: ["Python", "YOLOv8", "OpenCV", "PyQt5", "ESP8266"],
          live_link: "https://www.linkedin.com/posts/delight-cherubino-bb8456291_ai-computervision-yolov8-activity-7358112735206821888-AYKt",
          github_link: "https://github.com/Cherubinoo/ramco-cements",
          image: "/images/safety-gear-monitoring.jpg",
          is_ongoing: false,
        },
        {
          title: "Cement Bag Counting System",
          company: "The Ramco Cements Limited",
          category: "work",
          description: "Engineered, trained, and optimized a custom YOLOv8 computer vision model achieving 97.5% accuracy for real-time bag counting on industrial conveyor belts. Optimized inference using ONNX Runtime for edge deployment with PyQt5 inventory dashboard.",
          tech_stack: ["Python", "YOLOv8", "ONNX Runtime", "PyQt5", "OpenCV"],
          image: "/images/Cement Bag Detection.jpg",
          is_ongoing: false,
        },
        {
          title: "AI Question Generator",
          company: "Ramco Vidya Mandir School",
          category: "work",
          description: "Developed specifically for Ramco Vidya Mandir Senior Secondary School (Ariyalur), this automated tool leverages NLP to generate structured CBSE examination papers from textbook content. Uses LLM text analysis to identify key concepts.",
          tech_stack: ["FastAPI", "OpenAI API", "React", "PDFMiner"],
          github_link: "https://github.com/Cherubinoo/CBSE_GENERATION",
          image: "/images/AI Question Generator.jpg",
          is_ongoing: false,
        },
        {
          title: "Amazon Sales Data Analytics & ETL",
          company: "Igress Solutions (Remote)",
          category: "work",
          description: "Designed Power BI sales analytics dashboards and engineered automated Python ETL pipelines for data cleaning and feature transformation using Amazon telemetry data. Awarded Spot and Impact Awards within month one.",
          tech_stack: ["Python", "Power BI", "Pandas", "ETL", "FastAPI"],
          is_ongoing: false,
        },
        {
          title: "Student Project Hosting Platform",
          company: "Replica Ecosystem",
          category: "personal",
          description: "An automated hosting solution specifically designed for student developers. Simplifies deployment process for web applications and provides a centralized platform for academic projects to be live and accessible.",
          tech_stack: ["Docker", "Nginx", "Python", "Cloudflare"],
          is_ongoing: true,
        },
        {
          title: "Sentiment Analysis System",
          company: "Academic Venture",
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

    return "Seeding completed successfully with full resume dataset!";
  },
});
