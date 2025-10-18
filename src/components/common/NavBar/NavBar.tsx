import React, { ReactNode, useState } from "react";
import Link from "next/link";
import styles from "./NavBar.module.css";

// ---------------------- Props ----------------------
interface NavBarProps {
    bg?: "light" | "dark" | "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "transparent";
    variant?: "light" | "dark";
    expand?: "sm" | "md" | "lg" | "xl" | "xxl";
    children: ReactNode;
    className?: string;
}

interface BrandProps {
    href?: string;
    children: ReactNode;
}

interface ToggleProps {
    ariaControls: string;
    onClick?: () => void;
}

interface CollapseProps {
    id: string;
    children: ReactNode;
    show?: boolean;
}

interface NavProps {
    children: ReactNode;
    className?: string;
}

interface NavLinkProps {
    href: string;
    children: ReactNode;
    active?: boolean;
}

// ---------------------- Type Guard ----------------------
function isNavBarChild<P>(
    child: React.ReactNode,
    displayName: string
): child is React.ReactElement<P> & { type: { displayName?: string } } {
    return (
        React.isValidElement(child) &&
        typeof child.type === "function" &&
        (child.type as { displayName?: string }).displayName === displayName
    );
}

// ---------------------- NavBar ----------------------
export const NavBar: React.FC<NavBarProps> & {
    Brand: React.FC<BrandProps>;
    Toggle: React.FC<ToggleProps>;
    Collapse: React.FC<CollapseProps>;
    Nav: React.FC<NavProps> & { Link: React.FC<NavLinkProps> };
} = ({
    bg = "light",
    variant = "light",
    expand = "lg",
    children,
    className = "",
}) => {
        const [expanded, setExpanded] = useState(false);

        return (
            <nav
                className={`${styles.navbar} ${styles[`bg-${bg}`]} ${styles[`navbar-${variant}`]} ${styles[`expand-${expand}`]} ${className}`}
            >
                {React.Children.map(children, (child) => {
                    if (!React.isValidElement(child)) return child;

                    // Toggle
                    if (isNavBarChild<ToggleProps>(child, "NavBar.Toggle")) {
                        return React.cloneElement(child, {
                            onClick: () => setExpanded((prev) => !prev),
                        });
                    }

                    // Collapse
                    if (isNavBarChild<CollapseProps>(child, "NavBar.Collapse")) {
                        return React.cloneElement(child, {
                            show: expanded,
                        });
                    }

                    return child;
                })}
            </nav>
        );
    };
NavBar.displayName = "NavBar";

// ---------------------- Brand ----------------------
const Brand: React.FC<BrandProps> = ({ href = "/", children }) => (
    <Link
        href={href}
        className={`${styles.brand} d-flex align-items-center text-decoration-none`}
    >
        {children}
    </Link>
);
Brand.displayName = "NavBar.Brand";

// ---------------------- Toggle ----------------------
const Toggle: React.FC<ToggleProps> = ({ ariaControls, onClick }) => (
    <button
        type="button"
        className={styles.toggle}
        aria-controls={ariaControls}
        aria-label="Toggle navigation"
        onClick={onClick}
    >
        <span className={styles.bar}></span>
        <span className={styles.bar}></span>
        <span className={styles.bar}></span>
    </button>
);
Toggle.displayName = "NavBar.Toggle";

// ---------------------- Collapse ----------------------
const Collapse: React.FC<CollapseProps> = ({ id, children, show = false }) => (
    <div id={id} className={`${styles.collapse} ${show ? styles.show : ""}`}>
        {children}
    </div>
);
Collapse.displayName = "NavBar.Collapse";

// ---------------------- Nav ----------------------
const Nav: React.FC<NavProps> & { Link: React.FC<NavLinkProps> } = ({ children, className = "" }) => (
    <ul className={`${styles.nav} ${className}`}>{children}</ul>
);

const NavLink: React.FC<NavLinkProps> = ({ href, children, active = false }) => (
    <li>
        <Link href={href} className={`${styles.navLink} ${active ? styles.active : ""}`}>
            {children}
        </Link>
    </li>
);

Nav.Link = NavLink;
Nav.displayName = "NavBar.Nav";

// ---------------------- Assign Subcomponents ----------------------
NavBar.Brand = Brand;
NavBar.Toggle = Toggle;
NavBar.Collapse = Collapse;
NavBar.Nav = Nav;

export default NavBar;
