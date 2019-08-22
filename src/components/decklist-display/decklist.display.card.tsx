import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router';
import { Button, ButtonToolbar, Card, CardBody, CardFooter, CardHeader, Col, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, ListGroup, ListGroupItem, ListGroupItemHeading, Row, Spinner, CardImg, CardImgOverlay, CardTitle, CardText } from 'reactstrap';
import Deck from '../../models/deck';
import CardHover from '../card-hover/card.hover.component';
import User from '../../models/user.model';

interface IDecklistDisplayCardComponentState {

    isLoading: boolean
    colors: string[]
    costColors: string[]
    cmcs: number[]
    sideboardCards: any[]
    mainboardCards: any[]
    featuredCard: any[]
    cardTypes: string[]
    cardRarities: string[]
    cardColorCombos: string[]
    sortByDropdownIsOpen: boolean
    sortBy: string
}

interface IDecklistDisplayCardComponentProps extends RouteComponentProps {
    deck: Deck
    loggedInUser?: User
    mainboardCards: any[]
    sideboardCards: any[]
    featuredCard: any
}

export default class DecklistDisplayCardComponent extends Component<IDecklistDisplayCardComponentProps, IDecklistDisplayCardComponentState> {
    constructor(props: any) {
        super(props);

        this.state = {
            isLoading: true,
            colors: [],
            costColors: [],
            cmcs: [],
            mainboardCards: [],
            sideboardCards: [],
            featuredCard: [],
            cardTypes: [
                "Land",
                "Creature",
                "Artifact",
                "Enchantment",
                "Planeswalker",
                "Instant",
                "Sorcery"
            ],
            cardRarities: [
                "Common",
                "Uncommon",
                "Rare",
                "Mythic"
            ],
            cardColorCombos: [
                "W",
                "U",
                "B",
                "R",
                "G",
                "WU",
                "UB",
                "BR",
                "RG",
                "GW",
                "WB",
                "UR",
                "BG",
                "RW",
                "GU",
                "WUB",
                "UBR",
                "BRG",
                "RGW",
                "GWU",
                "WRU",
                "UGB",
                "BWR",
                "RUG",
                "GBW",
                "WUBR",
                "UBRG",
                "BRGW",
                "RGWU",
                "GWUB",
                "WUBRG",
                ""
            ],
            sortByDropdownIsOpen: false,
            sortBy: 'Name'
        }
    }

