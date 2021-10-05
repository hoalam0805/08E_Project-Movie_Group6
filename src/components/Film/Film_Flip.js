import React from 'react'
import { history } from '../../App';
import './Film_Flip.css'

//Giao diện của 1 thẻ phim
export default function Film_Flip(props) {
    const {phim} = props;

    return (
        <div className="flip-card mt-2">
            <div className="flip-card-inner">
                <div className="flip-card-front" style={{overflow: 'hidden'}}>
                    <img src={phim.hinhAnh} alt="Avatar" style={{width:300, height:300}}/>
                </div>
                <div className="flip-card-back" style={{position:'relative', backgroundColor:'rgba(0,0,0,.9)', overflow:'hidden'}}>
                    <div style={{position:'absolute', top: 0, left: 0}}>
                        <img src={phim.hinhAnh} alt="Avatar" style={{width:300, height:300}}/>
                    </div>
                    <div className="w-full h-full" style={{position:'absolute', backgroundColor:'rgba(0,0,0,.5)', display:'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <div>
                            <div className="rounded-full cursor-pointer"><i class="fas fa-play-circle" style={{fontSize:'50px'}}></i></div>
                            <div className="text-base mt-2 font-bold">{phim.tenPhim}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div onClick={() => { //Sử dụng history cho sự kiện onClick để chuyển hướng trang qua trang detail
                history.push(`/detail/${phim.maPhim}`)
            }} className="text-center cursor-pointer py-2 bg-yellow-500 text-black my-2 font-bold">ĐẶT VÉ</div>
        </div>

    )
}
