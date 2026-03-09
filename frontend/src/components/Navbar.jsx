import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
    const navigate = useNavigate();
    const { logout } = useContext(AuthContext);

    const handleLogout = () => {
        logout();
        navigate("/login");
    };
    
    return (
        <div style={styles.navbar}>
            <div>
                <p style={styles.eyebrow}>Workspace</p>
                <h3 style={styles.title}>Task Manager</h3>
            </div>

            <button style={styles.button} onClick={handleLogout}>
                Logout
            </button>
        </div>
    );
};

export default Navbar;

const styles = {
    navbar: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "16px 22px",
        background: "rgba(15, 23, 42, 0.92)",
        color: "white",
        boxShadow: "0 8px 16px rgba(15, 23, 42, 0.18)",
        backdropFilter: "blur(6px)"
    },

    eyebrow: {
        margin: "0",
        fontSize: "11px",
        textTransform: "uppercase",
        letterSpacing: "0.08em",
        color: "#99f6e4",
        fontWeight: "700"
    },

    title: {
        margin: "4px 0 0",
        fontSize: "26px",
        lineHeight: "1.1"
    },

    button: {
        padding: "9px 16px",
        background: "linear-gradient(135deg, #ef4444 0%, #f97316 100%)",
        border: "none",
        color: "white",
        borderRadius: "10px",
        cursor: "pointer",
        fontWeight: "700"
    }
};
