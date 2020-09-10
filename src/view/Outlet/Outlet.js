import React from 'react';

export default class Outlet extends React.Component {
    render(){
        console.log('Ini halaman Outlet')
        return(
            <div className='container'><p className='title'>INI HALAMAN Outlet</p></div>
        )
    }
}