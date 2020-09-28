import { CircularProgress } from '@material-ui/core';
import DropdownComponent from 'components/DropdownComponent/DropdownComponent';
import React from 'react';
import { Button, Card, Feed } from 'semantic-ui-react';

export default class Dashboard extends React.Component {
    constructor(props) {
        super()
        this.state = {
            location:{
                id:null,
                name:'Pilih Lokasi Pasar'
            }
        }
    }
    componentDidMount = () => {
        const { token } = this.props;
        this.props.dashboardLocation(null, token)
        this.props.dashboardOutlet(null, token)
    }

    renderDashboard = () => {
        const { dataDashboard } = this.props;
        if (dataDashboard?.data.length === 0){
            return <p style={{textAlign:'center'}}>No Data</p>
                
        }
        return (
            <div className='card-dashboard'>
                <div className='card-content'>
                {
                    dataDashboard?.data && dataDashboard?.data.map((data) => (
                        <Card>
                            <Card.Content>
                                <Card.Header style={{ textAlign: 'center', color: data.isActive ? 'green' : 'red' }}>{data.outletName}</Card.Header>
                            </Card.Content>
                            <Card.Content>
                                <Feed>
                                    <Feed.Event>
                                        <Feed.Content>
                                            <Feed.Summary style={{ textAlign: 'center' }}>
                                                <p>Total Kunjungan</p>
                                                <p>{`${data.percent}%`} </p>
                                                <p>{data.total} </p>
                                                <p>Total Kunjungan</p>
                                                <p>{`${data.percent1}%`} </p>
                                                <p>{data.total1} </p>
                                            </Feed.Summary>
                                        </Feed.Content>
                                    </Feed.Event>
                                </Feed>
                            </Card.Content>
                        </Card>
                        
                    ))
                    
                }
                </div>
                </div>
        )
    }
    handleFilter = (data) => {
        this.setState({
            location:{
                ...this.state.location,
                id:data.id,
                name:data.name
            }    
        })
    }
    renderFilter = () => {
        const {dataDashboardLocation,token} = this.props;
        let Location = [];
        dataDashboardLocation?.data && dataDashboardLocation.data.map((data) => {
          return Location.push({id:data.id,name:data.name})
        })
        
        return (
            <>
                <div className='filters-container'>
                    <div className='dropdowns-container' style={{ padding: 0 }}>
                        <DropdownComponent data={Location} selected={this.state.location.name} onSelectAction={(data) => this.handleFilter(data)} />
                    </div>
                    <div className='dropdowns-container' style={{ paddingTop:'30px' }}>
                    <Button onClick={() => this.props.getDashboard(this.state.location.id,token)}>Search</Button>
                    </div>
                </div>
            </>
        )
    }
    
    render() {
        const { isLoading } = this.props;
        if (isLoading) {
            return <CircularProgress className='circular-progress' size={100} />
        }
        return (
            <main className='container'>
                {this.renderFilter()}
                {this.renderDashboard()}
            </main>
        )
    }
}