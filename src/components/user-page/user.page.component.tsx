import React, { Component } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import User from '../../models/user.model';
import { IState } from '../../reducers';
import { Button, ButtonToolbar, Card, CardBody, CardFooter, CardHeader, Col, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, ListGroup, ListGroupItem, ListGroupItemHeading, Row, Spinner, CardImg, CardImgOverlay, CardTitle, CardText } from 'reactstrap';
import CollectionlistDisplayCardComponent from '../collection-components/collectionlist.display.card';
import Collection from '../../models/collection';
import { tdClient } from '../../axios/td-client';
import { Link } from 'react-router-dom';
import CardHover from '../card-hover/card.hover.component';
import Deck from '../../models/deck';


interface UserPageComponentProps extends RouteComponentProps {
    user?: User
}

interface UserPageComponentState {
    collection: Collection,
    cards: any[],
    featuredCard: any,
    decks: any[],
    featuredCards: any
}

export class UserPageComponent extends Component<UserPageComponentProps, UserPageComponentState> {
    constructor(props: any) {
        super(props);

        this.state = {
            collection: new Collection(
                0,
                new User(0, ''),
                '',
                '',
                true,
                false,
                [ ],
                ''
            ),
            cards: [],
            featuredCard: '',
            decks: [],
            featuredCards: {}
        }
    }

    componentWillMount() {
        this.getCardObjects();
        this.getFeaturedCard();
        if (this.props.user) {
            this.getDecks(); 
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


    getCollection = async () => {
        const { userId, collectionId }: any = this.props.match.params;
        const resp = await tdClient.get(`/collection/card/${collectionId}`);
        const collection: Collection = resp.data;
        console.log(collection)
        this.setState({
            collection
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
               // console.log('cards'+this.state.collectionList);
            }
        }
    }

    getDecks = async () => {
        const user = this.props.user;
        if (user && user.id) {
            const resp = await fetch(`http://td-api.us-east-1.elasticbeanstalk.com/deck/author/${user.id}`, {});
            const userDecks = await resp.json();
            this.setState({
                decks: userDecks
            })
            this.getCards(userDecks);
        }


    }

    getCards = async (d: Deck[]) => {
        let featuredCards: any[] = [];
        for (let i = 0; i < d.length; i++) {
            const resp = await fetch(`https://api.scryfall.com/cards/named?exact=${d[i].featuredCard}`, {});
            const card = await resp.json();
            featuredCards[d[i].id] = card
        };
        // console.log(featuredCards);
        this.setState({
            featuredCards
        })
    }

    render() {
        const userDecks = this.state.decks;
        const user = this.props.user;
        return (
            <Card className="bg-light">
                <CardHeader>
                    <Row>
                        {/* {this.state.featuredCard} */}
                        <Col>
                            <Card className="bg-dark h-100">
                                <CardBody className="d-flex flex-column justify-content-end">
                                    <CardTitle>Username: {this.props.user && this.props.user.username}</CardTitle>
                                    <CardText>Name: {this.props.user && this.props.user.firstName} {this.props.user && this.props.user.lastName} </CardText>
                                    <CardText>Email: {this.props.user && this.props.user.email} </CardText>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </CardHeader>
                <CardBody>
                    <Row>
                        <Col xs="12" sm="6">
                            <ListGroup className="bg-transparent">
                            <div>
                <table className="table table-striped table-dark">
                    <thead>
                        <tr>
                            <th scope='col'>Deck Name</th>
                            <th scope='col'>Format</th>
                            <th scope='col'>Featured Card</th>
                            <th scope='col'>Description</th>

                        </tr>
                    </thead>
                    <tbody>
                        {   userDecks.map(deck =>
                                <tr key={`deckId-${deck.id}`}>

                                    <td><Link className="text-light" to={`/deck/${deck.id}`} >{deck.deckName}</Link></td>

                                    <td>{deck.format.format}</td>

                                    {this.state.featuredCards &&
                                        <td><CardHover id={`user-deck-${deck.id}`} card={this.state.featuredCards[deck.id]} /></td>
                                    }
                                    <td>{deck.deckDescription}</td>
                                    
                                </tr>)
                        }
                    </tbody>
                </table>
            </div>
                            </ListGroup>
                        </Col>
                        <Col xs="6">
                            <ListGroup className="bg-transparent">
                                <CollectionlistDisplayCardComponent
                                    history={this.props.history}
                                    location={this.props.location}
                                    match={this.props.match}
                                    collection={this.state.collection}
                                    cards={this.state.collection.cards}
                                    loggedInUser={this.props.user}
                                    featuredCard={this.state.featuredCard} />
                            </ListGroup>
                        </Col>
                    </Row>
                </CardBody>
            </Card>
        )
    }
}

const mapStateToProps = (state: IState) => ({
    user: state.auth.currentUser
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(UserPageComponent)
