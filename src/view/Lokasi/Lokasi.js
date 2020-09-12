import React from 'react';

export default class Lokasi extends React.Component {
    constructor(props){
        super()
        this.state={}
    }
    componentDidMount = () => {
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiJhYmNkN2NjMi03MjQzLTQyNmEtYTUxNy0zYWJkYWVlOTM0YjAiLCJyb2xlIjoiU0EiLCJuYmYiOjE1OTk5MzU3MTIsImV4cCI6MTU5OTk0MjkxMiwiaWF0IjoxNTk5OTM1NzEyfQ.EWJAGjHrv5D-8z1d6jRKgcs-KN1WqUYPIcmCuh_QJ40"
        this.props.listLocation('',token);
    }
    render(){
        console.log('Ini halaman Lokasi',this.props)
        return(
            <div className='container'><p className='title'>INI HALAMAN Lokasi</p></div>
        )
    }
}