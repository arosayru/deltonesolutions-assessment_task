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
        padding: "12px",
        border: "1px solid #ddd",
        marginBottom: "10px",
        borderRadius: "5px"
    },

    actions: {
        display: "flex",
        gap: "10px"
    },

    toggle: {
        background: "#2196f3",
        color: "white",
        border: "none",
        padding: "6px 10px",
        cursor: "pointer"
    },

    delete: {
        background: "#f44336",
        color: "white",
        border: "none",
        padding: "6px 10px",
        cursor: "pointer"
    }
};