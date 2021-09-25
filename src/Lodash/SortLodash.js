import _ from 'lodash'
import React from 'react'

export default function SortLodash() {
    const users = [
        {id:5, name: 'Fred', age: 48},
        {id:3, name: 'Kaito', age: 36},
        {id:9, name: 'Kaito', age: 47},
        {id:2, name: 'Kaito', age: 35},
        {id:4, name: 'Bake', age: 40},
        {id:7, name: 'Juld', age: 34},
    ]

    const resultSortByName = _.sortBy(users,[item => item.name]);
    console.log('resultSortByName',resultSortByName);

    const resultSortByAge = _.sortBy(users,[item => item.age]);
    console.log('resultSortByAge',resultSortByAge);

    const resultSortMixed = _.sortBy(users,['name','age']);
    console.log('resultSortMixed',resultSortMixed);

    return (
        <div>
            
        </div>
    )
}