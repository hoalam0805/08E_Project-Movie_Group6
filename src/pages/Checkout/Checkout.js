import React, { useEffect, Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { layChiTietPhongVeAction, datVeAction } from '../../redux/actions/QuanLyDatVeActions';
import { CloseOutlined, UserOutlined } from '@ant-design/icons'
import './Checkout.css'
import { CHUYEN_TAB, DAT_VE } from '../../redux/actions/types/QuanLyDatVeType';
import _ from 'lodash';
import { ThongTinDatVe } from '../../_core/models/ThongTinDatVe';
import { Tabs } from 'antd';
import { layThongTinNguoiDungAction } from '../../redux/actions/QuanLyNguoiDungActions';
import moment from 'moment';


function Checkout(props) {
    const { userLogin } = useSelector(state => state.QuanLyNguoiDungReducer)
    const { chiTietPhongVe, danhSachGheDangDat } = useSelector(state => state.QuanLyDatVeReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        const action = layChiTietPhongVeAction(props.match.params.id);
        dispatch(action);
    }, [])

    const { thongTinPhim, danhSachGhe } = chiTietPhongVe;
    const renderSeats = () => {
        return danhSachGhe.map((ghe, index) => {
            let classGheVip = ghe.loaiGhe === 'Vip' ? 'gheVip' : '';
            let classGheDaDat = ghe.daDat === true ? 'gheDaDat' : '';
            let classGheDangDat = '';
            //Kiểm tra từng ghế render xem có trong mảng ghế đang đặt không
            let indexGheDD = danhSachGheDangDat.findIndex(gheDD => gheDD.maGhe == ghe.maGhe);

            let classGheDaDuocDat = '';
            if (userLogin.taiKhoan === ghe.taiKhoanNguoiDat) {
                classGheDaDuocDat = 'gheDaDuocDat';
            }
            if (indexGheDD != -1) {
                classGheDangDat = 'gheDangDat';
            }
            return <Fragment key={index}>
                <button onClick={() => {
                    dispatch({
                        type: DAT_VE,
                        gheDuocChon: ghe
                    })
                }} disabled={ghe.daDat} className={`ghe ${classGheVip} ${classGheDaDat} ${classGheDangDat} ${classGheDaDuocDat} text-center`} key={index} style={{ fontFamily: 'Roboto' }}>
                    {ghe.daDat ? classGheDaDuocDat != '' ? <UserOutlined style={{ marginBottom: '7.5px' }} /> : <CloseOutlined style={{ marginBottom: '7.5px' }} /> : ghe.stt}
                </button>
                {(index + 1) % 16 == 0 ? <br /> : ''}
            </Fragment>
        })
    }

    return (
        <div className="min-h-screen p-5" style={{ height: '100%', width: '100%', borderRadius: '0.5rem', backgroundColor: '#fff' }}>
            <div className="grid grid-cols-12 gap-5">
                <div className="col-span-9" style={{border:'1px solid rgba(128,128,128,0.5)', padding: '0.5rem', borderRadius: '0.5rem'}}>
                    <div className="flex flex-col items-center mt-5">
                        <div className="bg-black text-center" style={{ width: '80%', height: 'fit-content' }}><span className="text-white" style={{ fontFamily: 'Roboto' }}>Màn hình</span></div>
                        <div className="trapezoid"></div>
                        <div>
                            {renderSeats()}
                        </div>
                    </div>
                </div>
                <div className="col-span-3 flex flex-col justify-start" style={{ position: 'relative', width: '100%' }}>
                    <div style={{border:'1px solid rgba(128,128,128,0.5)', padding: '0.5rem', borderRadius: '0.5rem'}}>
                        <div>
                            <h3 className="text-center text-4xl">{danhSachGheDangDat.reduce((tongTien, ghe, index) => {
                                return tongTien += ghe.giaVe;
                            }, 0).toLocaleString()}đ</h3>
                            <hr />
                            <div className="my-5">
                                <h3 className="text-xl" style={{ fontFamily: 'Roboto', fontWeight: 'bold' }}>{thongTinPhim.tenPhim}</h3>
                                <p className="p-0 m-0" style={{ fontFamily: 'Roboto' }}>Địa điểm: {thongTinPhim.tenCumRap} - {thongTinPhim.tenRap}</p>
                                <p className="p-0 m-0" style={{ fontFamily: 'Roboto' }}>Ngày chiếu: {thongTinPhim.ngayChieu} - {thongTinPhim.gioChieu}</p>
                            </div>
                            <hr />
                            <div className="flex flex-row justify-between mt-5 mb-2">
                                <div className="">
                                    <span className="text-lg" style={{ fontFamily: 'Roboto', fontWeight: 'bold' }}>Ghế</span>

                                </div>
                                <div className="text-right">
                                    <span className="text-lg" style={{ fontFamily: 'Roboto' }}>{danhSachGheDangDat.reduce((tongTien, ghe, index) => {
                                        return tongTien += ghe.giaVe;
                                    }, 0).toLocaleString()}đ</span>
                                </div>
                            </div>
                            <table className="mb-5" style={{border:'1px solid transparent', padding: '0.5rem', borderRadius: '0.5rem'}}>
                                <tbody>
                                    <tr className="flex flex-row flex-wrap">
                                        {_.sortBy(danhSachGheDangDat, ['stt']).map((gheDD, index) => {
                                            return (
                                                <p key={index} className="text-green-500 text-lg m-0 p-0" style={{ fontFamily: 'Roboto', width: '2.945rem', textAlign: 'center', margin: '0.2rem', border:'1px solid rgba(128,128,128,0.2)', padding:'0.5rem', borderRadius: '0.5rem' }}> {gheDD.stt}</p>
                                            )
                                        })}
                                    </tr>
                                </tbody>
                            </table>
                            <hr />
                            <div className="my-5 text-sm" style={{ fontFamily: 'Roboto' }}>
                                <span style={{ fontWeight: 'bold' }}>Email</span><br />
                                {userLogin.email}
                            </div>
                            <hr />
                            <div className="my-5 text-sm" style={{ fontFamily: 'Roboto' }}>
                                <span style={{ fontWeight: 'bold' }}>Phone</span><br />
                                {userLogin.soDT}
                            </div>
                            <hr />
                        </div>
                        <div>
                            <div onClick={() => {
                                const thongTinDatVe = new ThongTinDatVe();
                                thongTinDatVe.maLichChieu = props.match.params.id;
                                thongTinDatVe.danhSachVe = danhSachGheDangDat;
                                console.log(thongTinDatVe);

                                dispatch(datVeAction(thongTinDatVe));

                            }} className="bg-green-500 text-white w-full text-center py-3 font-bold text-2xl cursor-pointer mt-2" style={{ fontFamily: 'Roboto', borderRadius: '0.5rem' }}>
                                ĐẶT VÉ
                            </div>
                        </div>
                    </div>
                    <table>
                        <tbody>
                            <div className="flex flex-row justify-between" style={{ width: '100%', fontFamily: 'Roboto' }}>
                                <tr className="flex flex-row justify-between items-center" style={{ width: '50%' }}>
                                    <td>Ghế chưa đặt</td>
                                    <td><button className="ghe text-center cursor-initial">00</button></td>
                                </tr>
                                <tr className="flex flex-row justify-between items-center" style={{ width: '50%' }}>
                                    <td>Ghế đã đặt</td>
                                    <td><button className="ghe gheDaDat text-center cursor-initial"><CloseOutlined style={{ marginBottom: '7.5px' }} /></button></td>
                                </tr>
                            </div>
                            <div className="flex flex-row justify-between" style={{ width: '100%' }}>
                                <tr className="flex flex-row justify-between items-center" style={{ width: '50%' }}>
                                    <td>Ghế đang đặt</td>
                                    <td><button className="ghe gheDangDat text-center cursor-initial">00</button></td>
                                </tr>
                                <tr className="flex flex-row justify-between items-center" style={{ width: '50%' }}>
                                    <td>Ghế VIP</td>
                                    <td><button className="ghe gheVip text-center cursor-initial">00</button></td>
                                </tr>
                            </div>
                            <div className="flex flex-row justify-between" style={{ width: '100%' }}>
                                <tr className="flex flex-row justify-between items-center" style={{ width: '50%' }}>
                                    <td>Ghế bạn đã đặt</td>
                                    <td><button className="ghe gheDaDuocDat text-center cursor-initial"><UserOutlined style={{ marginBottom: '7.5px' }} /></button></td>
                                </tr>
                                <tr>
                                </tr>
                            </div>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

const { TabPane } = Tabs;
function callback(key) {
    console.log(key);
}
export default function CheckoutTab(props) {
    const { tabActive } = useSelector(state => state.QuanLyDatVeReducer);
    const dispatch = useDispatch();
    return (
        <div className="p-5" style={{ backgroundImage: 'url("https://tix.vn/app/assets/img/icons/backapp.jpg")' }}>
            <Tabs defaultActiveKey='1' activeKey={tabActive} onChange={(key) => {
                dispatch({
                    type: 'CHANGE_TAB_ACTIVE',
                    number: key
                })
            }} type="card">
                <TabPane tab="01 CHỌN GHẾ VÀ THANH TOÁN" key="1">
                    <Checkout {...props} />
                </TabPane>
                <TabPane tab="02 KẾT QUẢ ĐẶT VÉ" key="2">
                    <KetQuaDatVe {...props} />
                </TabPane>
            </Tabs>
        </div>
    )
}

function KetQuaDatVe(props) {

    const dispatch = useDispatch();
    const { thongTinNguoiDung } = useSelector(state => state.QuanLyNguoiDungReducer);
    // const { userLogin } = useSelector(state => state.QuanLyNguoiDungReducer);

    useEffect(() => {
        const action = layThongTinNguoiDungAction();
        dispatch(action);
    }, [])

    console.log('thongTinNguoiDung', thongTinNguoiDung);

    const renderTicketItem = function () {
        return thongTinNguoiDung.thongTinDatVe?.map((ticket, index) => {
            const seats = _.first(ticket.danhSachGhe);
            return (
                <div className="p-2 lg:w-1/3 md:w-1/2 w-full" key={index}>
                    <div className="h-full flex flex-row items-center p-4 rounded-lg movie-ticket" style={{ backgroundColor: "#fff" }}>
                        <img alt="team" className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4" src={ticket.hinhAnh} />
                        <div className="flex-grow" style={{ fontFamily: "Roboto", color: '#000' }}>
                            <h2 className="text-lg title-font" style={{ fontWeight: 'bold', color: '#000' }}>{ticket.tenPhim}</h2>
                            <div className="flex flex-row justify-between" style={{ fontSize: '13px' }}>
                                <p className="p-0 m-0">Giờ chiếu: <span style={{ fontWeight: 'bold' }}>{moment(ticket.ngayDat).format("hh:mm A")}</span></p>
                                <p className="p-0 m-0">Ngày chiếu: <span style={{ fontWeight: 'bold' }}>{moment(ticket.ngayDat).format("DD.MM.YYYY")}</span></p>
                            </div>
                            <div className="flex flex-row justify-between" style={{ fontSize: '13px' }}>
                                <p className="p-0 m-0">Địa điểm: <span style={{ fontWeight: 'bold' }}>{seats.tenHeThongRap} / </span><span style={{ fontWeight: 'bold' }}>{seats.tenCumRap}</span></p>
                            </div>

                            <div className="flex flex-row justify-start" style={{ fontSize: '13px' }}>
                                <p className="p-0 m-0" style={{ marginRight: '12.5px', marginTop: '1.5px' }}>Ghế:</p>
                                <p>{ticket.danhSachGhe.map((ghe, index) => { return <p key={index} style={{ border: '1px solid rgba(128,128,128)', width: '1.94rem', display: 'inline-block', textAlign: 'center', margin: '2px' }}>{ghe.tenGhe} </p> })}</p>
                            </div>

                        </div>
                    </div>
                </div>
            )
        })
    }

    return (
        <section className="text-gray-600 body-font">
            <div className="container px-5 py-24 mx-auto">
                <div className="flex flex-col text-center w-full mb-20">
                    <h1 className="sm:text-3xl font-medium title-font mb-4 text-white" style={{fontSize:'50px'}}>LỊCH SỬ ĐẶT VÉ</h1>
                    <p className="lg:w-2/3 mx-auto leading-relaxed text-base text-white" style={{fontSize: '20px'}}>Hãy xem thông tin địa điểm và thời gian để xem phim vui vẻ bạn nhé !</p>
                </div>
                <div className="flex flex-wrap -m-2">
                    {renderTicketItem()}
                </div>
            </div>
        </section>
    )
}