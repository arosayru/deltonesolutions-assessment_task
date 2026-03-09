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
                <p style={styles.eyebrow}>Account Recovery</p>
                <h2 style={styles.title}>Reset Password</h2>
                <p style={styles.subtitle}>Enter your token and set a new password.</p>

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
                    <Link to="/login" style={styles.link}>Back to Login</Link>
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
        padding: "24px",
        background: "linear-gradient(135deg, #ecf3ff 0%, #eefaf1 55%, #fff6eb 100%)",
        fontFamily: "\"Manrope\", \"Segoe UI\", \"Trebuchet MS\", sans-serif"
    },

    card: {
        width: "min(420px, 100%)",
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
        color: "#4338ca"
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
        background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
        color: "white",
        border: "none",
        borderRadius: "10px",
        cursor: "pointer",
        fontSize: "16px",
        fontWeight: "700",
        letterSpacing: "0.02em",
        boxShadow: "0 10px 20px rgba(79, 70, 229, 0.25)"
    },

    links: {
        marginTop: "14px",
        fontSize: "14px",
        color: "#1f2937"
    },

    link: {
        color: "#4338ca",
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
    },

    success: {
        color: "#047857",
        marginBottom: "14px",
        padding: "10px 12px",
        borderRadius: "8px",
        background: "#d1fae5",
        border: "1px solid #a7f3d0",
        fontSize: "14px"
    }
};
