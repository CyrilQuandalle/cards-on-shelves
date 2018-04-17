'use strict';

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {CardImporter} from './CardImporter.js';

import styles from './cardContainer.css';
import {EditableCard} from './EditableCard';

export class CardContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cards: props.cards,
            editMode: props.editMode
        };
        this.createCard = this.createCard.bind(this);
        this.removeCard = this.removeCard.bind(this);
        this.addCard = this.addCard.bind(this);
        this.addCards = this.addCards.bind(this);
        this.onUpdateContainer = props.onUpdateContainer;
    }

    updateContainer(cards) {
        this.setState({cards: cards});
        this.onUpdateContainer(cards);
    }

    createCard() {
        const aNewCard = {
            'name': '',
            'content': []
        };
        this.addCard(aNewCard);
    }

    addCard(card) {
        this.addCards([card]);
    }

    addCards(cards) {
        this.updateContainer(this.state.cards.concat(...cards));
    }

    removeCard(card) {
        let cards = this.state.cards;
        let cardIndex = cards.indexOf(card);
        cards.splice(cardIndex, 1);
        this.updateContainer(cards);
    }

    render() {
        const cards = this.state.cards;
        const editMode = this.state.editMode;
        const items = cards.map((card, index) =>
            <EditableCard key={index} card={card} addCard={this.addCard} removeCard={this.removeCard} editMode={editMode}/>
        );
        return (
            <div className={styles['card-container']}>
                {editMode !== 'readonly' &&
                <div className={styles['card-container-toolbar']}>
                    <button type="button" onClick={this.createCard}>+</button>
                    <CardImporter onImport={this.addCards}/>
                </div>
                }
                <div className={styles['card-container-items']}>
                    {items}
                </div>
            </div>);
    }
}

CardContainer.propTypes = {
    cards: PropTypes.array.isRequired,
    onUpdateContainer: PropTypes.func.isRequired,
    editMode: PropTypes.string
};
