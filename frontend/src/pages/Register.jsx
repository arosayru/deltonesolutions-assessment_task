import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../services/authService";
import { AuthContext } from "../context/AuthContext";

const Register = () => {
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const [error, setError] = useState("");

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");

        if (form.password !== form.confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        try {
            const response = await registerUser({
                name: form.name,
                email: form.email,
                password: form.password
        });

            const token = response.data.token;

            login(token);

            navigate("/");
        } catch (err) {
            setError("Registration failed. Email may already exist.");
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <p style={styles.eyebrow}>Task Manager</p>
                <h2 style={styles.title}>Create Account</h2>
                <p style={styles.subtitle}>Start organizing your tasks in one place.</p>

                {error && <p style={styles.error}>{error}</p>}
                
                <form onSubmit={handleSubmit}>
                    <input type="text" name="name" placeholder="Full Name" value={form.name} onChange={handleChange} style={styles.input} required/>
                    
                    <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} style={styles.input} required/>

                    <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} style={styles.input} required/>

                    <input type="password" name="confirmPassword" placeholder="Confirm Password" value={form.confirmPassword} onChange={handleChange} style={styles.input} required/>

                    <button type="submit" style={styles.button}>
                        Register
                    </button>
                </form>

            <p style={styles.links}>
                Already have an account? <Link to="/login" style={styles.link}>Login</Link>
            </p>
      </div>
    </div>
  );
};

export default Register;


const styles = {

    container: {
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "24px",
        background: "linear-gradient(135deg, #ecf3ff 0%, #eefaf1 55%, #fff6eb 100%)",
        fontFamily: "\"Manrope\", \"Segoe UI\", \"Trebuchet MS\", sans-serif"
    },

    card: {
        width: "min(390px, 100%)",
        padding: "36px 32px",
        background: "rgba(255, 255, 255, 0.9)",
        borderRadius: "18px",
        border: "1px solid rgba(255, 255, 255, 0.8)",
        boxShadow: "0 20px 45px rgba(17, 24, 39, 0.12)",
        backdropFilter: "blur(6px)"
    },

    eyebrow: {
        margin: "0 0 10px",
        fontSize: "12px",
        fontWeight: "700",
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        color: "#0f766e"
    },

    title: {
        margin: "0",
        fontSize: "34px",
        lineHeight: "1.1",
        color: "#111827"
    },

    subtitle: {
        marginTop: "10px",
        marginBottom: "24px",
        color: "#4b5563",
        fontSize: "15px"
    },

    input: {
        width: "100%",
        boxSizing: "border-box",
        padding: "12px",
        marginBottom: "14px",
        borderRadius: "10px",
        border: "1px solid #cbd5e1",
        fontSize: "15px",
        outline: "none",
        background: "#f8fafc"
    },

    button: {
        width: "100%",
        boxSizing: "border-box",
        padding: "12px",
        marginTop: "4px",
        background: "linear-gradient(135deg, #0284c7 0%, #2563eb 100%)",
        color: "white",
        border: "none",
        borderRadius: "10px",
        cursor: "pointer",
        fontSize: "16px",
        fontWeight: "700",
        letterSpacing: "0.02em",
        boxShadow: "0 10px 20px rgba(2, 132, 199, 0.25)"
    },

    links: {
        marginTop: "14px",
        fontSize: "14px",
        color: "#1f2937"
    },

    link: {
        color: "#0f766e",
        textDecoration: "none",
        fontWeight: "600"
    },

    error: {
        color: "#b91c1c",
        marginBottom: "14px",
        padding: "10px 12px",
        borderRadius: "8px",
        background: "#fee2e2",
        border: "1px solid #fecaca",
        fontSize: "14px"
    }
};
