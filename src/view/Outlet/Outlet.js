import React from "react";
import "semantic-ui-css/semantic.min.css";
import {Button, CircularProgress, DialogContent, Modal } from "@material-ui/core";
import uuid from 'uuid';
export default class Outlet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenModal: false,
      createOutlet:{
        id:uuid.v4(),
        isActive:true,
        locationId:uuid.v4(),
        name:null,
        rate:0,
      }
    };
  }
  componentDidMount = () => {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiJhYmNkN2NjMi03MjQzLTQyNmEtYTUxNy0zYWJkYWVlOTM0YjAiLCJyb2xlIjoiU0EiLCJuYmYiOjE1OTk5MDI5MDAsImV4cCI6MTYwMDUwNzcwMCwiaWF0IjoxNTk5OTAyOTAwfQ.cZcZEw-rdQY27IsjLvxMKx5snkIQozEBLJS3nPzcWLs";
    this.props.listOutlet("", token);
  };
  handleClick = () => {
      console.log('ini di click')
    const { isOpenModal } = this.state;
    this.setState({
      isOpenModal: !isOpenModal,
    });
  };

  handleChangeData = (key,e) => {
      const {createOutlet} = this.state;
      this.setState({
        createOutlet:{
            ...createOutlet,
            [key]:e.target.value
        }
      })
  }
  handleClickCreate = (data) => {
      const {token} = this.props
      this.props.createOutlet(data,token)
  }
  renderModal = () => {
    const { isOpenModal,createOutlet} = this.state;
    return (
      <Modal
        open={isOpenModal}
        onClose={() => {
          this.setState({ isOpenModal: !isOpenModal });
        }}
        style={{ width: "fit-content", height: "fit-content", margin: "auto" }}
      >
        <DialogContent
          style={{
            display: "flex",
            width: "fit-content",
            height: "fit-content",
            justifyContent: "center",
            alignItems: "center",
            padding: 0,
            overflowY: "visible",
          }}
        >
          <form class="ui form" style={{backgroundColor:'white'}}>
            <div class="field">
              <label>Name</label>
              <input type="text" name="first-name" placeholder="Name" value={createOutlet.name} onChange={e => this.handleChangeData('name',e)}/>
            </div>
            <div class="field">
              <label>Rate</label>
              <input type="text" name="last-name" placeholder="Rate" value={createOutlet.rate} onChange={e => this.handleChangeData('rate',e)}/>
            </div>
            <div class="field">
            
            </div>
            <button class="ui button" onClick={() => this.handeClickCreate(createOutlet)}>
              Submit
            </button>
          </form>
        </DialogContent>
      </Modal>
    );
  };
  renderContent = () => {
    const { dataOutlet } = this.props;
    return (
      <div class="ui link cards" style={{marginTop:'10px'}}>
        {dataOutlet.data &&
          dataOutlet.data.map((data) => (
            <div class="ui card">
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
                  {data.devices.map((data) => data.phoneNumber)}
                </span>
              </div>
            </div>
          ))}
      </div>
    );
  };
  render() {
    console.log("Ini halaman Outlet", this.props);
    const { dataOutlet, isLoading } = this.props;
    return (
      <div className="container">
        {isLoading && <CircularProgress size={100} />}
        <button class="positive ui button" onClick={() => this.handleClick()}>Create Outlet</button>
        {this.renderContent()}
        {this.renderModal()}
      </div>
    );
  }
}
