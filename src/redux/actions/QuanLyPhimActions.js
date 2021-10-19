import axios from "axios";
import { history } from "../../App";
import { http, GROUP_ID } from "../../util/settings/config";
import { SET_DANHSACHPHIM, SET_THONG_TIN_PHIM } from './types/DanhSachPhimType'

export const layDanhSachPhimAction = (tenPhim = '') => {
    return (dispatch) => {
        if (tenPhim != '') {
            let promise = http.get(`/api/QuanLyPhim/LayDanhSachPhim?maNhom=${GROUP_ID}&tenPhim=${tenPhim}`);
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
        } else {
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

    }
};

export const themPhimUploadHinhAction = (formData) => {
    return (dispatch) => {
        let promise = http.post('/api/QuanLyPhim/ThemPhimUploadHinh', formData);

        promise.then((result) => {
            alert("Thêm phim thành công!");
            console.log('result', result.data.content);
            dispatch(layDanhSachPhimAction());
            history.push('/admin/films');
        })
        promise.catch((err) => {
            console.log('err', err.response?.data);
        })
    }
}

export const layThongTinPhimAction = (maPhim) => {
    return (dispatch) => {
        let promise = http.get(`/api/QuanLyPhim/LayThongTinPhim?MaPhim=${maPhim}`);

        promise.then((result) => {
            console.log('result', result.data.content);
            dispatch({
                type: SET_THONG_TIN_PHIM,
                thongTinPhim: result.data.content
            })
        })
        promise.catch((err) => {
            console.log('err', err.response?.data);
        })
    }
}

export const capNhatPhimUploadAction = (formData) => {
    return dispatch => {
        let promise = http.post('/api/QuanLyPhim/CapNhatPhimUpload', formData);
        promise.then((result) => {
            alert("Cập nhật phim thành công!");
            console.log('result', result.data.content);
            dispatch(layDanhSachPhimAction());
            history.push('/admin/films');
        })
        promise.catch((err) => {
            console.log('err', err.response?.data);
        })
    }
}

export const xoaPhimAction = (maPhim) => {
    return dispatch => {
        let promise = http.delete(`/api/QuanLyPhim/XoaPhim?MaPhim=${maPhim}`);
        promise.then((result) => {
            alert("Xóa phim thành công!");
            console.log('result', result.data.content);
            //Sau khi xóa xong phim -> load lại danh sách phim mới
            dispatch(layDanhSachPhimAction());
        })
        promise.catch((err) => {
            console.log('err', err.response?.data);
        })
    }
}