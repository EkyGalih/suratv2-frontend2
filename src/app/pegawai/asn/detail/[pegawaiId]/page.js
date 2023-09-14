'use client'

import Layout from "@/app/layouts/Layout";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function DetailPegawai() {
    const params = useParams();
    const pegawaiId = params.pegawaiId;

    const [nip, setNip] = useState("");
    const [name, setName] = useState("");
    const [jenis_pegawai, setJenisPegawai] = useState("");
    const [tempat_lahir, setTempatlahir] = useState("");
    const [tgl_lahir, setTglLahir] = useState("");
    const [nama_bidang, setNamaBidang] = useState("");
    const [jabatan, setJabatan] = useState("");
    const [nama_jabatan, setNamaJabatan] = useState("");
    const [sk, setSk] = useState("");
    const [pangkat, setPangkat] = useState("");
    const [golongan, setGolongan] = useState("");
    const [mkg, setMkg] = useState("");
    const [diklat, setDiklat] = useState("");
    const [pendidikan, setPendidikan] = useState("");
    const [umur, setUmur] = useState("");
    const [jk, setJk] = useState("");
    const [agama, setAgama] = useState("");
    const [kp, setKp] = useState("");
    const [pensiun, setPensiun] = useState(0);
    const [foto, setFoto] = useState("");
    const [preview, setPreview] = useState("");

    useEffect(() => {
        getPegawaiById();
    }, []);

    async function getPegawaiById() {
        const res = await fetch(
            `http://localhost:5000/admin/pegawai/${pegawaiId}`, {
            method: "GET",
            headers: {
                "Content-type": "application/json"
            },
        });
        const response = await res.json();
        setName(response.name);
        setNip(response.nip);
        setSk(response.no_sk);
        setMkg(response.masa_kerja_golongan);
        setKp(response.kenaikan_pangkat);
        setNamaBidang(response.bidang?.nama_bidang);
        setPangkat(response.pangkat?.nama_pangkat);
        setGolongan(response.Golongan?.nama_golongan);
        setTempatlahir(response.tempat_lahir);
        setTglLahir(response.tanggal_lahir);
        setUmur(response.umur);
        setAgama(response.agama);
        setPensiun(response.batas_pensiun);
        setJenisPegawai(response.jenis_pegawai);
        setJabatan(response.nama_jabatan);
        setPendidikan(response.pendidikan);
        setNamaJabatan(response.jabatan);
        setJk(response.jenis_kelamin);
        setDiklat(response.diklat);
        setFoto(response.foto);
        setPreview(response.url);
    };

    return (
        <Layout>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <div className="col-span-1">
                    <figure className="max-w-lg p-20 ml-44">
                        <img className="h-auto max-w-full ml-28 rounded-lg" src={preview} alt={name} />
                    </figure>
                </div>
                <div className="col-span-1 p-20">
                    <h2 className="flex mb-1 text-4x1 font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl lg:text-4xl dark:text-white">
                        <svg className="w-9 h-9 mr-1 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
                            <path d="M18 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2ZM6.5 3a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3.014 13.021l.157-.625A3.427 3.427 0 0 1 6.5 9.571a3.426 3.426 0 0 1 3.322 2.805l.159.622-6.967.023ZM16 12h-3a1 1 0 0 1 0-2h3a1 1 0 0 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Z" />
                        </svg>{name}
                    </h2>
                    <h4 className="mb-5 text-2xl leading-none tracking-tight text-gray-700 md:text-2xl lg:text-2xl dark:text-white">
                        {nip}
                        <span className="bg-blue-100 text-blue-800 text-2xl font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-2">
                            {pangkat} - {golongan}
                        </span>
                    </h4>
                    <p className="bg-blue-100 text-blue-800 text-lg font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400 mb-5">Pegawai  Menjabat Sebagai {nama_jabatan}</p>
                    <h4 className="mb-2 text-2x1 font-bold text-gray-600 md:text-2xl lg:text-2xl dark:text-white">{nama_bidang}</h4>
                    <p className="text-gray-700 dark:text-white mb-2">
                        <span className="font-semibold">Lahir di </span> {tempat_lahir},  {tgl_lahir}
                        <span className="bg-slate-500 text-slate-300 font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-slate-200 dark:text-slate-800 ml-2">
                            {umur} Tahun
                        </span>
                    </p>
                    <p className="text-gray-700 dark:text-white mb-2">
                        <span className="font-semibold">No SK </span> {sk}, <span className="font-semibold">Masa kerja</span>
                        <span className="bg-green-500 text-green-300 font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-green-200 dark:text-green-800 ml-2">
                            {mkg}
                        </span>
                    </p>
                    <p className="bg-cyan-100 text-cyan-800 text-md font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-cyan-400 border border-cyan-400 mb-2"> <span className="font-semibold">Menempuh Pendidikan </span>{pendidikan}</p>
                    <p className="bg-blue-100 text-blue-800 text-md font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400 mb-2"><span className="font-semibold">Pendidikan dan Pelatihan </span>{diklat}</p>
                    <p className="text-gray-700 dark:text-white">Naik Pangkat Pada: <span className="font-extrabold">{kp}</span></p>
                    <p className="text-gray-700 dark:text-white mb-5">Pensiun Pada: <span className="font-extrabold">Tahun {pensiun}</span></p>

                    <span className="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-green-400 border border-green-400">{jenis_pegawai}</span>
                    <span className="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-700 dark:text-green-400 border border-green-500">{agama}</span>
                    <span className="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-green-400 border border-green-400">{jk}</span>

                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-4 mt-10">
                        <a href='/' className="inline-flex py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                            <svg className="w-3 h-3 mr-1 mt-1 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 12 16">
                                <path d="M10.819.4a1.974 1.974 0 0 0-2.147.33l-6.5 5.773A2.014 2.014 0 0 0 2 6.7V1a1 1 0 0 0-2 0v14a1 1 0 1 0 2 0V9.3c.055.068.114.133.177.194l6.5 5.773a1.982 1.982 0 0 0 2.147.33A1.977 1.977 0 0 0 12 13.773V2.227A1.977 1.977 0 0 0 10.819.4Z" />
                            </svg>
                            <span>Kembali</span>
                        </a>
                    </div>
                </div>
            </div>
        </Layout>
    )
}
