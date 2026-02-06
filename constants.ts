
import { PortfolioData } from './types';

export const INITIAL_DATA: PortfolioData = {
  name: 'Shivam Singh',
  title: 'Systems Architect | Secure Intelligence & Distributed Ledgers',
  bio: 'Strategic Software Engineer specialized in the convergence of Neural Architectures, Offensive Security, and Distributed Ledger Technology. Committed to engineering resilient infrastructure that prioritizes technical rigor and operational integrity.',
  profilePic: 'https://images.unsplash.com/photo-1540733063589-31721b6a073e?q=80&w=2000&auto=format&fit=crop', 
  githubUsername: 'shivamsingh-007',
  leetcodeUsername: 'shivamsingh-007',
  ambitions: 'To spearhead high-impact engineering initiatives that redefine digital security and autonomous systems. I hold a firm conviction in systematic discipline over transient motivation and emphasize measurable execution over speculative discourse.',
  email: 'shivam.singh.koyad007@gmail.com',
  linkedin: 'https://www.linkedin.com/in/shivam-singh-a58364384',
  projects: [
    {
      id: 'cs-01',
      title: 'CyberSentryAI Suite',
      description: 'An enterprise-grade multi-vector detection framework. Engineered a triple-backend Flask architecture for synchronized analysis of textual data (NLP), uniform resource locators (Heuristics), and visual assets (Computer Vision).',
      githubUrl: 'https://github.com/shivamsingh-007',
      imageUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=2070&auto=format&fit=crop',
      techStack: ['Python', 'Flask', 'Scikit-Learn', 'OpenCV', 'React']
    },
    {
      id: '0',
      title: 'Zombie Network Integrity',
      description: 'Automated heuristic network analysis system part of the CyberSentry AI initiative. Implemented machine learning models to identify and mitigate malicious network entities with a 94.2% confidence interval.',
      githubUrl: 'https://github.com/shivamsingh-007',
      imageUrl: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=2070&auto=format&fit=crop',
      techStack: ['Python', 'FastAPI', 'ML', 'Cybersecurity']
    },
    {
      id: 'diff-01',
      title: 'Neural Generative Engine',
      description: 'Deployment of a production-ready latent diffusion model. Optimized for high-throughput inference on CUDA-enabled environments, featuring sophisticated prompt parsing and content filtering layers.',
      githubUrl: 'https://github.com/shivamsingh-007',
      imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2070&auto=format&fit=crop',
      techStack: ['Stable Diffusion', 'FastAPI', 'Docker', 'ML', 'PyTorch']
    },
    {
      id: 'vdf-01',
      title: 'Synthetic Audio Analysis',
      description: 'Deep Learning architecture designed for the verification of acoustic authenticity. Utilizes MFCC feature extraction and CNN-based classification to detect sophisticated voice cloning attempts.',
      githubUrl: 'https://github.com/shivamsingh-007/projects',
      imageUrl: 'https://images.unsplash.com/photo-1551710029-607e06bd45ff?q=80&w=2069&auto=format&fit=crop',
      techStack: ['TensorFlow', 'Python', 'Librosa', 'Flask', 'CNN']
    },
    {
      id: 'eternal-01',
      title: 'Eternal Self Alchemist',
      description: 'Privacy-first AI digital legacy builder with encrypted knowledge vault, digital twin AI, portfolio generation, and alchemical backup system. Features 37 advanced capabilities including graph reasoning, trend intelligence, and multi-vault architecture.',
      githubUrl: 'https://github.com/shivamsingh-007/Eternal-Self',
      imageUrl: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2070&auto=format&fit=crop',
      techStack: ['Python', 'PyTorch', 'NetworkX', 'Sentence-Transformers', 'FAISS', 'Flask']
    },
    {
      id: 'img-gen-01',
      title: 'AI Image Generator',
      description: 'Production-ready web application using Stable Diffusion 2.1 for high-quality text-to-image generation. Features dark/light themes, real-time progress tracking, NSFW filtering, and optimized GPU/CPU performance.',
      githubUrl: 'https://github.com/shivamsingh-007/projects',
      imageUrl: 'https://images.unsplash.com/photo-1547891654-e66ed7ebb968?q=80&w=2070&auto=format&fit=crop',
      techStack: ['Stable Diffusion', 'FastAPI', 'React', 'Docker', 'PyTorch']
    },
    {
      id: 'otp-auth-01',
      title: 'OTP Authenticator System',
      description: 'Complete multi-channel OTP verification system with email and SMS delivery. Features JWT authentication, rate limiting, bcrypt password hashing, and real-time verification status with responsive UI.',
      githubUrl: 'https://github.com/shivamsingh-007/projects',
      imageUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=2070&auto=format&fit=crop',
      techStack: ['Node.js', 'Express', 'MongoDB', 'React', 'Twilio', 'Nodemailer']
    },
    {
      id: 'awsg-01',
      title: 'AWSG Security Gateway',
      description: 'Autonomous Web Security Gateway providing real-time protection against XSS, SQL injection, SSRF, and command injection. Zero dependencies, works completely offline with native browser APIs.',
      githubUrl: 'https://github.com/shivamsingh-007/projects',
      imageUrl: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=2070&auto=format&fit=crop',
      techStack: ['JavaScript', 'Web Crypto API', 'DOM Security', 'Zero Dependencies']
    }
  ],
  certificates: [
    {
      id: '1',
      title: 'Certified Ethical Hacker (CEH)',
      issuer: 'EC-Council',
      date: 'Jan 2024',
      imageUrl: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?q=80&w=2073&auto=format&fit=crop',
      link: '#'
    },
    {
      id: '2',
      title: 'Blockchain Specialization',
      issuer: 'Coursera / Buffalo University',
      date: 'Nov 2023',
      imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop',
      link: '#'
    }
  ],
  skills: [
    'Python', 'C++', 'Rust', 'JavaScript', 'TensorFlow', 'PyTorch', 'Solidity', 'React', 'Docker', 'Kubernetes'
  ]
};
