import type { JobApplication, JobStatus } from "../types/career";
import {
  priorityClassMap,
  priorityLabelMap,
  statusClassMap,
  statusLabelMap,
} from "../utils/careerUtils";

type JobListProps = {
  jobs: JobApplication[];
  selectedJobId: string | null;
  searchText: string;
  statusFilter: JobStatus | "all";
  onSearchTextChange: (value: string) => void;
  onStatusFilterChange: (value: JobStatus | "all") => void;
  onSelectJob: (id: string) => void;
  onDeleteJob: (id: string) => void;
};

export function JobList({
  jobs,
  selectedJobId,
  searchText,
  statusFilter,
  onSearchTextChange,
  onStatusFilterChange,
  onSelectJob,
  onDeleteJob,
}: JobListProps) {
  const filteredJobs = jobs.filter((job) => {
    const matchesStatus = statusFilter === "all" || job.status === statusFilter;
    const targetText = `${job.companyName} ${job.jobTitle} ${job.memo} ${job.requiredSkills}`.toLowerCase();
    const matchesSearch = targetText.includes(searchText.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <aside className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-black text-slate-900">応募先一覧</h2>
          <p className="text-xs text-slate-500">求人ごとの進捗を管理</p>
        </div>
      </div>

      <div className="mt-5 space-y-3">
        <input
          value={searchText}
          onChange={(e) => onSearchTextChange(e.target.value)}
          placeholder="企業名・職種で検索"
          className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-400"
        />

        <select
          value={statusFilter}
          onChange={(e) => onStatusFilterChange(e.target.value as JobStatus | "all")}
          className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-400"
        >
          <option value="all">すべてのステータス</option>
          <option value="draft">準備中</option>
          <option value="applied">応募済み</option>
          <option value="screening">書類選考中</option>
          <option value="interview">面接予定</option>
          <option value="offer">内定候補</option>
          <option value="rejected">不採用</option>
          <option value="hold">保留</option>
        </select>
      </div>

      <div className="mt-5 space-y-3">
        {filteredJobs.length === 0 ? (
          <div className="rounded-2xl bg-slate-50 p-5 text-sm text-slate-500">
            条件に合う求人がありません。
          </div>
        ) : (
          filteredJobs.map((job) => (
            <div
              key={job.id}
              className={`cursor-pointer rounded-2xl border p-4 transition hover:border-blue-300 ${
                selectedJobId === job.id
                  ? "border-blue-400 bg-blue-50"
                  : "border-slate-200 bg-white"
              }`}
              onClick={() => onSelectJob(job.id)}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-bold text-slate-900">{job.companyName || "企業名未入力"}</h3>
                  <p className="mt-1 text-sm text-slate-600">{job.jobTitle || "職種未入力"}</p>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteJob(job.id);
                  }}
                  className="rounded-xl px-2 py-1 text-xs font-bold text-rose-600 hover:bg-rose-50"
                >
                  削除
                </button>
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                <span className={`rounded-full px-3 py-1 text-xs font-bold ${statusClassMap[job.status]}`}>
                  {statusLabelMap[job.status]}
                </span>
                <span className={`rounded-full px-3 py-1 text-xs font-bold ${priorityClassMap[job.priority]}`}>
                  優先度 {priorityLabelMap[job.priority]}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </aside>
  );
}