import type { CareerTask, JobApplication, TaskStatus } from "../types/career";
import { createId, taskStatusLabelMap } from "../utils/careerUtils";

type TaskPanelProps = {
  job: JobApplication;
  onUpdate: (job: JobApplication) => void;
};

export function TaskPanel({ job, onUpdate }: TaskPanelProps) {
  const addTask = () => {
    const newTask: CareerTask = {
      id: createId(),
      title: "新しいタスク",
      status: "todo",
      dueDate: "",
    };

    onUpdate({
      ...job,
      tasks: [...job.tasks, newTask],
      updatedAt: new Date().toISOString(),
    });
  };

  const updateTask = <K extends keyof CareerTask>(
    taskId: string,
    key: K,
    value: CareerTask[K]
  ) => {
    onUpdate({
      ...job,
      tasks: job.tasks.map((task) =>
        task.id === taskId ? { ...task, [key]: value } : task
      ),
      updatedAt: new Date().toISOString(),
    });
  };

  const deleteTask = (taskId: string) => {
    onUpdate({
      ...job,
      tasks: job.tasks.filter((task) => task.id !== taskId),
      updatedAt: new Date().toISOString(),
    });
  };

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-slate-900">応募タスク</h2>
          <p className="mt-1 text-sm text-slate-500">応募前後に必要な作業を管理します。</p>
        </div>

        <button
          onClick={addTask}
          className="rounded-2xl bg-slate-950 px-4 py-2 text-sm font-bold text-white"
        >
          ＋追加
        </button>
      </div>

      <div className="mt-6 space-y-3">
        {job.tasks.length === 0 ? (
          <div className="rounded-2xl bg-slate-50 p-5 text-sm text-slate-500">
            タスクがありません。
          </div>
        ) : (
          job.tasks.map((task) => (
            <div key={task.id} className="grid gap-3 rounded-2xl border border-slate-200 p-4 md:grid-cols-[1fr_150px_150px_auto]">
              <input
                value={task.title}
                onChange={(e) => updateTask(task.id, "title", e.target.value)}
                className="input"
              />

              <select
                value={task.status}
                onChange={(e) => updateTask(task.id, "status", e.target.value as TaskStatus)}
                className="input"
              >
                <option value="todo">{taskStatusLabelMap.todo}</option>
                <option value="doing">{taskStatusLabelMap.doing}</option>
                <option value="done">{taskStatusLabelMap.done}</option>
              </select>

              <input
                type="date"
                value={task.dueDate}
                onChange={(e) => updateTask(task.id, "dueDate", e.target.value)}
                className="input"
              />

              <button
                onClick={() => deleteTask(task.id)}
                className="rounded-2xl px-4 py-2 text-sm font-bold text-rose-600 hover:bg-rose-50"
              >
                削除
              </button>
            </div>
          ))
        )}
      </div>
    </section>
  );
}