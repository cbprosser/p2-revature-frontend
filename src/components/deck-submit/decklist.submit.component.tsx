import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, ButtonGroup, Card, CardBody, CardFooter, CardHeader, Col, CustomInput, Form, Input, InputGroup, InputGroupAddon, InputGroupText, ListGroup, Row, ListGroupItem, ListGroupItemHeading, Container, Alert } from 'reactstrap';
import Deck from '../../models/deck';
import User from '../../models/user.model';
import { IState } from '../../reducers';
import CardHover from '../card-hover/card.hover.component';
import DeckSubmitFormComponent from './deck.submit.form.component';

interface IDecklistSubmissionState {
    deck: Deck,
    mainboardCount: number,
    sideboardCount: number,
    cardElements: any[],
    errorCardElements: any[],
    renderFlag: boolean,
    errorFlag: boolean
}

export class DecklistSubmission extends Component<{}, IDecklistSubmissionState> {
    constructor(props: any) {
        super(props);

        this.state = {
            deck: {
                id: 0,
                author: new User(0, 'cbprosser'),
                deckName: '',
                deckDescription: '',
                isPrivate: false,
                isPrototype: true,
                format: 'Casual',
                mainboard: [],
                sideboard: [],
                featuredCard: ''
            },
            mainboardCount: 0,
            sideboardCount: 0,
            cardElements: [],
            errorCardElements: [],
            renderFlag: false,
            errorFlag: false
        }
    }

    cardRender = async () => {
        let elements: any[] = [];
        let errorCardElements: any[] = [];
        let errorFlag: boolean = false;
        let cardCount: number = 0;

        const cards = this.state.deck.mainboard;

        for (let i = 0; i < cards.length; i++) {
            const cardNum = cards[i].split('x')[0];
            const cardName = cards[i].substring(cards[i].indexOf(' ') + 1);
            const resp = await fetch(`https://api.scryfall.com/cards/named?exact=${cardName}`);
            const card = await resp.json();
            if (card.object !== 'error') {
                cardCount += +cardNum;
                elements.push(<ListGroupItem className="bg-transparent border-0 p-0">{cardNum}x <CardHover id={`mainboard-preview-${i}`} card={card} /></ListGroupItem>)
            } else {
                errorFlag = (cardName === '') ? errorFlag : true;
                const respFuzzy = await fetch(`https://api.scryfall.com/cards/autocomplete?q=${cardName}`);
                const cardFuzzy = await respFuzzy.json();
                errorCardElements.push(<ListGroupItem className="bg-transparent border-0 p-0">{cardName}{(cardFuzzy.data.length > 0) ? ` - Did you mean ${cardFuzzy.data[0]}` : ''}</ListGroupItem>)
            }
        }
        this.setState({
            cardElements: elements,
            errorCardElements: errorCardElements,
            mainboardCount: cardCount,
            errorFlag
        })
    }

    toggleAlert = () => {
        this.setState({
            errorFlag: !this.state.errorFlag
        })
    }

    updateDeck = (deck: Deck) => {
        this.setState({
            deck,
            renderFlag: true
        })
    }

    componentDidUpdate() {
        if (this.state.renderFlag) {
            this.cardRender();
            this.setState({
                renderFlag: false
            })
        }
    }

    render() {
        return (
            <Card className="bg-light">
                <Alert color="danger" isOpen={this.state.errorFlag}>
                    <ListGroupItemHeading className="bg-transparent border-0 p-0 pt-3">Couldn't find:</ListGroupItemHeading>
                    <ListGroup className="bg-transparent">
                        {this.state.errorCardElements}
                    </ListGroup>
                </Alert>
                <CardHeader>
                    New Deck
                </CardHeader>
                <CardBody>
                    <DeckSubmitFormComponent deck={this.state.deck} updateDeck={this.updateDeck} mainboardCount={this.state.mainboardCount} sideboardCount={this.state.sideboardCount} />
                    <Row>
                        <Col>
                            <ListGroupItemHeading className="bg-transparent border-0 p-0 pt-3">Cards Entered ({this.state.mainboardCount}):</ListGroupItemHeading>
                            <ListGroup className="bg-transparent">
                                {this.state.cardElements}
                            </ListGroup>
                        </Col>
                    </Row>
                </CardBody>
                <CardFooter>
                    {this.state.deck.author.username /* change to props when auth working */}
                </CardFooter>
            </Card>
        )
    }
}

const mapStateToProps = (state: IState) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(DecklistSubmission
)
