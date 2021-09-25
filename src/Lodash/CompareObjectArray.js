import _ from 'lodash';
import React from 'react'

export default function CompareObjectArray() {
    const arrA = [1,2];
    const arrB = [1,2];

    const result = _.isEqual(arrA.sort(),arrB.sort()); //true
    console.log('result', result) //false

    const arrObject1 = [{id:1,name:'A'},{id:2,name:'B'}];
    const arrObject2 = [{id:1,name:'A'},{id:2,name:'C'},{id:3,name:'B'}];

    const result1 = _.differenceWith(arrObject2, arrObject1, _.isEqual);
    console.log('result1', result1); //Trả về mảng

    return (
        <div>
            
        </div>
    )
}
