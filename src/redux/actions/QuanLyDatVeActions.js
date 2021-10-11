import { http } from "../../util/settings/config";
import { SET_CHI_TIET_PHONG_VE } from "./types/QuanLyDatVeType";


export const layChiTietPhongVeAction = (maLichChieu) => {
    return (dispatch) => {
        let promise = http.get(`/api/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${maLichChieu}`);
        // console.log(promise);
        promise.then((result) => {
            if (result.status === 200) {
                dispatch({
                    type: SET_CHI_TIET_PHONG_VE,
                    chiTietPhongVe: result.data.content
                })
            }
            // console.log('result',result);

        })

        promise.catch((err) => {
            console.log('error', err)
            console.log('error', err.response?.data);
        })
    }
}