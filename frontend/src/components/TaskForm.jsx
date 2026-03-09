import { useState } from "react";

const TaskForm = ({ onCreate }) => {
    const [title, setTitle] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!title.trim()) return;

        onCreate({
            title: title,
            description: "",
            isCompleted: false
        });

        setTitle("");
    };

    return (
        <form onSubmit={handleSubmit} style={styles.form}>
            <input type="text" placeholder="Enter task..." value={title} onChange={(e) => setTitle(e.target.value)} style={styles.input}/>

            <button type="submit" style={styles.button}>
                Add Task
            </button>
        </form>
    );
};

export default TaskForm;

const styles = {
    form: {
        display: "flex",
        gap: "10px",
        marginTop: "20px",
        background: "rgba(255, 255, 255, 0.9)",
        border: "1px solid rgba(255, 255, 255, 0.8)",
        borderRadius: "14px",
        padding: "10px",
        boxShadow: "0 10px 20px rgba(15, 23, 42, 0.08)"
    },

    input: {
        flex: 1,
        boxSizing: "border-box",
        padding: "12px 14px",
        border: "1px solid #cbd5e1",
        borderRadius: "10px",
        background: "#f8fafc",
        fontSize: "15px",
        outline: "none"
    },

    button: {
        padding: "12px 18px",
        background: "linear-gradient(135deg, #0ea5a1 0%, #16a34a 100%)",
        color: "white",
        border: "none",
        borderRadius: "10px",
        fontWeight: "700",
        cursor: "pointer",
        boxShadow: "0 8px 16px rgba(22, 163, 74, 0.25)"
    }
};
