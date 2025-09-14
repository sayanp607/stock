import React, { useEffect, useRef, useState } from "react";
import styles from "./JourneySteps.module.css";

const steps = [
  {
    title: "Discover Your Investor Profile",
    desc: "Take a quick quiz to share your goals and get a clear starting point.",
  },
  {
    title: "Explore Personalized Portfolios",
    desc: "See curated portfolios tailored to your goals and risk level.",
  },
  {
    title: "Complete the Paperwork Digitally",
    desc: "Sign documents online with zero hassle or office visits.",
  },
  {
    title: "Invest & Track with Ease",
    desc: "Start investing and view progress on your personal dashboard.",
  },
];

const JourneySteps = () => {
  const [visible, setVisible] = useState(false);
  const [delayedVisible, setDelayedVisible] = useState(false);
  const containerRef = useRef();
  const timerRef = useRef();

  // Helper to check if section is in viewport
  const isInViewport = () => {
    if (!containerRef.current) return false;
    const rect = containerRef.current.getBoundingClientRect();
    return rect.top < window.innerHeight - 100 && rect.bottom > 100;
  };

  useEffect(() => {
    const onScroll = () => {
      setVisible(isInViewport());
    };
    window.addEventListener("scroll", onScroll);
    onScroll(); // Initial check
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    if (visible) {
      timerRef.current = setTimeout(() => {
        setDelayedVisible(true);
      }, 500);
    } else {
      clearTimeout(timerRef.current);
      setDelayedVisible(false);
    }
    return () => clearTimeout(timerRef.current);
  }, [visible]);

  return (
    <div className={styles.journeyContainer} ref={containerRef}>
      {/* Progress bar section */}
      <div className={styles.progressBar} style={{ position: "relative" }}>
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            height: "100%",
            width: delayedVisible ? "100%" : "0%",
            background: "linear-gradient(90deg, #b6e388 0%, #ff7f50 100%)",
            borderRadius: "9px",
            zIndex: 0,
            transition: "width 0.7s cubic-bezier(.4,0,.2,1)",
          }}
        />
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className={styles.stepCircle}
            style={{ left: `${(i / (steps.length - 1)) * 100}%`, zIndex: 10 }}
          >
            {i + 1}
          </div>
        ))}
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          width: "80vw",
          maxWidth: "1100px",
          margin: "32px auto 0 auto",
          gap: "32px",
          textAlign: "left",
        }}
      >
        {steps.map((step, i) => (
          <div key={i}>
            <div
              className={delayedVisible ? styles.flyIn : styles.flyOut}
              style={{
                fontSize: "7rem",
                fontWeight: 800,
                color: "#99f468ff",
                opacity: 0.35,
                marginBottom: "18px", // increased gap below number
                lineHeight: 1,
              }}
            >
              {i + 1}
            </div>
            <div
              className={delayedVisible ? styles.flyIn : styles.flyOut}
              style={{
                fontSize: "2rem",
                fontWeight: 700,
                color: "#222",
                marginBottom: "10px",
                marginTop: "12px", // gap above bold text
              }}
            >
              {step.title}
            </div>
            <div
              className={delayedVisible ? styles.flyIn : styles.flyOut}
              style={{
                fontSize: "1.15rem",
                color: "#444",
                marginTop: "8px", // gap above description
              }}
            >
              {step.desc}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JourneySteps;
