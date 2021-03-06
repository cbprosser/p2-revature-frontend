import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Alert, Card, CardBody, CardFooter, CardHeader, Col, ListGroup, ListGroupItem, ListGroupItemHeading, Row } from 'reactstrap';
import Deck from '../../models/deck';
import User from '../../models/user.model';
import { IState } from '../../reducers';
import CardHover from '../card-hover/card.hover.component';
import DeckUpdateFormComponent from './deck.update.form';
import { RouteComponentProps } from 'react-router';
import { tdClient } from '../../axios/td-client';

interface IDecklistUpdatePageState {
    deck: Deck
    mainboardCount: number
    sideboardCount: number
    mainboardElements: any[]
    mainboardErrorCardElements: any[]
    sideboardElements: any[]
    sideboardErrorCardElements: any[]
    renderFlag: boolean
    mainboardErrorFlag: boolean
    sideboardErrorFlag: boolean
    featuredErrorFlag: boolean
}

interface IDecklistUpdatePageProps extends RouteComponentProps {
    user?: User
}

export class DecklistUpdatePageComponent extends Component<IDecklistUpdatePageProps, IDecklistUpdatePageState> {
    constructor(props: any) {
        super(props);

        this.state = {
            deck: {
                id: 0,
                author: new User(0, ''),
                deckName: '',
                deckDescription: '',
                isPrivate: false,
                isPrototype: true,
                format: {
                    id: 1,
                    format: 'Casual'
                },
                mainboard: [],
                sideboard: [],
                featuredCard: ''
            },
            mainboardCount: 0,
            sideboardCount: 0,
            mainboardElements: [],
            mainboardErrorCardElements: [],
            sideboardElements: [],
            sideboardErrorCardElements: [],
            renderFlag: false,
            mainboardErrorFlag: false,
            sideboardErrorFlag: false,
            featuredErrorFlag: false
        }
    }

    async sendDeckToAPI() {
        // const resp = await tdClient.post(`/deck/card/${deckId}`);
        // const deck: Deck = resp.data;
    }

