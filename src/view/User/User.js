import React from 'react';
import { Visibility, Delete } from '@material-ui/icons';
import { Button, Modal, DialogContent, CircularProgress } from '@material-ui/core';
import moment from 'moment';
import ModalComponent from 'components/Modal/Modal'
import { Table } from 'semantic-ui-react';

export default class User extends React.Component {
    constructor(props) {
        super()
        this.state = {
            isOpenModal: false,
            isDetail: false
        }
    }
    componentDidMount = () => {
        const { token, listUser } = this.props;

        listUser(null, token);
    }
    componentDidUpdate = (prevProps, prevState) => {
        console.log('ini props', prevProps)
        console.log('ini state', prevState)

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
            console.log('data detail', data)
            await this.props.getLocationDetail(data.id, token);
            this.setState({
                dataDetail: this.props.detailLocation.data,
                isOpenModal: true,
                isDetail: true
            });
        }

    };
    handleClick = async (data) => {
        const { isOpenModal } = this.state;
        const { getUserDetail, token } = this.props;
        await getUserDetail(data.id, token)
        this.setState({ isOpenModal: !isOpenModal })
        console.log('detailUser', this.props.detailUser)
    }
    handleClickDelete = (id) => {
        const { deleteUser, token } = this.props;
        deleteUser(id, token);
    }
    handleClickUpdate = (data) => {
        const { updateUser, token } = this.props;
        updateUser(data, token)
        console.log('Update ngapdet', data)
    }
    handleCreateUser = (data) => {
        const { token } = this.props
        this.props.createUser(data, token);
    }
    renderDetail = () => {
        const { dataDetail } = this.state;
        console.log('detailLocation', dataDetail)
        return (
            <>
                <div class="ui form" style={{ backgroundColor: 'white', padding: "10px" }} >
                    <div class="field">
                        <label>Name</label>
                        <input type="text" name="first-name" placeholder="Name" value={dataDetail.name} onChange={(e) => this.setState({ dataDetail: { ...dataDetail, name: e.target.value } })} />
                    </div>
                    <button class="ui button" onClick={() => this.handleClickUpdate(true, dataDetail)}>
                        Update
            </button>

                    <button class="ui button" onClick={() => this.handleClickUpdate(false, dataDetail.id)}>
                        Delete
            </button>
                </div>

            </>
        )
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
        const { dataListUser, token } = this.props;
        const { isDetail } = this.state;
        const header = ['Created', 'Username', 'Role', 'Detail']
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
                        {dataListUser.data && dataListUser.data.map((data) => (
                            <Table.Row>
                                <Table.Cell>{moment(data.created).format("DD-MM-YYYY")}</Table.Cell>
                                <Table.Cell>{data.userName}</Table.Cell>
                                <Table.Cell>{data.role === 'SA' ? 'Super Admin' : data.role === 'A' ? 'Admin' : 'User'}</Table.Cell>
                                <Table.Cell onClick={() => this.handleClickModal(data)}>
                                    <Visibility style={{ cursor: 'pointer' }} />
                                    <Delete style={{ marginLeft: '20px', cursor: 'pointer' }} />
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            </>
        )
    }
    render() {
        const { isLoading } = this.state;
        if (isLoading) {
            return <CircularProgress className='circular-progress' size={100} />
        }
        return (
            <div className='container'>
                <button class="positive ui button" onClick={() => this.handleClickModal(null, 'create')}>Create User</button>
                {this.renderTable()}
                {this.renderModal()}
            </div>

        )
    }
}