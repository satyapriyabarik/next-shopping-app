import React from "react";
import clsx from "clsx";
import styles from "./Table.module.css";

interface TableProps extends React.TableHTMLAttributes<HTMLTableElement> {
    bordered?: boolean;
    hover?: boolean;
    striped?: boolean;
    size?: "sm" | "md" | "lg";
    variant?: "light" | "dark";
    responsive?: "sm" | "md" | "lg" | "xl" | "xxl" | boolean;
    className?: string;
    children: React.ReactNode;
}

export const Table: React.FC<TableProps> = ({
    bordered = false,
    hover = false,
    striped = false,
    size = "md",
    variant = "light",
    responsive = false,
    className,
    children,
    ...props
}) => {
    const tableClass = clsx(
        styles.table,
        {
            [styles.bordered]: bordered,
            [styles.hover]: hover,
            [styles.striped]: striped,
            [styles[`size-${size}`]]: size,
            [styles[`variant-${variant}`]]: variant,
        },
        className
    );

    const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) =>
        responsive
            ? typeof responsive === "boolean"
                ? <div className={styles.responsive}>{children}</div>
                : <div className={styles[`responsive-${responsive}`]}>{children}</div>
            : <>{children}</>;

    return (
        <Wrapper>
            <table role="table" className={tableClass} {...props}>
                {children}
            </table>
        </Wrapper>
    );
};