    mainboardRender = async () => {
        let mainboardElements: any[] = [];
        let mainboardErrorCardElements: any[] = [];
        let mainboardErrorFlag: boolean = false;
        let mainboardCount: number = 0;
        const mainboardCards = this.state.deck.mainboard;

        for (let i = 0; i < mainboardCards.length; i++) {
            const cardNum = +mainboardCards[i].split('x')[0];
            if (isNaN(cardNum)) {
                mainboardErrorFlag = true;
                mainboardErrorCardElements.push(
                    <ListGroupItem className="bg-transparent border-0 p-0">
                        {mainboardCards[i]} should be in format "1x Card Name"
                    </ListGroupItem>)
            } else {
                const cardName = mainboardCards[i].substring(mainboardCards[i].indexOf(' ') + 1);
                const resp = await fetch(`https://api.scryfall.com/cards/named?exact=${cardName}`);
                const card = await resp.json();
                if (card.object !== 'error') {
                    mainboardCount += +cardNum;
                    mainboardElements.push(<ListGroupItem className="bg-transparent border-0 p-0">{cardNum}x <CardHover id={`mainboard-preview-${i}`} card={card} /></ListGroupItem>)
                } else {
                    mainboardErrorFlag = (cardName === '') ? mainboardErrorFlag : true;
                    const respFuzzy = await fetch(`https://api.scryfall.com/cards/autocomplete?q=${cardName}`);
                    const cardFuzzy = await respFuzzy.json();
                    mainboardErrorCardElements.push(<ListGroupItem className="bg-transparent border-0 p-0">Couldn't find "{cardName}"{(cardFuzzy.data.length > 0) ? ` - Did you mean ${cardFuzzy.data[0]}` : ''}</ListGroupItem>)
                }
            }
        }

        this.setState({
            mainboardElements,
            mainboardErrorCardElements,
            mainboardCount,
            mainboardErrorFlag,
        })
    }

    sideboardRender = async () => {
        let sideboardElements: any[] = [];
        let sideboardErrorCardElements: any[] = [];
        let sideboardErrorFlag: boolean = false;
        let sideboardCount: number = 0;
        const sideboardCards = this.state.deck.sideboard;

        for (let i = 0; i < sideboardCards.length; i++) {
            const cardNum = +sideboardCards[i].split('x')[0];
            if (isNaN(cardNum)) {
                sideboardErrorFlag = true;
                sideboardErrorCardElements.push(
                    <ListGroupItem className="bg-transparent border-0 p-0">
                        {sideboardCards[i]} should be in format "1x Card Name"
                    </ListGroupItem>)
            } else {
                const cardName = sideboardCards[i].substring(sideboardCards[i].indexOf(' ') + 1);
                const resp = await fetch(`https://api.scryfall.com/cards/named?exact=${cardName}`);
                const card = await resp.json();
                if (card.object !== 'error') {
                    sideboardCount += +cardNum;
                    sideboardElements.push(<ListGroupItem className="bg-transparent border-0 p-0">{cardNum}x <CardHover id={`sideboard-preview-${i}`} card={card} /></ListGroupItem>)
                } else {
                    sideboardErrorFlag = (cardName === '') ? sideboardErrorFlag : true;
                    const respFuzzy = await fetch(`https://api.scryfall.com/cards/autocomplete?q=${cardName}`);
                    const cardFuzzy = await respFuzzy.json();
                    sideboardErrorCardElements.push(<ListGroupItem className="bg-transparent border-0 p-0">Couldn't find "{cardName}"{(cardFuzzy.data.length > 0) ? ` - Did you mean ${cardFuzzy.data[0]}` : ''}</ListGroupItem>)
                }
            }
        }

        this.setState({
            sideboardElements,
            sideboardErrorCardElements,
            sideboardCount,
            sideboardErrorFlag,
        })
    }

    cardRender = async () => {
        this.mainboardRender();
        this.sideboardRender();
    }

    testFeaturedCard = async () => {
        if (this.state.deck.featuredCard !== '') {
            const resp = await fetch(`https://api.scryfall.com/cards/named?exact=${this.state.deck.featuredCard}`);
            const card = await resp.json();
            this.setState({
                featuredErrorFlag: (card.object === 'error') ? true : false
            })
        }
    }

    toggleAlert = () => {
        this.setState({
            mainboardErrorFlag: !this.state.mainboardErrorFlag
        })
    }

    updateDeck = (deck: Deck) => {
        this.setState({
            deck,
            renderFlag: true
        })
    }

    componentWillMount() {
        this.setState({
            deck: this.props.history.location.state,
            renderFlag: true
        })
    }

    componentDidMount() {
        this.cardRender()
    }

    componentDidUpdate(prevProps: any, prevState: any) {
        if (this.state.renderFlag) {
            if (this.state.deck.mainboard !== prevState.deck.mainboard || this.state.deck.sideboard !== prevState.deck.sideboard) {
                this.cardRender();
            }
            this.setState({
                renderFlag: false
            })
        }
    }

    render() {
        return (
            <Card className="bg-light">
                <Alert color="danger" isOpen={this.state.mainboardErrorFlag}>
                    <ListGroup className="bg-transparent">
                        <ListGroupItemHeading className="bg-transparent border-0 p-0 pt-3">Mainboard</ListGroupItemHeading>
                        {this.state.mainboardErrorCardElements}
                    </ListGroup>
                </Alert>
                <Alert color="danger" isOpen={this.state.sideboardErrorFlag}>
                    <ListGroup className="bg-transparent">
                        <ListGroupItemHeading className="bg-transparent border-0 p-0 pt-3">Sideboard</ListGroupItemHeading>
                        <ListGroupItemHeading>Couldn't find:</ListGroupItemHeading>
                        {this.state.sideboardErrorCardElements}
                    </ListGroup>
                </Alert>
                <CardHeader>
                    {this.state.deck.deckName}
                </CardHeader>
                <CardBody>
                    <DeckUpdateFormComponent
                        history={this.props.history}
                        location={this.props.location}
                        match={this.props.match}
                        deck={this.state.deck}
                        updateDeck={this.updateDeck}
                        mainboardCount={this.state.mainboardCount}
                        mainboardErrorFlag={this.state.mainboardErrorFlag}
                        sideboardCount={this.state.sideboardCount}
                        sideboardErrorFlag={this.state.sideboardErrorFlag}
                        featuredErrorFlag={this.state.featuredErrorFlag}
                        testFeaturedCard={this.testFeaturedCard} />
                    <Row>
                        <Col>
                            <ListGroupItemHeading className="bg-transparent border-0 p-0 pt-3">Mainboard Entered ({this.state.mainboardCount}):</ListGroupItemHeading>
                            <ListGroup className="bg-transparent">
                                {this.state.mainboardElements}
                            </ListGroup>
                        </Col>
                        <Col>
                            <ListGroupItemHeading className="bg-transparent border-0 p-0 pt-3">Sideboard Entered ({this.state.sideboardCount}):</ListGroupItemHeading>
                            <ListGroup className="bg-transparent">
                                {this.state.sideboardElements}
                            </ListGroup>
                        </Col>
                    </Row>
                </CardBody>
                <CardFooter>
                    {this.state.deck.author.username}
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

export default connect(mapStateToProps, mapDispatchToProps)(DecklistUpdatePageComponent)
