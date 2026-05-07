import type { JobApplication } from "../types/career";
import { statusLabelMap, priorityLabelMap } from "../utils/careerUtils";

type PrintSheetProps = {
  job: JobApplication;
};

export function PrintSheet({ job }: PrintSheetProps) {
  const selectedPortfolios = job.portfolios.filter((item) => item.selected);
  const unfinishedTasks = job.tasks.filter((task) => task.status !== "done");

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between gap-4 print:hidden">
        <div>
          <h2 className="text-xl font-black text-slate-900">A4提出準備シート</h2>
          <p className="mt-1 text-sm text-slate-500">面接前・応募前の確認資料として印刷できます。</p>
        </div>

        <button
          onClick={() => window.print()}
          className="rounded-2xl bg-blue-600 px-4 py-2 text-sm font-bold text-white"
        >
          印刷
        </button>
      </div>

      <div className="mt-6 rounded-2xl border border-slate-200 p-6 print:border-none print:p-0">
        <p className="text-sm font-bold text-slate-500">Career Launch Sheet</p>
        <h1 className="mt-2 text-3xl font-black text-slate-900">
          {job.companyName || "企業名未入力"}
        </h1>
        <p className="mt-1 text-lg font-bold text-slate-700">{job.jobTitle || "職種未入力"}</p>

        <div className="mt-6 grid gap-3 md:grid-cols-2">
          <Info label="ステータス" value={statusLabelMap[job.status]} />
          <Info label="優先度" value={priorityLabelMap[job.priority]} />
          <Info label="勤務形態" value={job.remoteType || "-"} />
          <Info label="給与" value={job.salary || "-"} />
          <Info label="勤務地" value={job.location || "-"} />
          <Info label="障害者雇用" value={job.isDisabilityHiring ? "該当" : "未設定 / 一般"} />
        </div>

        <Block title="志望動機" text={job.motivation} />
        <Block title="自己PR" text={job.selfPr} />
        <Block title="配慮事項" text={job.accommodation} />

        <div className="mt-6">
          <h2 className="text-lg font-black text-slate-900">提出予定ポートフォリオ</h2>
          <div className="mt-3 space-y-3">
            {selectedPortfolios.length === 0 ? (
              <p className="text-sm text-slate-500">未選択</p>
            ) : (
              selectedPortfolios.map((item) => (
                <div key={item.id} className="rounded-2xl bg-slate-50 p-4">
                  <p className="font-bold text-slate-900">{item.name}</p>
                  <p className="mt-1 text-sm text-slate-600">{item.reason || "選定理由未入力"}</p>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="mt-6">
          <h2 className="text-lg font-black text-slate-900">未完了タスク</h2>
          <ul className="mt-3 list-inside list-disc text-sm text-slate-700">
            {unfinishedTasks.length === 0 ? (
              <li>未完了タスクなし</li>
            ) : (
              unfinishedTasks.map((task) => (
                <li key={task.id}>
                  {task.title} {task.dueDate ? ` / 期限：${task.dueDate}` : ""}
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-slate-50 p-4">
      <p className="text-xs font-bold text-slate-500">{label}</p>
      <p className="mt-1 font-bold text-slate-900">{value}</p>
    </div>
  );
}

function Block({ title, text }: { title: string; text: string }) {
  return (
    <div className="mt-6">
      <h2 className="text-lg font-black text-slate-900">{title}</h2>
      <p className="mt-2 whitespace-pre-wrap rounded-2xl bg-slate-50 p-4 text-sm leading-6 text-slate-700">
        {text || "未入力"}
      </p>
    </div>
  );
}