import React, {
    ReactNode,
    InputHTMLAttributes,
    TextareaHTMLAttributes,
    SelectHTMLAttributes,
    HTMLAttributes,
} from "react";
import styles from "./Form.module.css";

interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
    children: ReactNode;
    className?: string;
}

export const Form: React.FC<FormProps> & {
    Group: React.FC<FormGroupProps>;
    Label: React.FC<FormLabelProps>;
    Input: React.FC<FormInputProps>;
    TextArea: React.FC<FormTextAreaProps>;
    Select: React.FC<FormSelectProps>;
    Control: React.FC<FormControlProps>;
} = ({ children, className = "", ...props }) => {
    return (
        <form className={`${styles.form} ${className}`} {...props}>
            {children}
        </form>
    );
};

// ---------------------
// Form.Group
interface FormGroupProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    className?: string;
}
Form.Group = ({ children, className = "", ...props }) => (
    <div className={`${styles.formGroup} ${className}`} {...props}>
        {children}
    </div>
);
Form.Group.displayName = "Form.Group";
// Form.Label
interface FormLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
    children: ReactNode;
    htmlFor?: string;
    className?: string;
}
Form.Label = ({ children, htmlFor, className = "", ...props }) => (
    <label htmlFor={htmlFor} className={`${styles.label} ${className}`} {...props}>
        {children}
    </label>
);
Form.Label.displayName = "Form.Label";
// Form.Input
interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
    className?: string;
}
Form.Input = ({ className = "", ...props }) => (
    <input className={`${styles.input} ${className}`} {...props} />
);
Form.Input.displayName = "Form.Input";
// Form.TextArea
interface FormTextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    className?: string;
}
Form.TextArea = ({ className = "", ...props }) => (
    <textarea className={`${styles.textarea} ${className}`} {...props} />
);
Form.TextArea.displayName = "Form.TextArea";
// Form.Select
interface FormSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    className?: string;
}
Form.Select = ({ className = "", ...props }) => (
    <select className={`${styles.select} ${className}`} {...props} />
);
Form.Select.displayName = "Form.Select";
// ---------------------
// Form.Control: unified component
type ControlPropsBase = { as?: "input" | "textarea" | "select"; className?: string };

type FormControlProps =
    | (ControlPropsBase & InputHTMLAttributes<HTMLInputElement> & { as?: "input" })
    | (ControlPropsBase & TextareaHTMLAttributes<HTMLTextAreaElement> & { as: "textarea" })
    | (ControlPropsBase & SelectHTMLAttributes<HTMLSelectElement> & { as: "select" });

Form.Control = ({ as = "input", className = "", ...props }: FormControlProps) => {
    switch (as) {
        case "textarea":
            return <textarea className={`${styles.textarea} ${className}`} {...(props as TextareaHTMLAttributes<HTMLTextAreaElement>)} />;
        case "select":
            return <select className={`${styles.select} ${className}`} {...(props as SelectHTMLAttributes<HTMLSelectElement>)} />;
        case "input":
        default:
            return <input className={`${styles.input} ${className}`} {...(props as InputHTMLAttributes<HTMLInputElement>)} />;
    }
};
Form.Control.displayName = "Form.Control";
