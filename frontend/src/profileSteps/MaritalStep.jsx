import React from "react";
import { useNavigate } from "react-router-dom";
import { saveProfileStep } from "./profileApi";
import ProfileProgressBar from "./ProfileProgressBar";
import styles from "./ProfileStep.module.css";

const options = [
  {
    label: "Single",
    value: "single_independent",
    subtitle: "Living independently",
    img: "https://images.pexels.com/photos/1138903/pexels-photo-1138903.jpeg?auto=compress&w=400&h=300&fit=crop",
  },
  {
    label: "Single",
    value: "single_supporting",
    subtitle: "Supporting family members",
    img: "https://images.pexels.com/photos/1648376/pexels-photo-1648376.jpeg?auto=compress&w=400&h=300&fit=crop",
  },
  {
    label: "Newly Married",
    value: "newly_married",
    subtitle: "Just starting together",
    img: "https://tse2.mm.bing.net/th/id/OIP.QZ2Dt_lkw5KVKBzRsES6UAHaEo?pid=Api&P=0&h=180",
  },
  {
    label: "Small Family",
    value: "small_family",
    subtitle: "Married with one child",
    img: "https://tse4.mm.bing.net/th/id/OIP.SumMdT9UF4P5WvVR0_OLowHaE7?pid=Api&P=0&h=180",
  },
  {
    label: "Growing Family",
    value: "growing_family",
    subtitle: "Married with multiple children",
    img: "https://images.pexels.com/photos/1682497/pexels-photo-1682497.jpeg?auto=compress&w=400&h=300&fit=crop",
  },
];

export default function MaritalStep({ uid }) {
  const navigate = useNavigate();
  const [selected, setSelected] = React.useState(null);
  const handleSelect = async (value) => {
    setSelected(value);
    await saveProfileStep(uid, "marital_status", value);
    setTimeout(() => navigate("/profile-invest"), 400);
  };
  return (
    <div className={styles.stepContainer}>
      <ProfileProgressBar step={2} />
      <h2
        style={{
          fontSize: 36,
          fontWeight: 800,
          margin: "32px 0 8px 0",
        }}
      >
        Tell us about your family
      </h2>
      <p
        style={{
          fontSize: 18,
          color: "#444",
          marginBottom: 32,
        }}
      >
        This helps us tailor investment strategies that align with your family
        responsibilities and goals.
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
