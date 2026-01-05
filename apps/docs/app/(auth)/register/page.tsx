"use client";

import React, { useState } from "react";
import Image from "next/image";
import styles from "./register.module.css";

export default function RegisterPage() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    console.log("REGISTER DATA 👉", form);
  };

  return (
    <div className={styles.registerWrapper}>
      {/* Logo */}
      <div className={styles.registerCard}>
        <div className={styles.logo}>
          <Image
            src="/svg/RELAY BUS-09.svg"
            alt="Relay Bus Logo"
            width={180}
            height={70}
            priority
          />
        </div>

        <h1 className={styles.title}>Create Account</h1>
        <p className={styles.subtitle}>
          Join Relay Bus Fleet Management Platform
        </p>

        <form onSubmit={submitHandler}>
          {/* Full Name */}
          <label className={styles.label}>👤 Full Name</label>
          <input
            className={styles.input}
            type="text"
            placeholder="John Doe"
            required
            value={form.fullName}
            onChange={(e) =>
              setForm({ ...form, fullName: e.target.value })
            }
          />

          {/* Email */}
          <label className={styles.label}>📧 Email Address</label>
          <input
            className={styles.input}
            type="email"
            placeholder="name@company.com"
            required
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />

          {/* Password */}
          <label className={styles.label}>🔐 Password</label>
          <div className={styles.passwordBox}>
            <input
              className={styles.input}
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              required
              value={form.password}
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
            />
            <button
              type="button"
              className={styles.eye}
              onClick={() => setShowPassword((v) => !v)}
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>

          {/* Confirm Password */}
          <label className={styles.label}>🔁 Confirm Password</label>
          <input
            className={styles.input}
            type="password"
            placeholder="••••••••"
            required
            value={form.confirmPassword}
            onChange={(e) =>
              setForm({ ...form, confirmPassword: e.target.value })
            }
          />

          <button className={styles.registerBtn}>
            🧾 Create Account
          </button>
        </form>

        <div className={styles.links}>
          <a href="/login">Already have an account?</a>
        </div>

        <footer className={styles.footer}>
          © 2026 RelayBus Fleet Management
        </footer>
      </div>
    </div>
  );
}
