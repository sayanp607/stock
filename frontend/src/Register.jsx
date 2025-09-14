import React from "react";
import { useNavigate } from "react-router-dom";
import { auth, provider } from "./firebase";
import { signInWithPopup } from "firebase/auth";
import styles from "./Register.module.css";
import { API_BASE_URL } from "./main";

const Register = () => {
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      // Send user info to backend for user registration
      await fetch(`${API_BASE_URL}/api/auth/register-user`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          uid: user.uid,
          email: user.email,
          name: user.displayName,
        }),
      });
      navigate("/home");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className={styles.registerContainer}>
      <div className={styles.registerBox}>
        <h2 className={styles.registerTitle}>Register as User</h2>
        <button className={styles.googleButton} onClick={handleGoogleSignIn}>
          Sign up / Login with Google
        </button>
      </div>
    </div>
  );
};

export default Register;
