import { CircularProgress } from '@material-ui/core';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@material-ui/icons';
import DropdownComponent from 'components/DropdownComponent/DropdownComponent';
import { isEmpty, isNull } from 'lodash';
import React from 'react';
import { Button, Table, } from 'semantic-ui-react'
import { PDFExport } from '@progress/kendo-react-pdf';
import DatePicker from "react-datepicker";
import Calendar from 'react-calendar';

import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment'




export default class Report extends React.Component {
    constructor(props) {
        super()
        this.setQuery = this.setQuery.bind(this)
        this.state = {
            temp:{},
            currentFilter: {},
            displayFilter: {
                locationId: 'Pilih Lokasi',
                outletId: 'Pilih Outlet'
            },
            SearchValue: null,
            PageNumber: null,
            Sorts: '-created',
            startDate: new Date(),
            endDate: new Date()

        }
    }
    RoundHalfDown(num) {
        if (num % 1 !== 0) {
            return this.roundnegatif(num);
        }
        return this.roundpostif(num);

    }
    roundnegatif(x) {
        var up = Math.ceil(x / 0.5) * 0.5;
        if (up > x) {
            if (x % 0.5 !== 0
            ) {
                if (up % 1 === 0
                ) {
                    return up;
                }

                return Math.floor(x / 0.5) * 0.5;
            }
        }
        if (up === x) {
            if (up % 1 !== 0
            ) {
                return Math.floor(x / 1) * 1;
            }
        }
        return up;
    }
    roundpostif(x) {
        var up = Math.ceil(x / 500) * 500;
        if (up > x) {
            if (x % 500 !== 0
            ) {
                if (up % 1000 === 0
                ) {
                    return up;
                }

                return Math.floor(x / 500) * 500;
            }
        }
        if (up === x) {
            if (up % 1000 !== 0
            ) {
                return Math.floor(x / 1000) * 1000;
            }
        }
        return up;
    }
    componentDidMount = () => {
        const { token } = this.props;
        // this.props.getListTransaction({ Sorts: `-created` }, token)
        this.props.getListLocation(null, token)
        this.props.getListOutlet(null, token)
    }
    handleFilter = (key, value) => {
        const { currentFilter, displayFilter } = this.state;
        this.setState({
            displayFilter: {
                ...displayFilter,
                [key]: value.name
            },
            currentFilter: {
                ...currentFilter,
                [key]: value.id
            }
        }, () => this.setQuery())

    }
    setFilter = (dataFilter) => {
        const { currentFilter } = this.state;
        let temp = "";
        dataFilter.forEach((element, index) => {
            
            if (!isNull(currentFilter[element])) {
                if (element === 'created') {
                    temp += `${element}>=${currentFilter[element]}`
                } else {
                    temp += `${element}==${currentFilter[element]}`;
                }

                if (dataFilter.length > index + 1) {
                    temp += `,`
                }
            }
        });
        return temp;
    }
    
    setQuery = (key) => {
        const { currentFilter, SearchValue, PageNumber, Sorts, startDate, endDate } = this.state;
        if (key === 'date') {
            let start = moment(startDate).format('YYYY-MM-DD')
            let end = moment(endDate).format('YYYY-MM-DD')
            const created = `${start} 00:00:01,created<=${end} 23:59:59`
            this.setState({
                currentFilter: {
                    ...currentFilter,
                    created: created
                }
            })
        }
        
        this.queryTemp = {}
        const getFilter = this.setFilter(Object.keys(currentFilter))
        if (getFilter) {
            this.queryTemp.Filters = getFilter;
        }
        if (!isNull(SearchValue)) {
            this.queryTemp.SearchValue = SearchValue
        }
        if (!isNull(PageNumber)) {

        }
        if (!isNull(Sorts)) {
            this.queryTemp.Sorts = Sorts
        }
        
        return this.setState({
            temp:this.queryTemp
        })
        
        
    }
    
