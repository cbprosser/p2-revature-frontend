import React, { Component } from 'react'
import { connect } from 'react-redux'
import { IState } from '../../reducers';
import { Card, Container, Row, Col, CardHeader, CardBody, CardFooter, CardImgOverlay, CardImg, ListGroup, ListGroupItemHeading, ListGroupItem, Button } from 'reactstrap';
import CardHover from '../card-hover/card.hover.component';

interface IDecklistState {
    deckList: string[],
    deckListPopover: number[]
}

export class DecklistDisplay extends Component<{}, IDecklistState> {
    constructor(props: any) {
        super(props);

        this.state = {
            deckListPopover: [],
            deckList: [
                // "Land (23)",
                "1x Arch of Orazca",
                "4x Breeding Pool",
                "1x Field of Ruin",
                "2x Forest",
                "1x Hallowed Fountain",
                "4x Hinterland Harbor",
                "1x Island",
                "1x Plains",
                "4x Sunpetal Grove",
                "4x Temple Garden",
                // "Creature(30)",
                "4x Galloping Lizrog",
                "4x Growth-Chamber Guardian",
                "4x Hydroid Krasis",
                "4x Incubation Druid",
                "4x Jadelight Ranger",
                "3x Knight of Autumn",
                "4x Merfolk Branchwalker",
                "3x Wildgrowth Walker",
                // "Enchantment(7)",
                "4x Hadana's Climb",
                "3x Simic Ascendancy",
                // "Sideboard(15)",
                // "3x Kraul Harpooner",
                // "2x Lyra Dawnbringer",
                // "3x Negate",
                // "3x Settle the Wreckage",
                // "2x Shalai, Voice of Plenty",
                // "2x Unbreakable Formation"
            ]
        }
    }

    generateList = () => {
        let elements: any[] = [];
        let cards = this.state.deckList;
        for (let i = 0; i < cards.length; i++) {
            let cardNum = cards[i].split('x')[0];
            let cardName = cards[i].substring(cards[i].indexOf('x ') + 2)
            // if (+cardNum === NaN) {
            //     headings.push(heading);
            // }
            console.log(`${cardNum}x ${cardName}`);
            elements.push(<ListGroupItem className="bg-transparent border-0 p-0">{cardNum}x <CardHover id={i} cardName={cardName} /></ListGroupItem>)
        }
        return elements;
    }

    render() {
        return (
            <Container fluid>
                <Row>
                    <Col sm="3" md="2" className="d-none d-sm-none d-sm-block"></Col>
                    <Col id="main-row" className="bg-light text-center">
                        <Card className="bg-light">
                            <CardHeader>
                                Simic Ascendancy Standard
                            </CardHeader>

                            <CardBody>
                                <Row>
                                    <Col>
                                        <ListGroup className="bg-transparent">
                                            {this.generateList()}
                                        </ListGroup>
                                    </Col>
                                </Row>
                            </CardBody>
                            <CardFooter>
                                Color: GU, Avg CMC: 2.62
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

export default connect(mapStateToProps, mapDispatchToProps)(DecklistDisplay)
