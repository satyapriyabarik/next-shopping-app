// import React, { ReactNode, HTMLAttributes } from "react";
// import Link, { LinkProps } from "next/link";
// import styles from "./ListGroup.module.css";

// // Base props for ListGroup
// interface ListGroupProps extends HTMLAttributes<HTMLUListElement> {
//     children: ReactNode;
//     className?: string;
//     flush?: boolean;
// }

// // Base props for ListGroup.Item
// type BaseItemProps = {
//     children: ReactNode;
//     className?: string;
//     active?: boolean;
//     disabled?: boolean;
//     action?: boolean;
// } & HTMLAttributes<HTMLElement>;

// // Discriminated union for ListGroup.Item
// export type ListGroupItemProps =
//     | (BaseItemProps & { as?: "li" | "button"; href?: never })
//     | (BaseItemProps & { as?: "a"; href?: string })
//     | (BaseItemProps & { as: typeof Link; href: string });

// // Type guard to check if props are for Link
// const isNextLink = (
//     as: any,
//     props: ListGroupItemProps
// ): props is BaseItemProps & { as: typeof Link; href: string } => {
//     return as === Link;
// };

// // ListGroup container
// export const ListGroup: React.FC<ListGroupProps> & {
//     Item: React.FC<ListGroupItemProps>;
// } = ({ children, className = "", flush = false, ...props }) => {
//     return (
//         <ul
//             className={`${styles.listGroup} ${flush ? styles.flush : ""} ${className}`}
//             {...props}
//         >
//             {children}
//         </ul>
//     );
// };

// // ListGroup.Item
// ListGroup.Item = ({
//     children,
//     className = "",
//     active = false,
//     disabled = false,
//     action = false,
//     as: Component = "li",
//     href,
//     ...props
// }: ListGroupItemProps) => {
//     const classes = [
//         styles.listGroupItem,
//         active ? styles.active : "",
//         disabled ? styles.disabled : "",
//         action ? styles.action : "",
//         className,
//     ].join(" ");

//     // -----------------------------
//     // Next.js Link
//     if (Component === Link) {
//         if (!href) {
//             console.warn("ListGroup.Item with as={Link} requires an href prop!");
//             return null;
//         }
//         // Cast props to Omit<LinkProps, "href"> to avoid type errors
//         const linkProps = props as Omit<LinkProps, "href">;

//         return (
//             <Link href={href} {...linkProps} passHref>
//                 <a className={classes}>{children}</a>
//             </Link>
//         );
//     }

//     // -----------------------------
//     // Anchor tag
//     if (Component === "a") {
//         return (
//             <a href={href} className={classes} {...props}>
//                 {children}
//             </a>
//         );
//     }


// };

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
// Type Guard
// --------------------
// const isNextLink = (
//     as: any,
//     props: ListGroupItemProps
// ): props is BaseItemProps & { as: typeof Link; href: string } => {
//     return as === Link;
// };

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
