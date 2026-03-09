import { useEffect, useState } from "react";
import { getTasks, createTask, deleteTask, toggleTask } from "../services/taskService";
import TaskItem from "../components/TaskItem";
import TaskForm from "../components/TaskForm";
import Navbar from "../components/Navbar";

const Dashboard = () => {
    const [tasks, setTasks] = useState([]);

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
        <div>
            <Navbar />

            <div style={styles.container}>
                <h2>Your Tasks</h2>

                <TaskForm onCreate={handleCreate} />

                <div style={styles.list}>
                    {tasks.map((task) => (
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
    );
};

export default Dashboard;

const styles = {
    container: {
        maxWidth: "800px",
        margin: "40px auto",
        padding: "20px"
    },

    list: {
        marginTop: "20px"
    }
};