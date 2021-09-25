import _ from 'lodash';
import React from 'react'

export default function Include() {
    //Includes một mảng
    const arr = ['1','2','3'];
    //So sánh cả value và kiểu dữ liệu
    console.log("arr",_.includes(arr,'2'));

    //Includes một object
    const object = {id:1, name:'Henry', age:22};
    console.log("object",_.includes(object,'Henry'))

    return (
        <div>
            
        </div>
    )
}
