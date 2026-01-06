"use client";

import React from "react";
import styles from "./dashboard.module.css";

export default function DashboardPage() {
  // === Mock Data (بدل Angular Component TS) ===
  const stats = {
    activeBuses: 18,
    totalBuses: 24,
    totalDrivers: 32,
    intercityTripsToday: 12,
    umrahPackagesActive: 4,
    totalPassengersToday: 420,
    revenue: {
      today: 12500,
      thisMonth: 220000,
    },
    maintenance: {
      due: 3,
      overdue: 1,
    },
  };

  const todaysTrips = [
    {
      busNumber: "BUS-102",
      route: "Riyadh → Makkah",
      status: "active",
      driverName: "Ahmed Ali",
      departure: "08:30",
      passengers: 42,
      maxCapacity: 50,
      currentLocation: "Taif",
      type: "🚐",
    },
  ];

  const activeUmrahPackages = [
    {
      packageName: "Umrah Ramadan",
      status: "active",
      departureCity: "Jeddah",
      duration: 10,
      pilgrims: 180,
      maxCapacity: 200,
      busesAssigned: 5,
      hotelBookings: ["Hilton", "Swissotel"],
    },
  ];

  const recentActivities = [
    {
      icon: "🚌",
      message: "Trip BUS-102 departed",
      time: "09:10",
    },
  ];

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "SAR",
    }).format(value);

  const getCapacityPercentage = (used: number, max: number) =>
    Math.round((used / max) * 100);

  return (
    <div className={styles.dashboardContent}>
      {/* Header */}
      <div className={styles.dashboardHeader}>
        <div>
          <h1>Fleet Management Dashboard</h1>
          <p>Intercity Bus Services & Umrah Pilgrimage Operations</p>
        </div>

        <div className={styles.headerActions}>
          <button className={`${styles.actionBtn} ${styles.primary}`}>
            ➕ Schedule Trip
          </button>
          <button className={`${styles.actionBtn} ${styles.secondary}`}>
            🕌 Create Umrah Package
          </button>
          <button className={`${styles.actionBtn} ${styles.refresh}`}>
            🔄 Refresh
          </button>
        </div>
      </div>

      {/* Metrics */}
      <div className={styles.metricsGrid}>
        <Metric label="Fleet Status" icon="🚌">
          {stats.activeBuses}/{stats.totalBuses}
        </Metric>
        <Metric label="Drivers" icon="👨‍✈️">
          {stats.totalDrivers}
        </Metric>
        <Metric label="Today's Trips" icon="🚐">
          {stats.intercityTripsToday}
        </Metric>
        <Metric label="Umrah Packages" icon="🕌">
          {stats.umrahPackagesActive}
        </Metric>
        <Metric label="Passengers" icon="👥">
          {stats.totalPassengersToday}
        </Metric>
        <Metric label="Revenue Today" icon="💰">
          {formatCurrency(stats.revenue.today)}
        </Metric>
        <Metric label="Monthly Revenue" icon="📊">
          {formatCurrency(stats.revenue.thisMonth)}
        </Metric>
      </div>

      {/* Content Grid */}
      <div className={styles.contentGrid}>
        {/* Trips */}
        <Section title="🚌 Today's Trips">
          {todaysTrips.length === 0 ? (
            <EmptyState text="No trips scheduled today" />
          ) : (
            todaysTrips.map((trip, i) => (
              <div key={i} className={styles.tripCard}>
                <h4>{trip.busNumber}</h4>
                <p>{trip.route}</p>
                <small>
                  Driver: {trip.driverName} – Passengers:{" "}
                  {trip.passengers}/{trip.maxCapacity}
                </small>
              </div>
            ))
          )}
        </Section>

        {/* Umrah */}
        <Section title="🕌 Active Umrah Packages">
          {activeUmrahPackages.map((pkg, i) => (
            <div key={i} className={styles.umrahCard}>
              <h4>{pkg.packageName}</h4>
              <p>
                {pkg.pilgrims}/{pkg.maxCapacity} pilgrims
              </p>
            </div>
          ))}
        </Section>

        {/* Activities */}
        <Section title="📋 Recent Activities" full>
          {recentActivities.map((a, i) => (
            <div key={i} className={styles.activityItem}>
              <span>{a.icon}</span>
              <div>
                <p>{a.message}</p>
                <small>{a.time}</small>
              </div>
            </div>
          ))}
        </Section>
      </div>
    </div>
  );
}

/* === Small Helper Components === */

function Metric({
  icon,
  label,
  children,
}: {
  icon: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className={styles.metricCard}>
      <span>{icon}</span>
      <p>{label}</p>
      <strong>{children}</strong>
    </div>
  );
}

function Section({
  title,
  children,
  full,
}: {
  title: string;
  children: React.ReactNode;
  full?: boolean;
}) {
  return (
    <div
      className={`${styles.contentSection} ${
        full ? styles.fullWidth : ""
      }`}
    >
      <h2>{title}</h2>
      {children}
    </div>
  );
}

function EmptyState({ text }: { text: string }) {
  return <div className={styles.emptyState}>{text}</div>;
}
