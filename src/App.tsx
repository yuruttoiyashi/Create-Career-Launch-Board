import { useMemo, useState } from "react";
import { Dashboard } from "./components/Dashboard";
import { Header } from "./components/Header";
import { InterviewPanel } from "./components/InterviewPanel";
import { JobDetail } from "./components/JobDetail";
import { JobForm } from "./components/JobForm";
import { JobList } from "./components/JobList";
import { PortfolioPanel } from "./components/PortfolioPanel";
import { PrintSheet } from "./components/PrintSheet";
import { TaskPanel } from "./components/TaskPanel";
import { defaultPortfolios } from "./data/defaultPortfolios";
import { useLocalStorage } from "./hooks/useLocalStorage";
import type { JobApplication, JobStatus } from "./types/career";
import { createId } from "./utils/careerUtils";

const STORAGE_KEY = "career-launch-board-jobs";

function createNewJob(): JobApplication {
  const now = new Date().toISOString();

  return {
    id: createId(),
    companyName: "",
    jobTitle: "",
    employmentType: "",
    location: "",
    salary: "",
    jobUrl: "",
    isDisabilityHiring: false,
    remoteType: "",
    status: "draft",
    priority: "middle",
    requiredSkills: "",
    welcomeSkills: "",
    motivation: "",
    selfPr: "",
    accommodation: "",
    memo: "",
    interviewDate: "",
    interviewNotes: "",
    reverseQuestions: "",
    portfolios: defaultPortfolios,
    tasks: [
      {
        id: createId(),
        title: "求人内容を確認する",
        status: "todo",
        dueDate: "",
      },
      {
        id: createId(),
        title: "提出するポートフォリオを選ぶ",
        status: "todo",
        dueDate: "",
      },
      {
        id: createId(),
        title: "志望動機を作成する",
        status: "todo",
        dueDate: "",
      },
    ],
    createdAt: now,
    updatedAt: now,
  };
}

export default function App() {
  const [jobs, setJobs] = useLocalStorage<JobApplication[]>(STORAGE_KEY, [createNewJob()]);
  const [selectedJobId, setSelectedJobId] = useState<string | null>(jobs[0]?.id ?? null);
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState<JobStatus | "all">("all");

  const selectedJob = useMemo(() => {
    return jobs.find((job) => job.id === selectedJobId) ?? jobs[0] ?? null;
  }, [jobs, selectedJobId]);

  const handleCreateNew = () => {
    const newJob = createNewJob();
    setJobs([newJob, ...jobs]);
    setSelectedJobId(newJob.id);
  };

  const handleUpdateJob = (updatedJob: JobApplication) => {
    setJobs(jobs.map((job) => (job.id === updatedJob.id ? updatedJob : job)));
  };

  const handleDeleteJob = (id: string) => {
    const ok = confirm("この求人を削除しますか？");
    if (!ok) return;

    const nextJobs = jobs.filter((job) => job.id !== id);
    setJobs(nextJobs);

    if (selectedJobId === id) {
      setSelectedJobId(nextJobs[0]?.id ?? null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-6 text-slate-900 md:px-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <Header onCreateNew={handleCreateNew} />

        <Dashboard jobs={jobs} />

        <main className="grid gap-6 xl:grid-cols-[360px_1fr]">
          <JobList
            jobs={jobs}
            selectedJobId={selectedJob?.id ?? null}
            searchText={searchText}
            statusFilter={statusFilter}
            onSearchTextChange={setSearchText}
            onStatusFilterChange={setStatusFilter}
            onSelectJob={setSelectedJobId}
            onDeleteJob={handleDeleteJob}
          />

          {selectedJob ? (
            <div className="space-y-6">
              <JobForm job={selectedJob} onUpdate={handleUpdateJob} />
              <JobDetail job={selectedJob} onUpdate={handleUpdateJob} />
              <PortfolioPanel job={selectedJob} onUpdate={handleUpdateJob} />
              <TaskPanel job={selectedJob} onUpdate={handleUpdateJob} />
              <InterviewPanel job={selectedJob} onUpdate={handleUpdateJob} />
              <PrintSheet job={selectedJob} />
            </div>
          ) : (
            <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">
              <p className="text-slate-500">求人を追加してください。</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}