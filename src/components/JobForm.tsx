import type { JobApplication, JobStatus, Priority } from "../types/career";

type JobFormProps = {
  job: JobApplication;
  onUpdate: (job: JobApplication) => void;
};

export function JobForm({ job, onUpdate }: JobFormProps) {
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
        <h2 className="text-xl font-black text-slate-900">求人情報</h2>
        <p className="mt-1 text-sm text-slate-500">応募先の基本情報を整理します。</p>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <Field label="企業名">
          <input
            value={job.companyName}
            onChange={(e) => updateField("companyName", e.target.value)}
            className="input"
            placeholder="例：株式会社〇〇"
          />
        </Field>

        <Field label="職種">
          <input
            value={job.jobTitle}
            onChange={(e) => updateField("jobTitle", e.target.value)}
            className="input"
            placeholder="例：社内SE / Webエンジニア"
          />
        </Field>

        <Field label="雇用形態">
          <input
            value={job.employmentType}
            onChange={(e) => updateField("employmentType", e.target.value)}
            className="input"
            placeholder="例：正社員 / 契約社員"
          />
        </Field>

        <Field label="勤務地">
          <input
            value={job.location}
            onChange={(e) => updateField("location", e.target.value)}
            className="input"
            placeholder="例：フルリモート / 東京 / 埼玉"
          />
        </Field>

        <Field label="給与">
          <input
            value={job.salary}
            onChange={(e) => updateField("salary", e.target.value)}
            className="input"
            placeholder="例：月給25万円〜"
          />
        </Field>

        <Field label="勤務形態">
          <input
            value={job.remoteType}
            onChange={(e) => updateField("remoteType", e.target.value)}
            className="input"
            placeholder="例：フルリモート希望"
          />
        </Field>

        <Field label="応募ステータス">
          <select
            value={job.status}
            onChange={(e) => updateField("status", e.target.value as JobStatus)}
            className="input"
          >
            <option value="draft">準備中</option>
            <option value="applied">応募済み</option>
            <option value="screening">書類選考中</option>
            <option value="interview">面接予定</option>
            <option value="offer">内定候補</option>
            <option value="rejected">不採用</option>
            <option value="hold">保留</option>
          </select>
        </Field>

        <Field label="優先度">
          <select
            value={job.priority}
            onChange={(e) => updateField("priority", e.target.value as Priority)}
            className="input"
          >
            <option value="high">高</option>
            <option value="middle">中</option>
            <option value="low">低</option>
          </select>
        </Field>

        <Field label="求人URL">
          <input
            value={job.jobUrl}
            onChange={(e) => updateField("jobUrl", e.target.value)}
            className="input"
            placeholder="https://..."
          />
        </Field>

        <label className="flex items-center gap-3 rounded-2xl border border-slate-200 px-4 py-3">
          <input
            type="checkbox"
            checked={job.isDisabilityHiring}
            onChange={(e) => updateField("isDisabilityHiring", e.target.checked)}
            className="h-4 w-4"
          />
          <span className="text-sm font-bold text-slate-700">障害者雇用求人</span>
        </label>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <Field label="必須スキル">
          <textarea
            value={job.requiredSkills}
            onChange={(e) => updateField("requiredSkills", e.target.value)}
            className="textarea"
            placeholder="求人票に書かれている必須スキル"
          />
        </Field>

        <Field label="歓迎スキル">
          <textarea
            value={job.welcomeSkills}
            onChange={(e) => updateField("welcomeSkills", e.target.value)}
            className="textarea"
            placeholder="歓迎条件・活かせそうな経験"
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