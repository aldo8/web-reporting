import React from "react";
import "semantic-ui-css/semantic.min.css";
import { CircularProgress, Modal } from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import Edit from '@material-ui/icons/Edit'
import { Checkbox,Input, Table,Button } from "semantic-ui-react";
import moment from 'moment';
import DropdownComponent from "components/DropdownComponent/DropdownComponent";
import { KeyboardArrowLeft, KeyboardArrowRight } from '@material-ui/icons';

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
      SearchValue:null,
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
    this.props.listLocation("", token);
  };

  onPagination = (key,pageNumber) => {
    const {token} = this.props;
    this.props.listOutlet({ PageNumber: pageNumber }, token)
  }
  handleClickModal = async (seeDetail, data) => {
    const { token } = this.props;
    const {  isOpenModal } = this.state;
    if (seeDetail) {
      await this.props.getOutletDetail(data.id, token)
      this.setState({
        isOpenModal: !isOpenModal,
        dataDetailOutlet: this.props.detailOutlet.data,
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
  handleClick = async (data, key) => {
    const { token } = this.props
    const { isOpenModal } = this.state
    switch (key) {
      case 'update':
        await this.props.updateOutlet(data, token)
        this.props.listOutlet(null, token)
        this.setState({ isOpenModal: !isOpenModal })
        break;
      case 'delete':
        await this.props.deleteOutlet(data, token)
        this.props.listOutlet(null, token)
        this.setState({ isOpenModal: !isOpenModal })
        break;
      case 'create':
        await this.props.createOutlet(data, token)
        this.setState({
          isOpenModal: !this.state.isOpenModal
        })
        this.props.listOutlet(null, token)
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
    const { locationName, createOutlet } = this.state;
    const { dataLocation } = this.props;
    const Location = [];

    dataLocation.data && dataLocation.data.map((data) => {
      return Location.push({ id: data.id, name: data.name })
    })
    return (
      <div class="ui form" style={{ backgroundColor: 'white', padding: "10px" }} >
        <div class="field">
          <label>Name</label>
          <input type="text" name="first-name" placeholder="Name Outlet" value={createOutlet.name} onChange={e => this.handleChangeData('name', e)} />
        </div>
        <div class="field">
          <label>Rate</label>
          <input type="text" name="last-name" placeholder="Rate" value={createOutlet.rate} onChange={e => this.handleChangeData('rate', e)} />
        </div>
        <div class="field">
          <label>Location</label>
          
          <DropdownComponent data={Location} selected={locationName} onSelectAction={(data) => this.handleChoose(data)} />
        </div>
        <button disabled={createOutlet.locationId === null} class="ui button" onClick={() => this.handleClick(createOutlet, 'create')}>
          Create
            </button>
      </div>
    )
  }

  handleChangeDataDetail = (key, data) => {
    const { dataDetailOutlet } = this.state;
    if (key === 'location') {
      this.setState({
        dataDetailOutlet: {
          ...dataDetailOutlet,
          locationId: data.id
        },
        locationName: data.name
      })
    } else {
      this.setState({
        dataDetailOutlet: {
          ...dataDetailOutlet,
          [key]: data.target.value
        }
      })
    }
  }
  changeValueId = (id) => {
    const { dataLocation } = this.props;
    console.log('Id',id)
    
    
    const tempOutlet = this.props.dataOutlet.data && this.props.dataOutlet.data.find((data) => data.id === id)
    const x = dataLocation.data && dataLocation.data.find((data) => data.id === tempOutlet?.locationId)
    // console.log('dataLocation',x)
    // const tempLocation = dataLocation.data && dataLocation.data.find((data) => data.locationId === tempOutlet.id)
    console.log('Result',x)
    return x?.name
    // return console.log('tempLocation',tempLocation)
  }
  renderDetailOutlet = () => {
    const { dataDetailOutlet, locationName } = this.state;
    const { dataLocation } = this.props;
    const Location = [];
    dataLocation.data && dataLocation.data.map((data) => {
      return Location.push({ id: data.id, name: data.name })
    })
    console.log('XYZ',dataDetailOutlet)
    return (
      <div class="ui form" style={{ backgroundColor: 'white', padding: "10px" }} >
        <div class="field">
          <label>Name</label>
          <input type="text" name="first-name" placeholder="Name Outlet" value={dataDetailOutlet.name} onChange={e => this.handleChangeDataDetail('name', e)} />
        </div>
        <div class="field">
          <label>Rate</label>
          <input type="text" name="last-name" placeholder="Rate" value={dataDetailOutlet.rate} onChange={e => this.handleChangeDataDetail('rate', e)} />
        </div>
        <div class="field">
          <label>Location</label>
          <select class="ui dropdown" value={this.changeValueId(dataDetailOutlet.id)} onChange={(e) => this.setState({ dataDetailOutlet: { ...dataDetailOutlet, locationId: e.target.value } })}>
              {Location.map((data) => (
                  <option value={Location.id} selected={data.id}> {data.name}</option>
              ))}
          </select>
        </div>
        <button disabled={dataDetailOutlet.locationId === null} class="ui button" onClick={() => this.handleClick(dataDetailOutlet, 'update')}>
          Update
        </button>
        <Checkbox label='isActive' style={{marginLeft:'10px'}} checked={dataDetailOutlet.isActive} onClick={e => this.setState({dataDetailOutlet:{...dataDetailOutlet,isActive:!dataDetailOutlet.isActive}})}/>
      </div>
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
        style={{ width: "500px", height: "fit-content", margin: "auto" }}
      >
        {isCreateOutlet ? this.renderCreateOutlet() : this.renderDetailOutlet()}
      </Modal>
    );
  };

  handleActionDelete = async (data) => {
    const { token } = this.props;
    const {id} = this.state
    await this.props.deleteOutlet(id, token)
    this.setState({ isConfirmModal: !this.state.isConfirmModal })
    this.props.listOutlet(null, token)
  }
  renderModalConfirmation = (data) => {
    
    const { isConfirmModal, id } = this.state;
    return (
      <Modal
        open={isConfirmModal}
        style={{ width: "400px", height: "fit-content", margin: "auto" }}
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
    
    const header = ['Created', 'Location', 'Outlet', 'Phone Number', 'Rate', 'Action']
    if(dataOutlet.data && dataOutlet.data.length < 1) {
      return <p style={{textAlign:'center'}}>No Data</p>
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
            {dataOutlet.data && dataOutlet.data.map((data) => (
              <Table.Row>
                <Table.Cell >{moment(data.created).format("DD-MM-YYYY")}</Table.Cell>
                <Table.Cell >{data.location.name}</Table.Cell>
                <Table.Cell >{data.name}</Table.Cell>
                <Table.Cell >{data.devices && data.devices.map((data) => data.phoneNumber)}</Table.Cell>
                <Table.Cell >{data.rate}</Table.Cell>
                <Table.Cell>
                  <Edit style={{ cursor: 'pointer',marginRight:'10px' }} onClick={() => this.handleClickModal(true, data)} />
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
    const { isConfirmModal} = this.state
    this.setState({isConfirmModal:!isConfirmModal,id})
  }
  handleFilter = (event) => {
    this.setState({
      SearchValue:event.target.value
    })
  }
renderFilter = () => {
    const {token} = this.props
    const {SearchValue} = this.state
    return (
      <div style={{display:"flex",justifyContent:"flex-end"}}>
          <Input placeholder='Search...'  onChange={(e) => this.handleFilter(e)} style={{marginRight:'10px'}}/>
          <Button onClick={() => this.props.listOutlet({SearchValue},token)}>Search</Button>
      </div>
    )
  }
  render() {
    
    const {  isLoading } = this.props;
    if (isLoading) {
      return <CircularProgress size={100} className="circular-progress" />
    }
    return (
      <div className="container">
        <button class="positive ui button" onClick={() => this.handleClickModal(false)}>Create Outlet</button>
        {this.renderFilter()}
        {this.renderTable()}
        {this.renderPagination()}
        {this.renderModal()}
        {this.renderModalConfirmation()}
      </div>
    );
  }
}
