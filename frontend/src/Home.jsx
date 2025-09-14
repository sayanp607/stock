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

      {/* Call-to-action card */}
      <div className={styles.callToAction}>
        <div className={styles.callToActionBox}>
          <div className={styles.callIcon}>
            <span>🚀</span>
          </div>
          <div className={styles.callContent}>
            <div className={styles.callTitle}>
              Ready to Build Your Wealth?
            </div>
            <div className={styles.callText}>
              Let's get you started on the path to financial success. Create your first goal today!
            </div>
          </div>
          <button
            className={styles.callButton}
            onClick={() => navigate("/profile-age")}
          >
            Start Your Journey &rarr;
          </button>
        </div>
      </div>

      {/* Welcome section */}
      <div className={styles.welcomeSection}>
        <div className={styles.welcomeTitle}>
          Welcome, {currentUser.displayName || currentUser.email}!
        </div>
        <div className={styles.welcomeText}>
          You are registered as a{" "}
          {currentUser.email === SUPER_ADMIN_EMAIL ? "Super Admin" : "User"}
          . <br /> Explore stock suggestions tailored for you!
        </div>
      </div>

      {/* Modal */}
      {showUsersModal && (
        <div className={styles.modalBackdrop} onClick={() => setShowUsersModal(false)}>
          <div className={styles.modalBox} onClick={(e) => e.stopPropagation()}>
            <SuperAdminPanel />
            <button className={styles.logoutBtn} onClick={() => setShowUsersModal(false)}>
              Close
            </button>
          </div>
        </div>
      )}

      <TestimonialSection />
    </div>
  );
};

export default Home;
