/* eslint-disable no-lone-blocks */
import React, { Component } from "react";
import Slider from "react-slick";
import styleSlick from './MultipleRowSlick.module.css';
import Film from "../Film/Film";
import Film_Flip from "../Film/Film_Flip";
import { useDispatch, useSelector } from 'react-redux'
import { SET_PHIM_DANG_CHIEU, SET_PHIM_SAP_CHIEU } from "../../redux/actions/types/DanhSachPhimType";


{/* Định nghĩa sự kiện cho hai nút điều hướng carousel */}
function SampleNextArrow(props) {
    const {className, style, onClick} = props;
    return (
        <div className={`${className} ${styleSlick['slick-prev']}`} style={{...style, display:'block'}} onClick={onClick}></div>
    );
}

function SamplePrevArrow(props) {
    const {className, style, onClick} = props;
    return (
        <div className={`${className} ${styleSlick['slick-prev']}`} style={{...style, display:'block', left:'-50px'}} onClick={onClick}></div>
    );
}

//Layout Carousel
const MultipleRows = (props) => {
    const {dangChieu, sapChieu} = useSelector(state => state.QuanLyPhimReducer);
    const dispatch = useDispatch();

    //Change class for buttons
    let activeClassDC = dangChieu === true ? 'active_Film' : 'none_active_Film';
    let activeClassSC = sapChieu === true ? 'active_Film' : 'none_active_Film';

    const renderFilm = () => {
        return props.arrFilm.slice(0,12).map((item, index) => {
            //Layout card phim ở carousel
            return <div className="mt-3" key={index}>
                <Film_Flip phim={item}/>
            </div>
        })
    }
        //Carousel Settings
        const settings = {
            className: "center variable-width",
            centerMode: true,
            infinite: true,
            centerPadding: "60px",
            slidesToShow: 2,
            speed: 500,
            rows: 2,
            slidesPerRow: 2,
            variableWidth: true,
            nextArrow: <SampleNextArrow/>,
            prevArrow: <SamplePrevArrow/>
        };
        return (
            <div className="container">
                <button className={`${styleSlick[activeClassDC]} px-8 py-3 font-semibold border rounded border-gray-800 mr-3`} onClick={() => {
                    const action = {type:SET_PHIM_DANG_CHIEU}
                    dispatch(action);
                }}>PHIM ĐANG CHIẾU</button>
                <button className={`${styleSlick[activeClassSC]} px-8 py-3 font-semibold border rounded border-gray-800`} onClick={() => {
                    const action = {type: SET_PHIM_SAP_CHIEU}
                    dispatch(action)
                }}>PHIM SẮP CHIẾU</button>
                <Slider {...settings}>
                    {renderFilm()}
                </Slider>
            </div>
        );
}

export default MultipleRows;