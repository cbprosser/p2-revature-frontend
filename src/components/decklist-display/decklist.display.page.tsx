import React, { Component } from 'react'
import Deck from '../../models/deck';
import User from '../../models/user.model';
import DecklistDisplayCardComponent from './decklist.display.card';
import { RouteComponentProps } from 'react-router';
import { tdClient } from '../../axios/td-client';

interface IDecklistDisplayPageComponentState {
    deck: Deck
    mainboardCards: any[]
    sideboardCards: any[]
    featuredCard: any
    isLoading: boolean
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
                new User(0, ''),
                '',
                '',
                false,
                true,
                {
                    id: 0,
                    format: ''
                },
                [],
                [],
                ''
            ),
            mainboardCards: [],
            sideboardCards: [],
            featuredCard: null,
            isLoading: true
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

    getFeaturedCard = async () => {
        const featuredCard = this.state.deck.featuredCard;
        if (featuredCard) {
            const resp = await fetch(`https://api.scryfall.com/cards/named?exact=${featuredCard}`);
            const card = await resp.json();
            if (card.object !== "error") {
                this.setState({
                    featuredCard: card
                })
            }
        }
    }

    getDeck = async () => {
        const { userId, deckId }: any = this.props.match.params;
        const resp = await tdClient.get(`/deck/card/${deckId}`);
        const deck: Deck = resp.data;
        console.log(deck)
        this.setState({
            deck,
            isLoading: false
        })
    }

    componentWillMount() {
        this.getDeck();
    }

    componentDidUpdate(prevProps: any, prevState: IDecklistDisplayPageComponentState) {
        if (prevState.isLoading != this.state.isLoading) {
            this.getCardObjects();
            this.getFeaturedCard();
        }
    }

    render() {
        return (
            <DecklistDisplayCardComponent
                history={this.props.history}
                location={this.props.location}
                match={this.props.match}
                deck={this.state.deck}
                mainboardCards={this.state.mainboardCards}
                sideboardCards={this.state.sideboardCards}
                featuredCard={this.state.featuredCard} />
        )
    }
}
