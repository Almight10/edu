import { PlaceHolderImages } from './placeholder-images';

const userAvatar = PlaceHolderImages.find(img => img.id === 'user-avatar-1');

export const user = {
  name: 'Alex Doe',
  email: 'alex.doe@example.com',
  avatarUrl: userAvatar?.imageUrl || 'https://picsum.photos/seed/user1/100/100',
};

export const courses = [
  {
    id: 1,
    title: 'Introduction to Computer Science',
    code: 'CS101',
    instructor: 'Dr. Alan Turing',
    description: 'A foundational course on the principles of computing, algorithms, and data structures.',
    credits: 3,
    progress: 75,
    imageUrl: PlaceHolderImages.find(img => img.id === 'course-hero-1')?.imageUrl,
    imageHint: 'abstract pattern',
  },
  {
    id: 2,
    title: 'Web Development Fundamentals',
    code: 'WD202',
    instructor: 'Dr. Ada Lovelace',
    description: 'Learn the core technologies of the web: HTML, CSS, and JavaScript.',
    credits: 3,
    progress: 50,
    imageUrl: PlaceHolderImages.find(img => img.id === 'course-hero-2')?.imageUrl,
    imageHint: 'technology',
  },
  {
    id: 3,
    title: 'Database Design and Management',
    code: 'DB301',
    instructor: 'Dr. Edgar Codd',
    description: 'An in-depth look at relational database theory, SQL, and system design.',
    credits: 4,
    progress: 90,
    imageUrl: PlaceHolderImages.find(img => img.id === 'course-hero-3')?.imageUrl,
    imageHint: 'nature landscape',
  },
  {
    id: 4,
    title: 'Algorithms and Complexity',
    code: 'CS450',
    instructor: 'Dr. Grace Hopper',
    description: 'Advanced topics in algorithm design, analysis, and computational complexity.',
    credits: 3,
    progress: 25,
    imageUrl: PlaceHolderImages.find(img => img.id === 'course-hero-4')?.imageUrl,
    imageHint: 'architecture',
  },
];

export const grades = [
  { courseCode: 'CS101', courseTitle: 'Intro to CS', term: 'Fall 2023', grade: 'A', score: 95 },
  { courseCode: 'MA210', courseTitle: 'Calculus II', term: 'Fall 2023', grade: 'B+', score: 88 },
  { courseCode: 'PH201', courseTitle: 'Physics I', term: 'Fall 2023', grade: 'A-', score: 91 },
  { courseCode: 'ENG101', courseTitle: 'English Composition', term: 'Fall 2023', grade: 'B', score: 85 },
  { courseCode: 'WD202', courseTitle: 'Web Dev', term: 'Spring 2024', grade: 'A', score: 96 },
  { courseCode: 'MA250', courseTitle: 'Linear Algebra', term: 'Spring 2024', grade: 'C+', score: 78 },
  { courseCode: 'CS301', courseTitle: 'Data Structures', term: 'Spring 2024', grade: 'B-', score: 82 },
];

export const announcements = [
  {
    id: 1,
    title: 'Campus Reopens for Fall Semester',
    content: 'Welcome back, students! The campus is officially open for the Fall 2024 semester. Please check your email for important orientation information and health guidelines.',
    author: 'University Administration',
    date: '2024-08-15T10:00:00Z',
  },
  {
    id: 2,
    title: 'Midterm Exam Schedule Released',
    content: 'The midterm examination schedule for all courses has been finalized and is now available on the portal. Please review your schedules and report any conflicts to the registrar\'s office by Friday.',
    author: 'Registrar\'s Office',
    date: '2024-10-01T14:30:00Z',
  },
  {
    id: 3,
    title: 'CS101 Project Deadline Extended',
    content: 'The deadline for the final project in CS101 has been extended to December 10th, 11:59 PM. Please use this extra time to refine your submissions.',
    author: 'Dr. Alan Turing',
    date: '2024-11-28T09:00:00Z',
  },
];

export const assignments = [
    { id: 1, courseCode: 'CS101', title: 'Algorithm Analysis Paper', dueDate: '3 days', submitted: true },
    { id: 2, courseCode: 'WD202', title: 'Portfolio Website', dueDate: '1 week', submitted: false },
    { id: 3, courseCode: 'DB301', title: 'Normalization Exercise', dueDate: '2 weeks', submitted: false },
];
