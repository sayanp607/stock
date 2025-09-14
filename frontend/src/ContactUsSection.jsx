import React, { useState, useRef, useEffect } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { API_BASE_URL } from "./main";

const ContactForm = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [visible, setVisible] = useState(false);
  const formRef = useRef(null);

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );
    if (formRef.current) observer.observe(formRef.current);
    return () => {
      if (formRef.current) observer.unobserve(formRef.current);
    };
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");
    setError("");
    try {
      const res = await fetch(`${API_BASE_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        setSuccess("Message sent successfully!");
        setForm({ name: "", email: "", message: "" });
      } else {
        setError(data.error || "Failed to send message.");
      }
    } catch (err) {
      setError("Failed to send message.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      style={{
        background: "linear-gradient(#c6e6a6 100%)",
        padding: "64px 0",
        width: "100%",
        minHeight: 420,
        marginTop:50,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        ref={formRef}
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: "60px",
          boxSizing: "border-box",  // Added to ensure consistent sizing
        }}
      >
        {/* Animation on the Left Side */}
        <div
          style={{
            maxWidth: 300,
            width: "100%",
            boxSizing: "border-box",
            animation: visible
              ? "flyIn 1s ease-out forwards"
              : "flyOut 0.7s ease-in forwards",
            opacity: visible ? 1 : 0,
          }}
        >
          <DotLottieReact
            src="https://lottie.host/419d3a20-93e5-47c7-ac5f-0d5ea5524d5c/Nve30W1b9E.lottie"
            loop
            autoplay
            style={{
              width: "100%",
              maxWidth: 300,
              height: 300,
              margin: "0 auto",
              boxSizing: "border-box",
            }}
          />
        </div>

        {/* Contact Form */}
        <form
          onSubmit={handleSubmit}
          style={{
            background: "#e07039ff",
            borderRadius: 18,
            boxShadow: "0 8px 30px rgba(0,0,0,0.10)",
            padding: "38px 32px",
            maxWidth: 480,
            width: 480, // Set fixed width to avoid layout jumps
            boxSizing: "border-box", // Ensure consistent sizing
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            position: "relative",
            zIndex: 2,
            animation: visible
              ? "flyIn 1s ease-out forwards"
              : "flyOut 0.7s ease-in forwards",
            opacity: visible ? 1 : 0,
          }}
        >
          <h2
            style={{
              fontWeight: 800,
              fontSize: "2rem",
              color: "#000000ff",
              marginBottom: 18,
              letterSpacing: 1,
            }}
          >
            Contact Us
          </h2>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "12px 16px",
              marginBottom: 16,
              borderRadius: 8,
              border: "1.5px solid #dbeafe",
              fontSize: "1.08rem",
              background: "#f6f8ff",
              boxSizing: "border-box",
            }}
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "12px 16px",
              marginBottom: 16,
              borderRadius: 8,
              border: "1.5px solid #dbeafe",
              fontSize: "1.08rem",
              background: "#f6f8ff",
              boxSizing: "border-box",
            }}
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={form.message}
            onChange={handleChange}
            required
            rows={5}
            style={{
              width: "100%",
              padding: "12px 16px",
              marginBottom: 18,
              borderRadius: 8,
              border: "1.5px solid #dbeafe",
              fontSize: "1.08rem",
              background: "#f6f8ff",
              resize: "none",
              boxSizing: "border-box",
            }}
          />
          {success ? (
            <div
              style={{
                marginTop: 8,
                fontWeight: 600,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "100%",
                boxSizing: "border-box",
              }}
            >
              <DotLottieReact
                src="https://lottie.host/8818647d-0d97-471d-8322-59a40d8be82c/H27XYZ52Hx.lottie"
                loop={false}
                autoplay
                style={{
                  width: "100%",
                  maxWidth: 250,
                  height: 100,
                  margin: "0 auto",
                  boxSizing: "border-box",
                }}
              />
              <span
                style={{ color: "#22c55e", fontSize: "1.15rem", marginTop: 8 }}
              >
                {success}
              </span>
            </div>
          ) : (
            <button
              type="submit"
              disabled={loading}
              style={{
                background: "#000",
                color: "#fff",
                fontWeight: 700,
                fontSize: "1.15rem",
                border: "none",
                borderRadius: 10,
                padding: "14px 32px",
                cursor: loading ? "not-allowed" : "pointer",
                boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                transition: "background 0.2s",
                marginTop: 8,
                width: "100%",
                boxSizing: "border-box",
              }}
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          )}
          {error && (
            <div style={{ color: "#ef4444", marginTop: 16, fontWeight: 600 }}>
              {error}
            </div>
          )}
        </form>
      </div>

      <style>{`
        @keyframes flyIn {
          from { transform: translateY(50px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes flyOut {
          from { transform: translateY(0); opacity: 1; }
          to { transform: translateY(50px); opacity: 0; }
        }
      `}</style>
    </section>
  );
};

export default ContactForm;
