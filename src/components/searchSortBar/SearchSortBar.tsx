"use client";
import { Form } from "../common/Form/Form";
import { Col, Row } from "../common/Grid/Grid";
import { InputGroup } from "../common/InputGroup/InputGroup";

export default function SearchSortBar({
    search,
    setSearch,
    sortBy,
    setSortBy,
}: {
    search: string;
    setSearch: (v: string) => void;
    sortBy: string;
    setSortBy: (v: string) => void;
}) {
    return (
        <Row className="mb-4 justify-content-center">
            <Col md={4} className="mb-2">
                <InputGroup>
                    <InputGroup.Text>🔍</InputGroup.Text>
                    <Form.Control
                        type="text"
                        placeholder="Search by name..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        id="search-featured"
                    />
                </InputGroup>
            </Col>
            <Col md={2} className="mb-2">
                <Form.Select value={sortBy} onChange={(e) => setSortBy(e.target.value)} aria-label="Sort products" id="sort-featured" className="py-2 text-secondary">
                    <option value="">Sort by...</option>
                    <option value="name">Name (A-Z)</option>
                    <option value="price">Price (Low-High)</option>
                </Form.Select>
            </Col>
        </Row>
    );
}
