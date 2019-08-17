import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Col, CardColumns, Card, CardImg, CardTitle, CardText, CardSubtitle, Collapse, Progress, Spinner, Container, Row, Button } from 'reactstrap';
import { IState } from '../../reducers';
import DeckDisplay from '../deck-display/deck.display.component';
interface ILandingProps {

}

interface ILandingState {
    // manaTypes: any[]
    isLoading: boolean,
    decks: any[],
    collapse: boolean
}

export class LandingPageComponenet extends React.Component<ILandingProps, ILandingState> {

    constructor(props: any) {
        super(props);

        this.toggle = this.toggle.bind(this);

        this.state = {
            // manaTypes: [],
            isLoading: true,
            collapse: false,
            decks: []
        }
    }



    async componentDidMount() {
        this.getRandomCards(1);
        this.getRandomCards(2);
        // this.state.decks.forEach(async (deck) => {
        //     const image = await this.getCardArt(deck.featuredCard);
        //     this.updateDeckImage(deck.featuredCard, image);
        // })
    }

    // updateDeckImage = (featuredCard: string, deckImage: any) => {
    //     this.setState({
    //         decks: this.state.decks.map(deck => {
    //             if (deck.featuredCard === featuredCard) {
    //                 return {
    //                     ...deck,
    //                     featuredCardImage: deckImage
    //                 }
    //             } else {
    //                 return deck;
    //             }
    //         })
    //     })
    // }


    toggle() {
        this.setState(state => ({ collapse: !state.collapse }));
    }

    getRandomCards = async (i: number) => {

        const resp = await fetch("https://api.scryfall.com/cards?page=" + i, {
        });
        const listOfCards = await resp.json();
        // console.log(cardList)
        let dl = this.state.decks;
        for (let i = 0; i < 20; i++) {
            dl.push({
                format: listOfCards.data[i].set_type,
                author: listOfCards.data[i].artist,
                description: listOfCards.data[i].oracle_text,
                featuredCard: listOfCards.data[i].name,
                featuredCardImage: listOfCards.data[i].image_uris.art_crop
            });
        }

        this.setState({
            ...this.state,
            decks: dl

        });
    }


    getCardArt = async (cardName: string) => {
        const resp = await fetch("https://api.scryfall.com/cards/named?exact=" + cardName, {
        });
        const card = await resp.json();
        return card.image_uris.art_crop;
    }

    generateDeck = () => {
        let elements: any[] = [];
        let decks = this.state.decks;
        for (let i = 0; i < decks.length; i++) {
            elements.push(


                <DeckDisplay deck={decks[i]} />

            )
        }
        return elements;
    }

    render() {
        const deck = this.generateDeck();
        return (
            <Container>
                <Row>
                    <h3>Holding the deck creation page</h3>
                    <Button class="center">Make a Deck</Button>
                </Row>
                <CardColumns>
                    {deck}
                </CardColumns>
            </Container>
        )
    };
}

const mapStateToProps = (state: IState) => ({

})

const mapDispatchToProps = {
    // decks
}

export default connect(mapStateToProps, mapDispatchToProps)(LandingPageComponenet);


