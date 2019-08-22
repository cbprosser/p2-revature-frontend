import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, CardBody, CardFooter, CardHeader, Col, ListGroup, Row, ListGroupItem, ListGroupItemHeading, Alert } from 'reactstrap';
import Collection from '../../models/collection';
import User from '../../models/user.model';
import { IState } from '../../reducers';
import CardHover from '../card-hover/card.hover.component';
import CollectionSubmitFormComponent from './collection.submit.form';
import { tdClient } from '../../axios/td-client';
import { RouteComponentProps } from 'react-router';



interface ICollectionlistSubmitPageState {
    collection: Collection
    loggedInUser?: User
    cardsCount: number
    cardsElements: any[]
    cardsErrorCardElements: any[]
    renderFlag: boolean
    cardsErrorFlag: boolean
    featuredErrorFlag: boolean
}

interface ICollectionlistSubmitPageProps extends RouteComponentProps {
    user?: User
}

export class CollectionlistSubmitPageComponent extends Component<ICollectionlistSubmitPageProps, ICollectionlistSubmitPageState> {
    constructor(props: any) {
        super(props);

        this.state = {
            collection: {
                id: 0,
                author: new User(),
                collectionName: '',
                collectionDescription: '',
                isPrivate: false,
                isPrototype: true,
                cards: [],
                featuredCard: ''
            },
            cardsCount: 0,
            cardsElements: [],
            cardsErrorCardElements: [],
            renderFlag: false,
            cardsErrorFlag: false,
            featuredErrorFlag: false
        }
    }

    cardsRender = async () => {
        let cardsElements: any[] = [];
        let cardsErrorCardElements: any[] = [];
        let cardsErrorFlag: boolean = false;
        let cardsCount: number = 0;
        const cardsCards = this.state.collection.cards;

        for (let i = 0; i < cardsCards.length; i++) {
            const cardNum = +cardsCards[i].split('x')[0];
            if (isNaN(cardNum)) {
                cardsErrorFlag = true;
                cardsErrorCardElements.push(
                    <ListGroupItem className="bg-transparent border-0 p-0">
                        {cardsCards[i]} should be in format "1x Card Name"
                    </ListGroupItem>)
            } else {
                const cardName = cardsCards[i].substring(cardsCards[i].indexOf(' ') + 1);
                const resp = await fetch(`https://api.scryfall.com/cards/named?exact=${cardName}`);
                const card = await resp.json();
                if (card.object !== 'error') {
                    cardsCount += +cardNum;
                    cardsElements.push(<ListGroupItem className="bg-transparent border-0 p-0">{cardNum}x <CardHover id={`cards-preview-${i}`} card={card} /></ListGroupItem>)
                } else {
                    cardsErrorFlag = (cardName === '') ? cardsErrorFlag : true;
                    const respFuzzy = await fetch(`https://api.scryfall.com/cards/autocomplete?q=${cardName}`);
                    const cardFuzzy = await respFuzzy.json();
                    cardsErrorCardElements.push(<ListGroupItem className="bg-transparent border-0 p-0">Couldn't find "{cardName}"{(cardFuzzy.data.length > 0) ? ` - Did you mean ${cardFuzzy.data[0]}` : ''}</ListGroupItem>)
                }
            }
        }

        this.setState({
            cardsElements,
            cardsErrorCardElements,
            cardsCount,
            cardsErrorFlag,
        })
    }


    cardRender = async () => {
        this.cardsRender();

    }

    testFeaturedCard = async () => {
        if (this.state.collection.featuredCard !== '') {
            const resp = await fetch(`https://api.scryfall.com/cards/named?exact=${this.state.collection.featuredCard}`);
            const card = await resp.json();
            this.setState({
                featuredErrorFlag: (card.object === 'error') ? true : false
            })
        }
    }

    toggleAlert = () => {
        this.setState({
            cardsErrorFlag: !this.state.cardsErrorFlag
        })
    }

    updateCollection = (collection: Collection) => {
        this.setState({
            collection,
            renderFlag: true
        })
    }

    componentDidUpdate(prevProps: any, prevState: any) {
        if (this.state.renderFlag) {
            if (this.state.collection.cards !== prevState.collection.cards) {
                this.cardRender();
            }
            this.setState({
                renderFlag: false
            })
        }
    }

    checkForUser = () => {
        const user = this.props.user;

        
        if (this.props.user) {
           // console.log('user'+ user.id);
            this.setState({
                collection: {
                    ...this.state.collection,
                    author: this.props.user
                }
                
            })
        } else {
            this.pushToFrontpageWithError('You must be logged in to submit decks!')
        }
        console.log('author' + this.state.collection.author.id)
    }

    pushToFrontpageWithError = (errorMessage: string) => {
        this.props.history.push('/', { errorMessage });
    }

    componentWillMount = () => {
        this.checkForUser();
    }

    render() {
        return (
            <Card className="bg-light">
                <Alert color="danger" isOpen={this.state.cardsErrorFlag}>
                    <ListGroup className="bg-transparent">
                        <ListGroupItemHeading className="bg-transparent border-0 p-0 pt-3">cards</ListGroupItemHeading>
                        {this.state.cardsErrorCardElements}
                    </ListGroup>
                </Alert>
                <CardHeader>
                    New Collection
                </CardHeader>
                <CardBody>
                    <CollectionSubmitFormComponent
                        collection={this.state.collection}
                        cardsCount={this.state.cardsCount}
                        cardsErrorFlag={this.state.cardsErrorFlag}
                        featuredErrorFlag={this.state.featuredErrorFlag}
                        updateCollection={this.updateCollection}
                        testFeaturedCard={this.testFeaturedCard}
                        history={this.props.history}
                        location={this.props.location}
                        match={this.props.match} />
                    <Row>
                        <Col>
                            <ListGroupItemHeading className="bg-transparent border-0 p-0 pt-3">cards Entered ({this.state.cardsCount}):</ListGroupItemHeading>
                            <ListGroup className="bg-transparent">
                                {this.state.cardsElements}
                            </ListGroup>
                        </Col>

                    </Row>
                </CardBody>
                <CardFooter>
                    {this.props.user && this.props.user.username}
                </CardFooter>
            </Card>
        )
    }
}

const mapStateToProps = (state: IState) => ({
    user: state.auth.currentUser
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(CollectionlistSubmitPageComponent)
