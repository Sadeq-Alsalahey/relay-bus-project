"use client";

import { useEffect, useState } from "react";
import Hero from "./components/Hero";
import WhyChooseSection from "./components/ChooseSection";
import Footer from "./components/Footer";

/* ===== Types ===== */
interface User {
  id: number;
  name: string;
}

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3001/call-users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <>
      {/* 🔹 Hero Section (Landing Page) */}
      <Hero />
      <WhyChooseSection />
      <Footer />

      {/* 🔹 Users Section */}
      {/* 
      <section style={{ padding: "2rem", fontFamily: "Arial" }}>
        <h2>Relay Bus - Users</h2>

        {loading ? (
          <p>Loading...</p>
        ) : users.length === 0 ? (
          <p>No users found</p>
        ) : (
          <ul>
            {users.map((user) => (
              <li key={user.id}>{user.name}</li>
            ))}
          </ul>
        )}
      </section>
      */}
    </>
  );
}
