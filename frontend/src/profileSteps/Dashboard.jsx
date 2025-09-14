import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../main";

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

  // Intercept back navigation
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
      navigate("/profile-age"); // Redirect user if confirmed
    } else {
      setShowConfirm(false);
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: 80, fontSize: "1.25rem" }}>
        Loading your personalized investment profile...
      </div>
    );
  }

  if (!profile || !profile.age_group) {
    return (
      <div style={{ textAlign: "center", marginTop: 80, fontSize: "1.25rem" }}>
        No profile data found. Please complete your profile steps first.
      </div>
    );
  }

  const type = investorTypes[typeIdx];

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "32px 16px", position: "relative" }}>
      <h1 style={{ textAlign: "center", fontWeight: 800, fontSize: "2.6rem" }}>
        Congratulations! You're a <span style={{ color: "#ff4d4f" }}>{type.label}</span> Investor
      </h1>
      <div style={{ textAlign: "center", marginBottom: 18, fontSize: "1.1rem" }}>
        We've analyzed your responses and created your personalized investment profile
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 600, margin: "18px 6px 6px" }}>
        <span>Conservative</span>
        <span>Moderately Conservative</span>
        <span>Moderate</span>
        <span>Moderately Aggressive</span>
        <span>Aggressive</span>
      </div>

      <div style={{ position: "relative", height: 16, borderRadius: 10, background: "#eef1f4" }}>
        <div
          style={{
            position: "absolute",
            inset: 0,
            width: `${((typeIdx + 1) / 5) * 100}%`,
            borderRadius: 10,
            background: "linear-gradient(90deg, #4ecb71 0%, #b6e388 20%, #ffc94d 40%, #ff9f43 60%, #ff4d4f 100%)",
            transition: "width 600ms cubic-bezier(.4,0,.2,1)",
          }}
        />
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${(i / 4) * 100}%`,
              top: -6,
              width: 18,
              height: 18,
              borderRadius: "50%",
              background: "#fff",
              border: "3px solid #fff",
              boxShadow: "0 0 0 2px rgba(0,0,0,0.12)",
              transform: "translateX(-50%)",
              zIndex: 2,
            }}
          />
        ))}
      </div>

      <div style={{ background: "#fff", borderRadius: 18, boxShadow: "0 8px 30px rgba(0,0,0,0.06)", marginTop: 28, padding: "28px 22px", textAlign: "center" }}>
        <h2 style={{ fontWeight: 700, fontSize: "1.9rem", marginBottom: 16 }}>What This Means For You</h2>
        <div style={{ fontSize: "1.1rem", marginBottom: 26, lineHeight: 1.6 }}>{type.desc}</div>

        <div style={{ display: "flex", justifyContent: "center", gap: 24, flexWrap: "wrap" }}>
          {type.metrics.map((m, idx) => (
            <div key={m.name} style={{ background: "#f6ffed", borderRadius: 14, padding: "20px 26px", minWidth: 220, textAlign: "center", boxShadow: "0 2px 10px rgba(0,0,0,0.04)" }}>
              <div style={{ fontSize: "2rem", marginBottom: 6 }}>{idx === 0 ? "📊" : idx === 1 ? "💰" : "🛡️"}</div>
              <div style={{ fontWeight: 700, fontSize: "1.1rem" }}>{m.name}</div>
              <div style={{ marginTop: 6, color: "#1a7f37" }}>Level: {m.level}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "rgba(0,0,0,0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1000,
        }}>
          <div style={{
            background: "#fff",
            padding: "24px 32px",
            borderRadius: "12px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
            maxWidth: 400,
            textAlign: "center",
          }}>
            <h2 style={{ marginBottom: 16, fontSize: "1.5rem", fontWeight: 700 }}>Confirm Navigation</h2>
            <p style={{ marginBottom: 24 }}>Do you want to build your profile from scratch again?</p>
            <div style={{ display: "flex", justifyContent: "center", gap: "12px" }}>
              <button
                onClick={() => confirmNavigation(true)}
                style={{
                  padding: "10px 20px",
                  backgroundColor: "#ff4d4f",
                  color: "#fff",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: 600,
                }}
              >
                Yes
              </button>
              <button
                onClick={() => confirmNavigation(false)}
                style={{
                  padding: "10px 20px",
                  backgroundColor: "#f0f0f0",
                  color: "#333",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: 600,
                }}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
