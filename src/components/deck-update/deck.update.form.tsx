import React, { Component } from 'react';
import { Alert, Button, ButtonGroup, Col, Form, Input, InputGroup, ListGroup, ListGroupItem, ListGroupItemHeading, Row } from 'reactstrap';
import Deck from '../../models/deck';
import User from '../../models/user.model';
import DeckUpdateGroup from './deck.update.group';
import DeckUpdateTogglable from './deck.update.box.toggleable';

interface IDeckUpdateFormState {
    deck: Deck
    randomCard: string[]
    randomCardNumber: number[]
    showMainboard: boolean
    submissionAlertVisible: boolean
    submitErrors: any[]
    featuredCardErrorFlag: boolean
    isSubmitting: boolean
}

interface IDeckUpdateFormProps {
    deck: Deck
    mainboardCount: number
    mainboardErrorFlag: boolean
    sideboardCount: number
    sideboardErrorFlag: boolean
    featuredErrorFlag: boolean
    updateDeck: (deck: Deck) => any
    testFeaturedCard: () => any
}

export default class DeckUpdateFormComponent extends Component<IDeckUpdateFormProps, IDeckUpdateFormState> {
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
                    id: 0,
                    format: ''
                },
                mainboard: [],
                sideboard: [],
                featuredCard: ''
            },
            randomCard: [],
            randomCardNumber: [],
            showMainboard: true,
            submissionAlertVisible: false,
            submitErrors: [],
            featuredCardErrorFlag: false,
            isSubmitting: false
        }
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
        switch (this.state.deck.format.format) {
            case "Casual":
                break;
            case "Commander":
                if (this.props.mainboardCount < 100) {
                    return;
                }
                break;
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
        let prototypeToggler = this.props.deck.isPrototype
        switch (event.target.value) {
            case "Casual":
                break;
            case "Commander":
                if (this.props.mainboardCount < 100) {
                    prototypeToggler = true;
                }
                break;
            default:
                if (this.props.mainboardCount < 60) {
                    prototypeToggler = true;
                }
                break;
        }
        this.setState({
            deck: {
                ...this.state.deck,
                isPrototype: prototypeToggler,
                format: event.target.value
            }
        })
    }

    liveUpdateDeckName = (event: any) => {
        this.setState({
            deck: {
                ...this.state.deck,
                deckName: event.target.value
            }
        })
    }

    // liveUpdateCardInputEnterKey = (event: React.KeyboardEvent<HTMLInputElement>, sideboard?: boolean) => {
    //     if (event.key === 'Enter') {
    //         this.liveUpdateCardInput(event, sideboard);
    //     }
    // }

    liveUpdateCardInput = (event: any, sideboard?: boolean) => {
        let togglePrototype = this.state.deck.isPrototype
        switch (this.state.deck.format.format) {
            case "Casual":
                break;
            case "Commander":
                if (this.props.mainboardCount < 100)
                    togglePrototype = true;
                    break;
            default:
                if (this.props.mainboardCount < 60)
                    togglePrototype = true;
        }
        if (this.props.sideboardCount > 15) {
            togglePrototype = true;
        }
        let textList = event.currentTarget.value;
        let lineArr = textList.split('\n');
        lineArr = this.inputRemoveDuplicates(lineArr);
        textList = this.inputFixInsertedCards(lineArr);
        event.currentTarget.value = textList;
        if (sideboard) {
            this.setState({
                deck: {
                    ...this.state.deck,
                    sideboard: lineArr,
                    isPrototype: togglePrototype
                }
            })
        } else {
            this.setState({
                deck: {
                    ...this.state.deck,
                    mainboard: lineArr,
                    isPrototype: togglePrototype
                }
            })
        }
    }

    inputFixInsertedCards = (cards: string[]) => {
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

    inputRemoveDuplicates = (cards: string[]) => {
        let newLineArr: string[] = [];
        let newCardArr: string[] = [];
        for (let i = 0; i < cards.length; i++) {
            if (cards[i] === '') {
                continue;
            }
            const cardNum = +cards[i].split('x')[0];
            if (isNaN(cardNum)) {
                newLineArr.push(cards[i]);
            } else {
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

    toggleSubmissionAlert = () => {
        this.setState({
            submissionAlertVisible: false
        })
    }

    resetSubmitErrors = () => {
        this.setState({
            submitErrors: []
        })
    }

    submitCheck = async (event: any) => {
        event.preventDefault();
        this.toggleSubmissionAlert()
        this.props.updateDeck(this.state.deck)
        let submitErrors: any[] = [];
        let errorEncountered = false;
        if (this.state.deck.deckName.length === 0) {
            errorEncountered = true;
            submitErrors.push(<ListGroupItem key="nameError" className="bg-transparent border-0 p-0">Your deck needs a name!</ListGroupItem>)
        }
        if (this.state.deck.mainboard.length === 0) {
            errorEncountered = true;
            submitErrors.push(<ListGroupItem key="minimumCardNumberError" className="bg-transparent border-0 p-0">Your deck must contain at least one card!</ListGroupItem>)
        }
        if (this.props.mainboardErrorFlag) {
            errorEncountered = true;
            submitErrors.push(<ListGroupItem key="invalidCardsMainboard" className="bg-transparent border-0 p-0">Your mainboard contains invalid cards!</ListGroupItem>)
        }
        if (this.props.sideboardErrorFlag) {
            errorEncountered = true;
            submitErrors.push(<ListGroupItem key="invalidCardsSideboard" className="bg-transparent border-0 p-0">Your sideboard contains invalid cards!</ListGroupItem>)
        }
        if(this.props.featuredErrorFlag) {
            errorEncountered = true;
            submitErrors.push(<ListGroupItem key="invalidCardsSideboard" className="bg-transparent border-0 p-0">Your entered featured card doesn't exist!</ListGroupItem>)
        }
        if (!errorEncountered) {
            console.log(this.props.deck);
            return;
        }
        this.setState({
            submitErrors,
            submissionAlertVisible: errorEncountered
        })
    }

    componentDidUpdate(prevProps: any, prevState: any) {
        if (this.state !== prevState) {
            this.props.updateDeck(this.state.deck);
        }
    }

    componentDidMount() {
        this.setState({
            deck: this.props.deck
        })
    }

    render() {
        return (
            <Form onSubmit={this.submitCheck}>
                <Row>
                    <Col>
                        Input your deck details below. A deck that contains less cards than required for the format will must be marked as a prototype. Include your commander in Brawl and Commander deck lists, and mark the commander as the featured card.
                    </Col>
                </Row>
                <Row>
                    <Col md="6">
                        <DeckUpdateTogglable
                            deck={this.props.deck}
                            mainboardCount={this.props.mainboardCount}
                            sideboardCount={this.props.sideboardCount}
                            // liveUpdateCardInputEnterKey={this.liveUpdateCardInputEnterKey}
                            liveUpdateCardInput={this.liveUpdateCardInput} />
                        <br className="d-md-block d-md-none" />
                    </Col>
                    <Col md="6">
                        <DeckUpdateGroup
                            deck={this.props.deck}
                            liveTogglePrivate={this.liveTogglePrivate}
                            liveTogglePrototype={this.liveTogglePrototype}
                            liveSelectFormat={this.liveSelectFormat}
                            liveUpdateDeckName={this.liveUpdateDeckName}
                            liveUpdateFeaturedCard={this.liveUpdateFeaturedCard}
                            testFeaturedCard={this.props.testFeaturedCard} />
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
                                defaultValue={this.props.deck.deckDescription}
                                onChange={this.liveUpdateDescription} />
                        </InputGroup>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Alert color="danger" isOpen={this.state.submissionAlertVisible} toggle={this.toggleSubmissionAlert}>
                            <ListGroupItemHeading className="bg-transparent border-0 p-0 pt-3">Update failed!</ListGroupItemHeading>
                            <ListGroup className="bg-transparent">
                                {this.state.submitErrors}
                            </ListGroup>
                        </Alert>
                    </Col>
                </Row>
                <Row>
                    <Col className="d-flex justify-content-end">
                        <ButtonGroup size="sm">
                            <Button
                                type="submit"
                                className="text-left border"
                                color="dark">Update</Button>
                        </ButtonGroup>
                    </Col>
                </Row>
                
            </Form>

        )
    }
}
