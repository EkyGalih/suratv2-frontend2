'use client'
import LayoutAdmin from "@/app/layouts/admin/LayoutAdmin";
import Link from "next/link";
import { redirect, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";

export default function EditPegawai() {
    const [bidang, setBidang] = useState([]);
    const [pangkat, setPangkat] = useState([]);
    const [golongan, setGolongan] = useState([]);

    const params = useParams();
    const pegawaiId = params.pegawaiId;

    const [nip, setNip] = useState("");
    const [name, setName] = useState("");
    const [jenis_pegawai, setJenisPegawai] = useState("");
    const [tempat_lahir, setTempatlahir] = useState("");
    const [tgl_lahir, setTglLahir] = useState("");
    const [bidangId, setBidangId] = useState("");
    const [jabatan, setJabatan] = useState("");
    const [nama_jabatan, setNamaJabatan] = useState("");
    const [sk, setSk] = useState("");
    const [bank, setBank] = useState("");
    const [rekening, setRekening] = useState("");
    const [pangkatId, setPangkatId] = useState("");
    const [golonganId, setGolonganId] = useState("");
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
    const [msg, setMsg] = useState("");
    const [status, setStatus] = useState("");

    useEffect(() => {
        getData();
        getPegawaiById();
    }, [preview, msg]);

    // load image preview
    const loadImage = (e) => {
        const image = e.target.files[0];
        setFoto(image);
        setPreview(URL.createObjectURL(image));
    }

    async function getPegawaiById() {
        const res = await fetch(
            `http://localhost:5000/admin/pegawai/${pegawaiId}`, {
            method: "GET",
            headers: {
                "Content-type": "application/json"
            },
        });
        const response = await res.json();
        console.log(response);
        setName(response.name);
        setNip(response.nip);
        setSk(response.no_sk);
        setMkg(response.masa_kerja_golongan);
        setKp(response.kenaikan_pangkat);
        setBidangId(response.bidangId);
        setPangkatId(response.pangkatId);
        setGolonganId(response.golonganId);
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
        setBank(response.nama_rekening);
        setRekening(response.no_rekening);
        setDiklat(response.diklat);
        setFoto(response.foto);
        setPreview(response.url);
    }

    async function getData() {
        const dataBidang = await fetch(
            `http://localhost:5000/admin/bidang`, {
            method: "GET",
            headers: {
                "Content-type": "application/json"
            }
        });

        const dataPangkat = await fetch(
            `http://localhost:5000/admin/pangkat`, {
            method: "GET",
            headers: {
                "Content-type": "application/json"
            }
        });

        const dataGolongan = await fetch(
            `http://localhost:5000/admin/golongan`, {
            method: "GET",
            headers: {
                "Content-type": "application/json"
            }
        });

        const dBidang = await dataBidang.json();
        setBidang(dBidang);


        const dPangkat = await dataPangkat.json();
        setPangkat(dPangkat);


        const dGolongan = await dataGolongan.json();
        setGolongan(dGolongan);
    }

    const savePegawai = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("nip", nip);
        formData.append("jenis_pegawai", jenis_pegawai);
        formData.append("name", name);
        formData.append("tempat_lahir", tempat_lahir);
        formData.append("tanggal_lahir", tgl_lahir);
        formData.append("nama_jabatan", jabatan);
        formData.append("jabatan", nama_jabatan);
        formData.append("initial_jabatan", jabatan);
        formData.append("masa_kerja_golongan", mkg);
        formData.append("diklat", diklat);
        formData.append("pendidikan", pendidikan);
        formData.append("no_sk", sk);
        formData.append("no_rekening", rekening);
        formData.append("nama_rekening", bank);
        formData.append("umur", umur);
        formData.append("jenis_kelamin", jk);
        formData.append("agama", agama);
        formData.append("foto", foto);
        formData.append("kenaikan_pangkat", kp);
        formData.append("batas_pensiun", pensiun);
        formData.append("pangkatId", pangkatId);
        formData.append("golonganId", golonganId);
        formData.append("bidangId", bidangId);

        try {
            await axios.post(
                "http://localhost:5000/admin/pegawai", formData, {
                "Content-type": "multipart/form-data"
            });
            redirect('/admin/pegawai');
        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.msg);
            }
        }

    }

    return (
        <LayoutAdmin>
            <div className='grid grid-cols-1 gap-6 sm:grid-cols-2'>
                <h2 className="flex title mb-5 text-2xl font-extrabold dark:text-white">
                    <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                    </svg>
                    <span className="flex-1 ml-2 whitespace-nowrap">Pegawai</span>
                </h2>
            </div>
            <nav className="flex mb-5" aria-label="Breadcrumb">
                <ol className="inline-flex items-center space-x-1 md:space-x-3">
                    <li className="inline-flex items-center">
                        <a href="/admin/user" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
                            <svg className="w-3 h-3 mr-2 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 10">
                                <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M6 1h10M6 5h10M6 9h10M1.49 1h.01m-.01 4h.01m-.01 4h.01" />
                            </svg>
                            Pegawai
                        </a>
                    </li>
                    <li>
                        <div className="flex items-center">
                            <svg className="w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                            </svg>
                            <a href="#" className="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2 dark:text-gray-400 dark:hover:text-white">Edit Pegawai</a>
                        </div>
                    </li>
                </ol>
            </nav>
            <hr className='mb-3' />
            {msg == '' ? '' : <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                <span className="font-medium">Error!</span> {msg}
            </div>}
            <form onSubmit={savePegawai}>
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    <div className='col-span-1'>
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nama Pegawai <sup className="text-red-500">*</sup></label>
                        <input type="text" id="name" className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="col-span-1 mb-2">
                        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                            <div className="col-span-1 mb-2">
                                <label htmlFor="no-sk" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">No SK</label>
                                <input type="text" placeholder="" id="no-sk" className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={sk} onChange={(e) => setSk(e.target.value)} />
                            </div>
                            <div className="col-span-1 mb-2">
                                <label htmlFor="masa-kerja-golongan" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Masa Kerja Golongan</label>
                                <input type="text" placeholder="" id="masa-kerja-golongan" className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={mkg} onChange={(e) => setMkg(e.target.value)} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    <div className="col-span-1 mb-2">
                        <label htmlFor="nip" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">NIP</label>
                        <input type="number" id="nip" className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={nip} onChange={(e) => setNip(e.target.value)} />
                    </div>
                    <div className="col-span-1 mb-2">
                        <label htmlFor="kenaikan-pangkat" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tahun Kenaikan Pangkat</label>
                        <input type="text" placeholder="" id="kenaikan-pangkat" className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={kp} onChange={(e) => setKp(e.target.value)} />
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    <div className='col-span-1 mb-2'>
                        <label htmlFor="bidang" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Bidang <sup className="text-red-500">*</sup></label>
                        <select id="bidang" className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={bidangId} onChange={(e) => setBidangId(e.target.value)}>
                            <option>Pilih</option>
                            {bidang && bidang.map((bid) => {
                                return (
                                    <option key={bid.id} value={bid.id}>{bid.nama_bidang}</option>
                                )
                            })}
                        </select>
                    </div>
                    <div className='col-span-1 mb-2'>
                        <label htmlFor="pangkat" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Pangkat/Golongan</label>
                        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                            <div className="col-span-1 mb-2">
                                <select id="pangkat" className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={pangkat} onChange={(e) => setPangkatId(e.target.value)}>
                                    <option>Pilih</option>
                                    {pangkat && pangkat.map((pang) => {
                                        return (
                                            <option key={pang.id} value={pang.id}>{pang.nama_pangkat}</option>
                                        )
                                    })}
                                </select>
                            </div>
                            <div className="col-span-1 mb-2">
                                <select id="golongan" className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={golongan} onChange={(e) => setGolonganId(e.target.value)}>
                                    <option>Pilih</option>
                                    {golongan && golongan.map((gol) => {
                                        return (
                                            <option key={gol.id} value={gol.id}>{gol.nama_golongan}</option>
                                        )
                                    })}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    <div className='col-span-1 mb-2'>
                        <label htmlFor="tempat-lahir" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tempat/Tanggal Lahir <sup className="text-red-500">*</sup></label>
                        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                            <div className="col-span-1 mb-2">
                                <input type="text" placeholder="" id="tempat-lahir" className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={tempat_lahir} onChange={(e) => setTempatlahir(e.target.value)} />
                            </div>
                            <div className="col-span-1 mb-2">
                                <input type="date" placeholder="" id="tanggal-lahir" className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={tgl_lahir} onChange={(e) => setTglLahir(e.target.value)} />
                            </div>
                        </div>
                    </div>
                    <div className='col-span-1 mb-2'>
                        <label htmlFor="umur" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Umur <sup className="text-red-500">*</sup></label>
                        <input type="text" placeholder="" id="umur" className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={umur} onChange={(e) => setUmur(e.target.value)} />
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    <div className="col-span-1 mb-2">
                        <label htmlFor="agama" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Agama <sup className="text-red-500">*</sup></label>
                        <select id="agama" className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={agama} onChange={(e) => setAgama(e.target.value)}>
                            <option>Pilih</option>
                            <option value="islam">Islam</option>
                            <option value="kristen">Kristen</option>
                            <option value="hindu">Hindu</option>
                            <option value="budha">Budha</option>
                        </select>
                    </div>
                    <div className="col-span-1 mb-2">
                        <label htmlFor="pensiun" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Batas pensiun</label>
                        <input type="text" placeholder="" id="pensiun" className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={pensiun} onChange={(e) => setPensiun(e.target.value)} />
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    <div className='col-span-1 mb-2'>
                        <label htmlFor="jenis-pegawai" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Jenis Pegawai <sup className="text-red-500">*</sup></label>
                        <select id="jenis-pegawai" className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={jenis_pegawai} onChange={(e) => setJenisPegawai(e.target.value)}>
                            <option>Pilih</option>
                            <option value="pns">PNS</option>
                            <option value="p3k">P3K</option>
                            <option value="ptt">PTT</option>
                            <option value="kontrak">Kontrak</option>
                        </select>
                    </div>
                    <div className='col-span-1 mb-2'>
                        <label htmlFor="jabatan" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Jabatan<sup className="text-red-500">*</sup></label>
                        <select id="jabatan" className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={jabatan} onChange={(e) => setJabatan(e.target.value)} >
                            <option>Pilih</option>
                            <option value="kaban">Kaban</option>
                            <option value="sekban">Sekban</option>
                            <option value="kabag">Kabag</option>
                            <option value="kasubag">Kasubag</option>
                            <option value="pegawai">Pegawai</option>
                        </select>
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    <div className="col-span-1 mb-2">
                        <label htmlFor="pendidikan" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Pendidikan</label>
                        <textarea id="pendidikan" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Deskripsi pendidikan, jurusan, fakultas dan universitas..." value={pendidikan} onChange={(e) => setPendidikan(e.target.value)}></textarea>
                    </div>
                    <div className="col-span-1 mb-2">
                        <label htmlFor="nama-jabatan" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nama jabatan <sup className="text-red-500">*</sup></label>
                        <textarea id="nama-jabatan" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Deskripsi berdasarkan jabatan..." value={nama_jabatan} onChange={(e) => setNamaJabatan(e.target.value)}></textarea>
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    <div className="col-span-1 mb-2">
                        <label htmlFor="jenis-kelamin" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Jenis Kelamin <sup className="text-red-500">*</sup></label>
                        <select id="jenis-kelamin" className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={jk} onChange={(e) => setJk(e.target.value)}>
                            <option>Pilih</option>
                            <option value="pria">Pria</option>
                            <option value="perempuan">Perempuan</option>
                        </select>
                    </div>
                    <div className="col-span-1 mb-2">
                        <label htmlFor="rekening" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Rekening/No Rekening</label>
                        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                            <div className="mb-4">
                                <input type="text" id="rekening" className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={bank} onChange={(e) => setBank(e.target.value)} />
                            </div>
                            <div className="mb-8">
                                <input type="number" id="no-rekeing" className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={rekening} onChange={(e) => setRekening(e.target.value)} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    <div className="col-span-1 mb-2">
                        <label htmlFor="diklat" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Diklat</label>
                        <textarea id="diklat" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Deskripsi berdasarkan jabatan..." value={diklat} onChange={(e) => setDiklat(e.target.value)}></textarea>
                    </div>
                    <div className="col-span-1 mb-2">
                        <label htmlFor="foto" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Foto <sup className="text-red-500">*</sup></label>
                        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                            <div className="col-span-1">
                                <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="file_input_help" id="foto" type="file" onChange={loadImage} />
                                <p className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">SVG, PNG, JPG or GIF (MAX. 800x400px).</p>
                            </div>
                            <div className="col-span-1">

                                {preview ? (
                                    <img className="h-52 ml-20 max-w-lg rounded-lg" src={preview} alt="image description" />
                                ) : (
                                    ""
                                )}

                            </div>
                        </div>
                    </div>
                </div>
                <hr className='mb-3' />
                <div className="flex col-span-1 mb-2">
                    <button type="submit" className="flex focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                        <svg className="w-4 h-4 mr-1 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                            <path d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z" />
                        </svg>
                        <span>Simpan</span>
                    </button>

                    <Link href='/admin/user' className="flex py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                        <svg className="w-4 h-4 mr-1 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 12 16">
                            <path d="M10.819.4a1.974 1.974 0 0 0-2.147.33l-6.5 5.773A2.014 2.014 0 0 0 2 6.7V1a1 1 0 0 0-2 0v14a1 1 0 1 0 2 0V9.3c.055.068.114.133.177.194l6.5 5.773a1.982 1.982 0 0 0 2.147.33A1.977 1.977 0 0 0 12 13.773V2.227A1.977 1.977 0 0 0 10.819.4Z" />
                        </svg>
                        <span>Kembali</span>
                    </Link>
                </div>
            </form>
        </LayoutAdmin>
    )
}
