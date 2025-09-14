import React, { useState, useEffect, useRef } from "react";
import styles from "./FAQSection.module.css";

const faqs = [
  {
    question: "Why Choose BearTron Over Mutual Funds or Smallcases?",
    answer:
      "Unlike Mutual Funds or Smallcases, BearTron gives beginners transparent, AI-driven and personalized stock insights with full control of their investments."
  },
  {
    question: "Who Designs These Portfolios?",
    answer:
      "Our portfolios are crafted using SEBI-registered analysts’ research.AI predictions personalize them to each user’s goals and risk profile.This fusion of human expertise and technology ensures smarter investing.",
  },
  {
    question: "Why Might My Goal Risk Differ from My Overall Risk Profile?",
    answer:
      "Your overall risk profile reflects your general ability to take risk (age, income, financial situation).But each financial goal (like buying a house vs. short-term trading) may need a different level of risk.That’s why your goal-specific risk can differ from your overall profile.",
  },
  {
    question: "How Does BearTron Support My Financial Journey?",
    answer:
      "BearTron creates personalized portfolios aligned with your goals and risk appetite.It combines SEBI-registered analysts’ expertise with AI insights for smarter decisions.With continuous monitoring and timely alerts, it guides you at every step of your investing journey.",
  },
];

export default function FAQSection() {
  const [openIdx, setOpenIdx] = useState(null);
  const [flyInIdx, setFlyInIdx] = useState(-1);
  const [visible, setVisible] = useState(false);
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
        Have Questions? <span className={styles.highlight}>We’ve got the answers</span>
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
              <span className={styles.faqToggle}>
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
