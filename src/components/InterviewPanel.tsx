import type { JobApplication } from "../types/career";

type InterviewPanelProps = {
  job: JobApplication;
  onUpdate: (job: JobApplication) => void;
};

export function InterviewPanel({ job, onUpdate }: InterviewPanelProps) {
  const updateField = <K extends keyof JobApplication>(key: K, value: JobApplication[K]) => {
    onUpdate({
      ...job,
      [key]: value,
      updatedAt: new Date().toISOString(),
    });
  };

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div>
        <h2 className="text-xl font-black text-slate-900">面接準備</h2>
        <p className="mt-1 text-sm text-slate-500">回答メモ・逆質問・日程を整理します。</p>
      </div>

      <div className="mt-6 grid gap-4">
        <label>
          <span className="mb-2 block text-xs font-bold text-slate-500">面接日</span>
          <input
            type="datetime-local"
            value={job.interviewDate}
            onChange={(e) => updateField("interviewDate", e.target.value)}
            className="input"
          />
        </label>

        <label>
          <span className="mb-2 block text-xs font-bold text-slate-500">面接で話すこと</span>
          <textarea
            value={job.interviewNotes}
            onChange={(e) => updateField("interviewNotes", e.target.value)}
            className="textarea min-h-32"
            placeholder="自己紹介、強み、アプリ制作経験、困難を乗り越えた経験など"
          />
        </label>

        <label>
          <span className="mb-2 block text-xs font-bold text-slate-500">逆質問</span>
          <textarea
            value={job.reverseQuestions}
            onChange={(e) => updateField("reverseQuestions", e.target.value)}
            className="textarea"
            placeholder="入社後の業務範囲、使用技術、チーム体制、評価制度など"
          />
        </label>
      </div>
    </section>
  );
}