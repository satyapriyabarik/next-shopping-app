import React, { useState, ReactNode, HTMLAttributes, useEffect, useRef } from "react";
import styles from "./Carousel.module.css";

interface CarouselProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode[];
    interval?: number; // autoplay interval in ms
    fade?: boolean; // enable fade effect
}

interface CarouselItemProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
}

interface CarouselCaptionProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
}

export const Carousel: React.FC<CarouselProps> & {
    Item: React.FC<CarouselItemProps>;
    Caption: React.FC<CarouselCaptionProps>;
} = ({ children, interval = 5000, fade = false, className = "", ...props }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const length = React.Children.count(children);
    const timer = useRef<NodeJS.Timeout | null>(null);

    const next = () => setActiveIndex((prev) => (prev + 1) % length);
    const prev = () => setActiveIndex((prev) => (prev - 1 + length) % length);

    useEffect(() => {
        if (interval > 0) {
            timer.current = setInterval(next, interval);
            return () => {
                if (timer.current) clearInterval(timer.current);
            };
        }
    }, [interval]);

    return (
        <div className={`${styles.carousel} ${className}`} {...props}>
            <div
                className={`${styles.carouselInner} ${fade ? styles.fade : ""}`}
            >
                {React.Children.map(children, (child, index) => (
                    <div
                        className={`${styles.carouselItem} ${index === activeIndex ? styles.active : ""
                            }`}
                    >
                        {child}
                    </div>
                ))}
            </div>

            {/* Controls */}
            <button className={`${styles.control} ${styles.prev}`} onClick={prev}>
                &#10094;
            </button>
            <button className={`${styles.control} ${styles.next}`} onClick={next}>
                &#10095;
            </button>

            {/* Indicators */}
            <div className={styles.indicators}>
                {React.Children.map(children, (_, index) => (
                    <button
                        className={`${styles.indicator} ${index === activeIndex ? styles.active : ""
                            }`}
                        onClick={() => setActiveIndex(index)}
                    />
                ))}
            </div>
        </div>
    );
};

// Carousel.Item
Carousel.Item = ({ children, className = "", ...props }: CarouselItemProps) => {
    return (
        <div className={`${styles.carouselItemContent} ${className}`} {...props}>
            {children}
        </div>
    );
};

// Carousel.Caption
Carousel.Caption = ({ children, className = "", ...props }: CarouselCaptionProps) => {
    return (
        <div className={`${styles.carouselCaption} ${className}`} {...props}>
            {children}
        </div>
    );
};
