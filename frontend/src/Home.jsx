import React, { useEffect, useState } from "react";
import styles from "./Home.module.css";
import SuperAdminPanel from "./SuperAdminPanel";
import HeroSection from "./HeroSection";
import { auth } from "./firebase";
import { useNavigate } from "react-router-dom";
import JourneySteps from "./JourneySteps";
import TestimonialSection from "./TestimonialSection";

const SUPER_ADMIN_EMAIL = "sayanp607@gmail.com";

const Home = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [showUsersModal, setShowUsersModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      if (!user) {
        navigate("/");
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  if (!currentUser) {
    return null;
  }

  return (
    <div className={styles.homeContainer}>
      <div className={styles.topBar}>
        <button className={styles.logoutBtn} onClick={() => auth.signOut()}>
          Logout
        </button>
        {currentUser.email === SUPER_ADMIN_EMAIL && (
          <button
            className={styles.checkUsersBtn}
            onClick={() => setShowUsersModal(true)}
          >
            Check Users
          </button>
        )}
      </div>
      {/* Call-to-action card in the middle of the page */}
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "48px 0 32px 0",
        }}
      >
        <div
          style={{
            background: "linear-gradient(90deg, #3b5cff 0%, #4666e5 100%)",
            borderRadius: 18,
            boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
            padding: "32px 38px",
            display: "flex",
            alignItems: "center",
            gap: 32,
            width: "100%",
            maxWidth: 1200,
          }}
        >
          <div
            style={{
              width: 80,
              height: 80,
              borderRadius: "50%",
              background: "#4e7cfb",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginRight: 18,
            }}
          >
            <span style={{ fontSize: 44, color: "#fff" }}>🚀</span>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 800, fontSize: "2.1rem", color: "#fff" }}>
              Ready to Build Your Wealth?
            </div>
            <div
              style={{ color: "#e6eaff", fontSize: "1.18rem", marginTop: 6 }}
            >
              Let's get you started on the path to financial success. Create
              your first goal today!
            </div>
          </div>
          <button
            style={{
              background: "#fff",
              color: "#2563eb",
              fontWeight: 700,
              fontSize: "1.15rem",
              border: "none",
              borderRadius: 10,
              padding: "16px 32px",
              cursor: "pointer",
              boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
              transition: "background 0.2s",
              marginLeft: 18,
            }}
            onClick={() => navigate("/profile-age")}
          >
            Start Your Journey &rarr;
          </button>
        </div>
      </div>
      {/* Welcome section can be kept below HeroSection if needed */}
      <div className={styles.welcomeSection}>
        <div className={styles.welcomeTitle}>
          Welcome, {currentUser.displayName || currentUser.email}!
        </div>
        <div className={styles.welcomeText}>
          You are registered as a{" "}
          {currentUser.email === SUPER_ADMIN_EMAIL ? "Super Admin" : "User"}
          .
          <br /> Explore stock suggestions tailored for you!
        </div>
      </div>
      {showUsersModal && (
        <div
          className={styles.modalBackdrop}
          onClick={() => setShowUsersModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "#232526",
              borderRadius: 16,
              padding: 32,
              minWidth: 350,
              maxWidth: 600,
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              boxShadow: "0 8px 32px rgba(44,62,80,0.32)",
            }}
          >
            <SuperAdminPanel />
            <button
              className={styles.logoutBtn}
              style={{ marginTop: 24 }}
              onClick={() => setShowUsersModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
      <TestimonialSection/>
    </div>
  );
};

export default Home;
