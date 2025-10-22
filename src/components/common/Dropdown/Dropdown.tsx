import React, {
    createContext,
    useContext,
    useState,
    useRef,
    useEffect,
    ReactNode,
    ButtonHTMLAttributes,
    HTMLAttributes,
} from "react";
import styles from "./Dropdown.module.css";

// --------------------------------------------------
// Context
// --------------------------------------------------
interface DropdownContextProps {
    show: boolean;
    toggle: () => void;
    align: "start" | "end";
}

const DropdownContext = createContext<DropdownContextProps | undefined>(undefined);

const useDropdown = () => {
    const context = useContext(DropdownContext);
    if (!context) {
        throw new Error("Dropdown.Toggle, Dropdown.Menu, and Dropdown.Item must be used within a <Dropdown>");
    }
    return context;
};

// --------------------------------------------------
// Root Component
// --------------------------------------------------
interface DropdownProps {
    align?: "start" | "end";
    children: ReactNode;
    className?: string;
}

export const Dropdown: React.FC<DropdownProps> & {
    Toggle: React.FC<DropdownToggleProps>;
    Menu: React.FC<DropdownMenuProps>;
    Item: React.FC<DropdownItemProps>;
    Divider: React.FC;
} = ({ align = "start", children, className = "" }) => {
    const [show, setShow] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    const toggle = () => setShow((prev) => !prev);
    const close = () => setShow(false);

    // Close when clicking outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) close();
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <DropdownContext.Provider value={{ show, toggle, align }}>
            <div className={`${styles.dropdown} ${className}`} ref={ref}>
                {children}
            </div>
        </DropdownContext.Provider>
    );
};

// --------------------------------------------------
// Toggle
// --------------------------------------------------
interface DropdownToggleProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: string;
    id?: string;
    children: ReactNode;
}

const DropdownToggle: React.FC<DropdownToggleProps> = ({
    variant = "primary",
    id,
    children,
    className = "",
    ...props
}) => {
    const { toggle } = useDropdown();

    return (
        <button
            id={id}
            type="button"
            className={`${styles.toggle} ${styles[variant] || ""} ${className}`}
            onClick={toggle}
            {...props}
        >
            {children}
        </button>
    );
};

// --------------------------------------------------
// Menu
// --------------------------------------------------
interface DropdownMenuProps extends HTMLAttributes<HTMLUListElement> {
    children: ReactNode;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({
    children,
    className = "",
    ...props
}) => {
    const { show, align } = useDropdown();

    return (
        <ul
            className={`${styles.menu} ${show ? styles.show : ""} ${align === "end" ? styles.end : ""
                } ${className}`}
            {...props}
        >
            {children}
        </ul>
    );
};

// --------------------------------------------------
// Item
// --------------------------------------------------
interface DropdownItemProps extends React.HTMLAttributes<HTMLElement> {
    href?: string; // optional link
    onClick?: () => void; // optional action
    children: ReactNode;
    className?: string;
}

const DropdownItem: React.FC<DropdownItemProps> = ({
    href,
    onClick,
    children,
    className = "",
    ...props
}) => (
    <li>
        {href ? (
            <a href={href} className={`${styles.item} ${className}`} {...props}>
                {children}
            </a>
        ) : (
            <button
                type="button"
                onClick={onClick}
                className={`${styles.item} ${className}`}
                {...props}
            >
                {children}
            </button>
        )}
    </li>
);

// --------------------------------------------------
// Divider
// --------------------------------------------------
const DropdownDivider: React.FC = () => <li className={styles.divider} role="separator" />;

// Attach subcomponents
Dropdown.Toggle = DropdownToggle;
Dropdown.Menu = DropdownMenu;
Dropdown.Item = DropdownItem;
Dropdown.Divider = DropdownDivider;
