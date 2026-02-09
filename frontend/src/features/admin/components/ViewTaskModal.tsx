import type { Task } from "@/pages/Admin";


interface ViewTaskModalProps {
  task: Task;
  onClose: () => void;
}

const ViewTaskModal = ({ task, onClose }: ViewTaskModalProps) => {
  return (
    <div
      className="fixed inset-0 bg-black/30 flex justify-center items-center"
      onClick={onClose}
    >
      <div
        className="card w-full max-w-md p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-semibold mb-4">Task Details</h2>

        <p><strong>Title:</strong> {task.title}</p>
        <p><strong>Description:</strong> {task.description}</p>
        <p><strong>Assigned User ID:</strong> {task.assigned_user}</p>
        <p><strong>Status:</strong> {task.status}</p>
        <p>
          <strong>Due Date:</strong>{" "}
          {new Date(task.due_date).toLocaleDateString()}
        </p>

        <div className="flex justify-end mt-4">
          <button className="button px-4 py-2" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewTaskModal;
