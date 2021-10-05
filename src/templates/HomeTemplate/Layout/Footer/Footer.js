import _ from 'lodash';
import React from 'react'
import { useSelector } from 'react-redux'

export default function Footer(props) {

    const { heThongRapChieu } = useSelector(state => state.QuanLyRapReducer);
    const arrHeThongRap = _.map(heThongRapChieu, (heThongRap) => _.pick(heThongRap, ['maHeThongRap', 'tenHeThongRap', 'logo']));

    return (
        <footer className="py-6 dark:bg-coolGray-800 dark:text-coolGray-50" style={{backgroundColor:'#000'}}>
            <div className="container px-6 mx-auto space-y-6 divide-y divide-gray-400 md:space-y-12 divide-opacity-50">
                <div className="grid grid-cols-12">
                    <div className="pb-6 col-span-full md:pb-0 md:col-span-6">
                        <a href="#" aria-label="Back to homepage" className="flex items-center p-2">
                            <img src="https://cyberlearn.vn/wp-content/uploads/2020/03/cyberlearn-min-new-opt2.png" alt="cyberlearn.vn" />
                        </a>
                    </div>
                    <div className="col-span-6 text-center md:text-left md:col-span-3">
                        <p className="pb-1 text-lg font-medium text-white">PARTNER</p>
                        <div className="grid grid-cols-3" style={{ color: "#fff" }}>
                            {arrHeThongRap.map((htr, index) => {
                                return (
                                    <div key={index}>
                                        <img src={htr.logo} style={{ width: '50%', margin: '10px' }} />
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div className="col-span-6 text-center md:text-left md:col-span-3">
                        <p className="pb-1 text-lg font-medium text-white">Mobile app</p>
                        <div className="flex text-white">
                            <div className="mr-5"><i className="fab fa-apple text-2xl"></i></div>
                            <div className><i className="fab fa-facebook-square text-2xl"></i></div>
                        </div>
                    </div>
                </div>
                <div className="grid justify-center pt-6 lg:justify-between">
                    <div className="flex flex-col self-center text-sm text-center md:block lg:col-start-1 md:space-x-6">
                        <span className="text-white">©2021 All rights reserved</span>
                    </div>
                </div>
            </div>
        </footer>

    )
}
