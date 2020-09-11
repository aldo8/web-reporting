import React from 'react';
import {InputBase,Paper} from '@material-ui/core';
import './SearchInput.scss';

export default class SearchInput extends React.Component {


    constructor() {
        super()

        this.state = {
            value: null,
            inputBase: null,
            insert: false
        }
    }
    componentDidUpdate(_, nextState) {
        if(nextState !== this.state.value) {
            this.state.inputBase.focus();
        }
    }
  
    //Handle key 'Enter' when hit value
    _handleEnterKey = () => {
        if(!this.state.insert) {
            this.setState({ insert: true});
            const executionFunction = () => {
                this.setState({ insert: false});
                return this.props.onSearch("execution", this.state.value);
            }
            setTimeout(executionFunction,2000)
        }
    }

    // handle onChange
    _onChange = event => {
        this.setState({ value: event.target.value });
        this.props.onSearch("change", event.target.value);        
    }

    render(){
        const information = this.props.displayMode === 'web' ? this.props.webInfo : 'Search';
        const display = this.props.displaySearch == null ? "" : this.props.displaySearch
        return (
            <Paper 
                className={this.props.className || 'search-input'}
                elevation={1}
            >
            <InputBase
                inputRef={(e) => { this.state.inputBase = e } } 
                className='search-text'
                value={display}
                placeholder={information}
                onChange={this._onChange}
                onKeyUp={this._handleEnterKey}
            />
            </Paper>
        )
    }
}