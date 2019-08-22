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
import CollectionlistDisplayPageComponent from '../collection-components/collectionlist.display.page';


interface UserPageComponentProps extends RouteComponentProps {
    user?: User
}

interface UserPageComponentState {
    collection: Collection
    cards: any[]
    featuredCardName: any
    decks: any[]
    featuredCard: any
    featuredCards: any[]
    collections: Collection[]
    collectionID: any
    expandedRows: any[]
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
                [],
                ''
            ),
            cards: [],
            featuredCardName: '',
            decks: [],
            featuredCard: {},
            featuredCards: [],
            collectionID: 0,
            expandedRows: [],
            collections: []
        }
    }

    componentWillMount() {
        if (this.props.user) {
            this.getDecks();
            this.getCollection();
            this.getFeaturedCard();
        } else {
            this.pushToFrontpageWithError("You must login to view your User information.");
        }
    }

    pushToFrontpageWithError = (errorMessage: string) => {
        this.props.history.push('/', { errorMessage });
    }

    getCollection = async () => {
        const user = this.props.user;
        if (user && user.id) {
            const resp = await fetch(`http://td-api.us-east-1.elasticbeanstalk.com/collection/${user.id}`, {});
            const userCollections = await resp.json();
            this.setState({
                collections: userCollections
            })
            this.getCollectionCards(userCollections);
        }
    }

    getCollectionCards = async (d: Collection[]) => {
        let featuredCards: any[] = [];
        for (let i = 0; i < d.length; i++) {
            const resp = await fetch(`https://api.scryfall.com/cards/named?exact=${d[i].featuredCard}`, {});
            const card = await resp.json();
            featuredCards[i] = card
        };
        console.log(featuredCards);
        this.setState({
            featuredCards
        })
    }

    rowClick = (rid: number) => {
        const currentExpandedRows = this.state.expandedRows;
        const isRowExpanded = currentExpandedRows.includes(rid); // Is it already expanded?
        const newExpandedRows = (isRowExpanded) ? currentExpandedRows.filter(id => id !== rid) : currentExpandedRows.concat(rid); // if it is, filter it out, if it isn't, add it in.
        this.setState({
            expandedRows: newExpandedRows
        })
    }

    createRow = (rid: number) => {
        const data = this.state.collections;
        // if (!data || this.state.collections === 'Found no reimbursements' || data.length === 0 || (data && data[0].amount === null)) {
        //     return;
        // }
        const rowClickCallback = () => { this.rowClick(data![rid].id) }; // Moved out of line due to needing to pass in event variables
        let row = [
            (

                    <tr onClick={rowClickCallback} key={`parentRow${data![rid].id}`}>
                        <td>
                            <Link to={`collection/${data![rid].author.id}/${data![rid].id}`}>{data![rid].collectionName}
                            </Link></td>
                        {this.state.featuredCards &&
                            <td><CardHover id={`user-Collection-${data![rid].id}`} card={this.state.featuredCards[data![rid].id]} /></td>
                        }
                        <td>{data![rid].collectionDescription}</td>

                    </tr>
            )];
        if (this.state.expandedRows.includes(data![rid].id)) {
            row.push(
                    <tr key={`childRow${data![rid].id}`}>
                        <td>
                            <CollectionlistDisplayPageComponent
                                history={this.props.history}
                                location={this.props.location}
                                match={this.props.match}
                                collections={data![rid]}
                                featuredCards={this.state.featuredCards}
                                collectionID={data![rid].id}
                            />
                        </td>

                    </tr>
            )
        }

        return row;
    }


    getFeaturedCard = async () => {
        const featuredCard = this.state.collection.featuredCard;
        if (featuredCard) {
            const resp = await fetch(`https://api.scryfall.com/cards/named?exact=${featuredCard}`);
            const card = await resp.json();
            if (card.object !== "error") {
                this.setState({
                    featuredCardName: card
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
            this.getDeckCards(userDecks);
        }


    }

    getDeckCards = async (d: Deck[]) => {
        let featuredCards: any[] = [];
        for (let i = 0; i < d.length; i++) {
            const resp = await fetch(`https://api.scryfall.com/cards/named?exact=${d[i].featuredCard}`, {});
            const card = await resp.json();
            featuredCards[d[i].id] = card
        };
        // console.log(featuredCards);
        this.setState({
            featuredCard: featuredCards
        })
    }

    render() {
        const userDecks = this.state.decks;
        const userCollections = this.state.collections;

        let allRows: any[] = [];

        const length: number = (userCollections) ? userCollections.length : 0;

        for (let i = 0; i < length; i++) {
            allRows.push(this.createRow(i));
        }

        console.log("allRows:");
        console.log(allRows);
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
                                            {userDecks.map(deck =>
                                                <tr key={`deckId-${deck.id}`}>

                                                    <td><Link className="text-light" to={`/deck/${deck.id}`} >{deck.deckName}</Link></td>

                                                    <td>{deck.format.format}</td>

                                                    {this.state.featuredCard &&
                                                        <td><CardHover id={`user-deck-${deck.id}`} card={this.state.featuredCard[deck.id]} /></td>
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
                        <table className="table table-striped table-dark">
                            <thead>
                                <tr>
                                    <th scope='col'>Collection Name</th>
                                    <th scope='col'>Featured Card</th>
                                    <th scope='col'>Description</th>

                                </tr>
                            </thead>
                            <tbody>
                                {allRows}
                            </tbody>
                        </table>
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
