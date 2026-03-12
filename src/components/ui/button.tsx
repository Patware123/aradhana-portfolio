import { ReactNode } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
  children: ReactNode;
}

export function Button({ variant = "primary", className = "", children, ...props }: ButtonProps) {
  const baseStyles = "inline-flex items-center justify-center px-6 py-3 rounded-full font-medium transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2";
  
  const variants = {
    primary: "bg-primary text-white hover:bg-primary-light shadow-md hover:shadow-lg",
    secondary: "bg-secondary text-primary hover:bg-[#d8c8af] shadow-sm",
    outline: "border-2 border-primary text-primary hover:bg-primary hover:text-white"
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${props.disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`} {...props}>
      {children}
    </button>
  );
}
