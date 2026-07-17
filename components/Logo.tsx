import Image from "next/image";
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
      <Image
        src="/icons/pn-logo-mark.png"
        alt="PN Construction Builders"
        width={604}
        height={627}
        className="h-11 w-auto object-contain"
        priority
      />
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
