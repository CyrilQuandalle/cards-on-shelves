'use strict'

import React from 'react';
import classNames from 'classnames';

import { Card } from './Card.js';

export class CardEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            card: props.card
        };
        this.handleCardChange = this.handleCardChange.bind(this);
        this.updateItem = this.updateItem.bind(this);
    }

    render() {
        const card = this.state.card;
        const cardItems = card.content || [];
        const cardItemInputs = cardItems.map((item, index) =>
            <CardItemInput key={index} item={item} onUpdate={ this.updateItem }/>
        );

        return (
            <div className="card-editor-container">
                <div className="sheet-name">{card.name}</div>
                <Card card={card} />
                <form className="card-editor">
                    <input name="name" type="text" value={card.name} onChange={ this.handleCardChange } />
                    {false &&
                    <div className="card-editor-toolbar">
                        <button>Titre</button>
                        <button>Zone de texte</button>
                        <button>Clé/Valeur</button>
                    </div>
                    }
                    <fieldset>
                        {cardItemInputs}
                    </fieldset>
                </form>
            </div>
        );
    }

    handleCardChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        let card = this.state.card;
        card[name] = value;

        this.updateCard(card);
    }

    updateCard(card) {
        this.setState({card: card});
    }

    updateItem(item) {
        this.refresh();
    }

    refresh() {
        let card = this.state.card;
        this.updateCard(card);
    }
}

function CardItemInput(props){
    let item = props.item;
    if('title' == item.type) {
        return <CardTitleInput item={item} onUpdate={props.onUpdate}/>;
    }
    if('field' == item.type) {
        return <CardFieldInput item={item} onUpdate={props.onUpdate} />;
    } 
    return <CardTextInput item={item} onUpdate={props.onUpdate} />;
}

class CardItemTypeSelector extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            item: props.item
        };
        this.handleTypeChange = this.handleTypeChange.bind(this);
        this.onUpdate = props.onUpdate;
    }

    handleTypeChange(event) {
        let item = this.state.item;
        item.type = event.target.value;

        this.updateItem(item)
    }

    updateItem(item){
        this.setState({
            item: item
        });
        this.onUpdate(item);
    }

    render() {
        let item = this.state.item;
        const options = ['title', 'field', 'text'];
        
        const typesOptions = options.map((type, index) =>
                <option key={index} value={type}>{type}</option>
            );
    
        return (
            <select value={item.type} onChange={ this.handleTypeChange }>
                {typesOptions}
            </select>
        );
    }
}
class CardTitleInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            item: props.item
        };
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.onUpdate = props.onUpdate;
    }

    render() {
        const item = this.state.item;
        return (
            <div className="card-input-title">
                <input type="text" value={item.content} onChange={ this.handleTitleChange } />
                <CardItemTypeSelector item={item} onUpdate={ this.onUpdate }/>
            </div>
        );
    }
    
    handleTitleChange(event) {
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

class CardFieldInput extends React.Component {
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
                <CardItemTypeSelector item={item} onUpdate={ this.onUpdate }/>
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

class CardTextInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            item: props.item
        };
        console.log('Text item type: ' + props.item.type);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.onUpdate = props.onUpdate;
    }

    render() {
        const item = this.state.item;
        return (
            <div className="card-input-text">
                <textarea value={item.content} onChange={ this.handleTextChange } />
                <CardItemTypeSelector item={item} onUpdate={ this.onUpdate }/>
            </div>
        );
    }
    
    handleTextChange(event) {
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
