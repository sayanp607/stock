import React, { useState, useEffect } from "react";
import styles from "./LandingPage.module.css";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useNavigate } from "react-router-dom";
import { auth, provider } from "./firebase";
import { signInWithPopup } from "firebase/auth";
import JourneySteps from "./JourneySteps";
import HeroSection from "./HeroSection";
import FAQSection from "./FAQSection";
import ContactUsSection from "./ContactUsSection";
import Header from "./Header";

const LandingPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      // Do NOT redirect automatically, allow landing page to show
    });
    return () => unsubscribe();
  }, []);

  const handleRegisterClick = () => {
    setShowModal(true);
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      window.localStorage.setItem("uid", user.uid); // Store UID for later use
      await fetch("http://localhost:5000/api/auth/register-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          uid: user.uid,
          email: user.email,
          name: user.displayName,
        }),
      });
      setShowModal(false);
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        navigate("/home");
      }, 4000); // Show animation for 4 seconds
    } catch (err) {
      alert(err.message);
    }
  };

  const handleLogout = async () => {
    await auth.signOut();
    window.localStorage.removeItem("uid");
    setCurrentUser(null);
  };

  return (
    <div className={styles.landingContainer}>
      {/* Header with links and buttons */}
      <Header
        currentUser={currentUser}
        onLogout={handleLogout}
        onRegisterClick={handleRegisterClick}
      />

      {/* Hero Section */}
      <HeroSection />

      <div
        style={{
          width: "100%",
          textAlign: "center",
          marginTop: 32,
          fontSize: "1.15rem",
          color: "#444",
          fontWeight: 500,
        }}
      >
        Takes less than 5 minutes to get started!
      </div>
      <div
        style={{
          width: "100%",
          textAlign: "center",
          marginTop: 12,
          fontSize: "2.5rem",
          fontWeight: 800,
          color: "#222",
        }}
      >
        Your Journey to{" "}
        <span style={{ color: "#ff7f50" }}>Smart Investing</span> Starts Here
      </div>
        <div id="journey">
        <JourneySteps />
      </div>
      <div id="faq">
        <FAQSection />
      </div>
      <div id="contact">
        <ContactUsSection />
      </div>

     

      {/* Register Modal */}
      {showModal && (
        <div
          className={styles.modalBackdrop}
          onClick={() => setShowModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "#fff",
              borderRadius: 16,
              padding: 32,
              minWidth: 350,
              maxWidth: 400,
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <DotLottieReact
              src="https://lottie.host/47eb33ec-caef-4eaf-b49b-e161878bc744/20iDb2QVqE.lottie"
              loop={false}
              autoplay
              style={{ width: 300, height: 300, marginBottom: 24 }}
            />
            <button
              className={styles.googleButton}
              onClick={handleGoogleSignIn}
            >
              Sign up / Login with Google
            </button>
          </div>
        </div>
      )}

      {/* Success Animation */}
      {showSuccess && (
        <div className={styles.modalBackdrop}>
          <div
            style={{
              background: "#fff",
              borderRadius: 16,
              padding: 32,
              minWidth: 350,
              maxWidth: 400,
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <DotLottieReact
              src="https://lottie.host/fa34131a-35a9-43f7-9ddb-fe3d25bbc204/s6JLFEnVUS.lottie"
              loop={false}
              autoplay
              style={{ width: 300, height: 300 }}
            />
            <div
              style={{
                fontWeight: 700,
                fontSize: "1.2rem",
                color: "#1976d2",
                marginTop: 16,
              }}
            >
              Registration Successful!
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;
