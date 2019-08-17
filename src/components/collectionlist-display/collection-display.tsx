import React, { Component } from 'react'
import { connect } from 'react-redux'
import { IState } from '../../reducers';
import { Card, Container, Row, Col, CardHeader, CardBody, CardFooter, CardImgOverlay, CardImg, ListGroup, ListGroupItemHeading, ListGroupItem, Button, Spinner } from 'reactstrap';
import CardHover from '../card-hover/card.hover.component';
import NumberFormat from 'react-number-format';
import { number } from 'prop-types';

interface IDecklistState {
    keyIndex: number,
    isLoading: boolean,
    colors: string[],
    costColors: string[],
    cmcs: number[],
    value: number[],
    foilValue: number[],
    sideboard: string[],
    sideboardCards: any[],
    collectionList: string[],
    collectionlistCards: any[],
    collectionListPopover: number[]
    cardTypes: string[]
}

export class CollectionListDisplay extends Component<{}, IDecklistState> {
    constructor(props: any) {
        super(props);

        this.state = {
            keyIndex: 0,
            isLoading: true,
            colors: [],
            costColors: [],
            cmcs: [],
            value: [],
            foilValue: [],
            collectionListPopover: [],
            collectionList: [
                "2x Act of Treason",
                "2x Adamant Will",
                "2x Adanto Vanguard",
                "2x Aegis of the Heavens",
                "2x Aerial Assault",
                "2x Aesthir Glider",
                "2x Aethershield Artificer",
                "2x Ahn-Crop Invader",
                "2x Ajani, Adversary of Tyrants",
                "2x Ajani, Inspiring Leader",
                "2x Ajani's Influence",
                "2x Ajani's Last Stand",
                "2x Ajani's Pridemate",
                "2x Ajani, Strength of the Pride",
                "2x Ajani's Welcome",
                "2x Ajani, Wise Counselor",
                "2x Alpine Moon",
                "2x Amaranthine Wall",
                "2x Amplifire",
                "2x Amulet of Safekeeping",
                "2x Ancestral Blade",
                "2x Angelic Exaltation",
                "2x Angelic Gift",
                "2x Angelic Guardian",
                "2x Angel of Grace",
                "2x Angel of the Dawn",
                "2x Angel of Vitality",
                "2x Angrath's Marauders",
                "2x Anvilwrought Raptor",
                "2x Apex of Power",
                "2x Apostle of Purifying Light",
                "2x Arcane Encyclopedia",
                "2x Arch of Orazca",
                "2x Archway Angel",
                "2x Arclight Phoenix",
                "2x Arguel's Blood Fast // Temple of Aclazotz",
                "2x Arrester's Zeal",
                "2x Ashes of the Abhorrent",
                "2x Aurelia, Exemplar of Justice",
                "2x Aven Sentry",
                "2x Awakened Amalgam",
                "2x Axis of Mortality",
                "2x Azorius Guildgate",
                "2x Azorius Locket",
                "2x Azor's Gateway // Sanctum of the Sun",
                "2x Baffling End",
                "2x Bag of Holding",
                "2x Baird, Steward of Argive",
                "2x Banefire",
                "2x Barging Sergeant",
                "2x Bastion Enforcer",
                "2x Battalion Foot Soldier",
                "2x Battlefield Promotion",
                "2x Bellowing Aegisaur",
                "2x Benalish Honor Guard",
                "2x Benalish Marshal",
                "2x Bishop of Binding",
                "2x Bishop of Rebirth",
                "2x Bishop of Wings",
                "2x Bishop's Soldier",
                "2x Blackblade Reforged",
                "2x Blade Instructor",
                "2x Blast Zone",
                "2x Blazing Hope",
                "2x Blessed Light",
                "2x Blindblast",
                "2x Blood Crypt",
                "2x Bloodfell Caves",
                "2x Bloodstone Goblin",
                "2x Blood Sun",
                "2x Bloodtallow Candle",
                "2x Blossoming Sands",
                "2x Board the Weatherlight",
                "2x Boggart Brute",
                "2x Bolt Bend",
                "2x Bombard",
                "2x Bonded Horncrest",
                "2x Bond of Discipline",
                "2x Bond of Passion",
                "2x Book Devourer",
                "2x Boros Challenger",
                "2x Boros Guildgate",
                "2x Boros Locket",
                "2x Bounty Agent",
                "2x Brass's Bounty",
                "2x Brazen Buccaneers",
                "2x Brazen Freebooter",
                "2x Breeding Pool",
                "2x Bright Reprisal",
                "2x Bring to Trial",
                "2x Brought Back",
                "2x Buccaneer's Bravado",
                "2x Bulwark Giant",
                "2x Burn Bright",
                "2x Burning Prophet",
                "2x Burning Sun's Avatar",
                "2x Burning-Tree Vandal",
                "2x Cabal Stronghold",
                "2x Call the Cavalry",
                "2x Candlelight Vigil",
                "2x Captain Lannery Storm",
                "2x Captain's Hook",
                "2x Captivating Crew",
                "2x Catalyst Elemental",
                "2x Cavalcade of Calamity",
                "2x Cavalier of Dawn",
                "2x Cavalier of Flame",
                "2x Cavalry Drillmaster",
                "2x Chainwhip Cyclops",
                "2x Chamber Sentry",
                "2x Champion of the Flame",
                "2x Chance for Glory",
                "2x Chandra, Acolyte of Flame",
                "2x Chandra, Awakened Inferno",
                "2x Chandra, Bold Pyromancer",
                "2x Chandra, Fire Artisan",
                "2x Chandra, Flame's Fury",
                "2x Chandra, Novice Pyromancer",
                "2x Chandra's Embercat",
                "2x Chandra's Flame Wave",
                "2x Chandra's Outburst",
                "2x Chandra's Outrage",
                "2x Chandra's Pyrohelix",
                "2x Chandra's Regulator",
                "2x Chandra's Spitfire",
                "2x Chandra's Triumph",
                "2x Chaos Wand",
                "2x Charge",
                "2x Charging Monstrosaur",
                "2x Charging Tuskodon",
                "2x Charmed Stray",
                "2x Chromatic Lantern",
                "2x Cinder Barrens",
                "2x Citywide Bust",
                "2x Civic Stalwart",
                "2x Clamor Shaman",
                "2x Cleansing Nova",
                "2x Cleansing Ray",
                "2x Clifftop Retreat",
                "2x Cobbled Wings",
                "2x Collar the Culprit",
                "2x Colossus Hammer",
                "2x Command the Storm",
                "2x Conclave Tribunal",
                "2x Concordia Pegasus",
                "2x Conqueror's Galleon // Conqueror's Foothold",
                "2x Cosmotronic Wave",
                "2x Court Cleric",
                "2x Crash Through",
                "2x Crucible of Worlds",
                "2x Crush Contraband",
                "2x Cryptic Caves",
                "2x Cyclops Electromancer",
                "2x Dagger Caster",
                "2x Daggersail Aeronaut",
                "2x Damping Sphere",
                "2x Danitha Capashen, Paragon",
                "2x Daring Archaeologist",
                "2x Daring Buccaneer",
                "2x Dark-Dweller Oracle",
                "2x Dauntless Bodyguard",
                "2x D'Avenant Trapper",
                "2x Dawning Angel",
                "2x Dawn of Hope",
                "2x Daybreak Chaplain",
                "2x Deafening Clarion",
                "2x Deface",
                "2x Defiant Strike",
                "2x Demanding Dragon",
                "2x Demolish",
                "2x Demotion",
                "2x Demystify",
                "2x Desecrated Tomb",
                "2x Desperate Lunge",
                "2x Destructive Digger"
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
            collectionlistCards: [],
            sideboardCards: [],
            cardTypes: [
                "Land",
                "Creature",
                "Artifact",
                "Enchantment",
                "Planeswalker",
                "Instant",
                "Sorcery"
            ]
        }
    }


    getCardObjects = async () => {
        let cardObj: any[] = [];
        let sideboardObj: any[] = [];
        let cards = this.state.collectionList;
        let sideboard = this.state.sideboard
        let deckColors: string[] = [], cmcs: number[] = [];
        let value: number[] = [];
        let foilValue: number[] = [];
        for (let i = 0; i < cards.length; i++) {
            const cardNum = +cards[i].split('x')[0];
            const cardName = cards[i].substring(cards[i].indexOf('x ') + 2);
            const resp = await fetch(`https://api.scryfall.com/cards/named?exact=${cardName}`);
            const card = await resp.json();
            const typeColorObj = this.setTypesAndDeckColors(card);
            const { supertypes, subtypes } = typeColorObj;
            deckColors = deckColors.concat(typeColorObj.deckColors)
            cmcs = cmcs.concat(this.setCMCs(supertypes, cardNum, card));

            value = value.concat(this.setUsdValue(cardNum, card));
            foilValue = foilValue.concat(this.setFoilValue(cardNum, card));

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
            value,
            foilValue,
            isLoading: false,
            collectionlistCards: cardObj,
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

    setFoilValue = (cardNum: number, card: any) => {
        let val = [];
       
            if(card.prices.usd_foil !== null){
                val.push(card.prices.usd_foil );
            }
            else{
                val.push(0)
            }
            
        return val;
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

    generateList = (lists: any[]) => {
        // console.log(lists)
        let elements: any[] = [];
        lists.forEach((list) => {
            console.log(list)
            if (!(list.cardList.length === 0)) {
                elements.push(<ListGroupItemHeading className="bg-transparent border-0 p-0 pt-3">{`${list.type} (${list.cardList.length})`}</ListGroupItemHeading>);
                for (let i = 0; i < list.cardList.length; i++) {
                    elements.push(<ListGroupItem className="bg-transparent border-0 p-0">{list.cardList[i].number}x <CardHover id={`${list.type}-${i}`} card={list.cardList[i].card} /></ListGroupItem>);
                }
            }
        })
        return elements;
    }

    generateSideboardList = () => {
        let elements: any[] = [];
        let cards = this.state.sideboardCards;
        elements.push(<ListGroupItemHeading className="bg-transparent border-0 p-0 pt-3">{`Sideboard (${cards.length})`}</ListGroupItemHeading>);
        for (let i = 0; i < cards.length; i++) {
            elements.push(<ListGroupItem className="bg-transparent border-0 p-0">{cards[i].number}x <CardHover id={`sb-${i}`} card={cards[i].card} /></ListGroupItem>)
        }
        return elements;
    }

    generateTypedLists = () => {
        let cardLists: any[] = [];
        let cards = this.state.collectionlistCards;
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
                type,
                cardList
            })
        })
        return cardLists;
    }


