export type JobStatus =
  | "draft"
  | "applied"
  | "screening"
  | "interview"
  | "offer"
  | "rejected"
  | "hold";

export type Priority = "high" | "middle" | "low";

export type TaskStatus = "todo" | "doing" | "done";

export type PortfolioItem = {
  id: string;
  name: string;
  category: string;
  appUrl: string;
  githubUrl: string;
  description: string;
  selected: boolean;
  reason: string;
};

export type CareerTask = {
  id: string;
  title: string;
  status: TaskStatus;
  dueDate: string;
};

export type JobApplication = {
  id: string;
  companyName: string;
  jobTitle: string;
  employmentType: string;
  location: string;
  salary: string;
  jobUrl: string;
  isDisabilityHiring: boolean;
  remoteType: string;
  status: JobStatus;
  priority: Priority;
  requiredSkills: string;
  welcomeSkills: string;
  motivation: string;
  selfPr: string;
  accommodation: string;
  memo: string;
  interviewDate: string;
  interviewNotes: string;
  reverseQuestions: string;
  portfolios: PortfolioItem[];
  tasks: CareerTask[];
  createdAt: string;
  updatedAt: string;
};