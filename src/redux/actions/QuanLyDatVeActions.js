import { http } from "../../util/settings/config";
import { SET_CHI_TIET_PHONG_VE, DAT_VE_HOAN_TAT, CHUYEN_TAB } from "./types/QuanLyDatVeType";
import { ThongTinDatVe } from "../../_core/models/ThongTinDatVe";
import { displayLoadingAction, hideLoadingAction } from "./LoadingActions";


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

export const datVeAction = (thongTinDatVe = new ThongTinDatVe()) => {

    return async (dispatch) => {

        dispatch(displayLoadingAction);

        let promise = http.post('/api/QuanLyDatVe/DatVe', thongTinDatVe);
        promise.then((result) => {
            console.log('result', result.data.content);
        })
        //đặt vé thành công => gọi API load lại phòng vé
        await dispatch(layChiTietPhongVeAction(thongTinDatVe.maLichChieu));
        await dispatch({type:DAT_VE_HOAN_TAT});
        await dispatch(hideLoadingAction);
        dispatch({type:CHUYEN_TAB});

        promise.catch((error) => {
            dispatch(hideLoadingAction);
            console.log('error', error.response.data);
        })
    }
}