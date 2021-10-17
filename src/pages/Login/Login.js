import { useFormik } from 'formik';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { dangNhapAction } from '../../redux/actions/QuanLyNguoiDungActions';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import './Login.css';
import { Modal, Button } from 'antd';

const validate = values => {
    const errors = {};
    if (!values.taiKhoan) {
        errors.taiKhoan = 'Không được bỏ trống!';
    }

    if (!values.matKhau) {
        errors.matKhau = 'Không được bỏ trống!';
    }

    return errors;
};

export default function Login(props) {
    //Modal thông báo validation
    const [visible, setVisible] = React.useState(false);

    const showModal = () => {
        setVisible(true);
    };

    const handleCancel = () => {
        setVisible(false);
    };

    //Chức năng đa ngôn ngữ
    const { t, i18n } = useTranslation();

    const dispatch = useDispatch();
    const { userLogin } = useSelector(state => state.QuanLyNguoiDungReducer);
    const formik = useFormik({
        initialValues: {
            taiKhoan: '',
            matKhau: '',
        },
        validate,
        onSubmit: values => {
            const action = dangNhapAction(values);
            //Nếu tài khoản hoặc mật khẩu sai -> Hiện modal thông báo
            if (values.taiKhoan !== userLogin.taiKhoan || values.matKhau !== userLogin.matKhau) {
                { showModal() }
            } else {
                //Hiện alert đăng nhập thành công
                if (i18n.language == 'en') {
                    alert('Sign in successfully!');
                } else {
                    alert("Đăng nhập thành công!");
                }
            }
            dispatch(action);
        }
    });

    return (
        <form onSubmit={formik.handleSubmit} className="lg:w-1/2 xl:max-w-screen-sm" style={{ overflow: 'hidden', position: 'relative', minWidth: '100vw', minHeight: "100vh", backgroundImage: 'url("https://tix.vn/app/assets/img/icons/backapp.jpg")' }}>
            <div className="mt-10 px-12 sm:px-24 md:px-48 lg:px-12 lg:mt-16 xl:px-24 xl:max-w-2xl" style={{ backgroundColor: '#fff', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', padding: '1.5rem 4rem', width: '30rem', margin: '0', borderRadius: '2rem' }}>
                <h2 className="text-center text-4xl text-black-900 font-display font-semibold lg:text-left xl:text-5xl xl:text-bold" style={{ textAlign: "center", color: 'coral' }}>{t('ĐĂNG NHẬP')}</h2>
                <div className="mt-5">
                    <div>
                        <div>
                            <div className="text-sm font-bold text-gray-700 tracking-wide">{t('Tài khoản')}</div>
                            <input name="taiKhoan" onChange={formik.handleChange} className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" placeholder={t("Nhập vào tài khoản")} />
                            {formik.errors.taiKhoan ? <div style={{ color: 'maroon', fontFamily: 'Roboto', fontSize: '14px', fontStyle: 'italic' }}>{formik.errors.taiKhoan}</div> : null}
                        </div>
                        <div className="mt-8">
                            <div className="flex justify-between items-center">
                                <div className="text-sm font-bold text-gray-700 tracking-wide">
                                    {t("Mật khẩu")}
                                </div>
                                <div>
                                    <a className="text-md font-display font-semibold cursor-pointer" style={{ color: 'coral' }}>
                                        {t('Quên mật khẩu?')}
                                    </a>
                                </div>
                            </div>
                            <input type="password" name="matKhau" onChange={formik.handleChange} className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" placeholder={t("Nhập vào mật khẩu")} />
                            {formik.errors.matKhau ? <div style={{ color: 'maroon', fontFamily: 'Roboto', fontSize: '14px', fontStyle: 'italic' }}>{formik.errors.matKhau}</div> : null}
                        </div>
                        <div className="mt-10">
                            <button type="submit" className="bg-black text-yellow-500 p-4 w-full rounded-full tracking-wide
                          font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-yellow-500 hover:text-black
                          shadow-lg btn-sign-in">
                                {t('ĐĂNG NHẬP')}
                            </button>
                        </div>
                    </div>
                    <div className="mt-12 text-md font-display font-semibold text-gray-700 text-center">
                        {t('Bạn chưa có tài khoản?')} <NavLink to="/register" className="cursor-pointer" style={{ color: 'coral' }}>{t('Đăng ký')}</NavLink>
                    </div>
                </div>
            </div>
            <Modal
                title={t("SAI THÔNG TIN TÀI KHOẢN")}
                visible={visible}
                onCancel={handleCancel}
            >
                <p>{t('Tài khoản hoặc mật khẩu không đúng!')}</p>
            </Modal>
        </form>
    )
}
