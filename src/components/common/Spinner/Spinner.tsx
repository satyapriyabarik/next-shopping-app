import React from "react";
import styles from "./Spinner.module.css";

export type SpinnerVariant =
    | "primary"
    | "secondary"
    | "success"
    | "danger"
    | "warning"
    | "info"
    | "light"
    | "dark";

export interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
    animation?: "border" | "grow";
    variant?: SpinnerVariant;
    size?: "sm" | "lg";
    as?: React.ElementType;
    role?: string;
    label?: string;
}

export const Spinner: React.FC<SpinnerProps> = ({
    animation = "border",
    variant = "primary",
    size,
    as: Component = "div",
    role = "status",
    label,
    className = "",
    ...props
}) => {
    const classes = [
        styles.spinner,
        animation === "grow" ? styles.grow : styles.border,
        styles[variant],
        size === "sm" ? styles.sm : "",
        size === "lg" ? styles.lg : "",
        className,
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <Component className={classes} role={role} {...props}>
            {label ? <span className="visually-hidden">{label}</span> : null}
        </Component>
    );
};
