import type { JobApplication } from "../types/career";
import { getDashboardStats } from "../utils/careerUtils";

type DashboardProps = {
  jobs: JobApplication[];
};

export function Dashboard({ jobs }: DashboardProps) {
  const stats = getDashboardStats(jobs);

  const cards = [
    { label: "登録求人", value: stats.total, note: "管理中の応募先" },
    { label: "応募済み", value: stats.applied, note: "送信済みの求人" },
    { label: "書類選考中", value: stats.screening, note: "結果待ち" },
    { label: "面接予定", value: stats.interview, note: "準備が必要" },
    { label: "内定候補", value: stats.offer, note: "前向きな進捗" },
    { label: "未完了タスク", value: stats.unfinishedTasks, note: "次にやること" },
  ];

  return (
    <section className="grid gap-4 md:grid-cols-3 xl:grid-cols-6">
      {cards.map((card) => (
        <div key={card.label} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-bold text-slate-500">{card.label}</p>
          <p className="mt-3 text-3xl font-black text-slate-900">{card.value}</p>
          <p className="mt-2 text-xs text-slate-500">{card.note}</p>
        </div>
      ))}
    </section>
  );
}