import React from "react";
import "semantic-ui-css/semantic.min.css";
import { Button, CircularProgress, DialogContent, Modal } from "@material-ui/core";
import uuid from 'uuid';
export default class Outlet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenModal: false,
      isOpenDetail: false,
      createOutlet: {
        isActive: true,
        name: null,
        locationId: uuid.v4(),
        rate: 0,
      }
    };
  }
  componentDidMount = () => {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiJhYmNkN2NjMi03MjQzLTQyNmEtYTUxNy0zYWJkYWVlOTM0YjAiLCJyb2xlIjoiU0EiLCJuYmYiOjE1OTk5MzU3MTIsImV4cCI6MTU5OTk0MjkxMiwiaWF0IjoxNTk5OTM1NzEyfQ.EWJAGjHrv5D-8z1d6jRKgcs-KN1WqUYPIcmCuh_QJ40"
    this.props.listOutlet("", token);
  };
  handleClickModal = () => {
    const { isOpenModal } = this.state;
    this.setState({
      isOpenModal: !isOpenModal,
    });
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
  handleClick = (data, key) => {
    const { token } = this.props
    switch (key) {
      case 'update':
        this.props.updateOutlet(data, token)
        break;
      case 'delete':
        this.props.deleteOutlet(data, token)
      case 'create':
        this.props.createOutlet(data, token)
      default:
        break;
    }
  }
  handleClickDetail = async (data) => {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiJhYmNkN2NjMi03MjQzLTQyNmEtYTUxNy0zYWJkYWVlOTM0YjAiLCJyb2xlIjoiU0EiLCJuYmYiOjE1OTk5MzU3MTIsImV4cCI6MTU5OTk0MjkxMiwiaWF0IjoxNTk5OTM1NzEyfQ.EWJAGjHrv5D-8z1d6jRKgcs-KN1WqUYPIcmCuh_QJ40"
    const { isOpenDetail } = this.state;
    await this.props.getOutletDetail(data, token);
    this.setState({ isOpenDetail: !isOpenDetail })
  }

  renderModal = () => {
    const { isOpenModal, createOutlet } = this.state;
    return (
      <Modal
        open={isOpenModal}
        onClose={() => {
          this.setState({ isOpenModal: !isOpenModal });
        }}
        style={{ width: "500px", height: "fit-content", margin: "auto" }}
      >
        <div class="ui form" style={{ backgroundColor: 'white', padding: "10px" }} >
          <div class="field">
            <label>Name</label>
            <input type="text" name="first-name" placeholder="Name" value={createOutlet.name} onChange={e => this.handleChangeData('name', e)} />
          </div>
          <div class="field">
            <label>Rate</label>
            <input type="text" name="last-name" placeholder="Rate" value={createOutlet.rate} onChange={e => this.handleChangeData('rate', e)} />
          </div>
          <div class="field">

          </div>
          <button class="ui button" onClick={() => this.handleClick(createOutlet, 'create')}>
            Create
            </button>
        </div>
      </Modal>
    );
  };
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
  renderContent = () => {
    const { dataOutlet } = this.props;
    return (
      <div class="ui link cards" style={{ marginTop: '10px' }}>
        {dataOutlet?.data &&
          dataOutlet?.data.map((data) => (
            <div class="ui card" onClick={() => this.handleClickDetail(data.id)}>
              <div class="content">
                <div class="header">{data.name}</div>
                <div class="meta">
                  <span>{data.rate}</span>
                </div>
                <div class="description">{data.location.name}</div>
              </div>
              <div class="extra content">
                <span class="right floated">{data.addBy.name}</span>
                <span>
                  <i class="user icon"></i>
                  {data.devices && data.devices.map((data) => data.phoneNumber)}
                </span>
              </div>
            </div>
          ))}
      </div>
    );
  };
  render() {
    const { dataOutlet, isLoading } = this.props;
    if(isLoading) {
      return <CircularProgress size={100} className="circular-progress"/>
    }
    return (
      <div className="container">
        <button class="positive ui button" onClick={() => this.handleClickModal()}>Create Outlet</button>
        {this.renderContent()}
        {this.renderModal()}
        {this.renderModalDetails()}
      </div>
    );
  }
}
