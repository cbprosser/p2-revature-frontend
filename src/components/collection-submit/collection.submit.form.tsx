import React, { Component } from 'react';
import { Form, Row, Col, InputGroup, Input, ButtonGroup, Button, ListGroupItem, Alert, ListGroupItemHeading, ListGroup } from 'reactstrap';
import Collection from '../../models/collection';
import User from '../../models/user.model';
import CollectionInputTogglable from './collection.input.box.toggleable';
import CollectionInputGroup from './collection.input.group';
import { RouteComponentProps } from 'react-router';
import { tdClient } from '../../axios/td-client';

interface ICollectionSubmitFormState {
    collection: Collection
    randomCard: string[]
    randomCardNumber: number[]
    showCards: boolean
    submissionAlertVisible: boolean
    submitErrors: any[]
    featuredCardErrorFlag: boolean
}

interface ICollectionSubmitFormProps extends RouteComponentProps{  
    collection: Collection
    cardsCount: number
    cardsErrorFlag: boolean
    featuredErrorFlag: boolean
    updateCollection: (Collection: Collection) => any
    testFeaturedCard: () => any
    user?: User
}

export default class CollectionSubmitFormComponent extends Component<ICollectionSubmitFormProps, ICollectionSubmitFormState> {
    constructor(props: any) {
        super(props);

        this.state = {
            collection: {
                id: 0,
                author: new User(3, 'lescobosasainz'),
                collectionName: '',
                collectionDescription: '',
                isPrivate: false,
                isPrototype: true,
                cards: [],
                featuredCard: ''
            },
            randomCard: [],
            randomCardNumber: [],
            showCards: true,
            submissionAlertVisible: false,
            submitErrors: [],
            featuredCardErrorFlag: false
        }
    }

    submitCollection = async () => {
        console.log(this.props.collection);
        const resp = await tdClient.post(`/collection/card/`, this.props.collection);
        const collection: Collection = resp.data;
        if (collection) {
            console.log(collection);
            this.props.history.push(`/collection/${collection.author.id}/${collection.id}`)
        } else {
            console.log("error");
        }
    }

    liveTogglePrivate = () => {
        this.setState({
            collection: {
                ...this.state.collection,
                isPrivate: !this.state.collection.isPrivate
            }
        })
    }

    liveTogglePrototype = () => {
        this.setState({
            collection: {
                ...this.state.collection,
                isPrototype: !this.state.collection.isPrototype
            }
        })
    }

    liveSelectFormat = (event: any) => {
        let prototypeToggler = this.props.collection.isPrototype
        switch (event.target.value) {
            case "Casual":
                break;
            case "Commander":
                if (this.props.cardsCount < 100) {
                    prototypeToggler = true;
                }
                break;
            default:
                if (this.props.cardsCount < 60) {
                    prototypeToggler = true;
                }
                break;
        }
        this.setState({
            collection: {
                ...this.state.collection,
                isPrototype: prototypeToggler
            }
        })
    }

    liveUpdateCollectionName = (event: any) => {
        this.setState({
            collection: {
                ...this.state.collection,
                collectionName: event.target.value
            }
        })
    }

    // liveUpdateCardInputEnterKey = (event: React.KeyboardEvent<HTMLInputElement>, sideboard?: boolean) => {
    //     if (event.key === 'Enter') {
    //         this.liveUpdateCardInput(event, sideboard);
    //     }
    // }

    liveUpdateCardInput = (event: any, sideboard?: boolean) => {
        let togglePrototype = this.state.collection.isPrototype

        let textList = event.currentTarget.value;
        let lineArr = textList.split('\n');
        lineArr = this.inputRemoveDuplicates(lineArr);
        textList = this.inputFixInsertedCards(lineArr);
        event.currentTarget.value = textList;
        if (sideboard) {
            this.setState({
                collection: {
                    ...this.state.collection,
                    isPrototype: togglePrototype
                }
            })
        } else {
            this.setState({
                collection: {
                    ...this.state.collection,
                    cards: lineArr,
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
            collection: {
                ...this.state.collection,
                collectionDescription: event.currentTarget.value
            }
        })
    }

    liveUpdateFeaturedCard = (event: any) => {
        this.setState({
            collection: {
                ...this.state.collection,
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
        this.props.updateCollection(this.state.collection)
        let submitErrors: any[] = [];
        let errorEncountered = false;
        if (this.state.collection.collectionName.length === 0) {
            errorEncountered = true;
            submitErrors.push(<ListGroupItem key="nameError" className="bg-transparent border-0 p-0">Your Collection needs a name!</ListGroupItem>)
        }
        if (this.state.collection.cards.length === 0) {
            errorEncountered = true;
            submitErrors.push(<ListGroupItem key="minimumCardNumberError" className="bg-transparent border-0 p-0">Your Collection must contain at least one card!</ListGroupItem>)
        }
        if (this.props.cardsErrorFlag) {
            errorEncountered = true;
            submitErrors.push(<ListGroupItem key="invalidCardsCards" className="bg-transparent border-0 p-0">Your Cards contains invalid cards!</ListGroupItem>)
        }
        if (this.props.featuredErrorFlag) {
            errorEncountered = true;
            submitErrors.push(<ListGroupItem key="invalidCardsSideboard" className="bg-transparent border-0 p-0">Your entered featured card doesn't exist!</ListGroupItem>)
        }
        if (!errorEncountered) {
            await this.submitCollection(); 
            console.log(this.props.collection);
            return;
        }
        this.setState({
            submitErrors,
            submissionAlertVisible: errorEncountered
        })
    }

    componentDidUpdate(prevProps: any, prevState: any) {
        if (this.state !== prevState) {
            this.props.updateCollection(this.state.collection);
        }
    }


    render() {
        return (
            <Form onSubmit={this.submitCheck}>
                <Row>
                    <Col>
                        Input your Collection details below. A Collection that contains less cards than required for the format will must be marked as a prototype. Include your commander in Brawl and Commander Collection lists, and mark the commander as the featured card.
                    </Col>
                </Row>
                <Row>
                    <Col md="6">
                        <CollectionInputTogglable
                            cardsCount={this.props.cardsCount}
                            // liveUpdateCardInputEnterKey={this.liveUpdateCardInputEnterKey}
                            liveUpdateCardInput={this.liveUpdateCardInput} />
                        <br className="d-md-block d-md-none" />
                    </Col>
                    <Col md="6">
                        <CollectionInputGroup
                            isPrivate={this.state.collection.isPrivate}
                            isPrototype={this.state.collection.isPrototype}
                            liveTogglePrivate={this.liveTogglePrivate}
                            liveTogglePrototype={this.liveTogglePrototype}
                            liveUpdateCollectionName={this.liveUpdateCollectionName}
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
                                placeholder={`Collection Description`}
                                onChange={this.liveUpdateDescription} />
                        </InputGroup>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Alert color="danger" isOpen={this.state.submissionAlertVisible} toggle={this.toggleSubmissionAlert}>
                            <ListGroupItemHeading className="bg-transparent border-0 p-0 pt-3">Submit failed!</ListGroupItemHeading>
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
                                color="dark">Submit</Button>
                        </ButtonGroup>
                    </Col>
                </Row>

            </Form>

        )
    }
}
