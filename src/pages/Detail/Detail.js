import React, { useEffect } from 'react';
// import { Button } from '@tsamantanis/react-glassmorphism';
import { CustomCard } from '@tsamantanis/react-glassmorphism';
import '@tsamantanis/react-glassmorphism/dist/index.css';
import '../../assets/styles/circle.css';
import { Tabs, Rate } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
// import { SET_CHI_TIET_PHIM } from '../../redux/actions/types/DanhSachRapType';
import { layThongTinChiTietPhim } from '../../redux/actions/QuanLyRapAction';
import moment from 'moment';
import { NavLink } from 'react-router-dom';
// import { map } from 'lodash';

import './Detail.css'

const { TabPane } = Tabs;

export default function Detail(props) {

    const filmDetail = useSelector(state => state.QuanLyPhimReducer.filmDetail);
    console.log(filmDetail);

    const dispatch = useDispatch();
    useEffect(() => {
        //Lấy thông tin param từ url
        let { id } = props.match.params;
        dispatch(layThongTinChiTietPhim(id));
    }, [])

    return (
        <div style={{ backgroundImage: `url(${filmDetail.hinhAnh})`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundSize: '100%', minHeight: '100vh' }}>
            <CustomCard
                style={{ paddingTop: '150px' }}
                effectColor="rgba(255,255,255,.4)" // required
                color="rgba(255,255,255,.4)" // default color is white
                blur={15} // default blur value is 10px
                borderRadius={0} // default border radius value is 10px
            >
                <div className="grid grid-cols-12">
                    <div className="col-span-5 col-start-3">
                        <div className="grid grid-cols-2" style={{backgroundColor:'rgba(0,0,0,0.5)', borderRadius:'0.5rem'}}>
                            <img src={filmDetail.hinhAnh} alt={filmDetail.tenPhim} style={{ width: '90%', height: 'auto', borderRadius: '0.5rem' }} />
                            <div className="flex flex-col justify-center" style={{marginLeft:'-0.5rem', paddingRight:'1.5rem', textAlign:'justify'}}>
                                <p className="text-sm text-white">Ngày chiếu: {moment(filmDetail.ngayKhoiChieu).format('DD.MM.YYYY')}</p>
                                <p className="text-4xl text-white mb-5">{filmDetail.tenPhim}</p>
                                <p className="text-sm text-white">{filmDetail.moTa}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-4 flex flex-col items-center justify-center">
                        {/* <h1 style={{ color: 'yellow', fontWeight: 'bold', fontSize: 15, backgroundColor: 'rgba(0,0,0,0.5)', borderRadius: '10px', padding: '10px' }}>Đánh giá</h1> */}
                        <h1 className="text-2xl"><Rate allowHalf value={filmDetail.danhGia / 2} style={{ color: 'yellow', fontSize: 30 }} /></h1>
                        <div className={`c100 p${filmDetail.danhGia * 10} big green`} style={{ color: '#000', margin: '0' }}>
                            <span style={{ color: '#fff' }}>{filmDetail.danhGia * 10}%</span>
                            <div className="slice">
                                <div className="bar" />
                                <div className="fill" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-row justify-center">
                    <div className="mt-20 w-2/3 container px-5 py-5" style={{ backgroundColor: '#fff', borderRadius: '0.5rem', padding: '2rem' }}>
                        <Tabs defaultActiveKey="1" centered style={{ minHeight: 300 }}>
                            <TabPane tab="Lịch chiếu" key="1">
                                <Tabs tabPosition={'left'}>
                                    {filmDetail.heThongRapChieu?.map((htr, index) => {
                                        return (
                                            <TabPane
                                                tab={
                                                    <div className="flex flex-row justify-between items-center">
                                                        <img src={htr.logo} className="rounded-full" width="50" style={{ marginRight: '0.5rem' }} />
                                                        <p className="m-0 p-0">{htr.tenHeThongRap}</p>
                                                    </div>
                                                }
                                                key={index}>
                                                {htr.cumRapChieu?.map((cumRap, index) => {
                                                    return (
                                                        <div key={index}>
                                                            <div className="flex flex-row justify-start items-center">
                                                                <img src={cumRap.hinhAnh} className="rounded-full mr-2" width="50" />
                                                                <div>
                                                                    <p style={{ fontSize: 18, fontWeight: 'bold' }} className="m-0 p-0">{cumRap.tenCumRap}</p>
                                                                    <p className="m-0 p-0">{cumRap.diaChi}</p>
                                                                </div>
                                                            </div>
                                                            <div className="thong-tin-lich-chieu grid grid-cols-4 mt-5">
                                                                {cumRap.lichChieuPhim?.slice(0, 12).map((lichChieu, index) => {
                                                                    return (
                                                                        <NavLink to={`/checkout/${lichChieu.maLichChieu}`} className="col-span-1" key={index} style={{ fontSize: '15px', color: '#1890FF' }}>
                                                                            {moment(lichChieu.ngayChieuGioChieu).format("hh:mm A")}
                                                                        </NavLink>
                                                                    )
                                                                })}
                                                            </div>
                                                        </div>
                                                    )
                                                })}
                                            </TabPane>
                                        )
                                    })}
                                </Tabs>
                            </TabPane>
                            <TabPane tab="Thông tin" key="2">
                                Content of Tab Pane 2
                            </TabPane>
                            <TabPane tab="Đánh giá" key="3">
                                Content of Tab Pane 3
                            </TabPane>
                        </Tabs>
                    </div>
                </div>
            </CustomCard>
        </div>
    )
}
