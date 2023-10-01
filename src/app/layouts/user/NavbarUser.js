'use client'

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function NavbarUser() {
  const [foto, setFoto] = useState("");
  const [name, setName] = useState("");
  const [level, setLevel] = useState("");
  const [distribusi, setDistribusi] = useState([]);
  const [countDist, setCount] = useState(0);
  const router = useRouter();

  useEffect(() => {
    setFoto(sessionStorage.getItem('foto'));
    setName(sessionStorage.getItem('name'));
    setLevel(sessionStorage.getItem('level'));

    getDistribusiByBidangId();
  }, [countDist]);

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

  async function getDistribusiByBidangId() {
    const res = await axios.get(
      `${process.env.HOST}/distribusi/${sessionStorage.getItem('bidangId')}`,
    );
    setDistribusi(res.data.result);
    setCount(res.data.totalRows);
    console.log(res.data.result);
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
            <button id="notif-surat" data-dropdown-toggle="dropdown" className="relative p-3 mr-4 text-white bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-white dark:hover:bg-gray-100 dark:focus:ring-gray-100" type="button">
              <svg className="w-5 h-5 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
                <path d="M14.419 10.581a3.564 3.564 0 0 0-2.574 1.1l-4.756-2.49a3.54 3.54 0 0 0 .072-.71 3.55 3.55 0 0 0-.043-.428L11.67 6.1a3.56 3.56 0 1 0-.831-2.265c.006.143.02.286.043.428L6.33 6.218a3.573 3.573 0 1 0-.175 4.743l4.756 2.491a3.58 3.58 0 1 0 3.508-2.871Z" />
              </svg>
              {countDist === 0
                ? ''
                : <div className="absolute inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 border-1 border-white rounded-full -top-1 -right-0 dark:border-gray-900">{countDist}</div>
              }
            </button>
            {/* <!-- Dropdown menu --> */}
            <div id="dropdown" className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
              <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="notif-surat">
                {countDist === 0
                  ? <span className="ml-5 py-5">Tidak ada notifikasi</span>
                  : distribusi && distribusi.map((dist, index) => {
                    return (
                      <li key={index}>
                        <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                          <span className="text-gray-700 text-sm">{dist.surat.perihal}</span>
                          <br/>
                          <span className="text-xs font-serif text-right">{dist.surat.tgl_surat}</span>
                        </a>
                      </li>
                    )
                  })
                }
              </ul>
              <div className="py-2">
                <a href="/user/surat/masuk" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Show All Distribusi</a>
              </div>
            </div>
            <div className="flex items-center ml-3">
              <div>
                <button type="button" className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" aria-expanded="false" data-dropdown-toggle="dropdown-user">
                  <span className="sr-only">Open user menu</span>
                  <img className="w-8 h-8 rounded-full" src={foto} alt="user photo" />
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
