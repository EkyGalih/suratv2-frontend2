'use client'

import LayoutUser from "@/app/layouts/user/LayoutUser";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

export default function DistribusiSuratMasuk() {
    const router = useRouter();
    const [distribusi, setDistribusi] = useState([]);
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
        const bidangId = sessionStorage.getItem('bidangId');
        const res = await axios.get(
            `${process.env.HOST}/user/surat/${bidangId}?&search_query=${keyword}&page=${page}&limit=${limit}`
        );
        setDistribusi(res.data.result);
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

    async function deleteSurat(suratId) {
        const del = await fetch(
            `${process.env.HOST}/user/surat/${suratId}`, {
            method: "DELETE",
            headers: {
                "Content-type": "application/json"
            },
        });
        const trash = await del.json();
        if (trash.status === 'ok') {
            setMsg(trash.msg);
            router.replace('/user/surat');
        } else if (trash.status === 'fail') {
            setMsg(trash.msg);
        }
    }
    return (
        <LayoutUser>
            <div className='grid grid-cols-1 gap-6 sm:grid-cols-2'>
                <h2 className="flex title mb-5 text-2xl font-extrabold dark:text-white">
                    <svg className="flex-shrink w-6 h-6 mt-1 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
                        <path d="M14.419 10.581a3.564 3.564 0 0 0-2.574 1.1l-4.756-2.49a3.54 3.54 0 0 0 .072-.71 3.55 3.55 0 0 0-.043-.428L11.67 6.1a3.56 3.56 0 1 0-.831-2.265c.006.143.02.286.043.428L6.33 6.218a3.573 3.573 0 1 0-.175 4.743l4.756 2.491a3.58 3.58 0 1 0 3.508-2.871Z" />
                    </svg>
                    <span className="flex-1 ml-2 whitespace-nowrap">Distribusi Surat Masuk</span>
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
                            <input type="search" id="default-search" className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Cari Pegawai..." value={query} onChange={(e) => setQuery(e.target.value)} />
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
                                distribusi && distribusi.map((item, index) => {
                                    return (
                                        <tr key={item.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                            <td className="px-6 py-4">{index + 1}</td>
                                            <td className="px-6 py-4">{item.bidang.nama_bidang}</td>
                                            <td className="px-6 py-4">{item.kategori}</td>
                                            <td className="px-6 py-4">{item.tgl_surat}</td>
                                            <td className="px-6 py-4">{item.perihal}</td>
                                            <td className="px-6 py-4">{item.no_surat}</td>
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
                                            <td className="px-6 py-4 text-center inline-flex">
                                                <a href={`/user/surat/edit/${item.id}`} data-tooltip-target="tooltip-edit" className="inline-flex items-center focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-xs px-5 py-2.5 mr-2 mb-2 dark:focus:ring-yellow-900">
                                                    <svg className="w-4 h-4 mr-1 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                                                        <path d="M12.687 14.408a3.01 3.01 0 0 1-1.533.821l-3.566.713a3 3 0 0 1-3.53-3.53l.713-3.566a3.01 3.01 0 0 1 .821-1.533L10.905 2H2.167A2.169 2.169 0 0 0 0 4.167v11.666A2.169 2.169 0 0 0 2.167 18h11.666A2.169 2.169 0 0 0 16 15.833V11.1l-3.313 3.308Zm5.53-9.065.546-.546a2.518 2.518 0 0 0 0-3.56 2.576 2.576 0 0 0-3.559 0l-.547.547 3.56 3.56Z" />
                                                        <path d="M13.243 3.2 7.359 9.081a.5.5 0 0 0-.136.256L6.51 12.9a.5.5 0 0 0 .59.59l3.566-.713a.5.5 0 0 0 .255-.136L16.8 6.757 13.243 3.2Z" />
                                                    </svg>
                                                </a>
                                                <div id="tooltip-edit" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                                                    Edit Surat Keluar
                                                    <div class="tooltip-arrow" data-popper-arrow></div>
                                                </div>
                                                <a href={`/user/surat/detail/${item.id}`} data-tooltip-target="tooltip-view" className="inline-flex items-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-xs px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                                                    <svg className="w-4 h-4 mr-1 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 14">
                                                        <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                                                            <path d="M10 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                                                            <path d="M10 13c4.97 0 9-2.686 9-6s-4.03-6-9-6-9 2.686-9 6 4.03 6 9 6Z" />
                                                        </g>
                                                    </svg>
                                                </a>
                                                <div id="tooltip-view" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                                                    Lihat Surat
                                                    <div class="tooltip-arrow" data-popper-arrow></div>
                                                </div>
                                                <button onClick={() => deleteSurat(item.id)} type="button" data-tooltip-target="tooltip-hapus" className="button inline-flex items-center focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-xs px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
                                                    <svg className="w-4 h-4 mr-1 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                                                        <path d="M17 4h-4V2a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v2H1a1 1 0 0 0 0 2h1v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6h1a1 1 0 1 0 0-2ZM7 2h4v2H7V2Zm1 14a1 1 0 1 1-2 0V8a1 1 0 0 1 2 0v8Zm4 0a1 1 0 0 1-2 0V8a1 1 0 0 1 2 0v8Z" />
                                                    </svg>
                                                </button>
                                                <div id="tooltip-hapus" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                                                    Hapus Surat
                                                    <div class="tooltip-arrow" data-popper-arrow></div>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })
                        }
                    </tbody>
                </table>
                <div class="flex flex-col items-center mb-2.5">
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
        </LayoutUser>
    )
}
