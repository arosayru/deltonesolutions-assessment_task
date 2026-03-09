import { useState } from "react";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import { resetPassword } from "../services/authService";

const ResetPassword = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const [form, setForm] = useState({
        email: searchParams.get("email") || "",
        token: searchParams.get("token") || "",
        newPassword: ""
    });

    const [message, setMessage] = useState("");
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
        setMessage("");

        try{
            await resetPassword(form);

            setMessage("Password reset successful. Redirecting to login...");

            setTimeout(() => {
                navigate("/login");
            }, 2000);
        } catch (err) {
            setError("Invalid token or request failed.");
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                {error && <p style={styles.error}>{error}</p>}
                {message && <p style={styles.success}>{message}</p>}

                <form onSubmit={handleSubmit}>
                    <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} style={styles.input} required/>

                    <input type="text" name="token" placeholder="Reset Token" value={form.token} onChange={handleChange} style={styles.input} required/>

                    <input type="password" name="newPassword" placeholder="New Password" value={form.newPassword} onChange={handleChange} style={styles.input} required/>

                    <button type="submit" style={styles.button}>
                        Reset Password
                    </button>
                </form>

                <p style={styles.links}>
                    <Link to="/login">Back to Login</Link>
                </p>
            </div>
        </div>
    );
};

export default ResetPassword;

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
        background: "#673ab7",
        color: "white",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer"
    },

    links: {
        marginTop: "15px",
        fontSize: "14px"
    },

    error: {
        color: "red",
        marginBottom: "10px"
    },

    success: {
        color: "green",
        marginBottom: "10px"
    }
};
