import React, { useState, useEffect } from 'react';
import {
    Form,
    Input,
    Button,
    Select,
} from 'antd';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { GROUP_ID, http } from '../../../util/settings/config';
import { useSelector } from 'react-redux';
import './User.css'
import { capNhatThongTinNguoiDungAction, layDanhSachNguoiDungAction, layThongTinNguoiDungAction } from '../../../redux/actions/QuanLyNguoiDungActions';

export default function EditUser(props) {
    const [componentSize, setComponentSize] = useState('default');
    const { thongTinNguoiDung } = useSelector(state => state.QuanLyNguoiDungReducer);
    console.log('thongTinNguoiDung', thongTinNguoiDung);
    const dispatch = useDispatch();

    // const [state, setState] = useState({
    //     loaiNguoiDung: [],
    // })

    useEffect(() => {
        let { taiKhoan } = props.match.params;
        dispatch(layThongTinNguoiDungAction(taiKhoan));
    }, [])

    // console.log(state);

    // useEffect(async () => {
    //     let promise = http.get('/api/QuanLyNguoiDung/LayDanhSachLoaiNguoiDung');
    //     promise.then((result) => {
    //         setState({
    //             ...state,
    //             loaiNguoiDung: result.data.content
    //         })
    //     })

    //     promise.catch((error) => {
    //         console.log('error', error.response?.data);
    //     })

    // }, [])

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            taiKhoan: thongTinNguoiDung.taiKhoan,
            email: thongTinNguoiDung.email,
            matKhau: thongTinNguoiDung.matKhau,
            soDt: thongTinNguoiDung.soDT,
            hoTen: thongTinNguoiDung.hoTen,
            maLoaiNguoiDung: thongTinNguoiDung.maLoaiNguoiDung,
            maNhom: GROUP_ID,
        },
        onSubmit: (values) => {
            console.log('values', values);
            values.maNhom = GROUP_ID;
            //Tạo đối tượng form data => Đưa giá trị values từ formik vào formData
            let formData = new FormData();
            //Cập nhật phim upload hình
            dispatch(capNhatThongTinNguoiDungAction(formData));
        }
    })

    const onFormLayoutChange = ({ size }) => {
        setComponentSize(size);
    };

    const handleChangeLoaiNguoiDung = (name) => {
        return (value) => { formik.setFieldValue(name, value) }
    }

    return (
        <>
            <Form
                style={{ fontFamily: 'Roboto' }}
                onSubmitCapture={formik.handleSubmit}
                labelCol={{
                    span: 4,
                }}
                wrapperCol={{
                    span: 14,
                }}
                layout="horizontal"
                initialValues={{
                    size: componentSize,
                }}
                onValuesChange={onFormLayoutChange}
                size={componentSize}
            >
                <h3 style={{ fontSize: '40px', textAlign: 'center' }}>CẬP NHẬT NGƯỜI DÙNG</h3>
                <div className="flex flex-row justify-center items-center">
                    <Form.Item label="Tài khoản" style={{ width: '50%' }}>
                        <Input name="taiKhoan" onChange={formik.handleChange} value={formik.values.taiKhoan} />
                    </Form.Item>

                    <Form.Item label="Email" style={{ width: '50%' }}>
                        <Input name="email" onChange={formik.handleChange} value={formik.values.email} />
                    </Form.Item>
                </div>

                <div className="flex flex-row justify-center items-center">
                    <Form.Item label="Mật khẩu" style={{ width: '50%' }}>
                        <Input name="matKhau" onChange={formik.handleChange} value={formik.values.matKhau} />
                    </Form.Item>

                    <Form.Item label="Số điện thoại" style={{ width: '50%' }}>
                        <Input name="soDt" onChange={formik.handleChange} value={formik.values.soDt} />
                    </Form.Item>
                </div>

                <div className="flex flex-row justify-center items-center">
                    <Form.Item label="Họ tên" style={{ width: '50%' }}>
                        <Input name="hoTen" onChange={formik.handleChange} value={formik.values.hoTen} />
                    </Form.Item>

                    <Form.Item label="Loại người dùng" style={{ margin: 0, width: '50%' }}>
                        <Select
                            // options={state.loaiNguoiDung?.map((user, index) => ({ label: user.tenLoai, value: user.maLoaiNguoiDung }))}
                            onChange={handleChangeLoaiNguoiDung}
                        />
                    </Form.Item>
                </div>

                <div className="flex flex-row justify-center items-center">
                    <Form.Item style={{ width: '50%' }}>
                    </Form.Item>
                    <Form.Item label="Thao tác" style={{ width: '50%' }}>
                        <button type="submit" className="p-2 text-white" style={{ backgroundColor: 'rgba(0, 33, 64)' }}>Cập nhật</button>
                    </Form.Item>
                </div>
            </Form>
        </>
    );
}
