import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router';
import { Button, ButtonToolbar, Card, CardBody, CardFooter, CardHeader, Col, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, ListGroup, ListGroupItem, ListGroupItemHeading, Row, Spinner, CardImg, CardImgOverlay, CardTitle, CardText, CardSubtitle } from 'reactstrap';
import Collection from '../../models/collection';
import CardHover from '../card-hover/card.hover.component';
import { createHashHistory } from 'history';
import NumberFormat from 'react-number-format';


interface ICollectionlistDisplayCardComponentState {
    isLoading: boolean,
    colors: string[],
    costColors: string[],
    cmcs: number[],
    collectionListCards: any[],
    featuredCard: any[],
    cardTypes: string[],
    cardRarities: string[],
    cardColorCombos: string[],
    sortByDropdownIsOpen: boolean,
    sortBy: string,
     value: number[]
    // foilValue: number[]
}

interface ICollectionlistDisplayCardComponentProps extends RouteComponentProps {
    collection: Collection
    cards: any[],
    featuredCard: any,
    collectionList:any[]
}

export default class CollectionlistDisplayCardComponent extends Component<ICollectionlistDisplayCardComponentProps, ICollectionlistDisplayCardComponentState> {
    constructor(props: any) {
        super(props);

        this.state = {
            isLoading: true,
            colors: [],
            costColors: [],
            cmcs: [],
            collectionListCards: [],
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
            sortBy: 'Name',
             value: []
            // foilValue: []
        }
    }

    setCardObjects = () => {
        let cardObj: any[] = [];
        let cardList = this.props.collectionList;
       console.log('cdc'+cardList);
       console.log('cdc'+this.props.collectionList);
  
        let deckColors: string[] = [];
        let cmcs: number[] = [];
        let value: number[] = [];
        // let foilValue: number[] = [];

        for (let i = 0; i < cardList.length; i++) {
            const cardNum = cardList[i].number;
            const card = cardList[i].card;
            const typeColorObj = this.setTypesAndDeckColors(card);
            const { supertypes, subtypes } = typeColorObj;
            deckColors = deckColors.concat(typeColorObj.deckColors)
            cmcs = cmcs.concat(this.setCMCs(supertypes, cardNum, card));

            value = value.concat(this.setUsdValue(cardNum, card));
            // foilValue = foilValue.concat(this.setFoilValue(cardNum, card));

            cardObj.push({
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
            value,
            // foilValue,
            isLoading: false,
            collectionListCards: cardObj,

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

    setUsdValue = (cardNum: number, card: any) => {
        let val = [];

            if(card.prices.usd !== null){
                val.push(card.prices.usd * cardNum);
            }
            else{
                val.push(0)
            }
            
            
        
        return val;
    }

    // setFoilValue = (cardNum: number, card: any) => {
    //     let val = [];
       
    //         if(card.prices.usd_foil !== null){
    //             val.push(card.prices.usd_foil );
    //         }
    //         else{
    //             val.push(0)
    //         }
            
    //     return val;
    // }

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

    generateCollectionElements = () => {
        let elements: any[] = [];
        let cards = this.state.collectionListCards;
        let count = 0;
        for (let i = 0; i < cards.length; i++) {
            count += cards[i].number;
            elements.push(<ListGroupItem className="bg-transparent border-0 p-0">{cards[i].number}x <CardHover id={`mb-${i}`} card={cards[i].card} /></ListGroupItem>)
        }
        elements.unshift(<ListGroupItemHeading className="bg-transparent border-0 p-0 pt-3">{`Collection (${count})`}</ListGroupItemHeading>);
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
            console.log(listElement);
            elements = elements.concat(listElement);
            console.log(elements);
        })
        return elements;
    }

    generateListsSortByColor = () => {
        let cardLists: any[] = [];
        let cards: any = []
        cards = cards.concat(this.state.collectionListCards);
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
                console.log(`${cards[i].card.name}, ${cardColorComboArr}, ${cardColorCombo}`)
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
        cards = cards.concat(this.state.collectionListCards);
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
        cards = cards.concat(this.state.collectionListCards);
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
        cards = cards.concat(this.state.collectionListCards);
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
        let list;
        if (this.state.isLoading) {
            list = <Spinner />
        } else {
            list = this.generateCollectionElements();
        }

        return {
            list
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
                if (!this.state.isLoading) {
                    list = this.generateCollectionElements();
                }
        }
        return list;
    }

    mapFeaturedCard = () => {
        let featuredCard: any[] = []
        if (this.props.featuredCard) {
            featuredCard.push(
                <Col>
                    <Card>
                        <CardImg width="100%" src={this.props.featuredCard.image_uris.art_crop} alt="Card image cap" />
                        <CardFooter className="bg-dark p-0 d-flex justify-content-end">
                            <small className="text-muted">Artist: {this.props.featuredCard.artist}</small>
                        </CardFooter>
                    </Card>
                </Col>
            )
        }
        return featuredCard;
    }

    componentDidUpdate(prevProps: any, prevState: any) {
        if (this.props !== prevProps) {
            this.setCardObjects()
        }
    }

    render() {
        let { list} = this.getSpinner();

        list = this.getList();

        const avgCmc = this.getAverageCMC();

        let usdSum = 0;
        if (!(this.state.value.length === 0)) {
            for (let i = 0; i < this.state.value.length; i++) {
                usdSum += +this.state.value[i];
            }
        }

        return (
            <Card className="bg-light">
                <CardHeader>
                    <Row>
                        {this.mapFeaturedCard()}
                        <Col>
                            <Card className="bg-dark h-100">
                                <CardBody className="d-flex flex-column justify-content-end">
                                    <CardTitle>{this.props.collection.collectionName}</CardTitle>
                                    <CardText>
                                    <small>Color(s): {this.state.colors}, Avg CMC: {Math.round(100 * avgCmc) / 100}</small>
                                    <small>collection <NumberFormat value={usdSum.toFixed(2)}  displayType={'text'}  prefix={'$'} /></small>
                                    </CardText>
                                    <CardText>
                                    <small>Your Collections Value in USD <NumberFormat value={usdSum.toFixed(2)}  displayType={'text'}  prefix={'$'} /></small>
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
                        <Button size="sm" className="bg-dark" onClick={() => this.props.history.push('collection/update', this.props.collection)}>
                            Update deck
                        </Button>
                    </ButtonToolbar>

                    <Row>
                        <Col xs="12" sm="6">
                            <ListGroup className="bg-transparent">
                                {list}
                            </ListGroup>
                        </Col>
                        <Col xs="6">
                            <ListGroup className="bg-transparent">
                            
                            </ListGroup>
                        </Col>
                    </Row>
                </CardBody>
            </Card>
        )
    }
}