import _ from 'lodash';
import React from 'react'

export default function FillLosdash() {
    var arr = [
        {id:1,name:'iPhone'},
        {id:2,name:'iPhone X'},
        {id:3,name:'iPhone XS'},
        {id:4,name:'iPhone Pro'},
        {id:5,name:'iPhone Pro Max'},
    ];

    _.fill(arr,{id:5,name:'Samsung Galaxy Note 10 Plus'},1,2);
    console.log(arr);

    return (
        <div>
            
        </div>
    )
}
