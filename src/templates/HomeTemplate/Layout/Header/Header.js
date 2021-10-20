import React, { Fragment } from 'react'
import { useState } from 'react';
import { NavLink } from 'react-router-dom'
import { history } from '../../../../App'
import './Header.css'
import { Select } from 'antd';
import _ from 'lodash';
import { useSelector } from 'react-redux'

//Hook để dịch đa ngôn ngữ
import { useTranslation } from 'react-i18next';
import { ACCESS_TOKEN, USER_LOGIN } from '../../../../util/settings/config';

import { Menu, Dropdown } from 'antd';
import { DownOutlined, MenuOutlined } from '@ant-design/icons';


const { Option } = Select;



export default function Header(props) {
    //Đổi style cho header navbar khi roll xuống
    const [navbar, setNavbar] = useState(false);
    const changeBackground = () => {
        if (window.scrollY >= 80) {
            setNavbar(true);
        } else {
            setNavbar(false);
        }
    }
    window.addEventListener('scroll', changeBackground);

    const { userLogin } = useSelector(state => state.QuanLyNguoiDungReducer)

    const { t, i18n } = useTranslation();
    function handleChange(value) {
        i18n.changeLanguage(value)
    }

    const menu = (
        <Menu>
            <Menu.Item key="0">
                <NavLink to="/home" className="nav-text text-xl text-center px-4 dark:border-transparent dark:text-violet-400 dark:border-violet-400 text-white" activeClassName="border-b-2 border-white" style={{ width: '8.5rem', padding: '0.5rem 0' }}>
                    {t('Trang chủ')}
                </NavLink>
            </Menu.Item>
            <Menu.Item key="1">
                <NavLink to="/contact" className="nav-text text-xl text-center px-4 dark:border-transparent text-white" activeClassName="border-b-2 border-white" style={{ width: '8.5rem', padding: '0.5rem 0' }}>
                    {t('Liên hệ')}
                </NavLink>
            </Menu.Item>
            <Menu.Item key="3">
                <NavLink to="/news" className="nav-text text-xl text-center px-4 dark:border-transparent text-white" activeClassName="border-b-2 border-white" style={{ width: '8.5rem', padding: '0.5rem 0' }}>
                    {t('Tin tức')}
                </NavLink>
            </Menu.Item>
        </Menu>
    );

    const renderLogin = () => {
        if (_.isEmpty(userLogin)) {
            return <Fragment>
                <button onClick={() => {
                    history.push('/login');
                }} className="text-xl self-center px-1 py-3 mr-2 rounded btn-user" style={{ width: '9rem' }}>{t('Đăng nhập')}</button>
                <button onClick={() => {
                    history.push('/register');
                }} className="text-xl self-center px-1 py-3 mr-2 rounded btn-user" style={{ width: '9rem' }}>{t('Đăng ký')}</button>
            </Fragment>
        }
        return <Fragment>
            <button onClick={() => {
                history.push('./profile')
            }} className="text-xl self-center px-1 py-3 rounded btn-logged-user" style={{ width: '12rem', fontSize: '1rem' }}>{t('Xin chào')} {userLogin.taiKhoan}</button>
            <button className="btn-sign-out" onClick={() => {
                localStorage.removeItem(USER_LOGIN);
                localStorage.removeItem(ACCESS_TOKEN);
                history.push('/home');
                window.location.reload();
            }} style={{ padding: '0.91rem', fontSize: '1rem' }}>{t('Đăng xuất')}</button>
        </Fragment>
    }

    return (
        <header className={navbar ? "p-4 dark:bg-coolGray-800 dark:text-coolGray-100 bg-black bg-opacity-40 text-white fixed w-full z-10 active" : "p-4 bg-black bg-opacity-60 text-white fixed w-full z-10"}>
            <div className="container-fluid flex justify-between h-16 mx-auto">
                <NavLink to="/" aria-label="Back to homepage" className="flex items-center p-2 brand-logo" style={{ width: '25%' }}>
                    <span style={{ color: '#fff', fontSize: '50px', marginRight: '-8px' }}>H∴Cinema</span>
                </NavLink>
                <ul className="hidden space-x-3 flex flex-row justify-center lg:flex items-center nav-list" style={{ width: '50%', height: '100%' }}>
                    <li className="flex">
                        <NavLink to="/home" className="nav-text text-xl text-center px-4 dark:border-transparent dark:text-violet-400 dark:border-violet-400 text-white" activeClassName="border-b-2 border-white" style={{ width: '8.5rem', padding: '0.5rem 0' }}>
                            {t('Trang chủ')}
                        </NavLink>
                    </li>
                    <li className="flex">
                        <NavLink to="/contact" className="nav-text text-xl text-center px-4 dark:border-transparent text-white" activeClassName="border-b-2 border-white" style={{ width: '8.5rem', padding: '0.5rem 0' }}>
                            {t('Liên hệ')}
                        </NavLink>
                    </li>
                    <li className="flex">
                        <NavLink to="/news" className="nav-text text-xl text-center px-4 dark:border-transparent text-white" activeClassName="border-b-2 border-white" style={{ width: '8.5rem', padding: '0.5rem 0' }}>
                            {t('Tin tức')}
                        </NavLink>
                    </li>
                </ul>
                <div className="items-center flex-shrink-0 hidden flex flex-row justify-end lg:flex" style={{ width: '25%' }}>
                    {renderLogin()}

                    <Select defaultValue={i18n.language} style={{ width: 65 }} onChange={handleChange}>
                        <Option value="vi">VI</Option>
                        <Option value="en">EN</Option>
                    </Select>
                </div>
                <Dropdown overlay={menu} trigger={['click']} className="p-4 lg:hidden">
                    <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                        <MenuOutlined />
                    </a>
                </Dropdown>
            </div>
        </header>
    )
}
