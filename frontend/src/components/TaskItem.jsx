const TaskItem = ({ task, onDelete, onToggle }) => {

    return (
        <div style={styles.card}>
            <div style={styles.taskText}>
                <span style={{ textDecoration: task.isCompleted ? "line-through" : "none" }}>
                    {task.title}
                </span>
            </div>

            <div style={styles.actions}>
                <button style={styles.toggle} onClick={() => onToggle(task.id)}>
                    {task.isCompleted ? "Undo" : "Done"}
                </button>

                <button style={styles.delete} onClick={() => onDelete(task.id)}>
                    Delete
                </button>
            </div>
        </div>
    );
};

export default TaskItem;

const styles = {
    card: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "10px",
        padding: "12px",
        border: "1px solid #e2e8f0",
        marginBottom: "10px",
        borderRadius: "12px",
        background: "white",
        boxShadow: "0 6px 14px rgba(15, 23, 42, 0.06)"
    },

    taskText: {
        color: "#0f172a",
        fontSize: "15px",
        lineHeight: "1.4",
        wordBreak: "break-word"
    },

    actions: {
        display: "flex",
        gap: "8px",
        flexShrink: 0
    },

    toggle: {
        background: "linear-gradient(135deg, #2563eb 0%, #0ea5e9 100%)",
        color: "white",
        border: "none",
        padding: "7px 12px",
        borderRadius: "8px",
        cursor: "pointer",
        fontWeight: "600"
    },

    delete: {
        background: "linear-gradient(135deg, #ef4444 0%, #f97316 100%)",
        color: "white",
        border: "none",
        padding: "7px 12px",
        borderRadius: "8px",
        cursor: "pointer",
        fontWeight: "600"
    }
};
