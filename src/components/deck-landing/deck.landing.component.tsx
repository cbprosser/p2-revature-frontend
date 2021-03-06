import React from 'react';
import Deck from '../../models/deck';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { IState } from '../../reducers';
import User from '../../models/user.model';
import CardHover from '../card-hover/card.hover.component';

export interface IDeckLandingProps extends RouteComponentProps {
    user?: User
}

export interface IDeckLandingState {
    featuredCards: any[]
    decks: Deck[]
}

export class DeckLandingComponenet extends React.Component<IDeckLandingProps, IDeckLandingState> {

    constructor(props: any) {
        super(props);
        this.state = {
            featuredCards: [],
            decks: []
        }
    }

    pushToFrontpageWithError = (errorMessage: string) => {
        this.props.history.push('/', { errorMessage });
    }

    componentWillMount = () => {
        if (this.props.user) {
            this.getDecks(); 
        } else {
            this.pushToFrontpageWithError("You must login to view your decks.")
        }
    }

    getDecks = async () => {
        const user = this.props.user;
        if (user && user.id) {
            const resp = await fetch(`http://td-api.us-east-1.elasticbeanstalk.com/deck/author/${user.id}`, {});
            const userDecks = await resp.json();
            this.setState({
                decks: userDecks
            })
            this.getCards(userDecks);
        }


    }

    getCards = async (d: Deck[]) => {
        let featuredCards: any[] = [];
        for (let i = 0; i < d.length; i++) {
            const resp = await fetch(`https://api.scryfall.com/cards/named?exact=${d[i].featuredCard}`, {});
            const card = await resp.json();
            if(card.object !== 'error'){
            featuredCards[d[i].id] = card
            }
        };
        this.setState({
            featuredCards
        })
    }

    render() {
        const userDecks = this.state.decks;
        const loggedUser = this.props.user;

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

                                    <td><Link className="text-light" to={`/deck/${deck.id}`} >{deck.deckName}</Link></td>

                                    <td>{deck.format.format}</td>

                                    {this.state.featuredCards
                                        ?<td><CardHover id={`user-deck-${deck.id}`} card={this.state.featuredCards[deck.id]} /></td>
                                        :<td></td>
                                    }
                                    <td>{deck.deckDescription}</td>
                                    {deck.isPrivate === true
                                        ? <td>Private</td>
                                        : <td>Public</td>
                                    }
                                    {deck.isPrototype === true
                                        ? <td>Prototype</td>
                                        : <td></td>
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
    user: state.auth.currentUser
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(DeckLandingComponenet)