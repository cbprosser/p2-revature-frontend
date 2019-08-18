import React from 'react';
import { connect } from 'react-redux';
import { CardColumns, Container, Row, Button, Col } from 'reactstrap';
import { IState } from '../../reducers';
import DeckDisplay from '../deck-display/deck.display.component';
import { Link } from 'react-router-dom';

interface ILandingProps {

}

interface ILandingState {
    isLoading: boolean,
    decks: any[],
    collapse: boolean
}

export class LandingPageComponenet extends React.Component<ILandingProps, ILandingState> {

    constructor(props: any) {
        super(props);

        this.toggle = this.toggle.bind(this);

        this.state = {
            isLoading: true,
            collapse: false,
            decks: []
        }
    }

    async componentDidMount() {
        this.getRandomDecks(1);
        this.getRandomDecks(2);
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

    getRandomDecks = async (i: number) => {

        // will be replaced with API call to get decks from the td_deck table that are public
        const resp = await fetch("https://api.scryfall.com/cards?page=" + i, {
        });
        const listOfCards = await resp.json();
        // console.log(cardList)
        let dl = this.state.decks;
        for (let i = 0; i < 20; i++) {
            dl.push({
                // will be replaced with deck objects, that contain all this information 
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

    /**
     * Retrieves the link to the card image for the cover of the deck object to be displayed
     */
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
                    <Col className="d-flex justify-content-around">
                        <Link className="text-light" to="/deck/submit"><Button color="secondary " size="lg" style={{ height: 200 }}>Create a New Deck</Button></Link>
                        <Link className="text-light" to="/deck"><Button color="secondary " size="lg" style={{ height: 200 }}>Checkout Your Decks</Button></Link>
                    </Col>
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


