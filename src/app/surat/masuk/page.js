'use client'

import ReactPaginate from "react-paginate";
import Layout from "../../layouts/Layout";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Surat() {
    const router = useRouter();
    const [surat, setSurat] = useState([]);
    const [page, setPage] = useState(0);
    const limit = useState(10);
    const [pages, setPages] = useState(0);
    const [rows, setRows] = useState(0);
    const [keyword, setKeyword] = useState("");
    const [query, setQuery] = useState("");
    const [msgPage, setMsgPage] = useState("");
    const [msg, setMsg] = useState("");

    useEffect(() => {
        getSurat();
    }, [page, keyword]);

    async function getSurat() {
        const res = await axios.get(
            `http://localhost:5000/user/surat/masuk?&search_query=${keyword}&page=${page}&limit=${limit}`
        );
        setSurat(res.data.result);
        setPage(res.data.page);
        setPages(res.data.totalPage);
        setRows(res.data.totalRows);
    };

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
        <Layout>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg ml-10 mr-10 mt-5">
                <h1 className="inline-flex text-2xl px-5 pt-5 font-extrabold text-black">
                    <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 2-8.4 7.05a1 1 0 0 1-1.2 0L1 2m18 0a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1m18 0v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2" />
                    </svg>
                    <sup>
                        <svg className="w-4 h-4 mt-1.5 mr-2 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 15">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 7.5h11m0 0L8 3.786M12 7.5l-4 3.714M12 1h3c.53 0 1.04.196 1.414.544.375.348.586.82.586 1.313v9.286c0 .492-.21.965-.586 1.313A2.081 2.081 0 0 1 15 14h-3" />
                        </svg>
                    </sup>
                    Daftar Surat Masuk
                </h1>
                <hr className="mb-2" />
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
                            <input type="search" id="default-search" className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Cari Surat Masuk..." value={query} onChange={(e) => setQuery(e.target.value)} />
                            <button type="submit" className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                        </div>
                    </form>
                </div>

                {/* ERROR MESSAGE */}
                {msg === "" ? '' :
                    <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                        <span className="font-medium">Error!</span> {msg}
                    </div>
                }

                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                #
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Pemohon
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Kategori Surat
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Tanggal Pengajuan
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Perihal
                            </th>
                            <th scope="col" className="px-6 py-3">
                                No Surat
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Status Surat
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
                                            <td className="px-6 py-4">{item.bidang.nama_bidang}</td>
                                            <td className="px-6 py-4">{item.kategori}</td>
                                            <td className="px-6 py-4">{item.tgl_surat}</td>
                                            <td className="px-6 py-4">{item.perihal}</td>
                                            <td className="px-6 py-4">{
                                                item.no_surat === null ?
                                                    <span className="text-yellow-800 bg-yellow-50 text-sm dark:bg-gray-800 dark:text-yellow-300 p-1 font-medium">Belum Diberikan</span>
                                                    : item.no_surat
                                            }</td>
                                            <td className="px-6 py-4">{item.status_surat}</td>
                                            <td className="px-6 py-4 text-center">
                                                <a href={`/user/surat/detail/${item.id}`} className="inline-flex items-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-xs px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                                                    <svg className="w-4 h-4 mr-1 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 14">
                                                        <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                                                            <path d="M10 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                                                            <path d="M10 13c4.97 0 9-2.686 9-6s-4.03-6-9-6-9 2.686-9 6 4.03 6 9 6Z" />
                                                        </g>
                                                    </svg> View
                                                </a>
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
        </Layout>
    )
}
