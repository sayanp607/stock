import React from "react";
import { useNavigate } from "react-router-dom";
import { saveProfileStep } from "./profileApi";
import ProfileProgressBar from "./ProfileProgressBar";
import styles from "./ProfileStep.module.css";

const options = [
  {
    label: "Young Professional",
    value: "young",
    subtitle: "Under 27 years",
    img: "https://tse2.mm.bing.net/th/id/OIP.MwBn5fwdDj0gwnRbw_hP6AHaE8?pid=Api&P=0&h=180",
  },
  {
    label: "Early Career",
    value: "early",
    subtitle: "27 to 36 years",
    img: "https://tse2.mm.bing.net/th/id/OIP.cRQOKPUEoaXW4PLkqsVmLgHaE7?pid=Api&P=0&h=180",
  },
  {
    label: "Mid Career",
    value: "mid",
    subtitle: "37 to 44 years",
    img: "https://tse1.mm.bing.net/th/id/OIP.X0rpP09frGffdqrEu-mGsgHaFw?pid=Api&P=0&h=180",
  },
  {
    label: "Established Professional",
    value: "established",
    subtitle: "45 to 56 years",
    img: "https://tse1.mm.bing.net/th/id/OIP.r238EMf63w6nt7U9K3_0QQHaE7?pid=Api&P=0&h=180",
  },
  {
    label: "Senior Expert",
    value: "senior",
    subtitle: "Above 56 years",
    img: "https://tse4.mm.bing.net/th/id/OIP.mth_-wngC3csC_IFNLxfogHaFZ?pid=Api&P=0&h=180",
  },
];

export default function AgeStep({ uid }) {
  const navigate = useNavigate();
  const [selected, setSelected] = React.useState(null);
  const handleSelect = async (value) => {
    setSelected(value);
    await saveProfileStep(uid, "age_group", value);
    setTimeout(() => navigate("/profile-marital"), 400);
  };
  return (
    <div className={styles.stepContainer}>
      <ProfileProgressBar step={1} />
      <h2 style={{ fontSize: 36, fontWeight: 800, margin: "32px 0 8px 0" }}>
        Tell us about your age group
      </h2>
      <p style={{ fontSize: 18, color: "#444", marginBottom: 32 }}>
        This helps us understand your investment timeline and customize the
        perfect strategy for you.
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
