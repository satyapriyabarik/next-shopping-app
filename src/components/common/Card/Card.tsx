// import React, { ReactNode, HTMLAttributes } from "react";
// import styles from "./Card.module.css";

// interface CardProps extends HTMLAttributes<HTMLDivElement> {
//     children: ReactNode;
//     className?: string;
// }

// interface CardTitleProps extends CardProps {
//     as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
// }

// // Card.Img props: extend standard <img> attributes
// interface CardImgProps extends React.ImgHTMLAttributes<HTMLImageElement> {
//     variant?: "top" | "bottom" | "rounded" | "circle";
// }

// type CardComponent = React.FC<CardProps> & {
//     Header: React.FC<CardProps>;
//     Body: React.FC<CardProps>;
//     Footer: React.FC<CardProps>;
//     Title: React.FC<CardTitleProps>;
//     Text: React.FC<CardProps>;
//     Img: React.FC<CardImgProps>;
// };

// // Main Card
// const Card: CardComponent = ({ children, className = "", ...props }) => {
//     return (
//         <div className={`${styles.card} ${className}`} {...props}>
//             {children}
//         </div>
//     );
// };

// // Subcomponents
// Card.Header = ({ children, className = "", ...props }) => (
//     <div className={`${styles.cardHeader} ${className}`} {...props}>
//         {children}
//     </div>
// );

// Card.Body = ({ children, className = "", ...props }) => (
//     <div className={`${styles.cardBody} ${className}`} {...props}>
//         {children}
//     </div>
// );

// Card.Footer = ({ children, className = "", ...props }) => (
//     <div className={`${styles.cardFooter} ${className}`} {...props}>
//         {children}
//     </div>
// );

// Card.Title = ({ children, className = "", as = "h5", ...props }) => {
//     const Component = as;
//     return (
//         <Component className={`${styles.cardTitle} ${className}`} {...props}>
//             {children}
//         </Component>
//     );
// };

// Card.Text = ({ children, className = "", ...props }) => (
//     <p className={`${styles.cardText} ${className}`} {...props}>
//         {children}
//     </p>
// );

// Card.Img = ({ variant, className = "", ...props }: CardImgProps) => {
//     let variantClass = "";

//     switch (variant) {
//         case "top":
//             variantClass = styles.top;
//             break;
//         case "bottom":
//             variantClass = styles.bottom;
//             break;
//         case "rounded":
//             variantClass = styles.rounded;
//             break;
//         case "circle":
//             variantClass = styles.circle;
//             break;
//     }

//     return <img className={`${className} ${variantClass}`} {...props} />;
// };

// export { Card };
import React, { ReactNode, HTMLAttributes, forwardRef } from "react";
import Image, { ImageProps } from "next/image";
import clsx from "clsx";
import styles from "./Card.module.css";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    className?: string;
}

interface CardTitleProps extends CardProps {
    as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

interface CardImgProps extends Omit<ImageProps, "alt"> {
    variant?: "top" | "bottom" | "rounded" | "circle";
    alt: string;
}

const CardBase = forwardRef<HTMLDivElement, CardProps>(
    ({ children, className = "", ...props }, ref) => (
        <div ref={ref} className={clsx(styles.card, className)} {...props}>
            {children}
        </div>
    )
);
CardBase.displayName = "Card";

const Header: React.FC<CardProps> = ({ children, className = "", ...props }) => (
    <div className={clsx(styles.cardHeader, className)} {...props}>
        {children}
    </div>
);
Header.displayName = "Card.Header";

const Body: React.FC<CardProps> = ({ children, className = "", ...props }) => (
    <div className={clsx(styles.cardBody, className)} {...props}>
        {children}
    </div>
);
Body.displayName = "Card.Body";

const Footer: React.FC<CardProps> = ({ children, className = "", ...props }) => (
    <div className={clsx(styles.cardFooter, className)} {...props}>
        {children}
    </div>
);
Footer.displayName = "Card.Footer";

const Title: React.FC<CardTitleProps> = ({
    children,
    className = "",
    as = "h5",
    ...props
}) => {
    const Component = as;
    return (
        <Component className={clsx(styles.cardTitle, className)} {...props}>
            {children}
        </Component>
    );
};
Title.displayName = "Card.Title";

const Text: React.FC<CardProps> = ({ children, className = "", ...props }) => (
    <p className={clsx(styles.cardText, className)} {...props}>
        {children}
    </p>
);
Text.displayName = "Card.Text";

const Img: React.FC<CardImgProps> = ({
    variant,
    className = "",
    alt,
    fill,
    width,
    height,
    style,
    ...props
}) => {
    let variantClass = "";

    switch (variant) {
        case "top":
            variantClass = styles.top;
            break;
        case "bottom":
            variantClass = styles.bottom;
            break;
        case "rounded":
            variantClass = styles.rounded;
            break;
        case "circle":
            variantClass = styles.circle;
            break;
    }

    const isFill = !!fill;

    return (
        <div
            className={clsx(styles.cardImageWrapper, variantClass, className)}
            style={{
                position: "relative",
                width: "100%",
                height: height ? `${height}px` : "250px", // default consistent height
                overflow: "hidden",
                borderRadius: "inherit",
            }}
        >
            <Image
                alt={alt}
                fill={isFill}
                width={!isFill ? width : undefined}
                height={!isFill ? height : undefined}
                className={clsx(styles.cardImage)}
                style={{
                    objectFit: "cover",
                    ...style,
                }}
                {...props}
            />
        </div>
    );
};

// ✅ Merge subcomponents in a type-safe way
export const Card = Object.assign(CardBase, {
    Header,
    Body,
    Footer,
    Title,
    Text,
    Img,
});

export default Card;
