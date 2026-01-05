"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { useState } from "react";

export default function Hero() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  /* Go to login page */
  const handleFleetClick = () => {
    setLoading(true);
    setTimeout(() => {
      router.push("/login");
    }, 300);
  };

  /* Scroll to ChooseSection */
  const handleLearnMoreClick = () => {
    const section = document.getElementById("ChooseSection");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section style={styles.hero}>
      {/* Background Image */}
      <Image
        src="/RELAY BUS-13.jpg"
        alt="Relay Bus Landing"
        fill
        priority
        style={{ objectFit: "cover" }}
      />

      {/* Overlay */}
      <div style={styles.overlay} />

      {/* Content */}
      <div style={styles.content}>
        <h1 style={styles.title}>
          Smart Transportation <br />
          Made Simple
        </h1>

        <p style={styles.subtitle}>
          Experience the future of bus booking with our comprehensive platform
          designed for modern travelers.
        </p>

        <div style={styles.actions}>
          {/* Fleet Management */}
          <button
            style={{
              ...styles.primaryBtn,
              ...(loading ? styles.primaryBtnLoading : {}),
            }}
            onClick={handleFleetClick}
            disabled={loading}
          >
            {loading ? "Redirecting..." : "Fleet Management"}
          </button>

          {/* Learn More */}
          <button
            style={styles.secondaryBtn}
            onClick={handleLearnMoreClick}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "translateY(-2px)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.transform = "translateY(0)")
            }
          >
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
}

/* ================== Styles ================== */

const styles: { [key: string]: React.CSSProperties } = {
  hero: {
    position: "relative",
    width: "100%",
    height: "calc(100vh - 80px)",
    display: "flex",
    alignItems: "center",
    overflow: "hidden",
  },
  overlay: {
    position: "absolute",
    inset: 0,
    background:
      "linear-gradient(90deg, rgba(6,78,59,0.85) 0%, rgba(6,78,59,0.65) 40%, rgba(6,78,59,0.3) 100%)",
    zIndex: 1,
  },
  content: {
    position: "relative",
    zIndex: 2,
    maxWidth: "1200px",
    padding: "0 2rem",
    color: "#ffffff",
  },
  title: {
    fontSize: "3.5rem",
    fontWeight: 800,
    lineHeight: 1.2,
    marginBottom: "1.5rem",
  },
  subtitle: {
    maxWidth: "520px",
    fontSize: "1.1rem",
    lineHeight: 1.7,
    color: "#e5e7eb",
    marginBottom: "2.5rem",
  },
  actions: {
    display: "flex",
    gap: "1.2rem",
    flexWrap: "wrap",
  },
  primaryBtn: {
    padding: "0.9rem 2rem",
    background: "linear-gradient(135deg, #10b981, #22c55e)",
    color: "#ffffff",
    border: "none",
    borderRadius: "999px",
    fontSize: "1rem",
    fontWeight: 600,
    cursor: "pointer",
    transition: "all 0.25s ease",
    boxShadow: "0 8px 25px rgba(16,185,129,0.45)",
  },
  primaryBtnLoading: {
    opacity: 0.8,
    cursor: "not-allowed",
  },
  secondaryBtn: {
    padding: "0.9rem 2rem",
    backgroundColor: "#ffffff",
    color: "#064e3b",
    border: "none",
    borderRadius: "999px",
    fontSize: "1rem",
    fontWeight: 600,
    cursor: "pointer",
    transition: "all 0.25s ease",
    boxShadow: "0 6px 18px rgba(0,0,0,0.15)",
  },
};
