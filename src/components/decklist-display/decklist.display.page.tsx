import React, { Component } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { tdClient } from '../../axios/td-client';
import Deck from '../../models/deck';
import User from '../../models/user.model';
import DecklistDisplayCardComponent from './decklist.display.card';
import { IState } from '../../reducers';


interface IDecklistDisplayPageComponentState {
    deck?: Deck
    loggedInUser: User
    mainboardCards: any[]
    sideboardCards: any[]
    featuredCard: any
    isLoading: boolean
}

interface IDecklistDisplayPageComponentProps extends RouteComponentProps {
    deck?: Deck
    user?: User
}

export class DecklistDisplayPageComponent extends Component<IDecklistDisplayPageComponentProps, IDecklistDisplayPageComponentState> {
    constructor(props: any) {
        super(props);

        this.state = {
            loggedInUser: new User(),
            mainboardCards: [],
            sideboardCards: [],
            featuredCard: null,
            isLoading: true
        }
    }

    getCardObjects = async () => {
        if (!this.state.deck) {
            return;
        }
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
        if (!this.state.deck) {
            return;
        }

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
        const { deckId }: any = this.props.match.params;
        try {
            const resp = await tdClient.get(`/deck/card/${deckId}`);
            const deck: Deck = resp.data;
            this.checkDeckForPrivate(deck);
            this.setState({
                deck,
                isLoading: false
            })
        } catch (err) {
            this.pushToFrontpageWithError('That deck doesn\'t exist!');
        }
    }

    checkForUser = () => {
        if (this.props.user) {
            this.setState({
                loggedInUser: this.props.user
            })
        }
    }

    pushToFrontpageWithError = (errorMessage: string) => {
        this.props.history.push('/', { errorMessage });
    }

    checkDeckForPrivate = (deck: Deck) => {
        if (deck.isPrivate) {
            console.log('1')
            if (this.props.user) {
                console.log('2')
                if (deck.author.id === this.props.user.id) {
                    console.log('3')
                    return;
                }
            }
            this.pushToFrontpageWithError('That deck was private!');
        }
    }

    component = () => {
        let component: any[] = [];
        if (this.state.deck) {
            component.push(<DecklistDisplayCardComponent
                history={this.props.history}
                location={this.props.location}
                match={this.props.match}
                deck={this.state.deck}
                loggedInUser={this.state.loggedInUser}
                mainboardCards={this.state.mainboardCards}
                sideboardCards={this.state.sideboardCards}
                featuredCard={this.state.featuredCard} />);
        } else {
            //
        }
        return component;
    }

    componentWillMount() {
        this.getDeck();
        this.checkForUser();
    }

    componentDidUpdate(prevProps: any, prevState: IDecklistDisplayPageComponentState) {
        if (prevState.isLoading !== this.state.isLoading) {
            this.getCardObjects();
            this.getFeaturedCard();
        }
    }

    render() {
        return (
            this.component()
        )
    }
}


const mapStateToProps = (state: IState) => ({
    user: state.auth.currentUser
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(DecklistDisplayPageComponent)
