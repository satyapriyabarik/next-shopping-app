import { Product } from "@/types/Product";
import Link from "next/link";
import AddToCartButton from "../addToCart/AddToCartButton";
import { Card } from "../common/Card/Card";
import Rating from "../rating/Rating";
import { Col, Row } from "../common/Grid/Grid";

interface ProductGridProps {
    products: Product[];
}

export default function ProductGrid({ products }: ProductGridProps) {
    if (!products.length)
        return <p className="text-center text-muted">No products found.</p>;

    return (
        <Row className="g-4 justify-content-center">
            {products.map((p) => (
                <Col
                    key={p.id}
                    xs={12}
                    sm={6}
                    md={4}
                    lg={3}
                    xl={3}
                    className="product-col mb-4"
                >
                    <Card className="h-100 shadow-lg border-0 hover-zoom product-card">
                        <Link href={`/productDetails/${p.id}`}>
                            <Card.Img
                                variant="top"
                                src={p.image}
                                alt={p.name}
                                className="p-2 rounded"
                                style={{ width: "100%", height: "220px", objectFit: "cover" }}
                            />
                        </Link>

                        <Card.Body className="text-center">
                            <Card.Title className="fs-5 text-dark">{p.name}</Card.Title>
                            <Card.Text className="text-muted small mb-1">{p.category}</Card.Text>
                            <Card.Text className="fw-bold text-success fs-6 mb-2">
                                ₹{p.price ?? "—"}
                            </Card.Text>
                            <div style={{ paddingLeft: '30%' }}><Rating rating={p.reviews[0].rating} max={5} /></div>
                        </Card.Body>

                        <Card.Footer className="bg-white border-0 text-center">

                            <AddToCartButton product={p} />
                        </Card.Footer>
                    </Card>
                </Col>
            ))}
        </Row>
    );
}
