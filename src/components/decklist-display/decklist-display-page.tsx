import React, { Component } from 'react'
import Deck from '../../models/deck';
import User from '../../models/user.model';
import DecklistDisplayCardComponent from './decklist-display-card';
import { RouteComponentProps } from 'react-router';

interface IDecklistDisplayPageComponentState {
    deck: Deck,
    mainboardCards: any[],
    sideboardCards: any[]
}

interface IDecklistDisplayPageComponentProps extends RouteComponentProps {
    //
}

export default class DecklistDisplayPageComponent extends Component<IDecklistDisplayPageComponentProps, IDecklistDisplayPageComponentState> {
    constructor(props: any) {
        super(props);

        this.state = {
            deck: new Deck(
                0,
                new User(0, 'cbprosser'),
                'Modern Cloudfin Raptor',
                'Another awful deck for Modern',
                true,
                false,
                {
                    id: 68,
                    format: 'Modern'},
                [
                    "4x Avatar of the Resolute",
                    "4x Botanical Sanctum",
                    "4x Breeding Pool",
                    "4x Chart a Course",
                    "4x Cloudfin Raptor",
                    "4x Experiment One",
                    "4x Forest",
                    "2x Hinterland Harbor",
                    "2x Island",
                    "4x Pelt Collector",
                    "2x Pongify",
                    "4x Rapid Hybridization",
                    "4x Simic Charm",
                    "4x Strangleroot Geist",
                    "2x Unsubstantiate",
                    "4x Yavimaya Coast",
                    "4x Young Wolf",
                ],
                [
                    "3x Mizzium Skin",
                    "3x Negate",
                    "3x Tormod's Crypt",
                    "2x Unsubstantiate",
                    "4x Vapor Snag",
                ],
                'Modern Cloudfin'
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
                history={this.props.history}
                location={this.props.location}
                match={this.props.match}
                deck={this.state.deck}
                mainboardCards={this.state.mainboardCards}
                sideboardCards={this.state.sideboardCards} />
        )
    }
}
