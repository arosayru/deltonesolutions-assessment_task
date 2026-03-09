import { useEffect, useState } from "react";
import { getTasks, createTask, deleteTask, toggleTask } from "../services/taskService";
import TaskItem from "../components/TaskItem";
import TaskForm from "../components/TaskForm";
import Navbar from "../components/Navbar";

const getUserNameFromToken = () => {
    const token = localStorage.getItem("token");

    if (!token) return "User";

    try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        const email = payload.email || payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"];
        const name = payload.name || payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];

        if (name) return name;
        if (email) return email.split("@")[0];
    } catch {
        return "User";
    }

    return "User";
};

const Dashboard = () => {
    const [tasks, setTasks] = useState([]);
    const userName = getUserNameFromToken();
    const pendingTasks = tasks.filter((task) => !task.isCompleted);
    const completedTasks = tasks.filter((task) => task.isCompleted);

    const loadTasks = async () => {
        const response = await getTasks();
        setTasks(response.data);
    };

    useEffect(() => {
        loadTasks();
    }, []);

    const handleCreate = async (task) => {
        await createTask(task);
        loadTasks();
    };

    const handleDelete = async (id) => {
        await deleteTask(id);
        loadTasks();
    };

    const handleToggle = async (id) => {
        await toggleTask(id);
        loadTasks();
    };

    return(
        <div style={styles.page}>
            <Navbar />

            <div style={styles.container}>
                <div style={styles.header}>
                    <p style={styles.eyebrow}>Productivity Hub</p>
                    <h2 style={styles.title}>Your Tasks</h2>
                    <p style={styles.user}>Welcome, {userName}</p>
                    <p style={styles.subtitle}>Track what is pending and what is done.</p>
                </div>

                <TaskForm onCreate={handleCreate} />

                <div style={styles.columns}>
                    <div style={styles.columnCard}>
                        <div style={styles.columnHeader}>
                            <h3 style={styles.columnTitle}>Not Completed</h3>
                            <span style={styles.count}>{pendingTasks.length}</span>
                        </div>

                        <div style={styles.list}>
                            {pendingTasks.length === 0 && (
                                <p style={styles.emptyText}>No pending tasks.</p>
                            )}

                            {pendingTasks.map((task) => (
                                <TaskItem
                                    key={task.id}
                                    task={task}
                                    onDelete={handleDelete}
                                    onToggle={handleToggle}
                                />
                            ))}
                        </div>
                    </div>

                    <div style={styles.columnCard}>
                        <div style={styles.columnHeader}>
                            <h3 style={styles.columnTitle}>Completed</h3>
                            <span style={styles.countDone}>{completedTasks.length}</span>
                        </div>

                        <div style={styles.list}>
                            {completedTasks.length === 0 && (
                                <p style={styles.emptyText}>No completed tasks yet.</p>
                            )}

                            {completedTasks.map((task) => (
                                <TaskItem
                                    key={task.id}
                                    task={task}
                                    onDelete={handleDelete}
                                    onToggle={handleToggle}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;

const styles = {
    page: {
        minHeight: "100vh",
        background: "linear-gradient(135deg, #ecf3ff 0%, #eefaf1 55%, #fff6eb 100%)",
        fontFamily: "\"Manrope\", \"Segoe UI\", \"Trebuchet MS\", sans-serif"
    },

    container: {
        maxWidth: "1120px",
        margin: "0 auto",
        padding: "34px 20px 40px"
    },

    header: {
        marginBottom: "14px"
    },

    eyebrow: {
        margin: "0 0 8px",
        fontSize: "12px",
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        fontWeight: "700",
        color: "#0f766e"
    },

    title: {
        margin: "0",
        fontSize: "34px",
        lineHeight: "1.1",
        color: "#0f172a"
    },

    subtitle: {
        marginTop: "8px",
        marginBottom: "0",
        color: "#475569",
        fontSize: "15px"
    },

    user: {
        marginTop: "10px",
        marginBottom: "0",
        color: "#0f766e",
        fontSize: "14px",
        fontWeight: "700"
    },

    columns: {
        marginTop: "22px",
        display: "grid",
        gap: "16px",
        gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))"
    },

    columnCard: {
        background: "rgba(255, 255, 255, 0.9)",
        border: "1px solid rgba(255, 255, 255, 0.8)",
        borderRadius: "16px",
        padding: "14px",
        boxShadow: "0 16px 30px rgba(17, 24, 39, 0.08)",
        backdropFilter: "blur(6px)",
        minHeight: "220px"
    },

    columnHeader: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "4px 4px 10px"
    },

    columnTitle: {
        margin: "0",
        fontSize: "19px",
        color: "#0f172a"
    },

    count: {
        padding: "4px 10px",
        borderRadius: "999px",
        background: "#dbeafe",
        color: "#1d4ed8",
        fontWeight: "700",
        fontSize: "12px"
    },

    countDone: {
        padding: "4px 10px",
        borderRadius: "999px",
        background: "#dcfce7",
        color: "#166534",
        fontWeight: "700",
        fontSize: "12px"
    },

    list: {
        marginTop: "4px"
    },

    emptyText: {
        margin: "14px 6px",
        color: "#64748b",
        fontSize: "14px"
    }
};
