'use client'

import LayoutAgendaris from "@/app/layouts/agendaris/LayoutAgendaris";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function TambahSuratMasuk() {
    const [file, setFile] = useState("");
    const [perihal, setPerihal] = useState("");
    const [kategori, setKategori] = useState("");
    const [asal_surat, setAsalSurat] = useState("");
    const [no_surat, setNoSurat] = useState("");
    const [tgl_surat, setTglSurat] = useState("");
    const [tgl_terima, setTglTerima] = useState("");
    const [preview, setPreview] = useState("");
    const [msg, setMsg] = useState("");
    const router = useRouter();

    const loadImage = (e) => {
        const image = e.target.files[0];
        setFile(image);
        setPreview(URL.createObjectURL(image));
    }

    const saveSurat = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append("kategori", kategori);
        formData.append("perihal", perihal);
        formData.append("file", file);
        formData.append("asal_surat", asal_surat);
        formData.append("no_surat", no_surat);
        formData.append("jenis_surat", "masuk");
        formData.append("tgl_terima", tgl_terima);
        formData.append("tgl_surat", tgl_surat);
        formData.append("status_surat", 'unread');

        try {
            await axios.post(
                `${process.env.HOST}/agendaris/surat`, formData, {
                "Content-type": "multipart/form-data"
            });
            router.push('/agendaris/surat/masuk');
        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.msg);
            }
        }
    }
    return (
        <LayoutAgendaris>
            <div className='grid grid-cols-1 gap-6 sm:grid-cols-2'>
                <h2 className="flex title mb-5 text-2xl font-extrabold dark:text-white">
                    <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
                        <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
                        <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
                    </svg>
                    <span className="flex-1 ml-2 whitespace-nowrap">Surat Masuk</span>
                </h2>
            </div>
            <nav className="flex mb-5" aria-label="Breadcrumb">
                <ol className="inline-flex items-center space-x-1 md:space-x-3">
                    <li className="inline-flex items-center">
                        <a href="/admin/user" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
                            <svg className="w-3 h-3 mr-2 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 10">
                                <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M6 1h10M6 5h10M6 9h10M1.49 1h.01m-.01 4h.01m-.01 4h.01" />
                            </svg>
                            Surat
                        </a>
                    </li>
                    <li>
                        <div className="flex items-center">
                            <svg className="w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                            </svg>
                            <a href="#" className="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2 dark:text-gray-400 dark:hover:text-white">Input Surat Masuk</a>
                        </div>
                    </li>
                </ol>
            </nav>
            <hr className='mb-3' />
            {msg == '' ? '' : <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                <span className="font-medium">Error!</span> {msg}
            </div>}
            <form onSubmit={saveSurat}>
                <div class="grid grid-cols-1 gap-6 sm:grid-cols-3">
                    <div class="col-span-1">
                        <div class="mb-3 text-gray-500 dark:text-gray-400">
                            <label htmlFor="jenis-surat" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Jenis Surat <sup className="text-red-500">*</sup></label>
                            <select id="jenis-surat" className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={kategori} onChange={(e) => setKategori(e.target.value)}>
                                <option>Pilih</option>
                                <option value="biasa">Umum</option>
                                <option value="sppd">SPPD</option>
                                <option value="undangan">Undangan</option>
                            </select>
                        </div>
                        <div class="mb-3 text-gray-500 dark:text-gray-400">
                            <label htmlFor="perihal" className="block mb-2 mr-5 text-sm font-medium text-gray-900 dark:text-white">Asal Surat</label>
                            <input type="text" placeholder="" id="asal-surat" className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={asal_surat} onChange={(e) => setAsalSurat(e.target.value)} />
                        </div>
                        <div class="mb-3 text-gray-500 dark:text-gray-400">
                            <label htmlFor="perihal" className="block mb-2 mr-5 text-sm font-medium text-gray-900 dark:text-white">No Surat</label>
                            <input type="text" placeholder="" id="no-surat" className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={no_surat} onChange={(e) => setNoSurat(e.target.value)} />
                        </div>
                        <div class="mb-3 text-gray-500 dark:text-gray-400">
                            <label htmlFor="perihal" className="block mb-2 mr-5 text-sm font-medium text-gray-900 dark:text-white">Tanggal Surat</label>
                            <input type="date" placeholder="" id="tanggal-surat" className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={tgl_surat} onChange={(e) => setTglSurat(e.target.value)} />
                        </div>
                        <div class="mb-3 text-gray-500 dark:text-gray-400">
                            <label htmlFor="perihal" className="block mb-2 mr-5 text-sm font-medium text-gray-900 dark:text-white">Tanggal Terima</label>
                            <input type="date" placeholder="" id="tanggal-terima" className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={tgl_terima} onChange={(e) => setTglTerima(e.target.value)} />
                        </div>
                        <div class="mb-3 text-gray-500 dark:text-gray-400">
                            <label htmlFor="perihal" className="block mb-2 mr-5 text-sm font-medium text-gray-900 dark:text-white">Perihal</label>
                            <textarea id="perihal" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={perihal} onChange={(e) => setPerihal(e.target.value)}></textarea>
                        </div>
                        <div class="mb-3 text-gray-500 dark:text-gray-400">
                            <label htmlFor="file" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">File Surat</label>
                            <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="file_input_help" id="foto" type="file" onChange={loadImage} />
                            <p className="mt-1 mb-5 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">PNG, JPG or JPEG (MAX. 5MB).</p>
                        </div>
                        <div class="inline-flex mb-3 text-gray-500 dark:text-gray-400">
                            <button type="submit" className="flex focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                                <svg className="w-4 h-4 mr-1 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                                    <path d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z" />
                                </svg>
                                <span>Simpan</span>
                            </button>

                            <a href='/agendaris/surat/masuk' className="flex py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                                <svg className="w-4 h-4 mr-1 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 12 16">
                                    <path d="M10.819.4a1.974 1.974 0 0 0-2.147.33l-6.5 5.773A2.014 2.014 0 0 0 2 6.7V1a1 1 0 0 0-2 0v14a1 1 0 1 0 2 0V9.3c.055.068.114.133.177.194l6.5 5.773a1.982 1.982 0 0 0 2.147.33A1.977 1.977 0 0 0 12 13.773V2.227A1.977 1.977 0 0 0 10.819.4Z" />
                                </svg>
                                <span>Kembali</span>
                            </a>
                        </div>
                    </div>
                    <div class="ml-20 text-gray-500 dark:text-gray-400">
                        {preview ? (
                            <img className="h-auto max-w-lg rounded-lg" src={preview} alt="image description" />
                        ) : (
                            ""
                        )}
                    </div>
                </div>
            </form>
        </LayoutAgendaris>
    )
}
