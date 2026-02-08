import CreateTaskModal from "@/features/admin/components/CreateTaskModal";
import TaskCard from "@/features/admin/components/TaskCard";
import ViewTaskModal from "@/features/admin/components/ViewTaskModal";
import { useAppSelector } from "@/store/hooks";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


type status = "pending" | "in-progress" | "completed";

export interface Task {
  id: string;
  title: string;
  description: string;
  assignedUser: string;
  dueDate: string; 
  status: status
}


const TASKS: Task[] = [
  {
    id: "1",
    title: "Design Dashboard",
    description: "Create admin dashboard UI",
    assignedUser: "1",
    dueDate: "2026-02-07T00:00:00.000Z",
    status: "pending",
  },
  {
    id: "2",
    title: "API Integration",
    description: "Integrate task APIs",
    assignedUser: "2",
    dueDate: "2026-02-10T00:00:00.000Z",
    status: "in-progress",
  },
];

const defaultTaskValue = {
    id: "0",
  title: "",
  description: "",
  assignedUser: "",
  dueDate: "",
  status: "pending" as status
}

const Admin = () => {
  const user = useAppSelector((state) => state.auth.user);
  const navigate = useNavigate();

  const [tasks] = useState<Task[]>(TASKS);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const [editTask,setEditTask] = useState<Task>(defaultTaskValue);

  const onClose = ()=>{
    setEditTask(defaultTaskValue)
  }

  useEffect(() => {
    if(!user){
        return;
    }
    if (user?.role === "employee") {
      navigate("/");
    }
  }, [user, navigate]);

  useEffect(() => {
  console.log("Admin mounted");
  return () => console.log("Admin unmounted");
}, []);






  return (
    <div className="p-6 mt-20">
      <h1 className="text-2xl font-semibold mb-4">Admin Tasks</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onView={setSelectedTask}
          onEdit={(task) =>
  setEditTask({
    ...task,
    dueDate: task.dueDate.split("T")[0],
  })
}

          />
        ))}
      </div>

      {selectedTask && (
        <ViewTaskModal
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
        />
      )}

      {editTask.id!=="0" &&(
        <CreateTaskModal title={editTask.title} description={editTask.description} assignedUser={editTask.assignedUser} dueDate={editTask.dueDate} onClose={onClose}/>
      )}
    </div>
  );
};

export default Admin;
