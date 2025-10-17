import React, { createContext, useContext, useState, ReactNode } from "react";
import styles from "./Toast.module.css";

// ------------------ Types ------------------
type ToastType = "success" | "error" | "info" | "loading";
type ToastPosition =
    | "top-left"
    | "top-center"
    | "top-right"
    | "bottom-left"
    | "bottom-center"
    | "bottom-right";

interface ToastMessage {
    id: number;
    message: string;
    type: ToastType;
    position: ToastPosition;
}

interface ToastContextProps {
    addToast: (
        message: string,
        type?: ToastType,
        duration?: number,
        position?: ToastPosition
    ) => number;
    removeToast: (id: number) => void;
}

interface ToastProviderProps {
    children: ReactNode;
    /** Default toast position for all toasts */
    position?: ToastPosition;
}

const ToastContext = createContext<ToastContextProps | undefined>(undefined);

let toastId = 0;

// ------------------ Provider ------------------
export const ToastProvider: React.FC<ToastProviderProps> = ({
    children,
    position = "top-right",
}) => {
    const [toasts, setToasts] = useState<ToastMessage[]>([]);

    const addToast = (
        message: string,
        type: ToastType = "info",
        duration = 3000,
        customPosition?: ToastPosition
    ) => {
        const id = toastId++;
        const toastPosition = customPosition || position;

        setToasts((prev) => [...prev, { id, message, type, position: toastPosition }]);

        if (type !== "loading") {
            setTimeout(() => removeToast(id), duration);
        }

        return id;
    };

    const removeToast = (id: number) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    };

    // Group toasts by position
    const groupedToasts: Record<ToastPosition, ToastMessage[]> = {
        "top-left": [],
        "top-center": [],
        "top-right": [],
        "bottom-left": [],
        "bottom-center": [],
        "bottom-right": [],
    };
    toasts.forEach((t) => groupedToasts[t.position].push(t));

    return (
        <ToastContext.Provider value={{ addToast, removeToast }}>
            {children}

            {Object.entries(groupedToasts).map(([pos, list]) =>
                list.length > 0 ? (
                    <div key={pos} className={`${styles.toastContainer} ${styles[pos]}`}>
                        {list.map((t) => (
                            <div key={t.id} className={`${styles.toast} ${styles[t.type]}`}>
                                <span className={styles.icon}>{getIcon(t.type)}</span>
                                {t.message}
                            </div>
                        ))}
                    </div>
                ) : null
            )}
        </ToastContext.Provider>
    );
};

// ------------------ Hook ------------------
export const useToast = (): ToastContextProps => {
    const context = useContext(ToastContext);
    if (!context) throw new Error("useToast must be used within ToastProvider");
    return context;
};

// ------------------ Helper ------------------
const getIcon = (type: ToastType) => {
    switch (type) {
        case "success":
            return "✔️";
        case "error":
            return "❌";
        case "info":
            return "ℹ️";
        case "loading":
            return "⏳";
        default:
            return null;
    }
};
