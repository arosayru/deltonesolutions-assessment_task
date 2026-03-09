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
        marginTop: "20px"
    },

    input: {
        flex: 1,
        padding: "10px",
        border: "1px solid #ccc"
    },

    button: {
        padding: "10px 20px",
        background: "#4CAF50",
        color: "white",
        border: "none"
    }
};