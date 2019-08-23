import React from 'react';
import { connect } from 'react-redux';
import { CardColumns, Container, Row, Button, Col } from 'reactstrap';
import { IState } from '../../reducers';
import LandingPageDeckDisplay from './landing.page.deck.display.component';
import { Link, RouteComponentProps } from 'react-router-dom';
import User from '../../models/user.model';
import Deck from '../../models/deck';
import AlertComponent from '../alert-component/alert-component';

interface ILandingProps extends RouteComponentProps {
    user?: User
}

interface ILandingState {
    isLoading: boolean,
    decks: Deck[],
    collapse: boolean
}

export class LandingPageComponenet extends React.Component<ILandingProps, ILandingState> {
    // this.props.history.location.
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

    }




    toggle() {
        this.setState(state => ({ collapse: !state.collapse }));
    }

    getRandomDecks = async () => {

        const resp = await fetch("http://td-api.us-east-1.elasticbeanstalk.com/deck/card", {});
        const listOfCards = await resp.json();
        let dl: any[] = [];

        for (let i = 0; i < listOfCards.length; i++) {
            if (!listOfCards[i].isPrivate) {
                const resp = await fetch("https://api.scryfall.com/cards/named?exact=" + listOfCards[i].featuredCard, {});
                const imageHold = await resp.json();
                if (imageHold.object !== "error") {
                    dl[i] = {
                        id: listOfCards[i].id,
                        artist: imageHold.artist,
                        format: listOfCards[i].format.format,
                        author: listOfCards[i].author,
                        deckName: listOfCards[i].deckName,
                        description: listOfCards[i].deckDescription,
                        featuredCard: imageHold,
                        featuredCardImage: this.getImageURI(imageHold)
                    };
                } else {
                    const resp2 = await fetch("https://api.scryfall.com/cards/named?exact=Totally Lost", {});
                    const totalLost = await resp2.json();
            
                    dl[i] = {
                        id: listOfCards[i].id,
                        artist: imageHold.artist,
                        format: listOfCards[i].format.format,
                        author: listOfCards[i].author,
                        deckName: listOfCards[i].deckName,
                        description: listOfCards[i].deckDescription,
                        featuredCardImage: this.getImageURI(totalLost)
                    };
                }
            }
        }
        this.setState({
            decks: dl

        });
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

    generateDeck = () => {
        let elements: any[] = [];
        let decks = this.state.decks;
        for (let i = 0; i < decks.length; i++) {
            if (decks[i]) {
                elements.push(
                    <LandingPageDeckDisplay key={`deckId-${decks[i].id}`} deck={decks[i]} user={decks[i].author} />
                )
            }
        }
        return elements;
    }

    pushToFrontpageWithError = (errorMessage: string) => {
        this.props.history.push('/', { errorMessage });
    }

    render() {
        const deck = this.generateDeck();
        return (
            <Container>
                <AlertComponent message={this.props.history.location.state && this.props.history.location.state.errorMessage} />
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

}

export default connect(mapStateToProps, mapDispatchToProps)(LandingPageComponenet);


