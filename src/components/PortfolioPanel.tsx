import type { JobApplication } from "../types/career";

type PortfolioPanelProps = {
  job: JobApplication;
  onUpdate: (job: JobApplication) => void;
};

export function PortfolioPanel({ job, onUpdate }: PortfolioPanelProps) {
  const updatePortfolio = (portfolioId: string, field: "selected" | "reason", value: boolean | string) => {
    onUpdate({
      ...job,
      portfolios: job.portfolios.map((item) =>
        item.id === portfolioId ? { ...item, [field]: value } : item
      ),
      updatedAt: new Date().toISOString(),
    });
  };

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div>
        <h2 className="text-xl font-black text-slate-900">提出ポートフォリオ</h2>
        <p className="mt-1 text-sm text-slate-500">求人ごとに見せるアプリを選びます。</p>
      </div>

      <div className="mt-6 grid gap-4">
        {job.portfolios.map((item) => (
          <div key={item.id} className="rounded-3xl border border-slate-200 p-5">
            <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-black text-slate-900">{item.name}</h3>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">
                    {item.category}
                  </span>
                </div>
                <p className="mt-2 text-sm leading-6 text-slate-600">{item.description}</p>

                <div className="mt-3 flex flex-wrap gap-2 text-xs">
                  {item.appUrl && (
                    <a href={item.appUrl} target="_blank" className="font-bold text-blue-600">
                      アプリを見る
                    </a>
                  )}
                  {item.githubUrl && (
                    <a href={item.githubUrl} target="_blank" className="font-bold text-slate-600">
                      GitHub
                    </a>
                  )}
                </div>
              </div>

              <label className="flex items-center gap-2 rounded-2xl bg-slate-50 px-4 py-3 text-sm font-bold text-slate-700">
                <input
                  type="checkbox"
                  checked={item.selected}
                  onChange={(e) => updatePortfolio(item.id, "selected", e.target.checked)}
                />
                提出候補
              </label>
            </div>

            {item.selected && (
              <textarea
                value={item.reason}
                onChange={(e) => updatePortfolio(item.id, "reason", e.target.value)}
                className="textarea mt-4"
                placeholder="この企業にこのアプリを見せる理由"
              />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}