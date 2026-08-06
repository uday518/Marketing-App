import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  iconOnly?: ReactNode;
  fullWidth?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-brand-primary text-text-on-brand hover:bg-brand-primary-hover active:bg-brand-primary-active disabled:bg-neutral-300 disabled:text-neutral-500 focus:ring-2 focus:ring-brand-primary/50',
  secondary:
    'border-2 border-brand-primary bg-white text-brand-primary hover:bg-brand-tint active:bg-brand-tint/80 disabled:border-neutral-300 disabled:text-neutral-400 focus:ring-2 focus:ring-brand-primary/50',
  outline:
    'border border-brand-primary bg-white text-brand-primary hover:bg-brand-tint active:bg-brand-tint/80 disabled:border-neutral-300 disabled:text-neutral-400 focus:ring-2 focus:ring-brand-primary/50',
  ghost:
    'bg-transparent text-brand-primary hover:bg-brand-tint active:bg-brand-tint/80 disabled:text-neutral-400 focus:ring-2 focus:ring-brand-primary/50',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'h-8 px-3 py-2 text-xs gap-1.5 rounded-lg',
  md: 'h-10 px-4 py-2.5 text-sm gap-2 rounded-lg',
  lg: 'h-12 px-6 py-3 text-base gap-2.5 rounded-lg',
};

const iconOnlySizeStyles: Record<ButtonSize, string> = {
  sm: 'h-6 min-w-6 px-2 rounded-lg',
  md: 'h-8 min-w-8 px-2.5 rounded-lg',
  lg: 'h-10 min-w-10 px-3 rounded-lg',
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      iconLeft,
      iconRight,
      iconOnly,
      fullWidth = false,
      className = '',
      disabled,
      children,
      ...props
    },
    ref,
  ) => {
    const base =
      'inline-flex items-center justify-center font-bold transition-colors duration-150 focus:outline-none disabled:cursor-not-allowed';

    if (iconOnly) {
      return (
        <button
          ref={ref}
          disabled={disabled}
          className={`${base} ${iconOnlySizeStyles[size]} ${variantStyles[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
          aria-label={props['aria-label'] || 'Icon button'}
          {...props}
        >
          {iconOnly}
        </button>
      );
    }

    return (
      <button
        ref={ref}
        disabled={disabled}
        className={`${base} ${sizeStyles[size]} ${variantStyles[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
        {...props}
      >
        {iconLeft && (
          <span className="shrink-0 [&>svg]:h-4 [&>svg]:w-4">{iconLeft}</span>
        )}
        {children && <span>{children}</span>}
        {iconRight && (
          <span className="shrink-0 [&>svg]:h-4 [&>svg]:w-4">{iconRight}</span>
        )}
      </button>
    );
  },
);

Button.displayName = 'Button';

export default Button;
export type { ButtonProps, ButtonVariant, ButtonSize };
