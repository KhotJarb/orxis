export interface Domain {
  id: string;
  label: string;
  icon: string;
  description: string;
}

export const domains: Domain[] = [
  {
    id: "content",
    label: "Content Creation",
    icon: "🎬",
    description: "YouTube, blogs, podcasts, social media",
  },
  {
    id: "business",
    label: "Business & Strategy",
    icon: "💼",
    description: "Planning, analysis, consulting",
  },
  {
    id: "technical",
    label: "Software & Technical",
    icon: "💻",
    description: "Code, architecture, DevOps",
  },
  {
    id: "writing",
    label: "Writing & Creative",
    icon: "✍️",
    description: "Copywriting, storytelling, editing",
  },
  {
    id: "marketing",
    label: "Marketing & Growth",
    icon: "📈",
    description: "SEO, campaigns, analytics",
  },
  {
    id: "education",
    label: "Education & Research",
    icon: "🎓",
    description: "Tutoring, curriculum, research",
  },
  {
    id: "design",
    label: "Design & Visual",
    icon: "🎨",
    description: "UI/UX, branding, visual strategy",
  },
  {
    id: "custom",
    label: "Something else",
    icon: "⚙️",
    description: "Full freedom, all presets available",
  },
];

export interface DomainPresets {
  personas: string[];
  tasks: string[];
}

export function getDomainPresets(domainId: string): DomainPresets {
  switch (domainId) {
    case "content":
      return {
        personas: [
          "YouTuber", "Content Strategist", "Scriptwriter", "Podcast Host", 
          "Social Media Manager", "Video Editor", "Thumbnail Designer", 
          "Content Analyst", "Community Manager", "Newsletter Writer", 
          "Streaming Coach", "Short-Form Creator"
        ],
        tasks: [
          "Video Ideas", "Script Writing", "Content Calendar", "Thumbnail Concepts", 
          "Audience Growth", "SEO for Videos", "Brand Partnerships", 
          "Community Engagement", "Analytics Review", "Cross-Platform Strategy", 
          "Trend Analysis", "Repurposing Content"
        ]
      };
    case "business":
      return {
        personas: [
          "Business Analyst", "Startup Advisor", "Management Consultant", 
          "Financial Planner", "Operations Manager", "Market Researcher", 
          "Executive Coach", "Grant Writer", "Sales Strategist", 
          "Risk Analyst", "HR Consultant", "Supply Chain Expert"
        ],
        tasks: [
          "Business Plan", "Market Analysis", "Pitch Deck", "SWOT Analysis", 
          "Financial Forecast", "Competitive Analysis", "Process Optimization", 
          "Strategic Planning", "KPI Dashboard", "Stakeholder Report", 
          "Budget Planning", "Risk Assessment"
        ]
      };
    case "technical":
      return {
        personas: [
          "Backend Developer", "Frontend Developer", "Full-Stack Engineer", 
          "DevOps Engineer", "System Architect", "Database Admin", 
          "Security Engineer", "QA Engineer", "ML Engineer", 
          "Cloud Architect", "Mobile Developer", "Tech Lead"
        ],
        tasks: [
          "Code Review", "Debugging", "API Design", "System Architecture", 
          "Database Design", "CI/CD Pipeline", "Performance Optimization", 
          "Security Audit", "Testing Strategy", "Documentation", 
          "Migration Planning", "Tech Stack Evaluation"
        ]
      };
    case "writing":
      return {
        personas: [
          "Copywriter", "Novelist", "Technical Writer", "Editor", 
          "Journalist", "Screenwriter", "Poet", "Ghostwriter", 
          "Blogger", "Grant Writer", "Comic Writer", "Speechwriter"
        ],
        tasks: [
          "Blog Post", "Chapter Draft", "Article Editing", "Ad Copy", 
          "Creative Writing", "Speech Drafting", "Proofreading", 
          "Character Development", "Plot Outline", "Newsletter Draft", 
          "Press Release", "Review & Feedback"
        ]
      };
    case "marketing":
      return {
        personas: [
          "SEO Expert", "Growth Hacker", "Digital Marketer", "Brand Manager", 
          "Email Marketer", "Paid Ads Specialist", "Social Media Manager", 
          "PR Specialist", "E-commerce Manager", "Analytics Expert", 
          "Affiliate Marketer", "Content Marketer"
        ],
        tasks: [
          "SEO Optimization", "Ad Campaign", "Email Sequence", "Social Media Plan", 
          "Marketing Strategy", "Brand Voice Guide", "Conversion Rate Optimization", 
          "A/B Testing", "Keyword Research", "Competitor Analysis", 
          "Analytics Report", "PR Pitch"
        ]
      };
    case "education":
      return {
        personas: [
          "Teacher", "Professor", "Instructional Designer", "Tutor", 
          "Researcher", "Principal", "Academic Advisor", "Special Ed Teacher", 
          "Curriculum Developer", "Student", "PhD Candidate", "Librarian"
        ],
        tasks: [
          "Lesson Plan", "Course Curriculum", "Quiz Generation", "Grading Rubric", 
          "Study Guide", "Research Proposal", "Literature Review", "Assignment Feedback", 
          "Interactive Activity", "Exam Questions", "Syllabus Draft", "Academic Paper"
        ]
      };
    case "design":
      return {
        personas: [
          "UI Designer", "UX Designer", "Graphic Designer", "Art Director", 
          "Illustrator", "Animator", "Product Designer", "Brand Designer", 
          "Web Designer", "Motion Designer", "3D Artist", "Packaging Designer"
        ],
        tasks: [
          "Wireframing", "User Flow", "Brand Identity", "UI Mockup", 
          "Design System", "Usability Testing", "Visual Strategy", "Logo Concept", 
          "Color Palette", "Typography Pairing", "Prototyping", "Accessibility Review"
        ]
      };
    case "custom":
    default:
      return getAllPresets();
  }
}

