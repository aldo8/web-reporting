import { CircularProgress, Modal } from '@material-ui/core';
import React from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import "semantic-ui-css/semantic.min.css";
import { Button, Table } from 'semantic-ui-react';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@material-ui/icons';
import DropdownComponent from 'components/DropdownComponent/DropdownComponent';

export default class Lokasi extends React.Component {
  constructor(props) {
    super()
    this.state = {
      isDetail: false,
      isOpenModal: false,
      locationId: null,
      locationName: 'Pilih Lokasi',
      dataDetail:{}
    }
  }
  componentDidMount = () => {
    const { token } = this.props;
    this.props.listLocation('', token);
  }
  componentDidUpdate = (prevProps, prevState) => {

  }
  handleClickModal = async (data,key) => {
    const {token} = this.props
    const { isOpenModal } = this.state;
    if (key === 'create') {
      this.setState({
        isOpenModal: !isOpenModal,
        isDetail: false
      });
    } else {
      console.log('data detail',data)
      await this.props.getLocationDetail(data.id,token);
      this.setState({
        dataDetail:this.props.detailLocation.data,
        isOpenModal: true,
        isDetail: true
      });
    }

  };
  handleClickCreate = async (name) => {
    const { token } = this.props
    const { isOpenModal } = this.state;
    this.props.createLocation({ name }, token)
    this.setState({ isOpenModal: !isOpenModal });
    await this.props.listLocation(null, token)
  }
  handleFilter = (key, data) => {
    console.log(data)
    this.setState({
      locationId: data.id,
      locationName: data.name
    })
  }
  handleClickSearch = () => {
    const { token } = this.props;
    const { locationName, locationId } = this.state;
    if (locationName === 'Pilih Lokasi') {
      return this.props.listLocation(null, token);
    }
    return this.props.listLocation({ Filters: `name==${locationName}` }, token)
  }
  renderFilter = () => {
    const { dataLocation } = this.props;
    const { locationName } = this.state;
    let Location = [{ id: 1, name: 'Pilih Lokasi' }];
    let Outlet = [];
    dataLocation.data && dataLocation.data.map((data) => {
      return Location.push({ id: data.id, name: data.name })
    })
    return (
      <>
        <div className='filters-container'>
          <div className='dropdowns-container' style={{ padding: 0 }}>
            <DropdownComponent data={Location} selected={locationName} onSelectAction={(data) => this.handleFilter('locationId', data)} />
          </div>

          <div className='dropdowns-container'>
            <div style={{ marginTop: '30px' }}>
              <Button onClick={() => this.handleClickSearch()}>Cari</Button>
            </div>
          </div>
        </div>
      </>
    )
  }

  onPagination = (key, pageNumber) => {
    const { token } = this.props;
    this.props.listLocation({ PageNumber: pageNumber }, token)
  }
  renderCreate = () => {
    const {name} = this.state;
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
  handleClickUpdate = async (isUpdate,data) => {
    const {token} = this.props
    const {isOpenModal} = this.state
    if(isUpdate){
      await this.props.updateLocation(data,token)
      this.setState({isOpenModal:!isOpenModal})
      this.props.listLocation(null,token)
    } else {
      await this.props.deleteLocation(data.id,token)
      this.setState({isOpenModal:!isOpenModal})
      this.props.listLocation(null,token)
    }
    
    
  }
  renderDetail = () => {
    const {dataDetail} = this.state;
    console.log('detailLocation',dataDetail)
    return (
      <>
        <div class="ui form" style={{ backgroundColor: 'white', padding: "10px" }} >
          <div class="field">
            <label>Name</label>
            <input type="text" name="first-name" placeholder="Name" value={dataDetail.name} onChange={(e) => this.setState({ dataDetail:{...dataDetail,name:e.target.value }})} />
          </div>
          <button class="ui button" onClick={() => this.handleClickUpdate(true,dataDetail)}>
          Update
        </button>

        <button class="ui button" onClick={() => this.handleClickUpdate(false,dataDetail.id)}>
          Delete
        </button>
        </div>
        
      </>
    )
  }
  renderModal = () => {
    const { isDetail, isOpenModal, name } = this.state;
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
    const { dataLocation, token } = this.props;
    const { isDetail } = this.state;
    return (
      <>
        <Table basic>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Nama Lokasi</Table.HeaderCell>
              <Table.HeaderCell>Action</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {dataLocation.data && dataLocation.data.map((data) => (
              <Table.Row>
                <Table.Cell onClick={() => this.handleClickModal(data)}>{data.name}</Table.Cell>
                <Table.Cell><DeleteIcon onClick={() => this.props.deleteLocation(data.id, token)} /></Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </>
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
  render() {
    console.log('LOCATION',this.props)
    const { isLoading } = this.props;
    if (isLoading) {
      return <CircularProgress className='circular-progress' size={100} />
    }
    return (
      <div className='container'>
        <button class="positive ui button" onClick={() => this.handleClickModal(null,'create')}>Create Lokasi</button>
        {this.renderFilter()}
        {this.renderTable()}
        {this.renderPagination()}
        {this.renderModal()}
      </div>
    )
  }
}