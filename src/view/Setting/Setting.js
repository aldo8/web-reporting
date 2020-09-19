import React from 'react';
import { Table,Input } from 'semantic-ui-react';
import { CircularProgress } from '@material-ui/core';


export default class Setting extends React.Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this);
    this.renderEdit = this.renderEdit.bind(this);
    this.handleChangeValue = this.handleChangeValue.bind(this);
    this.state = {
      isEdit: false,
      isDetail: []
    }
  }
  componentDidMount = async () => {
    const { token } = this.props;
    await this.props.getDetailSetting(token);
    this.setState({ isDetail: this.props.detailSetting.data })
  }
  renderTable = () => {
    const header = ['Name', 'Value']
    
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
            {this.props.detailSetting?.data && this.props.detailSetting?.data.map((data) => (
              <Table.Row>
                <Table.Cell >{data.name}</Table.Cell>
                <Table.Cell>{data.value}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </>
    )
  }
  handleClickSetting = async (isUpdate,data) => {
    const { isEdit } = this.state;
    const {token} = this.props;
    
    if(isUpdate){
      data.map((data) => delete data['isActive'])
      await this.props.updateSettingUser({settings:data},token)
      this.props.getDetailSetting(token)
      this.setState({isEdit:!isEdit})
    }else {
      this.setState({ isEdit: !isEdit })
    }
    
  }
  handleChange = (e) => {
    const {id,value} = e.target
    const {isDetail} = this.state;
    const targetIndex = isDetail.findIndex(data => {
      return data.id === id
    })
    if(targetIndex !== -1){
      isDetail[targetIndex].name = value
      this.setState({isDetail})
    }
    
  }
  handleChangeValue = (e) => {
    const {id,value} = e.target
    const {isDetail} = this.state;
    const targetIndex = isDetail.findIndex(data => {
      return data.id === id
    })
    if(targetIndex !== -1){
      isDetail[targetIndex].value = value
      this.setState({isDetail})
    }
  }
  renderEdit = () => {
    const { isDetail } = this.state;
    const header = ['Name', 'Value']
    return (
          <>
          <button class="positive ui button" onClick={() => this.handleClickSetting(true,isDetail)}>Update Setting</button>         
            <Table basic>
          <Table.Header>
            <Table.Row>
              {header.map((title) => (
                <Table.HeaderCell>{title}</Table.HeaderCell>
              ))}
            </Table.Row>
          </Table.Header>
          <Table.Body>
            { isDetail.map((data) => (
              <Table.Row>
                <Table.Cell ><Input id={data.id} value={data.name} onChange={this.handleChange}/></Table.Cell>
                <Table.Cell ><Input id={data.id} value={data.value} onChange={this.handleChangeValue}/></Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
          </>
    )
  }
  render() {
    const { isEdit } = this.state;
    if (this.props.isLoading) {
      return <CircularProgress className='circular-progress' size={100} />
    }
    return (
      <div className='container'>
        {isEdit ? null : <button class="positive ui button" onClick={() => this.handleClickSetting(false)}>Edit Setting</button>}
        {isEdit ? this.renderEdit() : this.renderTable()}
      </div>
    )
  }
}