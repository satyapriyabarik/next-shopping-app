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
        <div className={styles.container} >
            <h4 className={styles.title}>⚡ Web Vitals </h4>
            {
                Object.entries(metrics).map(([key, value]) => (
                    <div key={key} className={styles.metric} >
                        <span className={styles.metricName} > {key} </span>
                        < span className={styles.metricValue} > {value} </span>
                    </div>
                ))
            }
        </div>
    );
};
export default WebVitalsOverlay;
