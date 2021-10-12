import React, { Fragment } from 'react';
import { Tabs, Radio, Space } from 'antd';
import { useState } from 'react';
import { connect } from 'react-redux';
import './HomeMenu.css'
import { NavLink } from 'react-router-dom';
import moment from 'moment';
const { TabPane } = Tabs;

export default class Demo extends React.PureComponent {
    state = {
        tabPosition: 'left',
    }

    changeTabPosition = e => {
        this.setState({ tabPosition: e.target.value });
    };

    componentDidMount() {
    }

    renderHeThongRap = () => {
        return this.props.heThongRapChieu?.map((heThongRap, index) => {
            let { tabPosition } = this.state;
            return (
                <TabPane tab={<img src={heThongRap.logo} className="rounded-full" width="50" />} key={index} className="pb-5">
                    <Tabs className="p-0" tabPosition={tabPosition}>
                        {heThongRap.lstCumRap?.map((cumRap, index) => {
                            return <TabPane tab=
                                {
                                    <div style={{ width: '320px', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                        <img src={heThongRap.logo} className="rounded-full" width="50" /><br />
                                        <div className="text-left ml-2">
                                            <p className="cinema-name p-0 m-0">{cumRap.tenCumRap}</p>
                                            <p className="text-red-500 p-0 m-0">Chi tiết</p>
                                        </div>
                                    </div>
                                }
                                key={index}>
                                {/* Load phim tương ứng */}

                                {cumRap.danhSachPhim.slice(0,5).map((phim, index) => {
                                    return (
                                        <Fragment key={index}>
                                            <div className="my-2" style={{ display: 'flex' }}>
                                                <div style={{ display: 'flex', flexDirection: 'row', width:'100%', alignItems:'start' }}>
                                                    {/* Hình phim */}
                                                    <div style={{width: '10%', height: 'auto'}}>
                                                        <img style={{height:'100px', width:'100px'}} src={phim.hinhAnh} alt={phim.tenPhim} onError={(e)=>{
                                                            e.target.onerror = null; e.target.src="image_path_here"
                                                        }} />
                                                    </div>
                                                    {/* Chi tiết phim / địa chỉ / giờ chiếu phim */}
                                                    <div style={{width: '90%'}}> 
                                                        <h1 className="ml-2 text-lg m-0">{phim.tenPhim}</h1>
                                                        <p className="ml-2 p-0 mb-4">{cumRap.diaChi}</p>
                                                        {/* Sử dụng grid để layout giờ chiếu phim */}
                                                        <div className="grid grid-cols-6 gap-3 ml-2">  
                                                            {/* Sử dụng slice(0,x) để ẩn bớt giờ chiếu phim */}
                                                            {phim.lstLichChieuTheoPhim?.slice(0,12).map((lichChieu, ibdex) => { 
                                                                return <NavLink className="text-lg text-gray-600 text-film-begin-clock" to="/" key={index}>
                                                                    {moment(lichChieu.ngayChieuGioChieu).format('hh:mmA')}
                                                                </NavLink>
                                                            })}
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                            <hr />
                                        </Fragment>
                                    )
                                })}


                            </TabPane>
                        })}
                    </Tabs>
                </TabPane>
            )
        })
    }

    render() {
        console.log(this.props);
        const { tabPosition } = this.state;
        return (
            <>
                <Tabs tabPosition={tabPosition}>
                    {this.renderHeThongRap()}
                </Tabs>
            </>
        )
    }
}
