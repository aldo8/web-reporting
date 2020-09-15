import { CircularProgress } from '@material-ui/core';
import React from 'react';
import { Table } from 'semantic-ui-react';

export default class Devices extends React.Component {
    constructor(props){
        super()
        this.state={}
    }
    componentDidMount = () => {
        const {token} = this.props
        console.log('Devices Props',this.props)
        this.props.getDevice(null,token);
    }
    renderContent = () => {
        const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        })
        const tableHeader = ['Phone Number', 'Location', 'Outlet', 'Rate', 'Counter In', 'Counter Out', 'Total Kotor', 'Total Bersih', 'Summary Total']
        const { dataListDevice } = this.props
        console.log('dataListDevice',dataListDevice)
        return (
            <Table basic>
                <Table.Header>
                    <Table.Row>
                        {tableHeader.map((head, index) => (
                            <Table.HeaderCell>{head}</Table.HeaderCell>
                        ))}
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {dataListDevice.data && dataListDevice.data.map((data, index) => (
                        <Table.Row>
                            <Table.Cell>{data.device.phoneNumber}</Table.Cell>
                            <Table.Cell>{data.location.name}</Table.Cell>
                            <Table.Cell>{data.outlet.name}</Table.Cell>
                            <Table.Cell>{data.rate}</Table.Cell>
                            <Table.Cell>{data.counterIn}</Table.Cell>
                            <Table.Cell>{data.counterOut}</Table.Cell>
                            <Table.Cell>{data.total}</Table.Cell>
                            <Table.Cell>{data.total1}</Table.Cell>
                            <Table.Cell>{formatter.format(data.total + data.total1)}</Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        )
    }
    render(){
        if(this.props.isLoading){
            return <CircularProgress className='circular-progress' size={100}/>
        }
        console.log('Ini halaman devices',this.props)
        return(
            <div className='container'><p className='title'>INI HALAMAN DEVICES</p></div>
        )
    }
}