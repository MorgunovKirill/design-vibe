import { LogOut } from "lucide-react";
import { signOut } from "@/lib/actions/auth";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-background">
            <header className="flex items-center justify-end border-b border-border px-8 py-3">
                <form action={signOut}>
                    <button
                        type="submit"
                        className="flex cursor-pointer items-center gap-2 rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                        <LogOut className="size-4" />
                        Sign out
                    </button>
                </form>
            </header>
            <main id="main-content" className="p-8">
                {children}
            </main>
        </div>
    );
}
