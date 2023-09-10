"use client"
import { Alert } from "flowbite-react"
import { useState } from "react"

export const metadata = {
  title: 'Login',
  description: 'App surat bpkad'
}

export default function Home() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>

      <div className="flex px-4 py-4 mr-96 ml-96 mt-44 rounded-lg bg-gray-50 dark:bg-gray-700">
        <form className="ml-80">
          <div className="mb-6">
            <label for="username" className="block mb-2 text-sm font-bold text-gray-900 dark:text-slate-950">Username</label>
            <input type="username" id="username" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Username" required />
          </div>
          <div className="mb-6">
            <label for="password" className="block mb-2 text-sm font-bold text-gray-900 dark:text-white">Password</label>
            <input type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="****" required />
          </div>
          <div className="flex items-start mb-6">
            <div className="flex items-center h-5">
              <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required />
            </div>
            <label for="remember" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Ingat Saya</label>
          </div>
          <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Masuk</button>
        </form>
      </div>

    </>
  )
}
