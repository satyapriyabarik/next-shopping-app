"use client";
import { Product } from "@/types/Product";
import Link from "next/link";
import { Card } from "../common/Card/Card";
import { Container } from "../common/Container/Container";
import { Col, Row } from "../common/Grid/Grid";
import styles from "@/styles/Skeleton.module.css";

interface ProductGridProps {
    products: Product[];
    isLoading?: boolean;
    skeletonCount?: number;
}

export default function FeaturedProducts({
    products,
    isLoading = false,
    skeletonCount = 8,
}: ProductGridProps) {
    if (!products.length && !isLoading)
        return <p className="text-center text-muted">No featured products found.</p>;

    return (
        <div className="featured-bg py-5">
            <Container>
                <Row className="justify-content-center" gap={0}>
                    {isLoading
                        ? Array.from({ length: skeletonCount }).map((_, index) => (
                            <Col
                                key={`skeleton-${index}`}
                                xs={12}
                                sm={6}
                                md={4}
                                lg={3}
                                xl={3}
                                className="product-col mb-4"
                            >
                                <div className={styles.skeletonCard}>
                                    <div
                                        className={`${styles.skeleton} ${styles.skeletonImgSm}`}
                                    ></div>
                                    <div
                                        className={`${styles.skeleton} ${styles.skeletonTitleSm}`}
                                    ></div>
                                    <div
                                        className={`${styles.skeleton} ${styles.skeletonTextSm}`}
                                    ></div>
                                    <div
                                        className={`${styles.skeleton} ${styles.skeletonPriceSm}`}
                                    ></div>
                                    <div
                                        className={`${styles.skeleton} ${styles.skeletonBtnSm}`}
                                    ></div>
                                </div>
                            </Col>
                        ))
                        :

                        products.map((p) => (
                            <Col
                                key={p.id}
                                xs={12}
                                sm={6}
                                md={4}
                                lg={4}
                                className="mb-4 d-flex align-items-stretch"
                            >
                                <Card className="h-100 shadow-lg border-0 hover-zoom product-card">
                                    {/* Redirect to category page instead of product detail */}
                                    <Link href={`/products?category=${encodeURIComponent(p.category)}`}>
                                        <Card.Img
                                            variant="top"
                                            src={p.image}
                                            alt={p.name}
                                            className="p-2 rounded-top"
                                            style={{ cursor: "pointer" }}
                                            fill
                                        />
                                    </Link>

                                    <Card.Body className="text-center">
                                        <Card.Title className="fs-5 text-dark">{p.name}</Card.Title>
                                        <Card.Text className="fw-bold text-success fs-6 mb-2">
                                            ₹{p.price ?? "—"}
                                        </Card.Text>
                                        <Card.Text className="text-secondary small mb-3">
                                            {p.description.length > 60
                                                ? p.description.slice(0, 57) + "..."
                                                : p.description}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                </Row>
            </Container>
        </div>
    );
}
