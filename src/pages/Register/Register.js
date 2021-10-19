import { useFormik } from 'formik';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import './Register.css'
import { useTranslation } from 'react-i18next';
import { dangKyAction } from '../../redux/actions/QuanLyNguoiDungActions';
import { NavLink } from 'react-router-dom';

export default function Register(props) {

    //Chức năng đa ngôn ngữ
    const { t, i18n } = useTranslation();

    const validate = values => {
        const errors = {};
        if (!values.taiKhoan) {
            if (i18n.language == 'en') {
                errors.taiKhoan = 'Required!';
            } else {
                errors.taiKhoan = 'Không được bỏ trống!';
            }

        } else if (values.taiKhoan.length > 15) {
            if (i18n.language == 'en') {
                errors.taiKhoan = 'Username must be at least 15 characters'
            } else {
                errors.taiKhoan = 'Tối đa 15 ký tự';
            }
        }

        if (!values.matKhau) {
            if (i18n.language == 'en') {
                errors.matKhau = 'Required!';
            } else {
                errors.matKhau = 'Không được bỏ trống!';
            }
        } else if (values.matKhau.length <= 8 || values.matKhau.length >= 10) {
            if (i18n.language == 'en') {
                errors.matKhau = 'Password must be at least 8 characters and less than 10 characters'
            } else {
                errors.matKhau = 'Mật khẩu cần có tối thiểu 8 ký tự và tối đa 10 ký tự';
            }
        } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$/.test(values.matKhau)) {
            if (i18n.language == 'en') {
                errors.matKhau = 'Password must have at least one uppercase letter, one lowercase letter, one number and one special character'
            } else {
                errors.matKhau = 'Mật khẩu phải chứa ít nhất 1 ký tự in hoa, 1 ký tự thường, 1 ký tự số và 1 ký tự đặc biệt';
            }
        }

        if (!values.hoTen) {
            if (i18n.language == 'en') {
                errors.hoTen = 'Required!';
            } else {
                errors.hoTen = 'Không được bỏ trống!';
            }
        } else if (!/\b[A-Z][a-z]* [A-Z][a-z]*( [A-Z])?[^*|\":<>[\]{}`\\()';@&$#!%^_+-=/~]+\b$/.test(values.hoTen)) {
            if (i18n.language == 'en') {
                errors.hoTen = 'Each name must begin with capital letter, no number or special character';
            } else {
                errors.hoTen = 'Các ký tự đầu trong tên phải được in hoa, không chứa số và ký tự đặc biệt';
            }
        }

        if (!values.soDT) {
            if (i18n.language == 'en') {
                errors.soDT = 'Required!';
            } else {
                errors.soDT = 'Không được bỏ trống!';
            }
        } else if (!/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/.test(values.soDT)) {
            if (i18n.language == 'en') {
                errors.soDT = 'Phone number must not include special character except + symbol';
            } else {

                errors.soDT = 'Số điện thoại không được chứa các ký tự đặc biệt nào ngoài dấu +';
            }
        }

        if (!values.email) {
            if (i18n.language == 'en') {
                errors.email = 'Required!';
            } else {
                errors.email = 'Không được bỏ trống!';
            }
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            if (i18n.language == 'en') {
                errors.email = 'Wrong email format'
            } else {
                errors.email = 'Email không hợp lệ';
            }
        }

        return errors;
    };

    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            taiKhoan: "string",
            matKhau: "string",
            email: "string",
            soDt: "string",
            hoTen: "string"
        },
        validate,
        onSubmit: (values) => {
            const action = dangKyAction(values);
            //Hiện alert nếu đăng ký thành công
            if (i18n.language == 'en') {
                alert("Successfully created a new account!");
            } else {
                alert("Đăng ký tài khoản thành công!");
            }
            dispatch(action);
        }
    });

    return (
        <form onSubmit={formik.handleSubmit} className="xl:max-w-screen-sm" style={{ overflow: 'hidden', position: 'relative', minWidth: '100vw', minHeight: "100vh", backgroundImage: 'url("https://tix.vn/app/assets/img/icons/backapp.jpg")', fontFamily: 'Roboto' }}>
            <div className="mt-10 px-12 sm:px-24 md:px-48 lg:px-12 lg:mt-16 xl:px-24 xl:max-w-2xl" style={{ backgroundColor: '#fff', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', padding: '1.5rem 2rem', width: '900px', margin: '0', borderRadius: '2rem' }}>
                <h2 className="text-center text-4xl font-display font-semibold lg:text-left xl:text-5xl xl:text-bold" style={{ textAlign: "center", color: 'coral' }}>{t('ĐĂNG KÝ')}</h2>
                <div className="mt-5">
                    <div>
                        <div className="flex flex-row justify-between items-start">
                            <div className="mb-2 form-goup" style={{ width: '45%' }}>
                                <div className="text-sm font-bold text-gray-700 tracking-wide">{t('Tên tài khoản')}</div>
                                <input onChange={formik.handleChange} name="taiKhoan" className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" type placeholder={t("Nhập vào tài khoản")} />
                                {formik.errors.taiKhoan ? <div style={{ color: 'maroon', fontFamily: 'Roboto', fontSize: '14px', fontStyle: 'italic' }}>{formik.errors.taiKhoan}</div> : null}
                            </div>
                            <div className="mb-2 form-goup" style={{ width: '45%' }}>
                                <div className="text-sm font-bold text-gray-700 tracking-wide">{t('Mật khẩu')}</div>
                                <input onChange={formik.handleChange} type="password" name="matKhau" className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" placeholder={t("Nhập vào mật khẩu")} />
                                {formik.errors.matKhau ? <div style={{ color: 'maroon', fontFamily: 'Roboto', fontSize: '14px', fontStyle: 'italic' }}>{formik.errors.matKhau}</div> : null}
                            </div>
                        </div>

                        <div className="flex flex-row justify-between items-start">
                            <div className="mb-2 form-goup" style={{ width: '45%' }}>
                                <div className="text-sm font-bold text-gray-700 tracking-wide">{t('Họ tên')}</div>
                                <input onChange={formik.handleChange} type="text" name="hoTen" className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" placeholder={t("Nhập họ và tên")} />
                                {formik.errors.hoTen ? <div style={{ color: 'maroon', fontFamily: 'Roboto', fontSize: '14px', fontStyle: 'italic' }}>{formik.errors.hoTen}</div> : null}
                            </div>
                            <div className="mb-2 form-goup" style={{ width: '45%' }}>
                                <div className="text-sm font-bold text-gray-700 tracking-wide">{t('Số điện thoại')}</div>
                                <input onChange={formik.handleChange} type="text" name="soDT" className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" placeholder={t("Nhập số điện thoại")} />
                                {formik.errors.soDT ? <div style={{ color: 'maroon', fontFamily: 'Roboto', fontSize: '14px', fontStyle: 'italic' }}>{formik.errors.soDT}</div> : null}
                            </div>
                        </div>

                        <div className="flex flex-row justify-between items-start">
                            <div className="mb-2 form-goup" style={{ width: '45%' }}>
                                <div className="text-sm font-bold text-gray-700 tracking-wide">{t('Email')}</div>
                                <input onChange={formik.handleChange} type="email" name="email" className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" placeholder={t("Nhập email")} />
                                {formik.errors.email ? <div style={{ color: 'maroon', fontFamily: 'Roboto', fontSize: '14px', fontStyle: 'italic' }}>{formik.errors.email}</div> : null}
                            </div>

                            <div className="flex flex-row justify-between items-center" style={{ width: '45%' }}>
                                <div className="mt-2 mb-2 form-goup" style={{ width: '45%' }}>
                                    <button type="submit" className="btn-sign-up bg-black text-yellow-500 p-4 w-full rounded-full tracking-wide
                          font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-yellow-500 hover:text-black
                          shadow-lg">
                                        {t('ĐĂNG KÝ')}
                                    </button>
                                </div>
                                <div className="mt-2 mb-2 btn-login form-goup" style={{ width: '45%' }}>
                                    <button type="submit" className="btn-sign-up bg-black text-yellow-500 p-4 w-full rounded-full tracking-wide
                          font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-yellow-500 hover:text-black
                          shadow-lg"><NavLink to="/login">{t('ĐĂNG NHẬP')}</NavLink>
                                    </button>
                                </div>
                            </div>

                        </div>


                    </div>
                </div>
            </div>
        </form>
    )
}
