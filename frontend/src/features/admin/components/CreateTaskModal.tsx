import React, { useState } from "react";

interface CreateTaskModalProps {
    onClose: () => void;
    title: string;
    description: string;
    assignedUser: string;
    dueDate: string;
}

interface User {
    id: string;
    name: string;
}


const USERS: User[] = [
    { id: "1", name: "Alice" },
    { id: "2", name: "Bob" },
    { id: "3", name: "Charlie" },
];


const CreateTaskModal: React.FC<CreateTaskModalProps> = ({ onClose ,title,description,dueDate,assignedUser}) => {
    const [formData, setFormData] = useState({
        title:title,
        description:description,
        dueDate:dueDate,
        assignedUser:assignedUser
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        const payload = {...formData,dueDate: new Date(formData.dueDate).toISOString()}

        console.log(payload)
        onClose();
    };


    return (
        <div
            className="fixed inset-0 bg-black/20 flex justify-center items-center z-100"
            onClick={onClose}
        >
            <form
                className="card flex flex-col gap-4 w-full max-w-md p-6"
                onClick={(e) => e.stopPropagation()}
                onSubmit={handleSubmit}
            >
                <h1 className="text-center font-semibold text-xl text-foreground">{title ? "Edit Task" : "Create Task"}</h1>

                
                <div className="flex flex-col">
                    <label className="text-muted mb-1">Title</label>
                    <input
                        type="text"
                        name="title"
                        placeholder="Enter title"
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full border border-border rounded-md p-2 focus:border-accent"
                        required
                    />
                </div>

                {/* Description */}
                <div className="flex flex-col">
                    <label className="text-muted mb-1">Description</label>
                    <textarea
                        name="description"
                        placeholder="Enter description"
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full border border-border rounded-md p-2 focus:border-accent resize-none"
                        rows={4}
                    />
                </div>

                {/* Assigned User */}
                <div className="flex flex-col">
                    <label className="text-muted mb-1">Assign To</label>
                    <select
                        name="assignedUser"
                        value={formData.assignedUser}
                        onChange={handleChange}
                        className="w-full border border-border rounded-md p-2 focus:border-accent"
                        required
                    >
                        <option value="" disabled>
                            Select a user
                        </option>
                        {USERS.map((user) => (
                            <option key={user.id} value={user.id}>
                                {user.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Due Date */}
                <div className="flex flex-col">
                    <label className="text-muted mb-1">Due Date</label>
                    <input
                        type="date"
                        name="dueDate"
                        value={formData.dueDate}
                        onChange={handleChange}
                        className="w-full border border-border rounded-md p-2 focus:border-accent"
                        required
                    />
                </div>

                {/* Buttons */}
                <div className="flex justify-end gap-2 mt-2">
                    <button
                        type="button"
                        onClick={onClose}
                        className="button-destructive px-4 py-2"
                    >
                        Cancel
                    </button>
                    <button type="submit" className="button px-4 py-2">
                        Create
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateTaskModal;
