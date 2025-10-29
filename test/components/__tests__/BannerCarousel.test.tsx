import BannerCarousel from "@/components/carousel/BannerCarousel";
import { render, screen } from "@testing-library/react";

// ✅ Mock next/image to avoid DOM warnings about `priority`
jest.mock("next/image", () => (props: any) => (
    <img {...props} alt={props.alt} data-testid="next-image" />
));

// ✅ Mock Carousel component correctly inside the jest.mock callback
jest.mock("@/components/common/Carousel/Carousel", () => {
    const React = require("react");

    const MockCarousel = ({ children, ...props }: any) => (
        <div data-testid="carousel" {...props}>
            {children}
        </div>
    );

    MockCarousel.Item = ({ children }: any) => (
        <div data-testid="carousel-item">{children}</div>
    );

    MockCarousel.Caption = ({ children }: any) => (
        <div data-testid="carousel-caption">{children}</div>
    );

    return { Carousel: MockCarousel };
});

describe("BannerCarousel", () => {
    it("renders two carousel items", () => {
        render(<BannerCarousel />);
        const items = screen.getAllByTestId("carousel-item");
        expect(items).toHaveLength(2);
    });

    it("renders banner images", () => {
        render(<BannerCarousel />);
        const images = screen.getAllByAltText(/Banner/i);
        expect(images).toHaveLength(2);
    });

    it("renders captions with correct text", () => {
        render(<BannerCarousel />);
        expect(screen.getByText("Welcome to GreenKart")).toBeInTheDocument();
        expect(screen.getByText("Fresh Arrivals Weekly")).toBeInTheDocument();
    });
});