export function getAllPresets(): DomainPresets {
  return {
    personas: [
      "Software Engineer", "Data Scientist", "UX Designer", "Marketing Expert", 
      "Creative Writer", "Business Strategist", "Research Scientist", 
      "Teacher & Mentor", "DevOps Engineer", "Product Manager", 
      "Legal Advisor", "Financial Analyst"
    ],
    tasks: [
      "Code Review", "Content Creation", "Data Analysis", "Problem Solving", 
      "Research & Report", "Brainstorming", "Technical Writing", "Debugging", 
      "API Design", "System Architecture", "User Research", "SEO Optimization"
    ]
  };
}

export interface ContextExample {
  whatYouDo: string;
  whoYouServe: string;
  keyDetails: string;
}

export function getContextExample(domainId: string): ContextExample {
  switch (domainId) {
    case "content":
      return {
        whatYouDo: "I run a YouTube channel about cooking on a budget. I post 2 videos per week — one recipe walkthrough and one 'meal prep for the week' format.",
        whoYouServe: "College students and young professionals aged 18-28 who want to eat well without spending a lot. Most have limited kitchen equipment.",
        keyDetails: "Videos are 8-12 minutes long. I film with a single camera, overhead angle. Tone is upbeat and encouraging. I avoid complex techniques."
      };
    case "business":
      return {
        whatYouDo: "I run a SaaS startup offering project management tools for remote teams. We're pre-Series A with 500 active users.",
        whoYouServe: "Small business owners and team leads managing 5-20 remote employees who need simple, affordable collaboration tools.",
        keyDetails: "We use a freemium model. Main competitors are Asana and Monday.com. Our differentiator is AI-powered task prioritization."
      };
    case "technical":
      return {
        whatYouDo: "I lead backend development at a fintech startup. We process payment transactions and handle regulatory compliance.",
        whoYouServe: "Our internal dev team of 8 engineers, mostly mid-level. We also support QA and product teams.",
        keyDetails: "Stack: Node.js, PostgreSQL, AWS. We deploy weekly via CI/CD. PCI-DSS compliance is mandatory."
      };
    case "writing":
      return {
        whatYouDo: "I am a freelance copywriter specializing in health and wellness.",
        whoYouServe: "Direct-to-consumer (DTC) supplement brands and holistic health practitioners.",
        keyDetails: "Focus on science-backed claims with an approachable, engaging tone. Adherence to FDA guidelines is strictly required."
      };
    case "marketing":
      return {
        whatYouDo: "I manage digital marketing for a mid-sized e-commerce store selling sustainable apparel.",
        whoYouServe: "Eco-conscious millennials and Gen Z consumers looking for affordable, ethically made clothing.",
        keyDetails: "Main channels are Instagram and TikTok. We emphasize transparency, eco-friendly materials, and body positivity."
      };
    case "education":
      return {
        whatYouDo: "I am a high school science teacher teaching Biology and Chemistry.",
        whoYouServe: "10th and 11th-grade students, ranging from general education to Advanced Placement (AP) levels.",
        keyDetails: "I focus on inquiry-based learning and hands-on experiments. I need materials that are engaging and align with Next Generation Science Standards (NGSS)."
      };
    case "design":
      return {
        whatYouDo: "I am a UX/UI designer at an agency, working on mobile apps for healthcare clients.",
        whoYouServe: "Patients managing chronic conditions, typically older adults (55+).",
        keyDetails: "Accessibility is critical (high contrast, large tap targets). The aesthetic should be clean, calming, and trustworthy."
      };
    case "custom":
    default:
      return {
        whatYouDo: "I am a professional working on various projects across different domains.",
        whoYouServe: "A diverse range of clients and stakeholders depending on the specific project.",
        keyDetails: "I need flexibility to adapt my approach and outputs based on the current task requirements."
      };
  }
}

