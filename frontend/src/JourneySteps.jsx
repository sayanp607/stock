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
    onScroll();
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
      <div className={styles.progressBar}>
        <div
          className={delayedVisible ? styles.progressFill : ""}
        />
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className={styles.stepCircle}
            style={{ left: `${(i / (steps.length - 1)) * 100}%` }}
          >
            {i + 1}
          </div>
        ))}
      </div>

      <div className={styles.stepsGrid}>
        {steps.map((step, i) => (
          <div key={i} className={styles.stepCard}>
            <div className={`${styles.stepNumber} ${delayedVisible ? styles.flyIn : styles.flyOut}`}>
              {i + 1}
            </div>
            <div className={`${styles.stepTitle} ${delayedVisible ? styles.flyIn : styles.flyOut}`}>
              {step.title}
            </div>
            <div className={`${styles.stepDesc} ${delayedVisible ? styles.flyIn : styles.flyOut}`}>
              {step.desc}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JourneySteps;
