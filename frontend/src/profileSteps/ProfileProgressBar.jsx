import React from "react";
export default function ProfileProgressBar({ step }) {
  const percent = step * 20;
  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ fontWeight: 700, fontSize: 24 }}>
        Let's Understand You Better
      </div>
      <div
        style={{
          height: 8,
          background: "#f0f2f5",
          borderRadius: 4,
          margin: "12px 0",
          width: "100%",
        }}
      >
        <div
          style={{
            width: `${percent}%`,
            height: "100%",
            background: "#2d7ff9",
            borderRadius: 4,
            transition: "width 0.4s",
          }}
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 16,
        }}
      >
        <span>Question {step} of 5</span>
        <span>{percent}% complete</span>
      </div>
    </div>
  );
}
