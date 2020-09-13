import { CircularProgress } from '@material-ui/core';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@material-ui/icons';
import DropdownComponent from 'components/DropdownComponent/DropdownComponent';
import { isDate, isNull } from 'lodash';
import React from 'react';
import { Button, Table, } from 'semantic-ui-react'
import { PDFExport } from '@progress/kendo-react-pdf';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment'



export default class Report extends React.Component {
    constructor(props) {
        super()
        this.state = {
            currentFilter: {},
            displayFilter: {
                locationId: 'Pilih Lokasi',
                outletId: 'Pilih Outlet'
            },
            SearchValue: null,
            PageNumber: null,
            sorting: null,
            startDate: new Date(),
            endDate: new Date()

        }
    }
    componentDidMount = () => {
        const { token } = this.props;
        this.props.getListTransaction('', token)
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
                temp += `${element}==${currentFilter[element]}`;
                if (dataFilter.length > index + 1) {
                    temp += `,`
                }
            }
        });
        return temp;
    }
    setQuery = () => {
        const { token } = this.props;
        const { currentFilter, SearchValue, PageNumber, sorting } = this.state;
        let queryTemp = {}
        const getFilter = this.setFilter(Object.keys(currentFilter))
        if (getFilter) {
            queryTemp.Filters = getFilter;
        }
        if (!isNull(SearchValue)) {
            queryTemp.SearchValue = SearchValue
        }
        if (!isNull(PageNumber)) {

        }
        if (!isNull(sorting)) {

        }
        return this.queryTemp = queryTemp
    }
    handleChangeDate = value => {
        this.setState({
            startDate: value
        })
    }
    handelChangeDate2 = value => {
        this.setState({ endDate: value})
    }
    handleFilterDate = () => {
        const { currentFilter, startDate, endDate } = this.state;
        const { token } = this.props;
        const date = `${startDate}<=>${endDate}`
        this.props.getListTransaction({ ...this.queryTemp, date }, token)
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
                        <div style={{ marginTop: '40px' }}>
                            Date Start <DatePicker selected={this.state.startDate} onChange={this.handleChangeDate} />
                        </div>
                    </div>
                    <div className='dropdowns-container'>
                        <div style={{ marginTop: '40px' }}>
                            Date End <DatePicker selected={this.state.endDate} onChange={this.handelChangeDate2} />
                        </div>
                    </div>
                    <div className='dropdowns-container'>
                        <div style={{marginTop:'30px'}}>
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
    renderPagination = () => {
        const { listTransaction } = this.props;
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
        const formatter = new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        })
        const tableHeader = ['Phone Number', 'Location', 'Outlet', 'Rate', 'Counter In', 'Counter Out', 'Total Kotor', 'Total Bersih']
        const { listTransaction } = this.props
        const sumTotal = listTransaction.data && listTransaction?.data.reduce((accum, item) => accum + item.total, 0)
        const sumTotal1 = listTransaction.data && listTransaction?.data.reduce((accum, item) => accum + item.total1, 0)
        const sumCounterIn = listTransaction.data && listTransaction?.data.reduce((accum, item) => accum + item.counterIn, 0)
        const sumCounterOut = listTransaction.data && listTransaction?.data.reduce((accum, item) => accum + item.counterOut, 0)
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
                            <Table.Cell style={{ fontWeight: 'bold' }}>{formatter.format(sumCounterIn)}</Table.Cell>
                            <Table.Cell style={{ fontWeight: 'bold' }}>{formatter.format(sumCounterOut)}</Table.Cell>
                            <Table.Cell style={{ fontWeight: 'bold' }}>{formatter.format(sumTotal)}</Table.Cell>
                            <Table.Cell style={{ fontWeight: 'bold' }}>{formatter.format(sumTotal1)}</Table.Cell>
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