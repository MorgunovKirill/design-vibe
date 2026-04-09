import Link from "next/link";
import { LayoutDashboard } from "lucide-react";

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#08090d]">
            {/* Animated gradient orbs */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-violet-600/15 blur-[120px] animate-pulse" />
                <div className="absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-cyan-500/10 blur-[120px] animate-pulse [animation-delay:2s]" />
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[300px] w-[300px] rounded-full bg-indigo-500/8 blur-[100px] animate-pulse [animation-delay:4s]" />
            </div>

            {/* Dot grid pattern */}
            <div
                className="pointer-events-none absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
                    backgroundSize: "32px 32px",
                }}
            />

            {/* Subtle top border glow */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-500/50 to-transparent" />

            {/* Logo */}
            <Link
                href="/"
                className="absolute left-6 top-6 flex items-center gap-2 text-lg font-bold text-white/90 transition-colors hover:text-white z-10"
            >
                <LayoutDashboard className="h-5 w-5 text-violet-400" />
                Taskflow
            </Link>

            {/* Content */}
            <div className="relative z-10 w-full px-4">
                {children}
            </div>
        </div>
    );
}
