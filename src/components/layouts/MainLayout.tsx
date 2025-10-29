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

            <Head>{`${title} | : Shop Plants Online | GreenKart`}
                <meta
                    name="description"
                    content="Shop healthy indoor and outdoor plants like roses, ferns, and succulents delivered to your doorstep."
                />
                <meta name="theme-color" content="#4CAF50" />
                <link rel="manifest" href="/manifest.json" />
                <link rel="icon" href="/icons/plant.ico" />
                <link rel="apple-touch-icon" href="/icons/plant.ico" />
            </Head>
            <Header />
            <div className={styles.container}>

                <main className={styles.main} id="main-content" tabIndex={-1}>{children}</main>
                <Footer />
            </div>
        </>
    );
}
