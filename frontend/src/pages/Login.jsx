import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../services/authService";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const [form, setForm] = useState({
        email: "",
        password: ""
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

        try {
            const response = await loginUser(form);

            const token = response.data.token;

            login(token);

            navigate("/");
        } catch(err) {
            setError("Invalid email or password");
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h2>Login</h2>
                {error && <p style={styles.error}>{error}</p>}

                <form onSubmit={handleSubmit}>
                    <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} style={styles.input} required/>
                    <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} style={styles.input} required/>

                    <button type="submit" style={styles.button}>Login</button>
                </form>

                <p style={styles.links}><Link to="/forgot-password">Forgot Password?</Link></p>

                <p style={styles.links}>Don't have an account? <Link to="/register">Register</Link></p>
            </div>
        </div>
    );
};

export default Login;

const styles = {

  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f5f6fa"
  },

  card: {
    width: "350px",
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
    background: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer"
  },

  links: {
    marginTop: "10px",
    fontSize: "14px"
  },

  error: {
    color: "red",
    marginBottom: "10px"
  }
};