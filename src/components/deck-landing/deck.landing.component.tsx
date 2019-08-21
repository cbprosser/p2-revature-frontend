import React from 'react';
import { connect } from 'react-redux';
import { IState } from '../../reducers';
import User from '../../models/user.model';
import Deck from '../../models/deck';
import CardHover from '../card-hover/card.hover.component';
import { Link } from 'react-router-dom';

interface IDeckLandingProps {
    loggedInUser?: User
}

interface IDeckLandingState {
    featuredCards: any[]
    decks: Deck[]
}

export class DeckLandingComponenet extends React.Component<IDeckLandingProps, IDeckLandingState> {

    constructor(props: any) {
        super(props);
        this.state = {
            featuredCards: [],
            decks: [
                new Deck(
                    0,
                    new User(0, 'cbprosser'),
                    'Modern Cloudfin Raptor',
                    'Another awful deck for Modern',
                    true,
                    false,
                    {
                        id: 68,
                        format: 'Modern'
                    },
                    [
                        "4x Avatar of the Resolute",
                        "4x Botanical Sanctum",
                        "4x Breeding Pool",
                        "4x Chart a Course",
                        "4x Cloudfin Raptor",
                        "4x Experiment One",
                        "4x Forest",
                        "2x Hinterland Harbor",
                        "2x Island",
                        "4x Pelt Collector",
                        "2x Pongify",
                        "4x Rapid Hybridization",
                        "4x Simic Charm",
                        "4x Strangleroot Geist",
                        "2x Unsubstantiate",
                        "4x Yavimaya Coast",
                        "4x Young Wolf",
                    ],
                    [
                        "3x Mizzium Skin",
                        "3x Negate",
                        "3x Tormod's Crypt",
                        "2x Unsubstantiate",
                        "4x Vapor Snag",
                    ],
                    'Cloudfin Raptor'
                ),
                new Deck(
                    1,
                    new User(0, 'mjarsenault'),
                    'Make Hurty Deck',
                    'Another awful deck for Standard',
                    false,
                    true,
                    {
                        id: 1,
                        format: 'Standard'
                    },
                    [
                        "4x Avatar of the Resolute",
                        "4x Botanical Sanctum",
                        "4x Breeding Pool",
                        "4x Chart a Course",
                        "4x Cloudfin Raptor",
                        "4x Experiment One",
                        "4x Forest",
                        "2x Hinterland Harbor",
                        "2x Island",
                        "4x Pelt Collector",
                        "2x Pongify",
                        "4x Rapid Hybridization",
                        "4x Simic Charm",
                        "4x Strangleroot Geist",
                        "2x Unsubstantiate",
                        "4x Yavimaya Coast",
                        "4x Young Wolf",
                    ],
                    [
                        "3x Mizzium Skin",
                        "3x Negate",
                        "3x Tormod's Crypt",
                        "2x Unsubstantiate",
                        "4x Vapor Snag",
                    ],
                    'Young Wolf'
                )
            ]
        }
    }

    componentWillMount = () => {
        this.getDecks();
        this.getCards(this.state.decks)
    }

    getDecks = async () => {
        const user = this.props.loggedInUser;
        if(user) {
            const resp = await fetch(`http://td-api.us-east-1.elasticbeanstalk.com/deck/${user.id}`, {});
            const userDecks = await resp.json();
            this.setState({
                decks: userDecks
            })
        }

        
    }

    getCards = async (d: Deck[]) => {
        let featuredCards: any[] = [];
         for (let i = 0; i < d.length; i++) {
            const resp = await fetch(`https://api.scryfall.com/cards/named?exact=${d[i].featuredCard}`, {});
            const card = await resp.json();
            featuredCards[i] = card
        };
        console.log(featuredCards);
                this.setState({
                    featuredCards
                })
    }

    // toggleDropDown = (deck: Deck) => {
    //     const private = !deck.isPrivate


    //     this.setState({
    //         decks:
                
            
    //     });
    // }


    render() {
        const userDecks = this.state.decks;
        // console.log(this.state);
        return (
            <div>
                <table className="table table-striped table-dark">
                    <thead>
                        <tr>
                            <th scope='col'>Deck Name</th>
                            <th scope='col'>Format</th>
                            <th scope='col'>Featured Card</th>
                            <th scope='col'>Description</th>
                            <th scope='col'>Public/Private?</th>
                            <th scope='col'>Prototype Deck?</th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            userDecks.map(deck =>
                                <tr key={`deckId-${deck.id}`}>
                                    <td><Link to={`deck/${deck.author.id}/${deck.id}`}>{deck.deckName}</Link></td>
                                    <td>{deck.format.format}</td>
                                    
                                    {this.state.featuredCards &&
                                       <td><CardHover id={`user-deck-${deck.id}`} card={this.state.featuredCards[deck.id]} /></td>
                                    }
                                    <td>{deck.deckDescription}</td>
                                    {deck.isPrivate === true
                                        ?<td>Private</td>
                                        :<td>Public</td>
                                    }
                                    {deck.isPrototype === true
                                        ?<td>Prototype</td>
                                        :<td></td>
                                    }
                                </tr>)
                        }
                    </tbody>
                </table>
            </div>
        )
    }
    // end of render()
}

const mapStateToProps = (state: IState) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(DeckLandingComponenet)