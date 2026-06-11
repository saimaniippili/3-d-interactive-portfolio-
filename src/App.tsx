import { useState, useEffect, useCallback } from 'react';
import { ArrowLeft, ArrowRight, Mail, MapPin, Award, FileText, Plus, Trash2, Save, X, Download, Sparkles, RefreshCw } from 'lucide-react';

const GithubIcon = ({ className = "w-3 h-3" }: { className?: string }) => (
  <svg className={`inline-block ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = ({ className = "w-3 h-3" }: { className?: string }) => (
  <svg className={`inline-block ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const KaggleIcon = ({ className = "w-3.5 h-3.5" }: { className?: string }) => (
  <svg className={`inline-block ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 4v16" />
    <path d="M18 4l-10 8 10 8" />
    <path d="M12 12l6-4.8" />
  </svg>
);

const DEFAULT_PROJECTS = [
  {
    title: 'DataChat',
    subtitle: 'Conversational Data Analysis Tool',
    role: 'GenAI Developer',
    tech: ['LangChain', 'Ollama', 'Pandas', 'Python', 'REST API', 'HMR'],
    description: 'A full-stack web application enabling natural language querying of CSV/Excel datasets using LangChain agents with local LLMs (Llama3, Mistral, Gemma) via Ollama.',
    ghostText: 'DATACHAT',
    bg: '#F4845F',
    panel: '#F79B7F',
    src: '/figure1.png',
    points: [
      'Built a full-stack web application enabling natural language querying of CSV/Excel datasets using LangChain agents integrated with local LLMs (Llama3, Mistral, Gemma) via Ollama.',
      'Implemented conversational chat interface with dynamic chart generation; supports multi-model selection (2B–8B parameter models) and real-time data analysis including trends, statistics, and distributions.',
      'Designed modular LangChain tool architecture connecting LLM inference to Pandas operations, enabling complex queries like "Show a histogram of customer ages" without SQL or code.'
    ]
  },
  {
    title: 'MedSage',
    subtitle: 'AI Healthcare Chatbot with RAG',
    role: 'AI Engineer',
    tech: ['RAG', 'LangChain', 'Flask', 'React', 'Ollama', 'Node.js'],
    description: 'A clinical triage application using a RAG pipeline over local medical knowledge bases, delivering structured reports with severity assessment and care recommendations.',
    ghostText: 'MEDSAGE',
    bg: '#6BBF7A',
    panel: '#85CC92',
    src: '/figure2.png',
    points: [
      'Built a full-stack clinical triage application using a RAG pipeline over local medical knowledge bases, delivering structured reports with severity assessment, possible conditions, red flags, and care recommendations.',
      'Integrated Ollama-powered local LLMs (Llama3, Mistral, Phi3) with a Flask REST backend and React frontend; supports dynamic model switching and patient intake with PDF export of clinical reports.',
      'Designed for complete on-device inference with no data leaving the user\'s machine, ensuring patient privacy compliance.'
    ]
  },
  {
    title: 'NLP Detector',
    subtitle: 'Fake Job Detection Pipeline',
    role: 'Machine Learning Engineer',
    tech: ['NLP', 'TF-IDF', 'Random Forest', 'SMOTE', 'Scikit-learn', 'Pandas'],
    description: 'An NLP machine learning pipeline trained on 17K records to detect fraudulent job postings with 90% accuracy, handling class imbalance with SMOTE.',
    ghostText: 'ANTI-FRAUD',
    bg: '#8B5CF6',
    panel: '#A78BFA',
    src: '/figure3.png',
    points: [
      'Built NLP pipeline on 17K records using TF-IDF + Random Forest to detect fraudulent job postings, achieving 90% accuracy.',
      'Handled class imbalance with SMOTE; evaluated with precision, recall & F1-score; visualized fraud patterns using Seaborn for recruiter insights.'
    ]
  },
  {
    title: 'AWS & Fullstack',
    subtitle: 'Job Portal & Cloud Infrastructure',
    role: 'Full-Stack Lead',
    tech: ['AWS', 'React', 'Node.js', 'Django', 'MySQL', 'Agile'],
    description: 'Led a 3-member team to design, develop & deploy an Online Job Portal. AWS Certified Cloud Practitioner with expertise in scalable cloud hosting.',
    ghostText: 'FULL-STACK',
    bg: '#6EB5FF',
    panel: '#8DC4FF',
    src: '/figure4.png',
    points: [
      'Project Lead — Led 3-member team to design, develop & deploy an Online Job Portal (React, Node.js, Django, MySQL) using Agile methodology.',
      'Workshop Conductor — Delivered Full-Stack Development sessions to 30+ junior students covering React, Node.js, and REST APIs.',
      'Hackathon Participant — Developed a working prototype within 48 hours at university hackathon (2024); shortlisted among top teams.',
      'Certified Practitioner — Holds AWS Certified Cloud Practitioner (2024), Salesforce Certified AI Specialist, Salesforce Certified AI Associate, and Red Hat Certified Enterprise App Developer credentials.'
    ]
  }
];

const DEFAULT_RESUME = {
  name: "Saimani Ippili",
  title: "Creative Full-Stack Developer",
  email: "ippilisaimani40@gmail.com",
  phone: "+91 8341847261",
  location: "Bobbili, AP",
  linkedin: "https://www.linkedin.com/in/saimani-ippili-356830247/",
  github: "https://github.com/saimaniippili",
  kaggle: "https://www.kaggle.com/saimaniippili",
  summary: "B.Tech CSE fresher (2026) specializing in Data Science & Big Data Analytics, with hands-on experience building end-to-end ML pipelines and GenAI applications using LangChain, RAG, and local LLMs via Ollama. Delivered real-world projects including a conversational data analysis tool and an AI-powered healthcare chatbot. AWS certified with strong Python, NLP, and full-stack skills. Eager to contribute to a data-driven team tackling impactful problems.",
  education: [
    { school: "KL University", degree: "B.Tech CSE | Data Science & Big Data Analytics", period: "2022 - 2026" },
    { school: "Narayana Junior College", degree: "Intermediate (MPC)", period: "2020 - 2022" }
  ],
  skills: {
    languages: "Python, Scikit-learn, TF-IDF, Logistic Regression, Random Forest, SVM, SMOTE, Feature Engineering",
    frameworks: "React, Node.js, Express, Flask, Django, Spring Boot, MySQL, MongoDB, REST APIs",
    tools: "Git, Docker, Ollama, LangChain, Jupyter Notebook, Linux, Pandas, NumPy, SQL, Matplotlib, Seaborn, Tableau, Excel, EDA",
    cloud: "AWS (Cloud Practitioner), Salesforce Certified AI Specialist, Salesforce Certified AI Associate, Red Hat Certified Enterprise App Developer"
  },
  certifications: [
    { title: "AWS Certified Cloud Practitioner", issuer: "Amazon Web Services", date: "2024", desc: "AWS core services, security, architecture principles, and cloud pricing." },
    { title: "Salesforce Certified AI Specialist", issuer: "Salesforce", date: "2024", desc: "Einstein Trust Layer, prompt engineering, and CRM GenAI systems." },
    { title: "Salesforce Certified AI Associate", issuer: "Salesforce", date: "2024", desc: "Ethical AI usage, CRM data preparation, and machine learning concepts." },
    { title: "Red Hat Certified Enterprise App Developer", issuer: "Red Hat", date: "2024", desc: "REST endpoints, microservices, and database integration." }
  ]
};

export default function App() {
  // SPA Routing State
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  // Local Storage Database States
  const [projects, setProjects] = useState<any[]>(() => {
    const saved = localStorage.getItem('toonhub_projects');
    return saved ? JSON.parse(saved) : DEFAULT_PROJECTS;
  });

  const [resumeData, setResumeData] = useState<any>(() => {
    const saved = localStorage.getItem('toonhub_resume');
    return saved ? JSON.parse(saved) : DEFAULT_RESUME;
  });

  const [resumeFile, setResumeFile] = useState<string | null>(() => {
    return localStorage.getItem('toonhub_resume_file');
  });

  // Carousel & Drawer States
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth < 640 : false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeDrawerTab, setActiveDrawerTab] = useState<'case_study' | 'demo'>('case_study');
  const [selectedTech, setSelectedTech] = useState<string | null>(null);

  // Modal States
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  // Admin Panel states
  const [adminTab, setAdminTab] = useState<'projects' | 'resume'>('projects');
  const [editProjectIdx, setEditProjectIdx] = useState<number>(0);
  const [projectForm, setProjectForm] = useState<any>(null);
  const [resumeForm, setResumeForm] = useState<any>(null);
  const [saveStatus, setSaveStatus] = useState<string | null>(null);

  // Certifications 3D Flip Card state (flipped cards indices)
  const [flippedCerts, setFlippedCerts] = useState<Record<number, boolean>>({});

  // Mouse position for background text parallax
  const [bgMousePos, setBgMousePos] = useState({ x: 0, y: 0 });

  // Playgrounds States
  const [dataChatHistory, setDataChatHistory] = useState<Array<{ sender: 'user' | 'bot'; text: string; chartType?: 'bar' | 'line' | 'pie'; showQueryLogs?: boolean }>>([
    { sender: 'bot', text: "Welcome to DataChat! Select a suggested query below to see how I analyze your datasets using LangChain agents with local LLMs." }
  ]);
  const [isDataChatAnalyzing, setIsDataChatAnalyzing] = useState(false);
  const [dataChatModel, setDataChatModel] = useState<'llama3' | 'mistral' | 'gemma' | 'phi3'>('llama3');
  const [showBenchmark, setShowBenchmark] = useState(false);

  const [medSageSymptoms, setMedSageSymptoms] = useState<string[]>([]);
  const [medSageReport, setMedSageReport] = useState<{ severity: 'Mild' | 'Moderate' | 'Critical'; conditions: string[]; recommendation: string; details: string[] } | null>(null);
  const [isMedSageScanning, setIsMedSageScanning] = useState(false);
  const [medSageStep, setMedSageStep] = useState<'idle' | 'embedding' | 'retrieval' | 'generation' | 'complete'>('idle');
  const [medSageTrace, setMedSageTrace] = useState<string[]>([]);

  const [nlpInputText, setNlpInputText] = useState('');
  const [nlpRiskScore, setNlpRiskScore] = useState<number | null>(null);
  const [nlpKeywords, setNlpKeywords] = useState<string[]>([]);
  const [isNlpAnalyzing, setIsNlpAnalyzing] = useState(false);

  const [awsActiveNode, setAwsActiveNode] = useState<'cloudfront' | 's3' | 'ec2' | 'rds' | 'client' | null>(null);
  const [awsSimStatus, setAwsSimStatus] = useState<'idle' | 'running' | 'success'>('idle');
  const [awsSimLogs, setAwsSimLogs] = useState<string[]>([]);

  const [genericSimStatus, setGenericSimStatus] = useState<'idle' | 'running' | 'success'>('idle');
  const [genericLogs, setGenericLogs] = useState<string[]>([]);

  // Monitor URL path changes for routing
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
  };

  // Sync edit forms when active items change
  useEffect(() => {
    if (projects[editProjectIdx]) {
      setProjectForm({ ...projects[editProjectIdx] });
    } else if (projects.length > 0) {
      setEditProjectIdx(0);
      setProjectForm({ ...projects[0] });
    }
  }, [editProjectIdx, projects]);

  useEffect(() => {
    if (resumeData) {
      setResumeForm(JSON.parse(JSON.stringify(resumeData))); // deep copy
    }
  }, [resumeData]);

  // Parallax Event listener
  useEffect(() => {
    if (isMobile || currentPath === '/admin') return;
    const handleGlobalMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * -35;
      const y = (e.clientY / window.innerHeight - 0.5) * -35;
      setBgMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleGlobalMouseMove);
    return () => window.removeEventListener('mousemove', handleGlobalMouseMove);
  }, [isMobile, currentPath]);

  // Preload mascot images (ignores base64 images)
  useEffect(() => {
    projects.forEach((project) => {
      if (project.src && !project.src.startsWith('data:')) {
        const img = new Image();
        img.src = project.src;
      }
    });
  }, [projects]);

  // Update isMobile on window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navigate = useCallback((direction: 'next' | 'prev') => {
    if (isAnimating || projects.length === 0) return;
    setIsAnimating(true);
    setActiveDrawerTab('case_study');

    setActiveIndex((prev) => {
      if (direction === 'next') {
        return (prev + 1) % projects.length;
      } else {
        return (prev + projects.length - 1) % projects.length;
      }
    });

    setTimeout(() => {
      setIsAnimating(false);
    }, 650);
  }, [isAnimating, projects.length]);

  // Scroll/Key bindings
  useEffect(() => {
    if (currentPath === '/admin') return;

    let touchStartX = 0;
    let touchStartY = 0;

    const handleWheel = (e: WheelEvent) => {
      if (isDrawerOpen) return;
      if (Math.abs(e.deltaY) < 30) return;
      if (isAnimating) return;

      if (e.deltaY > 0) {
        navigate('next');
      } else {
        navigate('prev');
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (isDrawerOpen) return;
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (isDrawerOpen) return;
      if (isAnimating) return;

      const touchEndX = e.changedTouches[0].clientX;
      const touchEndY = e.changedTouches[0].clientY;

      const deltaX = touchEndX - touchStartX;
      const deltaY = touchEndY - touchStartY;
      const minSwipeDistance = 50;

      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        if (Math.abs(deltaX) > minSwipeDistance) {
          if (deltaX < 0) navigate('next');
          else navigate('prev');
        }
      } else {
        if (Math.abs(deltaY) > minSwipeDistance) {
          if (deltaY < 0) navigate('next');
          else navigate('prev');
        }
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (isDrawerOpen) return;
      if (isAnimating) return;

      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        navigate('next');
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        navigate('prev');
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isAnimating, navigate, isDrawerOpen, currentPath]);

  // Admin DB Helpers
  const showNotification = (msg: string) => {
    setSaveStatus(msg);
    setTimeout(() => setSaveStatus(null), 3000);
  };

  const handleSaveProjects = (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectForm) return;
    const updated = [...projects];
    updated[editProjectIdx] = projectForm;
    setProjects(updated);
    localStorage.setItem('toonhub_projects', JSON.stringify(updated));
    showNotification('Projects saved successfully!');
  };

  const handleSaveResume = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resumeForm) return;
    setResumeData(resumeForm);
    localStorage.setItem('toonhub_resume', JSON.stringify(resumeForm));
    showNotification('Resume details updated successfully!');
  };

  const handleAddProject = () => {
    const newProj = {
      title: 'New Project',
      subtitle: 'Dynamic Subtitle',
      role: 'Developer',
      tech: ['React', 'TypeScript'],
      description: 'A brand new project configured dynamically via admin panel.',
      ghostText: 'CREATIVE',
      bg: '#4F46E5',
      panel: '#818CF8',
      src: '/figure1.png',
      points: [
        'Integrated dynamic parameters into the local database.',
        'Structured custom configurations inside the admin workspace.'
      ]
    };
    const updated = [...projects, newProj];
    setProjects(updated);
    localStorage.setItem('toonhub_projects', JSON.stringify(updated));
    setEditProjectIdx(updated.length - 1);
    showNotification('New project added successfully!');
  };

  const handleDeleteProject = (index: number) => {
    if (projects.length <= 1) {
      alert('You must maintain at least one project in your portfolio!');
      return;
    }
    if (window.confirm('Are you sure you want to delete this project? This will remove its mascot figure and configurations.')) {
      const updated = projects.filter((_, idx) => idx !== index);
      setProjects(updated);
      localStorage.setItem('toonhub_projects', JSON.stringify(updated));
      setEditProjectIdx(0);
      setActiveIndex(0);
      showNotification('Project deleted!');
    }
  };

  const handleRestoreDefaults = () => {
    if (window.confirm('Reset all portfolio projects, figures, and resume details back to factory defaults? This overrides local storage.')) {
      setProjects(DEFAULT_PROJECTS);
      setResumeData(DEFAULT_RESUME);
      setResumeFile(null);
      localStorage.removeItem('toonhub_projects');
      localStorage.removeItem('toonhub_resume');
      localStorage.removeItem('toonhub_resume_file');
      setEditProjectIdx(0);
      setActiveIndex(0);
      showNotification('Restored to default template!');
    }
  };

  const handleResumeFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 4 * 1024 * 1024) {
        alert('File is too large! Please upload a file smaller than 4MB.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setResumeFile(base64);
        localStorage.setItem('toonhub_resume_file', base64);
        showNotification('Resume file uploaded successfully!');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClearResumeFile = () => {
    if (window.confirm('Remove your uploaded resume file and revert back to the dynamic portfolio resume?')) {
      setResumeFile(null);
      localStorage.removeItem('toonhub_resume_file');
      showNotification('Uploaded resume removed.');
    }
  };

  const handleDownloadResumeFile = () => {
    if (!resumeFile) return;
    const link = document.createElement('a');
    link.href = resumeFile;
    
    // Determine extension
    let ext = 'pdf';
    if (resumeFile.includes('image/png')) ext = 'png';
    else if (resumeFile.includes('image/jpeg')) ext = 'jpg';
    
    link.download = `${resumeData.name.replace(/\s+/g, '_')}_Resume.${ext}`;
    link.click();
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert('File is too large! Please upload an image smaller than 2MB.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setProjectForm((prev: any) => ({ ...prev, src: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Playgrounds
  const renderDataChatPlayground = () => {
    const presets = [
      { label: "Age Distribution", query: "Plot the age distribution of our users" },
      { label: "Sales Trend", query: "Show the monthly sales growth trend" },
      { label: "Salary Outliers", query: "Find salary outliers in the employee dataset" }
    ];

    const modelsInfo = {
      llama3: { name: "Llama 3 (8B)", speed: 12, memory: 5.2, accuracy: 88, desc: "High accuracy standard. Perfect for general reasoning and structured syntax generation." },
      mistral: { name: "Mistral (7B)", speed: 15, memory: 4.8, accuracy: 85, desc: "Excellent utility model. Optimized for dense instructions and custom formatting tasks." },
      gemma: { name: "Gemma (2B)", speed: 28, memory: 2.1, accuracy: 65, desc: "Ultra-lightweight edge model. Low memory footprint, optimized for fast completions." },
      phi3: { name: "Phi 3 (3.8B)", speed: 22, memory: 2.8, accuracy: 82, desc: "Highly efficient Microsoft model. Heavy reasoning capacity with small file footprint." }
    };

    const handlePresetClick = (query: string) => {
      if (isDataChatAnalyzing) return;
      setDataChatHistory(prev => [...prev, { sender: 'user', text: query }]);
      setIsDataChatAnalyzing(true);

      setTimeout(() => {
        let responseText = "";
        let chartType: 'bar' | 'line' | 'pie' | undefined = undefined;

        if (query.includes("age")) {
          responseText = `[${modelsInfo[dataChatModel].name}] Demographics analyzed. Peak user base resides in the 25-34 age bracket (45%). Standard deviation: 8.2 years. See age distribution:`;
          chartType = 'bar';
        } else if (query.includes("sales")) {
          responseText = `[${modelsInfo[dataChatModel].name}] Sales logs loaded. Steady 18% QoQ expansion. Generating linear regression trend lines:`;
          chartType = 'line';
        } else {
          responseText = `[${modelsInfo[dataChatModel].name}] Isolated 3 executive anomalies (> $220k/yr) representing statistical outliers. Plotted outlier distribution breakdown:`;
          chartType = 'pie';
        }

        setDataChatHistory(prev => [...prev, { sender: 'bot', text: responseText, chartType }]);
        setIsDataChatAnalyzing(false);
      }, 1500);
    };

    const handleModelChange = (model: 'llama3' | 'mistral' | 'gemma' | 'phi3') => {
      setDataChatModel(model);
      setDataChatHistory(prev => [
        ...prev,
        { sender: 'bot', text: `🔄 Swapped backend context to ${modelsInfo[model].name}. Local memory initialized to ${modelsInfo[model].memory}GB. Ready for natural language analytics.` }
      ]);
    };

    const currentPanelColor = projects[activeIndex]?.panel || '#F4845F';

    return (
      <div className="flex flex-col h-[380px] bg-black/40 border border-white/10 rounded-lg overflow-hidden text-[11px] font-mono">
        {/* Model Tabs Header */}
        <div className="bg-white/5 border-b border-white/10 flex flex-col xs:flex-row justify-between items-stretch xs:items-center p-1.5 gap-1.5 flex-shrink-0">
          <div className="flex bg-black/30 p-0.5 rounded border border-white/5 overflow-x-auto gap-0.5">
            {(Object.keys(modelsInfo) as Array<keyof typeof modelsInfo>).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => handleModelChange(m)}
                className={`px-1.5 py-0.5 text-[8px] font-semibold rounded uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                  dataChatModel === m ? 'bg-white/10 text-white border border-white/10' : 'text-white/40 hover:text-white/80'
                }`}
              >
                {m}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setShowBenchmark(!showBenchmark)}
            className={`px-2 py-0.5 text-[8px] font-bold uppercase tracking-wider border rounded cursor-pointer transition-all ${
              showBenchmark 
                ? 'bg-amber-500/20 border-amber-500/50 text-amber-300' 
                : 'bg-white/5 hover:bg-white/10 border-white/10 text-white/60 hover:text-white'
            }`}
          >
            {showBenchmark ? "💬 Chat Mode" : "📊 Benchmark Mode"}
          </button>
        </div>

        {/* Content Section */}
        {showBenchmark ? (
          /* Benchmark Performance Mode */
          <div className="flex-1 overflow-y-auto p-3.5 space-y-3 bg-black/20">
            <div className="flex justify-between items-center border-b border-white/5 pb-1">
              <span className="text-[9px] uppercase font-bold text-white/50">Performance Benchmarks</span>
              <span className="text-[8px] text-zinc-500">Local Hardware Simulation</span>
            </div>

            <div className="text-[9px] text-zinc-400 leading-normal border border-white/5 p-2 rounded bg-black/35">
              <span className="text-white font-bold block mb-0.5">Active Backend: {modelsInfo[dataChatModel].name}</span>
              {modelsInfo[dataChatModel].desc}
            </div>

            {/* Benchmarks Bars */}
            <div className="space-y-2.5">
              {/* Throughput */}
              <div className="space-y-1">
                <div className="flex justify-between items-center text-[8px] text-zinc-400 uppercase font-bold">
                  <span>1. Inference Throughput (Tokens/sec) - More is Better</span>
                </div>
                <div className="space-y-1">
                  {(Object.keys(modelsInfo) as Array<keyof typeof modelsInfo>).map(m => {
                    const info = modelsInfo[m];
                    const active = dataChatModel === m;
                    const maxVal = 28;
                    const widthPct = (info.speed / maxVal) * 100;
                    return (
                      <div key={m} className="flex items-center gap-2">
                        <span className="w-16 text-[8px] text-zinc-500 text-right uppercase truncate">{info.name.split(' ')[0]}</span>
                        <div className="flex-1 h-3 bg-white/5 rounded overflow-hidden relative border border-white/5">
                          <div 
                            className="h-full rounded transition-all duration-500" 
                            style={{ 
                              width: `${widthPct}%`, 
                              backgroundColor: active ? currentPanelColor : 'rgba(255, 255, 255, 0.15)',
                              boxShadow: active ? `0 0 8px ${currentPanelColor}40` : 'none'
                            }} 
                          />
                        </div>
                        <span className={`w-8 text-[8px] font-bold font-mono text-left ${active ? 'text-white' : 'text-zinc-500'}`}>{info.speed} t/s</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Memory Usage */}
              <div className="space-y-1">
                <div className="flex justify-between items-center text-[8px] text-zinc-400 uppercase font-bold">
                  <span>2. Local RAM/VRAM Allocation - Less is Better</span>
                </div>
                <div className="space-y-1">
                  {(Object.keys(modelsInfo) as Array<keyof typeof modelsInfo>).map(m => {
                    const info = modelsInfo[m];
                    const active = dataChatModel === m;
                    const maxVal = 6;
                    const widthPct = (info.memory / maxVal) * 100;
                    return (
                      <div key={m} className="flex items-center gap-2">
                        <span className="w-16 text-[8px] text-zinc-500 text-right uppercase truncate">{info.name.split(' ')[0]}</span>
                        <div className="flex-1 h-3 bg-white/5 rounded overflow-hidden relative border border-white/5">
                          <div 
                            className="h-full rounded transition-all duration-500" 
                            style={{ 
                              width: `${widthPct}%`, 
                              backgroundColor: active ? currentPanelColor : 'rgba(255, 255, 255, 0.15)',
                              boxShadow: active ? `0 0 8px ${currentPanelColor}40` : 'none'
                            }} 
                          />
                        </div>
                        <span className={`w-8 text-[8px] font-bold font-mono text-left ${active ? 'text-white' : 'text-zinc-500'}`}>{info.memory} GB</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Accuracy */}
              <div className="space-y-1">
                <div className="flex justify-between items-center text-[8px] text-zinc-400 uppercase font-bold">
                  <span>3. MMLU Relative Benchmark (%) - More is Better</span>
                </div>
                <div className="space-y-1">
                  {(Object.keys(modelsInfo) as Array<keyof typeof modelsInfo>).map(m => {
                    const info = modelsInfo[m];
                    const active = dataChatModel === m;
                    const widthPct = info.accuracy;
                    return (
                      <div key={m} className="flex items-center gap-2">
                        <span className="w-16 text-[8px] text-zinc-500 text-right uppercase truncate">{info.name.split(' ')[0]}</span>
                        <div className="flex-1 h-3 bg-white/5 rounded overflow-hidden relative border border-white/5">
                          <div 
                            className="h-full rounded transition-all duration-500" 
                            style={{ 
                              width: `${widthPct}%`, 
                              backgroundColor: active ? currentPanelColor : 'rgba(255, 255, 255, 0.15)',
                              boxShadow: active ? `0 0 8px ${currentPanelColor}40` : 'none'
                            }} 
                          />
                        </div>
                        <span className={`w-8 text-[8px] font-bold font-mono text-left ${active ? 'text-white' : 'text-zinc-500'}`}>{info.accuracy}%</span>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          </div>
        ) : (
          /* Normal Chat History Mode */
          <>
            <div className="flex-1 overflow-y-auto p-3 space-y-2.5">
              {dataChatHistory.map((msg, i) => (
                <div key={i} className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                  <span className="text-[8px] text-white/30 uppercase mb-0.5">{msg.sender === 'user' ? 'Visitor' : 'Agent'}</span>
                  <div className={`p-2 rounded-lg max-w-[90%] ${
                    msg.sender === 'user' ? 'bg-white/10 text-white border border-white/10' : 'bg-white/5 text-white/95 border border-white/5'
                  }`}>
                    {msg.text}
                    {msg.chartType === 'bar' && (
                      <div className="mt-2 bg-black/40 p-2 rounded border border-white/5">
                        <svg viewBox="0 0 200 100" className="w-full h-20">
                          <line x1="20" y1="10" x2="20" y2="85" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
                          <line x1="20" y1="85" x2="190" y2="85" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
                          <rect x="35" y="45" width="18" height="40" fill={currentPanelColor} rx="1" />
                          <rect x="70" y="15" width="18" height="70" fill={currentPanelColor} rx="1" />
                          <rect x="105" y="35" width="18" height="50" fill={currentPanelColor} rx="1" />
                          <rect x="140" y="60" width="18" height="25" fill={currentPanelColor} rx="1" />
                          <text x="44" y="93" fill="rgba(255,255,255,0.4)" fontSize="6" textAnchor="middle">18-24</text>
                          <text x="79" y="93" fill="rgba(255,255,255,0.4)" fontSize="6" textAnchor="middle">25-34</text>
                          <text x="114" y="93" fill="rgba(255,255,255,0.4)" fontSize="6" textAnchor="middle">35-44</text>
                          <text x="149" y="93" fill="rgba(255,255,255,0.4)" fontSize="6" textAnchor="middle">45+</text>
                        </svg>
                      </div>
                    )}
                    {msg.chartType === 'line' && (
                      <div className="mt-2 bg-black/40 p-2 rounded border border-white/5">
                        <svg viewBox="0 0 200 100" className="w-full h-20">
                          <line x1="20" y1="10" x2="20" y2="85" stroke="rgba(255,255,255,0.2)" />
                          <line x1="20" y1="85" x2="190" y2="85" stroke="rgba(255,255,255,0.2)" />
                          <path d="M 20 80 L 60 70 L 100 50 L 140 45 L 180 20" fill="none" stroke={currentPanelColor} strokeWidth="1.5" />
                          <circle cx="20" cy="80" r="1.5" fill="#fff" />
                          <circle cx="60" cy="70" r="1.5" fill="#fff" />
                          <circle cx="100" cy="50" r="1.5" fill="#fff" />
                          <circle cx="140" cy="45" r="1.5" fill="#fff" />
                          <circle cx="180" cy="20" r="1.5" fill="#fff" />
                          <text x="20" y="93" fill="rgba(255,255,255,0.4)" fontSize="6" textAnchor="middle">Jan</text>
                          <text x="100" y="93" fill="rgba(255,255,255,0.4)" fontSize="6" textAnchor="middle">Mar</text>
                          <text x="180" y="93" fill="rgba(255,255,255,0.4)" fontSize="6" textAnchor="middle">May</text>
                        </svg>
                      </div>
                    )}
                    {msg.chartType === 'pie' && (
                      <div className="mt-2 bg-black/40 p-2 rounded border border-white/5 flex justify-center">
                        <svg viewBox="0 0 100 100" className="w-16 h-16">
                          <circle cx="50" cy="50" r="30" fill="transparent" stroke={currentPanelColor} strokeWidth="12" strokeDasharray="130 188" strokeDashoffset="0" />
                          <circle cx="50" cy="50" r="30" fill="transparent" stroke="rgba(255,255,255,0.15)" strokeWidth="12" strokeDasharray="58 188" strokeDashoffset="-130" />
                          <text x="50" y="53" fill="#fff" fontSize="7" fontWeight="bold" textAnchor="middle">Outliers</text>
                        </svg>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {isDataChatAnalyzing && (
                <div className="flex flex-col items-start animate-pulse">
                  <span className="text-[8px] text-white/30 uppercase mb-0.5">Agent</span>
                  <div className="bg-white/5 border border-white/5 p-2 rounded-lg text-white/60">
                    ⚡ Running {modelsInfo[dataChatModel].name} pandas logic...
                  </div>
                </div>
              )}
            </div>
            <div className="p-2 bg-white/5 border-t border-white/10 flex gap-1.5 justify-center flex-wrap flex-shrink-0">
              {presets.map((preset) => (
                <button
                  key={preset.label}
                  onClick={() => handlePresetClick(preset.query)}
                  disabled={isDataChatAnalyzing}
                  className="text-[9px] font-semibold px-2 py-1 bg-white/10 hover:bg-white/20 text-white rounded transition-colors disabled:opacity-50 cursor-pointer"
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    );
  };

  const renderMedSagePlayground = () => {
    const symptomsList = ["High Fever", "Shortness of Breath", "Persistent Cough", "Severe Headache", "Joint Pain", "Fatigue"];
    const toggleSymptom = (sym: string) => {
      setMedSageSymptoms(prev => prev.includes(sym) ? prev.filter(s => s !== sym) : [...prev, sym]);
    };

    const handleTriage = () => {
      if (medSageSymptoms.length === 0) return;
      setIsMedSageScanning(true);
      setMedSageReport(null);
      setMedSageStep('embedding');
      setMedSageTrace(["[SYS] Initializing RAG pipeline...", "[SYS] Processing selected tokens: " + medSageSymptoms.join(", ")]);

      // Step 2: Vector Search
      setTimeout(() => {
        setMedSageStep('retrieval');
        setMedSageTrace(prev => [
          ...prev,
          "[EMBED] Completed symptom token matrix conversion (1536 dimensions).",
          "[DB] Executing cosine similarity search in local DB...",
          medSageSymptoms.includes("Shortness of Breath") 
            ? "[DB MATCH] Found chunk in 'critical_respiratory.pdf' (Similarity: 0.98)" 
            : medSageSymptoms.includes("High Fever") || medSageSymptoms.includes("Persistent Cough")
              ? "[DB MATCH] Found chunk in 'viral_triage_guidelines.pdf' (Similarity: 0.91)"
              : "[DB MATCH] Found chunk in 'fatigue_recovery_rules.pdf' (Similarity: 0.94)"
        ]);
      }, 800);

      // Step 3: Augment Prompt
      setTimeout(() => {
        setMedSageStep('generation');
        setMedSageTrace(prev => [
          ...prev,
          "[CONTEXT] Extracted matching metadata and context blocks.",
          "[PROMPT] Compiling prompt window: system instructions + clinical facts + patient intake."
        ]);
      }, 1600);

      // Step 4: Generation Complete
      setTimeout(() => {
        let severity: 'Mild' | 'Moderate' | 'Critical' = 'Mild';
        let conditions = ["General Physical Exhaustion"];
        let recommendation = "Increase fluid intake, ensure rest, and check temperature periodically.";
        let details = ["RAG Score: 0.94 (Index match: rest_fatigue)", "Semantic alignment: Normal/Mild"];

        if (medSageSymptoms.includes("Shortness of Breath")) {
          severity = 'Critical';
          conditions = ["Dyspnea / Pulmonary Load", "Acute Bronchospasm"];
          recommendation = "URGENT: Visit nearest ER immediately or contact critical care hotline.";
          details = ["RAG Score: 0.98 (Index match: acute_respiratory_distress)", "Semantic alignment: Emergency"];
        } else if (medSageSymptoms.includes("High Fever") || medSageSymptoms.includes("Persistent Cough")) {
          severity = 'Moderate';
          conditions = ["Viral Respiratory Infection", "Bronchitis"];
          recommendation = "Contact primary care clinic for appointment. Keep track of temperature logs.";
          details = ["RAG Score: 0.91 (Index match: febrile_cough)", "Semantic alignment: Clinic Care"];
        } else if (medSageSymptoms.includes("Severe Headache")) {
          severity = 'Moderate';
          conditions = ["Acute Migraine Syndrome", "Neuralgia"];
          recommendation = "Rest in a quiet, dark environment. Monitor for visual disruption.";
          details = ["RAG Score: 0.89 (Index match: migraine_headache)", "Semantic alignment: Clinic Care"];
        }

        setMedSageReport({ severity, conditions, recommendation, details });
        setMedSageStep('complete');
        setIsMedSageScanning(false);
        setMedSageTrace(prev => [...prev, "[LLM] Response streaming finished.", "[SUCCESS] Clinical triage report generated successfully."]);
      }, 2400);
    };

    const steps = [
      { id: 'embedding', label: '1. Embed Ingestion', desc: 'Vectorizing token strings' },
      { id: 'retrieval', label: '2. Vector Lookup', desc: 'Cosine similarity search' },
      { id: 'generation', label: '3. Augment Prompt', desc: 'Constructing context window' },
      { id: 'complete', label: '4. Local Generation', desc: 'Executing local LLM logic' }
    ];

    const getStepStatus = (id: string) => {
      if (medSageStep === 'idle') return 'pending';
      if (medSageStep === 'complete') return 'done';
      
      const order = ['embedding', 'retrieval', 'generation', 'complete'];
      const currentIdx = order.indexOf(medSageStep);
      const stepIdx = order.indexOf(id);

      if (stepIdx < currentIdx) return 'done';
      if (stepIdx === currentIdx) return 'active';
      return 'pending';
    };

    return (
      <div className="flex flex-col space-y-3 p-3 bg-black/40 border border-white/10 rounded-lg text-[11px]">
        <span className="font-bold uppercase tracking-wider text-white/50 block text-[9px]">Symptom Selection</span>
        <div className="grid grid-cols-2 gap-1.5">
          {symptomsList.map(sym => {
            const active = medSageSymptoms.includes(sym);
            return (
              <button
                key={sym}
                onClick={() => toggleSymptom(sym)}
                disabled={isMedSageScanning}
                className={`p-2 rounded text-left transition-all flex justify-between items-center text-[10px] ${
                  active ? 'bg-emerald-500/20 border border-emerald-500/60 text-emerald-300' : 'bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 disabled:opacity-40'
                }`}
              >
                <span>{sym}</span>
                <span className={`w-2 h-2 rounded-full border ${active ? 'bg-emerald-400 border-emerald-500' : 'border-white/30'}`} />
              </button>
            );
          })}
        </div>

        <div className="flex gap-2">
          {medSageStep !== 'idle' && (
            <button
              onClick={() => {
                setMedSageStep('idle');
                setMedSageReport(null);
                setMedSageTrace([]);
              }}
              className="px-2.5 py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded transition-colors cursor-pointer text-[10px] uppercase font-bold"
            >
              Reset
            </button>
          )}
          <button
            onClick={handleTriage}
            disabled={medSageSymptoms.length === 0 || isMedSageScanning}
            className="flex-1 py-2 bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-black font-bold uppercase tracking-wider rounded transition-colors cursor-pointer text-[10px]"
          >
            {isMedSageScanning ? "⚡ running pipeline..." : "Run MedSage Diagnostic"}
          </button>
        </div>

        {/* RAG pipeline visual stepper */}
        {medSageStep !== 'idle' && (
          <div className="border border-white/10 rounded p-2.5 bg-black/20 space-y-3">
            <div className="text-[8px] uppercase text-zinc-500 font-bold">RAG Retrieval Pipeline Steps</div>
            
            {/* Steps Nodes */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 border-b border-white/5 pb-2.5">
              {steps.map(s => {
                const status = getStepStatus(s.id);
                return (
                  <div key={s.id} className={`p-1.5 rounded border transition-all ${
                    status === 'active' 
                      ? 'bg-emerald-500/10 border-emerald-500 text-emerald-300 scale-105' 
                      : status === 'done'
                        ? 'bg-white/5 border-emerald-500/40 text-emerald-400/80'
                        : 'bg-white/2 border-white/5 text-zinc-600'
                  }`}>
                    <div className="font-bold text-[8.5px] truncate">{s.label}</div>
                    <div className="text-[7.5px] opacity-75 truncate">{s.desc}</div>
                  </div>
                );
              })}
            </div>

            {/* Console logs */}
            <div className="bg-black/60 p-2 rounded border border-white/5 h-24 overflow-y-auto space-y-1 font-mono text-[8.5px] text-zinc-300">
              {medSageTrace.map((log, i) => (
                <div key={i} className={
                  log.includes('[SUCCESS]') ? 'text-emerald-400 font-bold animate-pulse' :
                  log.includes('[DB MATCH]') ? 'text-cyan-400 font-bold' :
                  log.includes('[EMBED]') ? 'text-amber-300' :
                  log.includes('[SYS]') ? 'text-zinc-500' : 'text-zinc-300'
                }>
                  {log}
                </div>
              ))}
            </div>
          </div>
        )}

        {medSageReport && (
          <div className="p-2.5 border rounded space-y-2" style={{
            borderColor: medSageReport.severity === 'Critical' ? '#ef4444' : medSageReport.severity === 'Moderate' ? '#f59e0b' : '#10b981',
            backgroundColor: 'rgba(0,0,0,0.2)'
          }}>
            <div className="flex justify-between items-center">
              <span className="text-[8px] uppercase text-white/40">Status Assessment</span>
              <span className={`font-bold text-[9px] uppercase px-1.5 py-0.5 rounded ${
                medSageReport.severity === 'Critical' ? 'bg-red-500/20 text-red-300' : medSageReport.severity === 'Moderate' ? 'bg-amber-500/20 text-amber-300' : 'bg-emerald-500/20 text-emerald-300'
              }`}>{medSageReport.severity}</span>
            </div>
            <div>
              <span className="text-[8px] text-white/30 block">CONDITIONS</span>
              <div className="font-bold text-white/90 text-[11px]">{medSageReport.conditions.join(" / ")}</div>
            </div>
            <div>
              <span className="text-[8px] text-white/30 block">ADVICE</span>
              <p className="text-white/80 leading-normal font-medium">{medSageReport.recommendation}</p>
            </div>
            <div className="pt-1.5 border-t border-white/5 font-mono text-[8px] text-white/30">
              {medSageReport.details.map((d, i) => <div key={i}>• {d}</div>)}
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderNlpPlayground = () => {
    const presets = [
      { label: "Valid Job Listing", text: "We are seeking a Software Engineer to join our developer team. You will build components in React and TypeScript, optimize performance, and participate in code reviews. Requires 1+ years experience. Offers medical benefits and 401(k)." },
      { label: "Scam Alert Listing", text: "!!! URGENT JOB ALERT !!! Work from home personal assistant wanted. Make $5000/week in your spare time. No experience or interview required! Send a quick deposit via wire transfer for your laptop package. Contact us on WhatsApp now!" }
    ];

    const handleAnalyze = () => {
      if (!nlpInputText) return;
      setIsNlpAnalyzing(true);
      setNlpRiskScore(null);

      setTimeout(() => {
        const textLower = nlpInputText.toLowerCase();
        const spamWords = ["$5000/week", "wire transfer", "deposit", "no interview", "whatsapp", "telegram", "urgent", "cash app"];
        let matches = 0;
        const found: string[] = [];

        spamWords.forEach(word => {
          if (textLower.includes(word)) {
            matches++;
            found.push(word);
          }
        });

        const score = Math.min(Math.round((matches / 3) * 100), 100) || 4;
        setNlpRiskScore(score);
        setNlpKeywords(found);
        setIsNlpAnalyzing(false);
      }, 1200);
    };

    const renderHighlightedText = () => {
      const spamWords = ["\\$5000/week", "wire transfer", "deposit", "no interview", "whatsapp", "telegram", "urgent", "cash app"];
      let txt = nlpInputText;

      spamWords.forEach(word => {
        const regex = new RegExp(`(${word})`, 'gi');
        txt = txt.replace(regex, '<span class="bg-red-500/20 text-red-300 border border-red-500/40 px-1 rounded font-semibold">$1</span>');
      });

      return <div dangerouslySetInnerHTML={{ __html: txt }} className="p-2.5 bg-white/5 border border-white/10 rounded text-white/90 leading-relaxed whitespace-pre-wrap select-text text-[10px] font-medium" />;
    };

    return (
      <div className="flex flex-col space-y-3 p-3 bg-black/40 border border-white/10 rounded-lg text-[11px]">
        <div className="flex gap-2">
          {presets.map((p, idx) => (
            <button
              key={idx}
              onClick={() => { setNlpInputText(p.text); setNlpRiskScore(null); }}
              className="flex-1 py-1 px-1.5 bg-white/5 border border-white/10 hover:bg-white/10 rounded text-[9px] font-semibold text-white/80 transition-colors cursor-pointer text-center"
            >
              {p.label}
            </button>
          ))}
        </div>
        <textarea
          value={nlpInputText}
          onChange={(e) => setNlpInputText(e.target.value)}
          placeholder="Paste job description text here..."
          className="w-full h-20 p-2 bg-black/50 border border-white/10 rounded text-white placeholder-white/30 text-[10px] focus:border-purple-500 focus:outline-none resize-none font-medium"
        />
        <button
          onClick={handleAnalyze}
          disabled={!nlpInputText || isNlpAnalyzing}
          className="w-full py-1.5 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white font-bold uppercase tracking-wider rounded transition-colors cursor-pointer text-[10px]"
        >
          {isNlpAnalyzing ? "⚡ Running NLP Classifiers..." : "Analyze Listing"}
        </button>

        {nlpRiskScore !== null && (
          <div className="p-2.5 bg-white/5 border border-white/10 rounded space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-[8px] text-white/40 uppercase">Fraud Probability</span>
              <span className={`font-bold font-mono text-[11px] ${nlpRiskScore > 75 ? 'text-red-400' : nlpRiskScore > 30 ? 'text-amber-400' : 'text-emerald-400'}`}>
                {nlpRiskScore}% RISK
              </span>
            </div>
            <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-700 ease-out"
                style={{
                  width: `${nlpRiskScore}%`,
                  backgroundColor: nlpRiskScore > 75 ? '#ef4444' : nlpRiskScore > 30 ? '#f59e0b' : '#10b981'
                }}
              />
            </div>
            <div>
              <span className="text-[8px] text-white/30 block mb-1">SCAN OVERVIEW</span>
              {renderHighlightedText()}
            </div>
            {nlpKeywords.length > 0 && (
              <div className="text-[8px] text-red-300/80 font-bold uppercase">
                ⚠️ TRIGGERS: {nlpKeywords.join(', ')}
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  const renderAwsPlayground = () => {
    const nodes = [
      { id: 'client', name: 'User Client', icon: '🌐', pos: 'left-2 top-[56px] sm:left-4' },
      { id: 'cloudfront', name: 'CloudFront CDN', icon: '⚡', pos: 'left-[22%] top-[56px] sm:left-[24%]' },
      { id: 's3', name: 'S3 Bucket', icon: '🪣', pos: 'left-[54%] top-[8px] sm:left-[52%]' },
      { id: 'ec2', name: 'EC2 Server (VPC)', icon: '🖥️', pos: 'left-[54%] top-[104px] sm:left-[52%]' },
      { id: 'rds', name: 'RDS MySQL', icon: '🗄️', pos: 'left-[82%] top-[104px]' }
    ];

    const details = {
      client: { role: "Origin Browser client", text: "Dispatches HTTP requests over SSL. Executes React virtual DOM nodes." },
      cloudfront: { role: "Global Delivery Edge", text: "Encrypts transit routes and distributes content edge caches globally for minimal latency." },
      s3: { role: "Static Asset Origin", text: "Stores production UI files. Strict bucket policies ensure access is limited strictly to CloudFront." },
      ec2: { role: "API compute Node", text: "Executes backend logic inside a secure VPC. Configured with restrictive security groups." },
      rds: { role: "Secured relational DB", text: "Relational database server hosting core data. Accessible strictly from EC2 compute layers." }
    };

    const triggerTrafficSimulation = () => {
      if (awsSimStatus === 'running') return;
      setAwsSimStatus('running');
      setAwsSimLogs(['[SYS] Handshake initializing with TLS 1.3...']);

      setTimeout(() => {
        setAwsSimLogs(prev => [...prev, '[CLIENT] GET /index.html requested from CDN edge...']);
      }, 400);

      setTimeout(() => {
        setAwsSimLogs(prev => [...prev, '[CLOUDFRONT] Cache HIT on index.html. Serving static layout from S3 origin.']);
      }, 800);

      setTimeout(() => {
        setAwsSimLogs(prev => [...prev, '[CLIENT] Initial layout loaded. Triggering API fetch: GET /api/v1/jobs']);
      }, 1200);

      setTimeout(() => {
        setAwsSimLogs(prev => [...prev, '[CLOUDFRONT] Cache MISS on API route. Forwarding request to EC2 inside private VPC...']);
      }, 1600);

      setTimeout(() => {
        setAwsSimLogs(prev => [...prev, '[EC2] Received request. Executing query: SELECT * FROM jobs WHERE active=True;']);
      }, 2000);

      setTimeout(() => {
        setAwsSimLogs(prev => [...prev, '[RDS] Execution: 12ms. Index Scan successful. Returning records to EC2 layer...']);
      }, 2400);

      setTimeout(() => {
        setAwsSimLogs(prev => [...prev, '[EC2] Response serialized. Status: 200 OK. Returning packet (4.8KB).']);
      }, 2800);

      setTimeout(() => {
        setAwsSimLogs(prev => [...prev, '[SUCCESS] Request completed. Network latency: 45ms. UI updated.']);
        setAwsSimStatus('success');
      }, 3200);
    };

    const activeNodeData = awsActiveNode ? details[awsActiveNode] : null;

    return (
      <div className="flex flex-col space-y-3 p-3 bg-black/40 border border-white/10 rounded-lg text-[11px] font-mono">
        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes dashflow {
            to { stroke-dashoffset: -20; }
          }
          .conn-line {
            stroke: rgba(255, 255, 255, 0.1);
            stroke-width: 1.5;
          }
          .conn-active {
            stroke: #6EB5FF;
            stroke-dasharray: 4, 4;
            animation: dashflow 1s infinite linear;
          }
        ` }} />

        <div className="flex justify-between items-center flex-shrink-0">
          <span className="font-bold uppercase tracking-wider text-white/50 block text-[9px]">VPC Architecture Topology</span>
          {awsSimStatus !== 'idle' && (
            <button
              onClick={() => {
                setAwsSimStatus('idle');
                setAwsSimLogs([]);
              }}
              className="px-1.5 py-0.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded text-[8px] font-bold uppercase cursor-pointer"
            >
              Reset Map
            </button>
          )}
        </div>

        {/* Visual SVG Topology Map */}
        <div className="relative h-[165px] bg-black/35 rounded border border-white/5 overflow-hidden">
          {/* Connection Lines (SVG) */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {/* Client -> CloudFront */}
            <line 
              x1="12%" y1="52%" x2="28%" y2="52%" 
              className={`conn-line ${awsSimStatus === 'running' ? 'conn-active' : ''}`}
            />
            {/* CloudFront -> S3 (Static assets) */}
            <path 
              d="M 28% 52% Q 38% 20% 56% 20%" 
              fill="none" 
              className={`conn-line ${awsSimStatus === 'running' ? 'conn-active' : ''}`}
            />
            {/* CloudFront -> EC2 (API Backend) */}
            <path 
              d="M 28% 52% Q 38% 80% 56% 80%" 
              fill="none" 
              className={`conn-line ${awsSimStatus === 'running' ? 'conn-active' : ''}`}
            />
            {/* EC2 -> RDS */}
            <line 
              x1="56%" y1="80%" x2="84%" y2="80%" 
              className={`conn-line ${awsSimStatus === 'running' ? 'conn-active' : ''}`}
            />
          </svg>

          {/* Interactive Nodes */}
          {nodes.map(n => {
            const active = awsActiveNode === n.id;
            return (
              <button
                key={n.id}
                onClick={() => setAwsActiveNode(n.id as any)}
                className={`absolute ${n.pos} flex flex-col items-center justify-center p-1 border rounded-lg transition-all cursor-pointer w-[60px] h-[50px] ${
                  active 
                    ? 'bg-[#6EB5FF]/20 border-[#6EB5FF] text-white scale-105 shadow-[0_0_8px_rgba(110,181,255,0.3)]' 
                    : 'bg-zinc-900/80 border-white/10 text-white/70 hover:bg-zinc-800/80 hover:border-white/20'
                }`}
              >
                <span className="text-base leading-none">{n.icon}</span>
                <span className="text-[7.5px] font-bold uppercase tracking-wider text-center mt-1 leading-none truncate w-full">{n.name}</span>
              </button>
            );
          })}
        </div>

        {/* Traffic trigger and console logs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {/* Details Panel */}
          <div className="p-2.5 bg-white/5 border border-white/10 rounded min-h-[90px] flex flex-col justify-center">
            {awsActiveNode && activeNodeData ? (
              <div>
                <div className="text-[8px] uppercase text-[#6EB5FF] font-bold mb-0.5">{nodes.find(n => n.id === awsActiveNode)?.name}</div>
                <div className="font-bold text-[10px] text-white/90 leading-tight">{activeNodeData.role}</div>
                <p className="text-white/70 mt-1 text-[9px] leading-relaxed">{activeNodeData.text}</p>
              </div>
            ) : (
              <div className="text-center text-white/40 italic py-2 text-[9px]">Click any topology node above to inspect its security rules and role.</div>
            )}
          </div>

          {/* Traffic Log Simulator */}
          <div className="flex flex-col space-y-2">
            <button
              onClick={triggerTrafficSimulation}
              disabled={awsSimStatus === 'running'}
              className="py-1.5 bg-[#6EB5FF] hover:bg-[#5aa3f5] disabled:opacity-50 text-black font-bold uppercase tracking-wider rounded transition-colors cursor-pointer text-[9px]"
            >
              {awsSimStatus === 'running' ? "⚡ Routing Traffic..." : "Simulate Traffic Request"}
            </button>
            
            <div className="p-2 bg-black/60 border border-white/5 rounded h-[62px] overflow-y-auto space-y-1 font-mono text-[8px] text-zinc-400">
              {awsSimLogs.length > 0 ? (
                awsSimLogs.map((log, i) => (
                  <div key={i} className={
                    log.includes('SUCCESS') ? 'text-emerald-400 font-bold' :
                    log.includes('CLOUDFRONT') ? 'text-amber-300' :
                    log.includes('EC2') ? 'text-cyan-300' :
                    log.includes('RDS') ? 'text-purple-300' : 'text-zinc-400'
                  }>
                    {log}
                  </div>
                ))
              ) : (
                <div className="text-zinc-600 italic">Click simulator to run end-to-end VPC network requests.</div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderGenericPlayground = () => {
    const currentTech = projects[activeIndex]?.tech || [];
    return (
      <div className="flex flex-col space-y-3 p-3 bg-black/40 border border-white/10 rounded-lg text-[11px] font-mono">
        <span className="font-bold uppercase tracking-wider text-white/50 block text-[9px]">Dynamic Tech Inspector</span>
        <div className="p-2.5 bg-black/30 border border-white/5 rounded space-y-2">
          <div className="text-[10px] text-white/80 font-bold">Dynamic Modules Detected:</div>
          <div className="flex flex-wrap gap-1">
            {currentTech.map((t: string) => (
              <span key={t} className="px-2 py-0.5 bg-white/10 rounded text-[9px] text-white/90 border border-white/5">{t}</span>
            ))}
          </div>
        </div>
        <button
          onClick={() => {
            setGenericSimStatus('running');
            setGenericLogs(['[SYSTEM] Initializing service playground...', '[SYSTEM] Parsing tech stack modules...']);
            
            setTimeout(() => {
              setGenericLogs(prev => [...prev, `[INIT] Found ${currentTech.length} dependencies: ${currentTech.join(', ')}`]);
            }, 400);

            setTimeout(() => {
              setGenericLogs(prev => [...prev, '[TEST] Running unit tests and integration hooks...', '[TEST] Simulating network requests (200 OK)...']);
            }, 900);

            setTimeout(() => {
              setGenericLogs(prev => [...prev, '[DEPLOY] Dynamic environment built successfully!', '[SUCCESS] System is healthy and operating at 100% efficiency.']);
              setGenericSimStatus('success');
            }, 1500);
          }}
          disabled={genericSimStatus === 'running'}
          className="w-full py-1.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-bold uppercase tracking-wider rounded transition-colors cursor-pointer text-[10px]"
        >
          {genericSimStatus === 'running' ? '⚡ Running Deployment Check...' : 'Trigger Service Health Check'}
        </button>

        {genericLogs.length > 0 && (
          <div className="p-2 bg-black/50 border border-white/5 rounded h-32 overflow-y-auto space-y-1 text-[9px] text-zinc-300">
            {genericLogs.map((log, i) => (
              <div key={i} className={log.includes('SUCCESS') ? 'text-emerald-400 font-bold' : log.includes('SYSTEM') ? 'text-zinc-500' : 'text-zinc-300'}>
                {log}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const renderInteractiveDemo = () => {
    const title = (projects[activeIndex]?.title || '').toLowerCase();
    if (title.includes('datachat')) {
      return renderDataChatPlayground();
    } else if (title.includes('medsage') || title.includes('health') || title.includes('clinic')) {
      return renderMedSagePlayground();
    } else if (title.includes('nlp') || title.includes('detector') || title.includes('fraud') || title.includes('anti-fraud')) {
      return renderNlpPlayground();
    } else if (title.includes('aws') || title.includes('cloud') || title.includes('infra') || title.includes('fullstack')) {
      return renderAwsPlayground();
    } else {
      return renderGenericPlayground();
    }
  };

  // Roles calculation
  const getRole = (index: number) => {
    if (index === activeIndex) return 'center';
    if (index === (activeIndex + projects.length - 1) % projects.length) return 'left';
    if (index === (activeIndex + 1) % projects.length) return 'right';
    return 'back';
  };

  const getRoleStyles = (role: 'center' | 'left' | 'right' | 'back') => {
    switch (role) {
      case 'center':
        return {
          transform: `translateX(-50%) scale(${isMobile ? 1.1 : 1.25})`,
          filter: 'blur(0px)',
          opacity: 1,
          zIndex: 20,
          left: '50%',
          height: isMobile ? '52%' : '75%',
          bottom: isMobile ? '22%' : '0px',
        };
      case 'left':
        return {
          transform: 'translateX(-50%) scale(1)',
          filter: 'blur(2px)',
          opacity: 0.85,
          zIndex: 10,
          left: isMobile ? '20%' : '30%',
          height: isMobile ? '14%' : '22%',
          bottom: isMobile ? '30%' : '10%',
        };
      case 'right':
        return {
          transform: 'translateX(-50%) scale(1)',
          filter: 'blur(2px)',
          opacity: 0.85,
          zIndex: 10,
          left: isMobile ? '80%' : '70%',
          height: isMobile ? '14%' : '22%',
          bottom: isMobile ? '30%' : '10%',
        };
      case 'back':
        return {
          transform: 'translateX(-50%) scale(1)',
          filter: 'blur(4px)',
          opacity: 1,
          zIndex: 5,
          left: '50%',
          height: isMobile ? '11%' : '17%',
          bottom: isMobile ? '30%' : '10%',
        };
    }
  };

  // Main portfolio active project fallbacks
  const activeProj = projects[activeIndex] || DEFAULT_PROJECTS[0];

  // Admin Panel Dashboard Render
  const renderAdminDashboard = () => {
    return (
      <div className="bg-zinc-950 text-zinc-100 min-h-screen flex flex-col font-sans">
        {/* Top Navbar */}
        <header className="bg-zinc-900 border-b border-zinc-800 px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-black font-extrabold text-lg">T</div>
            <div>
              <h1 className="text-sm font-bold uppercase tracking-wider text-white">ToonHub Dashboard</h1>
              <p className="text-[10px] text-zinc-400">Manage figures, background text, projects, and resume</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleRestoreDefaults}
              className="flex items-center gap-1.5 px-3 py-1.5 border border-red-900/50 hover:bg-red-950/40 text-red-400 text-xs font-bold uppercase tracking-wider rounded-lg transition-all cursor-pointer"
            >
              <RefreshCw size={12} /> Restore Defaults
            </button>
            <button
              onClick={() => navigateTo('/')}
              className="flex items-center gap-1.5 px-4 py-1.5 bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-black text-xs font-bold uppercase tracking-wider rounded-lg transition-all cursor-pointer"
            >
              Back to Portfolio
            </button>
          </div>
        </header>

        {/* Dynamic Notification bar */}
        {saveStatus && (
          <div className="bg-emerald-500 text-black px-6 py-2.5 text-center text-xs font-bold uppercase tracking-wider animate-pulse flex items-center justify-center gap-2">
            <Sparkles size={14} /> {saveStatus}
          </div>
        )}

        {/* Workspace Body */}
        <div className="flex-1 flex flex-col lg:flex-row">
          {/* Side Tabs Switcher */}
          <aside className="w-full lg:w-64 bg-zinc-900 border-b lg:border-b-0 lg:border-r border-zinc-800 p-4 space-y-2 flex flex-row lg:flex-col gap-2 lg:gap-0">
            <button
              onClick={() => setAdminTab('projects')}
              className={`w-full text-left px-4 py-3 rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
                adminTab === 'projects' ? 'bg-zinc-800 text-white border-l-2 border-emerald-500' : 'text-zinc-400 hover:bg-zinc-800/40 hover:text-white'
              }`}
            >
              💼 Manage Projects
            </button>
            <button
              onClick={() => setAdminTab('resume')}
              className={`w-full text-left px-4 py-3 rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
                adminTab === 'resume' ? 'bg-zinc-800 text-white border-l-2 border-emerald-500' : 'text-zinc-400 hover:bg-zinc-800/40 hover:text-white'
              }`}
            >
              📄 Manage Resume CV
            </button>
          </aside>

          {/* Form Editing Workspace */}
          <main className="flex-1 p-6 sm:p-10 overflow-y-auto">
            {adminTab === 'projects' ? (
              <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
                {/* Projects Selector Panel */}
                <div className="xl:col-span-1 bg-zinc-900 border border-zinc-800 rounded-xl p-4 flex flex-col justify-between min-h-[350px]">
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest block mb-2">Projects List</span>
                    {projects.map((p, idx) => (
                      <div
                        key={idx}
                        className={`group p-3 rounded-lg flex justify-between items-center cursor-pointer transition-all border ${
                          editProjectIdx === idx ? 'bg-zinc-800 border-emerald-500/50 text-white' : 'bg-zinc-950/40 border-transparent text-zinc-400 hover:bg-zinc-800/40'
                        }`}
                        onClick={() => setEditProjectIdx(idx)}
                      >
                        <div className="min-w-0">
                          <div className="font-bold text-xs truncate text-white">{p.title}</div>
                          <div className="text-[10px] text-zinc-500 truncate">{p.role}</div>
                        </div>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteProject(idx);
                          }}
                          className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-950 text-red-400 hover:text-red-300 rounded transition-all"
                          title="Delete Project"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={handleAddProject}
                    className="w-full mt-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-bold uppercase tracking-wider rounded-lg border border-zinc-700 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Plus size={14} /> Add Project Figure
                  </button>
                </div>

                {/* Edit Form Panel */}
                <div className="xl:col-span-3">
                  {projectForm ? (
                    <form onSubmit={handleSaveProjects} className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 sm:p-8 space-y-6">
                      <div className="flex justify-between items-center border-b border-zinc-800 pb-4">
                        <div>
                          <h2 className="font-bold text-base text-white">Project Figure Details</h2>
                          <p className="text-[11px] text-zinc-400">Configure parameters for active mascot slot</p>
                        </div>
                        <button
                          type="submit"
                          className="flex items-center gap-1.5 px-5 py-2 bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-black text-xs font-bold uppercase tracking-wider rounded-lg transition-all cursor-pointer"
                        >
                          <Save size={13} /> Save Changes
                        </button>
                      </div>

                      {/* Title & Subtitle Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col space-y-1.5">
                          <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wide">Project Title</label>
                          <input
                            type="text"
                            required
                            value={projectForm.title}
                            onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                            className="bg-zinc-950 border border-zinc-800 rounded-lg text-white p-2.5 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:outline-none text-xs"
                          />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                          <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wide">Subtitle / Tagline</label>
                          <input
                            type="text"
                            required
                            value={projectForm.subtitle}
                            onChange={(e) => setProjectForm({ ...projectForm, subtitle: e.target.value })}
                            className="bg-zinc-950 border border-zinc-800 rounded-lg text-white p-2.5 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:outline-none text-xs"
                          />
                        </div>
                      </div>

                      {/* Role & Background Text (Ghost Text) */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col space-y-1.5">
                          <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wide">Role / Position</label>
                          <input
                            type="text"
                            required
                            value={projectForm.role}
                            onChange={(e) => setProjectForm({ ...projectForm, role: e.target.value })}
                            className="bg-zinc-950 border border-zinc-800 rounded-lg text-white p-2.5 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:outline-none text-xs"
                          />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                          <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wide">Background Text (e.g. ANTI-FRAUD)</label>
                          <input
                            type="text"
                            required
                            value={projectForm.ghostText}
                            onChange={(e) => setProjectForm({ ...projectForm, ghostText: e.target.value })}
                            className="bg-zinc-950 border border-zinc-800 rounded-lg text-white p-2.5 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:outline-none text-xs"
                          />
                        </div>
                      </div>

                      {/* Theme Colors */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col space-y-1.5">
                          <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wide">Background Color Hex (Transition bg)</label>
                          <div className="flex gap-2">
                            <input
                              type="color"
                              value={projectForm.bg}
                              onChange={(e) => setProjectForm({ ...projectForm, bg: e.target.value })}
                              className="w-10 h-9 bg-zinc-950 border border-zinc-800 rounded-lg cursor-pointer p-0.5"
                            />
                            <input
                              type="text"
                              value={projectForm.bg}
                              onChange={(e) => setProjectForm({ ...projectForm, bg: e.target.value })}
                              className="bg-zinc-950 border border-zinc-800 rounded-lg text-white p-2.5 flex-1 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:outline-none text-xs"
                            />
                          </div>
                        </div>
                        <div className="flex flex-col space-y-1.5">
                          <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wide">Panel Glow/Accent Color Hex</label>
                          <div className="flex gap-2">
                            <input
                              type="color"
                              value={projectForm.panel}
                              onChange={(e) => setProjectForm({ ...projectForm, panel: e.target.value })}
                              className="w-10 h-9 bg-zinc-950 border border-zinc-800 rounded-lg cursor-pointer p-0.5"
                            />
                            <input
                              type="text"
                              value={projectForm.panel}
                              onChange={(e) => setProjectForm({ ...projectForm, panel: e.target.value })}
                              className="bg-zinc-950 border border-zinc-800 rounded-lg text-white p-2.5 flex-1 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:outline-none text-xs"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Mascot Figure Image Configurator */}
                      <div className="border-t border-zinc-800 pt-5 space-y-4">
                        <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wide block">Mascot Character Figure</span>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                          {/* Left: upload base64 */}
                          <div className="flex flex-col space-y-1.5">
                            <label className="text-[9px] font-bold text-zinc-500 uppercase">Upload custom figure</label>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleImageUpload}
                              className="bg-zinc-950 border border-zinc-800 rounded-lg text-zinc-400 text-xs p-1.5 focus:border-emerald-500 focus:outline-none cursor-pointer"
                            />
                          </div>

                          {/* Center: custom URL text */}
                          <div className="flex flex-col space-y-1.5">
                            <label className="text-[9px] font-bold text-zinc-500 uppercase">Mascot Image URL / Path</label>
                            <input
                              type="text"
                              value={projectForm.src}
                              onChange={(e) => setProjectForm({ ...projectForm, src: e.target.value })}
                              className="bg-zinc-950 border border-zinc-800 rounded-lg text-white p-2 focus:border-emerald-500 focus:outline-none text-xs"
                            />
                          </div>

                          {/* Right: preview current */}
                          <div className="flex flex-col items-center bg-zinc-950 border border-zinc-800 rounded-lg p-2 h-24 justify-center">
                            <span className="text-[8px] text-zinc-500 uppercase mb-1">Mascot Preview</span>
                            {projectForm.src ? (
                              <img src={projectForm.src} alt="Mascot Preview" className="h-16 object-contain object-bottom" />
                            ) : (
                              <div className="text-[9px] text-zinc-600 italic">No image selected</div>
                            )}
                          </div>
                        </div>

                        {/* Preset templates */}
                        <div>
                          <label className="text-[9px] font-bold text-zinc-500 uppercase block mb-1">Preset Characters</label>
                          <div className="flex gap-3">
                            {['/figure1.png', '/figure2.png', '/figure3.png', '/figure4.png'].map((path) => (
                              <button
                                key={path}
                                type="button"
                                onClick={() => setProjectForm({ ...projectForm, src: path })}
                                className={`p-1 bg-zinc-950 border rounded-lg hover:border-zinc-500 transition-all ${
                                  projectForm.src === path ? 'border-emerald-500 scale-105 bg-zinc-850' : 'border-zinc-800'
                                }`}
                              >
                                <div className="w-12 h-12 flex items-center justify-center overflow-hidden">
                                  <img src={path} alt="preset" className="h-full object-contain" />
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Tech tags list */}
                      <div className="flex flex-col space-y-1.5">
                        <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wide">Technology Stack (Comma separated)</label>
                        <input
                          type="text"
                          value={projectForm.tech.join(', ')}
                          onChange={(e) => {
                            const tags = e.target.value.split(',').map(tag => tag.trim());
                            setProjectForm({ ...projectForm, tech: tags });
                          }}
                          className="bg-zinc-950 border border-zinc-800 rounded-lg text-white p-2.5 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:outline-none text-xs"
                        />
                        <span className="text-[9px] text-zinc-500 italic">Example: React, Django, AWS, LangChain</span>
                      </div>

                      {/* Project Description Paragraph */}
                      <div className="flex flex-col space-y-1.5">
                        <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wide">Short Description</label>
                        <textarea
                          rows={3}
                          value={projectForm.description}
                          onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                          className="bg-zinc-950 border border-zinc-800 rounded-lg text-white p-2.5 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:outline-none text-xs resize-none"
                        />
                      </div>

                      {/* Bullet points contribution scope */}
                      <div className="flex flex-col space-y-1.5">
                        <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wide">Case Study Contributions (One per line)</label>
                        <textarea
                          rows={5}
                          value={projectForm.points.join('\n')}
                          onChange={(e) => {
                            const pts = e.target.value.split('\n');
                            setProjectForm({ ...projectForm, points: pts });
                          }}
                          className="bg-zinc-950 border border-zinc-800 rounded-lg text-white p-2.5 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:outline-none text-xs font-mono"
                        />
                      </div>
                    </form>
                  ) : (
                    <div className="text-center italic text-zinc-500 py-12">No project selected or available. Click "+ Add Project" to build one!</div>
                  )}
                </div>
              </div>
            ) : (
              // Resume Tab Manager
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 sm:p-8">
                {resumeForm ? (
                  <form onSubmit={handleSaveResume} className="space-y-6">
                    <div className="flex justify-between items-center border-b border-zinc-800 pb-4">
                      <div>
                        <h2 className="font-bold text-base text-white">Resume CV Details</h2>
                        <p className="text-[11px] text-zinc-400">Configure your contact details and upload a custom resume PDF</p>
                      </div>
                      <button
                        type="submit"
                        className="flex items-center gap-1.5 px-5 py-2 bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-black text-xs font-bold uppercase tracking-wider rounded-lg transition-all cursor-pointer"
                      >
                        <Save size={13} /> Save Contact Details
                      </button>
                    </div>

                    {/* Basic Info */}
                    <div className="space-y-4">
                      <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wide block border-b border-zinc-800 pb-1">1. Contact & Profile Links</span>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="flex flex-col space-y-1.5">
                          <label className="text-[9px] font-bold text-zinc-500 uppercase">Full Name</label>
                          <input
                            type="text"
                            required
                            value={resumeForm.name}
                            onChange={(e) => setResumeForm({ ...resumeForm, name: e.target.value })}
                            className="bg-zinc-950 border border-zinc-800 rounded-lg text-white p-2.5 focus:border-emerald-500 focus:outline-none text-xs"
                          />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                          <label className="text-[9px] font-bold text-zinc-500 uppercase">Job Title</label>
                          <input
                            type="text"
                            required
                            value={resumeForm.title}
                            onChange={(e) => setResumeForm({ ...resumeForm, title: e.target.value })}
                            className="bg-zinc-950 border border-zinc-800 rounded-lg text-white p-2.5 focus:border-emerald-500 focus:outline-none text-xs"
                          />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                          <label className="text-[9px] font-bold text-zinc-500 uppercase">Location</label>
                          <input
                            type="text"
                            required
                            value={resumeForm.location}
                            onChange={(e) => setResumeForm({ ...resumeForm, location: e.target.value })}
                            className="bg-zinc-950 border border-zinc-800 rounded-lg text-white p-2.5 focus:border-emerald-500 focus:outline-none text-xs"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col space-y-1.5">
                          <label className="text-[9px] font-bold text-zinc-500 uppercase">Email</label>
                          <input
                            type="email"
                            required
                            value={resumeForm.email}
                            onChange={(e) => setResumeForm({ ...resumeForm, email: e.target.value })}
                            className="bg-zinc-950 border border-zinc-800 rounded-lg text-white p-2.5 focus:border-emerald-500 focus:outline-none text-xs"
                          />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                          <label className="text-[9px] font-bold text-zinc-500 uppercase">Phone Number</label>
                          <input
                            type="text"
                            required
                            value={resumeForm.phone}
                            onChange={(e) => setResumeForm({ ...resumeForm, phone: e.target.value })}
                            className="bg-zinc-950 border border-zinc-800 rounded-lg text-white p-2.5 focus:border-emerald-500 focus:outline-none text-xs"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col space-y-1.5">
                          <label className="text-[9px] font-bold text-zinc-500 uppercase">LinkedIn URL</label>
                          <input
                            type="text"
                            value={resumeForm.linkedin}
                            onChange={(e) => setResumeForm({ ...resumeForm, linkedin: e.target.value })}
                            className="bg-zinc-950 border border-zinc-800 rounded-lg text-white p-2.5 focus:border-emerald-500 focus:outline-none text-xs"
                          />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                          <label className="text-[9px] font-bold text-zinc-500 uppercase">GitHub URL</label>
                          <input
                            type="text"
                            value={resumeForm.github}
                            onChange={(e) => setResumeForm({ ...resumeForm, github: e.target.value })}
                            className="bg-zinc-950 border border-zinc-800 rounded-lg text-white p-2.5 focus:border-emerald-500 focus:outline-none text-xs"
                          />
                        </div>
                      </div>

                      <div className="flex flex-col space-y-1.5">
                        <label className="text-[9px] font-bold text-zinc-500 uppercase">Kaggle Profile URL</label>
                        <input
                          type="text"
                          value={resumeForm.kaggle || ''}
                          onChange={(e) => setResumeForm({ ...resumeForm, kaggle: e.target.value })}
                          className="bg-zinc-950 border border-zinc-800 rounded-lg text-white p-2.5 focus:border-emerald-500 focus:outline-none text-xs"
                        />
                      </div>
                    </div>

                    {/* Resume File Upload Block */}
                    <div className="border-t border-zinc-800 pt-5 space-y-4">
                      <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wide block border-b border-zinc-800 pb-1">2. Upload Resume Document (PDF / Image)</span>
                      <div className="bg-zinc-950/40 p-5 rounded-lg border border-zinc-800 flex flex-col md:flex-row items-center gap-6">
                        <div className="flex-1 space-y-2">
                          <label className="text-[9px] font-bold text-zinc-500 uppercase block">Select Document</label>
                          <input
                            type="file"
                            accept="application/pdf,image/*"
                            onChange={handleResumeFileUpload}
                            className="bg-zinc-900 border border-zinc-800 rounded text-zinc-400 text-xs p-2 focus:outline-none cursor-pointer w-full"
                          />
                          <p className="text-[10px] text-zinc-500 italic mt-1">Recommended: PDF document format under 4MB.</p>
                        </div>

                        <div className="w-full md:w-64 bg-zinc-900 border border-zinc-800 rounded-lg p-4 flex flex-col justify-center items-center text-center">
                          <span className="text-[9px] font-bold text-zinc-500 uppercase mb-2">Upload Status</span>
                          {resumeFile ? (
                            <div className="space-y-2">
                              <span className="px-2 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded text-[9px] font-bold uppercase tracking-wider block">
                                Custom PDF Loaded
                              </span>
                              <button
                                type="button"
                                onClick={handleClearResumeFile}
                                className="w-full py-1 bg-red-950 hover:bg-red-900 text-red-400 text-[10px] font-bold uppercase tracking-wider rounded border border-red-900/40 transition-colors cursor-pointer"
                              >
                                Remove Custom Resume
                              </button>
                            </div>
                          ) : (
                            <div>
                              <span className="px-2 py-1 bg-zinc-800 text-zinc-500 rounded text-[9px] font-bold uppercase tracking-wider block">
                                Using Dynamic Template
                              </span>
                              <p className="text-[9px] text-zinc-500 mt-2">Currently falls back to dynamic site resume format.</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </form>
                ) : null}
              </div>
            )}
          </main>
        </div>
      </div>
    );
  };

  // Resume Modal Rendering
  const renderResumeModal = () => {
    if (!isResumeOpen) return null;
    return (
      <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-[150] overflow-y-auto flex items-center justify-center p-4 sm:p-6 no-print">
        <div className="bg-white text-zinc-900 w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden relative border border-zinc-200 no-print flex flex-col max-h-[90vh]">
          {/* Header controls bar */}
          <div className="flex justify-between items-center px-6 py-4 bg-zinc-900 text-white border-b border-zinc-800 no-print flex-shrink-0">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-emerald-400" />
              <span className="text-xs font-bold uppercase tracking-wider">Curriculum Vitae / Resume</span>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={resumeFile ? handleDownloadResumeFile : () => window.print()}
                className="flex items-center gap-1.5 px-3.5 py-1.5 bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-black text-xs font-bold uppercase tracking-wider rounded-lg transition-all cursor-pointer"
              >
                <Download size={13} /> {resumeFile ? 'Download Resume' : 'Print / Save PDF'}
              </button>
              <button
                onClick={() => setIsResumeOpen(false)}
                className="p-1.5 hover:bg-zinc-850 rounded-full transition-colors cursor-pointer text-white/80 hover:text-white"
                aria-label="Close resume"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Resume Sheet Content (Printable area) */}
          <div id="resume-print-area" className="p-8 sm:p-12 bg-white text-zinc-900 font-sans overflow-y-auto flex-grow print:max-h-none print:overflow-visible print:p-0">
            {resumeFile ? (
              <div className="w-full h-[70vh] flex flex-col items-center justify-center bg-zinc-50 border border-zinc-200 rounded-xl overflow-hidden relative">
                <object
                  data={resumeFile}
                  type="application/pdf"
                  className="w-full h-full"
                >
                  <iframe
                    src={resumeFile}
                    className="w-full h-full border-none font-medium text-xs text-center p-8 text-zinc-500"
                    title="Resume PDF"
                  />
                </object>
                <button 
                  type="button" 
                  onClick={handleDownloadResumeFile}
                  className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/85 hover:bg-black text-white px-4 py-2 rounded-lg text-xs font-bold shadow-lg flex items-center gap-1.5 transition-all no-print cursor-pointer"
                >
                  <Download size={12} /> Having trouble viewing? Click to download directly
                </button>
              </div>
            ) : (
              <>
                {/* Header section */}
                <div className="border-b-2 border-zinc-900 pb-4 mb-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                  <div>
                    <h1 className="text-3xl font-extrabold uppercase tracking-tight text-zinc-900 leading-none">{resumeData.name}</h1>
                    <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest mt-2">{resumeData.title}</p>
                  </div>
                  <div className="text-left md:text-right text-[11px] text-zinc-600 space-y-1 font-medium">
                    <div>📍 {resumeData.location}</div>
                    <div>✉️ <a href={`mailto:${resumeData.email}`} className="hover:underline text-zinc-900 font-semibold">{resumeData.email}</a></div>
                    <div>📞 {resumeData.phone}</div>
                    <div className="flex gap-2 justify-start md:justify-end mt-1 font-bold text-zinc-900">
                      <a href={resumeData.linkedin} target="_blank" rel="noopener noreferrer" className="hover:underline">LinkedIn</a>
                      <span>•</span>
                      <a href={resumeData.github} target="_blank" rel="noopener noreferrer" className="hover:underline">GitHub</a>
                      {resumeData.kaggle && (
                        <>
                          <span>•</span>
                          <a href={resumeData.kaggle} target="_blank" rel="noopener noreferrer" className="hover:underline">Kaggle</a>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Profile summary */}
                <div className="mb-6">
                  <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-400 border-b border-zinc-200 pb-1 mb-2">Professional Summary</h2>
                  <p className="text-xs text-zinc-700 leading-relaxed font-normal">{resumeData.summary}</p>
                </div>

                {/* Education and Skills Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="md:col-span-2">
                    <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-400 border-b border-zinc-200 pb-1 mb-2">Education</h2>
                    <div className="space-y-3">
                      {resumeData.education.map((edu: any, idx: number) => (
                        <div key={idx} className="text-xs">
                          <div className="flex justify-between font-bold text-zinc-800">
                            <span>{edu.school}</span>
                            <span className="text-zinc-500 font-normal">{edu.period}</span>
                          </div>
                          <p className="text-zinc-600 mt-0.5">{edu.degree}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-400 border-b border-zinc-200 pb-1 mb-2">Skills Inventory</h2>
                    <div className="text-[10px] text-zinc-700 space-y-2">
                      <div>
                        <span className="font-bold text-zinc-800 block">Languages:</span>
                        {resumeData.skills.languages}
                      </div>
                      <div>
                        <span className="font-bold text-zinc-800 block">Frameworks:</span>
                        {resumeData.skills.frameworks}
                      </div>
                      <div>
                        <span className="font-bold text-zinc-800 block">Tools & Cloud:</span>
                        {resumeData.skills.tools}, {resumeData.skills.cloud}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Dynmamic Projects list from dashboard */}
                <div className="mb-6">
                  <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-400 border-b border-zinc-200 pb-1 mb-3">Portfolio Projects</h2>
                  <div className="space-y-4">
                    {projects.map((project: any, idx: number) => (
                      <div key={idx} className="text-xs">
                        <div className="flex justify-between font-bold text-zinc-800">
                          <span>{project.title} — <span className="font-medium text-zinc-500">{project.role}</span></span>
                          <span className="text-zinc-500 font-normal text-[10px]">{project.subtitle}</span>
                        </div>
                        <p className="text-zinc-600 mt-1 italic leading-normal text-[11px]">{project.description}</p>
                        <ul className="list-disc list-inside mt-1.5 space-y-0.5 text-zinc-700 leading-normal pl-2">
                          {project.points.map((pt: string, ptIdx: number) => (
                            <li key={ptIdx} className="text-[11px] font-normal leading-relaxed">{pt}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Certifications list */}
                <div>
                  <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-400 border-b border-zinc-200 pb-1 mb-2">Certifications & Credentials</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {resumeData.certifications.map((cert: any, idx: number) => (
                      <div key={idx} className="text-[10px] text-zinc-700 bg-zinc-50 p-2 rounded border border-zinc-100 print:bg-white print:border-none print:p-0">
                        <div className="font-bold text-zinc-800 flex justify-between">
                          <span>{cert.title}</span>
                          <span className="text-zinc-500 font-normal">{cert.date}</span>
                        </div>
                        <p className="text-[9px] text-zinc-500 mt-0.5">{cert.issuer}</p>
                        <p className="text-[9px] text-zinc-600 mt-0.5 leading-snug">{cert.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Switch views based on path routing
  if (currentPath === '/admin') {
    return renderAdminDashboard();
  }

  // Else render standard landing page
  return (
    <div
      style={{
        backgroundColor: activeProj.bg,
        transition: 'background-color 650ms cubic-bezier(0.4, 0, 0.2, 1)',
        fontFamily: "'Inter', sans-serif",
      }}
      className="relative w-full overflow-hidden"
    >
      <div className="relative w-full h-screen overflow-hidden">
        {/* Grain overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-40"
          style={{
            zIndex: 50,
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='noise'%3E%3CfeFractalNoise type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.08'/%3E%3C/svg%3E")`,
            backgroundSize: '200px 200px',
            backgroundRepeat: 'repeat',
          }}
        />

        {/* Ambient Aura Orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 1 }}>
          <div
            className="absolute rounded-full filter blur-[120px] opacity-[0.65] mix-blend-screen transition-all duration-1000 ease-out"
            style={{
              width: isMobile ? '220px' : '450px',
              height: isMobile ? '220px' : '450px',
              left: '8%',
              top: '12%',
              background: `radial-gradient(circle, ${activeProj.panel} 0%, transparent 70%)`,
              transform: `translate(${bgMousePos.x * 0.4}px, ${bgMousePos.y * 0.4}px)`,
              animation: 'floatOrb1 20s infinite ease-in-out',
            }}
          />
          <div
            className="absolute rounded-full filter blur-[150px] opacity-[0.5] mix-blend-screen transition-all duration-1000 ease-out"
            style={{
              width: isMobile ? '260px' : '550px',
              height: isMobile ? '260px' : '550px',
              right: '12%',
              bottom: '8%',
              background: `radial-gradient(circle, #ffffff 0%, transparent 70%)`,
              transform: `translate(${bgMousePos.x * -0.2}px, ${bgMousePos.y * -0.2}px)`,
              animation: 'floatOrb2 25s infinite ease-in-out',
            }}
          />
        </div>

        {/* Sparkles Particle system */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none select-none" style={{ zIndex: 1 }}>
          {Array.from({ length: isMobile ? 12 : 24 }).map((_, i) => {
            const size = (i % 3) + 3;
            const left = (i * 7) % 100;
            const top = (i * 13) % 100;
            const duration = 6 + (i % 4);
            const delay = -(i * 0.3);
            return (
              <div
                key={i}
                className="absolute rounded-full bg-white"
                style={{
                  width: `${size}px`,
                  height: `${size}px`,
                  left: `${left}%`,
                  top: `${top}%`,
                  opacity: 0.35 + (i % 3) * 0.15,
                  animation: `sparkleFloat ${duration}s infinite linear`,
                  animationDelay: `${delay}s`,
                }}
              />
            );
          })}
        </div>

        {/* Giant ghost text with crossfade and global parallax */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
          style={{
            zIndex: 2,
            transform: `translate(${bgMousePos.x}px, ${bgMousePos.y}px) translateY(-10%)`,
            transition: 'transform 300ms ease-out',
          }}
        >
          {projects.map((project, idx) => (
            <div
              key={idx}
              className="absolute text-center uppercase whitespace-nowrap text-white cursor-pointer pointer-events-auto transition-all duration-300"
              style={{
                fontFamily: "'Anton', sans-serif",
                fontSize: 'clamp(60px, 17vw, 290px)',
                fontWeight: 900,
                opacity: idx === activeIndex ? 1 : 0,
                transition: 'opacity 650ms cubic-bezier(0.4, 0, 0.2, 1), transform 300ms, text-shadow 300ms, color 300ms',
                lineHeight: 1,
                letterSpacing: '0.04em',
              }}
              onClick={() => navigate('next')}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.04)';
                e.currentTarget.style.textShadow = `0 0 30px ${project.panel}`;
                e.currentTarget.style.color = project.panel;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.textShadow = 'none';
                e.currentTarget.style.color = '#fff';
              }}
            >
              {project.ghostText}
            </div>
          ))}
        </div>

        {/* Top-left brand label */}
        <div
          className="absolute top-6 left-4 sm:left-8 flex flex-col cursor-pointer group animate-fade-in"
          style={{ zIndex: 60 }}
        >
          <span
            className="text-sm font-bold uppercase text-white tracking-[0.2em] leading-none transition-all duration-500 ease-out group-hover:tracking-[0.28em] group-hover:text-white/95"
            style={{ transition: 'all 500ms ease-out' }}
          >
            {resumeData.title}
          </span>
          <span className="text-[9px] uppercase text-white/60 tracking-[0.18em] mt-1 font-medium transition-all duration-500 ease-out group-hover:text-white/80">
            {resumeData.name}
          </span>
        </div>

        {/* Floating Mobile Resume Button */}
        <div className="absolute top-6 right-4 md:hidden" style={{ zIndex: 60 }}>
          <button
            onClick={() => setIsResumeOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1 bg-white/10 border border-white/10 rounded-md text-[10px] font-bold text-white uppercase transition-all hover:bg-white/20 cursor-pointer"
          >
            <FileText size={10} className="animate-pulse" /> Resume
          </button>
        </div>

        {/* Top-Right Contact Info bar (Hidden on mobile) */}
        <div
          className="absolute top-6 right-4 sm:right-8 hidden md:flex items-center gap-4 text-[10px] sm:text-[11px] font-semibold text-white/95"
          style={{ zIndex: 60 }}
        >
          <button
            onClick={() => setIsResumeOpen(true)}
            className="flex items-center gap-1.5 opacity-90 hover:opacity-100 hover:text-white transition-all duration-300 hover:scale-105 group bg-transparent border-none text-white font-semibold cursor-pointer"
          >
            <FileText size={11} className="text-white animate-pulse" /> Resume
          </button>
          <span className="opacity-45">|</span>
          <span className="flex items-center gap-1.5 opacity-90 select-none">
            <MapPin size={11} className="text-white" /> {resumeData.location}
          </span>
          <span className="opacity-45">|</span>
          <a
            href={`mailto:${resumeData.email}`}
            className="flex items-center gap-1.5 opacity-90 hover:opacity-100 hover:text-white transition-all duration-300 hover:scale-105 group"
          >
            <Mail size={11} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:rotate-6" /> {resumeData.email}
          </a>
          <span className="opacity-45">|</span>
          <a
            href={resumeData.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 opacity-90 hover:opacity-100 hover:text-white transition-all duration-300 hover:scale-105 group"
          >
            <LinkedinIcon className="w-3 h-3 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:scale-110" /> LinkedIn
          </a>
          <span className="opacity-45">|</span>
          <a
            href={resumeData.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 opacity-90 hover:opacity-100 hover:text-white transition-all duration-300 hover:scale-105 group"
          >
            <GithubIcon className="w-3 h-3 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:rotate-12" /> GitHub
          </a>
          {resumeData.kaggle && (
            <>
              <span className="opacity-45">|</span>
              <a
                href={resumeData.kaggle}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 opacity-90 hover:opacity-100 hover:text-white transition-all duration-300 hover:scale-105 group"
              >
                <KaggleIcon className="w-3 h-3 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:rotate-12" /> Kaggle
              </a>
            </>
          )}
        </div>

        {/* Carousel Mascot figures */}
        <div className="absolute inset-0" style={{ zIndex: 3 }}>
          {projects.map((item, index) => {
            const role = getRole(index);
            const roleStyles = getRoleStyles(role);

            return (
              <div
                key={index}
                style={{
                  position: 'absolute',
                  aspectRatio: '0.6 / 1',
                  transition: 'transform 650ms cubic-bezier(0.4, 0, 0.2, 1), filter 650ms cubic-bezier(0.4, 0, 0.2, 1), opacity 650ms cubic-bezier(0.4, 0, 0.2, 1), left 650ms cubic-bezier(0.4, 0, 0.2, 1), bottom 650ms cubic-bezier(0.4, 0, 0.2, 1), height 650ms cubic-bezier(0.4, 0, 0.2, 1)',
                  willChange: 'transform, filter, opacity',
                  ...roleStyles,
                }}
                className={`select-none ${role === 'center' ? 'cursor-pointer animate-float' : ''}`}
                onClick={role === 'center' ? () => setIsDrawerOpen(true) : undefined}
              >
                <img
                  src={item.src}
                  alt={`Saimani Portfolio Mascot ${index + 1}`}
                  className="w-full h-full object-contain object-bottom select-none pointer-events-none"
                  draggable={false}
                />
              </div>
            );
          })}
        </div>

        {/* Bottom-left details panel */}
        <div
          className="absolute bottom-6 left-4 sm:bottom-20 sm:left-24 flex flex-col items-start"
          style={{ zIndex: 60, maxWidth: '340px' }}
        >
          {/* Active project role tag */}
          <span className="text-[10px] tracking-[0.25em] font-bold text-white/80 uppercase px-2 py-0.5 bg-white/10 rounded-md border border-white/5 mb-3 leading-none">
            {activeProj.role}
          </span>
          <p
            className="font-bold uppercase tracking-wide text-white mb-1 leading-none font-anton flex select-none"
            style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}
          >
            {activeProj.title.split('').map((char: string, charIdx: number) => (
              <span
                key={charIdx}
                className="inline-block transition-transform duration-200 hover:-translate-y-1 hover:scale-110 active:scale-95 cursor-default mr-[0.02em]"
                style={{
                  textShadow: '0 0 0px transparent',
                  transition: 'transform 200ms, text-shadow 200ms, color 200ms'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.textShadow = `0 0 10px ${activeProj.panel}`;
                  e.currentTarget.style.color = activeProj.panel;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.textShadow = '0 0 0px transparent';
                  e.currentTarget.style.color = '#fff';
                }}
              >
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </p>
          <p className="text-[11px] font-bold text-white/70 uppercase tracking-widest mb-3 leading-none transition-colors duration-300 hover:text-white cursor-default">
            {activeProj.subtitle}
          </p>
          
          {/* Tech stack tags */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {activeProj.tech.slice(0, 4).map((t: string) => (
              <span
                key={t}
                className="text-[10px] font-semibold px-2 py-0.5 bg-white/5 border border-white/10 rounded text-white/90 transition-all duration-300 hover:scale-105 hover:bg-white/10 cursor-pointer select-none"
                style={{
                  transition: 'all 300ms ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = activeProj.panel;
                  e.currentTarget.style.boxShadow = `0 0 8px ${activeProj.panel}40`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {t}
              </span>
            ))}
          </div>

          <p
            className="hidden sm:block text-xs sm:text-sm text-white mb-5"
            style={{ opacity: 0.85, lineHeight: 1.6 }}
          >
            {activeProj.description}
          </p>

          <div className="flex gap-3 sm:gap-4">
            <button
              onClick={() => navigate('prev')}
              className="w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center rounded-full border-2 border-white bg-transparent text-white transition-all duration-150 hover:scale-108 hover:bg-white/12 active:scale-95 cursor-pointer"
              style={{
                transition: 'transform 150ms, background-color 150ms',
              }}
              aria-label="Previous Project"
            >
              <ArrowLeft size={26} strokeWidth={2.25} />
            </button>
            <button
              onClick={() => navigate('next')}
              className="w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center rounded-full border-2 border-white bg-transparent text-white transition-all duration-150 hover:scale-108 hover:bg-white/12 active:scale-95 cursor-pointer"
              style={{
                transition: 'transform 150ms, background-color 150ms',
              }}
              aria-label="Next Project"
            >
              <ArrowRight size={26} strokeWidth={2.25} />
            </button>
          </div>
        </div>

        {/* Discover It trigger */}
        <button
          onClick={() => setIsDrawerOpen(true)}
          className="absolute bottom-6 right-4 sm:bottom-20 sm:right-10 flex items-center gap-2 sm:gap-4 text-white uppercase no-underline transition-opacity duration-200 opacity-95 hover:opacity-100 group bg-transparent border-none p-0 cursor-pointer"
          style={{
            zIndex: 60,
            fontFamily: "'Anton', sans-serif",
            fontSize: 'clamp(20px, 4vw, 56px)',
            fontWeight: 400,
            letterSpacing: '-0.02em',
            lineHeight: 1,
          }}
        >
          DISCOVER IT
          <ArrowRight
            className="w-5 h-5 sm:w-8 sm:h-8 transition-transform duration-200 group-hover:translate-x-1"
            strokeWidth={2.25}
          />
        </button>
      </div>

      {/* Slide-out Case Study Details Drawer */}
      {isDrawerOpen && (
        <div
          className="fixed inset-0 bg-black/45 z-[99] transition-opacity duration-300 pointer-events-auto"
          onClick={() => setIsDrawerOpen(false)}
        />
      )}

      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[500px] bg-black/75 backdrop-blur-xl border-l border-white/10 p-6 sm:p-10 text-white flex flex-col justify-between transition-transform duration-500 ease-out`}
        style={{
          zIndex: 100,
          transform: isDrawerOpen ? 'translateX(0)' : 'translateX(100%)',
          boxShadow: '-10px 0 35px rgba(0, 0, 0, 0.4)',
        }}
      >
        <div className="flex flex-col h-full overflow-y-auto pr-2">
          {/* Close button */}
          <div className="flex justify-between items-center mb-6">
            <span className="text-[10px] tracking-[0.2em] font-bold text-white/40 uppercase">
              Project Case Study
            </span>
            <button
              onClick={() => setIsDrawerOpen(false)}
              className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer text-white/80 hover:text-white"
              aria-label="Close details"
            >
              <span className="text-2xl font-light leading-none">&times;</span>
            </button>
          </div>

          {/* Project titles */}
          <div className="mb-6">
            <span className="text-[10px] uppercase px-2.5 py-1 bg-white/10 border border-white/5 rounded text-white/90 font-bold tracking-wider">
              {activeProj.role}
            </span>
            <h2 className="text-4xl sm:text-5xl font-anton uppercase tracking-tight text-white mt-4 mb-1 leading-none">
              {activeProj.title}
            </h2>
            <p className="text-xs font-bold text-white/60 uppercase tracking-widest">
              {activeProj.subtitle}
            </p>
          </div>

          {/* Tech tree tags with interactive cross-linking */}
          <div className="flex flex-wrap gap-1.5 mb-6">
            {activeProj.tech.map((t: string) => {
              const isMatch = selectedTech === t;
              const otherProjects = projects.filter((p, idx) => idx !== activeIndex && p.tech.includes(t));
              
              return (
                <div key={t} className="relative group" style={{ zIndex: 120 }}>
                  <button
                    onClick={() => setSelectedTech(selectedTech === t ? null : t)}
                    className={`text-[10px] font-semibold px-2.5 py-0.5 rounded transition-all duration-200 cursor-pointer ${
                      isMatch
                        ? 'bg-white text-black font-bold scale-105 shadow-md'
                        : 'bg-white/5 border border-white/10 text-white/90 hover:bg-white/10'
                    }`}
                  >
                    {t}
                  </button>
                  {otherProjects.length > 0 && (
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1.5 w-40 p-1.5 bg-black/95 border border-white/15 rounded text-[9px] text-white/70 text-center leading-normal opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50">
                      Also used in: <span className="font-bold text-white">{otherProjects.map(p => p.title).join(', ')}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Drawer tab switcher */}
          <div className="flex border-b border-white/10 mb-6">
            <button
              onClick={() => setActiveDrawerTab('case_study')}
              className={`flex-1 pb-2 text-xs font-bold uppercase tracking-wider border-b-2 text-center transition-all ${
                activeDrawerTab === 'case_study'
                  ? 'border-white text-white'
                  : 'border-transparent text-white/40 hover:text-white/70'
              }`}
            >
              Case Study
            </button>
            <button
              onClick={() => setActiveDrawerTab('demo')}
              className={`flex-1 pb-2 text-xs font-bold uppercase tracking-wider border-b-2 text-center transition-all ${
                activeDrawerTab === 'demo'
                  ? 'border-white text-white'
                  : 'border-transparent text-white/40 hover:text-white/70'
              }`}
            >
              Interactive Demo
            </button>
          </div>

          {activeDrawerTab === 'case_study' ? (
            <>
              {/* Scope achievements */}
              <div className="space-y-4 mb-8">
                <h3 className="text-xs font-bold uppercase tracking-wider text-white/35">
                  Key Contributions & Scope
                </h3>
                {activeProj.points.map((point: string, i: number) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-white mt-2 flex-shrink-0" />
                    <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-medium">
                      {point}
                    </p>
                  </div>
                ))}
              </div>

              {/* AWS / Certification display (linked dynamically if title contains cloud or AWS) */}
              {(activeProj.title.toLowerCase().includes('aws') || activeProj.title.toLowerCase().includes('cloud')) && (
                <div className="border-t border-white/10 pt-6 mb-8">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-white/35 mb-4 flex items-center gap-1.5">
                    <Award size={13} /> Certifications (Click to Flip)
                  </h3>
                  <div className="grid grid-cols-1 gap-3">
                    {resumeData.certifications.map((cert: any, idx: number) => {
                      const isFlipped = !!flippedCerts[idx];
                      return (
                        <div
                          key={idx}
                          onClick={() => setFlippedCerts(prev => ({ ...prev, [idx]: !prev[idx] }))}
                          className="w-full h-16 cursor-pointer perspective-1000 select-none"
                        >
                          <div className={`relative w-full h-full duration-500 preserve-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
                            {/* Front */}
                            <div className="absolute inset-0 bg-white/5 border border-white/10 hover:border-white/20 rounded-lg px-4 flex items-center gap-3 backface-hidden">
                              <span className="text-xl">🏆</span>
                              <div className="flex-1 min-w-0">
                                <div className="font-bold text-xs text-white truncate">{cert.title}</div>
                                <div className="text-[10px] text-white/50">{cert.issuer}</div>
                              </div>
                              <span className="text-[9px] text-white/40 font-mono">FLIP</span>
                            </div>
                            {/* Back */}
                            <div className="absolute inset-0 bg-indigo-650/40 border border-indigo-500/40 rounded-lg px-4 py-2 flex flex-col justify-center rotate-y-180 backface-hidden">
                              <div className="font-bold text-[9px] text-white/95 leading-snug">
                                Issued: {cert.date} • {cert.issuer}
                              </div>
                              <p className="text-[9px] text-white/80 leading-normal font-medium mt-0.5">
                                {cert.desc}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="mb-8">
              {renderInteractiveDemo()}
            </div>
          )}
        </div>

        {/* Drawer footer details */}
        <div className="border-t border-white/10 pt-5 mt-auto bg-black/0 flex-shrink-0">
          <h3 className="text-[10px] font-bold uppercase tracking-wider text-white/35 mb-3">
            Contact & Profiles
          </h3>
          <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-xs text-white/85">
            <div>
              <p className="text-[9px] text-white/40 uppercase font-bold tracking-wider">Email</p>
              <a href={`mailto:${resumeData.email}`} className="hover:underline font-semibold block truncate">
                {resumeData.email}
              </a>
            </div>
            <div>
              <p className="text-[9px] text-white/40 uppercase font-bold tracking-wider">Phone</p>
              <a href={`tel:${resumeData.phone}`} className="hover:underline font-semibold block truncate">
                {resumeData.phone}
              </a>
            </div>
            <div>
              <p className="text-[9px] text-white/40 uppercase font-bold tracking-wider">Location</p>
              <p className="font-semibold truncate">{resumeData.location}</p>
            </div>
            <div>
              <p className="text-[9px] text-white/40 uppercase font-bold tracking-wider">Web Links</p>
              <div className="flex flex-wrap gap-x-2 gap-y-1 font-semibold">
                <a href={resumeData.linkedin} target="_blank" rel="noopener noreferrer" className="hover:underline">
                  LinkedIn
                </a>
                <span>•</span>
                <a href={resumeData.github} target="_blank" rel="noopener noreferrer" className="hover:underline">
                  GitHub
                </a>
                {resumeData.kaggle && (
                  <>
                    <span>•</span>
                    <a href={resumeData.kaggle} target="_blank" rel="noopener noreferrer" className="hover:underline">
                      Kaggle
                    </a>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Resume modal rendering */}
      {renderResumeModal()}
    </div>
  );
}
