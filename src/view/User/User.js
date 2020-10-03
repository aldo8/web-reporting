import React from 'react';
import { Edit, Delete, KeyboardArrowLeft, KeyboardArrowRight } from '@material-ui/icons';
import { Modal, CircularProgress, } from '@material-ui/core';
import moment from 'moment';
import { Checkbox, Input, Button, Table } from 'semantic-ui-react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { isEmpty } from 'lodash';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Check, Clear } from '@material-ui/icons/';
import { removeStorage } from 'utils/storage.helper';
import { USER_STORAGE } from 'constants/storage';
import { MENU } from 'constants/menu';

export default class User extends React.Component {
    constructor(props) {
        super()
        this.state = {
            id: null,
            isOpenModal: false,
            isConfirmModal: false,
            isDetail: false,
            createUser: {
                name: '',
                userName: '',
                password: '',
                confirmPassword: '',
                role: ''
            },
            dataDetail: {},
            SearchValue: null
        }
    }
    componentDidMount = () => {
        const { token, listUser } = this.props;

        listUser(null, token);
    }

    notifyCreate = (message) => {
        toast.success(`${message}`, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }

    notifyDelete = () => {
        toast.success('User Successfuly Deleted!', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }

    notifyError = (message) => {
        toast.error(`${message}!`, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
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

            await this.props.getUserDetail(data.id, token);

            if (this.props.errorMessageUser) {
                alert('Sorry Data Not Found')
            } else {
                this.setState({
                    dataDetail: this.props.detailUser?.data,
                    isOpenModal: true,
                    isDetail: true
                });
            }

        }

    };
    handleClick = async (data) => {
        const { isOpenModal } = this.state;
        const { getUserDetail, token } = this.props;
        await getUserDetail(data.id, token)
        this.setState({ isOpenModal: !isOpenModal })

    }
    handleClickDelete = async (id) => {
        const { isConfirmModal } = this.state;
        this.setState({ isConfirmModal: !isConfirmModal, id })
    }
    handleClickUpdate = async (data) => {
        const { isOpenModal } = this.state;
        const { updateUser, token } = this.props;
        await updateUser(data, token)
        this.setState({ isOpenModal: !isOpenModal })
        this.props.listUser(null, token);
        if (this.props.updateResponse) {
            this.notifyCreate('User successfully updated!')
        }

    }
    handleCreateUser = (data) => {
        const { token } = this.props
        this.props.createUser(data, token);
    }
    renderDetail = () => {
        const { dataDetail } = this.state;
        
        let role = this.props.userRole.role === 'SA' ? [{ role: 'SA', name: 'Super Admin' }, { role: 'A', name: 'Admin' }, { role: 'U', name: 'User' }] : [{ role: 'A', name: 'Admin' }, { role: 'U', name: 'User' }]
        return (
            <>
                <div class="ui form" style={{ backgroundColor: 'white', padding: "10px" }} >
                    <div class="field">
                        <label>Name</label>
                        <input type="text" name="first-name" placeholder="Name" value={dataDetail.name} onChange={(e) => this.setState({ dataDetail: { ...dataDetail, name: e.target.value } })} />
                    </div>
                    <div class="field">
                        <label>Username</label>
                        <input placeholder={dataDetail.userName}/>
                    </div>
                    <div class="field">
                        <label>Password</label>
                        <input type="password" placeholder="Password" value={dataDetail?.password} onChange={(e) => this.setState({dataDetail:{...dataDetail,password:e.target.value}})}/>
                        {dataDetail?.password?.length < 5 ?
                            (<div className='error-text'>{'Password min 5 character'}</div>) : null
                        }
                    </div>
                    <div class="field">
                        <label>Confirm Password</label>
                        <input type="password" placeholder="Confirm Password" value={dataDetail?.confirmPassword} onChange={(e) => this.setState({dataDetail:{...dataDetail,confirmPassword:e.target.value}})}/>
                        {dataDetail?.password !== dataDetail?.confirmPassword ?
                            (<div className='error-text'>{`Password Not Match`}</div>) : null
                        }
                    </div>
                    <div class="field">
                        <label>Role</label>
                        <select class="ui dropdown" value={dataDetail.role} onChange={(e) => this.setState({ dataDetail: { ...dataDetail, role: e.target.value } })}>
                            {role.map((data) => (
                                <option value={data.role} selected={data.role}> {data.name}</option>
                            ))}
                        </select>

                    </div>

                    <button class="ui button" onClick={() => this.handleClickUpdate(dataDetail)}>
                        Update
                    </button>
                    <Checkbox label='isActive' style={{ marginLeft: '10px' }} checked={dataDetail.isActive} onClick={e => this.setState({ dataDetail: { ...dataDetail, isActive: !dataDetail.isActive } })} />
                </div>

            </>
        )
    }
    handleClickCreate = async (data) => {
        const { isOpenModal } = this.state;
        const { token } = this.props;
        this.setState({ isOpenModal: !isOpenModal })
        await this.props.createUser(data, token)
        this.props.listUser(null, token)
        if (this.props.userCreated.response) {
            return this.notifyCreate('User successfuly created!')

        } else {
            return this.notifyError(`Cannot create user already exist!`)
        }

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
        const { createUser } = this.state;
        console.log('role',this.props.userRole)
        let role = this.props.userRole.role === 'SA' ? [{ role: 'SA', name: 'Super Admin' }, { role: 'A', name: 'Admin' }, { role: 'U', name: 'User' }] : [{ role: 'A', name: 'Admin' }, { role: 'U', name: 'User' }]
        const createUserSchema = Yup.object().shape({
            name: Yup.string()
                .min(3, 'Too Short minimum 3 character!')
                .max(50, 'Too Long!')
                .required('Required'),

            userName: Yup.string()
                .min(5, 'Too Short minimum 5 character!')
                .max(50, 'Too Long!')
                .required('Required'),

            password: Yup.string()
                .min(5, 'Too Short! minimum 5 character')
                .max(50, 'Too Long!')
                .required('Required'),

            confirmPassword: Yup.string()
                .required('Required'),

            role: Yup.string()
                .required('Required')


        })
        return (
            <Formik
                initialValues={createUser}
                validationSchema={createUserSchema}
            >
                {(props) => (
                    <div class="ui form" style={{ backgroundColor: 'white', padding: "10px" }} >

                        <div class="field">
                            <label>Name</label>
                            <input type="text" placeholder="Name" value={props.values.name} onChange={(e) => props.setFieldValue('name', e.target.value)} />
                            {props.errors.name ?
                                (<div className='error-text'>{props.errors.name}</div>) : null
                            }
                        </div>
                        <div class="field">
                            <label>Username</label>
                            <input type="text" placeholder="Username" value={props.values.userName} onChange={(e) => props.setFieldValue('userName', e.target.value)} />
                            {props.errors.userName ?
                                (<div className='error-text'>{props.errors.userName}</div>) : null
                            }
                        </div>
                        <div class="field">
                            <label>Password</label>
                            <input type="password" placeholder="Password" value={this.state.name} onChange={(e) => props.setFieldValue('password', e.target.value)} />
                            {props.errors.password ?
                                (<div className='error-text'>{props.errors.password}</div>) : null
                            }
                        </div>
                        <div class="field">
                            <label>Confirm Password</label>
                            <input type="password" placeholder="Confirm Password" value={this.state.name} onChange={(e) => props.setFieldValue('confirmPassword', e.target.value)} />
                            {props.values.password !== props.values.confirmPassword ?
                                (<div className='error-text'>{`Password Not Match`}</div>) : null
                            }
                        </div>
                        <div class="field">
                            <label>Role</label>
                            <select class="ui dropdown" onChange={(e) => props.setFieldValue('role', e.target.value)}>
                                {role.map((data) => (
                                    <option value={data.role}>{data.name}</option>
                                ))}
                            </select>
                            {props.errors.role ?
                                (<div className='error-text'>{props.errors.role}</div>) : null
                            }
                        </div>
                        {props.values.name && <button disabled={(!isEmpty(props.errors))} class="ui button" onClick={() => this.handleClickCreate(props.values)}>
                            Create
          </button>}
                    </div>
                )}
            </Formik>
        )
    }
    renderModal = () => {
        const { isDetail, isOpenModal } = this.state;
        return (
            <Modal
                open={isOpenModal}
                onClose={() => {
                    this.setState({ isOpenModal: !isOpenModal });
                }}
                className='modal-pop-up'
            >
                { isDetail ? this.renderDetail() : this.renderCreate()}

            </Modal>
        );
    };

    renderTable = () => {
        const { dataListUser } = this.props;

        const header = ['No', 'Updated', 'Name', 'Username', 'Role', 'Is Active', 'Detail']
        if (dataListUser.data && dataListUser.data.length < 1) {
            return <p style={{ textAlign: 'center' }}>No Data</p>
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
                        {dataListUser.data && dataListUser.data.map((data, index) => (
                            <Table.Row>
                                <Table.Cell>{index + 1}</Table.Cell>
                                <Table.Cell>{moment(data.updated).format("DD-MM-YYYY")}</Table.Cell>
                                <Table.Cell>{data.name}</Table.Cell>
                                <Table.Cell>{data.userName}</Table.Cell>
                                <Table.Cell>{data.role === 'SA' ? 'Super Admin' : data.role === 'A' ? 'Admin' : 'User'}</Table.Cell>
                                <Table.Cell>{data.isActive ? <Check /> : <Clear />}</Table.Cell>
                                <Table.Cell >
                                    <Edit style={{ cursor: 'pointer' }} onClick={() => this.handleClickModal(data)} />
                                    <Delete style={{ marginLeft: '20px', cursor: 'pointer' }} onClick={() => this.handleClickDelete(data.id)} />
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            </>
        )
    }
    onPagination = (key, pageNumber) => {
        const { SearchValue } = this.state;
        const { token } = this.props;
        this.props.listUser({ SearchValue, PageNumber: pageNumber }, token)
    }
    handleFilter = (event) => {
        this.setState({
            SearchValue: event.target.value
        })
    }
    renderFilter = () => {
        const { token } = this.props
        const { SearchValue } = this.state
        return (
            <div className='filtering-container'>
                <Input placeholder='Search...' onChange={(e) => this.handleFilter(e)} style={{ marginRight: '10px' }} />
                <Button onClick={() => this.props.listUser({ SearchValue }, token)}>Search</Button>
            </div>
        )
    }
    handleActionDelete = async (data) => {
        const { token } = this.props;
        this.setState({ isConfirmModal: !this.state.isConfirmModal })
        await this.props.deleteUser(data, token);
        this.props.listUser(null, token);
        if (this.props.userDeleted) {
            return this.notifyDelete()
        } else {
            return this.notifyError(`Cannot delete user!`)
        }
    }
    renderModalConfirmation = (data) => {
        const { isConfirmModal, id } = this.state;
        return (
            <Modal
                open={isConfirmModal}
                className='modal-pop-up'
            >
                <div className='modal-container'>
                    <div className='modal-header'>Delete User</div>
                    <div className='modal-content'>
                        <p>Are you sure want to delete this user</p>
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
    handleAuth = () => {
        removeStorage(USER_STORAGE)
        this.props.resetAuthorize()
        this.props.navigateTo(MENU.LOGIN)
    }
    render() {
        const { isLoading } = this.props;
        return (
            <div className='container'>
                <button class="positive ui button" onClick={() => this.handleClickModal(null, 'create')}>Create User</button>
                {isLoading && <CircularProgress className='circular-progress' size={100} />}
                {this.props.unAuthorize && this.handleAuth()}
                {this.renderFilter()}
                {this.renderTable()}
                {this.renderPagination()}
                {this.renderModal()}
                {this.renderModalConfirmation()}
            </div>

        )
    }
}