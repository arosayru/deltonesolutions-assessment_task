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
                <h2>Forgot Password</h2>

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
                    </div>
                )}

                <p style={styles.links}>
                    <Link to="/login">Back to Login</Link>
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
        background: "#ff9800",
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
    },

    tokenBox: {
        marginTop: "15px",
        padding: "10px",
        background: "#f1f1f1",
        borderRadius: "5px"
    },

    token: {
        wordBreak: "break-all",
        fontSize: "12px"
    }
};