import React, { useRef, useState } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const testimonials = [
  {
    name: "Priya Sharma",
    role: "Young Professional",
    comment:
      "This platform made investing so easy and fun! The personalized dashboard really helped me understand my risk profile.",
    img: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Rahul Verma",
    role: "Mid Career",
    comment:
      "I love the clean UI and the step-by-step guidance. I feel much more confident about my financial future.",
    img: "https://randomuser.me/api/portraits/men/46.jpg",
  },
  {
    name: "Anjali Patel",
    role: "Established Professional",
    comment:
      "The risk profiling is spot on! The journey was smooth and the results were insightful.",
    img: "https://randomuser.me/api/portraits/women/65.jpg",
  },
  {
    name: "Siddharth Rao",
    role: "Senior Expert",
    comment:
      "Finally, a platform that understands my needs. The dashboard is visually stunning and easy to use.",
    img: "https://randomuser.me/api/portraits/men/68.jpg",
  },
];

export default function TestimonialSection() {
  const scrollRef = useRef(null);
  const [scrollPos, setScrollPos] = useState(0);

  const scrollBy = (offset) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: offset, behavior: "smooth" });
      setScrollPos(scrollRef.current.scrollLeft + offset);
    }
  };

  return (
    <section
      style={{
        background: "#000",
        padding: "64px 0",
        width: "100%",
        minHeight: 420,
        position: "relative",
      }}
    >
      <h2
        style={{
          color: "#fff",
          textAlign: "center",
          fontWeight: 800,
          fontSize: "2.5rem",
          marginBottom: 38,
          letterSpacing: 1,
        }}
      >
        What Our Users Say
      </h2>

      {/* Lottie Animation at the top center */}
      <div style={{ textAlign: "center", marginBottom: 32 }}>
        <DotLottieReact
          src="https://lottie.host/480cd8dd-55e1-4c13-81c3-5f3d8c74994c/it3QkqDRiH.lottie"
          loop
          autoplay
          style={{ width: 300, height: 300, margin: "0 auto" }}
        />
      </div>

      <div style={{ position: "relative", maxWidth: 1200, margin: "0 auto" }}>
        {/* Left Arrow */}
        <button
          style={{
            position: "absolute",
            left: -60,
            top: "50%",
            transform: "translateY(-50%)",
            background: "#222",
            color: "#ffd700",
            border: "none",
            borderRadius: "50%",
            width: 48,
            height: 48,
            fontSize: 28,
            boxShadow: "0 2px 8px rgba(0,0,0,0.18)",
            cursor: "pointer",
            zIndex: 10,
            opacity: 0.85,
          }}
          onClick={() => scrollBy(-340)}
          aria-label="Scroll left"
        >
          &#8592;
        </button>
        {/* Right Arrow */}
        <button
          style={{
            position: "absolute",
            right: -60,
            top: "50%",
            transform: "translateY(-50%)",
            background: "#222",
            color: "#ffd700",
            border: "none",
            borderRadius: "50%",
            width: 48,
            height: 48,
            fontSize: 28,
            boxShadow: "0 2px 8px rgba(0,0,0,0.18)",
            cursor: "pointer",
            zIndex: 10,
            opacity: 0.85,
          }}
          onClick={() => scrollBy(340)}
          aria-label="Scroll right"
        >
          &#8594;
        </button>

        <div
          ref={scrollRef}
          style={{
            display: "flex",
            gap: 38,
            overflowX: "auto",
            scrollBehavior: "smooth",
            paddingBottom: 8,
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            maxWidth: 1200,
            margin: "0 auto",
          }}
          className="hide-scrollbar"
        >
          {testimonials.map((t) => (
            <div
              key={t.name}
              style={{
                background: "linear-gradient(135deg, #232526 0%, #414345 100%)",
                borderRadius: 22,
                boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
                padding: "38px 32px 32px 32px",
                minWidth: 280,
                maxWidth: 320,
                color: "#fff",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginBottom: 24,
                position: "relative",
                border: "1.5px solid #222",
              }}
            >
              <img
                src={t.img}
                alt={t.name}
                style={{
                  width: 72,
                  height: 72,
                  borderRadius: "50%",
                  objectFit: "cover",
                  border: "3px solid #444",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.18)",
                  marginBottom: 18,
                }}
              />
              <div
                style={{
                  fontWeight: 700,
                  fontSize: "1.18rem",
                  marginBottom: 4,
                  color: "#ffd700",
                  textShadow: "0 2px 8px #222",
                }}
              >
                {t.name}
              </div>
              <div
                style={{
                  fontSize: "1rem",
                  color: "#b3b3b3",
                  marginBottom: 14,
                  fontWeight: 500,
                }}
              >
                {t.role}
              </div>
              <div
                style={{
                  fontSize: "1.08rem",
                  color: "#fff",
                  fontStyle: "italic",
                  textAlign: "center",
                  lineHeight: 1.6,
                  marginBottom: 8,
                  letterSpacing: 0.2,
                }}
              >
                "{t.comment}"
              </div>
              
            </div>
          ))}
        </div>

        {/* Hide scrollbar */}
        <style>{`
          .hide-scrollbar::-webkit-scrollbar { display: none; }
        `}</style>
      </div>
    </section>
  );
}
