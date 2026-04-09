export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-slate-50">
            {/* TODO: Add sidebar / navigation */}
            <main className="p-8">{children}</main>
        </div>
    );
}
