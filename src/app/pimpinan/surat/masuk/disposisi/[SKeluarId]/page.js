'use client'

import LayoutPimpinan from "@/app/layouts/pimpinan/LayoutPimpinan";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DisposisiSuratMasuk() {
    const params = useParams();
    const suratId = params.SKeluarId;

    const [file, setFile] = useState("");
    const [perihal, setPerihal] = useState("");
    const [disposisi, setDisposisi] = useState("");
    const [kategori, setKategori] = useState("");
    const [asal_surat, setAsalSurat] = useState("");
    const [tgl_surat, setTglSurat] = useState("");
    const [tgl_terima, setTglTerima] = useState("");
    const [no_surat, setNoSurat] = useState("");
    const [preview, setPreview] = useState("");
    const [msg, setMsg] = useState("");
    const router = useRouter();

    useEffect(() => {
        getSuratById();
    }, []);

    async function getSuratById() {
        const res = await axios.get(
            `${process.env.HOST}/pimpinan/surat/keluar/${suratId}`
        );
        setFile(res.data.file);
        setPerihal(res.data.surat.perihal);
        setNoSurat(res.data.surat.no_surat);
        setKategori(res.data.surat.kategori);
        setAsalSurat(res.data.surat.asal_surat);
        setTglSurat(res.data.surat.tgl_surat);
        setTglTerima(res.data.surat.tgl_terima);
        setPreview(res.data.path_file);
        setDisposisi(res.data.surat.isi_disposisi);

    }

    const saveSurat = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append("isi_disposisi", disposisi);

        try {
            await axios.patch(
                `${process.env.HOST}/pimpinan/surat/${suratId}`, formData, {
                "Content-type": "multipart/form-data"
            });
            router.push('/pimpinan/surat/masuk');
        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.msg);
            }
        }
    }
    return (
        <LayoutPimpinan>
            <div className='grid grid-cols-1 gap-6 sm:grid-cols-2'>
                <h2 className="flex mb-5 text-2xl font-extrabold dark:text-white">
                    <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="m9.978 13.233 9.392-6.668a1.945 1.945 0 0 0-.186-.177L11.2.65A2 2 0 0 0 8.815.638L.8 6.4a1.928 1.928 0 0 0-.207.2l9.385 6.633Z" />
                        <path d="M11.181 14.864a2.007 2.007 0 0 1-2.382-.014L0 8.627V18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8.573l-8.819 6.29Z" />
                    </svg>
                    <span className="flex-1 ml-2 whitespace-nowrap">Disposisi Surat Masuk</span>
                </h2>
            </div>
            <nav className="flex mb-5" aria-label="Breadcrumb">
                <ol className="inline-flex items-center space-x-1 md:space-x-3">
                    <li className="inline-flex items-center">
                        <a href="/agendaris/surat/masuk" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
                            <svg className="w-3 h-3 mr-2 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 10">
                                <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M6 1h10M6 5h10M6 9h10M1.49 1h.01m-.01 4h.01m-.01 4h.01" />
                            </svg>
                            Surat Masuk
                        </a>
                    </li>
                    <li>
                        <div className="flex items-center">
                            <svg className="w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                            </svg>
                            <a href="#" className="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2 dark:text-gray-400 dark:hover:text-white">Disposisi Surat Masuk</a>
                        </div>
                    </li>
                </ol>
            </nav>
            <hr className='mb-3' />
            {msg == '' ? '' : <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                <span className="font-medium">Error!</span> {msg}
            </div>}
            <form onSubmit={saveSurat}>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                    <div className="col-span-2">
                        <div className="mb-3 text-gray-500 dark:text-gray-400">
                            <table className="w-full border text-sm text-left text-gray-500 dark:text-gray-400">
                                <tbody>
                                    <tr className="bg-white border dark:bg-gray-800 dark:border-gray-700">
                                        <th scope="row" className="px-6 py-1 border font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            Nomor Agenda/Registrasi
                                        </th>
                                        <th scope="row" className="border">:</th>
                                        <td className="pl-1">
                                            <input type="text" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" />
                                        </td>
                                        <td className="px-6 py-1">
                                            Tanggal Keamanan
                                        </td>
                                        <td className="px-6 py-1">
                                            SR/ R/T/ B
                                        </td>
                                    </tr>
                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                        <th scope="row" className="px-6 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            Tanggal Penerimaan :
                                        </th>
                                        <td className="px-6 py-1">
                                            {tgl_terima}
                                        </td>
                                        <td className="px-6 py-1">
                                            Tanggal Penyelesaian :
                                        </td>
                                        <td className="px-6 py-1">
                                            <input type="date" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" />
                                        </td>
                                    </tr>
                                    <tr className="bg-white dark:bg-gray-800">
                                        <th scope="row" className="px-24 py-1  font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            Asal Surat :
                                        </th>
                                        <td className="px-6 py-1">
                                            {asal_surat}
                                        </td>
                                    </tr>
                                    <tr className="bg-white dark:bg-gray-800">
                                        <th scope="row" className="px-24 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            Tanggal Surat :
                                        </th>
                                        <td className="px-6 py-1">
                                            {tgl_surat}
                                        </td>
                                    </tr>
                                    <tr className="bg-white dark:bg-gray-800">
                                        <th scope="row" className="pl-24 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            Nomor Surat
                                        </th>
                                        <th>:</th>
                                        <td className="pl-1 py-1">
                                            {no_surat}
                                        </td>
                                    </tr>
                                    <tr className="bg-white dark:bg-gray-800">
                                        <th scope="row" className="pl-24 pr-1 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            Lampiran
                                        </th>
                                        <th>:</th>
                                        <td className="px-6 py-1">

                                        </td>
                                    </tr>
                                    <tr className="bg-white dark:bg-gray-800">
                                        <th scope="row" className="px-24 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            Ringkasan Isi :
                                        </th>
                                        <td className="px-6 py-1">

                                        </td>
                                    </tr>
                                    <tr className="bg-white border-t border-b dark:bg-gray-800">
                                        <th scope="row" className="px-4 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            Diteruskan Kepada :<br />
                                            <input type="checkbox" value="Sekreteris" className="mr-4" /> Sekretaris <br />
                                            <input type="checkbox" value="Sekreteris" className="mr-4" /> Kabid Anggaran <br />
                                            <input type="checkbox" value="Sekreteris" className="mr-4" /> Kabid Akuntansi & Pelaporan <br />
                                            <input type="checkbox" value="Sekreteris" className="mr-4" /> Kabid Pengelolaan BMD <br />
                                            <input type="checkbox" value="Sekreteris" className="mr-4" /> Bidang BEKK <br />
                                            <input type="checkbox" value="Sekreteris" className="mr-4" /> Kepala UPTB Perbendaharaan <br />
                                            <input type="checkbox" value="Sekreteris" className="mr-4" /> Kepala UPTB Balai PPAD <br />
                                            <input type="checkbox" value="Sekreteris" className="mr-4" /> PPK <br />
                                            <input type="checkbox" value="Sekreteris" className="mr-4" /> Pejabat Pengadaan B & J <br />
                                            <input type="checkbox" value="Sekreteris" className="mr-4" /> Fungsional Perencana <br />
                                            <input type="checkbox" value="Sekreteris" className="mr-4" /> Fungsional AKPD <br />
                                            <input type="checkbox" value="Sekreteris" className="mr-4" /> Kasubbag Umum <br />
                                            <input type="checkbox" value="Sekreteris" className="mr-4" /> Bendahara Penerimaan <br />
                                            <input type="checkbox" value="Sekreteris" className="mr-4" /> Bendahara Pengeluaran <br />
                                            <input type="checkbox" value="Sekreteris" className="mr-4" /> Penatausahaan Pimpinan <br /><br />
                                        </th>
                                        <th></th>
                                        <th scope="row" className="px-4 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            Dengan Hormat Harap :<br />
                                            <input type="checkbox" value="Sekreteris" className="mr-4" /> Tanggapan dan Saran <br />
                                            <input type="checkbox" value="Sekreteris" className="mr-4" /> Proses lebih lanjut <br />
                                            <input type="checkbox" value="Sekreteris" className="mr-4" /> Koordinasikan/Konfirmasikan <br />
                                            <input type="checkbox" value="Sekreteris" className="mr-4" /> Hadiri <br />
                                            <input type="checkbox" value="Sekreteris" className="mr-4" /> Untuk Maklumi <br />
                                            <input type="checkbox" value="Sekreteris" className="mr-4" /> Diingatkan <br />
                                            <input type="checkbox" value="Sekreteris" className="mr-4" /> Diarsipkan <br />
                                            <input type="checkbox" value="Sekreteris" className="mr-4" /> Wakili <br />
                                            <input type="checkbox" value="Sekreteris" className="mr-4" /> Difasilitasi <br />
                                            <input type="checkbox" value="Sekreteris" className="mr-4" /> Dirapatkan <br />
                                            <input type="checkbox" value="Sekreteris" className="mr-4" /> Ditelaah <br />
                                            <input type="checkbox" value="Sekreteris" className="mr-4" /> Dijadwalkan <br />
                                            <input type="checkbox" value="Sekreteris" className="mr-4" /> Edarkan/Umumkan <br />
                                            <input type="checkbox" value="Sekreteris" className="mr-4" /> Siapkan Bahan-Bahan <br />
                                            <input type="checkbox" value="Sekreteris" className="mr-4" /> Teliti & Selesaikan <br />
                                            <input type="checkbox" value="Sekreteris" className="mr-4" /> Dipedomani <br />
                                        </th>
                                    </tr>
                                    <tr className="bg-white border dark:bg-gray-800">
                                        <th>
                                            Catatan:
                                        </th>
                                        <th></th>
                                        <th>Paraf/Tanggal</th>
                                        <th></th>
                                    </tr>
                                    <tr className="bg-white border dark:bg-gray-800">
                                        <th colSpan="2" scope="row" className="px-4 py-1 font-medium text-gray-800 whitespace-nowrap dark:text-white">
                                            <textarea id="perihal" rows="5" className="block w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Tulis disposisi" value={disposisi} onChange={(e) => setDisposisi(e.target.value)}></textarea>
                                        </th>
                                        <th>Kepala BPKAD/Sekertaris</th>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="inline-flex mb-3 text-gray-500 dark:text-gray-400">
                            <button type="submit" className="flex focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                                <svg className="w-4 h-4 mr-1 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                                    <path d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z" />
                                </svg>
                                <span>Simpan</span>
                            </button>

                            <a href='/pimpinan/surat/masuk' className="flex py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                                <svg className="w-4 h-4 mr-1 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 12 16">
                                    <path d="M10.819.4a1.974 1.974 0 0 0-2.147.33l-6.5 5.773A2.014 2.014 0 0 0 2 6.7V1a1 1 0 0 0-2 0v14a1 1 0 1 0 2 0V9.3c.055.068.114.133.177.194l6.5 5.773a1.982 1.982 0 0 0 2.147.33A1.977 1.977 0 0 0 12 13.773V2.227A1.977 1.977 0 0 0 10.819.4Z" />
                                </svg>
                                <span>Kembali</span>
                            </a>
                        </div>
                    </div>
                    <div className="ml-20 text-gray-500 dark:text-gray-400">
                        {preview ? (
                            <img className="h-auto max-w-lg rounded-lg" src={preview} alt="image description" />
                        ) : (
                            ""
                        )}
                    </div>
                </div>
            </form>
        </LayoutPimpinan>
    )
}
