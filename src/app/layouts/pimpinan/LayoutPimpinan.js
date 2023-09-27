'use client'

import { useRouter } from "next/navigation";
import FooterUser from "./FooterPimpinan";
import NavbarUser from "./NavbarPimpinan";
import SidebarUser from "./SidebarPimpinan";
import { useEffect } from "react";

export default function LayoutPimpinan({ children }) {
    const router = useRouter();

    useEffect(() => {
        const level = sessionStorage.getItem('level');
        if (level === null) {
            router.push('/');
        } else if (level !== 'pimpinan') {
            router.back();
        }
    }, []);
    return (
        <>
            <NavbarUser />
            <SidebarUser />
            <div className="p-4 sm:ml-64">
                <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
                    <main>{children}</main>
                </div>
                <FooterUser />
            </div>
        </>
    )
}
