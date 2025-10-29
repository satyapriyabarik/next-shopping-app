import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import BackToTop from "@/components/backToTop/BackToTop";

describe("BackToTop Component", () => {
    beforeEach(() => {
        // reset scroll position
        Object.defineProperty(window, "pageYOffset", {
            value: 0,
            writable: true,
        });
        jest.clearAllMocks();
    });

    it("does not show button initially", () => {
        render(<BackToTop />);
        expect(screen.queryByLabelText(/back to top/i)).not.toBeInTheDocument();
    });

    it("shows button when scrolled more than 300px", () => {
        render(<BackToTop />);

        act(() => {
            Object.defineProperty(window, "pageYOffset", { value: 400 });
            window.dispatchEvent(new Event("scroll"));
        });

        expect(screen.getByLabelText(/back to top/i)).toBeInTheDocument();
    });

    it("hides button when scrolled less than 300px", () => {
        render(<BackToTop />);

        act(() => {
            Object.defineProperty(window, "pageYOffset", { value: 400 });
            window.dispatchEvent(new Event("scroll"));
        });
        expect(screen.getByLabelText(/back to top/i)).toBeInTheDocument();

        act(() => {
            Object.defineProperty(window, "pageYOffset", { value: 100 });
            window.dispatchEvent(new Event("scroll"));
        });
        expect(screen.queryByLabelText(/back to top/i)).not.toBeInTheDocument();
    });

    it("calls window.scrollTo with smooth behavior when clicked", () => {
        const scrollMock = jest.fn();
        window.scrollTo = scrollMock;

        render(<BackToTop />);

        act(() => {
            Object.defineProperty(window, "pageYOffset", { value: 400 });
            window.dispatchEvent(new Event("scroll"));
        });

        const button = screen.getByLabelText(/back to top/i);
        fireEvent.click(button);

        expect(scrollMock).toHaveBeenCalledWith({ top: 0, behavior: "smooth" });
    });

    it("cleans up scroll event listener on unmount", () => {
        const removeEventListenerSpy = jest.spyOn(window, "removeEventListener");
        const { unmount } = render(<BackToTop />);
        unmount();
        expect(removeEventListenerSpy).toHaveBeenCalledWith("scroll", expect.any(Function));
    });
});
