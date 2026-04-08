// TODO: Add authentication guard here
// Redirect unauthenticated users to /sign-in

export default function PlatformLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
