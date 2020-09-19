import React from "react";
import "./Modal.scss";
import { Button,CircularProgress, TextField } from "@material-ui/core";
import uuid from 'uuid';
export default class ModalComponent extends React.Component {
    constructor(props){
        super(props)
        this.state={
            data:{},
            dataCreateUser:{
              id:uuid.v4(),
              isActive:true,
              userName:null,
              password:null,
              confirmPassword:null,
              role:['SU','U','A']
            }
        }
    }
    
    componentWillMount = () => {
        if(this.props.isCreatedUser) {
          this.setState({
            data:this.props.dataDetail
          })
        }
    }
    _handleChangeData = (key,e) => {
        const {data,dataCreateUser} = this.state;
        if(this.props.isCreateUser){
          this.setState({
            dataCreateUser:{
              ...dataCreateUser,
              [key]:e.target.value
            }
          })
        }
        else{
        this.setState({
            data:{
                ...data,
                [key]:e.target.value
            }
        })
      }
    }
  renderForm = () => {
      const {data} = this.state;
    return (
        <>
        <TextField label="Name" value={data.name} onChange={e => this._handleChangeData('name',e)}/>
        <TextField label="Role" value={data.role} />
        <TextField label="Username" value={data.userName} onChange={e => this._handleChangeData('userName',e)}/>
        <Button onClick={() => this.props.handleClickUpdate(data)}> Update </Button>
      </>
    )
  }
  renderAddUser = () => {
    const {dataCreateUser} = this.state;
    return (
      <>
        <TextField label="Name" value={dataCreateUser.name} onChange={e => this._handleChangeData('name',e)}/>
        <TextField label="Username" value={dataCreateUser.userName} onChange={e => this._handleChangeData('userName',e)}/>
        <TextField label="Password" type='password' value={dataCreateUser.password} onChange={e => this._handleChangeData('password',e)}/>
        <TextField label="Confirm Password" type='password' value={dataCreateUser.confirmPassword} onChange={e => this._handleChangeData('confirmPassword',e)}/>
        {/* <TextField label="Role" value={dataCreateUser.role} onChange={e => this._handleChangeData('confirmPassword',e)}/> */}
        <Button color='primary' onClick={() => this.props.handleCreateUser(dataCreateUser)}> Create User </Button>
      </>
    )
  }
  renderContent = () => {
    if(this.props.isCreatedUser){
      this.renderAddUser()
    } else{
      this.renderForm()
    }
  }
  render (){
    const {isLoading } = this.props
    
    if (isLoading) {
      return <CircularProgress className="circular-progress" size={100} />
    } else {
      return <div className="modal-container">{this.renderAddUser()}</div>
    }
  }
}
