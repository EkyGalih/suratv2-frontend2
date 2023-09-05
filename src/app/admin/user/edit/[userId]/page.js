'use client'
import LayoutAdmin from '@/app/layouts/admin/LayoutAdmin'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Admin | Edit User',
  description: 'App surat bpkad'
}

export default function userId() {
  const params = useParams();
  const userId = params.userId;

  const [pegawai, setPegawai] = useState([]);
  const [pegawaiId, setPegawaiId] = useState("");
  const [username, setUsername] = useState("");
  const [nip, setNip] = useState("");
  const [level, setLevel] = useState("");

  async function getUsersById() {
    const postData = {
      method: "GET",
      headers: {
        "Content-type": "application/json"
      },
    };
    const res = await fetch(
      `http://localhost:5000/admin/users/${userId}`,
      postData
    );
    const response = await res.json();
    setPegawaiId(response.pegawaiId);
    setUsername(response.username);
    setNip(response.pegawai.nip);
    setLevel(response.level)
  };

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
  }

  useEffect(() => {
    getUsersById();
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
        <Link href="/admin/user" className="flex fixed top-24 right-7 text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800">
          <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 12 16">
            <path d="M10.819.4a1.974 1.974 0 0 0-2.147.33l-6.5 5.773A2.014 2.014 0 0 0 2 6.7V1a1 1 0 0 0-2 0v14a1 1 0 1 0 2 0V9.3c.055.068.114.133.177.194l6.5 5.773a1.982 1.982 0 0 0 2.147.33A1.977 1.977 0 0 0 12 13.773V2.227A1.977 1.977 0 0 0 10.819.4Z" />
          </svg>
          <span>Kembali</span>
        </Link>
      </div>


      <form>
        <div className='mb-6'>
          <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Pilih Pegawai</label>
          <select id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={pegawaiId}>
            <option value="">Pilih</option>
            {pegawai.map((peg, index) => {
              return (
                <option key={peg.id} value={peg.id}>{peg.name}</option>
              )
            })}
          </select>
        </div>
        <div class="mb-6">
          <label for="base-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">NIP</label>
          <input type="text" id="base-input" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={nip} />
        </div>
        <div class="mb-6">
          <label for="base-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
          <input type="text" id="base-input" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={username} />
        </div>
        <div className='mb-6'>
          <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Pilih Level</label>
          <select id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={level}>
            <option value="">Pilih</option>
            <option value="admin">Administrator</option>
            <option value="agendaris">Agendaris</option>
            <option value="pimpinan">Pimpinan</option>
            <option value="user">User</option>
          </select>
        </div>
      </form>
    </LayoutAdmin>
  )
}
