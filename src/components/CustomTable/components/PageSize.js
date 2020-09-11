import React, { Component } from 'react'

export default class PageSize extends Component {

    constructor(props) {
        super(props) 
        this.state = {
            value: 10    
        }
    }

    _onChange = (event) => {
        const { totalItems, pageSize, pageNumber } = this.props.data;
        this.setState({ value: event.target.value});
        this.props.onPageSize({
            totalItems,
            pageSize,
            pageNumber,
            event: event.target.value
        });
    }

    render() {
        const { data } = this.props; 
        const styleDefault = this.props.style;
        const pageSize = (data.pageSize * data.pageNumber) >= data.totalItems ? data.totalItems : data.pageSize * data.pageNumber;
        return (
            <div className={styleDefault['page-size-container']}>
                {/* <p>showing</p>
                <select onChange={this._onChange} value={this.state.value}>
                    <option value="1">1</option>
                    <option value="10">10</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                </select>
                <p>{`entries,`}</p> */}
                <p>{`showing ${pageSize}  of ${ data.totalItems } data`}</p>
            </div>
        )
    }
}
