import { useRouter } from "next/router";
import React, { Suspense, useEffect, useState } from "react";
import MainLayout from "@/components/layouts";
import Image from "next/image";
import AddToCartButton from "@/components/addToCart/AddToCartButton";
import { Product } from "@/types/Product";
import { getProductById } from "@/lib/api";
import { Spinner } from "@/components/common/Spinner/Spinner";
import { Container } from "@/components/common/Container/Container";
import { Col, Row } from "@/components/common/Grid/Grid";
import { Badge } from "@/components/common/Badge/Badge";
import Rating from "@/components/rating/Rating";
import styles from "@/styles/Skeleton.module.css"; // ✅ Import skeleton styles

interface ProductDetailProps {
    initialProduct?: Product | null;
}

const ProductBrief = React.lazy(() => import("@/components/productBrief/ProductBrief"));

export default function ProductDetail({ initialProduct }: ProductDetailProps) {
    const router = useRouter();
    const { id } = router.query;
    const [product, setProduct] = useState<Product | null>(initialProduct ?? null);
    const [showBrief, setShowBrief] = useState(false);

    // Fetch product if not SSR-provided
    useEffect(() => {
        if (!router.isReady || !id || initialProduct) return;
        const numericId = Array.isArray(id) ? id[0] : id;

        async function fetchProduct() {
            const prod = await getProductById(numericId.toString());
            setProduct(prod);
        }

        fetchProduct();
    }, [router.isReady, id, initialProduct]);

    // Lazy load ProductBrief on scroll
    useEffect(() => {
        const section = document.getElementById("product-brief-section");
        if (!section) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setShowBrief(true);
                        observer.disconnect();
                    }
                });
            },
            { threshold: 0.2 }
        );

        observer.observe(section);
        return () => observer.disconnect();
    }, [product]);

    // 🦴 Skeleton loader while product is fetching
    if (!product) {
        return (
            <MainLayout title="Loading...">
                <div className="py-5">
                    <Container>
                        <Row>
                            <Col md={6} className="text-center mb-4">
                                <div className={`${styles.skeleton} ${styles.skeletonImg}`}></div>
                            </Col>
                            <Col md={5}>
                                <div className={`${styles.skeleton} ${styles.skeletonTitle}`}></div>
                                <div className={`${styles.skeleton} ${styles.skeletonBadge}`}></div>
                                <div className={`${styles.skeleton} ${styles.skeletonPrice}`}></div>
                                <div className={`${styles.skeleton} ${styles.skeletonBtn}`}></div>
                                <div className={`${styles.skeleton} ${styles.skeletonLine} ${styles.w75}`}></div>
                                <div className={`${styles.skeleton} ${styles.skeletonLine} ${styles.w50}`}></div>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </MainLayout>
        );
    }

    return (
        <MainLayout title={product.name}>
            <div className="product-details-bg py-2">
                <Container>
                    <Row>
                        {/* Left: Image */}
                        <Col md={6} className="text-center mb-4">
                            <Image
                                src={product.image}
                                alt={product.name}
                                width={350}
                                height={350}
                                unoptimized
                                style={{
                                    objectFit: "cover",
                                    borderRadius: "16px",
                                    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.15)",
                                }}
                                priority
                            />
                        </Col>

                        {/* Right: Info */}
                        <Col md={5}>
                            <h2 className="fw-bold mb-2">{product.name}</h2>
                            <Badge bg="success" className="mb-3">
                                {product.category}
                            </Badge>

                            <p className="fw-bold fs-3 text-success mb-4">
                                ₹{product.price?.toLocaleString() ?? "—"}
                            </p>

                            <div className="text-secondary mb-4">
                                Ratings:{" "}
                                <Rating rating={product.reviews?.[0]?.rating ?? 0} max={5} />
                            </div>

                            <AddToCartButton product={product} />

                            <hr className="my-4" />
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <h5 className="fw-semibold mb-2">Product Details</h5>
                            <p className="text-secondary">{product.description}</p>
                            <p>
                                This product was available on this platform soon after the
                                Government announced special promotional law on natural products.
                            </p>
                            <hr />
                        </Col>
                    </Row>

                    {/* Lazy-loaded ProductBrief */}
                    <Row id="product-brief-section">
                        <Col>
                            {showBrief ? (
                                <Suspense fallback={<Spinner animation="border" />}>
                                    <ProductBrief product={product} />
                                </Suspense>
                            ) : (
                                <div className="text-center text-muted py-4">
                                    <Spinner animation="border" />
                                    <p className="mt-2">Loading details when ready...</p>
                                </div>
                            )}
                        </Col>
                    </Row>
                </Container>
            </div>
        </MainLayout>
    );
}

export async function getServerSideProps(context: { params: { id: string } }) {
    const { id } = context.params;
    const product = await getProductById(id);
    if (!product) return { notFound: true };

    return { props: { initialProduct: product } };
}
