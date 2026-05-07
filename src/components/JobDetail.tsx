import type { JobApplication } from "../types/career";
import { buildAiComment } from "../utils/careerUtils";

type JobDetailProps = {
  job: JobApplication;
  onUpdate: (job: JobApplication) => void;
};

export function JobDetail({ job, onUpdate }: JobDetailProps) {
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
        <h2 className="text-xl font-black text-slate-900">応募戦略メモ</h2>
        <p className="mt-1 text-sm text-slate-500">志望動機・自己PR・配慮事項を整理します。</p>
      </div>

      <div className="mt-5 rounded-3xl bg-blue-50 p-5">
        <p className="text-xs font-black text-blue-700">AI Strategy Comment</p>
        <p className="mt-2 text-sm leading-6 text-slate-700">{buildAiComment(job)}</p>
      </div>

      <div className="mt-6 grid gap-4">
        <Field label="志望動機">
          <textarea
            value={job.motivation}
            onChange={(e) => updateField("motivation", e.target.value)}
            className="textarea min-h-28"
            placeholder="この会社を志望する理由"
          />
        </Field>

        <Field label="自己PR">
          <textarea
            value={job.selfPr}
            onChange={(e) => updateField("selfPr", e.target.value)}
            className="textarea min-h-28"
            placeholder="自分の強み・実績・ポートフォリオで伝えたいこと"
          />
        </Field>

        <Field label="配慮事項">
          <textarea
            value={job.accommodation}
            onChange={(e) => updateField("accommodation", e.target.value)}
            className="textarea"
            placeholder="勤務上配慮してほしいこと、働きやすい条件"
          />
        </Field>

        <Field label="自由メモ">
          <textarea
            value={job.memo}
            onChange={(e) => updateField("memo", e.target.value)}
            className="textarea"
            placeholder="企業研究・気になる点・応募時の注意点"
          />
        </Field>
      </div>
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-bold text-slate-500">{label}</span>
      {children}
    </label>
  );
}