// import axios from "axios";
import { http, GROUP_ID } from "../../util/settings/config";
import { DANG_NHAP_ACTION } from "./types/QuanLyNguoiDungType";

export const dangNhapAction = (thongTinDangNhap) => {
    return (dispatch) => {
        let promise = http.post(`/api/QuanLyNguoiDung/DangNhap`,thongTinDangNhap);
        console.log(promise);
        promise.then((result) => {
            if (result.data.status === 200) {
                dispatch({
                    type: DANG_NHAP_ACTION,
                    thongTinDangNhap: result.data.content,
                })
            }
            console.log(result);
        })

        promise.catch((err) => {
            console.log(err.response.data);
        })
    }
};