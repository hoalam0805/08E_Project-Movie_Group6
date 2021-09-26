import { SET_DANHSACHPHIM, SET_PHIM_SAP_CHIEU, SET_PHIM_DANG_CHIEU } from "../actions/types/DanhSachPhimType";

const stateDefault = {
    arrFilm: [{
        "maPhim": 5030,
        "tenPhim": "The Crawler",
        "biDanh": "the-crawler",
        "trailer": "https://www.youtube.com/watch?v=IoyYAaORRrw&feature=emb_logo",
        "hinhAnh": "https://movienew.cybersoft.edu.vn/hinhanh/the-crawler_gp01.png",
        "moTa": "Một chuyên viên khai vấn tâm lý đi tìm manh mối về cái chết của nữ khách hàng và đối diện với những thế lực kì bí đang che giấu một bí mật liên quan đến gia đình anh ta.nnnn",
        "maNhom": "GP01",
        "ngayKhoiChieu": "2021-08-25T00:00:00",
        "danhGia": 10,
        "hot": true,
        "dangChieu": false,
        "sapChieu": true
    },
    {
        "maPhim": 5031,
        "tenPhim": "The Croods: New Age",
        "biDanh": "the-croods-new-age",
        "trailer": "https://www.youtube.com/watch?v=0qaStyeKpLo&feature=emb_logo",
        "hinhAnh": "https://movienew.cybersoft.edu.vn/hinhanh/the-croods-new-age_gp01.jpg",
        "moTa": "Sinh tồn trong một thế giới tiền sử luôn rình rập hiểm nguy từ đủ loài quái thú hung dữ cho tới thảm họa ngày tận thế, Nhà Croods chưa từng một lần chùn bước. Nhưng giờ đây họ sẽ phải đối mặt với thử thách lớn nhất từ trước tới nay: chung sống với một gia đình khác. Để tìm kiếm một mái nhà an toàn hơn, Nhà Croods bắt đầu hành trình khám phá thế giới tiến tới những vùng đất xa xôi đầy tiềm năng. Một ngày nọ, họ tình cờ lạc vào một nơi yên bình có đầy đủ mọi tiện nghi hiện đại và biệt lập với tường vây bao quanh. Tưởng rằng mọi vấn đề trong cuộc sống sẽ được giải quyết thì Nhà Croods lại phải chấp nhận với sự thật rằng đã có một gia đình khác định cư ở đây đó chính là Nhà Bettermans.",
        "maNhom": "GP01",
        "ngayKhoiChieu": "2021-08-23T00:00:00",
        "danhGia": 10,
        "hot": false,
        "dangChieu": true,
        "sapChieu": false
    }],
    dangChieu: true,
    sapChieu: true,
    arrFilmDefault: []
}

export const QuanLyPhimReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case SET_DANHSACHPHIM: {
            state.arrFilm = action.arrFilm;
            state.arrFilmDefault = state.arrFilm;
            return { ...state }
        }

        case SET_PHIM_DANG_CHIEU: {
            state.dangChieu = !state.dangChieu;
            state.arrFilm = state.arrFilmDefault.filter(film => film.dangChieu === state.dangChieu);
            return {...state};
        }

        case SET_PHIM_SAP_CHIEU: {
            state.sapChieu = !state.sapChieu;
            state.arrFilm = state.arrFilmDefault.filter(film => film.sapChieu === state.sapChieu);
            return {...state};
        }

        default: return { ...state }
    }
}