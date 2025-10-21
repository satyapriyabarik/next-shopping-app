"use client";

import React, { useEffect, useState } from "react";
import styles from "./SkipToContent.module.css";

const SkipToContent: React.FC = () => {
    const [visible, setVisible] = useState(false);

    // Show the skip button when the user presses Tab (first time after refresh)
    useEffect(() => {
        const handleFirstTab = (e: KeyboardEvent) => {
            if (e.key === "Tab") {
                setVisible(true);
                window.removeEventListener("keydown", handleFirstTab);
            }
        };
        window.addEventListener("keydown", handleFirstTab);
        return () => window.removeEventListener("keydown", handleFirstTab);
    }, []);

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        focusMainContent();
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLAnchorElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            focusMainContent();
        }
    };

    const focusMainContent = () => {
        const el = document.getElementById("main-content");
        if (el) {
            el.setAttribute("tabindex", "-1");
            el.focus();
        }
        setVisible(false);
    };

    return (
        <>
            {visible && (
                <a
                    href="#main-content"
                    role="button"
                    tabIndex={0}
                    className={`${styles["skip-link"]} ${visible ? styles["skip-link--visible"] : ""
                        }`}
                    onClick={handleClick}
                    onKeyDown={handleKeyDown}
                >
                    Skip to Content
                </a>
            )}
        </>
    );
};

export default SkipToContent;
