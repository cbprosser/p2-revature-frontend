import React, { Component } from 'react'
import Deck from '../../models/deck';
import User from '../../models/user.model';
import DecklistDisplayCardComponent from './decklist-display-card';

interface IDecklistDisplayPageComponentState {
    deck: Deck,
    mainboardCards: any[],
    sideboardCards: any[]
}

export default class DecklistDisplayPageComponent extends Component<{}, IDecklistDisplayPageComponentState> {
    constructor(props: any) {
        super(props);

        this.state = {
            deck: new Deck(
                0,
                new User(0, 'cbprosser'),
                'Simic Ascendancy Standard',
                'Trying to make Simic Ascendancy work in standard',
                false,
                false,
                'Standard',
                [
                    "1x Arch of Orazca",
                    "4x Breeding Pool",
                    "1x Field of Ruin",
                    "2x Forest",
                    "4x Galloping Lizrog",
                    "4x Growth-Chamber Guardian",
                    "4x Hadana's Climb",
                    "1x Hallowed Fountain",
                    "4x Hinterland Harbor",
                    "4x Hydroid Krasis",
                    "4x Incubation Druid",
                    "1x Island",
                    "4x Jadelight Ranger",
                    "3x Knight of Autumn",
                    "4x Merfolk Branchwalker",
                    "1x Plains",
                    "3x Simic Ascendancy",
                    "4x Sunpetal Grove",
                    "4x Temple Garden",
                    "3x Wildgrowth Walker"
                ],
                [
                    "3x Kraul Harpooner",
                    "2x Lyra Dawnbringer",
                    "3x Negate",
                    "3x Settle the Wreckage",
                    "2x Shalai, Voice of Plenty",
                    "2x Unbreakable Formation",
                ],
                'Simic Ascendancy'
            ),
            mainboardCards: [],
            sideboardCards: []
        }
    }

    getCardObjects = async () => {
        const cards = this.state.deck.mainboard;
        const sideboard = this.state.deck.sideboard;
        let mainboardCards: any[] = [];
        let sideboardCards: any[] = [];

        for (let i = 0; i < cards.length; i++) {
            const cardNum = +cards[i].split('x')[0];
            const cardName = cards[i].substring(cards[i].indexOf(' ') + 1);
            const resp = await fetch(`https://api.scryfall.com/cards/named?exact=${cardName}`);
            const card = await resp.json();
            mainboardCards.push({
                number: cardNum,
                card
            })
        }

        for (let i = 0; i < sideboard.length; i++) {
            const cardNum = +sideboard[i].split('x')[0];
            const cardName = sideboard[i].substring(sideboard[i].indexOf(' ') + 1);
            const resp = await fetch(`https://api.scryfall.com/cards/named?exact=${cardName}`);
            const card = await resp.json();
            sideboardCards.push({
                number: cardNum,
                card
            })
        }
        this.setState({
            mainboardCards,
            sideboardCards
        })
    }

    componentWillMount() {
        this.getCardObjects();
    }

    render() {
        return (
            <DecklistDisplayCardComponent
            deck={this.state.deck}
            mainboardCards={this.state.mainboardCards}
            sideboardCards={this.state.sideboardCards} />
        )
    }
}
