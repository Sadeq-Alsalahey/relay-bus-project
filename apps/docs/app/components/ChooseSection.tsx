"use client";

import React, { useState } from "react";
import Link from "next/link";
import "./ChooseSection.css";

type Card = {
  icon: string;
  title: string;
  description: string;
};

const cardsData: Card[] = [
  {
    icon: "🚌",
    title: "Advanced Fleet Management",
    description:
      "Comprehensive tools to manage your entire fleet with real-time tracking, maintenance scheduling, and performance analytics.",
  },
  {
    icon: "📊",
    title: "Data-Driven Insights",
    description:
      "Make informed decisions with detailed reports, route optimization, and operational efficiency metrics.",
  },
  {
    icon: "🔒",
    title: "Secure & Reliable",
    description:
      "Enterprise-grade security with 99.9% uptime guarantee to keep your operations running smoothly.",
  },
];

export default function WhyChooseSection() {
  const [activeCard, setActiveCard] = useState<number | null>(null);

  const handleCardClick = (index: number) => {
    setActiveCard(index);
    setTimeout(() => setActiveCard(null), 200);
  };

  return (
    <>
      {/* WHY CHOOSE */}
      <section id="choose-section" className="why-choose-section">
        <div className="container">
          <h2 className="section-title">Why Choose RelayBus?</h2>

          <div className="cards-wrapper">
            {cardsData.map((card, index) => (
              <button
                key={index}
                className={`card ${activeCard === index ? "active" : ""}`}
                onClick={() => handleCardClick(index)}
                aria-label={card.title}
              >
                <div className="icon">{card.icon}</div>
                <h3>{card.title}</h3>
                <p>{card.description}</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="container">
          <h2>Ready to Transform Your Fleet?</h2>
          <p>
            Join thousands of transportation companies that trust RelayBus for
            their fleet management needs.
          </p>

          <Link href="/login" className="cta-button">
            Access Fleet Management
          </Link>
        </div>
      </section>
    </>
  );
}
