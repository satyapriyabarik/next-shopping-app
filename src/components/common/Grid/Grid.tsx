import React, { ReactNode, HTMLAttributes } from "react";
import styles from "./Grid.module.css";

// ---------------------- Container ----------------------
interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    fluid?: boolean;
    className?: string;
}

export const Container: React.FC<ContainerProps> = ({
    children,
    fluid = false,
    className = "",
    ...props
}) => (
    <div className={`${fluid ? styles.fluid : styles.container} ${className}`} {...props}>
        {children}
    </div>
);
Container.displayName = "Grid.Container";

// ---------------------- Row ----------------------
interface RowProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    className?: string;
    gap?: number; // spacing between columns in rem
}

export const Row: React.FC<RowProps> = ({ children, className = "", gap = 1, ...props }) => (
    <div
        className={`${styles.row} ${className}`}
        style={{ gap: `${gap}rem` }} // dynamic gap applied
        {...props}
    >
        {children}
    </div>
);
Row.displayName = "Grid.Row";

// ---------------------- Column ----------------------
interface ColProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    className?: string;
    xs?: number; // 1-12
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
}

export const Col: React.FC<ColProps> = ({ children, className = "", xs, sm, md, lg, xl, ...props }) => {
    const classes = [
        xs ? `${styles[`col-xs-${xs}`]}` : "",
        sm ? `${styles[`col-sm-${sm}`]}` : "",
        md ? `${styles[`col-md-${md}`]}` : "",
        lg ? `${styles[`col-lg-${lg}`]}` : "",
        xl ? `${styles[`col-xl-${xl}`]}` : "",
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <div className={`${styles.col} ${classes} ${className}`} {...props}>
            {children}
        </div>
    );
};
Col.displayName = "Grid.Col";