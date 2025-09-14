import React from "react";
import { useNavigate } from "react-router-dom";
import { saveProfileStep } from "./profileApi";
import ProfileProgressBar from "./ProfileProgressBar";
import styles from "./ProfileStep.module.css";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const options = [
  {
    label: "Seize the Opportunity",
    value: "seize_opportunity",
    subtitle: "I see this as a great chance to invest more at lower prices",
    img: "https://tse1.mm.bing.net/th/id/OIP.JRGSYSezlR9xo-Qj5qgvLwHaEK?pid=Api&P=0&h=180",
  },
  {
    label: "Cautiously Invest More",
    value: "cautiously_invest_more",
    subtitle: "I would gradually add more to my investments",
    img: "https://tse1.mm.bing.net/th/id/OIP.i2eZJ9ZGodvO2CHbn0Ch4gHaFN?pid=Api&P=0&h=180",
  },
  {
    label: "Stay the Course",
    value: "stay_the_course",
    subtitle: "I would maintain my current investment strategy",
    img: "https://tse4.mm.bing.net/th/id/OIP.KotZtp1557H8rOpl7tnxKwHaEK?pid=Api&P=0&h=180",
  },
  {
    label: "Reduce Partially",
    value: "reduce_partially",
    subtitle: "I would reduce my exposure somewhat",
    img: "https://tse4.mm.bing.net/th/id/OIP.vvZM57LAhvQcDJE3Mn7uvgHaEc?pid=Api&P=0&h=180",
  },
  {
    label: "Exit Completely",
    value: "exit_completely",
    subtitle: "I would prefer to exit all positions",
    img: "https://tse2.mm.bing.net/th/id/OIP.dwJmqfcFqjTqVa_TS8zGWAHaE-?pid=Api&P=0&h=180",
  },
];

export default function MarketStep({ uid }) {
  const navigate = useNavigate();
  const [selected, setSelected] = React.useState(null);
  const [showAnimation, setShowAnimation] = React.useState(false);

  const handleSelect = (value) => {
    setSelected(value);
    setShowAnimation(true);

    saveProfileStep(uid, "market_reaction", value)
      .catch((err) => {
        console.error("Error saving profile step:", err);
      });

    setTimeout(() => {
      navigate("/dashboard");
    }, 3000);
  };

  return (
    <div className={styles.stepContainer}>
      {/* Apply blur when animation is visible */}
      <div style={{ filter: showAnimation ? "blur(8px)" : "none", transition: "filter 0.3s ease" }}>
        <ProfileProgressBar step={5} />
        <h2
          style={{
            fontSize: 36,
            fontWeight: 800,
            margin: "32px 0 8px 0",
          }}
        >
          How would you react to a market dip?
        </h2>
        <p
          style={{
            fontSize: 18,
            color: "#444",
            marginBottom: 32,
          }}
        >
          If your investments dropped 20% in value over a month, what would be
          your most likely response?
        </p>
        <div className={styles.optionsGrid}>
          {options.map((opt) => (
            <div
              key={opt.value}
              className={
                styles.optionCard +
                (selected === opt.value ? " " + styles.selected : "")
              }
              onClick={() => handleSelect(opt.value)}
            >
              <img
                src={opt.img}
                alt=""
                style={{
                  width: 120,
                  height: 120,
                  borderRadius: 16,
                  objectFit: "cover",
                }}
              />
              <div className={styles.optionLabel}>{opt.label}</div>
              <div className={styles.optionSubtitle}>{opt.subtitle}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Animation Overlay */}
      {showAnimation && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "rgba(0, 0, 0, 0.4)", // Dimmed dark overlay
          backdropFilter: "blur(4px)", // Adds extra blur effect
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 9999,
        }}>
          <div style={{
            background: "#fff",
            padding: 20,
            borderRadius: 20,
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
          }}>
            <DotLottieReact
              src="https://lottie.host/7be83bd9-60e9-4472-8d92-585a30e286f1/nptiwnx9tG.lottie"
              loop
              autoplay
              style={{ width: "300px", height: "300px" }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
