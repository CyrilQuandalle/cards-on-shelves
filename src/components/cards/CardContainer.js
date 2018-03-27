'use strict';

import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {Card} from './Card.js';
import {CardEditor} from './CardEditor.js';
import {CardImporter} from './CardImporter.js';

import styles from './cardContainer.css';

export class CardContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cards: props.cards
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
        let cards = this.state.cards;
        const items = cards.map((card, index) =>
            <CardContainerItem key={index} card={card} addCard={this.addCard} removeCard={this.removeCard}/>
        );
        return (
            <div className={styles['card-container']}>
                <div className={styles['card-container-toolbar']}>
                    <button type="button" onClick={this.createCard}>+</button>
                    <CardImporter onImport={this.addCards}/>
                </div>
                <div className={styles['card-container-items']}>
                    {items}
                </div>
            </div>);
    }
}

CardContainer.propTypes = {
    cards: PropTypes.array.isRequired,
    onUpdateContainer: PropTypes.func.isRequired
};

class CardContainerItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            card: props.card
        };
        this.addCard = props.addCard;
        this.removeCard = props.removeCard;
        this.onUpdateCard = this.onUpdateCard.bind(this);
    }

    onUpdateCard(card) {
        this.setState({card: card});
    }

    render() {
        let card = this.state.card;
        return (
            <div className="card-container-item">
                <div className="card-container-item-name">{card.name}</div>
                <div className="card-container-item-toolbar">
                    <button type="button" onClick={() => this.addCard(card)}>Dupliquer</button>
                    <button type="button" onClick={() => this.removeCard(card)}>Supprimer</button>
                </div>
                <Card card={card}/>
                <CardEditor card={card} onUpdate={this.onUpdateCard}/>
            </div>
        );
    }
}

CardContainerItem.propTypes = {
    card: PropTypes.object.isRequired,
    addCard: PropTypes.func.isRequired,
    removeCard: PropTypes.func.isRequired
};
