import axios from "axios";
import { history } from "../../App";
import { http, GROUP_ID } from "../../util/settings/config";
import { SET_DANHSACHPHIM, SET_THONG_TIN_PHIM } from './types/DanhSachPhimType'

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

export const themPhimUploadHinhAction = (formData) => {
    return (dispatch) => {
        let promise = http.post('/api/QuanLyPhim/ThemPhimUploadHinh', formData);

        promise.then((result) => {
            alert("Thêm phim thành công!");
            console.log('result', result.data.content);
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