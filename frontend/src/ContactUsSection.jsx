import React, { useState, useRef, useEffect } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { API_BASE_URL } from "./main";
import styles from "./ContactForm.module.css";

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
    <section className={styles.contactSection}>
      <div
        className={`${styles.contactWrapper} ${
          visible ? styles.flyIn : styles.flyOut
        }`}
        ref={formRef}
      >
        <div className={styles.animationContainer}>
          <DotLottieReact
            src="https://lottie.host/419d3a20-93e5-47c7-ac5f-0d5ea5524d5c/Nve30W1b9E.lottie"
            loop
            autoplay
            className={styles.animation}
          />
        </div>

        <form
          onSubmit={handleSubmit}
          className={`${styles.contactForm} ${
            visible ? styles.flyIn : styles.flyOut
          }`}
        >
          <h2 className={styles.formTitle}>Contact Us</h2>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            required
            className={styles.inputField}
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            required
            className={styles.inputField}
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={form.message}
            onChange={handleChange}
            required
            rows={5}
            className={styles.textareaField}
          />
          {success ? (
            <div className={styles.successContainer}>
              <DotLottieReact
                src="https://lottie.host/8818647d-0d97-471d-8322-59a40d8be82c/H27XYZ52Hx.lottie"
                loop={false}
                autoplay
                className={styles.successAnimation}
              />
              <span className={styles.successText}>{success}</span>
            </div>
          ) : (
            <button
              type="submit"
              disabled={loading}
              className={styles.submitButton}
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          )}
          {error && <div className={styles.errorText}>{error}</div>}
        </form>
      </div>
    </section>
  );
};

export default ContactForm;
