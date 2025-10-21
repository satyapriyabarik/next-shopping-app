"use client";

import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import styles from "./Modal.module.css";

interface ModalProps {
    show: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
    footer?: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ show, onClose, title, children, footer }) => {
    // Close on Escape
    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        document.addEventListener("keydown", handleKey);
        return () => document.removeEventListener("keydown", handleKey);
    }, [onClose]);

    if (!show) return null;

    return ReactDOM.createPortal(
        <div className={styles.modalBackdrop} onClick={onClose}>
            <div
                className={styles.modalContent}
                onClick={(e) => e.stopPropagation()} // Prevent backdrop click
            >
                <div className={styles.modalHeader}>
                    <h5>{title}</h5>
                    <button className={styles.closeBtn} onClick={onClose}>
                        &times;
                    </button>
                </div>
                <div className={styles.modalBody}>{children}</div>
                {footer && <div className={styles.modalFooter}>{footer}</div>}
            </div>
        </div>,
        document.body
    );
};
export default Modal;