    setCardObjects = () => {
        let cardObj: any[] = [];
        let sideboardObj: any[] = [];
        let mainboard = this.props.mainboardCards;
        let sideboard = this.props.sideboardCards;
        let deckColors: string[] = [];
        let cmcs: number[] = [];

        for (let i = 0; i < mainboard.length; i++) {
            const cardNum = mainboard[i].number;
            const card = mainboard[i].card;
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
            const cardNum = sideboard[i].number;
            const card = sideboard[i].card;
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
            mainboardCards: cardObj,
            sideboardCards: sideboardObj
        })
    }

    setTypesAndDeckColors = (card: any) => {
        let types, supertypes, subtypes, deckColors: string[] = [];
        if (card.layout === "transform") {
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

    setColors = (colorArr: string[]) => {
        let wubrg = ['W', 'U', 'B', 'R', 'G'];
        let colors: string[] = [];
        let run = 0;
        wubrg.forEach((color: string) => {
            if (colorArr.includes(color)) {
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

    generateMainboardElements = () => {
        let elements: any[] = [];
        let cards = this.state.mainboardCards;
        let count = 0;
        for (let i = 0; i < cards.length; i++) {
            count += cards[i].number;
            elements.push(<ListGroupItem className="bg-transparent border-0 p-0">{cards[i].number}x <CardHover id={`mb-${i}`} card={cards[i].card} /></ListGroupItem>)
        }
        elements.unshift(<ListGroupItemHeading className="bg-transparent border-0 p-0 pt-3">{`Mainboard (${count})`}</ListGroupItemHeading>);
        return elements;
    }

    generateSideboardElements = () => {
        let elements: any[] = [];
        let cards = this.state.sideboardCards;
        let count = 0;
        for (let i = 0; i < cards.length; i++) {
            count += cards[i].number;
            elements.push(<ListGroupItem className="bg-transparent border-0 p-0">{cards[i].number}x <CardHover id={`sb-${i}`} card={cards[i].card} /></ListGroupItem>)
        }
        elements.unshift(<ListGroupItemHeading className="bg-transparent border-0 p-0 pt-3">{`Sideboard (${count})`}</ListGroupItemHeading>);
        return elements;
    }

    generateElementsFromList = (lists: any[]) => {
        let elements: any[] = [];
        let count = 0;
        lists.forEach((list) => {
            let listElement: any[] = [];
            count = 0;
            if (!(list.cardList.length === 0)) {
                for (let i = 0; i < list.cardList.length; i++) {
                    count += list.cardList[i].number;
                    listElement.push(<ListGroupItem className="bg-transparent border-0 p-0">{list.cardList[i].number}x <CardHover id={`${list.header}-${i}`} card={list.cardList[i].card} /></ListGroupItem>);
                }
                listElement.unshift(<ListGroupItemHeading className="bg-transparent border-0 p-0 pt-3">{`${(list.header === 7) ? `${list.header}+` : list.header} (${count})`}</ListGroupItemHeading>);
            }

            elements = elements.concat(listElement);
        })
        return elements;
    }

    generateListsSortByColor = () => {
        let cardLists: any[] = [];
        let cards: any = []
        cards = cards.concat(this.state.mainboardCards);
        const cardColors = this.state.cardColorCombos;
        cardColors.forEach((combo: string) => {
            let cardList: any[] = [];
            for (let i = 0; i < cards.length; i++) {
                let cardColorComboArr: string[];
                let cardColorCombo: string;
                if (cards[i].card.layout === "transform") {
                    cardColorComboArr = this.setColors(cards[i].card.card_faces[0].colors)
                } else {
                    cardColorComboArr = this.setColors(cards[i].card.colors)
                }
                cardColorCombo = cardColorComboArr.join('');
                if (combo === cardColorCombo) {
                    cardList.push(cards.splice(i, 1)[0]);
                    i--;
                }
            }
            cardLists.push({
                header: (combo) ? combo : "C",
                cardList
            })
        })
        return cardLists;
    }

    generateListsSortByType = () => {
        let cardLists: any[] = [];
        let cards: any = []
        cards = cards.concat(this.state.mainboardCards);
        const cardTypes = this.state.cardTypes;
        cardTypes.forEach((type: string) => {
            let cardList: any[] = [];
            for (let i = 0; i < cards.length; i++) {
                if (cards[i].supertypes.includes(type)) {
                    cardList.push(cards.splice(i, 1)[0]);
                    i--;
                }
            }
            cardLists.push({
                header: type,
                cardList
            })
        })
        return cardLists;
    }

    generateListsSortByCMC = () => {
        let cardLists: any[] = [];
        let cards: any = []
        cards = cards.concat(this.state.mainboardCards);
        const cardCMCs = [0, 1, 2, 3, 4, 5, 6, 7];
        cardCMCs.forEach((cmc: number) => {
            let cardList: any[] = [];
            for (let i = 0; i < cards.length; i++) {
                if (cards[i].card.cmc === cmc) {
                    cardList.push(cards.splice(i, 1)[0]);
                    i--;
                } else if (cmc === 7 && cards[i].card.cmc > 7) {
                    cardList.push(cards.splice(i, 1)[0]);
                    i--;
                }
            }
            cardLists.push({
                header: cmc,
                cardList
            })
        })
        return cardLists;
    }

    generateListsSortByRarity = () => {
        let cardLists: any[] = [];
        let cards: any = []
        cards = cards.concat(this.state.mainboardCards);
        const cardRarities = this.state.cardRarities;
        cardRarities.forEach((rarity: string) => {
            let cardList: any[] = [];
            for (let i = 0; i < cards.length; i++) {
                if (cards[i].card.rarity === rarity.toLowerCase()) {
                    cardList.push(cards.splice(i, 1)[0]);
                    i--;
                }
            }
            cardLists.push({
                header: rarity,
                cardList
            })
        })
        return cardLists;
    }

    getAverageCMC = () => {
        let cmcSum = 0, avgCmc = 0;
        if (!(this.state.cmcs.length === 0)) {
            for (let i = 0; i < this.state.cmcs.length; i++) {
                cmcSum += this.state.cmcs[i];
            }
            avgCmc = cmcSum / this.state.cmcs.length;
        }
        return avgCmc;
    }

    getSpinner = () => {
        let list, sideboardList;
        if (this.state.isLoading) {
            list = <Spinner />
            sideboardList = <Spinner />
        } else {

            list = this.getList();
            sideboardList = this.generateSideboardElements();
        }

        return {
            list,
            sideboardList
        }
    }

    toggleSortByDropdown = () => {
        this.setState({
            sortByDropdownIsOpen: !this.state.sortByDropdownIsOpen
        })
    }

    setSortBy = (event: React.MouseEvent<HTMLButtonElement>) => {
        this.setState({
            sortBy: event.currentTarget.innerText
        })
    }

    getList = () => {
        let list: any[] = [];
        if (!this.state.isLoading) {
            switch (this.state.sortBy) {
                case "Color":
                    list = this.generateElementsFromList(this.generateListsSortByColor());
                    break;
                case "Rarity":
                    list = this.generateElementsFromList(this.generateListsSortByRarity());
                    break;
                case "CMC":
                    list = this.generateElementsFromList(this.generateListsSortByCMC());
                    break;
                case "Type":
                    list = this.generateElementsFromList(this.generateListsSortByType());
                    break;
                default:
                    list = this.generateMainboardElements();
            }
        }
        return list;
    }

    getImageURI = () => {
        const card = this.props.featuredCard;
        let cardImageUri: string = '';

        if (card.layout === "transform") {
            cardImageUri = card.card_faces[0].image_uris.art_crop;
        } else {
            cardImageUri = card.image_uris.art_crop;
        }

        return cardImageUri;
    }

    mapFeaturedCard = () => {
        let featuredCard: any[] = []
        const imgURI = this.getImageURI();
        if (this.props.featuredCard) {
            featuredCard.push(
                <Col>
                    <Card>
                        <CardHeader className="bg-dark p-0">
                            <small className="text-muted">{this.props.featuredCard.name}</small>
                        </CardHeader>
                        <CardImg width="100%" src={imgURI} alt="Card image cap" />
                        <CardFooter className="bg-dark p-0 d-flex justify-content-end">
                            <small className="text-muted">Artist: {this.props.featuredCard.artist}</small>
                        </CardFooter>
                    </Card>
                </Col>
            )
        }
        this.setState({
            featuredCard
        })
    }

    componentDidUpdate(prevProps: any, prevState: any) {
        if (this.props.featuredCard !== prevProps.featuredCard) {
            this.mapFeaturedCard();
        }
        if (this.props.mainboardCards !== prevProps.mainboardCards) {
            this.setCardObjects();
        }
    }

    render() {
        let { list, sideboardList } = this.getSpinner();

        const avgCmc = this.getAverageCMC();

        return (
            <Card className="bg-light">
                <CardHeader>
                    <Row>
                        {this.state.featuredCard}
                        <Col>
                            <Card className="bg-dark h-100">
                                <CardBody className="d-flex flex-column justify-content-end">
                                    <CardTitle>{this.props.deck.deckName}</CardTitle>
                                    <CardText>
                                        {[<><small>Deck author: {this.props.deck.author.username}</small><br/></>]}
                                        {(this.props.deck.isPrivate) ? [<><small>Private</small><br/></>] : ''}
                                        {(this.props.deck.isPrototype) ? [<><small>Prototype</small><br/></>] : ''}
                                        <><small>{`Format: ${this.props.deck.format.format}`}</small><br/></>
                                        <><small>Color(s): {this.state.colors}, Avg CMC: {Math.round(100 * avgCmc) / 100}</small><br/></>
                                    </CardText>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </CardHeader>
                <CardBody>
                    <ButtonToolbar className="d-flex justify-content-between">
                        <Dropdown size="sm" isOpen={this.state.sortByDropdownIsOpen} toggle={this.toggleSortByDropdown}>
                            <DropdownToggle className="bg-dark" caret>
                                {`Sort by${(this.state.sortBy === '') ? `?` : ` ${this.state.sortBy}`}`}
                            </DropdownToggle>
                            <DropdownMenu className="bg-dark">
                                <DropdownItem className="bg-dark" header>Sort by</DropdownItem>
                                <DropdownItem className="bg-dark text-light" onClick={this.setSortBy}>Name</DropdownItem>
                                <DropdownItem className="bg-dark text-light" onClick={this.setSortBy}>Type</DropdownItem>
                                <DropdownItem className="bg-dark text-light" onClick={this.setSortBy}>CMC</DropdownItem>
                                <DropdownItem className="bg-dark text-light" onClick={this.setSortBy}>Rarity</DropdownItem>
                                <DropdownItem className="bg-dark text-light" onClick={this.setSortBy}>Color</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                        {(this.props.loggedInUser && this.props.loggedInUser.username === this.props.deck.author.username) ? [
                            <Button size="sm" className="bg-dark" onClick={() => this.props.history.push(`/deck/${this.props.deck.id}/update`, this.props.deck)}>
                                Update deck
                            </Button>
                        ] : ''}

                    </ButtonToolbar>

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
                    Description:
                    <br/>
                    {this.props.deck.deckDescription}
                </CardFooter>
            </Card>
        )
    }
}