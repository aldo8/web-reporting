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
import SearchInput from 'components/SearchInput/SearchInput';



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
        this.props.getListTransaction(null, token)
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
            console.log('element value', currentFilter[element])
            console.log('element', element)
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
        const { token } = this.props;
        const { currentFilter, SearchValue, PageNumber, sorting, startDate, endDate } = this.state;
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
        }, () => this.setQuery('date'))
    }
    handelChangeDate2 = value => {
        this.setState({ endDate: value }, () => this.setQuery('date'))
    }
    handleFilterDate = () => {
        const { currentFilter, startDate, endDate } = this.state;
        const { token } = this.props;
        console.log('Handle', this.queryTemp)
        console.log('Tse', this.state)

        this.props.getListTransaction({ ...this.queryTemp }, token)
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
                            Date Start <DatePicker selected={this.state.startDate} onChange={this.handleChangeDate} />
                        </div>
                    </div>
                    <div className='dropdowns-container'>
                        <div style={{ marginTop: '25px' }}>
                            Date End <DatePicker selected={this.state.endDate} onChange={this.handelChangeDate2} />
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
                            <Table.Cell style={{ fontWeight: 'bold' }}>{sumCounterIn - (sumCounterIn * discount / 100)}</Table.Cell>
                            <Table.Cell style={{ fontWeight: 'bold' }}>{sumCounterOut - (sumCounterOut * discount / 100)}</Table.Cell>
                            <Table.Cell style={{ fontWeight: 'bold' }}>{formatter.format(sumTotal - (sumTotal * discount / 100))}</Table.Cell>
                        </Table.Row>
                    </Table.Body>
                </Table>
            </PDFExport>
        )
    }
    render() {
        console.log('State', this.state)
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