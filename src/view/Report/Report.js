import { CircularProgress } from '@material-ui/core';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@material-ui/icons';
import DropdownComponent from 'components/DropdownComponent/DropdownComponent';
import React from 'react';
import { Button, Table, Dropdown, Pagination } from 'semantic-ui-react'


export default class Report extends React.Component {
    constructor(props) {
        super()
        this.state = {}
    }
    componentDidMount = () => {
        const { token } = this.props;
        this.props.getListTransaction('', token)
    }
    handleClick = (key,value) => {
        
        
    }

    renderFilter = () => {
        const dataLokasi = [
            'Lokasi 1',
            'Lokasi 2',
            'Lokasi 3',
        ]
        const dataOutlet = ['Outlet1','Outlet2','Outlet3']
        return (
            <>
            <div className='filters-container'>
                <div className='dropdowns-container'>
                    <p>LOKASI</p>
                    <DropdownComponent data={dataOutlet}/>
                </div>
                <div className='dropdowns-container'>
                    <p>OUTLET</p>
                    <DropdownComponent data={dataLokasi} onSelectAction={(data) => this.handleClick('filter',data)}/>
                </div>
                <div className='dropdowns-container'>
                    <p>TANGGAL</p>
                    <DropdownComponent/>
                </div>
            </div>
                <Button>CARI</Button>
                <Button>PRINT</Button>
                <Button>Export PDF</Button>
            </>
        )
    }
    onPagination = (key,pageNumber) => {
        const {token} = this.props;
        this.props.getListTransaction({PageNumber:pageNumber},token)
    }
    renderPagination = () => {
        const { listTransaction} = this.props;
        const nextPage = listTransaction.meta?.hasNextPage;
        const prevPage = listTransaction.meta?.hasPreviousPage;
        const PageNumber = listTransaction.meta?.pageNumber;
        const totalPages = listTransaction.meta?.totalPages;
        return (
            <div>
                <div className={"pagination"}>
                    <div className={"paging"}>
                        {prevPage && (
                            <div
                                className={"next-page"}
                                onClick={() =>
                                    this.onPagination("PageNumber", PageNumber - 1)
                                }
                            >
                                <KeyboardArrowLeft className="arrow-icon" />
                            </div>
                        )}
                        {PageNumber - 3 > 0 && (
                            <div
                                className={"page-inactive"}
                                onClick={() =>
                                    this.onPagination("PageNumber", PageNumber - 3)
                                }
                            >
                                {PageNumber - 3}
                            </div>
                        )}
                        {PageNumber - 2 > 0 && (
                            <div
                                className={"page-inactive"}
                                onClick={() =>
                                    this.onPagination("PageNumber", PageNumber - 2)
                                }
                            >
                                {PageNumber - 2}
                            </div>
                        )}
                        {PageNumber - 1 > 0 && (
                            <div
                                className={"page-inactive"}
                                onClick={() =>
                                    this.onPagination("PageNumber", PageNumber - 1)
                                }
                            >
                                {PageNumber - 1}
                            </div>
                        )}
                        <div
                            className={"page-active"}
                            onClick={() => this.onPagination("PageNumber", PageNumber)}
                        >
                            {PageNumber}
                        </div>
                        {PageNumber + 1 <= totalPages && (
                            <div
                                className={"page-inactive"}
                                onClick={() =>
                                    this.onPagination("PageNumber", PageNumber + 1)
                                }
                            >
                                {PageNumber + 1}
                            </div>
                        )}
                        {PageNumber + 2 < totalPages && (
                            <div
                                className={"page-inactive"}
                                onClick={() =>
                                    this.onPagination("PageNumber", PageNumber + 2)
                                }
                            >
                                {PageNumber + 2}
                            </div>
                        )}
                        {PageNumber + 3 < totalPages && (
                            <div
                                className={"page-inactive"}
                                onClick={() =>
                                    this.onPagination("PageNumber", PageNumber + 3)
                                }
                            >
                                {PageNumber + 3}
                            </div>
                        )}
                        {nextPage && (
                            <div
                                className={"next-page"}
                                onClick={() =>
                                    this.onPagination("PageNumber", PageNumber + 1)
                                }
                            >
                                <KeyboardArrowRight className="arrow-icon" />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );


    }
    renderContent = () => {
        const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        })
        const tableHeader = ['Phone Number', 'Location', 'Outlet', 'Rate', 'Counter In', 'Counter Out', 'Total Kotor', 'Total Bersih', 'Summary Total']
        const { listTransaction } = this.props
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
                    {listTransaction.data && listTransaction.data.map((data, index) => (
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
    render() {
        console.log('Ini halaman Report', this.props.listTransaction)
        const { isLoading } = this.props;
        if (isLoading) {
            return <CircularProgress size={100} className='circular-progress' />
        }
        return (
            <div className='container'>
                {this.renderFilter()}
                {this.renderContent()}
                {this.renderPagination()}
            </div>
        )
    }
}