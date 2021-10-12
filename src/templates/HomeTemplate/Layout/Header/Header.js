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
        <header className={navbar ? "p-4 dark:bg-coolGray-800 dark:text-coolGray-100 bg-black bg-opacity-40 text-white fixed w-full z-10 active" : "p-4 dark:bg-coolGray-800 dark:text-coolGray-100 bg-white bg-opacity-5 text-white fixed w-full z-10"}>
            <div className="container-fluid flex justify-between h-16 mx-auto">
                <NavLink to="/" aria-label="Back to homepage" className="flex items-center p-2 brand-logo" style={{width:'25%'}}>
                    <span style={{color:'#fff', fontSize:'50px', marginRight:'-8px'}}>H∴C</span>
                    <img src="https://www.freeiconspng.com/uploads/video-camera-tripod-icon-12.png" alt="cyberlearn.vn" style={{width:'10%'}} />
                    <span style={{color:'#fff', fontSize:'50px', marginLeft:'-8px'}}>nema</span>
                </NavLink>
                <ul className="hidden space-x-3 flex flex-row justify-center lg:flex items-center" style={{width:'50%', height:'100%'}}>
                    <li className="flex">
                        <NavLink to="/home" className="nav-text text-xl text-center px-4 dark:border-transparent dark:text-violet-400 dark:border-violet-400 text-white" activeClassName="border-b-2 border-white" style={{width:'8.5rem', padding:'0.5rem 0'}}>
                            Trang chủ
                        </NavLink>
                    </li>
                    <li className="flex">
                        <NavLink to="/contact" className="nav-text text-xl text-center px-4 dark:border-transparent text-white" activeClassName="border-b-2 border-white" style={{width:'8.5rem', padding:'0.5rem 0'}}>
                            Liên hệ
                        </NavLink>
                    </li>
                    <li className="flex">
                        <NavLink to="/news" className="nav-text text-xl text-center px-4 dark:border-transparent text-white" activeClassName="border-b-2 border-white" style={{width:'8.5rem', padding:'0.5rem 0'}}>
                            Tin tức
                        </NavLink>
                    </li>
                </ul>
                <div className="items-center flex-shrink-0 hidden flex flex-row justify-end lg:flex" style={{width:'25%'}}>
                    <button onClick={() => {
                        history.push('/login');
                    }} className="text-xl self-center px-1 py-3 rounded btn-user" style={{width:'9rem'}}>Đăng nhập</button>
                    <button className="text-xl self-center px-1 py-3 rounded btn-user" style={{width:'9rem'}}>Đăng ký</button>
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
