import React from "react";
import "./Modal.scss";
import { Button,CircularProgress, TextField } from "@material-ui/core";
export default class ModalComponent extends React.Component {
    constructor(props){
        super(props)
        this.state={
            data:{}
        }
    }
    
    componentWillMount = () => {
        this.setState({
            data:this.props.dataDetail
        })
    }
    _handleChangeData = (key,e) => {
        const {data} = this.state;
        this.setState({
            data:{
                ...data,
                [key]:e.target.value
            }
        })
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
  render (){
    const {isLoading } = this.props
    console.log('update data',this.state)
    if (isLoading) {
      return <CircularProgress className="circular-progress" size={100} />
    } else {
      return <div className="modal-container">{this.renderForm()}</div>
    }
  }
}
