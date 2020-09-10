import React from 'react';

export default class Lokasi extends React.Component {
    render(){
        console.log('Ini halaman Lokasi',this.props)
        return(
            <div className='container'><p className='title'>INI HALAMAN Lokasi</p></div>
        )
    }
}