import React from 'react'
import Header from '../Header/Header'

export const Layout = ({ children }) => {
    return (
        <>
            <div className='d-flex '>
                <div id="content-wrapper" className="d-flex flex-column w-100">
                    <div id="content">
                        <Header />
                        <div className='content'>{children}</div>
                    </div>
                </div>
            </div>
        </>
    )
}
