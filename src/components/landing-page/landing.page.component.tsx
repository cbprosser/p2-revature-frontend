import React from 'react';
import { connect } from 'react-redux';
import { CardColumns, Container, Row, Button, Col } from 'reactstrap';
import { IState } from '../../reducers';
import LandingPageDeckDisplay from './landing.page.deck.display.component';
import { Link } from 'react-router-dom';
import User from '../../models/user.model';
import Deck from '../../models/deck';

interface ILandingProps {
    user?: User
}

interface ILandingState {
    isLoading: boolean,
    decks: Deck[],
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

    async componentWillMount() {
        this.getRandomDecks();
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

    getRandomDecks = async () => {

        // will be replaced with API call to get decks from the td_deck table that are public
        const resp = await fetch("http://td-api.us-east-1.elasticbeanstalk.com/deck/card", {});
        const listOfCards = await resp.json();
        let dl: any[] = [];

        for (let i = 0; i < listOfCards.length; i++) {
            if (!listOfCards[i].isPrivate) {
                const resp = await fetch("https://api.scryfall.com/cards/named?exact=" + listOfCards[i].featuredCard, {});
                const imageHold = await resp.json();
                dl[i] = {
                    // will be replaced with deck objects, that contain all this information 
                    id: listOfCards[i].id,
                    artist: imageHold.artist,
                    format: listOfCards[i].format.format,
                    author: listOfCards[i].author,
                    deckName: listOfCards[i].deckName,
                    description: listOfCards[i].deckDescription,
                    featuredCard: imageHold,
                    featuredCardImage: this.getImageURI(imageHold)
                };
            }
        }
        this.setState({
            decks: dl

        });
        // console.log("decks:");
        // console.log(this.state.decks);
    }

    getImageURI = (card: any) => {
        let cardImageUri: string = '';
        if (card.layout === "transform") {
            cardImageUri = card.card_faces[0].image_uris.art_crop;
        } else {
            cardImageUri = card.image_uris.art_crop;
        }
        return cardImageUri;
    }

    /**
     * Retrieves the link to the card image for the cover of the deck object to be displayed
     */
    // getCardArt = async (cardName: string) => {
    //     const resp = await fetch("https://api.scryfall.com/cards/named?exact=" + cardName, {
    //     });
    //     const card = await resp.json();
    //     return card.image_uris.art_crop;
    // }

    generateDeck = () => {
        let elements: any[] = [];
        let decks = this.state.decks;
        for (let i = 0; i < decks.length; i++) {
            if (decks[i]) {
                console.log(decks[i])
                elements.push(
                    <LandingPageDeckDisplay key={`deckId-${decks[i].id}`} deck={decks[i]} user={decks[i].author} />
                )
            }
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
                        <Link className="text-light" to="/deck/landing"><Button color="secondary " size="lg" style={{ height: 200 }}>Checkout Your Decks</Button></Link>
                    </Col>
                </Row>
                <CardColumns>
                    {deck}
                </CardColumns>
                <div className="h-500px"></div>
            </Container>
        )
    };
}

const mapStateToProps = (state: IState) => ({
    user: state.auth.currentUser
})

const mapDispatchToProps = {
    // decks
}

export default connect(mapStateToProps, mapDispatchToProps)(LandingPageComponenet);


