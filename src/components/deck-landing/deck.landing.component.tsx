import React from 'react';
import { connect } from 'react-redux';
import { IState } from '../../reducers';
import User from '../../models/user.model';
import Deck from '../../models/deck';

interface IDeckLandingProps {
    loggedInUser?: User
}

interface IDeckLandingState {
    decks: any[]
}

export class DeckLandingComponenet extends React.Component<IDeckLandingProps, IDeckLandingState> {

    constructor(props: any) {
        super(props);
        this.state = {
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
                    0,
                    new User(0, 'mjarsenault'),
                    'Modern Cloudfin Raptor',
                    'Another awful deck for Standard',
                    true,
                    false,
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

    // async componentDidMount() {

    //     if (this.props.loggedInUser) {
    //         const userId = this.props.loggedInUser && this.props.loggedInUser.userId;
    //         this.getUsersDecks(userId);
    //     }

    // }

    getUsersDecks = async (userId: number | undefined) => {
        // will be replaced with API call to get decks from the td_deck table that are public
        const resp = await fetch("https://api.scryfall.com/cards?page=" + userId, {
        });

        const userDecks = await resp.json();

        throw new Error("Method not implemented.");
    }


    render() {
        const userDecks = this.state.decks;
        return (
            <div>
                <table className="table table-striped table-light">
                    <thead>
                        <tr>
                            <th scope='col'>Deck Name</th>
                            <th scope='col'>Deck Format</th>
                            <th scope='col'>Deck Featured Card</th>
                            <th scope='col'>Deck Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            userDecks.map(deck =>
                                <tr key={'deckId-' + deck.id}>
                                    <td>{deck.deckName}</td>
                                    <td>{deck.format.format}</td>
                                    <td>{deck.featuredCard}</td>
                                    <td>{deck.deckDescription}</td>
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