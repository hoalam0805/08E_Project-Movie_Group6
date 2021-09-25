import React, { useEffect } from 'react'
import HomeMenu from './HomeMenu/HomeMenu'
//Ket noi redux
import { useSelector, useDispatch } from 'react-redux'
import Film from '../../components/Film/Film';
import MultipleRows from '../../components/RSlick/MultipleRowSlick';
import { layDanhSachPhimAction } from '../../redux/actions/QuanLyPhimActions';

export default function Home(props) {
    const { arrFilm } = useSelector(state => state.QuanLyPhimReducer);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(layDanhSachPhimAction())
    },[])
    return (
        <div className="container">
            <section className="text-gray-600 body-font">
                <div className="container px-5 py-24 mx-auto">
                    <MultipleRows arrFilm={arrFilm}/>
                    {/* <div className="flex flex-wrap" stye={{justifyContent: 'center'}}>
                        {renderPhim()}
                    </div> */}
                </div>
            </section>
            <div className="mx-36">
                <HomeMenu />
            </div>
        </div>
    )
}
