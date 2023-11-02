import * as React from "react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, isLoading, ...props }, ref) => {
    return (
      <button className={className} ref={ref} disabled={isLoading} {...props}>
        {isLoading ? (
          <span className="loading loading-spinner">sending...</span>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = "Button";
