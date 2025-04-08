'use client'
import React from "react";


export default function AuthorizeLayout({
                                            children,
                                        }: Readonly<{
    children: React.ReactNode;
}>) {


    return <div>{children}</div>;
}
