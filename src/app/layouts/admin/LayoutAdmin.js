'use client'

import { useEffect } from "react";
import FooterAdmin from "./FooterAdmin";
import NavbarAdmin from "./NavbarAdmin";
import SidebarAdmin from "./SidebarAdmin";
import { useRouter } from "next/navigation";

export default function LayoutAdmin({ children }) {
    const router = useRouter();

    useEffect(() => {
        const level = sessionStorage.getItem('level');
        if (level === null) {
            router.push('/');
        } else if (level !== 'admin') {
            router.back();
        }
    }, []);

    return (
        <>
            <NavbarAdmin />
            <SidebarAdmin />
            <div className="p-4 sm:ml-64">
                <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
                    <main>{children}</main>
                </div>
                <FooterAdmin />
            </div>
        </>
    )
}
