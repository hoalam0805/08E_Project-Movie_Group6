import React from 'react'
import _ from 'lodash'

export default function JoinDemo() {
    let arr = ["A", "B", "C"];
    let arrPerson = [
        {id: 1, name:'A'},
        {id: 2, name:'B'},
        {id: 3, name:'C'},
    ];

    //es6
    const result = arr.join('-') //IE 9 - 10

    //lodash
    const resultLodash = _.join(arr,'*');
    const person = _.find(arrPerson, item => item.id === 2);

    return (
        <div>
            {result}
            {resultLodash}
            <br/>        
            <div>
                <p>Name: {person.name} - id: {person.id}</p>
            </div>
        </div>
    )
}
