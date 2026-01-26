
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
      githubUrl: 'https://github.com/shivamsingh-007',
      imageUrl: 'https://images.unsplash.com/photo-1551710029-607e06bd45ff?q=80&w=2069&auto=format&fit=crop',
      techStack: ['TensorFlow', 'Python', 'Librosa', 'Flask', 'CNN']
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
