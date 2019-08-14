import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, ButtonGroup, Card, CardBody, CardFooter, CardHeader, Col, CustomInput, Form, Input, InputGroup, InputGroupAddon, InputGroupText, ListGroup, Row, ListGroupItem, ListGroupItemHeading } from 'reactstrap';
import Deck from '../../models/deck';
import User from '../../models/user.model';
import { IState } from '../../reducers';
import CardHover from '../card-hover/card.hover.component';

interface IDecklistSubmissionState {
    deck: Deck,
    mainboardCount: number,
    sideboardCount: number,
    randomCard: string[],
    randomCardNumber: number[],
    cardElements: any[],
    errorCards: any[],
    renderFlag: boolean
}

export class DecklistSubmission extends Component<{}, IDecklistSubmissionState> {
    constructor(props: any) {
        super(props);

        this.state = {
            deck: {
                id: 0,
                author: new User(0, 'cbprosser'),
                deckName: 'New Deck',
                deckDescription: '',
                isPrivate: false,
                isPrototype: true,
                format: 'Legacy',
                mainboard: [],
                sideboard: [],
                featuredCard: ''
            },
            mainboardCount: 0,
            sideboardCount: 0,
            randomCard: [],
            randomCardNumber: [],
            cardElements: [],
            errorCards: [],
            renderFlag: false
        }
    }

    getRandomCard = async () => {
        const resp = await fetch('https://api.scryfall.com/cards/random');
        const randCard = await resp.json();
        const randomCard = [randCard.name];
        this.setState({
            randomCard: [
                ...this.state.randomCard,
                ...randomCard
            ]
        })
    }

    togglePrivate = () => {
        this.setState({
            deck: {
                ...this.state.deck,
                isPrivate: !this.state.deck.isPrivate
            }
        })
    }

    togglePrototype = () => {
        this.setState({
            deck: {
                ...this.state.deck,
                isPrototype: !this.state.deck.isPrototype
            }
        })
    }

    selectFormat = (event: any) => {
        this.setState({
            deck: {
                ...this.state.deck,
                format: event.target.value
            }
        })
    }

    updateDeckName = (event: any) => {
        if (event.target.value === '') {
            return;
        }
        this.setState({
            deck: {
                ...this.state.deck,
                deckName: event.target.value
            }
        })
    }

    updateTextAreaMainboardKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            const textList = event.currentTarget.value;
            const lineArr = textList.split('\n');
            this.setState({
                deck: {
                    ...this.state.deck,
                    mainboard: lineArr,
                },
                renderFlag: true
            })
        }

    }

    updateTextAreaMainboardBlur = (event: any) => {
        const textList = event.currentTarget.value;
            const lineArr = textList.split('\n');
            this.setState({
                deck: {
                    ...this.state.deck,
                    mainboard: lineArr,
                },
                renderFlag: true
            })
    }

    cardRender = async () => {
        let elements: any[] = [];
        let errorCards: any[] = [];
        let cardCount: number = 0;

        const cards = this.state.deck.mainboard;

        for (let i = 0; i < cards.length; i++) {
            const cardNum = cards[i].split('x')[0];
            const cardName = cards[i].substring(cards[i].indexOf('x ') + 2);
            const resp = await fetch(`https://api.scryfall.com/cards/named?exact=${cardName}`);
            const card = await resp.json();
            if (card.object !== 'error') {
                cardCount += +cardNum;
                elements.push(<ListGroupItem className="bg-transparent border-0 p-0">{cardNum}x <CardHover id={`mainboard-preview-${i}`} card={card} /></ListGroupItem>)
            } else {
                const respFuzzy = await fetch(`https://api.scryfall.com/cards/autocomplete?q=${cardName}`);
                const cardFuzzy = await respFuzzy.json();
                errorCards.push(<ListGroupItem className="bg-transparent border-0 p-0">{cardName}{(cardFuzzy.data.length > 0) ? ` - Did you mean ${cardFuzzy.data[0]}` : ''}</ListGroupItem>)
            }
        }
        this.setState({
            cardElements: elements,
            errorCards,
            mainboardCount: cardCount
        })
    }

    componentWillMount() {
        for (let i = 0; i < 2; i++) {
            this.getRandomCard();
        }
        const randomCardNumber: number[] = [
            Math.ceil(Math.random() * 4),
            Math.ceil(Math.random() * 4),
            Math.ceil(Math.random() * 4)
        ];
        this.setState({
            randomCardNumber
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
        const decklistPlaceholder = `Decklist format example:
${this.state.randomCardNumber[0]}x ${this.state.randomCard[0]}
${this.state.randomCardNumber[1]}x ${this.state.randomCard[1]}
${this.state.randomCardNumber[2]}x ...`;

        return (
            <Card className="bg-light">
                <CardHeader>
                    {this.state.deck.deckName}
                </CardHeader>
                <CardBody>
                    <Form>
                        <Row>
                            <Col md="6">
                                <InputGroup className="mb-2" size="sm">
                                    <InputGroupAddon className="bg-dark text-light" addonType="prepend">
                                        <InputGroupText className="bg-dark text-light">Deck Name</InputGroupText>
                                    </InputGroupAddon>
                                    <Input className="bg-dark text-light" type="text" id="deckNameInput" placeholder={this.state.deck.deckName} onBlur={this.updateDeckName} />
                                </InputGroup>
                                <InputGroup className="mb-2">
                                    <ButtonGroup className="d-flex w-100" size="sm">
                                        <Button className="text-left border" color="dark" active={this.state.deck.isPrivate} onClick={this.togglePrivate}>Private</Button>
                                        <Button className="text-right border" color="dark" active={this.state.deck.isPrototype} onClick={this.togglePrototype}>Prototype</Button>
                                    </ButtonGroup>
                                </InputGroup>
                                <InputGroup className="mb-2" size="sm">
                                    <InputGroupAddon className="bg-dark text-light" addonType="prepend">
                                        <InputGroupText className="bg-dark text-light">Format</InputGroupText>
                                    </InputGroupAddon>
                                    <CustomInput className="bg-dark text-light" type="select" id="formatSelectInput" onChange={this.selectFormat} defaultValue={this.state.deck.format}>
                                        <option value="Casual">Casual</option>
                                        <option value="Standard">Standard</option>
                                        <option value="Commander">Commander</option>
                                        <option value="Modern">Modern</option>
                                        <option value="Pauper">Pauper</option>
                                        <option value="Legacy">Legacy</option>
                                        <option value="Vintage">Vintage</option>
                                        <option value="Brawl">Brawl</option>
                                    </CustomInput>
                                </InputGroup>
                                <InputGroup className="" size="sm">
                                    <InputGroupAddon className="bg-dark text-light" addonType="prepend">
                                        <InputGroupText className="bg-dark text-light">Featured Card</InputGroupText>
                                    </InputGroupAddon>
                                    <Input className="bg-dark text-light" type="text" id="featuredCardInput" />
                                </InputGroup>
                                <br className="d-md-block d-md-none" />
                            </Col>
                            <Col md="6">
                                <InputGroup size="sm">
                                    <Input className="bg-dark text-light" type="textarea" id="deckListInput" rows={6} placeholder={decklistPlaceholder} onKeyDown={this.updateTextAreaMainboardKeyDown} onBlur={this.updateTextAreaMainboardBlur} />
                                </InputGroup>
                                <br className="d-md-block d-md-none" />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <InputGroup size="sm">
                                    <Input className="bg-dark text-light" type="textarea" id="descriptionInput" rows={6} placeholder={`Deck Description`} />
                                </InputGroup>
                            </Col>
                        </Row>
                    </Form>
                    <br />
                    <Row>
                        <Col>
                            <ListGroupItemHeading className="bg-transparent border-0 p-0 pt-3">Cards Entered ({this.state.mainboardCount}):</ListGroupItemHeading>
                            <ListGroup className="bg-transparent">
                                {this.state.cardElements}
                            </ListGroup>
                        </Col>
                        <Col>
                            <ListGroupItemHeading className="bg-transparent border-0 p-0 pt-3">Couldn't find:</ListGroupItemHeading>
                            <ListGroup className="bg-transparent">
                                {this.state.errorCards}
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

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(DecklistSubmission
)
