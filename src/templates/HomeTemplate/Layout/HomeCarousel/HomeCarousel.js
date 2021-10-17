import React, { useEffect } from 'react';
import { Carousel } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { getCarouselAction } from '../../../../redux/actions/CarouselActions';
import './HomeCarousel.css'

const contentStyle = {
    height: '100vh',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100%'
};

export default function HomeCarousel(props) {
    const { arrImg } = useSelector(state => state.CarouselReducer);

    const dispatch = useDispatch();

    //Tự kích hoạt khi component load ra
    useEffect(() => {

        //1 action = {type:'',data}
        //2 phải cài middleware: callBackFunction (dispatch)

        dispatch(getCarouselAction());

    }, [])

    const renderImg = () => {
        return arrImg.map((item, index) => {
            return (
                <div key={index}>
                    <div style={{ ...contentStyle, backgroundImage: `url(${item.hinhAnh})` }}>
                        <img src={item.hinhAnh} className="w-full opacity-0" alt={item.hinhAnh} />
                    </div>
                </div>
            )
        })
    }

    return (
        <Carousel autoplay effect="fade" style={{ position: 'relative', zIndex: '1' }}>
            {renderImg()}
        </Carousel>
    )
}
