import React, { Component } from 'react'
import Collection from '../../models/collection';
import User from '../../models/user.model';
import CollectionlistDisplayCardComponent from './collection-display-card-component';
import { RouteComponentProps } from 'react-router';
import { tdClient } from '../../axios/td-client';

interface ICollectionlistDisplayPageComponentState {
    collection: Collection,
    cards: any[],
    collectionList:any[],
    featuredCard: any
}

interface ICollectionlistDisplayPageComponentProps extends RouteComponentProps {}

export default class CollectionlistDisplayPageComponent extends Component<ICollectionlistDisplayPageComponentProps, ICollectionlistDisplayPageComponentState> {
    constructor(props: any) {
        super(props);

        this.state = {
            collection: new Collection(
                0,
                new User(2, 'lescobosa'),
                'Something',
                'description',
                true,
                false,
                [
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
                'Deface'
            ),
            cards: [],
            featuredCard: null,
            collectionList:[]
        }
    }

    getCardObjects = async () => {
        const cardObj = this.state.collection.cards;
        let collectionList1: any[] = [];
        //console.log('mm' + this.state.collection.cards)

        
        for (let i = 0; i < cardObj.length; i++) {
            const cardNum = +cardObj[i].split('x')[0];
            const cardName = cardObj[i].substring(cardObj[i].indexOf(' ') + 1);
            //console.log('cards state'+cardName);
            const resp = await fetch(`https://api.scryfall.com/cards/named?exact=${cardName}`);
            const card = await resp.json();
            collectionList1.push({
                number: +cardNum,
                card
            })
        }
        console.log('cards state 1'+collectionList1);
        this.setState({
            collectionList:collectionList1
        })
        console.log('cards state list'+this.state.collectionList);
    }

    getCollection = async () => {
        const { userId, collectionId }: any = this.props.match.params;
        const resp = await tdClient.get(`/collection/card/${collectionId}`);
        const collection: Collection = resp.data;
        console.log(collection)
        this.setState({
            collection
        })
    }


    getFeaturedCard = async () => {
        const featuredCard = this.state.collection.featuredCard;
        if (featuredCard) {
            const resp = await fetch(`https://api.scryfall.com/cards/named?exact=${featuredCard}`);
            const card = await resp.json();
            if (card.object !== "error") {
                this.setState({
                    featuredCard: card
                })
                console.log('cards'+this.state.collectionList);
            }
        }
    }

    componentWillMount() {
        this.getCardObjects();
        console.log('cards state compmwm'+this.state.collectionList);
        this.getFeaturedCard();
       // console.log('cards'+this.state.featuredCard);
    }

    render() {
        return (
            <CollectionlistDisplayCardComponent
                history={this.props.history}
                location={this.props.location}
                match={this.props.match}
                collection={this.state.collection}
                cards={this.state.collection.cards}
                collectionList={this.state.collectionList}
                featuredCard={this.state.featuredCard} />
        )
    }
}
