'use client'

import LayoutAdmin from "@/app/layouts/admin/LayoutAdmin";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AddUser() {
    const [pegawai, setPegawai] = useState([]);

    const [pegawaiId, setPegawaiId] = useState("");
    const [nama_lengkap, setNama] = useState("");
    const [username, setUsername] = useState("");
    const [nip, setNip] = useState("");
    const [password, setPass] = useState("");
    const [confPass, setConfPass] = useState("");
    const [level, setLevel] = useState("");
    const [msg, setMsg] = useState("");
    const router = useRouter();

    async function getPegawai() {
        const metaData = {
            method: "GET",
            headers: {
                "Content-type": "application/json"
            },
        };
        const peg = await fetch(
            `http://localhost:5000/admin/pegawais`,
            metaData
        );
        const pegawai = await peg.json();
        setPegawai(pegawai);
    };

    async function handleChange(e) {
        const metaData = {
            method: "GET",
            headers: {
                "Content-type": "application/json"
            },
        };
        const pegId = e.target.value;
        const res = await fetch(
            `http://localhost:5000/admin/pegawai/${pegId}`,
            metaData
        );
        const response = await res.json();
        setPegawaiId(response.id);
        setNip(response.nip);
        setNama(response.name);
        setUsername(response.nip);
        setPass(response.nip);
        setConfPass(response.nip);
    };

    const saveUser = async (e) => {
        e.preventDefault();


        const res = await fetch(
            'http://localhost:5000/admin/users', {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                nama_lengkap: nama_lengkap,
                level: level,
                pegawaiId: pegawaiId,
                username: username,
                password: password,
                confPassword: confPass
            }),
        });
        const response = await res.json();
        if (response.msg == 'User created') {
            router.push('/admin/user')
        } else {
            setMsg(response.msg);
        }

    }

    useEffect(() => {
        getPegawai();
    }, []);

    return (
        <LayoutAdmin>
            <div className='grid grid-cols-1 gap-6 sm:grid-cols-2'>
                <h2 className="flex mb-5 text-2xl font-extrabold dark:text-white">
                    <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                        <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
                    </svg>
                    <span className="flex-1 ml-2 whitespace-nowrap">Users</span>
                </h2>
            </div>
            <nav className="flex mb-5" aria-label="Breadcrumb">
                <ol className="inline-flex items-center space-x-1 md:space-x-3">
                    <li className="inline-flex items-center">
                        <a href="/admin/user" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
                            <svg className="w-3 h-3 mr-2 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 10">
                                <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M6 1h10M6 5h10M6 9h10M1.49 1h.01m-.01 4h.01m-.01 4h.01" />
                            </svg>
                            User
                        </a>
                    </li>
                    <li>
                        <div className="flex items-center">
                            <svg className="w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4" />
                            </svg>
                            <a href="#" className="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2 dark:text-gray-400 dark:hover:text-white">Add User</a>
                        </div>
                    </li>
                </ol>
            </nav>
            <hr className='mb-3' />

            {/* ERROR MESSAGE */}
            {msg === "" ? '' :
                <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                    <span className="font-medium">Error!</span> {msg}
                </div>
            }

            <form onSubmit={saveUser}>
                <div className='mb-6'>
                    <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Pilih Pegawai</label>
                    <select id="countries" onChange={handleChange} className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={pegawaiId}>
                        <option value="">Pilih</option>
                        {pegawai.map((peg, index) => {
                            return (
                                <option key={peg.id} value={peg.id}>{peg.name}</option>
                            )
                        })}
                    </select>
                </div>
                <div className='mb-6'>
                    <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Pilih Level</label>
                    <select id="countries" className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={level} onChange={(e) => setLevel(e.target.value)}>
                        <option value="">Pilih</option>
                        <option value="admin">Administrator</option>
                        <option value="agendaris">Agendaris</option>
                        <option value="pimpinan">Pimpinan</option>
                        <option value="user">User</option>
                    </select>
                </div>
                <div className="mb-6">
                    <label htmlFor="base-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">NIP</label>
                    <input disabled type="number" id="disabled-input" className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={nip} onChange={(e) => setNip(e.target.value)} />
                </div>
                <div className="mb-6">
                    <input type="hidden" id="base-input" className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={nama_lengkap} onChange={(e) => setNama(e.target.value)} />
                </div>
                <div className="mb-6">
                    <label htmlFor="base-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                    <input type="text" id="base-input" className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 cursor-not-allowed dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={username} onChange={(e) => setUsername(e.target.value)} disabled />
                </div>
                <div className="mb-6">
                    <label htmlFor="base-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                    <input type="text" placeholder="****" id="base-input" className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white cursor-not-allowed dark:focus:ring-blue-500 dark:focus:border-blue-500" value={password} onChange={(e) => setPass(e.target.value)} disabled />
                </div>
                <div className="mb-6">
                    <label htmlFor="base-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Conf Password</label>
                    <input type="text" placeholder="****" id="base-input" className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={confPass} onChange={(e) => setConfPass(e.target.value)} disabled />
                </div>
                <hr className='mb-3' />
                <div className="flex mb-6">
                    <button type="button" className="flex focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                        <svg className="w-4 h-4 mr-1 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                            <path d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z" />
                        </svg>
                        <span>Simpan</span>
                    </button>

                    <Link href='/admin/user' className="flex py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                        <svg className="w-4 h-4 mr-1 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 12 16">
                            <path d="M10.819.4a1.974 1.974 0 0 0-2.147.33l-6.5 5.773A2.014 2.014 0 0 0 2 6.7V1a1 1 0 0 0-2 0v14a1 1 0 1 0 2 0V9.3c.055.068.114.133.177.194l6.5 5.773a1.982 1.982 0 0 0 2.147.33A1.977 1.977 0 0 0 12 13.773V2.227A1.977 1.977 0 0 0 10.819.4Z" />
                        </svg>
                        <span>Kembali</span>
                    </Link>
                </div>
            </form>
        </LayoutAdmin>
    )
}
