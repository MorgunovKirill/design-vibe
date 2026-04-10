export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-background">
            {/* TODO: Add sidebar / navigation */}
            <main id="main-content" className="p-8">{children}</main>
        </div>
    );
}
