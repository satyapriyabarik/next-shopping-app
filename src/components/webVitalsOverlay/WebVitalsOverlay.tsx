"use client";

import React, { useEffect, useState } from "react";
import { onCLS, onLCP, onFCP, onTTFB, onINP, Metric } from "web-vitals";
import styles from "./WebVitalsOverlay.module.css";

interface Metrics {
    LCP?: number;
    INP?: number;
    CLS?: number;
    FCP?: number;
    TTFB?: number;
}

const metricUnits: Record<string, string> = {
    CLS: "",
    LCP: "ms",
    FCP: "ms",
    TTFB: "ms",
    INP: "ms",
};

const getMetricColor = (name: string, value?: number): string => {
    if (value === undefined) return "gray";

    switch (name) {
        case "CLS":
            if (value <= 0.1) return "green";
            if (value <= 0.25) return "orange";
            return "red";
        case "LCP":
            if (value <= 2500) return "green";
            if (value <= 4000) return "orange";
            return "red";
        case "FCP":
            if (value <= 1800) return "green";
            if (value <= 3000) return "orange";
            return "red";
        case "TTFB":
            if (value <= 200) return "green";
            if (value <= 600) return "orange";
            return "red";
        case "INP":
            if (value <= 200) return "green";
            if (value <= 500) return "orange";
            return "red";
        default:
            return "gray";
    }
};

const WebVitalsOverlay: React.FC = () => {
    const [metrics, setMetrics] = useState<Metrics>({});

    useEffect(() => {
        const handleMetric = (metric: Metric) => {
            setMetrics((prev) => ({
                ...prev,
                [metric.name]: parseFloat(metric.value.toFixed(2)),
            }));
        };

        onCLS(handleMetric);
        onLCP(handleMetric);
        onFCP(handleMetric);
        onTTFB(handleMetric);
        onINP(handleMetric);
    }, []);

    return (
        <div className={styles.container}>
            <h4 className={styles.title}>⚡ Web Vitals</h4>
            {Object.entries(metrics).map(([key, value]) => {
                const color = getMetricColor(key, value);
                return (
                    <div key={key} className={styles.metric}>
                        <span className={styles.metricName}>{key}</span>
                        <span className={styles.metricValue} style={{ color }}>
                            {value} {metricUnits[key]}
                        </span>
                    </div>
                );
            })}
        </div>
    );
};

export default WebVitalsOverlay;
