// import axios from "axios";
import { http, GROUP_ID } from "../../util/settings/config";
import { DANG_NHAP_ACTION } from "./types/QuanLyNguoiDungType";
import { history } from '../../App';

export const dangNhapAction = (thongTinDangNhap) => {
    return (dispatch) => {
        let promise = http.post(`/api/QuanLyNguoiDung/DangNhap`, thongTinDangNhap);
        // console.log(promise);
        promise.then((result) => {
            if (result.data.statusCode === 200) {
                dispatch({
                    type: DANG_NHAP_ACTION,
                    thongTinDangNhap: result.data.content,
                });
                //Chuyển hướng đăng nhập về trang trước đó
                history.goBack();
            }
            console.log('result', result);
        })

        promise.catch((err) => {
            console.log(err.response.data);
        })
    }
};