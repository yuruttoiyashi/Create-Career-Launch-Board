type HeaderProps = {
  onCreateNew: () => void;
};

export function Header({ onCreateNew }: HeaderProps) {
  return (
    <header className="rounded-3xl bg-slate-950 p-6 text-white shadow-xl">
      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-medium text-blue-200">SE Career Portfolio Manager</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">
            Career Launch Board
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">
            求人応募・ポートフォリオ提出・面接準備を一元管理する、SE転職向け作戦ボードです。
          </p>
        </div>

        <button
          onClick={onCreateNew}
          className="rounded-2xl bg-white px-5 py-3 text-sm font-bold text-slate-950 shadow hover:bg-blue-50"
        >
          ＋ 求人を追加
        </button>
      </div>
    </header>
  );
}