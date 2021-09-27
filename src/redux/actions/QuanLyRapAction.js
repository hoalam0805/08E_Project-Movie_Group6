import axios from "axios";
import { http, GROUP_ID } from "../../util/settings/config";
import {SET_HE_THONG_RAP_CHIEU} from './types/DanhSachRapType'

export const layDanhSachHeThongRapAction = () => {
    return dispatch => {
        let promise = http.get(`/api/QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=${GROUP_ID}`);

        promise.then((result) => {
            console.log(result)
            dispatch({
                type: SET_HE_THONG_RAP_CHIEU,
                heThongRapChieu: result.data.content
            })
        })
        
        promise.catch((err) => {
            console.log(err)
        })
    }
};