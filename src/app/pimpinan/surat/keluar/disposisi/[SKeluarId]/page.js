'use client'

import LayoutPimpinan from "@/app/layouts/pimpinan/LayoutPimpinan";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DisposisiSuratKeluar() {
  const params = useParams();
  const suratId = params.SKeluarId;

  const [file, setFile] = useState("");
  const [perihal, setPerihal] = useState("");
  const [disposisi, setDisposisi] = useState("");
  const [kategori, setKategori] = useState("");
  const [bidang, setBidang] = useState([]);
  const [bidangId, setBidangId] = useState("");
  const [asal_surat, setAsalSurat] = useState("");
  const [tgl_surat, setTglSurat] = useState("");
  const [tgl_terima, setTglTerima] = useState("");
  const [no_surat, setNoSurat] = useState("");
  const [preview, setPreview] = useState("");
  const [msg, setMsg] = useState("");
  const router = useRouter();

  useEffect(() => {
    getBidangById();
    getSuratById();
  }, [bidangId, bidang]);

  async function getSuratById() {
    const res = await axios.get(
      `${process.env.HOST}/pimpinan/surats/${suratId}`
    );
    setFile(res.data.file);
    setPerihal(res.data.surat.perihal);
    setNoSurat(res.data.surat.no_surat);
    setKategori(res.data.surat.kategori);
    setBidangId(res.data.surat.bidangId);
    setAsalSurat(res.data.surat.asal_surat);
    setTglSurat(res.data.surat.tgl_surat);
    setTglTerima(res.data.surat.tgl_terima);
    setPreview(res.data.path_file);
    setDisposisi(res.data.surat.isi_disposisi);

  }

  async function getBidangById() {
    const bid = await axios.get(
      `${process.env.HOST}/agendaris/bidang/${bidangId}`
    );
    setBidang(bid.data.nama_bidang);
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
      router.push('/pimpinan/surat/keluar');
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
          <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
            <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
            <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
          </svg>
          <span className="flex-1 ml-2 whitespace-nowrap">Disposisi Surat Keluar</span>
        </h2>
      </div>
      <nav className="flex mb-5" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-3">
          <li className="inline-flex items-center">
            <a href="/agendaris/surat/keluar" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
              <svg className="w-3 h-3 mr-2 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 10">
                <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M6 1h10M6 5h10M6 9h10M1.49 1h.01m-.01 4h.01m-.01 4h.01" />
              </svg>
              Surat Keluar
            </a>
          </li>
          <li>
            <div className="flex items-center">
              <svg className="w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
              </svg>
              <a href="#" className="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2 dark:text-gray-400 dark:hover:text-white">Disposisi Surat Keluar</a>
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
          <div className="col-span-1">
            <div className="mb-3 text-gray-500 dark:text-gray-400">
                <div className="inline-flex">
                  <span className="px-2 py-2 mr-11">Pemohon</span>
                  <span className="px-2 py-2 mr-4">:</span>
                  <span className="px-2 py-2">{bidang}</span>
                </div>
                <div className="inline-flex">
                  <span className="px-2 py-2 mr-8">Jenis Surat</span>
                  <span className="px-2 py-2 mr-4">:</span>
                  <span className="px-2 py-2">Surat {kategori}</span>
                </div>
                <div className="inline-flex">
                  <span className="px-2 py-2 mr-12">No Surat</span>
                  <span className="px-2 py-2 mr-4">:</span>
                  <span className="px-2 py-2">{no_surat}</span>
                </div>
                <div className="inline-flex">
                  <span className="px-2 py-2 mr-16">Perihal</span>
                  <span className="px-2 py-2 mr-4">:</span>
                  <span className="px-2 py-2">{perihal}</span>
                </div>
                <div className="inline-flex">
                  <span className="px-2 py-2 mr-3">Tanggal Surat</span>
                  <span className="px-2 py-2 mr-4">:</span>
                  <span className="px-2 py-2">{tgl_surat}</span>
                </div>
                <div className="inline-flex">
                  <span className="px-2 py-2">Tanggal Terima</span>
                  <span className="px-2 py-2 mr-4">:</span>
                  <span className="px-2 py-2">{tgl_terima}</span>
                </div>
            </div>
            <div className="mb-3 text-gray-500 dark:text-gray-400">
              <label htmlFor="perihal" className="block mb-2 mr-5 text-sm font-medium text-gray-900 dark:text-white">Disposisi</label>
              <textarea id="perihal" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Tulis disposisi" value={disposisi} onChange={(e) => setDisposisi(e.target.value)}></textarea>
            </div>
            <div className="inline-flex mb-3 text-gray-500 dark:text-gray-400">
              <button type="submit" className="flex focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                <svg className="w-4 h-4 mr-1 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                  <path d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z" />
                </svg>
                <span>Simpan</span>
              </button>

              <a href='/pimpinan/surat/keluar' className="flex py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
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
