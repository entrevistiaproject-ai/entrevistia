import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  iconClassName?: string;
  textClassName?: string;
  showText?: boolean;
  size?: "sm" | "md" | "lg" | "xl";
}

const sizeConfig = {
  sm: { icon: "h-6 w-6", text: "text-base" },
  md: { icon: "h-8 w-8", text: "text-xl" },
  lg: { icon: "h-10 w-10", text: "text-2xl" },
  xl: { icon: "h-12 w-12", text: "text-3xl" },
};

export function Logo({
  className,
  iconClassName,
  textClassName,
  showText = true,
  size = "md",
}: LogoProps) {
  const { icon, text } = sizeConfig[size];

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <LogoIcon className={cn(icon, iconClassName)} />
      {showText && (
        <span className={cn("font-bold tracking-tight", text, textClassName)}>
          Entrevist<span className="text-primary">IA</span>
        </span>
      )}
    </div>
  );
}

interface LogoIconProps {
  className?: string;
}

export function LogoIcon({ className }: LogoIconProps) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("text-primary", className)}
    >
      {/* Background circle with gradient */}
      <defs>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="currentColor" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.7" />
        </linearGradient>
        <linearGradient id="innerGradient" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="white" stopOpacity="0.9" />
          <stop offset="100%" stopColor="white" />
        </linearGradient>
      </defs>

      {/* Main circle */}
      <circle cx="20" cy="20" r="18" fill="url(#logoGradient)" />

      {/* Speech bubble / Interview icon */}
      <path
        d="M12 14C12 12.8954 12.8954 12 14 12H26C27.1046 12 28 12.8954 28 14V22C28 23.1046 27.1046 24 26 24H22L18 28V24H14C12.8954 24 12 23.1046 12 22V14Z"
        fill="url(#innerGradient)"
      />

      {/* AI brain dots pattern */}
      <circle cx="16" cy="17" r="1.5" fill="currentColor" />
      <circle cx="20" cy="17" r="1.5" fill="currentColor" />
      <circle cx="24" cy="17" r="1.5" fill="currentColor" />

      {/* Connection lines (neural network style) */}
      <path
        d="M16.5 17.5L19.5 20M20.5 17.5L20.5 20M23.5 17.5L20.5 20"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.6"
      />

      {/* Bottom dot */}
      <circle cx="20" cy="20.5" r="1" fill="currentColor" />
    </svg>
  );
}

// Favicon version (simplified for small sizes)
export function LogoFavicon({ className }: LogoIconProps) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="faviconGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
      </defs>

      {/* Main circle */}
      <circle cx="16" cy="16" r="14" fill="url(#faviconGradient)" />

      {/* Speech bubble */}
      <path
        d="M9 11C9 10.4477 9.44772 10 10 10H22C22.5523 10 23 10.4477 23 11V18C23 18.5523 22.5523 19 22 19H18L15 22V19H10C9.44772 19 9 18.5523 9 18V11Z"
        fill="white"
      />

      {/* AI dots */}
      <circle cx="12.5" cy="14" r="1.2" fill="#3b82f6" />
      <circle cx="16" cy="14" r="1.2" fill="#3b82f6" />
      <circle cx="19.5" cy="14" r="1.2" fill="#3b82f6" />
    </svg>
  );
}
