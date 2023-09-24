'use client'

import Navbar from "@/app/layouts/Navbar";
import axios from "axios";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

export default function PegawaiNonAsn() {

    const [pegawai, setPegawai] = useState("");
    const [page, setPage] = useState(0);
    const limit = useState(10);
    const [pages, setPages] = useState(0);
    const [rows, setRows] = useState(0);
    const [keyword, setKeyword] = useState("");
    const [query, setQuery] = useState("");
    const [msgPage, setMsgPage] = useState("");

    useEffect(() => {
        getPegawai();
    }, [page, keyword]);

    async function getPegawai() {
        const res = await axios.get(
            `${process.env.HOST}/admin/pegawai/nonasn?search_query=${keyword}&page=${page}&limit=${limit}`
        );
        setPegawai(res.data.result);
        setPage(res.data.page);
        setPages(res.data.totalPage);
        setRows(res.data.totalRows);
    };

    const searchPegawai = (e) => {
        e.preventDefault();
        setPage(0);
        setKeyword(query);
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

    return (
        <>
            <Navbar />
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg ml-10 mr-10 mt-5">
                <h1 className="inline-flex text-2xl px-5 pt-5 font-extrabold text-black">
                    <svg className="w-6 h-6 mr-2 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0 0a8.949 8.949 0 0 0 4.951-1.488A3.987 3.987 0 0 0 11 14H9a3.987 3.987 0 0 0-3.951 3.512A8.948 8.948 0 0 0 10 19Zm3-11a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>
                    Pegawai Non ASN
                </h1>
                <hr className="mb-2 mt-2" />
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 mt-5">
                    <span className="text-sm text-gray-700 dark:text-gray-400 mt-7 ml-10">
                        Total Pegawai <span className="font-semibold text-gray-900 dark:text-white">{rows}, </span> Halaman <span className="font-semibold text-gray-900 dark:text-white">{rows ? page + 1 : 0}</span> of <span className="font-semibold text-gray-900 dark:text-white">{pages}</span> Halaman
                    </span>
                    <form className="mb-5 mr-10" onSubmit={searchPegawai}>
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

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-5 mt-1 ml-10 mr-10">

                    {
                        pegawai && pegawai.map((peg, index) => {
                            return (
                                <div key={peg.id} className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                                    <a href={`/pegawai/nonasn/detail/${peg.id}`}>
                                        <img className="rounded-t-lg" src={peg.url} alt="product image" />
                                    </a>
                                    <div className="px-5 pb-5">
                                        <a href="#">
                                            <h5 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">{peg.jabatan}</h5>
                                        </a>
                                        <div className="flex items-center justify-between">
                                            <span className="text-1xl font-bold text-gray-900 dark:text-white">{peg.name}</span>
                                        </div>
                                        <div className="mt-3">
                                            <a href={`/pegawai/nonasn/detail/${peg.id}`} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Detail</a>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }

                </div>
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
        </>
    )
}
