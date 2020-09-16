import { CircularProgress, Modal } from '@material-ui/core';
import React from 'react';
import { Table } from 'semantic-ui-react';
import moment from 'moment';
import { Edit, Delete } from '@material-ui/icons';
import DropdownComponent from "components/DropdownComponent/DropdownComponent";
import { KeyboardArrowLeft, KeyboardArrowRight } from '@material-ui/icons';
import { createDevice } from 'action/device';
export default class Devices extends React.Component {
    constructor(props) {
        super()
        this.state = {
            isOpenModal: false,
            isDetail: false,
            location: null,
            outlet: null,
            dataDetail:{},
            createDevice: {
                isActive: true,
                notes: null,
                phoneNumber: null,
                locationId: null,
                outletId: null
            }
        }
    }
    componentDidMount = () => {
        const { token } = this.props
        console.log('Devices Props', this.props)
        this.props.getDevice(null, token);
        this.props.listOutlet(null, token);
        this.props.listLocation(null, token);
    }
    handleClickModal = async (data, key) => {
        const { token } = this.props
        const { isOpenModal } = this.state;
        console.log('click modal', key)
        if (key === 'create') {
            this.setState({
                isOpenModal: true,
                isDetail: false
            });
        } else {
            console.log('data detail', data)
            await this.props.getDeviceDetail(data.id, token);
            this.setState({
                dataDetail: this.props.detailDevice.data,
                isOpenModal: true,
                isDetail: true
            });
        }
    }

    renderDetail = () => {
        const { dataDetail } = this.state;
        console.log('detailLocation', dataDetail)
        return (
            <>
                <div class="ui form" style={{ backgroundColor: 'white', padding: "10px" }} >
                    <div class="field">
                        <label>Phone Number</label>
                        <input type="text" name="first-name" placeholder="Name" value={dataDetail.name} onChange={(e) => this.setState({ dataDetail: { ...dataDetail, name: e.target.value } })} />
                    </div>
                    <button class="ui button" onClick={() => this.handleClickUpdate(true, dataDetail)}>
                        Update
            </button>

                    <button class="ui button" onClick={() => this.handleClickUpdate(false, dataDetail.id)}>
                        Delete
            </button>
                </div>

            </>
        )
    }
    handleSample = (key,event) => {
        const {createDevice} = this.state;
        console.log('changeValue',event.target.value)
        const x  = this.props.dataOutlet.data.filter((data) => data.id === event.target.value)
        console.log('X',)
        this.setState({
            createDevice:{
                ...createDevice,
                [key]:event.target.value,
                locationId:x[0].locationId
            }
        })
    }
    handleClickCreate = async (data) => {
        const {token} = this.props;
        const {isOpenModal} = this.state;
        await this.props.createDevice(data,token)
        this.setState({isOpenModal:!isOpenModal})
    }
    renderCreate = () => {
        const { createDevice } = this.state;
        const {dataLocation,dataOutlet} = this.props;
        let  listLocation = []
        let listOutlet = []
        dataOutlet.data && dataOutlet.data.map((data) => {
            listOutlet.push({
                outletId:data.id,
                name:data.name,
                locationId:data.locationId})
        })
        // dataLocation.data && dataLocation.data.map((data) => {
        //     listOutlet.push({id:data.id,name:data.name})
        // })
        console.log('Render Create',createDevice)
        return (
            <div class="ui form" style={{ backgroundColor: 'white', padding: "10px" }} >
                <div class="field">
                    <label>Phone Number</label>
                    <input type="tel" id="phone" maxLength='12' name="first-name" placeholder="Phone Number" value={createDevice.phoneNumber}
                        onChange={(e) => this.setState({
                            createDevice: {
                                ...createDevice,
                                phoneNumber: e.target.value
                            }
                        })} />
                </div>
                {/* <div class="field">
                    <label>Location</label>
                    <select class="ui dropdown" onChange={(e) => this.handleSample('locationId',e)}>
                        {listLocation.map((data) => (
                            <option value={data.id}>{data.name}</option>
                        ))}
                    </select>
                </div> */}
                <div class="field">
                    <label>Outlet</label>
                    <select class="ui dropdown" onChange={(e) => this.handleSample('outletId',e)}>
                        {listOutlet.map((data) => (
                            <option value={data.outletId}>{data.name}</option>
                        ))}
                    </select>
                </div>
                <div class="field">
                    <label>Notes</label>
                    <input type="text" name="first-name" placeholder="Notes" value={createDevice.notes}
                        onChange={(e) => this.setState({
                            createDevice: {
                                ...createDevice,
                                notes: e.target.value
                            }
                        })} />
                </div>
                <button class="ui button" onClick={() => this.handleClickCreate(createDevice)}>
                    Create
          </button>
            </div>
        )
    }
    renderModal = () => {
        const { isDetail, isOpenModal, name } = this.state;
        console.log('Modal Open')
        return (
            <Modal
                open={isOpenModal}
                onClose={() => {
                    this.setState({ isOpenModal: !isOpenModal });
                }}
                style={{ width: "500px", height: "fit-content", margin: "auto" }}
            >
                { isDetail ? this.renderDetail() : this.renderCreate()}

            </Modal>
        );
    };

    renderTable = () => {
        const tableHeader = ['No', 'Phone Number', 'Outlet Name', 'Rate', 'Location', 'Detail'];
        const { dataListDevice } = this.props
        console.log('dataListDevice', dataListDevice)
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
                            <Table.Cell>{index + 1}</Table.Cell>
                            <Table.Cell>{data.phoneNumber}</Table.Cell>
                            <Table.Cell>{data.outlet.name}</Table.Cell>
                            <Table.Cell>{data.outlet.rate}</Table.Cell>
                            <Table.Cell>{data.location.name}</Table.Cell>
                            <Table.Cell onClick={() => this.handleClickModal(data)}>
                                <Edit style={{ cursor: 'pointer' }} />
                                <Delete style={{ marginLeft: '20px', cursor: 'pointer' }} />
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        )
    }
    onPagination = (key,PageNumber) => {
        const {token} = this.props;
        this.props.getDevice({PageNumber},token)
    }
    renderPagination = () => {
        const { dataListDevice } = this.props;
        const nextPage = dataListDevice.meta?.hasNextPage;
        const prevPage = dataListDevice.meta?.hasPreviousPage;
        const PageNumber = dataListDevice.meta?.pageNumber;
        const totalPages = dataListDevice.meta?.totalPages;
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
    render() {
        if (this.props.isLoading) {
            return <CircularProgress className='circular-progress' size={100} />
        }
        return (
            <div className='container'>
                <button class="positive ui button" onClick={() => this.handleClickModal(null, 'create')}>Create Devices</button>
                {this.renderTable()}
                {this.renderModal()}
                {this.renderPagination()}
            </div>
        )
    }
}