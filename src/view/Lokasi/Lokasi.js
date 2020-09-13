import { CircularProgress, Modal } from '@material-ui/core';
import React from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import "semantic-ui-css/semantic.min.css";
import { Table } from 'semantic-ui-react';

export default class Lokasi extends React.Component {
  constructor(props) {
    super()
    this.state = {
      isOpenModal: false,
      name: null,
    }
  }
  componentDidMount = () => {
    const { token } = this.props;
    this.props.listLocation('', token);
  }
  componentDidUpdate = () => {

  }
  handleClickModal = () => {
    const { isOpenModal } = this.state;
    this.setState({
      isOpenModal: !isOpenModal,
    });
  };
  handleClickCreate = (name) => {
    const {token} = this.props
    const {isOpenModal} = this.state;
    this.props.createLocation({name}, token)
    this.setState({ isOpenModal: !isOpenModal });
  }
  renderModal = () => {
    const { isOpenModal, name } = this.state;
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
            <input type="text" name="first-name" placeholder="Name" value={this.state.name} onChange={(e) => this.setState({ name: e.target.value })} />
          </div>

          <div class="field">

          </div>
          <button class="ui button" onClick={() => this.handleClickCreate(name)}>
            Create
                </button>
        </div>
      </Modal>
    );
  };
  renderTable = () => {
    const { dataLocation, token } = this.props;
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
                <Table.Cell>{data.name}</Table.Cell>
                <Table.Cell><DeleteIcon onClick={() => this.props.deleteLocation(data.id,token)} /></Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </>
    )
  }
  render() {
    const { isLoading } = this.props;
    if (isLoading) {
      return <CircularProgress className='circular-progress' size={100} />
    }
    return (
      <div className='container'>
        <button class="positive ui button" onClick={() => this.handleClickModal()}>Create Lokasi</button>
        {this.renderTable()}
        {this.renderModal()}
      </div>
    )
  }
}