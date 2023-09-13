"use client"
import { LoginUser } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"

export const metadata = {
  title: 'Login',
  description: 'App surat bpkad'
}

export default function Home() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (sessionStorage.getItem('userId') !== null) {
      router.back();
    } else {
      router.push('/');
    }
  }, []);

const login = async (e) => {
    e.preventDefault();

    const res = await fetch(
      'http://localhost:5000/login', {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        username: username,
        password: password
      }),
    });
    const response = await res.json();
    if (response.status === 404 || response.status === 400) {
      setMsg(response.msg);
    } else if (response.status === 200) {
      sessionStorage.setItem('userId', response.id);
      sessionStorage.setItem('username', response.username);
      sessionStorage.setItem('name', response.nama_lengkap);
      sessionStorage.setItem('level', response.level);

      const userId = sessionStorage.getItem('userId');
      const peg = await fetch(
        `http://localhost:5000/me/${userId}`, {
        method: "GET",
        headers: {
          "Content-type": "application/json"
        },
      });
      const pegawai = await peg.json();

      sessionStorage.setItem('foto', pegawai.pegawai.url);
      const level = sessionStorage.getItem('level');

      if (level === 'admin') {
        router.push('/admin');
      } else if (level == 'user') {
        sessionStorage.setItem('bidangId', pegawai.pegawai.bidangId);
        router.push('/user');
      } else if (level == 'pimpinan') {
        router.push('/pimpinan');
      } else if (level == 'agendaris') {
        router.push('/agendaris');
      } else {
        router.push('/');
        setMsg('Pastikan username dan password anda benar!');
      }

    }
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="col-span-1"></div>
        <div className="block max-w-md p-10 mt-44 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
          <h1 className="text-4xl font-bold dark:text-white">Form Login</h1>
          <hr className="mb-3 mt-3" />
          {msg === ''
            ? ''
            : <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
              <span class="font-medium">Error!</span> {msg}
            </div>
          }
          <form onSubmit={login}>
            <div className="mb-6">
              <label htmlFor="username" className="block mb-2 text-sm font-bold text-gray-900 dark:text-slate-950">Username</label>
              <input type="username" value={username} onChange={(e) => setUsername(e.target.value)} id="username" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Username" required />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block mb-2 text-sm font-bold text-gray-900 dark:text-white">Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="****" required />
            </div>
            <div className="flex items-start mb-6">
              <div className="flex items-center h-5">
                <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" />
              </div>
              <label htmlFor="remember" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Ingat Saya</label>
            </div>
            <button type="submit" className="inline-flex text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              <svg className="w-4 h-4 mr-2 text-gray-200 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 15">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 7.5h11m0 0L8 3.786M12 7.5l-4 3.714M12 1h3c.53 0 1.04.196 1.414.544.375.348.586.82.586 1.313v9.286c0 .492-.21.965-.586 1.313A2.081 2.081 0 0 1 15 14h-3" />
              </svg>
              <span className="-mt-0.5">Masuk</span>
            </button>
          </form>
        </div>
      </div>

    </>
  )
}
