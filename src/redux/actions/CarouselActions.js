import axios from "axios";
import { http } from "../../util/settings/config";
import { SET_CAROUSEL } from "./types/CarouselType";

export const getCarouselAction = () => {
    return (dispatch) => {
        let promise = http.get('/api/QuanLyPhim/LayDanhSachBanner');

        promise.then((result) => {
            console.log(result)
            dispatch({
                type: SET_CAROUSEL,
                arrImg: result.data.content
            })
        })
        
        promise.catch((err) => {
            console.log(err)
        })
    }
};