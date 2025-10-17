import React, { ReactNode, HTMLAttributes } from "react";
import styles from "./Container.module.css";

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    fluid?: boolean; // full-width container
    className?: string; // custom CSS classes
}

export const Container: React.FC<ContainerProps> = ({
    children,
    fluid = false,
    className = "",
    ...props
}) => {
    return (
        <div
            className={`${fluid ? styles.fluid : styles.container} ${className}`}
            {...props}
        >
            {children}
        </div>
    );
};
