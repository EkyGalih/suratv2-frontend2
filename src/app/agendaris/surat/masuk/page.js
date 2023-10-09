'use client'

import LayoutAgendaris from "@/app/layouts/agendaris/LayoutAgendaris";
import axios from "axios";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

export default function SuratMasuk() {
    const [surat, setSurat] = useState([]);
    const [page, setPage] = useState(0);
    const limit = useState(10);
    const [pages, setPages] = useState(0);
    const [rows, setRows] = useState(0);
    const [keyword, setKeyword] = useState("");
    const [query, setQuery] = useState("");
    const [msgPage, setMsgPage] = useState("");
    const [msg, setMsg] = useState("");
    const [status, setStatus] = useState("");

    useEffect(() => {
        getSuratMasuk();
    }, [page, keyword, surat]);

    async function getSuratMasuk() {
        const res = await axios.get(
            `${process.env.HOST}/agendaris/surat/masuk?search_query=${keyword}&page=${page}&limit=${limit}`
        );
        setSurat(res.data.result);
        setPage(res.data.page);
        setPages(res.data.totalPage);
        setRows(res.data.totalRows);
    }

    async function deleteSurat(suratId) {
        try {
            const res = await axios.delete(
                `${process.env.HOST}/agendaris/surat/${suratId}`
            );
            setStatus(res.data.status);
            setMsg(res.data.msg);
        } catch (error) {
            setStatus(error.response.data.status);
            setMsg(error.response.data.msg);
        }
    }

    // fungsi ganti halaman
    const changePage = ({ selected }) => {
        setPage(selected);
        if (selected === 9) {
            setMsgPage("Jika tidak menemukan data yang Anda cari, silahkan cari data dengan kata kunci spesifik!");
        } else {
            setMsgPage("");
        }
    };

    const searchSurat = (e) => {
        e.preventDefault();
        setPage(0);
        setKeyword(query);
    };

    return (
        <LayoutAgendaris>
            <div className='grid grid-cols-1 gap-6 sm:grid-cols-2'>
                <h2 className="flex title mb-5 text-2xl font-extrabold dark:text-white">
                    <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="m9.978 13.233 9.392-6.668a1.945 1.945 0 0 0-.186-.177L11.2.65A2 2 0 0 0 8.815.638L.8 6.4a1.928 1.928 0 0 0-.207.2l9.385 6.633Z" />
                        <path d="M11.181 14.864a2.007 2.007 0 0 1-2.382-.014L0 8.627V18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8.573l-8.819 6.29Z" />
                    </svg>
                    <span className="flex-1 ml-2 whitespace-nowrap">Surat Masuk</span>
                    <a href="/agendaris/surat/masuk/add" className="flex fixed top-22 right-7 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-xs px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                        <svg className="w-4 h-4 mr-1 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 5.757v8.486M5.757 10h8.486M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                        <span>Input Surat</span>
                    </a>
                </h2>
            </div>

            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    <span className="text-sm text-gray-700 dark:text-gray-400 mt-7 ml-4">
                        Total Surat <span className="font-semibold text-gray-900 dark:text-white">{rows}, </span> Halaman <span className="font-semibold text-gray-900 dark:text-white">{rows ? page + 1 : 0}</span> of <span className="font-semibold text-gray-900 dark:text-white">{pages}</span> Halaman
                    </span>
                    <form className="mb-5" onSubmit={searchSurat}>
                        <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                </svg>
                            </div>
                            <input type="search" id="default-search" className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Cari Surat..." value={query} onChange={(e) => setQuery(e.target.value)} />
                            <button type="submit" className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                        </div>
                    </form>
                </div>

                {/* ERROR MESSAGE */}
                {msg === "" ? '' :
                    status === 'ok'
                        ? <div className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
                            <span className="font-medium">Success!</span> {msg}
                        </div>
                        : status === 'fail'
                            ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                                <span className="font-medium">Error!</span> {msg}
                            </div>
                            : ''
                }

                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                #
                            </th>
                            <th scope="col" className="px-6 py-3">
                                No Surat
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Asal Surat
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Perihal
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Kategori Surat
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Tanggal Surat
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Tanggal Terima
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Status Surat
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Diteruskan Ke
                            </th>
                            <th scope="col" className="px-6 py-3">
                                <span className="sr-only">Edit</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            rows === 0
                                ? <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td className="items-end">Tidak Ada Data</td>
                                </tr>
                                :
                                surat && surat.map((item, index) => {
                                    return (
                                        <tr key={item.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                            <td className="px-6 py-4">{index + 1}</td>
                                            <td className="px-6 py-4">{item.no_surat}</td>
                                            <td className="px-6 py-4">{item.asal_surat}</td>
                                            <td className="px-6 py-4">{item.perihal}</td>
                                            <td className="px-6 py-4">{item.kategori}</td>
                                            <td className="px-6 py-4">{item.tgl_surat}</td>
                                            <td className="px-6 py-4">{item.tgl_terima}</td>
                                            <td className="px-6 py-4">{
                                                item.status_surat === 'proggress'
                                                    ? <span className="bg-dark-100 text-dark-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-dark-400 border border-dark-400">Progres</span>
                                                    : item.status_surat === 'unread'
                                                        ? <span className="bg-yellow-100 text-yellow-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-yellow-400 border border-yellow-400">Sedang Disposisi</span>
                                                        : item.status_surat === 'read'
                                                            ? <span className="bg-indigo-100 text-indigo-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-indigo-400 border border-indigo-400">Disposisi</span>
                                                            : item.status_surat === 'done'
                                                                ? <span className="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-green-400 border border-green-400">Selesai</span>
                                                                : <span></span>
                                            }</td>
                                            <td className="px-6 py-4">
                                                {item.diteruskan}
                                            </td>
                                            <td className="px-6 py-4 text-center inline-flex">
                                                <a href={`/agendaris/surat/masuk/distribusi/${item.id}`} data-tooltip-target="tooltip-edit" className="inline-flex items-center focus:outline-none text-white bg-blue-400 hover:bg-blue-500 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-xs px-5 py-2.5 mr-2 mb-2 dark:focus:ring-blue-900">
                                                    <svg className="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m5.953 7.467 6.094-2.612m.096 8.114L5.857 9.676m.305-1.192a2.581 2.581 0 1 1-5.162 0 2.581 2.581 0 0 1 5.162 0ZM17 3.84a2.581 2.581 0 1 1-5.162 0 2.581 2.581 0 0 1 5.162 0Zm0 10.322a2.581 2.581 0 1 1-5.162 0 2.581 2.581 0 0 1 5.162 0Z" />
                                                    </svg>
                                                </a>
                                                <div id="tooltip-edit" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                                                    Teruskan Surat
                                                    <div className="tooltip-arrow" data-popper-arrow></div>
                                                </div>
                                                <button onClick={() => deleteSurat(item.id)} type="button" data-tooltip-target="tooltip-hapus" className="button inline-flex items-center focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-xs px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
                                                    <svg className="w-4 h-4 mr-1 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                                                        <path d="M17 4h-4V2a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v2H1a1 1 0 0 0 0 2h1v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6h1a1 1 0 1 0 0-2ZM7 2h4v2H7V2Zm1 14a1 1 0 1 1-2 0V8a1 1 0 0 1 2 0v8Zm4 0a1 1 0 0 1-2 0V8a1 1 0 0 1 2 0v8Z" />
                                                    </svg>
                                                </button>
                                                <div id="tooltip-hapus" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                                                    Hapus Surat
                                                    <div className="tooltip-arrow" data-popper-arrow></div>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })
                        }
                    </tbody>
                </table>
                <div className="flex flex-col items-center mb-2.5">
                    <p className='ext-sm text-red-800 mt-2.5 mb-2.5 dark:bg-gray-800 dark:text-red-400'>{msgPage}</p>
                    <nav aria-label="Page navigation" key={rows}>
                        <ReactPaginate
                            previousLabel={"< Prev"}
                            nextLabel={"Next >"}
                            pageCount={Math.min(10, pages)}
                            onPageChange={changePage}
                            containerClassName={"flex items-center -space-x-px h-8 text-sm"}
                            pageLinkClassName={"flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"}
                            previousLinkClassName={"flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"}
                            nextLinkClassName={"flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"}
                            activeLinkClassName={"selected"}
                            disabledLinkClassName={"disabled"}
                        ></ReactPaginate>
                    </nav>
                </div>
            </div>
        </LayoutAgendaris>
    )
}
