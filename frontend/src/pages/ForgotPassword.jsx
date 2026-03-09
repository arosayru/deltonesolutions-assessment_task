import { useState } from "react";
import { Link } from "react-router-dom";
import { forgotPassword } from "../services/authService";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [token, setToken] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        setMessage("");
        setToken("");

        try{
            const response = await forgotPassword(email);

            setMessage("Password reset token generated.");
            setToken(response.data.resetToken);
        }catch (err) {
            setError("User not found or request failed.");
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <p style={styles.eyebrow}>Account Recovery</p>
                <h2 style={styles.title}>Forgot Password</h2>
                <p style={styles.subtitle}>Generate a reset token to set a new password.</p>

                {error && <p style={styles.error}>{error}</p>}

                {message && <p style={styles.success}>{message}</p>}

                <form onSubmit={handleSubmit}>
                    <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} style={styles.input} required/>
                    <button type="submit" style={styles.button}>
                        Generate Reset Token
                    </button>
                </form>

                {token && (
                    <div style={styles.tokenBox}>
                        <p><strong>Reset Token:</strong></p>
                        <p style={styles.token}>{token}</p>
                        <p style={styles.links}>
                            <Link to={`/reset-password?email=${encodeURIComponent(email)}&token=${encodeURIComponent(token)}`} style={styles.link}>
                                Go to Reset Password
                            </Link>
                        </p>
                    </div>
                )}

                <p style={styles.links}>
                    <Link to="/login" style={styles.link}>Back to Login</Link>
                </p>
            </div>
        </div>
    );
};

export default ForgotPassword;

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
        background: "linear-gradient(135deg, #ea580c 0%, #f59e0b 100%)",
        color: "white",
        border: "none",
        borderRadius: "10px",
        cursor: "pointer",
        fontSize: "16px",
        fontWeight: "700",
        letterSpacing: "0.02em",
        boxShadow: "0 10px 20px rgba(234, 88, 12, 0.25)"
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
    },

    success: {
        color: "#047857",
        marginBottom: "14px",
        padding: "10px 12px",
        borderRadius: "8px",
        background: "#d1fae5",
        border: "1px solid #a7f3d0",
        fontSize: "14px"
    },

    tokenBox: {
        marginTop: "16px",
        padding: "14px",
        background: "#f8fafc",
        borderRadius: "10px",
        border: "1px solid #dbeafe"
    },

    token: {
        wordBreak: "break-all",
        fontSize: "12px",
        color: "#334155"
    }
};
