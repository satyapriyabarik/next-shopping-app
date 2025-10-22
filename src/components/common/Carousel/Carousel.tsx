import React, {
    useState,
    ReactNode,
    HTMLAttributes,
    useEffect,
    useRef,
    useCallback,
} from "react";
import styles from "./Carousel.module.css";

interface CarouselProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode[];
    interval?: number;
    fade?: boolean;
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

    const next = useCallback(() => {
        setActiveIndex((prev) => (prev + 1) % length);
    }, [length]);

    const prev = useCallback(() => {
        setActiveIndex((prev) => (prev - 1 + length) % length);
    }, [length]);

    useEffect(() => {
        if (interval > 0) {
            timer.current = setInterval(next, interval);
            return () => {
                if (timer.current) clearInterval(timer.current);
            };
        }
    }, [interval, next]);

    return (
        <div className={`${styles.carousel} ${className}`} {...props}>
            <div className={`${styles.carouselInner} ${fade ? styles.fade : ""}`}>
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
            <button className={`${styles.control} ${styles.prev}`} onClick={prev} aria-label="Previous Slide">
                &#10094;
            </button>
            <button className={`${styles.control} ${styles.next}`} onClick={next} aria-label="Next Slide">
                &#10095;
            </button>

            {/* Indicators */}
            <div className={styles.indicators}>
                {React.Children.map(children, (_, index) => (
                    <button
                        className={`${styles.indicator} ${index === activeIndex ? styles.active : ""
                            }`}
                        onClick={() => setActiveIndex(index)}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};

Carousel.displayName = "Carousel"; // ✅ Add display name

Carousel.Item = ({ children, className = "", ...props }: CarouselItemProps) => {
    return (
        <div className={`${styles.carouselItemContent} ${className}`} {...props}>
            {children}
        </div>
    );
};
Carousel.Item.displayName = "Carousel.Item"; // ✅ Add display name

Carousel.Caption = ({ children, className = "", ...props }: CarouselCaptionProps) => {
    return (
        <div className={`${styles.carouselCaption} ${className}`} {...props}>
            {children}
        </div>
    );
};
Carousel.Caption.displayName = "Carousel.Caption"; // ✅ Add display name
