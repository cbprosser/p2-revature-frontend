import React, { Component } from 'react'
import Collection from '../../models/collection';
import User from '../../models/user.model';
import CollectionlistDisplayCardComponent from './collectionlist.display.card';
import { RouteComponentProps } from 'react-router';
import { tdClient } from '../../axios/td-client';

interface ICollectionlistDisplayPageComponentState {
    collection: Collection
    loggedInUser: User
    cards: any[]
    featuredCard: any
    isLoading: boolean
}

interface ICollectionlistDisplayPageComponentProps extends RouteComponentProps {
    collections?: Collection
    featuredCards?: any[]
    collectionID?: any
}

export default class CollectionlistDisplayPageComponent extends Component<ICollectionlistDisplayPageComponentProps, ICollectionlistDisplayPageComponentState> {
    constructor(props: any) {
        super(props);

        this.state = {
            collection: new Collection(
                0,

                new User(0, ''),
                '',
                '',
                false,
                true,
                [],
                ''
            ),
            loggedInUser: new User(),
            cards: [],
            featuredCard: null,
            isLoading: true,

        }
    }

    getCardObjects = async () => {
        const cardsObj = this.state.collection.cards;
        let cards: any[] = [];

        for (let i = 0; i < cardsObj.length; i++) {
            const cardNum = +cardsObj[i].split('x')[0];
            const cardName = cardsObj[i].substring(cardsObj[i].indexOf(' ') + 1);
            const resp = await fetch(`https://api.scryfall.com/cards/named?exact=${cardName}`);
            const card = await resp.json();
            cards.push({
                number: cardNum,
                card
            })
        }
        this.setState({
            cards
        })
    }

    getFeaturedCard = async () => {
        const featuredCard = this.state.collection.featuredCard;
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

    getCollection = async () => {
        const { userId, collectionId }: any = this.props.match.params;
        const coll = 0;
        if (collectionId == null) {
            const resp = await tdClient.get(`/collection/card/${this.props.collectionID}`);
            const collection: Collection = resp.data;
            console.log(collection)
            this.setState({
                collection,
                isLoading: false
            })
        }
        const resp = await tdClient.get(`/collection/card/${collectionId}`);
        const collection: Collection = resp.data;
        console.log(collection)
        this.setState({
            collection,
            isLoading: false
        })
    }

    componentWillMount() {
        this.getCollection();
    }

    componentDidUpdate(prevProps: any, prevState: ICollectionlistDisplayPageComponentState) {
        if (prevState.isLoading != this.state.isLoading) {
            this.getCardObjects();
            this.getFeaturedCard();
        }
    }

    render() {
        return (
            <CollectionlistDisplayCardComponent
                history={this.props.history}
                location={this.props.location}
                match={this.props.match}
                collection={this.state.collection}
                cards={this.state.cards}
                featuredCard={this.state.featuredCard} />
        )
    }
}
