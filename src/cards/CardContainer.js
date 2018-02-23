'use strict'

import React from 'react';

import { Card } from './Card.js';
import { CardEditor } from './CardEditor.js';
import { CardImporter } from './CardImporter.js';
import { CodexExporter } from './CodexExporter.js';

export class CardContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state= {
            name: props.name,
            cards: props.cards || []
        }
        this.addAll = this.addAll.bind(this);
    }

    addAll(cards) {
        this.setState((previous, props) => ({
            cards: previous.cards.concat(...cards)
        }));
    }

    render() {
        const name = this.state.name;
        const cards = this.state.cards.map((item, index) =>
             <CardEditor key={index} card={item} />
        );
        return (
            <div>
                <h1>{name}</h1>
                <CardImporter onImport={this.addAll} />
                <CodexExporter codex={ this.state } /> 
                <div className="card-container">
                    {cards}
                </div>
            </div>);
    }
}
