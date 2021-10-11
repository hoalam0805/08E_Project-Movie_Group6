//Định nghĩa các tham số cố định
import axios from "axios";

export const TOKEN_CYBERSOFT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAwOEUiLCJIZXRIYW5TdHJpbmciOiIyOC8wMi8yMDIyIiwiSGV0SGFuVGltZSI6IjE2NDYwMDY0MDAwMDAiLCJuYmYiOjE2MTY1MTg4MDAsImV4cCI6MTY0NjE1NDAwMH0.Aojk9-Qo5B5whL6jc8aZ4IOCm1RF9MrUhORXCrWBwEA";
export const GROUP_ID = 'GP03'
export const USER_LOGIN = 'USER_LOGIN';
export const ACCESS_TOKEN = 'accessToken';

//Cấu hình interceptor cho axios (Tất cả request gọi = axios đều được cấu hình) (1 dự án làm 1 duy nhất)

export const http = axios.create({
    baseURL:'https://movienew.cybersoft.edu.vn',
    timeout:30000,
})

http.interceptors.request.use((config)=>{
    config.headers = {
        ...config.headers,
        'TokenCyberSoft':TOKEN_CYBERSOFT,
        'Authorization': localStorage.getItem(ACCESS_TOKEN)  //Token mà người dùng đăng nhập
    }
    return config
}, (errors) => {
    return Promise.reject(errors)
})