"use client";

import React, { useState } from "react";
import Image from "next/image";
import styles from "./register.module.css";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    if (form.password !== form.confirmPassword) {
      setServerError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/v1/auth/register", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setServerError(data.message || "Registration failed");
        return;
      }

      setSuccess(true);

      // Redirect بعد نجاح التسجيل
      setTimeout(() => {
        router.push("/login");
      }, 1500);
    } catch {
      setServerError("Server unreachable, please try again later");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.registerWrapper}>
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

          {/* Errors */}
          {serverError && (
            <p className={styles.error}>{serverError}</p>
          )}

          {success && (
            <p className={styles.success}>
              Account created successfully ✅ Redirecting...
            </p>
          )}

          <button
            className={styles.registerBtn}
            disabled={loading}
          >
            {loading ? "Creating..." : "🧾 Create Account"}
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
