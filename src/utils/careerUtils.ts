import type { JobApplication, JobStatus, Priority, TaskStatus } from "../types/career";

export const statusLabelMap: Record<JobStatus, string> = {
  draft: "準備中",
  applied: "応募済み",
  screening: "書類選考中",
  interview: "面接予定",
  offer: "内定候補",
  rejected: "不採用",
  hold: "保留",
};

export const statusClassMap: Record<JobStatus, string> = {
  draft: "bg-slate-100 text-slate-700",
  applied: "bg-blue-100 text-blue-700",
  screening: "bg-amber-100 text-amber-700",
  interview: "bg-purple-100 text-purple-700",
  offer: "bg-emerald-100 text-emerald-700",
  rejected: "bg-rose-100 text-rose-700",
  hold: "bg-zinc-100 text-zinc-700",
};

export const priorityLabelMap: Record<Priority, string> = {
  high: "高",
  middle: "中",
  low: "低",
};

export const priorityClassMap: Record<Priority, string> = {
  high: "bg-rose-100 text-rose-700",
  middle: "bg-amber-100 text-amber-700",
  low: "bg-slate-100 text-slate-700",
};

export const taskStatusLabelMap: Record<TaskStatus, string> = {
  todo: "未着手",
  doing: "作業中",
  done: "完了",
};

export function createId() {
  return crypto.randomUUID();
}

export function getDashboardStats(jobs: JobApplication[]) {
  return {
    total: jobs.length,
    draft: jobs.filter((job) => job.status === "draft").length,
    applied: jobs.filter((job) => job.status === "applied").length,
    screening: jobs.filter((job) => job.status === "screening").length,
    interview: jobs.filter((job) => job.status === "interview").length,
    offer: jobs.filter((job) => job.status === "offer").length,
    highPriority: jobs.filter((job) => job.priority === "high").length,
    unfinishedTasks: jobs.reduce(
      (sum, job) => sum + job.tasks.filter((task) => task.status !== "done").length,
      0
    ),
  };
}

export function buildAiComment(job: JobApplication) {
  const selectedPortfolioCount = job.portfolios.filter((item) => item.selected).length;
  const unfinishedTaskCount = job.tasks.filter((task) => task.status !== "done").length;

  if (!job.companyName) {
    return "求人情報を登録すると、提出戦略のコメントが表示されます。";
  }

  if (job.status === "draft") {
    return `${job.companyName}は応募準備中です。職務経歴書・提出ポートフォリオ・志望動機を整えると、応募前の完成度が上がります。`;
  }

  if (selectedPortfolioCount === 0) {
    return `${job.companyName}向けに提出するポートフォリオが未選択です。求人内容に合わせて2〜3件選ぶと説得力が出ます。`;
  }

  if (unfinishedTaskCount >= 3) {
    return `${job.companyName}は未完了タスクが多めです。応募期限や面接日に近いものから優先して整理しましょう。`;
  }

  if (job.status === "interview") {
    return `${job.companyName}は面接準備フェーズです。自己PR・配慮事項・逆質問をセットで整理すると安心です。`;
  }

  return `${job.companyName}向けの準備は進んでいます。提出するアプリの選定理由を具体化すると、実務力がより伝わりやすくなります。`;
}