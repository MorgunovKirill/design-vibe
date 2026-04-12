import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function PlatformLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        redirect("/sign-in");
    }

    return (
        <>
            <a
                href="#main-content"
                className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:bg-background focus:text-foreground focus:px-4 focus:py-2 focus:rounded-md focus:shadow-lg focus:outline-2 focus:outline-ring"
            >
                Skip to content
            </a>
            {children}
        </>
    );
}
