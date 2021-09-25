import axios from "axios";
import { http, GROUP_ID } from "../../util/settings/config";
import {SET_DANHSACHPHIM} from './types/DanhSachPhimType'

export const layDanhSachPhimAction = () => {
    return (dispatch) => {
        let promise = http.get(`/api/QuanLyPhim/LayDanhSachPhim?maNhom=${GROUP_ID}`);

        promise.then((result) => {
            console.log(result)
            dispatch({
                type: SET_DANHSACHPHIM,
                arrFilm: result.data.content
            })
        })
        
        promise.catch((err) => {
            console.log(err)
        })
    }
};