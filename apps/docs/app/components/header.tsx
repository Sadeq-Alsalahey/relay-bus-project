"use client";

import Link from "next/link";
import React from "react";
import { useState, useEffect } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  /* Detect screen size */
  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  return (
    <header style={styles.header}>
      <div style={styles.container}>
        {/* Logo */}
        <div style={styles.logo}>
          <span style={styles.logoPrimary}>Relay</span>
          <span style={styles.logoAccent}>Bus</span>
        </div>

        {/* Desktop Navigation */}
        {!isMobile && (
          <nav>
            <ul style={styles.navList}>
              <li><Link href="/" style={styles.navLink}>Home</Link></li>
              <li><Link href="/features" style={styles.navLink}>Features</Link></li>
              <li><Link href="/about" style={styles.navLink}>About</Link></li>
              <li><Link href="/contact" style={styles.navLink}>Contact</Link></li>
            </ul>
          </nav>
        )}

        {/* Mobile Menu Button */}
        {isMobile && (
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={styles.menuBtn}
            aria-label="Toggle menu"
          >
            ☰
          </button>
        )}
      </div>

      {/* Mobile Menu */}
      {isMobile && menuOpen && (
        <nav style={styles.mobileNav}>
          <Link href="/" style={styles.mobileLink} onClick={() => setMenuOpen(false)}>Home</Link>
          <Link href="/features" style={styles.mobileLink} onClick={() => setMenuOpen(false)}>Features</Link>
          <Link href="/about" style={styles.mobileLink} onClick={() => setMenuOpen(false)}>About</Link>
          <Link href="/contact" style={styles.mobileLink} onClick={() => setMenuOpen(false)}>Contact</Link>
        </nav>
      )}

      {/* Bottom Line */}
      <div style={styles.bottomLine} />
    </header>
  );
}

/* ================== Styles ================== */

const styles: { [key: string]: React.CSSProperties } = {
  header: {
    width: "100%",
    backgroundColor: "#ffffff",
    position: "relative",
    zIndex: 100,
  },
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "1.2rem 2rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },

  /* Logo */
  logo: {
    fontSize: "1.8rem",
    fontWeight: 700,
    cursor: "pointer",
  },
  logoPrimary: {
    color: "#0f172a",
  },
  logoAccent: {
    color: "#10b981",
  },

  /* Desktop Nav */
  navList: {
    listStyle: "none",
    display: "flex",
    gap: "2rem",
    margin: 0,
    padding: 0,
  },
  navLink: {
    textDecoration: "none",
    color: "#0f172a",
    fontSize: "1rem",
    fontWeight: 500,
  },

  /* Mobile Button */
  menuBtn: {
    fontSize: "1.8rem",
    background: "none",
    border: "none",
    cursor: "pointer",
    color: "#0f172a",
  },

  /* Mobile Menu */
  mobileNav: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#ffffff",
    padding: "1rem 2rem",
    animation: "slideDown 0.25s ease",
  },
  mobileLink: {
    padding: "0.8rem 0",
    textDecoration: "none",
    color: "#0f172a",
    fontSize: "1rem",
    fontWeight: 500,
    borderBottom: "1px solid #e5e7eb",
  },

  /* Bottom Line */
  bottomLine: {
    height: "3px",
    width: "100%",
    backgroundColor: "#10b981",
  },
};
