// import axios from "axios";
import { http, GROUP_ID } from "../../util/settings/config";
import { DANG_KY_ACTION, DANG_NHAP_ACTION, SET_THONG_TIN_NGUOI_DUNG } from "./types/QuanLyNguoiDungType";
import { history } from '../../App';
import { displayLoadingAction, hideLoadingAction } from "./LoadingActions";

export const dangNhapAction = (thongTinDangNhap) => {
    return (dispatch) => {
        let promise = http.post(`/api/QuanLyNguoiDung/DangNhap`, thongTinDangNhap);
        promise.then((result) => {
            if (result.data.statusCode === 200) {
                dispatch({
                    type: DANG_NHAP_ACTION,
                    thongTinDangNhap: result.data.content,
                });
                //Chuyển hướng đăng nhập về trang trước đó
                history.push("/");
            }
            console.log('result', result);
        })

        promise.catch((err) => {
            console.log(err.response.data);
        })
    }
};

export const dangKyAction = (thongTinDangKy) => {
    return (dispatch) => {
        let promise = http.post(`/api/QuanLyNguoiDung/DangKy`, thongTinDangKy);
        promise.then((result) => {
            if (result.data.statusCode === 200) {
                dispatch({
                    type: DANG_KY_ACTION,
                    thongTinDangKy: result.data.content,
                });
                //Sau khi đăng ký xong -> chuyển người dùng về trang đăng nhập
                history.push("/login");
            }
            console.log('result', result);
        })

        promise.catch((err) => {
            console.log(err.response.data);
        })
    }
}

export const layThongTinNguoiDungAction = () => {
    return async (dispatch) => {
        dispatch(displayLoadingAction);

        let promise = http.post(`/api/QuanLyNguoiDung/ThongTinTaiKhoan`);
        promise.then((result) => {
            if (result.data.statusCode === 200) {
                dispatch({
                    type: SET_THONG_TIN_NGUOI_DUNG,
                    thongTinNguoiDung: result.data.content,
                });
            }
            console.log('result', result);
        })

        await dispatch(hideLoadingAction);

        promise.catch((err) => {
            dispatch(hideLoadingAction);
            console.log(err.response.data);
        })
    }
};