"use client";

import React, { useState } from "react";
import Image from "next/image";
import styles from "./login.module.css";
import { loginSchema, LoginFormData } from "../../../Validation/loginSchema";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

const FEATURES = [
  { icon: "🔐", title: "SECURE", subtitle: "LOGIN" },
  { icon: "☁️", title: "CLOUD", subtitle: "BASED" },
  { icon: "📱", title: "MOBILE", subtitle: "READY" },
];

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setServerError(null);

    try {
      const res = await fetch("/v1/auth/login", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Login failed");
      }

      // 🔐 حفظ التوكن
      localStorage.setItem("accessToken", result.accessToken);

      // ✅ التحويل بعد النجاح
      router.push("/dashboard");
    } catch (err: any) {
      setServerError(err.message);
    }
  };

  return (
    <div className={styles.loginWrapper}>
      {/* Language Switch */}
      <div className={styles.langSwitch}>
        <button type="button" className={styles.langActive}>
          🇺🇸 English
        </button>
        <button type="button" className={styles.langBtn}>
          🇸🇦 العربية
        </button>
      </div>

      {/* Login Card */}
      <div className={styles.loginCard}>
        {/* Logo */}
        <div className={styles.logo}>
          <Image
            src="/svg/RELAY BUS-09.svg"
            alt="Relay Bus Logo"
            width={180}
            height={70}
            priority
          />
        </div>

        <h1 className={styles.title}>Fleet Management Portal</h1>
        <p className={styles.subtitle}>
          Sign in to manage your fleet operations
        </p>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Email */}
          <label htmlFor="email" className={styles.label}>
            📧 Email Address
          </label>
          <input
            type="email"
            className={styles.input}
            placeholder="name@company.com"
            {...register("email")}
          />
          {errors.email && (
            <p className={styles.error}>{errors.email.message}</p>
          )}

          {/* Password */}
          <label htmlFor="password" className={styles.label}>
            🔐 Password
          </label>
          <div className={styles.passwordBox}>
            <input
              type={showPassword ? "text" : "password"}
              className={styles.input}
              placeholder="••••••••"
              {...register("password")}
            />

            <button
              type="button"
              className={styles.eye}
              onClick={() => setShowPassword((v) => !v)}
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>

          {errors.password && (
            <p className={styles.error}>{errors.password.message}</p>
          )}

          {/* Server Error */}
          {serverError && (
            <p className={styles.error}>{serverError}</p>
          )}

          <button
            type="submit"
            className={styles.loginBtn}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Logging in..." : "🚀 Access Fleet Management"}
          </button>

          {/* Remember */}
          <div className={styles.remember}>
            <input id="remember" type="checkbox" />
            <label htmlFor="remember">Keep me signed in</label>
          </div>
        </form>

        {/* Links */}
        <div className={styles.links}>
          <a href="#">Forgot Password?</a>
          <span>|</span>
          <a href="#">Contact Support</a>
        </div>

        <div className={styles.links}>
          <span>|</span>
          <a href="/register">Create Account</a>
        </div>

        <footer className={styles.footer}>
          © 2026 RelayBus Fleet Management. All rights reserved.
        </footer>
      </div>

      {/* Features */}
      <div className={styles.features}>
        {FEATURES.map((f, i) => (
          <div
            key={f.title}
            className={styles.feature}
            style={{ animationDelay: `${i * 0.15}s` }}
          >
            <div className={styles.featureIcon}>{f.icon}</div>
            <span>{f.title}</span>
            <span>{f.subtitle}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
