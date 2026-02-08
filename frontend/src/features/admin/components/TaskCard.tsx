import type { Task } from "@/pages/Admin";

interface TaskCardProps {
  task: Task;
  onView: (task: Task) => void;
  onEdit: (task: Task) => void;
}

const STATUS_CONFIG: Record<
  Task["status"],
  { label: string; className: string }
> = {
  pending: {
    label: "Pending",
    className: "bg-secondary text-foreground",
  },
  "in-progress": {
    label: "In Progress",
    className: "bg-accent text-accent-text",
  },
  completed: {
    label: "Completed",
    className: "bg-success text-white",
  },
};

const TaskCard = ({ task, onView, onEdit }: TaskCardProps) => {
  return (
    <div className="card flex flex-col gap-4 hover:shadow-lg transition-shadow">
      
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <h2 className="text-lg font-semibold leading-tight">
          {task.title}
        </h2>

        <span
          className={`shrink-0 px-3 py-1 rounded-full text-xs font-semibold ${STATUS_CONFIG[task.status].className}`}
        >
          {STATUS_CONFIG[task.status].label}
        </span>
      </div>

      {/* Description */}
      <p className="text-sm text-muted line-clamp-3">
        {task.description}
      </p>

      {/* Meta */}
      <div className="text-sm text-muted">
        Due{" "}
        <span className="font-medium text-foreground">
          {new Date(task.dueDate).toLocaleDateString()}
        </span>
      </div>

      {/* Actions */}
      <div className="mt-auto flex gap-2">
        <button
          className="button flex-1"
          onClick={() => onView(task)}
        >
          View
        </button>

        <button
          className="button-secondary flex-1"
          onClick={() => onEdit(task)}
        >
          Edit
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
