import React, { ReactNode, HTMLAttributes } from "react";
import styles from "./Card.module.css";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    className?: string;
}

interface CardTitleProps extends CardProps {
    as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

// Card.Img props: extend standard <img> attributes
interface CardImgProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    variant?: "top" | "bottom" | "rounded" | "circle";
}

type CardComponent = React.FC<CardProps> & {
    Header: React.FC<CardProps>;
    Body: React.FC<CardProps>;
    Footer: React.FC<CardProps>;
    Title: React.FC<CardTitleProps>;
    Text: React.FC<CardProps>;
    Img: React.FC<CardImgProps>;
};

// Main Card
const Card: CardComponent = ({ children, className = "", ...props }) => {
    return (
        <div className={`${styles.card} ${className}`} {...props}>
            {children}
        </div>
    );
};

// Subcomponents
Card.Header = ({ children, className = "", ...props }) => (
    <div className={`${styles.cardHeader} ${className}`} {...props}>
        {children}
    </div>
);

Card.Body = ({ children, className = "", ...props }) => (
    <div className={`${styles.cardBody} ${className}`} {...props}>
        {children}
    </div>
);

Card.Footer = ({ children, className = "", ...props }) => (
    <div className={`${styles.cardFooter} ${className}`} {...props}>
        {children}
    </div>
);

Card.Title = ({ children, className = "", as = "h5", ...props }) => {
    const Component = as;
    return (
        <Component className={`${styles.cardTitle} ${className}`} {...props}>
            {children}
        </Component>
    );
};

Card.Text = ({ children, className = "", ...props }) => (
    <p className={`${styles.cardText} ${className}`} {...props}>
        {children}
    </p>
);

Card.Img = ({ variant, className = "", ...props }: CardImgProps) => {
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

    return <img className={`${className} ${variantClass}`} {...props} />;
};

export { Card };
