import React from "react";
import * as Yup from 'yup';
import "semantic-ui-css/semantic.min.css";
import { CircularProgress, Modal } from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import Edit from '@material-ui/icons/Edit'
import { Checkbox, Input, Table, Button } from "semantic-ui-react";
import moment from 'moment';
import { toast } from 'react-toastify';
import {Check,Clear,KeyboardArrowLeft, KeyboardArrowRight } from '@material-ui/icons';
import { Formik } from "formik";
import { isEmpty } from "lodash";
import { removeStorage } from "utils/storage.helper";
import { USER_STORAGE } from "constants/storage";
import { MENU } from "constants/menu";

export default class Outlet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      dataDetailOutlet: {},
      isOpenModal: false,
      isOpenDetail: false,
      isConfirmModal: false,
      locationName: null,
      SearchValue: null,
      isCreateOutlet: false,
      createOutlet: {
        isActive: true,
        name: null,
        locationId: null,
        rate: 0,
      }
    };
  }
  componentDidMount = () => {
    const { token } = this.props;
    this.props.listOutlet("", token);
    // this.props.listLocation("", token);
    this.props.listLocationTransaction(token);
  };

  onPagination = (key, pageNumber) => {
    const {SearchValue} = this.state;
    const { token } = this.props;
    this.props.listOutlet({ SearchValue,PageNumber: pageNumber }, token)
  }
  handleClickModal = async (seeDetail, data) => {
    const { token } = this.props;
    const { isOpenModal } = this.state;
    if (seeDetail) {
      await this.props.getOutletDetail(data.id, token)
      this.setState({
        isOpenModal: !isOpenModal,
        dataDetailOutlet:{
          name:data.name,
          rate:data.rate,
          id:data.id,
          locationId:data.locationId,
          isActive:data.isActive
        }, 
        isCreateOutlet: false
      });
    } else {
      this.setState({
        isOpenModal: !isOpenModal,
        isCreateOutlet: true
      })
    }

  };

  handleChangeData = (key, e) => {
    
    const { createOutlet } = this.state;
    this.setState({
      createOutlet: {
        ...createOutlet,
        [key]: e.target.value
      }
    })
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
  handleClick = async (data, key) => {

    const { token } = this.props
    const { isOpenModal } = this.state
    switch (key) {
      case 'update':
        this.setState({ isOpenModal: !isOpenModal })
        await this.props.updateOutlet(data, token)
        this.props.listOutlet(null, token)
        if (this.props.updateOutletReponse) {
          return this.notifySuccess('Outlet successfuly updated!')

        } else {
          
          return this.notifyFailed('Something went wrong!')
        }

      case 'delete':
        this.setState({ isOpenModal: !isOpenModal })
        await this.props.deleteOutlet(data, token)
        this.props.listOutlet(null, token)
        return this.notifySuccess('Outlet successfuly deleted!')
      case 'create':
        this.setState({ isOpenModal: !isOpenModal })
        await this.props.createOutlet(data, token)
        this.props.listOutlet(null, token)
        if (this.props.createOutletReponse) {
          this.notifySuccess('Outlet successfuly created!')

        }
        break;

      default:
        break;
    }
  }
  handleClickDetail = async (data) => {
    const { token } = this.props
    const { isOpenDetail } = this.state;
    await this.props.getOutletDetail(data, token);
    this.setState({ isOpenDetail: !isOpenDetail })
  }
  handleChoose = (data) => {

    const { createOutlet } = this.state;
    this.setState({
      createOutlet: {
        ...createOutlet,
        locationId: data.id
      },
      locationName: data.name
    })
  }
  renderCreateOutlet = () => {
    const { dataLocation } = this.props;
    const Location = [];
    const createOutletSchema = Yup.object().shape({
      name: Yup.string()
        .min(5, 'Too Short minimum 3 character!')
        .max(50, 'Too Long!')
        .required('Required'),

      rate: Yup.number()
        .min(1, `rate must higher than 0!`)
        .max(100000, 'rate too high,rate must lower than 100000!')
        .required('Required'),
      locationId: Yup.string()
        .required('Required')


    })


    dataLocation.data && dataLocation.data.map((data) => {
      return Location.push({ id: data.id, name: data.name })
    })
    return (
      <Formik
        initialValues={{ name: '', rate: 0, locationId: '' }}
        validationSchema={createOutletSchema}
      >
        {(props) => (
          <div class="ui form" style={{ backgroundColor: 'white', padding: "10px" }} >
            
            <div class="field">
              <label>Name Outlet</label>
              <input type="text" name="first-name" placeholder="Name Outlet" value={props.values.name} onChange={(e) => props.setFieldValue('name', e.target.value)} />
              {props.errors.name ?
                (<div className='error-text'>{props.errors.name}</div>) : null
              }
            </div>
            <div class="field">
              <label>Rate</label>
              <input type="text" name="last-name" placeholder="Rate" value={props.values.rate} onChange={(e) => props.setFieldValue('rate', e.target.value)} />
              {props.errors.rate ?
                (<div className='error-text'>{props.errors.rate}</div>) : null
              }
            </div>
            <div class="field">
              <label>Location</label>
              <select class="ui dropdown" onChange={(e) => props.setFieldValue('locationId', e.target.value)}>
                {Location.map((data) => (
                  <option value={data.id} selected={data.id}> {data.name}</option>
                ))}
              </select>
              {props.errors.locationId ?
                (<div className='error-text'>{props.errors.locationId}</div>) : null
              }
            </div>
            {props.values.name && <button disabled={!isEmpty(props.errors)} class="ui button" onClick={() => this.handleClick(props.values, 'create')}>
              Create
            </button>}
          </div>
        )}
      </Formik>
    )
  }

  handleChangeDataDetail = (props, event) => {
    const temp = this.Location.find((x) => x.id === event.target.value)
    return props.setFieldValue('locationId', temp.id)
  }
  changeValueId = (id, props) => {
    const { dataLocation } = this.props;
    const tempOutlet = this.props.dataOutlet.data && this.props.dataOutlet.data.find((data) => data.id === id)
    const x = dataLocation.data && dataLocation.data.find((data) => data.id === tempOutlet?.locationId)
    return x?.id
  }
  renderDetailOutlet = () => {
    const { dataDetailOutlet } = this.state;
    const { dataLocation } = this.props;
    this.Location = [];

    dataLocation?.data && dataLocation.data.map((data) => {
      return this.Location.push({ locationId: data.id, name: data.name })
    })

    return (
      <Formik
        initialValues={dataDetailOutlet}
      >
        {(props) => (
          <div class="ui form" style={{ backgroundColor: 'white', padding: "10px" }} >
            
            <div class="field">
              <label>Name Outlet</label>
              <input type="text" name="first-name" placeholder="Name Outlet" value={props.values.name} onChange={e => props.setFieldValue('name', e.target.value)} />
            </div>
            <div class="field">
              <label>Rate</label>
              <input type="text" name="last-name" placeholder="Rate" value={props.values.rate} onChange={e => props.setFieldValue('rate', e.target.value)} />
            </div>
            <div class="field">
              <label>Location</label>
              
              <select class="ui dropdown" value={props.values.locationId} onChange={(e) => props.setFieldValue('locationId',e.target.value)}>
                {this.Location.map((data) => (
                  <option value={data.locationId} selected={data.locationId}> {data.name}</option>
                ))}
              </select>
            </div>
            <button disabled={props.values.locationId === null} class="ui button" onClick={() => this.handleClick(props.values, 'update')}>
              Update
        </button>
            <Checkbox label='isActive' style={{ marginLeft: '10px' }} checked={props.values.isActive} onClick={e => props.setFieldValue('isActive', !props.values.isActive)} />
          </div>
        )}
      </Formik>
    )
  }
  renderModal = () => {
    const { isCreateOutlet, isOpenModal } = this.state;
    return (
      <Modal
        open={isOpenModal}
        onClose={() => {
          this.setState({ isOpenModal: !isOpenModal });
        }}
        className='modal-pop-up'
      >
        {isCreateOutlet ? this.renderCreateOutlet() : this.renderDetailOutlet()}
      </Modal>
    );
  };

  handleActionDelete = async (data) => {
    const { token } = this.props;
    const { id } = this.state
    this.setState({ isConfirmModal: !this.state.isConfirmModal })
    await this.props.deleteOutlet(id, token)
    this.props.listOutlet(null, token)
    if(this.props.deleteOutletReponse){
      return this.notifySuccess('Outlet successfuly deleted!')
    }else{
      return this.notifyFailed('Outlet unsuccessful deleted!')
    }
  }
  renderModalConfirmation = (data) => {

    const { isConfirmModal, id } = this.state;
    return (
      <Modal
        open={isConfirmModal}
        className='modal-pop-up'
      >
        <div className='modal-container'>
          <div className='modal-header'>Delete Your Outlet</div>
          <div className='modal-content'>
            <p>Are you sure want to delete your Outlet</p>
          </div>
          <div className='modal-action'>
            <button className='button-action' onClick={() => this.setState({ isConfirmModal: !isConfirmModal })}>No</button>
            <button className='button-action' onClick={() => this.handleActionDelete(id)}>Yes</button>
          </div>
        </div>
      </Modal>
    )
  }

  renderPagination = () => {
    const { dataOutlet } = this.props;
    const nextPage = dataOutlet.meta?.hasNextPage;
    const prevPage = dataOutlet.meta?.hasPreviousPage;
    const PageNumber = dataOutlet.meta?.pageNumber;
    const totalPages = dataOutlet.meta?.totalPages;
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

  renderModalDetails = () => {
    const { isOpenDetail } = this.state;
    const { detailOutlet } = this.props;
    return (
      <Modal
        open={isOpenDetail}
        onClose={() => this.setState({ isOpenDetail: !isOpenDetail })}
        style={{ width: "500px", height: "fit-content", margin: "auto" }}
      >
        <div class="ui form" style={{ backgroundColor: 'white', padding: "10px" }} >
          <div class="field">
            <label>Name</label>
            <input type="text" name="first-name" placeholder="Name" value={'createOutlet.name'} onChange={e => this.handleChangeData('name', e)} />
          </div>
          <div class="field">
            <label>Rate</label>
            <input type="text" name="last-name" placeholder="Rate" value={'createOutlet.rate'} onChange={e => this.handleChangeData('rate', e)} />
          </div>
          <div class="field">

          </div>
          <button class="ui button" onClick={() => this.handleClick(detailOutlet.id, 'update')}>
            Update
            </button>
          <button class="ui button" onClick={() => this.handleClick(detailOutlet.id, 'delete')}>
            Delete
            </button>
        </div>

      </Modal>
    )
  }

  renderTable = () => {
    const { dataOutlet } = this.props;

    const header = ['No','Updated', 'Location', 'Outlet', 'Phone Number', 'Rate','Is Active', 'Action']
    if (dataOutlet.data && dataOutlet.data.length < 1) {
      return <p style={{ textAlign: 'center' }}>No Data</p>
    }
    return (
      <>
        <Table basic>
          <Table.Header>
            <Table.Row>
              {header.map((title) => (
                <Table.HeaderCell>{title}</Table.HeaderCell>
              ))}
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {dataOutlet.data && dataOutlet.data.map((data,index) => (
              <Table.Row>
                <Table.Cell>{index + 1}</Table.Cell>
                <Table.Cell >{moment(data.updated).format("DD-MM-YYYY")}</Table.Cell>
                <Table.Cell >{data.location.name}</Table.Cell>
                <Table.Cell >{data.name}</Table.Cell>
                <Table.Cell >{data.devices && data.devices.map((data) => `${data.phoneNumber}\n`)}</Table.Cell>
                <Table.Cell >{data.rate}</Table.Cell>
                <Table.Cell >{data.isActive ? <Check/> : <Clear/>}</Table.Cell>
                <Table.Cell>
                  <Edit style={{ cursor: 'pointer', marginRight: '10px' }} onClick={() => this.handleClickModal(true, data)} />
                  <DeleteIcon style={{ cursor: 'pointer' }} onClick={() => this.handleClickDelete(data.id)} />
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </>
    )
  }
  handleClickDelete = (id) => {
    const { isConfirmModal } = this.state
    this.setState({ isConfirmModal: !isConfirmModal, id })
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
      <div className='filtering-container'>
        <Input placeholder='Search...' onChange={(e) => this.handleFilter(e)} style={{ marginRight: '10px' }} />
        <Button onClick={() => this.props.listOutlet({ SearchValue }, token)}>Search</Button>
      </div>
    )
  }
  handleAuth = () => {
    if(this.props.unAuthorize){
        removeStorage(USER_STORAGE)
        this.props.resetAuthorize()
        this.props.navigateTo(MENU.LOGIN)
    }else{
        return null
    }
}
  render() {
    console.log('ASDF',this.props)
    const { isLoading } = this.props;
    return (
      <div className="container">
        <button class="positive ui button" onClick={() => this.handleClickModal(false)}>Create Outlet</button>
        {isLoading && <CircularProgress size={100} className="circular-progress" />}
        {this.handleAuth()}
        {this.renderFilter()}
        {this.renderTable()}
        {this.renderPagination()}
        {this.renderModal()}
        {this.renderModalConfirmation()}
      </div>
    );
  }
}
