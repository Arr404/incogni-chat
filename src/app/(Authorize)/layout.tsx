'use client'
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AuthorizeLayout({
                                            children,
                                        }: Readonly<{
    children: React.ReactNode;
}>) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const router = useRouter();

    useEffect(() => {
        // TO DO Implement isAuthenticated logic
        const checkAuth = async () => {
            setIsAuthenticated(true);
            /*if (!isAuthenticated) {
                router.push("/");
            }*/
        };

        checkAuth();
    }, [isAuthenticated, router]);

    if (!isAuthenticated) return null; // Prevent rendering children if not authenticated

    return <div>{children}</div>;
}
