import React, { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./Button.module.css";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** The button content */
  children: ReactNode;
  /** Visual style variant (matches CSS module classes) */
  variant?: "primary" | "secondary" | "danger" | "success";
  /** Button size (matches CSS module classes) */
  size?: "sm" | "md" | "lg";
  mr?: string;
  ml?: string;
  mt?: string;
  mb?: string;
  /** Optional disabled state */
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  disabled = false,
  mr = "",
  ml = "",
  mt = "",
  mb = "",
  ...props
}) => {
  return (
    <button
      className={`${styles.button} ${styles[variant]} ${styles[size]} ${disabled ? styles.disabled : ""}`}
      style={{
        marginRight: mr,
        marginLeft: ml,
        marginTop: mt,
        marginBottom: mb
      }}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};
