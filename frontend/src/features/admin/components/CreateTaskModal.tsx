import { useEffect, useState } from "react";
import axios from "axios";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { createTask, adminUpdateTask } from "@/features/task/taskSlice";

/* ---------- types ---------- */

interface CreateTaskModalProps {
  onClose: () => void;
  title: string;
  description: string;
  assignedUser: string;
  dueDate: string;
  taskId?: number;
}

interface User {
  id: number;
  name: string;
}

/* ---------- component ---------- */

const CreateTaskModal: React.FC<CreateTaskModalProps> = ({
  onClose,
  title,
  description,
  assignedUser,
  dueDate,
  taskId,
}) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);

  const [users, setUsers] = useState<User[]>([]);

  const [formData, setFormData] = useState({
    title,
    description,
    assignedUser,
    dueDate,
  });

  /* fetch users (ADMIN ONLY) */
  useEffect(() => {
    if (user?.role === "admin") {
      axios.get("http://localhost:8000/admin/users").then((res) => {
        setUsers(res.data);
      });
    }
  }, [user]);

  /* handle input change */
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  /* submit */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      title: formData.title,
      description: formData.description,
      assigned_user: Number(formData.assignedUser),
      due_date: formData.dueDate, // DATE (YYYY-MM-DD)
       status: "pending", 
    };

    if (taskId) {
      dispatch(adminUpdateTask({ id: taskId, data: payload }));
    } else {
      dispatch(createTask(payload));
    }

    onClose();
  };

  /* non-admin safety */
  if (user?.role !== "admin") return null;

  /* ---------- UI ---------- */

  return (
    <div className="fixed inset-0 bg-black/30 flex justify-center items-center">
      <form
        className="card flex flex-col gap-4 w-full max-w-md p-6"
        onSubmit={handleSubmit}
      >
        <h1 className="text-xl font-semibold text-center">
          {taskId ? "Edit Task" : "Create Task"}
        </h1>

        {/* Title */}
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Title"
          required
          className="input"
        />

        {/* Description */}
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          className="input"
        />

        {/* Assigned user */}
        <select
          name="assignedUser"
          value={formData.assignedUser}
          onChange={handleChange}
          required
          className="input"
        >
          <option value="" disabled>
            Select user
          </option>
          {users.map((u) => (
            <option key={u.id} value={u.id}>
              {u.name}
            </option>
          ))}
        </select>

        {/* Due date */}
        <input
          type="date"
          name="dueDate"
          value={formData.dueDate}
          onChange={handleChange}
          required
          className="input"
        />

        {/* Actions */}
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="button-destructive"
          >
            Cancel
          </button>
          <button type="submit" className="button">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateTaskModal;
