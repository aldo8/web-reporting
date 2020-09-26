import { CircularProgress, Modal } from '@material-ui/core';
import React from 'react';
import { Table, Input, Button, Checkbox } from 'semantic-ui-react';
import { Edit, Delete } from '@material-ui/icons';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@material-ui/icons';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { isEmpty } from 'lodash';
import { toast } from 'react-toastify';

export default class Devices extends React.Component {
    constructor(props) {
        super()
        this.state = {
            isOpenModal: false,
            isConfirmModal: false,
            isDetail: false,
            location: null,
            outlet: null,
            SearchValue: null,
            id: null,
            dataDetail: {},
            createDevice: {
                isActive: true,
                notes: '',
                phoneNumber: '',
                locationId: '',
                outletId: ''
            }
        }
    }
    componentDidMount = () => {
        const { token } = this.props
        this.props.getDevice(null, token);
        this.props.listOutlet(null, token);
        this.props.listLocation(null, token);
    }

    notifySuccess = (message) => {
        toast.success(`${message}`, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
      notifyFailed = (message) => {
        toast.error(`${message}`, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }

    handleClickModal = async (data, key) => {
        const { token } = this.props
        if (key === 'create') {
            this.setState({
                isOpenModal: true,
                isDetail: false
            });
        } else {
            await this.props.getDeviceDetail(data.id, token);
            this.setState({
                dataDetail: data,
                isOpenModal: true,
                isDetail: true
            });
        }
    }
    handleClickUpdate = async (data) => {
        const { token } = this.props
        await this.props.updateDevice(data, token)
        this.setState({ isOpenModal: !this.state.isOpenModal })
        this.props.getDevice(null, token)

    }

    changeValueId = (id) => {
        const { dataLocation, dataListDevice } = this.props;
        console.log('Id', id)


        const tempOutlet = this.props.dataListDevice.data && this.props.dataListDevice.data.find((data) => data.outlet.id === id)
        return tempOutlet?.outlet?.name
    }
    renderDetail = () => {
        const { dataDetail } = this.state;
        console.log('KL', dataDetail)
        let listLocation = []
        this.props.dataLocation.data && this.props.dataLocation.data.map((data) => {
            return listLocation.push({ locationId: data.id, name: data.name })
        })
        this.listOutlet = [];
        this.props.dataOutlet.data && this.props.dataOutlet.data.map((data) => {
            return this.listOutlet.push({
                outletId: data.id,
                name: data.name,
                locationId: data.locationId
            })
        })
        const schemaDetailValidation =
            Yup.object().shape({
                phoneNumber: Yup.string()
                    .min(12, 'Please fill phone number correctly!')
                    .max(12, 'Please fill phone number correctly, 12 digit!')
                    .required('Required'),

                outletId: Yup.string()
                    .required('Required'),

                notes: Yup.string()
                    .min(5, 'Too Short! minimum 5 character')
                    .max(50, 'Too Long!')
                    .required('Required'),
            })

        return (
            <Formik
                initialValues={dataDetail}
                validationSchema={schemaDetailValidation}
            >
                {(props) => (
                    <div class="ui form" style={{ backgroundColor: 'white', padding: "10px" }} >
                        {(console.log('Detail Devicess', props.values))}
                        {/* <div class="field">
                            <label>Location</label>
                            <select class="ui dropdown" value={props.values.locationId} onChange={(e) => props.setFieldValue('locationId', e.target.value)}>
                                {listLocation.map((data) => (
                                    <option value={data.locationId} selected={data.locationId}>{data.name}</option>
                                ))}
                            </select>
                            {props.errors.locationId ?
                                (<div className='error-text'>{props.errors.outletId}</div>) : null
                            }
                        </div> */}
                        <div class="field">
                            <label>Outlet</label>
                            <select class="ui dropdown" value={props.values.outletId} onChange={(e) => props.setFieldValue('outletId', e.target.value)}>
                                {this.listOutlet.map((data) => (
                                    <option value={data.outletId} selected={data.outletId}>{data.name}</option>
                                ))}
                            </select>
                            {props.errors.outletId ?
                                (<div className='error-text'>{props.errors.outletId}</div>) : null
                            }
                        </div>
                        <div class="field">
                            <label>Notes</label>
                            <input type="text" placeholder="Notes" value={props.values.notes} onChange={(e) => props.setFieldValue('notes', e.target.value)} />
                            {props.errors.notes ?
                                (<div className='error-text'>{props.errors.notes}</div>) : null
                            }
                        </div>
                        <div class="field">
                            <label>Phone Number</label>
                            <input type="number" maxLength='12' placeholder="Name" value={props.values.phoneNumber} onChange={(e) => props.setFieldValue('phoneNumber', e.target.value)} />
                            {props.errors.phoneNumber ?
                                (<div className='error-text'>{props.errors.phoneNumber}</div>) : null
                            }
                        </div>
                        <button disabled={!isEmpty(props.errors)} class="ui button" onClick={() => this.handleClickUpdate(props.values)}>
                            Update
                        </button>
                        <Checkbox label='isActive' style={{ marginLeft: '10px' }} checked={props.values.isActive} onClick={e => props.setFieldValue('isActive', !props.values.isActive)} />
                    </div>
                )}
            </Formik>
        )
    }

    handleClickCreate = async (data) => {
        const { token } = this.props;
        const { isOpenModal } = this.state;
        this.setState({ isOpenModal: !isOpenModal })
        await this.props.createDevice(data, token)
        this.props.getDevice(null,token)
        if(this.props.createResponse){
            return this.notifySuccess('Devices successfuly created!')
        }else{
            return this.notifyFailed('Devices unsuccessful created!')
        }
        
    }
    renderCreate = () => {
        const { createDevice } = this.state;
        const { dataOutlet,dataLocation } = this.props;
        let listLocation = []
        let listOutlet = []
        dataOutlet.data && dataOutlet.data.map((data) => {
            return listOutlet.push({
                outletId: data.id,
                name: data.name,
                locationId: data.locationId
            })
        })

        dataLocation.data && dataLocation.data.filter((el) => el.isActive === true).map((data) => {
            return listLocation.push({
                name: data.name,
                locationId: data.id
            })
        })

        const createSchemaValidation =
            Yup.object().shape({
                phoneNumber: Yup.string()
                    .min(12, 'Please fill phone number correctly, 12 digit!')
                    .max(12, 'Please fill phone number correctly, 12 digit!')
                    .required('Required'),

                outletId: Yup.string()
                    .required('Required'),
                locationId: Yup.string()
                    .required('Required'),
                notes: Yup.string()
                    .min(5, 'Too Short! minimum 5 character')
                    .max(50, 'Too Long!')
                    .required('Required'),
            })

        return (
            <Formik
                validationSchema={createSchemaValidation}
                initialValues={createDevice}
            >
                {(props) => (


                    <div class="ui form" style={{ backgroundColor: 'white', padding: "10px" }} >
                        <div class="field">
                            <label>Phone Number</label>
                            <input type="tel" id="phone" maxLength='12' placeholder="Phone Number" value={props.values.phoneNumber}
                                onChange={(e) => props.setFieldValue('phoneNumber', e.target.value)} />
                            {props.errors.phoneNumber ?
                                (<div className='error-text'>{props.errors.phoneNumber}</div>) : null}
                        </div>

                        {console.log('list Lokasi', listLocation)}
                        {console.log('list outlet', listOutlet)}
                        {console.log('XYZ', props)}
                        <div class="field">
                            <label>Location</label>
                            <select class="ui dropdown" onChange={(e) => props.setFieldValue('locationId',e.target.value)}>
                                {listLocation.map((data) => (
                                    <option value={data.locationId}>{data.name}</option>
                                ))}
                            </select>
                            {props.errors.locationId ?
                                (<div className='error-text'>{props.errors.locationId}</div>) : null
                            }
                        </div>

                        <div class="field">
                            <label>Outlet</label>
                            <select disabled={isEmpty(props.values.locationId)} class="ui dropdown" onChange={(e) => props.setFieldValue('outletId', e.target.value)}>
                                {props.values.locationId && listOutlet.filter((temp) => temp.locationId === props.values.locationId).map((data) => (
                                    <option value={data.outletId}>{data.name}</option>
                                ))}
                            </select>
                            {props.errors.outletId ?
                                (<div className='error-text'>{props.errors.outletId}</div>) : null
                            }
                        </div>

                        <div class="field">
                            <label>Notes</label>
                            <input type="text" placeholder="Notes" value={props.values.notes}
                                onChange={(e) => props.setFieldValue('notes', e.target.value)} />
                            {props.errors.notes ?
                                (<div className='error-text'>{props.errors.notes}</div>) : null
                            }
                        </div>
                        {props.values.phoneNumber && <button disabled={!isEmpty(props.errors)} class="ui button" onClick={() => this.handleClickCreate(props.values)}>
                            Create
                    </button>}
                    </div>
                )}
            </Formik>
        )
    }
    renderModal = () => {
        const { isDetail, isOpenModal } = this.state;

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
        const tableHeader = ['No', 'Phone Number', 'Outlet Name', 'Rate', 'Location', 'Notes', 'Action'];
        const { dataListDevice } = this.props

        if (dataListDevice.data && dataListDevice.data.length < 1) {
            return <p style={{ textAlign: 'center' }}>No Data</p>
        }
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
                            <Table.Cell>{data.notes ? data.notes : '-'}</Table.Cell>
                            <Table.Cell >
                                <Edit style={{ cursor: 'pointer' }} onClick={() => this.handleClickModal(data)} />
                                <Delete style={{ marginLeft: '20px', cursor: 'pointer' }} onClick={() => this.handleClickDelete(data.id)} />
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        )
    }
    handleClickDelete = (id) => {
        const { isConfirmModal } = this.state
        this.setState({ isConfirmModal: !isConfirmModal, id })
    }
    onPagination = (key, PageNumber) => {
        const { token } = this.props;
        this.props.getDevice({ PageNumber }, token)
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
    handleFilter = (event) => {
        this.setState({
            SearchValue: event.target.value
        })
    }
    renderFilter = () => {
        const { token } = this.props
        const { SearchValue } = this.state
        return (
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <Input placeholder='Search...' onChange={(e) => this.handleFilter(e)} style={{ marginRight: '10px' }} />
                <Button onClick={() => this.props.getDevice({ SearchValue }, token)}>Search</Button>
            </div>
        )
    }

    handleActionDelete = async (data) => {
        const { token } = this.props
        const { isConfirmModal } = this.state;
        await this.props.deleteDevice(data, token);
        this.setState({ isConfirmModal: !isConfirmModal })
        this.props.getDevice(null, token)
    }
    renderModalConfirmation = (data) => {

        const { isConfirmModal, id } = this.state;
        return (
            <Modal
                open={isConfirmModal}
                style={{ width: "400px", height: "fit-content", margin: "auto" }}
            >
                <div className='modal-container'>
                    <div className='modal-header'>Delete Your Devices</div>
                    <div className='modal-content'>
                        <p>Are you sure want to delete your Devices</p>
                    </div>
                    <div className='modal-action'>
                        <button className='button-action' onClick={() => this.setState({ isConfirmModal: !isConfirmModal })}>No</button>
                        <button className='button-action' onClick={() => this.handleActionDelete(id)}>Yes</button>
                    </div>
                </div>
            </Modal>
        )
    }
    render() {

        if (this.props.isLoading) {
            return <CircularProgress className='circular-progress' size={100} />
        }
        return (
            <div className='container'>
                <button class="positive ui button" onClick={() => this.handleClickModal(null, 'create')}>Create Devices</button>
                {this.renderFilter()}
                {this.renderTable()}
                {this.renderModal()}
                {this.renderPagination()}
                {this.renderModalConfirmation()}
            </div>
        )
    }
}