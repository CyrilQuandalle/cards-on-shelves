'use strict'

import React from 'react';
import classNames from 'classnames';

export class CardFieldInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            item: props.item
        };
        this.handleHeaderChange = this.handleHeaderChange.bind(this);
        this.handleValueChange = this.handleValueChange.bind(this);
        this.onUpdate = props.onUpdate;
    }

    render() {
        let item = this.state.item;
        return (
            <div className="card-input-field">
                <input type="text" value={item.header} onChange={ this.handleHeaderChange } />
                <input type="text" value={item.content} onChange={ this.handleValueChange } />
            </div>
        );
    }

    handleHeaderChange(event) {
        let item = this.state.item;
        item.header = event.target.value;

        this.updateItem(item)
    }

    handleValueChange(event) {
        let item = this.state.item;
        item.content = event.target.value;

        this.updateItem(item)
    }

    updateItem(item){
        this.setState({
            item: item
        });
        this.onUpdate(item);
    }

}
