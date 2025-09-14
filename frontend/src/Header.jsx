import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Header.module.css";

const Header = ({ currentUser, onLogout, onRegisterClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const closeMenu = () => setIsMenuOpen(false);

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      closeMenu();
    }
  };

  const handleHomeClick = () => {
    const uid = localStorage.getItem("uid");
    if (uid) navigate("/home");
    else {
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3500);
    }
    closeMenu();
  };

  const handleLinkClick = (section) => {
    if (section === "home") handleHomeClick();
    else scrollToSection(section);
  };

  return (
    <>
      <header className={styles.header}>
        <div className={styles.logo} onClick={() => scrollToSection("top")}>
  <img
    src="/logo.jpg"  // replace with your logo path or URL
    alt="BearTron Logo"
    className={styles.logoImg}
  />
  <span>BearTron</span>
</div>


        <nav className={`${styles.nav} ${isMenuOpen ? styles.active : ""}`}>
          <button className={styles.navLink} onClick={() => handleLinkClick("home")}>
            Home
          </button>
          <button className={styles.navLink} onClick={() => handleLinkClick("journey")}>
            Journey
          </button>
          <button className={styles.navLink} onClick={() => handleLinkClick("faq")}>
            FAQ
          </button>
          <button className={styles.navLink} onClick={() => handleLinkClick("contact")}>
            Contact
          </button>

          {!currentUser && (
            <button className={styles.navBtn} onClick={onRegisterClick}>
              Register
            </button>
          )}
          {currentUser && (
            <button className={styles.navBtn} onClick={onLogout}>
              Logout
            </button>
          )}
        </nav>

        <div className={styles.hamburger} onClick={toggleMenu}>
          <div className={styles.bar}></div>
          <div className={styles.bar}></div>
          <div className={styles.bar}></div>
        </div>

        {/* Overlay */}
        {isMenuOpen && <div className={styles.overlay} onClick={closeMenu}></div>}
      </header>

      {showAlert && (
        <div className={styles.alert}>
          Please register first to access the Home page!
        </div>
      )}
    </>
  );
};

export default Header;
