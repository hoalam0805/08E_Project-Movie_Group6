import axios from "axios";
import { http, GROUP_ID } from "../../util/settings/config";
import {SET_CHI_TIET_PHIM, SET_HE_THONG_RAP_CHIEU} from './types/DanhSachRapType'

export const layDanhSachHeThongRapAction = () => {
    return dispatch => {
        let promise = http.get(`/api/QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=${GROUP_ID}`);

        promise.then((result) => {
            console.log(result);
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

export const layThongTinChiTietPhim = (id) => {
    return dispatch => {
        let promise = http.get(`/api/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${id}`);

        promise.then((result) => {
            console.log(result);
            //Lấy dữ liệu từ api về => reducer
            dispatch({
                type: SET_CHI_TIET_PHIM,
                filmDetail: result.data.content
            })
        })

        promise.catch((err) => {
            console.log(err);
        })
    }
}