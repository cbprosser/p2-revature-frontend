import React, { Component } from 'react'
import { connect } from 'react-redux'
import { IState } from '../../reducers';
import { Container, Row, Col, Card, CardHeader, CardBody, ListGroup, CardFooter, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Label, FormGroup, CustomInput } from 'reactstrap';
import Deck from '../../models/deck';
import User from '../../models/user.model';

interface IDecklistSubmissionState {
    deck: Deck,
    sideboard: Deck
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
                format: 'Casual',
                cards: [],
                featuredCard: ''
            },
            sideboard: {
                id: 0,
                author: new User(0, 'cbprosser'),
                deckName: 'New Sideboard',
                deckDescription: '',
                isPrivate: false,
                isPrototype: true,
                format: 'Casual',
                cards: [],
                featuredCard: ''
            }
        }
    }

    render() {
        return (
            <Container fluid>
                <Row>
                    <Col sm="3" md="2" className="d-none d-sm-none d-sm-block"></Col>
                    <Col id="main-row" className="bg-light text-center">
                        <Card className="bg-light">
                            <CardHeader>
                                {this.state.deck.deckName}
                            </CardHeader>
                            <CardBody>
                                <Form>
                                    <Row>
                                        <Col md="6">
                                            <InputGroup size="sm">
                                                <InputGroupAddon className="bg-dark text-light" addonType="prepend">
                                                    <InputGroupText className="bg-dark text-light">Deck Name</InputGroupText>
                                                </InputGroupAddon>
                                                <Input className="bg-dark text-light" type="text" id="deckNameInput" />
                                            </InputGroup>
                                            <br />
                                            <InputGroup size="sm">
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText className="bg-dark text-light">
                                                        <Input addon type="checkbox" id="privateDeckInput" />
                                                    </InputGroupText>
                                                </InputGroupAddon>
                                                <Input className="bg-dark text-light" placeholder="Private Deck?" disabled />
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText className="bg-dark text-light">
                                                        <Input addon type="checkbox" id="prototypeDeckInput" />
                                                    </InputGroupText>
                                                </InputGroupAddon>
                                                <Input className="bg-dark text-light" placeholder="Prototype Deck?" disabled />
                                            </InputGroup>
                                            <br />
                                            <InputGroup size="sm">
                                                <InputGroupAddon className="bg-dark text-light" addonType="prepend">
                                                    <InputGroupText className="bg-dark text-light">Format</InputGroupText>
                                                </InputGroupAddon>
                                                <CustomInput className="bg-dark text-light" type="select" id="formatSelectInput">
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
                                            <br />
                                            <InputGroup size="sm">
                                                <InputGroupAddon className="bg-dark text-light" addonType="prepend">
                                                    <InputGroupText className="bg-dark text-light">Featured Card</InputGroupText>
                                                </InputGroupAddon>
                                                <Input className="bg-dark text-light" type="text" id="featuredCardInput" />
                                            </InputGroup>
                                            <br className="d-md-block d-md-none" />
                                        </Col>
                                        <Col md="6">
                                            <Label for="deckListInput">Cards</Label>
                                            <InputGroup size="sm">
                                                <Input className="bg-dark text-light" type="textarea" id="deckListInput" rows={6} />
                                            </InputGroup>
                                        </Col>
                                    </Row>
                                </Form>
                            </CardBody>
                            <CardFooter>
                                {this.state.deck.author.username}
                            </CardFooter>
                        </Card>
                    </Col>
                    <Col className="col-2 d-none d-sm-none d-md-block"></Col>
                </Row>
            </Container>
        )
    }
}

const mapStateToProps = (state: IState) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(DecklistSubmission
)
