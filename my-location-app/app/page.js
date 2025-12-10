"use client";
import { useState } from "react";

export default function Home() {
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = () => {
    if (!name) {
      setStatus("Please enter your name");
      return;
    }

    if (!navigator.geolocation) {
      setStatus("Geolocation not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(async (pos) => {
      const latitude = pos.coords.latitude;
      const longitude = pos.coords.longitude;

      // Save to backend API
      const res = await fetch("/api/save-location", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, latitude, longitude }),
      });

      const data = await res.json();

      if (data.success) {
        setStatus(`Location saved for ${name}`);
      } else {
        setStatus("Error saving location");
      }
    });
  };

  return (
    <main style={{ padding: 20 }}>
      <h1>Save My Location</h1>

      <input
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{
          padding: "10px",
          borderRadius: "8px",
          border: "1px solid #ccc",
          marginBottom: "10px",
          width: "250px"
        }}
      />

      <br />

      <button
        onClick={handleSubmit}
        style={{
          padding: "10px 20px",
          marginTop: "10px",
          background: "#0070f3",
          color: "white",
          borderRadius: "8px",
          border: "none",
          cursor: "pointer",
        }}
      >
        Save My Name
      </button>

      <p style={{ marginTop: "20px" }}>{status}</p>
    </main>
  );
}
