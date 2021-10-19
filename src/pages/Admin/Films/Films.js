import React, { Fragment, useEffect } from 'react'
import { Button, Calendar, Table } from 'antd';
import { Input, Space } from 'antd';
import { AudioOutlined, SearchOutlined, DeleteOutlined, EditOutlined, CalendarOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { layDanhSachPhimAction, xoaPhimAction } from '../../../redux/actions/QuanLyPhimActions';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { history } from '../../../App';
import { useTranslation } from 'react-i18next';

const { Search } = Input;

export default function Films() {
    const { arrFilmDefault } = useSelector(state => state.QuanLyPhimReducer);
    const { t, i18n } = useTranslation();

    const dispatch = useDispatch();

    console.log('arrFilmDefault', arrFilmDefault);

    useEffect(() => {
        dispatch(layDanhSachPhimAction());
    }, [])

    const columns = [
        {
            title: 'Mã Phim',
            dataIndex: 'maPhim',
            sorter: (a, b) => b.maPhim - a.maPhim,
            sortDirections: ['descend', 'ascend'],
            width: '10%',
        },
        {
            title: 'Hình Ảnh',
            dataIndex: 'hinhAnh',
            render: (text, films, index) => {
                return <Fragment>
                    <img src={films.hinhAnh} alt={films.tenPhim} width={50} height={50} onError={(e) => { e.target.onError = null; e.target.src = `https://picsum.photos/id/${index}/50/50` }} />
                </Fragment>
            },
            width: '10%',
        },
        {
            title: 'Tên Phim',
            dataIndex: 'tenPhim',
            sorter: (a, b) => {
                let tenPhimA = a.tenPhim.toLowerCase().trim();
                let tenPhimB = b.tenPhim.toLowerCase().trim();
                if (tenPhimA > tenPhimB) {
                    return 1;
                }
                return -1;
            },
            sortDirections: ['descend', 'ascend'],
            onFilter: (value, record) => record.address.indexOf(value) === 0,
            width: '25%',
        },
        {
            title: 'Mô tả',
            dataIndex: 'moTa',
            render: (text, films) => {
                return <Fragment>
                    {films.moTa.length > 50 ? films.moTa.substr(0, 50) + "..." : films.moTa}
                </Fragment>
            },
            width: '30%'
        },
        {
            title: 'Hành Động',
            dataIndex: 'maPhim',
            render: (text, films) => {
                return <Fragment>
                    <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center'}}>
                        <NavLink key={1} className="text-white text-2xl flex flex-row items-center justify-center" to={`films/edit/${films.maPhim}`} style={{textAlign: 'center'}} ><EditOutlined style={{ color: 'darkgreen' }} /></NavLink>
                        <span key={2} className="text-white text-2xl flex flex-row items-center justify-center"  style={{textAlign: 'center'}} onClick={() => {
                            //Gọi action xóa
                            if (window.confirm('Bạn có chắc chắn muốn xóa phim ' + films.tenPhim + ' không?')) {
                                //Gọi action
                                dispatch(xoaPhimAction(films.maPhim));
                            }
                        }}><DeleteOutlined style={{ color: 'maroon', cursor: 'pointer' }} /></span>
                        <NavLink 
                            key={1} 
                            className="text-white mr-2 text-2xl flex flex-row items-center justify-center" 
                            to={`films/showtime/${films.maPhim}/${films.tenPhim}`} style={{textAlign: 'center'}} 
                            onClick={() => {localStorage.setItem('filmParams',JSON.stringify(films))}}
                            >
                                <CalendarOutlined style={{ color: 'darkblue' }} />
                        </NavLink>
                    </div>
                </Fragment>
            },
            width: '25%'
        },
    ];

    const data = arrFilmDefault;

    const onSearch = value => {
        console.log(value);
        //Gọi api lấy danh sách phim
        dispatch(layDanhSachPhimAction(value));
    };

    function onChange(pagination, filters, sorter, extra) {
        console.log('params', pagination, filters, sorter, extra);
    }
    return (
        <div className="container" style={{ fontFamily: 'Roboto' }}>
            <h3 className="text-4xl text-center">QUẢN LÝ PHIM</h3>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'end' }}>
                <Button style={{ backgroundColor: 'darkGreen', color: 'white', height: '3rem', width: '8rem', borderRadius: '0.5rem', fontSize: '16px', cursor: 'pointer' }} className="mb-5" onClick={() => {
                    history.push('films/addnew');
                }}>{t('Thêm phim')}</Button>
            </div>
            <Search
                className="mb-5"
                placeholder="input search text"
                enterButton={<SearchOutlined />}
                size="large"
                onSearch={onSearch}
            />
            <Table columns={columns} dataSource={data} onChange={onChange} rowKey={"maPhim"} />
        </div>
    )
}
