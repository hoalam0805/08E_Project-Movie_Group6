import _ from 'lodash';
import React from 'react'
import { useSelector } from 'react-redux'

export default function Footer(props) {

    const { heThongRapChieu } = useSelector(state => state.QuanLyRapReducer);
    const arrHeThongRap = _.map(heThongRapChieu, (heThongRap) => _.pick(heThongRap, ['maHeThongRap', 'tenHeThongRap', 'logo']));

    return (
        <footer className="dark:bg-coolGray-800 dark:text-coolGray-50" style={{ backgroundColor: 'rgba(140,140,140,0.2)' }}>
            <div className="container px-6 mx-auto space-y-6 divide-y divide-gray-400 md:space-y-12 divide-opacity-50 pt-5">
                <div className="grid grid-cols-12">
                    <div className="pb-6 col-span-full md:pb-0 md:col-span-6">
                        <a href="#" aria-label="Back to homepage" className="flex items-center p-2">
                            <span style={{ color: '#000', fontSize: '50px', marginRight: '-8px' }}>H∴C</span>
                            <img src="https://www.freeiconspng.com/uploads/video-camera-tripod-icon-12.png" alt="cyberlearn.vn" style={{ width: '6%' }} />
                            <span style={{ color: '#000', fontSize: '50px', marginLeft: '-8px' }}>nema</span>
                        </a>
                    </div>
                    <div className="col-span-6 text-center md:text-left md:col-span-3" style={{fontFamily: 'Roboto'}}>
                        <p className="pb-1 text-lg font-medium text-black">Partner</p>
                        <div className="grid grid-cols-3">
                            {arrHeThongRap.map((htr, index) => {
                                return (
                                    <div key={index}>
                                        <img src={htr.logo} style={{ width: '50%', margin: '0 10px 10px 0' }} />
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div className="col-span-6 text-center md:text-left md:col-span-3" style={{fontFamily: 'Roboto'}}>
                        <p className="pb-1 text-lg font-medium text-black">Mobile app</p>
                        <div className="flex text-black">
                            <div className="mr-5"><i className="fab fa-apple text-2xl"></i></div>
                            <div className><i className="fab fa-facebook-square text-2xl"></i></div>
                        </div>
                    </div>
                </div>
                <div className="text-center py-5">
                    <div className="text-sm md:block lg:col-start-1 md:space-x-6">
                        <span className="text-black" style={{fontFamily: 'Roboto'}}>©2021 All rights reserved</span>
                    </div>
                </div>
            </div>
        </footer>

    )
}
