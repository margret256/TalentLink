import {
  Code2,
  Smartphone,
  Palette,
  PenTool,
  Megaphone,
  FileText,
} from 'lucide-react'

export const categories = [
  { id: 1, title: 'Web Development', jobs: '12.5K+', icon: 'Code2' },
  { id: 2, title: 'Mobile Development', jobs: '8.4K+', icon: 'Smartphone' },
  { id: 3, title: 'UI/UX Design', jobs: '6.9K+', icon: 'Palette' },
  { id: 4, title: 'Graphic Design', jobs: '4.3K+', icon: 'PenTool' },
  { id: 5, title: 'Digital Marketing', jobs: '7.2K+', icon: 'Megaphone' },
  { id: 6, title: 'Writing', jobs: '3.2K+', icon: 'FileText' },
]

export const companies = ['Microsoft', 'Google', 'airbnb', 'Spotify', 'amazon']

export const jobs = [
  {
    id: 1,
    title: 'React Developer',
    company: 'TechNova Inc.',
    location: 'Remote',
    type: 'Full Time',
    experience: 'Mid Level',
    salary: '$600 - $1000/month',
    salaryShort: '$600 - $1000',
    posted: '2 hours ago',
    skills: ['React', 'JavaScript', 'Tailwind CSS'],
    color: 'bg-lightpurple text-primary',
    deadline: '20 June, 2024',
    description:
      'We are looking for a skilled React Developer to build modern and responsive web applications. You will work with a talented team to deliver high-quality products.',
    requirements: [
      'Strong experience with React.js',
      'JavaScript ES6+',
      'HTML, CSS and Tailwind CSS',
      'REST API integration',
      'Git & GitHub',
      'Good problem-solving skills',
    ],
  },
  {
    id: 2,
    title: 'UI/UX Designer',
    company: 'Pixel Perfect',
    location: 'Lahore, Pakistan',
    type: 'Part Time',
    experience: 'Senior Level',
    salary: '$400 - $700/month',
    salaryShort: '$400 - $700',
    posted: '5 hours ago',
    skills: ['Figma', 'UI/UX', 'Design Systems'],
    color: 'bg-blue-50 text-blue-600',
    deadline: '25 June, 2024',
    description:
      'Join our design team to craft intuitive and delightful user experiences across web and mobile products, from wireframes to polished prototypes.',
    requirements: [
      'Proficiency in Figma',
      'Strong portfolio of UI/UX work',
      'Understanding of design systems',
      'Experience with user research',
      'Attention to visual detail',
      'Great communication skills',
    ],
  },
  {
    id: 3,
    title: 'Full Stack Developer',
    company: 'DevLabs',
    location: 'Remote',
    type: 'Full Time',
    experience: 'Mid Level',
    salary: '$800 - $1200/month',
    salaryShort: '$800 - $1200',
    posted: '1 day ago',
    skills: ['React', 'Node.JS', 'MongoDB'],
    color: 'bg-green-50 text-green-600',
    deadline: '30 June, 2024',
    description:
      'DevLabs is hiring a Full Stack Developer to build and maintain scalable web applications using modern JavaScript technologies across the stack.',
    requirements: [
      'Experience with React and Node.js',
      'Database design with MongoDB',
      'RESTful API development',
      'Cloud deployment experience',
      'Version control with Git',
      'Team collaboration skills',
    ],
  },
  {
    id: 4,
    title: 'Frontend Developer',
    company: 'CodeWave',
    location: 'Islamabad, Pakistan',
    type: 'Full Time',
    experience: 'Junior Level',
    salary: '$500 - $900/month',
    salaryShort: '$500 - $900',
    posted: '2 days ago',
    skills: ['JavaScript', 'React', 'CSS'],
    color: 'bg-orange-50 text-orange-600',
    deadline: '15 July, 2024',
    description:
      'CodeWave is looking for a motivated Frontend Developer to help build clean, accessible, and performant interfaces for our client projects.',
    requirements: [
      'Solid HTML, CSS & JavaScript fundamentals',
      'Familiarity with React basics',
      'Eye for clean UI implementation',
      'Willingness to learn quickly',
      'Basic Git knowledge',
      'Good communication skills',
    ],
  },
]

export const applications = [
  {
    id: 1,
    title: 'UI/UX Designer',
    company: 'Pixel Perfect',
    appliedDate: '20 May, 2024',
    status: 'Accepted',
    color: 'bg-green-50 text-green-600',
  },
  {
    id: 2,
    title: 'Frontend Developer',
    company: 'CodeWave',
    appliedDate: '18 May, 2024',
    status: 'Pending',
    color: 'bg-amber-50 text-amber-600',
  },
  {
    id: 3,
    title: 'React Developer',
    company: 'TechNova Inc.',
    appliedDate: '15 May, 2024',
    status: 'Pending',
    color: 'bg-amber-50 text-amber-600',
  },
  {
    id: 4,
    title: 'Full Stack Developer',
    company: 'DevLabs',
    appliedDate: '10 May, 2024',
    status: 'Rejected',
    color: 'bg-red-50 text-red-600',
  },
]

export const recentApplications = [
  { id: 1, title: 'Frontend Developer', company: 'TechNova Inc.', status: 'Pending' },
  { id: 2, title: 'UI/UX Designer', company: 'Pixel Perfect', status: 'Accepted' },
  { id: 3, title: 'Full Stack Developer', company: 'DevLabs', status: 'Pending' },
  { id: 4, title: 'React Developer', company: 'CodeWave', status: 'Rejected' },
]

export const opportunitiesForYou = [
  { id: 1, title: 'React Developer', company: 'TechNova Inc.', salary: '$600 - $800' },
  { id: 2, title: 'Node.js Developer', company: 'DevLabs', salary: '$600 - $1700' },
  { id: 3, title: 'UI/UX Designer', company: 'Pixel Perfect', salary: '$300 - $800' },
  { id: 4, title: 'Frontend Developer', company: 'CodeWave', salary: '$450 - $750' },
]

export const skills = ['React', 'JavaScript', 'HTML', 'CSS', 'Tailwind CSS', 'Node.js']

export const profileSkills = [
  'HTML',
  'CSS',
  'JavaScript',
  'React',
  'Tailwind CSS',
  'Git & GitHub',
  'Vercel',
  'Node.js',
]

export const activityFeed = [
  { id: 1, text: 'Your application for UI/UX Designer was accepted.', time: '2h ago' },
  { id: 2, text: 'New job posted: React Developer by TechNovo Inc.', time: '5h ago' },
]

export const recentUsers = [
  { id: 1, name: 'Ali Raza', email: 'ali@example.com' },
  { id: 2, name: 'Sara Khan', email: 'sara@example.com' },
  { id: 3, name: 'Hamza Ali', email: 'hamza@example.com' },
  { id: 4, name: 'Fatima Noor', email: 'fatima@example.com' },
]

export const usersGrowth = [
  { name: 'Mon', users: 900 },
  { name: 'Tue', users: 1100 },
  { name: 'Wed', users: 1000 },
  { name: 'Thu', users: 1300 },
  { name: 'Fri', users: 1200 },
  { name: 'Sat', users: 1450 },
  { name: 'Sun', users: 1500 },
]

export const applicationsByStatus = [
  { name: 'Pending', value: 45, color: '#5B3FD4' },
  { name: 'Accepted', value: 35, color: '#101B35' },
  { name: 'Rejected', value: 20, color: '#A78BFA' },
]
