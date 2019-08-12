import React, { Component } from 'react'
import { connect } from 'react-redux'
import { IState } from '../../reducers';
import { Card, Container, Row, Col, CardHeader, CardBody, CardFooter, CardImgOverlay, CardImg, ListGroup, ListGroupItemHeading, ListGroupItem, Button, Spinner } from 'reactstrap';
import CardHover from '../card-hover/card.hover.component';

interface IDecklistState {
    keyIndex: number,
    isLoading: boolean,
    colors: string[],
    costColors: string[],
    cmcs: number[],
    sideboard: string[],
    sideboardCards: any[],
    deckList: string[],
    decklistCards: any[],
    deckListPopover: number[]
}

export class DecklistDisplay extends Component<{}, IDecklistState> {
    constructor(props: any) {
        super(props);

        this.state = {
            keyIndex: 0,
            isLoading: true,
            colors: [],
            costColors: [],
            cmcs: [],
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
            ],
            sideboard: [
                // "Sideboard(15)",
                "3x Kraul Harpooner",
                "2x Lyra Dawnbringer",
                "3x Negate",
                "3x Settle the Wreckage",
                "2x Shalai, Voice of Plenty",
                "2x Unbreakable Formation"
            ],
            decklistCards: [],
            sideboardCards: []
        }
    }

    getCardObjects = async () => {
        let cardObj: any[] = [];
        let sideboardObj: any[] = [];
        let cards = this.state.deckList;
        let sideboard = this.state.sideboard
        let deckColors: string[] = [], cmcs: number[] = [];
        for (let i = 0; i < cards.length; i++) {
            const cardNum = +cards[i].split('x')[0];
            const  cardName = cards[i].substring(cards[i].indexOf('x ') + 2);
            const resp = await fetch(`https://api.scryfall.com/cards/named?exact=${cardName}`);
            const card = await resp.json();

            const typeColorObj = this.setTypesAndDeckColors(card);

            const { supertypes, subtypes } = typeColorObj;

            deckColors = deckColors.concat(typeColorObj.deckColors)

            cmcs = cmcs.concat(this.setCMCs(supertypes, cardNum, card));

            cardObj.push({
                number: +cardNum,
                supertypes,
                subtypes,
                card
            });
        }

        for (let i = 0; i < sideboard.length; i++) {
            const cardNum = sideboard[i].split('x')[0];
            const cardName = sideboard[i].substring(sideboard[i].indexOf('x ') + 2);
            const resp = await fetch(`https://api.scryfall.com/cards/named?exact=${cardName}`);
            const card = await resp.json();
            const typeColorObj = this.setTypesAndDeckColors(card);

            const { supertypes, subtypes } = typeColorObj;

            sideboardObj.push({
                number: +cardNum,
                supertypes,
                subtypes,
                card
            });
        }

        let colors = this.setColors(deckColors);

        this.setState({
            colors,
            costColors: deckColors,
            cmcs,
            isLoading: false,
            decklistCards: cardObj,
            sideboardCards: sideboardObj
        })
    }

    setTypesAndDeckColors = (card: any) => {
        let types, supertypes, subtypes, deckColors: string[] = [];
        if (card.card_faces) {
            types = card.card_faces[0].type_line.split('—');
            supertypes = types[0].split(' ');
            if (types.length === 2) {
                subtypes = types[1].split(' ');
            }
            card.card_faces[0].colors.forEach((color: string) => {
                deckColors.push(color);
            });
        } else {
            types = card.type_line.split('—');
            supertypes = types[0].split(' ');
            if (types.length === 2) {
                subtypes = types[1].split(' ');
            }
            card.colors.forEach((color: string) => {
                deckColors.push(color);
            });
        }

        return {
            supertypes,
            subtypes,
            deckColors
        }
    }

    setCMCs = (supertypes: string[], cardNum: number, card: any) => {
        let cmcs = [];
        if (!supertypes.includes('Land')) {
            for (let i = 0; i < cardNum; i++) {
                cmcs.push(card.cmc);
            }
        }
        return cmcs;
    }

    setColors = (deckColors: string[]) => {
        let wubrg = ['W', 'U', 'B', 'R', 'G'];
        let colors: string[] = [];
        let run = 0;
        wubrg.forEach((color: string) => {
            if (deckColors.includes(color)) {
                if (run > 1) {
                    colors.unshift(color);
                } else {
                    colors.push(color);
                }
                run = 0
            } else {
                run++;
            }
        })

        return colors;
    }

    generateList = () => {
        let elements: any[] = [];
        let cards = this.state.decklistCards;
        for (let i = 0; i < cards.length; i++) {

            elements.push(<ListGroupItem className="bg-transparent border-0 p-0">{cards[i].number}x <CardHover id={i} card={cards[i].card} /></ListGroupItem>)
        }
        return elements;
    }

    generateSideboardList = () => {
        let elements: any[] = [];
        let cards = this.state.sideboardCards;
        for (let i = 0; i < cards.length; i++) {
            elements.push(<ListGroupItem className="bg-transparent border-0 p-0">{cards[i].number}x <CardHover id={`sb-${i}`} card={cards[i].card} /></ListGroupItem>)
        }
        return elements;
    }

    componentDidMount() {
        this.getCardObjects();
    }

    render() {
        let list, sideboardList;
        if (this.state.isLoading) {
            list = <Spinner />
            sideboardList = <Spinner />
        } else {
            list = this.generateList();
            sideboardList = this.generateSideboardList();
        }

        let cmcSum = 0, avgCmc = 0;
        if (!(this.state.cmcs.length === 0)) {
            for (let i = 0; i < this.state.cmcs.length; i++) {
                cmcSum += this.state.cmcs[i];
            }
            avgCmc = cmcSum / this.state.cmcs.length;
        }
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
                                    <Col xs="12" sm="6">
                                        <ListGroup className="bg-transparent">
                                            {list}
                                        </ListGroup>
                                    </Col>
                                    <Col xs="6">
                                        <ListGroup className="bg-transparent">
                                            {sideboardList}
                                        </ListGroup>
                                    </Col>
                                </Row>
                            </CardBody>
                            <CardFooter>
                                Color(s): {this.state.colors}, Avg CMC: {Math.round(100 * avgCmc) / 100}
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
