import React from 'react';
import CustomTable from 'components/CustomTable/CustomTable';
import VisibilityIcon from '@material-ui/icons/Visibility';
import DeleteIcon from '@material-ui/icons/Delete';
import { Button, Modal, DialogContent } from '@material-ui/core';
import ModalComponent from 'components/Modal/Modal'

export default class User extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            isDetail:false
        }
    }
    componentDidMount = () => {
        const {listUser} = this.props;
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiJhYmNkN2NjMi03MjQzLTQyNmEtYTUxNy0zYWJkYWVlOTM0YjAiLCJyb2xlIjoiU0EiLCJuYmYiOjE1OTk4NTIwMjEsImV4cCI6MTYwMDQ1NjgyMSwiaWF0IjoxNTk5ODUyMDIxfQ.EOs4ell4ankm47g2uyM_TMzfCmzuJTAA8NX_0QXRlrs';
        listUser('',token);
    }
    componentDidUpdate = (prevProps,prevState) => {
        console.log('ini props',prevProps)
        console.log('ini state',prevState)

    }
    handleClick = async (data) => {
        const {isDetail} = this.state;
        const {getUserDetail,token}=this.props;
        await getUserDetail(data.id,token)
        this.setState({isDetail:!isDetail})
        console.log('detailUser',this.props.detailUser)
    }  
    handleClickDelete = (id) => {
        const {deleteUser,token}=this.props;
        deleteUser(id,token);
    } 
    handleClickUpdate = (data) => {
        const {updateUser,token} = this.props;
        updateUser(data,token)
        console.log('Update ngapdet',data)
    }
    renderTable = () => {
        const {isLoading,dataListUser} = this.props;
        return (
            <CustomTable
                    isLoading={isLoading}
                    isLoadingCount={10}
                    data={{
                        meta:dataListUser?.meta,
                        data:dataListUser?.data,
                    }}
                    rules={[
                        {
                            name:'Name',
                            data:'name',
                        },
                        {
                            name:'Username',
                            data:'userName',
                        },
                        {
                            name:'Role',
                            data:'role',
                            transform:{
                                "SA":"Super Admin",
                                "A":"Admin",
                                "U":"User"
                            }
                        },
                        {
                            name:'Created',
                            data:'created',
                            date:'DD MMMM YYYY',
                        }
                    ]}
                    isReport
                    pagination
                    downloadPcar={(data) => {
                        return (
                            <>
                            <Button onClick={() =>this.handleClick(data)}>
                            <VisibilityIcon/>
                            </Button>
                            <Button onClick={() =>this.handleClickDelete(data.id)}>
                            <DeleteIcon/>
                            </Button>
                            </>

                        )
                    }}
                />  
        )
    }
    renderModal = () => {
        const {isDetail} = this.state;
        const {isLoading} = this.props
        return (
            <Modal
            open={isDetail}
            onClose={() => this.setState({isDetail:!isDetail})}
            style={{width:'fit-content',height:'fit-content',margin:'auto'}}
            >
                <DialogContent style={{
                    display: 'flex',
                    width: 'fit-content',
                    height: 'fit-content',
                    justifyContent:'center',
                    alignItems:'center',
                    padding:0,
                    overflowY:"visible"
                    }}>
                    <ModalComponent
                        isLoading={isLoading}
                        dataDetail={this.props.detailUser?.data}
                        handleClickUpdate={(data) => this.handleClickUpdate(data)}
                    />
                </DialogContent>
            </Modal>
        )
    }
    render(){
        return(
            
            <div className='container'>
                {this.renderTable()}

                {this.renderModal()}
            </div>
            
        )
    }
}