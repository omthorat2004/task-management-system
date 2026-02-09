import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchTasks, type Task } from "@/features/task/taskSlice";

import TaskCard from "@/features/task/components/TaskCard";
import CreateTaskModal from "@/features/admin/components/CreateTaskModal";
import ViewTaskModal from "@/features/admin/components/ViewTaskModal";

/* ---------- helpers ---------- */
const emptyTask: Task = {
  id: 0,
  title: "",
  description: "",
  assigned_user: 0,
  due_date: "",
  status: "pending",
};

/* ---------- component ---------- */
const Admin = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const user = useAppSelector((state) => state.auth.user);
  const { tasks, loading } = useAppSelector((state) => state.task);

  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [editTask, setEditTask] = useState<Task | null>(null);

  /* auth + fetch tasks */
  useEffect(() => {
    if (!user) return;

    if (user.role === "employee") {
      navigate("/");
      return;
    }

    if (user.role === "admin") {
      dispatch(fetchTasks());
    }
  }, [user, dispatch, navigate]);

  /* safe tasks array */
  const taskArray: Task[] = Array.isArray(tasks) ? tasks : [];
 
console.log(tasks)
  return (
    <div className="p-6 mt-20">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Admin Tasks</h1>
        <button className="button" onClick={() => setEditTask({ ...emptyTask })}>
          + Create Task
        </button>
      </div>

      {loading && <p>Loading tasks...</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {taskArray.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onView={setSelectedTask}
            onEdit={setEditTask}
          />
        ))}
      </div>

      {/* View Task Modal */}
      {selectedTask && (
        <ViewTaskModal
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
        />
      )}

      {/* Create / Edit Task Modal */}
      {editTask && (
        <CreateTaskModal
          taskId={editTask.id || undefined}
          title={editTask.title}
          description={editTask.description || ""}
          assignedUser={editTask.assigned_user ? String(editTask.assigned_user) : ""}
          dueDate={editTask.due_date}
          onClose={() => setEditTask(null)}
        />
      )}
    </div>
  );
};

export default Admin;
