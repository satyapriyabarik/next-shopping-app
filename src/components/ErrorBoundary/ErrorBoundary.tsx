"use client";

import React, { Component, ReactNode } from "react";

interface Props {
    children: ReactNode;
    fallback?: ReactNode;
}

interface State {
    hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(): State {
        return { hasError: true };
    }

    componentDidCatch(error: Error, info: React.ErrorInfo) {
        console.error("Error Boundary caught an error:", error, info);
    }

    handleReload = () => {
        this.setState({ hasError: false });
        if (typeof window !== "undefined") {
            window.location.reload();
        }
    };

    render() {
        if (this.state.hasError) {
            return (
                this.props.fallback || (
                    <div
                        style={{
                            height: "100vh",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            background: "#f8f9fa",
                            color: "#333",
                            textAlign: "center",
                            padding: "2rem",
                        }}
                    >
                        <h2>Ah! Something went wrong 😔</h2>
                        <p>There is some technical glitz happened, please bear some moment.</p>
                        <p>Try reloading the page or coming back later.</p>
                        <button
                            onClick={this.handleReload}
                            style={{
                                marginTop: "1rem",
                                background: "green",
                                color: "white",
                                border: "none",
                                padding: "0.75rem 1.5rem",
                                borderRadius: "6px",
                                cursor: "pointer",
                            }}
                        >
                            Reload Page
                        </button>
                    </div>
                )
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
