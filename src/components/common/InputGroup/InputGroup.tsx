import React, { ReactNode, HTMLAttributes } from "react";
import styles from "./InputGroup.module.css";

// --------------------
// Props
// --------------------
interface InputGroupProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    className?: string;
    size?: "sm" | "md" | "lg";
}

interface InputGroupTextProps extends HTMLAttributes<HTMLSpanElement> {
    children: ReactNode;
    className?: string;
}

interface InputGroupButtonProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    className?: string;
}

interface InputGroupAddonProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    className?: string;
}

// --------------------
// Base Component
// --------------------
export const InputGroup: React.FC<InputGroupProps> & {
    Text: React.FC<InputGroupTextProps>;
    Prepend: React.FC<InputGroupAddonProps>;
    Append: React.FC<InputGroupAddonProps>;
    Button: React.FC<InputGroupButtonProps>;
} = ({ children, className = "", size = "md", ...props }) => {
    const classes = [
        styles.inputGroup,
        styles[`inputGroup-${size}`] || "",
        className,
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <div className={classes} {...props}>
            {children}
        </div>
    );
};

// --------------------
// Subcomponents
// --------------------

// Text Addon
InputGroup.Text = ({ children, className = "", ...props }) => {
    return (
        <span className={`${styles.inputGroupText} ${className}`} {...props}>
            {children}
        </span>
    );
};
InputGroup.Text.displayName = "InputGroup.Text";
// Prepend Addon (Wrapper before control)
InputGroup.Prepend = ({ children, className = "", ...props }) => {
    return (
        <div className={`${styles.inputGroupPrepend} ${className}`} {...props}>
            {children}
        </div>
    );
};
InputGroup.Prepend.displayName = "InputGroup.Prepend";
// Append Addon (Wrapper after control)
InputGroup.Append = ({ children, className = "", ...props }) => {
    return (
        <div className={`${styles.inputGroupAppend} ${className}`} {...props}>
            {children}
        </div>
    );
};
InputGroup.Append.displayName = "InputGroup.Append";
// Button wrapper
InputGroup.Button = ({ children, className = "", ...props }) => {
    return (
        <div className={`${styles.inputGroupButton} ${className}`} {...props}>
            {children}
        </div>
    );
};
InputGroup.Button.displayName = "InputGroup.Button";
