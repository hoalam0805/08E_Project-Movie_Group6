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
import { themNguoiDungAction } from '../../../redux/actions/QuanLyNguoiDungActions';

export default function NewUser(props) {
    const [componentSize, setComponentSize] = useState('default');
    const { danhSachNguoiDung } = useSelector(state => state.QuanLyNguoiDungReducer);
    console.log('danhSachNguoiDung', danhSachNguoiDung);
    const dispatch = useDispatch();

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            taiKhoan: '',
            matKhau: '',
            email: '',
            soDt: '',
            maNhom: GROUP_ID,
            maLoaiNguoiDung: '',
            hoTen: '',
        },
        onSubmit: (values) => {
            let promise = http.post('/api/QuanLyNguoiDung/ThemNguoiDung', values);
            promise.then((result) => {
                console.log('result', result.data.content);
                alert('Thêm người dùng thành công');
            })

            promise.catch((error) => {
                console.log('error', error.response?.data);
            })
        }
    })

    const [state, setState] = useState({
        loaiNguoiDung: [],
    })

    console.log(state);

    useEffect(async () => {
        let promise = http.get('/api/QuanLyNguoiDung/LayDanhSachLoaiNguoiDung');
        promise.then((result) => {
            setState({
                ...state,
                loaiNguoiDung: result.data.content
            })
        })

        promise.catch((error) => {
            console.log('error', error.response?.data);
        })

    }, [])

    const onFormLayoutChange = ({ size }) => {
        setComponentSize(size);
    };

    const handleChangeLoaiNguoiDung = (value) => {
        formik.setFieldValue('maLoaiNguoiDung', value);
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
                <h3 style={{ fontSize: '40px', textAlign: 'center' }}>THÊM NGƯỜI DÙNG</h3>
                <div className="flex flex-row justify-center items-center">
                    <Form.Item label="Tài khoản" style={{ width: '50%' }}>
                        <Input name="taiKhoan" onChange={formik.handleChange} />
                    </Form.Item>

                    <Form.Item label="Email" style={{ width: '50%' }}>
                        <Input name="email" onChange={formik.handleChange} />
                    </Form.Item>
                </div>

                <div className="flex flex-row justify-center items-center">
                    <Form.Item label="Mật khẩu" style={{ width: '50%' }}>
                        <Input name="matKhau" onChange={formik.handleChange} />
                    </Form.Item>

                    <Form.Item label="Số điện thoại" style={{ width: '50%' }}>
                        <Input name="soDt" onChange={formik.handleChange} />
                    </Form.Item>
                </div>

                <div className="flex flex-row justify-center items-center">
                    <Form.Item label="Họ tên" style={{ width: '50%' }}>
                        <Input name="hoTen" onChange={formik.handleChange} />
                    </Form.Item>

                    <Form.Item label="Loại người dùng" style={{ margin: 0, width: '50%' }}>
                        <Select
                            options={state.loaiNguoiDung?.map((user, index) => ({ label: user.tenLoai, value: user.maLoaiNguoiDung }))}
                            onChange={handleChangeLoaiNguoiDung}
                            placeholder="Chọn loại người dùng"
                        />
                    </Form.Item>
                </div>

                <div className="flex flex-row justify-center items-center">
                    <Form.Item style={{ width: '50%' }}>
                    </Form.Item>
                    <Form.Item label="Thao tác" style={{ width: '50%' }}>
                        <button type="submit" className="p-2 text-white" style={{ backgroundColor: 'rgba(0, 33, 64)' }}>Thêm người dùng</button>
                    </Form.Item>
                </div>
            </Form>
        </>
    );
}
