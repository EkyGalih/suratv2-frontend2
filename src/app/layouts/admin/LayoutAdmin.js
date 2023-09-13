'use client'

import { useEffect, useState } from "react";
import FooterAdmin from "./FooterAdmin";
import NavbarAdmin from "./NavbarAdmin";
import SidebarAdmin from "./SidebarAdmin";
import axios from "axios";

export default function LayoutAdmin({ children }) {
    const [user, setUser] = useState("");

    useEffect(() => {
        getMe();
    }, []);

    async function getMe() {
        try {
            const response = await axios.get(`http://localhost:5000/me/${sessionStorage.getItem('userId')}`);
            setUser(response.data);;
        } catch (error) {
            if (error.response) {
                console.log(error.response);
            }
        }
    }

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
