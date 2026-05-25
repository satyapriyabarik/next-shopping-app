import React, { useState } from "react";
import WebVitalsOverlay from "../webVitalsOverlay/WebVitalsOverlay";
import Link from "next/link";

export default function Footer() {
    const [showWebVitals, setShowWebVitals] = useState(false);

    const toggleWebVitals = () => {
        setShowWebVitals((prev) => !prev);
    };

    return (
        <>
            <footer className="bg-dark text-center text-white p-4 position-relative">
                <div className="container">
                    <p style={{ margin: 0, fontStyle: "italic" }}>
                        🌱 “Plant a seed today, watch it grow tomorrow.” 🌱
                    </p>
                    <p className="extranav">
                        <Link href="/portfolio">💼 Portfolio</Link> | <Link href="https://github.com/satyapriyabarik" target="_blank">🧑‍💻 GitHub Profile</Link> | <Link href="https://www.linkedin.com/in/satyapriya-barik-33594166/" target="_blank">🔗 LinkedIn</Link>
                    </p>
                    <small>
                        © {new Date().getFullYear()} GreenKart App
                    </small>
                    {process.env.NODE_ENV === "development" && (
                        <button
                            onClick={toggleWebVitals}
                            style={{
                                position: "absolute",
                                left: "1rem",
                                bottom: "1rem",
                                background: "#0b74de",
                                color: "#fff",
                                border: "none",
                                padding: "0.5rem 1rem",
                                borderRadius: "6px",
                                cursor: "pointer",
                                fontSize: "0.8rem",
                            }}
                        >
                            {showWebVitals ? "Hide Metrics" : "Show Metrics"}
                        </button>
                    )}
                </div>
            </footer>
            {showWebVitals && process.env.NODE_ENV === "development" && <WebVitalsOverlay />}
        </>
    );
}
