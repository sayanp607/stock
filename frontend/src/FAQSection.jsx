import React, { useState, useEffect, useRef } from "react";
import styles from "./FAQSection.module.css";

const faqs = [
  {
    question: "Why Choose BearTron Over Mutual Funds or Smallcases?",
    answer:
      "Smallcases and mutual funds provide pre-packaged investment strategies, but BearTron  goes above and beyond by building customised portfolios that fit your unique goals, time horizons, and risk tolerance. Instead of adopting a one-size-fits-all strategy, we create dynamic, goal-specific investment plans that readily adjust to your evolving needs. In short, your goals are our mandate.",
  },
  {
    question: "Who Designs These Portfolios?",
    answer:
      "Our committed investment team, headed by Karan Shah, a CFA and FRM with over 14 years of experience at prestigious firms like BlackRock, LGT India, and TrustPlutus, creates your portfolios. Supported by a group of professionals, we combine in-depth knowledge of your goals with rigorous analysis. Additionally, our in-house data-driven system helps to maintain your portfolios in line with your objectives.",
  },
  {
    question: "Why Might My Goal Risk Differ from My Overall Risk Profile?",
    answer:
      "Each goal has a unique timeframe and priority. You might be more comfortable taking risks for long-term goals like retirement but prefer a conservative approach for short-term goals like a home down payment. Our goal optimization tool balances these nuances to ensure you’re always investing in a way that feels right for you.",
  },
  {
    question: "How Does BearTron  Support My Financial Journey?",
    answer:
      "Consider us your personal travel advisor; we don't merely provide you with a generic itinerary; instead, we design a unique trip based on your preferences. Your financial well-being is always at the forefront of our dynamic, goal-driven strategies, which change as your life does.",
  },
];

export default function FAQSection() {
  const [openIdx, setOpenIdx] = useState(null);
  const [flyInIdx, setFlyInIdx] = useState(-1);
  const [visible, setVisible] = useState(false);
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
      setFlyInIdx(-1);
      let idx = 0;
      timerRef.current = setInterval(() => {
        setFlyInIdx((prev) => prev + 1);
        idx++;
        if (idx === faqs.length) clearInterval(timerRef.current);
      }, 600);
    } else {
      clearInterval(timerRef.current);
      setFlyInIdx(-1);
    }
    return () => clearInterval(timerRef.current);
  }, [visible]);

  const handleToggle = (idx) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <div className={styles.faqContainer} ref={containerRef}>
      <div className={styles.faqTitle}>
        Have Questions?{" "}
        <span className={styles.highlight}>We’ve got the answers</span>
      </div>
      <div className={styles.faqList}>
        {faqs.map((faq, i) => (
          <div
            key={i}
            className={
              `${styles.faqItem} ${openIdx === i ? styles.open : ""} ` +
              (flyInIdx >= i ? styles.flyIn : styles.flyOut)
            }
          >
            <div className={styles.faqQuestion} onClick={() => handleToggle(i)}>
              {faq.question}
              <span
                style={{ fontSize: "2rem", fontWeight: 700, marginLeft: 18 }}
              >
                {openIdx === i ? "−" : "+"}
              </span>
            </div>
            {openIdx === i && (
              <div className={styles.faqAnswer}>{faq.answer}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