    handleChangeDate = value => {
        this.setState({
            startDate: value
        }, () => this.setQuery('date'))
    }
    handelChangeDate2 = value => {
        this.setState({ endDate: value }, () => this.setQuery('date'))
    }
    handleFilterDate = () => {  
        if(isEmpty(this.state.currentFilter.locationId)){
            return alert("Please choose location")
        }else {
        this.setQuery()
        const { token } = this.props;
        this.props.getListTransaction(this.state.temp , token)
    }
    }
    handleSearch = (key, value) => {
        const { currentFilter } = this.state;
        if (key === 'change') {
            this.setState({ SearchValue: value })
        }
        this.setState({
            ...currentFilter,
            PageNumber: null,
            SearchValue: value
        }, () => this.setQuery())
    }
    renderFilter = () => {
        const { listLocation, listOutlet } = this.props;
        const { displayFilter } = this.state;
        let Location = [];
        let Outlet = [];
        listLocation.data && listLocation.data.map((data) => {
            return Location.push({ id: data.id, name: data.name })
        })
        listOutlet.data && listOutlet.data.map((data) => {
            return Outlet.push({ id: data.id, name: data.name })
        })
        return (
            <>
                <Button onClick={() => this.pdfExportComponent.save()}>Download Report</Button>
                <div className='filters-container'>
                    <div className='dropdowns-container' style={{ padding: 0 }}>
                        <DropdownComponent data={Location} selected={displayFilter.locationId} onSelectAction={(data) => this.handleFilter('locationId', data)} />
                    </div>
                    <div className='dropdowns-container'>
                        <DropdownComponent data={Outlet} selected={displayFilter.outletId} onSelectAction={(data) => this.handleFilter('outletId', data)} />
                    </div>
                    <div className='dropdowns-container'>
                        <div style={{ marginTop: '25px' }}>
                            Date Start <DatePicker selected={this.state.startDate} onChange={this.handleChangeDate.bind(this)} />
                        </div>
                    </div>
                    <div className='dropdowns-container'>
                        <div style={{ marginTop: '25px' }}>
                            Date End <DatePicker selected={this.state.endDate} onChange={this.handelChangeDate2.bind(this)} />
                        </div>
                    </div>
                    <div className='dropdowns-container'>
                        <div style={{ marginTop: '30px' }}>
                            <Button onClick={() => this.handleFilterDate()}>Cari</Button>
                        </div>
                    </div>
                </div>
            </>
        )
    }
    onPagination = (key, pageNumber) => {
        const { token } = this.props;
        this.props.getListTransaction({ PageNumber: pageNumber }, token)
    }
    onSearch = () => {

    }
    renderPagination = () => {
        const { listTransaction } = this.props;
        const nextPage = listTransaction.meta?.hasNextPage;
        const prevPage = listTransaction.meta?.hasPreviousPage;
        const PageNumber = listTransaction.meta?.pageNumber;
        const totalPages = listTransaction.meta?.totalPages;
        return (
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
        );


    }
    renderContent = () => {
        const formatter = new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        })
        const tableHeader = ['No', 'Created', 'Phone Number', 'Location', 'Outlet', 'Rate', 'Counter In', 'Counter Out', 'Total Kotor']
        const { listTransaction } = this.props
        let discount = 0
        discount = listTransaction.data && listTransaction?.data[0]?.tolerance
        const sumTotal = listTransaction.data && listTransaction?.data.reduce((accum, item) => accum + item.total, 0)
        const sumCounterIn = listTransaction.data && listTransaction?.data.reduce((accum, item) => accum + item.counterIn, 0)
        const sumCounterOut = listTransaction.data && listTransaction?.data.reduce((accum, item) => accum + item.counterOut, 0)
        const summaryCounterIn = this.RoundHalfDown(sumCounterIn - (sumCounterIn * discount / 100))
        const summaryCounterOut = this.RoundHalfDown(sumCounterOut - (sumCounterOut * discount / 100))
        const summaryTotal = this.RoundHalfDown(sumTotal - (sumTotal * discount / 100))
        if(listTransaction.data && listTransaction.data.length === 0 || Object.entries(listTransaction).length === 0){
            return <p style={{textAlign:'center'}}>No Data</p>
        }
        return (
            <PDFExport
                ref={component => (this.pdfExportComponent = component)}
                paperSize="auto"
                margin={40}
                fileName={`Transaksi Report ${new Date().getFullYear()}`}
            >
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

                                <Table.Cell>{index + 1}</Table.Cell>
                                <Table.Cell>{moment(data.created).format("MM-DD-YYYY")}</Table.Cell>
                                <Table.Cell>{data.device.phoneNumber}</Table.Cell>
                                <Table.Cell>{data.location.name}</Table.Cell>
                                <Table.Cell>{data.outlet.name}</Table.Cell>
                                <Table.Cell>{data.rate}</Table.Cell>
                                <Table.Cell>{data.counterIn}</Table.Cell>
                                <Table.Cell>{data.counterOut}</Table.Cell>
                                <Table.Cell>{data.total}</Table.Cell>
                                <Table.Cell>{data.total1}</Table.Cell>

                            </Table.Row>
                        ))}
                        <Table.Row>
                            <Table.Cell />
                            <Table.Cell />
                            <Table.Cell />
                            <Table.Cell />
                            <Table.Cell />
                            <Table.Cell style={{ fontWeight: 'bold' }}>Grand Total</Table.Cell>
                            <Table.Cell style={{ fontWeight: 'bold' }}>{sumCounterIn}</Table.Cell>
                            <Table.Cell style={{ fontWeight: 'bold' }}>{sumCounterOut}</Table.Cell>
                            <Table.Cell style={{ fontWeight: 'bold' }}>{formatter.format(sumTotal)}</Table.Cell>
                        </Table.Row>
                    </Table.Body>
                    <Table.Body>
                        <Table.Row>
                            <Table.Cell />
                            <Table.Cell />
                            <Table.Cell />
                            <Table.Cell />
                            <Table.Cell />
                            <Table.Cell style={{ fontWeight: 'bold' }}>{`Grand Total Dari Kemungkinan Data Masuk Error ${discount}%`}</Table.Cell>
                            <Table.Cell style={{ fontWeight: 'bold' }}>{summaryCounterIn}</Table.Cell>
                            <Table.Cell style={{ fontWeight: 'bold' }}>{summaryCounterOut}</Table.Cell>
                            <Table.Cell style={{ fontWeight: 'bold' }}>{formatter.format(summaryTotal)}</Table.Cell>
                        </Table.Row>
                    </Table.Body>
                </Table>
            </PDFExport>
        )
    }
    render() {
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