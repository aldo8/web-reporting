import React, { Component } from 'react';
import {Skeleton} from '@material-ui/lab'

export default class CSkeleton extends Component {
    render() {
        const { isLoading, children, ...rest } = this.props;
        return isLoading ? (<Skeleton {...rest}>{children}</Skeleton>) : (<div>{children}</div>)  
    
    }
}
