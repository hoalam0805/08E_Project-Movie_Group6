import React from 'react'

export default function DemoGrid() {
    return (
        //Class grid dùng để chia lưới giống như row của bootstrap
        //Ngoài ra còn cung cấp cho chúng ta thêm 1 class để phân tách khoảng cách giữa các cột: gap-n (n: integer)
        <div className="container">
            <div className="grid grid-cols-5 gap-2">
                <div className="bg-red-200">1</div>
                <div className="bg-blue-200">2</div>
                <div className="bg-green-200">3</div>
                <div className="bg-yellow-200">4</div>
                <div className="bg-pink-200">5</div>
            </div>
        </div>
    )
}
