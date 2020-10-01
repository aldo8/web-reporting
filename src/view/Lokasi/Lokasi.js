import { CircularProgress, Modal } from '@material-ui/core';
import React from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import "semantic-ui-css/semantic.min.css";
import { Checkbox, Button, Input, Table } from 'semantic-ui-react';
import { KeyboardArrowLeft, KeyboardArrowRight, Edit } from '@material-ui/icons';
import { toast } from 'react-toastify';
import moment from 'moment'
import {Check,Clear} from '@material-ui/icons/';
import { removeStorage } from 'utils/storage.helper';
import { USER_STORAGE } from 'constants/storage';
import { MENU } from 'constants/menu';

export default class Lokasi extends React.Component {
  constructor(props) {
    super()
    this.state = {
      isDetail: false,
      isOpenModal: false,
      isConfirmModal: null,
      id: null,
      locationId: null,
      locationName: 'Pilih Lokasi',
      dataDetail: {},
      SearchValue: null
    }
  }
  componentDidMount = () => {
    const { token } = this.props;
    this.props.listLocation('', token);
  }

  handleClickModal = async (data, key) => {
    const { token } = this.props
    const { isOpenModal } = this.state;
    if (key === 'create') {
      this.setState({
        isOpenModal: !isOpenModal,
        isDetail: false
      });
    } else {

      await this.props.getLocationDetail(data.id, token);
      this.setState({
        dataDetail: this.props.detailLocation?.data,
        isOpenModal: true,
        isDetail: true
      });
    }

  };
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

