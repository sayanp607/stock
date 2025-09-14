import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../main";
import styles from "./Dashboard.module.css";

// investorTypes, scoreMaps, getInvestorType remain unchanged here...

// Investor type metadata for the result screen
const investorTypes = [
  {
    label: "Conservative",
    desc: "You prefer stability and prioritize protecting your investments. You avoid risk and focus on steady growth.",
    metrics: [
      { name: "Capital Formation", level: "Low" },
      { name: "Returns", level: "Stable" },
      { name: "Volatility", level: "Low" },
    ],
  },
  {
    label: "Moderately Conservative",
    desc: "You seek a balance between growth and safety, willing to take some risk for moderate returns.",
    metrics: [
      { name: "Capital Formation", level: "Moderate" },
      { name: "Returns", level: "Moderate" },
      { name: "Volatility", level: "Low–Moderate" },
    ],
  },
  {
    label: "Moderate",
    desc: "You are comfortable with some market ups and downs, aiming for balanced growth.",
    metrics: [
      { name: "Capital Formation", level: "Balanced" },
      { name: "Returns", level: "Balanced" },
      { name: "Volatility", level: "Moderate" },
    ],
  },
  {
    label: "Moderately Aggressive",
    desc: "You pursue higher returns and accept increased risk, but still value some stability.",
    metrics: [
      { name: "Capital Formation", level: "High" },
      { name: "Returns", level: "High" },
      { name: "Volatility", level: "High" },
    ],
  },
  {
    label: "Aggressive",
    desc: "You prioritize high growth and are comfortable with significant market ups and downs. You embrace risk to maximize returns and have the patience to stay invested through volatility.",
    metrics: [
      { name: "Capital Formation", level: "Very High" },
      { name: "Returns", level: "Exponentially High" },
      { name: "Volatility", level: "Very High" },
    ],
  },
];

// Map each answer to a 0..4 aggression score (0=most conservative, 4=most aggressive)
const scoreMaps = {
  age_group: { senior: 0, established: 1, mid: 2, early: 3, young: 4 },
  marital_status: {
    growing_family: 0,
    small_family: 1,
    newly_married: 3,
    single_supporting: 3,
    single_independent: 4,
  },
  investment_goal: {
    family_security: 0,
    regular_income: 1,
    lifestyle_maintenance: 2,
    long_term_wealth: 3,
    aggressive_growth: 4,
  },
  market_comfort: {
    safety_first: 0,
    steady_journey: 1,
    balanced_growth: 2,
    growth_focused: 3,
    high_energy_growth: 4,
  },
  market_reaction: {
    exit_completely: 0,
    reduce_partially: 1,
    stay_the_course: 2,
    cautiously_invest_more: 3,
    seize_opportunity: 4,
  },
};

// Compute investor type index and average score safely
function getInvestorType(profile) {
  if (!profile) return { typeIdx: 2, avg: 2 }; // default Moderate

  const keys = [
    "age_group",
    "marital_status",
    "investment_goal",
    "market_comfort",
    "market_reaction",
  ];

  const scores = keys.map((k) => {
    const map = scoreMaps[k] || {};
    const v = profile?.[k];
    return typeof map[v] === "number" ? map[v] : 2;
  });

  const avg = scores.reduce((a, b) => a + b, 0) / scores.length;

  let typeIdx = 0;
  if (avg >= 3.2) typeIdx = 4;
  else if (avg >= 2.4) typeIdx = 3;
  else if (avg >= 1.6) typeIdx = 2;
  else if (avg >= 0.8) typeIdx = 1;
  else typeIdx = 0;

  return { typeIdx, avg };
}

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const [typeIdx, setTypeIdx] = useState(2);
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const uid = window.localStorage.getItem("uid");
    if (!uid) {
      setLoading(false);
      setProfile(null);
      return;
    }

    fetch(`${API_BASE_URL}/api/profile/${uid}`)
      .then(async (res) => {
        if (!res.ok) {
          const t = await res.text();
          throw new Error(t || "Failed to fetch profile");
        }
        return res.json();
      })
      .then((data) => {
        const p = data?.profile || null;
        setProfile(p);
        const { typeIdx } = getInvestorType(p);
        setTypeIdx(typeIdx);
      })
      .catch((err) => {
        console.error("Dashboard: Error fetching profile:", err);
        setProfile(null);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      setShowConfirm(true);
      window.history.pushState(null, "", window.location.href);
    };
    window.history.pushState(null, "", window.location.href);
    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  const confirmNavigation = (confirm) => {
    if (confirm) {
      setShowConfirm(false);
      window.removeEventListener("popstate", () => {});
      navigate("/profile-age");
    } else {
      setShowConfirm(false);
    }
  };

  if (loading) {
    return <div className={styles.loading}>Loading your personalized investment profile...</div>;
  }

  if (!profile || !profile.age_group) {
    return <div className={styles.loading}>No profile data found. Please complete your profile steps first.</div>;
  }

  const type = investorTypes[typeIdx];

  return (
    <div className={styles.dashboardContainer}>
      <h1 className={styles.mainTitle}>
        Congratulations! You're a <span className={styles.highlight}>{type.label}</span> Investor
      </h1>
      <div className={styles.subtitle}>
        We've analyzed your responses and created your personalized investment profile
      </div>

      <div className={styles.scoreLabels}>
        <span>Conservative</span>
        <span>Moderately Conservative</span>
        <span>Moderate</span>
        <span>Moderately Aggressive</span>
        <span>Aggressive</span>
      </div>

      <div className={styles.progressBar}>
        <div
          className={styles.progressFill}
          style={{ width: `${((typeIdx + 1) / 5) * 100}%` }}
        />
        {[0, 1, 2, 3, 4].map((i) => (
          <div key={i} className={styles.progressMarker} style={{ left: `${(i / 4) * 100}%` }} />
        ))}
      </div>

      <div className={styles.resultBox}>
        <h2 className={styles.resultTitle}>What This Means For You</h2>
        <div className={styles.resultDesc}>{type.desc}</div>
        <div className={styles.metricsContainer}>
          {type.metrics.map((m, idx) => (
            <div key={m.name} className={styles.metricCard}>
              <div className={styles.metricIcon}>{idx === 0 ? "📊" : idx === 1 ? "💰" : "🛡️"}</div>
              <div className={styles.metricName}>{m.name}</div>
              <div className={styles.metricLevel}>Level: {m.level}</div>
            </div>
          ))}
        </div>
      </div>

      {showConfirm && (
        <div className={styles.modalBackdrop}>
          <div className={styles.modalContent}>
            <h2>Confirm Navigation</h2>
            <p>Do you want to build your profile from scratch again?</p>
            <div className={styles.modalButtons}>
              <button className={styles.confirmBtn} onClick={() => confirmNavigation(true)}>
                Yes
              </button>
              <button className={styles.cancelBtn} onClick={() => confirmNavigation(false)}>
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
