import React, { Component } from 'react'
import Collection from '../../models/collection';
import User from '../../models/user.model';
import CollectionlistDisplayCardComponent from './collection-display-card-component';
import { RouteComponentProps } from 'react-router';
import { tdClient } from '../../axios/td-client';

interface ICollectionlistDisplayPageComponentState {
    collection: Collection
    cards: any[]
    collectionList: any[],
    featuredCard: any
    isLoading: boolean
}

interface ICollectionlistDisplayPageComponentProps extends RouteComponentProps {
    collection?: Collection
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
            cards: [],
            featuredCard: null,
            collectionList: [],
            isLoading: true
        }
}

    getCardObjects = async () => {
        const cardObj = this.state.collection.cards;
        let collectionList1: any[] = [];
        console.log('mm' + this.state.collection.cards)


        for (let i = 0; i < cardObj.length; i++) {
            const cardNum = +cardObj[i].split('x')[0];
            const cardName = cardObj[i].substring(cardObj[i].indexOf(' ') + 1);
            console.log('cards state'+cardName);
            const resp = await fetch(`https://api.scryfall.com/cards/named?exact=${cardName}`);
            const card = await resp.json();
            collectionList1.push({
                number: +cardNum,
                card
            })
        }
        console.log('cards state 1' + collectionList1);
        this.setState({
            collectionList: collectionList1
        })
        console.log('cards state list' + this.state.collectionList);
    }

    getCollection = async () => {
        const { userId, collectionId }: any = this.props.match.params;
        console.log('getCollection' + this.props.collection);
        const resp = await tdClient.get(`/collection/card/${2}`);
        const collection: Collection = resp.data;
        console.log(collection)
        this.setState({
            collection,
            isLoading: false
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
                console.log('cards' + this.state.collectionList);
            }

        }


    }

    componentWillMount() {
        this.getCardObjects();
        console.log('cards state compmwm' + this.state.collectionList);
        this.getFeaturedCard();
        // console.log('cards'+this.state.featuredCard);
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
                cards={this.state.collection.cards}
                collectionList={this.state.collectionList}
                featuredCard={this.state.featuredCard} />
        )
    }
}
