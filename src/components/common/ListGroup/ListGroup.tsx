
import React, { ReactNode, HTMLAttributes, isValidElement } from "react";
import styles from "./ListGroup.module.css";

// --------------------
// ListGroup Props
// --------------------
interface ListGroupProps extends HTMLAttributes<HTMLUListElement> {
    children?: ReactNode;
    className?: string;
    flush?: boolean;
    emptyMessage?: string;
}

// --------------------
// Base Item Props
// --------------------
type BaseItemProps = {
    children: ReactNode;
    className?: string;
    active?: boolean;
    disabled?: boolean;
    action?: boolean;
} & HTMLAttributes<HTMLElement>;

// --------------------
// Union Types
// --------------------
export type ListGroupItemProps =
    | (BaseItemProps & { as?: "li" | "button"; href?: never })
    | (BaseItemProps & { as?: "Link"; href?: string })


// --------------------
// ListGroup Container
// --------------------
export const ListGroup: React.FC<ListGroupProps> & {
    Item: React.FC<ListGroupItemProps>;
} = ({
    children,
    className = "",
    flush = false,
    emptyMessage = "No results found.",
    ...props
}) => {
        // Determine if we have valid child elements (like ListGroup.Item)
        const hasChildren =
            React.Children.count(children) > 0 &&
            React.Children.toArray(children).some(isValidElement);

        return (
            <ul
                className={`${styles.listGroup} ${flush ? styles.flush : ""} ${className}`}
                {...props}
            >
                {hasChildren ? (
                    children
                ) : (
                    <li className={`${styles.listGroupItem} ${styles.empty}`}>
                        {emptyMessage}
                    </li>
                )}
            </ul>
        );
    };

// --------------------
// ListGroup.Item
// --------------------
ListGroup.Item = ({
    children,
    className = "",
    active = false,
    disabled = false,
    action = false,
    as: Component = "li",
    href,
    ...props
}: ListGroupItemProps) => {
    const classes = [
        styles.listGroupItem,
        active ? styles.active : "",
        disabled ? styles.disabled : "",
        action ? styles.action : "",
        className,
    ]
        .filter(Boolean)
        .join(" ");



    // ----- Anchor tag -----
    if (Component === "Link") {
        return (
            <a href={href} className={classes} {...props}>
                {children}
            </a>
        );
    }

};
ListGroup.Item.displayName = "ListGroup.Item";
