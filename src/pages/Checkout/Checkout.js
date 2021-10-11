import React, { useEffect, Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { layChiTietPhongVeAction } from '../../redux/actions/QuanLyDatVeActions';
import { CloseOutlined } from '@ant-design/icons'
import './Checkout.css'

export default function Checkout(props) {

    const { userLogin } = useSelector(state => state.QuanLyNguoiDungReducer)

    const { chiTietPhongVe } = useSelector(state => state.QuanLyDatVeReducer);

    const dispatch = useDispatch();

    useEffect(() => {
        const action = layChiTietPhongVeAction(props.match.params.id);
        dispatch(action);
    }, [])

    console.log({ chiTietPhongVe });

    const { thongTinPhim, danhSachGhe } = chiTietPhongVe;

    const renderSeats = () => {
        return danhSachGhe.map((ghe, index) => {
            let classGheVip = ghe.loaiGhe === 'Vip' ? 'gheVip' : '';
            let classGheDaDat = ghe.daDat === true ? 'gheDaDat' : '';
            return <Fragment key={index}>
                <button disabled={ghe.daDat} className={`ghe ${classGheVip} ${classGheDaDat} text-center`} key={index}>
                    {ghe.daDat == true ? <CloseOutlined style={{marginBottom:'7.5px'}} /> : ghe.stt}
                </button>
                {(index + 1) % 16 == 0 ? <br /> : ''}
            </Fragment>
        })
    }

    return (
        <div className="min-h-screen mt-5" style={{ height: '100vh', width: '100%' }}>
            <div className="grid grid-cols-12">
                <div className="col-span-9">
                    <div className="flex flex-col items-center mt-5">
                        <div className="bg-black text-center" style={{ width: '80%', height: 'fit-content' }}><span className="text-white">Màn hình</span></div>
                        <div className="trapezoid"></div>
                        <div>
                            {renderSeats()}
                        </div>
                    </div>

                </div>
                <div className="col-span-3 flex flex-col justify-between" style={{ position: 'relative', width: '100%' }}>
                    <div>
                        <h3 className="text-center text-4xl">0 đ</h3>
                        <hr />
                        <h3 className="text-xl">{thongTinPhim.tenPhim}</h3>
                        <p>Địa điểm: {thongTinPhim.tenCumRap} - {thongTinPhim.tenRap}</p>
                        <p>Ngày chiếu: {thongTinPhim.ngayChieu} - {thongTinPhim.gioChieu}</p>
                        <hr />
                        <div className="flex flex-row justify-between my-5">
                            <div className="">
                                <span className="text-lg">Ghế</span>
                            </div>
                            <div className="text-right" style={{marginRight:'1.5rem'}}>
                                <span className="text-lg">0đ</span>
                            </div>
                        </div>
                        <hr />
                        <div className="my-5">
                            <i>Email</i><br />
                            {userLogin.email}
                        </div>
                        <hr />
                        <div className="my-5">
                            <i>Phone</i><br />
                            {userLogin.soDT}
                        </div>
                        <hr />
                    </div>
                    <div>
                        <div className="bg-green-500 text-white w-full text-center py-3 font-bold text-2xl">
                            ĐẶT VÉ
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