  notifyError = (message) => {
    toast.error(`${message}!`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
}

  handleClickCreate = async (name) => {
    const { token } = this.props
    const { isOpenModal } = this.state;
    this.setState({ isOpenModal: !isOpenModal });
    await this.props.createLocation({ name }, token)
    this.props.listLocation(null, token)
    if(this.props.createLocationResponse){
      return this.notifySuccess('Location successfuly created!') 
    }else{
      return this.notifyError('Location unsuccessful created!')
    }
  }

  handleFilter = (event) => {
    this.setState({
      SearchValue: event.target.value
    })
  }
  handleClickSearch = () => {
    const { token } = this.props;
    const { locationName } = this.state;
    if (locationName === 'Pilih Lokasi') {
      return this.props.listLocation(null, token);
    }
    return this.props.listLocation({ Filters: `name==${locationName}` }, token)
  }
  renderFilter = () => {
    const { token } = this.props
    const { SearchValue } = this.state
    return (
      <div className='filtering-container'>
        <Input placeholder='Search...' onChange={(e) => this.handleFilter(e)} style={{ marginRight: '10px' }} />
        <Button onClick={() => this.props.listLocation({ SearchValue }, token)}>Search</Button>
      </div>
    )
  }

  onPagination = (key, pageNumber) => {
    const {SearchValue} = this.state;
    const { token } = this.props;
    this.props.listLocation({SearchValue,PageNumber: pageNumber }, token)
  }
  renderCreate = () => {
    const { name } = this.state;
    return (
      <div class="ui form" style={{ backgroundColor: 'white', padding: "10px" }} >
        <div class="field">
          <label>Name</label>
          <input type="text" name="first-name" placeholder="Name" value={this.state.name} onChange={(e) => this.setState({ name: e.target.value })} />
        </div>
        <button class="ui button" onClick={() => this.handleClickCreate(name)}>
          Create
          </button>
      </div>
    )
  }
  handleClickUpdate = async (data) => {
    const { token } = this.props
    const { isOpenModal } = this.state
    this.setState({ isOpenModal: !isOpenModal })
    await this.props.updateLocation(data, token)
    this.props.listLocation(null, token)
    if(this.props.updateLocatoinResponse) {
      return this.notifySuccess('Location successfuly updated!') 
    }else {
      return this.notifyError('Location unsuccessful updated!')
    }
  }

  renderDetail = () => {
    const { dataDetail } = this.state;

    return (
      <>
        <div class="ui form" style={{ backgroundColor: 'white', padding: "10px" }} >
          <div class="field">
            <label>Name</label>
            <input type="text" name="first-name" placeholder="Name" value={dataDetail?.name} onChange={(e) => this.setState({ dataDetail: { ...dataDetail, name: e.target.value } })} />
            {dataDetail.name.lengh < 3}
          </div>
          <button class="ui button" disabled={dataDetail.name.length < 4} onClick={() => this.handleClickUpdate(dataDetail)}>
            Update
        </button>
          <Checkbox label='isActive' style={{ marginLeft: '10px' }} checked={dataDetail.isActive} onClick={e => this.setState({ dataDetail: { ...dataDetail, isActive: !dataDetail.isActive } })} />
        </div>

      </>
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
        className='modal-pop-up'
      >
        { isDetail ? this.renderDetail() : this.renderCreate()}

      </Modal>
    );
  };

  handleActions = async (data) => {
    
    this.setState({
      isConfirmModal: !this.state.isConfirmModal,
      id: data
    })
  }
  renderTable = () => {
    const { dataLocation } = this.props;

    if (dataLocation.data && dataLocation.data.length < 1) {
      return <p style={{ textAlign: 'center' }}>No Data</p>
    }
    return (
      <>
        <Table basic>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>No</Table.HeaderCell>
              <Table.HeaderCell>Updated</Table.HeaderCell>
              <Table.HeaderCell>Nama Lokasi</Table.HeaderCell>
              <Table.HeaderCell>Is Active</Table.HeaderCell>
              <Table.HeaderCell>Action</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {dataLocation.data && dataLocation.data.map((data,index) => (
              <Table.Row>
                <Table.Cell>{index + 1}</Table.Cell>
                <Table.Cell >{moment(data.updated).format("DD-MM-YYYY")}</Table.Cell>
                <Table.Cell>{data.name}</Table.Cell>
                <Table.Cell>{data.isActive ? <Check/> : <Clear/>}</Table.Cell>
                <Table.Cell>
                  <Edit style={{ cursor: 'pointer', marginRight: '15px' }} onClick={() => this.handleClickModal(data)} />
                  <DeleteIcon style={{ cursor: 'pointer' }} onClick={() => this.handleActions(data.id)} />
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </>
    )
  }
  handleActionDelete = async (data) => {
    const { token } = this.props;
    this.setState({ isConfirmModal: !this.state.isConfirmModal })
    await this.props.deleteLocation(data, token);
    this.props.listLocation(null, token);
    if(this.props.deleteLocationResponse){
      return this.notifySuccess('Location successfuly deleted!') 
    }else{
      return this.notifyError('Location unsuccessful deleted!')
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
          <div className='modal-header'>Delete Your Location</div>
          <div className='modal-content'>
            <p>Are you sure want to delete your Location</p>
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
    const { dataLocation } = this.props;
    const nextPage = dataLocation.meta?.hasNextPage;
    const prevPage = dataLocation.meta?.hasPreviousPage;
    const PageNumber = dataLocation.meta?.pageNumber;
    const totalPages = dataLocation.meta?.totalPages;
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
  handleAuth = () => {
    if(this.props.unAuthorize){
        removeStorage(USER_STORAGE)
        this.props.resetAuth()
        this.props.navigateTo(MENU.LOGIN)
    }else{
        return null
    }
}
  render() {

    const { isLoading } = this.props;
    return (
      <div className='container'>
        <button class="positive ui button" onClick={() => this.handleClickModal(null, 'create')}>Create Lokasi</button>
        {isLoading && <CircularProgress className='circular-progress' size={100} />}
        {this.handleAuth()}
        {this.renderFilter()}
        {this.renderTable()}
        {this.renderPagination()}
        {this.renderModal()}
        {this.renderModalConfirmation()}
      </div>
    )
  }
}