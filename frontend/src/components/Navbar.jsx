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
            <h3>Task Manager</h3>

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
        padding: "15px 40px",
        background: "#333",
        color: "white"
    },

    button: {
        padding: "8px 15px",
        background: "#ff5252",
        border: "none",
        color: "white",
        borderRadius: "4px",
        cursor: "pointer"
    }
};
