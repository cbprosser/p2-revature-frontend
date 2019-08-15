import React, { Component } from 'react';
import { Form, Row, Col, InputGroup, Input, InputGroupAddon, InputGroupText, ButtonGroup, Button, CustomInput, ListGroupItem, Tooltip } from 'reactstrap';
import Deck from '../../models/deck';
import User from '../../models/user.model';
import CardHover from '../card-hover/card.hover.component';

interface IDeckSubmitFormState {
    deck: Deck,
    randomCard: string[],
    randomCardNumber: number[]
}

interface IDeckSubmitFormProps {
    deck: Deck,
    mainboardCount: number,
    sideboardCount: number,
    updateDeck: (deck: Deck) => any
}

export default class DeckSubmitFormComponent extends Component<IDeckSubmitFormProps, IDeckSubmitFormState> {
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
            randomCard: [],
            randomCardNumber: []
        }
    }

    getRandomCard = async () => {
        const resp = await fetch('https://api.scryfall.com/cards/random?q=legal%3Acommander');
        const randCard = await resp.json();
        const randomCard = [randCard.name.toLowerCase()];
        this.setState({
            randomCard: [
                ...this.state.randomCard,
                ...randomCard
            ]
        })
    }

    liveTogglePrivate = () => {
        this.setState({
            deck: {
                ...this.state.deck,
                isPrivate: !this.state.deck.isPrivate
            }
        })
    }

    liveTogglePrototype = () => {
        switch (this.state.deck.format) {
            case "Casual":
                break;
            case "Commander":
                if (this.props.mainboardCount < 100) {
                    return;
                }
            default:
                if (this.props.mainboardCount < 60) {
                    return;
                }
        }
        this.setState({
            deck: {
                ...this.state.deck,
                isPrototype: !this.state.deck.isPrototype
            }
        })
    }

    liveSelectFormat = (event: any) => {
        this.setState({
            deck: {
                ...this.state.deck,
                format: event.target.value
            }
        })
    }

    liveUpdateDeckName = (event: any) => {
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

    liveUpdateTextAreaMainboardEnterKey = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            this.liveUpdateTextAreaMainboard(event);
        }

    }

    liveUpdateTextAreaMainboard = (event: any) => {
        let togglePrototype = this.state.deck.isPrototype
        switch (this.state.deck.format) {
            case "Casual":
                break;
            case "Commander":
                if (this.props.mainboardCount < 100)
                    togglePrototype = true;
            default:
                if (this.props.mainboardCount < 60)
                    togglePrototype = true;
        }
        let textList = event.currentTarget.value;
        let lineArr = textList.split('\n');
        lineArr = this.deckRemoveDuplicates(lineArr);
        textList = this.deckFixInsertedCards(lineArr);
        event.currentTarget.value = textList;
        this.setState({
            deck: {
                ...this.state.deck,
                mainboard: lineArr,
                isPrototype: togglePrototype
            }
        })
    }

    deckFixInsertedCards = (cards: string[]) => {
        let newTextList = '';
        for (let i = 0; i < cards.length; i++) {
            if ((i + 1) !== cards.length) {
                newTextList += `${cards[i]}\n`
            } else {
                newTextList += `${cards[i]}`
            }
        }
        return newTextList;
    }

    deckRemoveDuplicates = (cards: string[]) => {
        let newLineArr: string[] = [];
        let newCardArr: string[] = [];
        for (let i = 0; i < cards.length; i++) {
            if (cards[i] === '') {
                continue;
            }
            const cardNum = +cards[i].split('x')[0];
            const cardName = cards[i].substring(cards[i].indexOf(' ') + 1);
            if (!newCardArr.includes(cardName.toLowerCase())) {
                newLineArr.push(cards[i]);
                newCardArr.push(cardName.toLowerCase());
            } else {
                for (let i = 0; i < newLineArr.length; i++) {
                    const foundCardNum = +newLineArr[i].split('x')[0];
                    const foundCardName = newLineArr[i].substring(cards[i].indexOf(' ') + 1);

                    if (foundCardName.toLowerCase() === cardName.toLowerCase()) {
                        newLineArr[i] = `${foundCardNum + cardNum}x ${foundCardName.toLowerCase()}`;
                        break;
                    }
                }
            }
        }

        return newLineArr;
    }

    liveUpdateDescription = (event: any) => {
        this.setState({
            deck: {
                ...this.state.deck,
                deckDescription: event.currentTarget.value
            }
        })
    }

    liveUpdateFeaturedCard = (event: any) => {
        this.setState({
            deck: {
                ...this.state.deck,
                featuredCard: event.currentTarget.value
            }
        })
    }

    componentDidUpdate(prevProps: any, prevState: any) {
        if (this.state.deck.mainboard !== prevState.deck.mainboard) {
            this.props.updateDeck(this.state.deck);
        }
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

    render() {
        let decklistPlaceholder;
        if (this.state.randomCard.length < 2) {
            decklistPlaceholder = '';
        } else {
            decklistPlaceholder = `Decklist format example:
${this.state.randomCardNumber[0]}x ${this.state.randomCard[0]}
${this.state.randomCardNumber[1]}x ${this.state.randomCard[1]}
${this.state.randomCardNumber[2]}x ...`;
        }
        return (
            <Form>
                <Row>
                    <Col md="6">
                        <InputGroup size="sm">
                            <Input
                                className="bg-dark text-light"
                                type="textarea"
                                id="deckListInput"
                                rows={6}
                                placeholder={decklistPlaceholder}
                                onKeyDown={this.liveUpdateTextAreaMainboardEnterKey}
                                onBlur={this.liveUpdateTextAreaMainboard} />
                        </InputGroup>
                        <br className="d-md-block d-md-none" />
                    </Col>
                    <Col md="6">
                        <InputGroup className="mb-2" size="sm">
                            <InputGroupAddon className="bg-dark text-light" addonType="prepend">
                                <InputGroupText className="bg-dark text-light">Deck Name</InputGroupText>
                            </InputGroupAddon>
                            <Input
                                className="bg-dark text-light"
                                type="text"
                                id="deckNameInput"
                                placeholder={this.state.deck.deckName}
                                onBlur={this.liveUpdateDeckName} />
                        </InputGroup>
                        <InputGroup className="mb-2">
                            <ButtonGroup className="d-flex w-100" size="sm">
                                <Button
                                    className="text-left border"
                                    color="dark"
                                    active={this.state.deck.isPrivate}
                                    onClick={this.liveTogglePrivate}>
                                    Private
                                </Button>
                                <Button
                                    className="text-right border"
                                    color="dark"
                                    id="tooltip-prototype"
                                    active={this.state.deck.isPrototype}
                                    onClick={this.liveTogglePrototype}>
                                    Prototype
                                </Button>
                            </ButtonGroup>
                        </InputGroup>
                        <InputGroup className="mb-2" size="sm">
                            <InputGroupAddon className="bg-dark text-light" addonType="prepend">
                                <InputGroupText className="bg-dark text-light">Format</InputGroupText>
                            </InputGroupAddon>
                            <CustomInput className="bg-dark text-light" type="select" id="formatSelectInput" onChange={this.liveSelectFormat} defaultValue={this.state.deck.format}>
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
                        <InputGroup className="mb-2" size="sm">
                            <InputGroupAddon className="bg-dark text-light" addonType="prepend">
                                <InputGroupText className="bg-dark text-light">Featured Card</InputGroupText>
                            </InputGroupAddon>
                            <Input
                                className="bg-dark text-light"
                                type="text"
                                id="featuredCardInput"
                                onBlur={this.liveUpdateFeaturedCard} />
                        </InputGroup>
                        <br className="d-md-block d-md-none" />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <InputGroup size="sm">
                            <Input
                                className="bg-dark text-light"
                                type="textarea"
                                id="descriptionInput"
                                rows={6}
                                placeholder={`Deck Description`}
                                onBlur={this.liveUpdateDescription} />
                        </InputGroup>
                    </Col>
                </Row>
            </Form>

        )
    }
}