export interface ShortcutTemplate {
  name: string;
  template: string;
}

export function getShortcutTemplates(domainId: string): ShortcutTemplate[] {
  switch (domainId) {
    case "content":
      return [
        { name: "Quick Brainstorm", template: "Generate {{count}} video ideas about {{topic}} for my {{audience}}" },
        { name: "Script Outline", template: "Write a script outline for a {{duration}}-minute video about {{topic}}" },
        { name: "Title Ideas", template: "Create {{count}} click-worthy titles for a video about {{topic}}" }
      ];
    case "business":
      return [
        { name: "Executive Summary", template: "Draft a {{length}} executive summary about {{subject}} highlighting {{focus_areas}}" },
        { name: "Strategy List", template: "List {{count}} strategies for {{objective}} considering {{constraints}}" },
        { name: "SWOT Analysis", template: "Create a SWOT analysis for {{company_or_product}} in the {{industry}} market" }
      ];
    case "technical":
      return [
        { name: "Code Review", template: "Review the following code for {{focus_areas}}: {{code}}" },
        { name: "Architecture Plan", template: "Outline a system architecture for a {{app_type}} using {{tech_stack}}" },
        { name: "Debug Error", template: "Help me debug this error in {{language}}: {{error_message}}" }
      ];
    case "writing":
      return [
        { name: "Draft Article", template: "Draft a {{length}} article about {{topic}} for {{audience}}" },
        { name: "Edit Text", template: "Edit the following text for {{tone}} tone and clarity: {{text}}" },
        { name: "Creative Prompt", template: "Give me a creative writing prompt involving {{theme}} and {{character}}" }
      ];
    case "marketing":
      return [
        { name: "Email Campaign", template: "Write a {{sequence_length}}-part email sequence for {{product}} targeting {{segment}}" },
        { name: "Ad Copy", template: "Create {{count}} variations of Facebook ad copy for {{offer}}" },
        { name: "SEO Keywords", template: "Suggest {{count}} long-tail SEO keywords for {{topic}}" }
      ];
    case "education":
      return [
        { name: "Lesson Plan", template: "Create a {{duration}} lesson plan about {{topic}} for {{grade_level}}" },
        { name: "Quiz Questions", template: "Generate {{count}} multiple-choice questions on {{subject}} at a {{difficulty}} level" },
        { name: "Explain Concept", template: "Explain {{concept}} using an analogy suitable for {{audience}}" }
      ];
    case "design":
      return [
        { name: "Design System", template: "List the essential components needed for a {{project_type}} design system" },
        { name: "Color Palette", template: "Suggest a color palette for a {{vibe}} brand in the {{industry}} industry" },
        { name: "UX Audit", template: "What are the key UX principles to check when auditing a {{interface_type}}?" }
      ];
    case "custom":
    default:
      return [
        { name: "Quick Help", template: "Help me with {{task}} regarding {{subject}}" },
        { name: "Generate Ideas", template: "Generate {{count}} ideas for {{topic}}" }
      ];
  }
}
