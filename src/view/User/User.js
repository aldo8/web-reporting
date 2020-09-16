import React from 'react';
import { Edit, Delete, KeyboardArrowLeft,KeyboardArrowRight } from '@material-ui/icons';
import { Button, Modal, DialogContent, CircularProgress } from '@material-ui/core';
import moment from 'moment';
import ModalComponent from 'components/Modal/Modal'
import { Table } from 'semantic-ui-react';
import { createUser } from 'action/user';
import { listUser } from 'reducers/user';
import { Formik } from 'formik';

export default class User extends React.Component {
    constructor(props) {
        super()
        this.state = {
            isOpenModal: false,
            isDetail: false,
            createUser: {
                name: null,
                userName: null,
                password: null,
                confirmPassword: null,
                role: null
            },
            dataDetail: {}
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
            await this.props.getUserDetail(data.id, token);
            this.setState({
                dataDetail: this.props.detailUser.data,
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
        this.props.listUser(null,token)
    }
    handleClickUpdate = async (data) => {
        const {isOpenModal} = this.state;
        const { updateUser, token } = this.props;
        await updateUser(data, token)
        this.setState({isOpenModal:!isOpenModal})
        listUser(null,token);
        console.log('Update ngapdet', data)
    }
    handleCreateUser = (data) => {
        const { token } = this.props
        this.props.createUser(data, token);
    }
    renderDetail = () => {
        const { dataDetail } = this.state;
        let role = [{ role: 'SA', name: 'Super Admin' }, { role: 'A', name: 'Admin' }, { role: 'U', name: 'User' }]
        return (
            <>
                <div class="ui form" style={{ backgroundColor: 'white', padding: "10px" }} >
                    <div class="field">
                        <label>Name</label>
                        <input type="text" name="first-name" placeholder="Name" value={dataDetail.name} onChange={(e) => this.setState({ dataDetail: { ...dataDetail, name: e.target.value } })} />
                    </div>
                    <div class="field">
                        <label>Username</label>
                        <input type="text" placeholder="Username" value={dataDetail.userName} onChange={(e) => this.setState({ dataDetail: { ...dataDetail, userName: e.target.value } })} />
                    </div>
                    <div class="field">
                        <label>Password</label>
                        <input type="password" placeholder="Password" value={dataDetail.password} onChange={(e) => this.setState({ dataDetail: { ...dataDetail, password: e.target.value } })} />
                    </div>
                    <div class="field">
                        <label>Confirm Password</label>
                        <input type="password" placeholder="Confirm Password" value={dataDetail.confirmPassword} onChange={(e) => this.setState({ dataDetail: { ...dataDetail, confirmPassword: e.target.value } })} />
                    </div>
                    <div class="field">
                        <label>Role</label>
                        <select class="ui dropdown" onChange={(e) => this.setState({ dataDetail: { ...dataDetail, role: e.target.value } })}>
                            {role.map((data) => (
                                <option value={data.role}>{data.name}</option>
                            ))}
                        </select>
                    </div>

                    <button class="ui button" onClick={() => this.handleClickUpdate(dataDetail)}>
                        Update
                    </button>
                </div>

            </>
        )
    }
    handleClickCreate = async (data) => {
        console.log('create',data)
        const { isOpenModal } = this.state;
        const { token } = this.props;
        await this.props.createUser(data, token)
        await this.props.listUser(null, token)
        this.setState({ isOpenModal: !isOpenModal })
    }
    handleChangeData = (key, data) => {
        
        const { createUser } = this.state
        this.setState({
            createUser: {
                ...createUser,
                [key]: data
            }
        })
    }
    renderCreate = () => {
        const {  createUser } = this.state;
        let role = [{ role: 'SA', name: 'Super Admin' }, { role: 'A', name: 'Admin' }, { role: 'U', name: 'User' }]
        return (
            <Formik initialValues={createUser}>
                {(props) => (
                    <div class="ui form" style={{ backgroundColor: 'white', padding: "10px" }} >
                        {console.log('Data Form',props.values)}
                <div class="field">
                    <label>Name</label>
                    <input type="text" placeholder="Name" value={this.state.name} onChange={(e) => props.setFieldValue('name',e.target.value)} />
                </div>
                <div class="field">
                    <label>Username</label>
                    <input type="text" placeholder="Username" value={this.state.name} onChange={(e) => props.setFieldValue('userName',e.target.value)} />
                </div>
                <div class="field">
                    <label>Password</label>
                    <input type="password" placeholder="Password" value={this.state.name} onChange={(e) => props.setFieldValue('password',e.target.value)} />
                </div>
                <div class="field">
                    <label>Confirm Password</label>
                    <input type="password" placeholder="Confirm Password" value={this.state.name} onChange={(e) => props.setFieldValue('confirmPassword',e.target.value)} />
                </div>
                <div class="field">
                    <label>Role</label>
                    <select class="ui dropdown" onChange={(e) => props.setFieldValue('role',e.target.value)}>
                        {role.map((data) => (
                            <option value={data.role}>{data.name}</option>
                        ))}
                    </select>
                </div>
                <button class="ui button" onClick={() => this.handleClickCreate(props.values)}>
                    Create
          </button>
            </div>
                )}
            </Formik>
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
                        {dataListUser.data && dataListUser.data.map((data,index) => (
                            <Table.Row>
                                <Table.Cell>{moment(data.created).format("DD-MM-YYYY")}</Table.Cell>
                                <Table.Cell>{data.userName}</Table.Cell>
                                <Table.Cell>{data.role === 'SA' ? 'Super Admin' : data.role === 'A' ? 'Admin' : 'User'}</Table.Cell>
                                <Table.Cell >
                                    <Edit style={{ cursor: 'pointer' }} onClick={() => this.handleClickModal(data)} />
                                    <Delete style={{ marginLeft: '20px', cursor: 'pointer' }} onClick={() => this.handleClickDelete(data.id)}/>
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            </>
        )
    }
    onPagination = (key,pageNumber) => {
        const {token} = this.props;
        this.props.listUser({ PageNumber: pageNumber }, token)
    }
    renderFilter = () => {
        return(
            <>
            </>
        )
    }
    renderPagination = () => {
        const { dataListUser } = this.props;
        const nextPage = dataListUser.meta?.hasNextPage;
        const prevPage = dataListUser.meta?.hasPreviousPage;
        const PageNumber = dataListUser.meta?.pageNumber;
        const totalPages = dataListUser.meta?.totalPages;
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
        const { isLoading } = this.state;
        if (isLoading) {
            return <CircularProgress className='circular-progress' size={100} />
        }
        return (
            <div className='container'>
                <button class="positive ui button" onClick={() => this.handleClickModal(null, 'create')}>Create User</button>
                {this.renderFilter()}
                {this.renderTable()}
                {this.renderPagination()}
                {this.renderModal()}
            </div>

        )
    }
}