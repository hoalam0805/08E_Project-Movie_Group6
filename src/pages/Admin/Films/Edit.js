import React, { useState, useEffect } from 'react';
import {
    Form,
    Input,
    Button,
    Radio,
    Select,
    Cascader,
    DatePicker,
    InputNumber,
    TreeSelect,
    Switch,
} from 'antd';
import { useFormik } from 'formik';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { capNhatPhimUploadAction, layThongTinPhimAction, themPhimUploadHinhAction } from '../../../redux/actions/QuanLyPhimActions';
import { GROUP_ID } from '../../../util/settings/config';
import { useSelector } from 'react-redux';

const Edit = (props) => {
    const [componentSize, setComponentSize] = useState('default');
    const { thongTinPhim } = useSelector(state => state.QuanLyPhimReducer);
    console.log('thongTinPhim', thongTinPhim);
    const [imgSrc, setImgSrc] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
        let { id } = props.match.params;
        dispatch(layThongTinPhimAction(id));
    }, [])

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            maPhim: thongTinPhim.maPhim,
            tenPhim: thongTinPhim.tenPhim,
            trailer: thongTinPhim.trailer,
            moTa: thongTinPhim.moTa,
            ngayKhoiChieu: thongTinPhim.ngayKhoiChieu,
            dangChieu: thongTinPhim.dangChieu,
            sapChieu: thongTinPhim.sapChieu,
            hot: thongTinPhim.hot,
            danhGia: thongTinPhim.danhGia,
            hinhAnh: null,
            maNhom: GROUP_ID
        },
        onSubmit: (values) => {
            console.log('values', values);
            values.maNhom = GROUP_ID;
            //Tạo đối tượng form data => Đưa giá trị values từ formik vào formData
            let formData = new FormData();
            for (let key in values) {
                if (key !== 'hinhAnh') {
                    formData.append(key, values[key]);
                } else {
                    if (values.hinhAnh !== null) {
                        formData.append('File', values.hinhAnh, values.hinhAnh.name);
                    }
                }
            }
            //Cập nhật phim upload hình
            dispatch(capNhatPhimUploadAction(formData));
        }
    })

    const handleChangeSwitch = (name) => {
        return (value) => {
            formik.setFieldValue(name, value)
        }
    }

    const handleChangeInputNumber = (name) => {
        return (value) => { formik.setFieldValue(name, value) }
    }

    const onFormLayoutChange = ({ size }) => {
        setComponentSize(size);
    };

    const handleChangeFile = async (e) => {
        //Lấy file ra từ event
        let file = e.target.files[0];
        if (file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/gif' || file.type === 'image/png') {
            //Đem dữ liệu file lưu vào formik
            await formik.setFieldValue('hinhAnh', file);
            //Tạo đối tượng để đọc file
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (e) => {
                setImgSrc(e.target.result); //Hình base 64
            }
        }
    }

    const dateFormat = 'DD/MM/YYYY';
    const handleChangeDatePicker = (value) => {
        // console.log('handleChangeDatePicker',);
        formik.setFieldValue('ngayKhoiChieu', moment(value));
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
                <h3 style={{ fontSize: '40px', textAlign: 'center' }}>CẬP NHẬT PHIM</h3>
                <Form.Item label="Form Size" name="size">
                    <Radio.Group>
                        <Radio.Button value="small">Small</Radio.Button>
                        <Radio.Button value="default">Default</Radio.Button>
                        <Radio.Button value="large">Large</Radio.Button>
                    </Radio.Group>
                </Form.Item>

                <Form.Item label="Tên phim">
                    <Input name="tenPhim" onChange={formik.handleChange} value={formik.values.tenPhim} />
                </Form.Item>

                <Form.Item label="Trailer">
                    <Input name="trailer" onChange={formik.handleChange} value={formik.values.trailer} />
                </Form.Item>

                <Form.Item label="Mô tả">
                    <Input name="moTa" onChange={formik.handleChange} value={formik.values.moTa} />
                </Form.Item>

                <Form.Item label="Ngày khởi chiếu">
                    <DatePicker format={dateFormat} onChange={handleChangeDatePicker} value={moment(formik.values.ngayKhoiChieu)} />
                </Form.Item>

                <Form.Item label="Đang chiếu">
                    <Switch onChange={handleChangeSwitch('dangChieu')} checked={formik.values.dangChieu} />
                </Form.Item>

                <Form.Item label="Sắp chiếu">
                    <Switch onChange={handleChangeSwitch('sapChieu')} checked={formik.values.sapChieu} />
                </Form.Item>

                <Form.Item label="Hot">
                    <Switch onChange={handleChangeSwitch('hot')} checked={formik.values.hot} />
                </Form.Item>

                <Form.Item label="Số sao">
                    <InputNumber onChange={handleChangeInputNumber('danhGia')} min={1} max={10} value={formik.values.danhGia} />
                </Form.Item>

                <Form.Item label="Hình ảnh">
                    <input type="file" onChange={handleChangeFile} accept="image/png, image/jpeg, image/gif, image/jpg" />
                    <br />
                    <img style={{ width: 150, height: 'auto' }} src={imgSrc === "" ? thongTinPhim.hinhAnh : imgSrc} alt="..." />
                </Form.Item>

                <Form.Item label="Thao tác">
                    <button type="submit" className="p-2 text-white" style={{ backgroundColor: 'rgba(0, 33, 64)' }}>Cập nhật</button>
                </Form.Item>
            </Form>
        </>
    );
};

export default Edit;