"use client"

import LayoutAdmin from "@/app/layouts/admin/LayoutAdmin";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export const metadata = {
    title: 'About',
    openGraph: {
        title: 'User'
    }
}

export default function Pangkat() {
    const router = useRouter();
    const [pangkat, setPangkat] = useState(null);
    const [msgSuccess, setMsgSuccess] = useState("");
    const [msgError, setMsgError] = useState("");
    const [status, setStatus] = useState("");

    async function getPangkat() {
        const res = await fetch(
            `http://localhost:5000/admin/pangkat`, {
            method: "GET",
            headers: {
                "Content-type": "application/json"
            },
        }
        );
        const response = await res.json();
        setPangkat(response);
    };

    async function deletePangkat(pangkatId) {
        const del = await fetch(
            `http://localhost:5000/admin/pangkat/${pangkatId}`, {
            method: "DELETE",
            headers: {
                "Content-type": "application/json"
            },
        }
        );
        const hapus = await del.json();
        if (hapus.st == 'ok') {
            setMsgSuccess(hapus.msg);
            setStatus(hapus.st);
            router.replace('/admin/pangkat');
        } else if (hapus.st == 'fail') {
            setMsgError(hapus.msg);
            setStatus(hapus.st);
        }
    }


    useEffect(() => {
        getPangkat();
    }, []);

    return (
        <LayoutAdmin>
            <div className='grid grid-cols-1 gap-6 sm:grid-cols-2'>
                <h2 className="flex title mb-5 text-2xl font-extrabold dark:text-white">
                    <svg class="w-8 h-8 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m13 19-6-5-6 5V2a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v17Z" />
                        <svg class="w-5 h-5 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 12">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5 5 1 1 5m8 6L5 7l-4 4" />
                        </svg>
                    </svg>
                    <span className="flex-1 ml-2 whitespace-nowrap">Pangkat</span>
                </h2>
                <Link href="/admin/pangkat/add" className="flex fixed top-22 right-7 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-xs px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                    <svg className="w-4 h-4 mr-1 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 5.757v8.486M5.757 10h8.486M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                    <span>Tambah Pangkat</span>
                </Link>
            </div>

            {/* ERROR MESSAGE */}
            {
                status === 'ok'
                    ? <div class="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
                        <span class="font-medium">Success!</span> {msgSuccess}
                    </div>
                    :
                    ''
            }
            {
                status === 'fail'
                    ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                        <span className="font-medium">Error!</span> {msgError}
                    </div>
                    : ''
            }

            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                #
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Nama Pangkat
                            </th>
                            <th scope="col" className="px-6 py-3">
                                <span className="sr-only">Edit</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {pangkat && pangkat.map((pang, index) => {
                            return (
                                <tr key={pang.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <td className="px-6 py-4">{index + 1}</td>
                                    <td className="px-6 py-4">{pang.nama_pangkat}</td>
                                    <td className="px-6 py-4 text-center">
                                        <a href={`/admin/pangkat/edit/${pang.id}`} className="inline-flex items-center focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-xs px-5 py-2.5 mr-2 mb-2 dark:focus:ring-yellow-900">
                                            <svg className="w-4 h-4 mr-1 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                                                <path d="M12.687 14.408a3.01 3.01 0 0 1-1.533.821l-3.566.713a3 3 0 0 1-3.53-3.53l.713-3.566a3.01 3.01 0 0 1 .821-1.533L10.905 2H2.167A2.169 2.169 0 0 0 0 4.167v11.666A2.169 2.169 0 0 0 2.167 18h11.666A2.169 2.169 0 0 0 16 15.833V11.1l-3.313 3.308Zm5.53-9.065.546-.546a2.518 2.518 0 0 0 0-3.56 2.576 2.576 0 0 0-3.559 0l-.547.547 3.56 3.56Z" />
                                                <path d="M13.243 3.2 7.359 9.081a.5.5 0 0 0-.136.256L6.51 12.9a.5.5 0 0 0 .59.59l3.566-.713a.5.5 0 0 0 .255-.136L16.8 6.757 13.243 3.2Z" />
                                            </svg> Edit
                                        </a>
                                        <button onClick={() => deletePangkat(pang.id)} type="button" className="button inline-flex items-center focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-xs px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
                                            <svg className="w-4 h-4 mr-1 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                                                <path d="M17 4h-4V2a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v2H1a1 1 0 0 0 0 2h1v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6h1a1 1 0 1 0 0-2ZM7 2h4v2H7V2Zm1 14a1 1 0 1 1-2 0V8a1 1 0 0 1 2 0v8Zm4 0a1 1 0 0 1-2 0V8a1 1 0 0 1 2 0v8Z" />
                                            </svg>
                                            <span>Hapus</span>
                                        </button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </LayoutAdmin>
    )
}
