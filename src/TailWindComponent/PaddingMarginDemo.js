import React from 'react'

export default function PaddingMarginDemo() {
    return (
        <div className="container">
            <button className="bg-red-200 px-5" style={{width: 'auto', margin: 15}}>
                div padding
            </button>
            <br/>
            <button className="bg-purple-400 mr-5">
                cyberlearn
            </button>
        </div>
    )
}


//Class padding và margin
//-Padding: className (p- , pt-, pl-, pb-, pr-, px-, py-) + n (n từ 0 đến 96)
//-Margin: className (m-, mt-, ml-, mb-, mr-, mx-, my-) + n (n từ 0 đến 96)