    generateRarityLists = () => {
        let cardLists: any[] = [];
        let cards = this.state.collectionlistCards;
        const cardRarity = this.state.cardTypes;
        cardRarity.forEach((rarity: string) => {
            let cardList: any[] = [];
            for (let i = 0; i < cards.length; i++) {
                if (cards[i].supertypes.includes(rarity)) {
                    cardList.push(cards.splice(i, 1)[0]);
                    i--;
                }
            }
            cardLists.push({
                rarity,
                cardList
            })
        })
        return cardLists;
    }

    componentDidMount() {
        this.getCardObjects();
    }

    render() {
        let list, sideboardList, lists;
        if (this.state.isLoading) {
            list = <Spinner />
            sideboardList = <Spinner />
        } else {
            lists = this.generateTypedLists();
            list = this.generateList(lists);
            sideboardList = this.generateSideboardList();
        }

        let cmcSum = 0, avgCmc = 0;
        if (!(this.state.cmcs.length === 0)) {
            for (let i = 0; i < this.state.cmcs.length; i++) {
                cmcSum += this.state.cmcs[i];
            }
            avgCmc = cmcSum / this.state.cmcs.length;
        }

        let usdSum = 0;
        if (!(this.state.value.length === 0)) {
            for (let i = 0; i < this.state.value.length; i++) {
                usdSum += +this.state.value[i];
            }
        }

        let foilSum = 0;
        if (!(this.state.foilValue.length === 0)) {
            for (let i = 0; i < this.state.foilValue.length; i++) {
                
                foilSum = foilSum +  +this.state.foilValue[i];
          
            }
        }


        return (
            <Container fluid>
                <Row>
                    <Col sm="3" md="2" className="d-none d-sm-none d-sm-block"></Col>
                    <Col id="main-row" className="bg-light text-center">
                        <Card className="bg-light">
                            <CardHeader>
                                Your Collection
                            </CardHeader>

                            <CardBody>
                                <Row>
                                    <Col xs="2" sm="3">
                                        <p>Rarity</p>
                                        <p>Mythic</p>
                                        <p>Rare</p>
                                        <p>Common</p>
                                        <p>Uncommon</p>
                                        <p>Total Value</p>
                                    </Col>
                                    <Col xs="4" sm="3">
                                        
                                    
                                        <p>All</p>
                                        <p>6</p>
                                        <p>Qty</p>
                                        <p>Qty</p>
                                        <p>qty</p>
                                        <p><NumberFormat value={usdSum.toFixed(2)}  displayType={'text'}  prefix={'$'} /></p>
                                    </Col>
                                    <Col xs="4" sm="3">
                                        <p>Foil</p>
                                        <p>Qty</p>
                                        <p>Qty</p>
                                        <p>Qty</p>
                                        <p>Qty </p>
                                        <p><NumberFormat value={foilSum.toFixed(2)}  displayType={'text'}  prefix={'$'} /></p>
                                    </Col>
                                </Row>
                            </CardBody>


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

export default connect(mapStateToProps, mapDispatchToProps)(CollectionListDisplay)
