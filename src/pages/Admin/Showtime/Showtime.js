import React, { useEffect, useState, Fragment } from 'react';
import { Form, Input, Button, Checkbox, Cascader, DatePicker, Space, InputNumber, Select } from 'antd';
import { http } from '../../../util/settings/config';
import { useFormik } from 'formik';
import moment from 'moment';
import './Showtime.css'

export default function Showtime(props) {

    const formik = useFormik({
        initialValues: {
            maPhim: props.match.params.id,
            ngayChieuGioChieu: '',
            maRap: '',
            giaVe: ''
        },
        onSubmit: (values) => {
            let promise = http.post('/api/QuanLyDatVe/TaoLichChieu', values);
            promise.then((result) => {
                alert(result.data.content);
            })

            promise.catch((error) => {
                console.log('error', error.response?.data);
            })
        }
    })

    const [state, setState] = useState({
        heThongRapChieu: [],
        cumRapChieu: []
    })
    console.log(state);

    useEffect(async () => {
        let promise = http.get('/api/QuanLyRap/LayThongTinHeThongRap');
        promise.then((result) => {
            setState({
                ...state,
                heThongRapChieu: result.data.content
            })
        })

        promise.catch((error) => {
            console.log('error', error.response?.data);
        })

    }, [])

    const handleChangeHeThongRap = (value, option) => {
        //từ hệ thống rạp, call api lấy thông tin hệ thống rạp
        let promise = http.get(`/api/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${value}`);
        promise.then((result) => {
            setState({
                ...state,
                cumRapChieu: result.data.content
            })
        })
        promise.catch((error) => {
            console.log('error', error.response?.data);
        })
    }

    const handleChangeCumRap = (value, option) => {
        formik.setFieldValue('maRap', value);
    }

    const onOk = value => {
        formik.setFieldValue('ngayChieuGioChieu', moment(value).format('DD/MM/YYYY hh:mm:ss'))
    }

    const onChangeDate = value => {
        formik.setFieldValue('ngayChieuGioChieu', moment(value).format('DD/MM/YYYY hh:mm:ss'))
    }

    const onChangeInputNumber = value => {
        formik.setFieldValue('giaVe', value);
    }

    let film = {};
    if(localStorage.getItem('filmParams')){
        film = JSON.parse(localStorage.getItem('filmParams'));
    }

    return (
        <div className="container" style={{fontFamily:'Roboto'}}>
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                initialValues={{ remember: true }}
                onSubmitCapture={formik.handleSubmit}
            >
                <h3 className="text-2xl text-center">TẠO LỊCH CHIẾU - {props.match.params.tenphim}</h3>
                <div style={{display:'flex', flexDirection:'row', justifyContent:'start', alignItems:'center'}}>
                    <div style={{width:'30%'}} className="flex flex-row justify-center">
                        <img src={film.hinhAnh} alt="..." style={{width:'200px', height:'auto'}} />
                    </div>
                    <div style={{width:'70%'}} className="">
                        <Form.Item label="Hệ thống rạp" style={{margin:0}}>
                            <Select
                                options={state.heThongRapChieu?.map((htr, index) => ({ label: htr.tenHeThongRap, value: htr.maHeThongRap }))}
                                onChange={handleChangeHeThongRap}
                                placeholder="Chọn hệ thống rạp"
                            />
                        </Form.Item>

                        <Form.Item label="Cụm rạp" style={{margin:0}}>
                            <Select
                                options={state.cumRapChieu?.map((cr, index) => ({ label: cr.tenCumRap, value: cr.maCumRap }))}
                                onChange={handleChangeCumRap}
                                placeholder="Chọn cụm rạp" />
                        </Form.Item>

                        <Form.Item label="Ngày chiếu giờ chiếu" style={{margin:0}}>
                            <DatePicker format="DD/MM/YYYY hh:mm:ss" showTime onChange={onChangeDate} onOk={onOk} />
                        </Form.Item>

                        <Form.Item label="Giá vé" style={{margin:0}}>
                            <InputNumber onChange={onChangeInputNumber} />
                        </Form.Item>

                        <Form.Item label="Thao tác" style={{margin:0}}>
                            <Button htmlType="submit" style={{backgroundColor:'rgba(0, 33, 64)', color:'#fff'}}>Tạo lịch chiếu</Button>
                        </Form.Item>
                    </div>
                </div>
            </Form>
        </div>

    )
}
