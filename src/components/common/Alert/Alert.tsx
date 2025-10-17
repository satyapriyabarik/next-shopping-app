import React, { useState, ReactNode } from "react";
import styles from "./Alert.module.css";

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Visual style variant (Bootstrap-like) */
    variant?:
    | "primary"
    | "secondary"
    | "success"
    | "danger"
    | "warning"
    | "info"
    | "light"
    | "dark";

    /** Adds a close button */
    dismissible?: boolean;

    /** Called when the alert is closed */
    onClose?: () => void;

    /** Children inside the alert */
    children: ReactNode;

    /** Optional heading */
    heading?: ReactNode;
}

/**
 * Bootstrap-style Alert component
 */
export const Alert: React.FC<AlertProps> = ({
    variant = "primary",
    dismissible = false,
    onClose,
    heading,
    children,
    className = "",
    ...props
}) => {
    const [show, setShow] = useState(true);

    if (!show) return null;

    const handleClose = () => {
        setShow(false);
        onClose?.();
    };

    return (
        <div
            className={`${styles.alert} ${styles[variant]} ${dismissible ? styles.dismissible : ""} ${className}`}
            role="alert"
            {...props}
        >
            {heading && <h4 className={styles.heading}>{heading}</h4>}
            <div className={styles.message}>{children}</div>

            {dismissible && (
                <button
                    type="button"
                    className={styles.closeBtn}
                    aria-label="Close"
                    onClick={handleClose}
                >
                    <span aria-hidden="true">&times;</span>
                </button>
            )}
        </div>
    );
};
