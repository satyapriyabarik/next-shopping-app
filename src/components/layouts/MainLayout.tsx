
import styles from "./MainLayout.module.css";
import Head from "next/head";
import Header from "../header";
import Footer from "../footer";
import React from "react";

interface MainLayoutProps {
    title: string;
    children: React.ReactNode;
}

export default function MainLayout({ title, children }: MainLayoutProps) {
    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name="theme-color" content="#4CAF50" />
                <link rel="manifest" href="/manifest.json" />
                <link rel="icon" href="/icons/plant.ico" />
                <link rel="apple-touch-icon" href="/icons/plant.ico" />
            </Head>

            <div className={styles.container}>
                <Header />
                <main className={styles.main}>{children}</main>
                <Footer />
            </div>
        </>
    );
}
