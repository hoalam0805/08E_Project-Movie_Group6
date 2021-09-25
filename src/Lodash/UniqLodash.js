import _ from 'lodash'
import React from 'react'

export default function UniqLodash() {
    
    const arr = [1,2,2,2,4,5,6]
    console.log(_.uniq(arr));


    const object = [
        {id:"1",name:"iPhone X", price:1000},
        {id:"2",name:"iPhone XS", price:2000},
        {id:"3",name:"iPhone XS Max", price:3000},
        {id:"3",name:"iPhone XS Max", price:3000},
        {id:"3",name:"iPhone XS Max", price:3000},
        {id:"4",name:"iPhone X Pro", price:4000},
        {id:"5",name:"iPhone X Pro Max", price:5000},
    ]

    console.log('result', _.uniqBy(arr,))

    return (
        <div>
            
        </div>
    )
}
