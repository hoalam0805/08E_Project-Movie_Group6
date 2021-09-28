import React, { useEffect } from 'react';
import { Button } from '@tsamantanis/react-glassmorphism';
import { CustomCard } from '@tsamantanis/react-glassmorphism';
import '@tsamantanis/react-glassmorphism/dist/index.css';
import '../../assets/styles/circle.css';
import { Tabs, Radio, Space } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { SET_CHI_TIET_PHIM } from '../../redux/actions/types/DanhSachRapType';
import { layThongTinChiTietPhim } from '../../redux/actions/QuanLyRapAction';
import moment from 'moment';

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
        <div style={{ background: `url(${filmDetail.hinhAnh}) no-repeat center`, backgroundSize: '100%', minHeight: '100vh' }}>
            <CustomCard
                style={{ paddingTop: '150px', minHeight: '100vh' }}
                effectColor="rgba(255,255,255,.4)" // required
                color="rgba(255,255,255,.4)" // default color is white
                blur={15} // default blur value is 10px
                borderRadius={0} // default border radius value is 10px
            >
                <div className="grid grid-cols-12">
                    <div className="col-span-5 col-start-3">
                        <div className="grid grid-cols-2">
                            <img src={filmDetail.hinhAnh} alt={filmDetail.tenPhim} style={{ width: '80%', height: 'auto', margin: 'auto' }} />
                            <div className="flex flex-col justify-center ml-2">
                                <p className="text-sm text-white">Ngày chiếu: {moment(filmDetail.ngayKhoiChieu).format('DD.MM.YYYY')}</p>
                                <p className="text-4xl text-white mb-5">{filmDetail.tenPhim}</p>
                                <p className="text-sm text-white">{filmDetail.moTa}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-4">
                        <h1 style={{ marginLeft:'10.5%', color: 'green' }} className="text-2xl">
                            <i class="fa fa-star" aria-hidden="true"></i>
                            <i class="fa fa-star" aria-hidden="true"></i>
                            <i class="fa fa-star" aria-hidden="true"></i>
                            <i class="fa fa-star" aria-hidden="true"></i>
                            <i class="fa fa-star" aria-hidden="true"></i>
                        </h1>
                        <div className={`c100 p${filmDetail.danhGia * 10} big green`} style={{ color: '#000', margin: '0' }}>
                            <span style={{ color: '#fff' }}>{filmDetail.danhGia * 10}%</span>
                            <div className="slice">
                                <div className="bar" />
                                <div className="fill" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-20 container">
                    <Tabs tabPosition={'left'}>
                        <TabPane tab="Tab 1" key="1">
                            Content of Tab 1
                        </TabPane>
                        <TabPane tab="Tab 2" key="2">
                            Content of Tab 2
                        </TabPane>
                        <TabPane tab="Tab 3" key="3">
                            Content of Tab 3
                        </TabPane>
                    </Tabs>
                </div>
            </CustomCard>


        </div>

    )
}
