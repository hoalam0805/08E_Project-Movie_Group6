import { ACCESS_TOKEN, USER_LOGIN } from "../../util/settings/config";
import { DANG_NHAP_ACTION, SET_THONG_TIN_NGUOI_DUNG, DANG_KY_ACTION } from "../actions/types/QuanLyNguoiDungType";

let user = {};

if(localStorage.getItem(USER_LOGIN)){
    user = JSON.parse(localStorage.getItem(USER_LOGIN));
}

const stateDefault = {
    userLogin: user,
    thongTinNguoiDung: {}
}

export const QuanLyNguoiDungReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case DANG_NHAP_ACTION: {
            const {thongTinDangNhap} = action;
            localStorage.setItem(USER_LOGIN, JSON.stringify(thongTinDangNhap));
            localStorage.setItem(ACCESS_TOKEN, thongTinDangNhap.accessToken);
            return {...state,userLogin:thongTinDangNhap};
        }

        case DANG_KY_ACTION: {
            const {thongTinDangKy} = action;
            return {...state    };
        }

        case SET_THONG_TIN_NGUOI_DUNG:{
            state.thongTinNguoiDung = action.thongTinNguoiDung;
            return {...state};
        }

        default:
            return { ...state }
    }
}