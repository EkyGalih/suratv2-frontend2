'use client'

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function NavbarPimpinan() {
  const [foto, setFoto] = useState("");
  const [name, setName] = useState("");
  const [level, setLevel] = useState("");
  const [suratKeluar, setSuratKeluar] = useState([]);
  const [suratMasuk, setSuratMasuk] = useState([]);
  const [countSuratKeluar, setCountKeluar] = useState(0);
  const [countSuratMasuk, setCountMasuk] = useState(0);
  const router = useRouter();

  useEffect(() => {
    setFoto(sessionStorage.getItem('foto'));
    setName(sessionStorage.getItem('name'));
    setLevel(sessionStorage.getItem('level'));
    getSuratKeluarNew();
    getSuratMasukNew();
  }, [countSuratMasuk, countSuratKeluar]);

  const Logout = async (e) => {
    const res = await fetch(
      `${process.env.HOST}/logout`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json"
      },
    });

    const response = await res.json();
    sessionStorage.removeItem('userId');
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('level');
    sessionStorage.removeItem('foto');
    router.push('/');
  };

  async function getSuratMasukNew() {
    const masuk = await axios.get(
      `${process.env.HOST}/pimpinan/surat/masuk/notif`
    );
    setCountMasuk(masuk.data.rows);
    setSuratMasuk(masuk.data.result);
  }

  async function getSuratKeluarNew() {
    const keluar = await axios.get(
      `${process.env.HOST}/pimpinan/surat/keluar/notif`
    );
    setCountKeluar(keluar.data.rows);
    setSuratKeluar(keluar.data.result);
  }

  return (
    <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start">
            <button data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar" type="button" className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
              <span className="sr-only">Open sidebar</span>
              <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
              </svg>
            </button>
            <a href="https://flowbite.com" className="flex ml-2 md:mr-24">
              <img src="https://flowbite.com/docs/images/logo.svg" className="h-8 mr-3" alt="FlowBite Logo" />
              <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">Surat BPKAD</span>
            </a>
          </div>
          <div className="flex items-center">
            {/* MENU NOTIFIKASI SURAT MASUK */}
            <button id="notif-surat" data-dropdown-toggle="surat-masuk" className="relative mr-1 text-white bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-white dark:hover:bg-gray-100 dark:focus:ring-gray-100" type="button">
              <svg className="flex-shrink w-5 h-5 text-gray-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="m9.978 13.233 9.392-6.668a1.945 1.945 0 0 0-.186-.177L11.2.65A2 2 0 0 0 8.815.638L.8 6.4a1.928 1.928 0 0 0-.207.2l9.385 6.633Z" />
                <path d="M11.181 14.864a2.007 2.007 0 0 1-2.382-.014L0 8.627V18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8.573l-8.819 6.29Z" />
              </svg>
              {countSuratMasuk === 0
                ? ''
                : <div className="absolute inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 border-1 border-white rounded-full -top-1 -right-0 dark:border-gray-900">{countSuratMasuk}</div>
              }
            </button>
            <div id="surat-masuk" className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
              <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="notif-surat">
                {countSuratMasuk === 0
                  ? <span className="ml-5 py-5">Tidak ada notifikasi</span>
                  : suratMasuk && suratMasuk.map((item, index) => {
                    return (
                      <li key={index}>
                        <a href={`/pimpinan/surat/masuk/disposisi/${item.id}`} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                          <span className="text-gray-700 text-sm">{item.perihal}</span>
                          <span className="text-xs font-serif text-right">{item.tgl_surat}</span>
                        </a>
                      </li>
                    )
                  })
                }
              </ul>
              <div className="py-2">
                <a href="/pimpinan/surat/masuk" className="block px-4 py-2 text-xs text-center text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Show All Surat Masuk</a>
              </div>
            </div>

            {/* MENU NOTIFIKASI SURAT KELUAR */}
            <button id="notif-surat" data-dropdown-toggle="surat-keluar" className="relative mr-4 text-white bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-white dark:hover:bg-gray-100 dark:focus:ring-gray-100" type="button">
              <svg className="flex-shrink w-5 h-5 text-gray-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
                <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
                <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
              </svg>
              {countSuratKeluar === 0
                ? ''
                : <div className="absolute inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 border-1 border-white rounded-full -top-1 -right-0 dark:border-gray-900">{countSuratKeluar}</div>
              }
            </button>
            {/* <!-- Dropdown menu --> */}
            <div id="surat-keluar" className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
              <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="notif-surat">
                {countSuratKeluar === 0
                  ? <span className="ml-5 py-5">Tidak ada notifikasi</span>
                  : suratKeluar && suratKeluar.map((keluar, index) => {
                    return (
                      <li key={index}>
                        <a href={`/pimpinan/surat/keluar/${keluar.id}`} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                          <span className="text-gray-700 text-sm">{keluar.perihal}</span>
                          <span className="text-xs font-serif text-right">{keluar.tgl_surat}</span>
                        </a>
                      </li>
                    )
                  })
                }
              </ul>
              <div className="py-2">
                <a href="/pimpinan/surat/keluar" className="block px-4 py-2 text-xs text-center text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Show All Surat Keluar</a>
              </div>
            </div>
            <div className="flex items-center ml-3">
              <div>
                <button type="button" className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" aria-expanded="false" data-dropdown-toggle="dropdown-user">
                  <span className="sr-only">Open user menu</span>
                  <img className="w-8 h-10 rounded-xl" src={foto} alt="user photo" />
                </button>
              </div>
              <div className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600" id="dropdown-user">
                <div className="px-4 py-3" role="none">
                  <p className="text-sm text-gray-900 dark:text-white" role="none">
                    {name}
                  </p>
                  <p className="text-sm font-medium text-gray-900 truncate dark:text-gray-300" role="none">
                    {level}
                  </p>
                </div>
                <ul className="py-1" role="none">
                  <li>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Dashboard</a>
                  </li>
                  <li>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Settings</a>
                  </li>
                  <li>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Earnings</a>
                  </li>
                  <li>
                    <Link onClick={Logout} href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Sign out</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
