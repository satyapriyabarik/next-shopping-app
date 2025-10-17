import React from "react";
import styles from "./Badge.module.css";

export type BadgeVariant =
    | "primary"
    | "secondary"
    | "success"
    | "danger"
    | "warning"
    | "info"
    | "light"
    | "dark";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
    children?: React.ReactNode;
    variant?: BadgeVariant;
    pill?: boolean;
    bg?: BadgeVariant; // alias (bootstrap uses bg-*)
    size?: "sm" | "md" | "lg";
    title?: string;
    /** If provided, render numeric counter (string or number) */
    count?: string | number;
    /** show a small dot instead of content */
    dot?: boolean;
}

/**
 * Badge component (Bootstrap-like)
 */
export const Badge: React.FC<BadgeProps> = ({
    children,
    variant = "primary",
    bg,
    pill = false,
    size = "md",
    className = "",
    title,
    count,
    dot = false,
    ...props
}) => {
    const usedVariant = bg ?? variant;

    const classes = [
        styles.badge,
        styles[`badge-${usedVariant}`],
        pill ? styles.pill : "",
        size === "sm" ? styles.sm : size === "lg" ? styles.lg : "",
        dot ? styles.dot : "",
        className,
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <span
            className={classes}
            title={title}
            aria-label={typeof count !== "undefined" ? `${count}` : undefined}
            {...props}
        >
            {dot ? null : typeof count !== "undefined" ? count : children}
        </span>
    );
};
