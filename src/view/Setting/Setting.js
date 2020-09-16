import React from 'react';
import { Table } from 'semantic-ui-react';
import moment from 'moment';
import { Edit} from '@material-ui/icons';
import { CircularProgress } from '@material-ui/core';

export default class Setting extends React.Component {
    constructor(props){
        super()
        this.state = {

        }
    }
    componentDidMount = () => {
        const {token} = this.props;
        this.props.getDetailSetting(token);
    }
    renderTable = () => {
        const { detailSetting, token } = this.props;
        const { isDetail } = this.state;
        const header = ['Created', 'Nama Perusahaan', 'Value']
        console.log('Txt',detailSetting)
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
                    <Table.Cell>{moment(data.created).format("DD-MM-YYYY")}</Table.Cell>
                    <Table.Cell>{data.name}</Table.Cell>
                    <Table.Cell>{data.value}</Table.Cell>
                    {/* <Table.Cell><Edit onClick={() => this.props.deleteOutlet(data, token)} /></Table.Cell> */}
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </>
        )
      }
    render(){
        console.log('Ini halaman Setting',this.props)
        if(this.props.isLoading){
            return <CircularProgress className='circular-progress' size={100}/>
        }
        return(
            <div className='container'>
                {this.renderTable()}
            </div>
        )
    }
}