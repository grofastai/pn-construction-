import { cn } from "@/lib/utils";

interface LogoProps {
  variant?: "light" | "dark";
  className?: string;
}

export default function Logo({ variant = "dark", className }: LogoProps) {
  const textColor = variant === "light" ? "text-white" : "text-navy";
  const subColor = variant === "light" ? "text-white/70" : "text-muted";

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div
        className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-white"
        style={{
          background: "linear-gradient(135deg, var(--navy), var(--blue))",
        }}
        aria-hidden="true"
      >
        PN
      </div>
      <div className="leading-tight">
        <div className={cn("text-sm font-bold tracking-wide", textColor)}>
          PN CONSTRUCTION
        </div>
        <div className={cn("text-[10px] font-medium tracking-[0.2em]", subColor)}>
          BUILDERS
        </div>
      </div>
    </div>
  );
}
