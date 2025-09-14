import React, { useEffect, useState } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import styles from "./HeroSection.module.css";

const highlightVariants = [
  { text: "Live Better.", bg: "#ff7f50" },
  { text: "Invest Smarter.", bg: "#ff7f50" },
];

export default function HeroSection() {
  const [highlightIdx, setHighlightIdx] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimating(true);
      setTimeout(() => {
        setHighlightIdx((idx) => (idx + 1) % highlightVariants.length);
        setAnimating(false);
      }, 600);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handlePortfolioClick = (e) => {
    const uid = localStorage.getItem("uid");
    if (!uid) {
      e.preventDefault();
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3500); // alert disappears after 3.5s
    }
  };

  return (
    <>
      <div className={styles.heroContainer}>
        {/* Left section */}
        <div className={styles.heroLeft}>
          <div className={styles.heroTagline}>
            Your future self will thank you. Why wait?
          </div>
          <div className={styles.heroTitle}>
            Plan Smarter.
            <br />
            <span style={{ display: "block", height: "50px" }}></span>
            <span
              className={
                styles.heroHighlight + " " + (animating ? styles.diceRotate : "")
              }
              style={{
                background: highlightVariants[highlightIdx].bg,
                display: "inline-block",
                minWidth: "180px",
                textAlign: "center",
              }}
            >
              {highlightVariants[highlightIdx].text}
            </span>
          </div>
          <div className={styles.heroDesc}>
            We combine technology and expertise to tailor investments to your
            unique goals.
          </div>
          <a
            href="/profile-age"
            className={styles.heroBtn}
            onClick={handlePortfolioClick}
          >
            Build your personalized portfolio
            <span style={{ fontSize: "1.5em", marginLeft: "2px" }}>&#8594;</span>
          </a>
        </div>

        {/* Right section */}
        <div className={styles.heroRight}>
          <DotLottieReact
            src="https://lottie.host/5fd97f96-f996-4830-9ee3-8b8040cf062e/IxZ2fuOMci.lottie"
            loop
            autoplay
            style={{ width: "340px", height: "340px" }}
          />
        </div>
      </div>

      {/* Custom alert */}
      {showAlert && (
        <div
          style={{
            position: "fixed",
            top: 20,
            left: "50%",
            transform: "translateX(-50%)",
            background: "linear-gradient(90deg, #ff7f50, #ff4d4f)",
            color: "#fff",
            padding: "16px 24px",
            borderRadius: 12,
            fontWeight: 600,
            fontSize: "1.1rem",
            boxShadow: "0 6px 20px rgba(0,0,0,0.2)",
            zIndex: 9999,
            textAlign: "center",
            animation: "slideDown 0.5s ease-out",
          }}
        >
          Please register first before building your personalized portfolio!
        </div>
      )}

      {/* Add simple slideDown animation */}
      <style>
        {`
          @keyframes slideDown {
            0% { transform: translate(-50%, -50px); opacity: 0; }
            100% { transform: translate(-50%, 0); opacity: 1; }
          }
        `}
      </style>
    </>
  );
}
