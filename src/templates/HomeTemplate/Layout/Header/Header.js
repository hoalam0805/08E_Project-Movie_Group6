import React from 'react'
import { useState } from 'react';
import { NavLink } from 'react-router-dom'
import { history } from '../../../../App'
import './Header.css'

export default function Header(props) {
    const [navbar, setNavbar] = useState(false);

    const changeBackground = () => {
        if(window.scrollY >= 80){
            setNavbar(true);
        } else {
            setNavbar(false);
        }
    }

    window.addEventListener('scroll',changeBackground);

    return (
        <header className={navbar ? "p-4 dark:bg-coolGray-800 dark:text-coolGray-100 bg-black bg-opacity-40 text-white fixed w-full z-10 active" : "p-4 dark:bg-coolGray-800 dark:text-coolGray-100 bg-black bg-opacity-40 text-white fixed w-full z-10"}>
            <div className="container flex justify-between h-16 mx-auto">
                <a href="#" aria-label="Back to homepage" className="flex items-center p-2">
                    <img src="https://cyberlearn.vn/wp-content/uploads/2020/03/cyberlearn-min-new-opt2.png" alt="cyberlearn.vn" />
                </a>
                <ul className="items-stretch hidden space-x-3 lg:flex">
                    <li className="flex">
                        <NavLink to="/home" className="font-semibold flex items-center px-4 -mb-1 dark:border-transparent dark:text-violet-400 dark:border-violet-400 text-white" activeClassName="border-b-2 border-white">
                            Trang chủ
                        </NavLink>
                    </li>
                    <li className="flex">
                        <NavLink to="/contact" className="font-semibold flex items-center px-4 -mb-1 dark:border-transparent text-white" activeClassName="border-b-2 border-white">
                            Liên hệ
                        </NavLink>
                    </li>
                    <li className="flex">
                        <NavLink to="/news" className="font-semibold flex items-center px-4 -mb-1 dark:border-transparent text-white" activeClassName="border-b-2 border-white">
                            Tin tức
                        </NavLink>
                    </li>
                </ul>
                <div className="items-center flex-shrink-0 hidden lg:flex">
                    <button onClick={() => {
                        history.push('/login');
                    }} className="self-center px-8 py-3 font-semibold rounded">Đăng nhập</button>
                    <button className="self-center px-8 py-3 font-semibold rounded dark:bg-violet-400 dark:text-coolGray-900">Đăng ký</button>
                </div>
                <button className="p-4 lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 dark:text-coolGray-100">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </div>
        </header>
    )
}
