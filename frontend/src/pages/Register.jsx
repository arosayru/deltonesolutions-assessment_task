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
                <h2>Create Account</h2>

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
                Already have an account? <Link to="/login">Login</Link>
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
        background: "#f5f6fa"
    },

    card: {
        width: "360px",
        padding: "30px",
        background: "white",
        borderRadius: "8px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
    },

    input: {
        width: "100%",
        padding: "10px",
        marginBottom: "15px",
        borderRadius: "4px",
        border: "1px solid #ccc"
    },

    button: {
        width: "100%",
        padding: "10px",
        background: "#007bff",
        color: "white",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer"
    },

    links: {
        marginTop: "12px",
        fontSize: "14px"
    },

    error: {
        color: "red",
        marginBottom: "10px"
    }
};