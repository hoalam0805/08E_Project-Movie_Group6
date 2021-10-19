import React, { Fragment, useEffect } from 'react'
import { Button, Calendar, Table } from 'antd';
import { Input, Space } from 'antd';
import { AudioOutlined, SearchOutlined, DeleteOutlined, EditOutlined, CalendarOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { history } from '../../../App';
import { useTranslation } from 'react-i18next';
import { layDanhSachNguoiDungAction, xoaNguoiDungAction } from '../../../redux/actions/QuanLyNguoiDungActions';
import { GROUP_ID } from '../../../util/settings/config';

const { Search } = Input;

export default function Dashboard(props) {
    const { danhSachNguoiDung } = useSelector(state => state.QuanLyNguoiDungReducer);
    const { t, i18n } = useTranslation();

    const dispatch = useDispatch();

    console.log('danhSachNguoiDung', danhSachNguoiDung)

    useEffect(() => {
        dispatch(layDanhSachNguoiDungAction());
    }, [])

    const columns = [
        {
            title: 'STT',
            key: 'stt',
            sortDirections: ['descend', 'ascend'],
            width: '5%',
        },
        {
            title: 'Tài khoản',
            dataIndex: 'taiKhoan',
            width: '10%',
        },
        {
            title: 'Mật khẩu',
            dataIndex: 'matKhau',
            width: '10%',
        },
        {
            title: 'Họ tên',
            dataIndex: 'hoTen',
            width: '20%'
        },
        {
            title: 'Email',
            dataIndex: 'email',
            width: '25%'
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'soDt',
            width: '15%'
        },
        {
            title: 'Hành Động',
            render: (text, users) => {
                return <Fragment>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                        <NavLink key={1} className="text-white text-2xl flex flex-row items-center justify-center" to={`/admin/users/edit/${users.taiKhoan}`} style={{ textAlign: 'center' }} ><EditOutlined style={{ color: 'darkgreen' }} /></NavLink>
                        <span key={2} className="text-white text-2xl flex flex-row items-center justify-center" style={{ textAlign: 'center' }} onClick={() => {
                            //Gọi action xóa
                            if (window.confirm('Bạn có chắc chắn muốn xóa người dùng ' + users.hoTen + ' không?')) {
                                //Gọi action
                                dispatch(xoaNguoiDungAction(users.taiKhoan));
                            }
                        }}><DeleteOutlined style={{ color: 'maroon', cursor: 'pointer' }} /></span>
                    </div>
                </Fragment>
            },
            width: '25%'
        },
    ];

    const data = danhSachNguoiDung;

    const onSearch = value => {
        console.log(value);
        //Gọi api lấy danh sách phim
        dispatch(layDanhSachNguoiDungAction(value));
    };

    function onChange(pagination, filters, sorter, extra) {
        console.log('params', pagination, filters, sorter, extra);
    }
    return (
        <div className="container" style={{ fontFamily: 'Roboto' }}>
            <h3 className="text-4xl text-center">QUẢN LÝ NGƯỜI DÙNG</h3>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'end' }}>
                <Button style={{ backgroundColor: 'darkGreen', color: 'white', height: '3rem', width: 'fit-content', borderRadius: '0.5rem', fontSize: '16px', cursor: 'pointer' }} className="mb-5" onClick={() => {
                    history.push('users/addnew');
                }}>{t('Thêm người dùng')}</Button>
            </div>
            <Search
                className="mb-5"
                placeholder="Nhập vào tải khoản hoặc họ tên người dùng"
                enterButton={<SearchOutlined />}
                size="large"
                onSearch={onSearch}
            />
            {
                /* Phần Table này có khi lại hiện lên lỗi TypeError: rawData.some is not a function,
                có khi không hiện -> Comment xong gỡ comment lại mới khắc phục được */
            }
            <Table columns={columns} dataSource={danhSachNguoiDung} onChange={onChange} />
        </div>
    )
}

