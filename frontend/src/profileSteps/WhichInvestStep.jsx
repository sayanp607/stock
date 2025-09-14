import React from "react";
import { useNavigate } from "react-router-dom";
import { saveProfileStep } from "./profileApi";
import ProfileProgressBar from "./ProfileProgressBar";
import styles from "./ProfileStep.module.css";

const options = [
  {
    label: "High-Energy Growth",
    value: "high_energy_growth",
    subtitle:
      "I'm excited about big market swings if it means higher potential returns",
    img: "https://tse3.mm.bing.net/th/id/OIP.bu9hzFNortQtc2VL5I3MpwHaE8?pid=Api&P=0&h=180",
  },
  {
    label: "Growth-Focused",
    value: "growth_focused",
    subtitle: "I'm comfortable with calculated risks for better rewards",
    img: "https://tse1.mm.bing.net/th/id/OIP.Fx51Bth9Fy7nltZwkTwi6wHaE8?pid=Api&P=0&h=180",
  },
  {
    label: "Balanced Growth",
    value: "balanced_growth",
    subtitle: "I want consistent progress with moderate fluctuations",
    img: "https://tse2.mm.bing.net/th/id/OIP.paP67yA4S8-h8IkTfaNhvQHaFj?pid=Api&P=0&h=180",
  },
  {
    label: "Steady Journey",
    value: "steady_journey",
    subtitle: "I prefer stable, predictable investment progress",
    img: "https://tse1.mm.bing.net/th/id/OIP.CZvNDgTcO9J1k_wkzQrqxQHaEK?pid=Api&P=0&h=180",
  },
  {
    label: "Safety First",
    value: "safety_first",
    subtitle: "I prioritize protecting my investment, even with slower growth",
    img: "https://tse4.mm.bing.net/th/id/OIP.4M8hYC3q1ZTPegzljNHqDwHaFH?pid=Api&P=0&h=180",
  },
];

export default function WhichInvestStep({ uid }) {
  const navigate = useNavigate();
  const [selected, setSelected] = React.useState(null);
  const handleSelect = async (value) => {
    setSelected(value);
    await saveProfileStep(uid, "market_comfort", value);
    setTimeout(() => navigate("/profile-market"), 400);
  };
  return (
    <div className={styles.stepContainer}>
      <ProfileProgressBar step={4} />
      <h2
        style={{
          fontSize: 36,
          fontWeight: 800,
          margin: "32px 0 8px 0",
        }}
      >
        What's your comfort level with market movements?
      </h2>
      <p
        style={{
          fontSize: 18,
          color: "#444",
          marginBottom: 32,
        }}
      >
        Help us understand how you'd like your investments to behave over time.
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
  );
}
