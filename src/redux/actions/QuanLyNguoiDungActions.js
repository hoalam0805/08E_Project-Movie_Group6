// import axios from "axios";
import { http, GROUP_ID } from "../../util/settings/config";
import { DANG_KY_ACTION, DANG_NHAP_ACTION, SET_DANH_SACH_NGUOI_DUNG, SET_THONG_TIN_NGUOI_DUNG } from "./types/QuanLyNguoiDungType";
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

export const layThongTinNguoiDungAction = (taiKhoan) => {
    return async (dispatch) => {
        dispatch(displayLoadingAction);

        let promise = http.post(`api/QuanLyNguoiDung/LayThongTinNguoiDung?taiKhoan=${taiKhoan}`);
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

export const layDanhSachNguoiDungAction = (tuKhoa = '') => {
    return (dispatch) => {
        if (tuKhoa != '') {
            let promise = http.get(`/api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${GROUP_ID}&tuKhoa=${tuKhoa}`);
            promise.then((result) => {
                dispatch({
                    type: SET_DANH_SACH_NGUOI_DUNG,
                    danhSachNguoiDung: result.data.content,
                });
            })

            promise.catch((err) => {
                console.log('err', err.response?.data);
            })
        } else {
            let promise = http.get(`/api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${GROUP_ID}`);
            promise.then((result) => {
                dispatch({
                    type: SET_DANH_SACH_NGUOI_DUNG,
                    danhSachNguoiDung: result.data.content,
                });
            })

            promise.catch((err) => {
                console.log('err', err.response?.data);
            })
        }
    }
}

export const xoaNguoiDungAction = (taiKhoan) => {
    return dispatch => {
        let promise = http.delete(`/api/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${taiKhoan}`);
        promise.then((result) => {
            alert("Xóa người dùng thành công!");
            console.log('result', result.data.content);
            //Sau khi xóa xong phim -> load lại danh sách phim mới
            dispatch(layDanhSachNguoiDungAction());
        })
        promise.catch((err) => {
            console.log('err', err.response?.data);
        })
    }
}

export const themNguoiDungAction = (formData) => {
    return (dispatch) => {
        let promise = http.post('/api/QuanLyNguoiDung/ThemNguoiDung', formData);

        promise.then((result) => {
            alert("Thêm người dùng thành công!");
            console.log('result', result.data.content);
            dispatch(layDanhSachNguoiDungAction());
            history.push('/admin/users');
        })
        promise.catch((err) => {
            console.log('err', err.response?.data);
        })
    }
}

export const capNhatThongTinNguoiDungAction = (formData) => {
    return dispatch => {
        let promise = http.post('/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung', formData);
        promise.then((result) => {
            alert("Cập nhật người dùng thành công!");
            console.log('result', result.data.content);
            dispatch(layDanhSachNguoiDungAction());
            history.push('/admin/users');
        })
        promise.catch((err) => {
            console.log('err', err.response?.data);
        })
    }
}