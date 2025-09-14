import React from "react";
import { useNavigate } from "react-router-dom";
import { saveProfileStep } from "./profileApi";
import ProfileProgressBar from "./ProfileProgressBar";
import styles from "./ProfileStep.module.css";

const options = [
  {
    label: "Aggressive Growth",
    value: "aggressive_growth",
    subtitle: "Maximize returns with high-growth investments",
    img: "https://tse1.mm.bing.net/th/id/OIP.NwGz3m5QAGuDw_iMxRocLQHaEL?pid=Api&P=0&h=180",
  },
  {
    label: "Build Long-term Wealth",
    value: "long_term_wealth",
    subtitle: "Steady growth for future security",
    img: "https://tse2.mm.bing.net/th/id/OIP.N7TnJ6AhinSBw5gTGEIQGwHaEJ?pid=Api&P=0&h=180",
  },
  {
    label: "Lifestyle Maintenance",
    value: "lifestyle_maintenance",
    subtitle: "Preserve and enhance your quality of life",
    img: "https://tse4.mm.bing.net/th/id/OIP.5hkXawFd6--5yN5ayxLXlAHaDt?pid=Api&P=0&h=180",
  },
  {
    label: "Regular Income",
    value: "regular_income",
    subtitle: "Create steady cash flow streams",
    img: "https://tse1.mm.bing.net/th/id/OIP.9qao6Uy1qJrErJ4NPzcFpgHaD4?pid=Api&P=0&h=180",
  },
  {
    label: "Family Security",
    value: "family_security",
    subtitle: "Preserve and protect family wealth",
    img:"https://tse4.mm.bing.net/th/id/OIP.kFJ-Tm_f0k8fqRBtHyed-QHaF2?pid=Api&P=0&h=180",
  },
];

export default function InvestStep({ uid }) {
  const navigate = useNavigate();
  const [selected, setSelected] = React.useState(null);
  const handleSelect = async (value) => {
    setSelected(value);
    await saveProfileStep(uid, "investment_goal", value);
    setTimeout(() => navigate("/profile-which-invest"), 400);
  };
  return (
    <div className={styles.stepContainer}>
      <ProfileProgressBar step={3} />
      <h2
        style={{
          fontSize: 36,
          fontWeight: 800,
          margin: "32px 0 8px 0",
        }}
      >
        What's your investment motivation?
      </h2>
      <p
        style={{
          fontSize: 18,
          color: "#444",
          marginBottom: 32,
        }}
      >
        Understanding your goals helps us create the perfect investment strategy
        for you.
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
