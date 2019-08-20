import React from 'react';
import { connect } from 'react-redux';
import { IState } from '../../reducers';
import User from '../../models/user.model';
import Deck from '../../models/deck';
import CardHover from '../card-hover/card.hover.component';

interface IDeckFillerProps {
    deck: any
    featuredCard: any

}

interface IDeckFillerState {
    deckFeaturedCard: any
}

export class DeckFillerComponenet extends React.Component<IDeckFillerProps, IDeckFillerState> {

    constructor(props: any) {
        super(props);
        this.state = {
            deckFeaturedCard: {}
        }
    }


    async componentDidMount() {
        const deck = this.props.deck;
        const card = await this.getCardArt(deck.featuredCard);
        // this.setState = ({
        //    deckFeaturedCard: card
        // });
    }

    getCardArt = async (cardName: string) => {
        const resp = await fetch(`https://api.scryfall.com/cards/named?exact=${cardName}`, {});
        const card = await resp.json();
        return card;
    }


    // updateDeckImage = ( card: any) => {
    //     this.setState = ({
    //         deckFeaturedCard: card
    //     })
    // }


    render() {
        const deck = this.props.deck;
        return (
            <tr key={`deckId-${deck.id}`}>
                <td>{deck.deckName}</td>
                <td>{deck.format.format}</td>
                <td>{deck.featuredCard}</td>
                {/* {console.log(this.state)} */}
                {/* {this.state.featuredCards &&
                <CardHover id={`user-deck-${deck.id}`} card={this.state.featuredCards[deck.id]} />
            } */}
                <td>{deck.deckDescription}</td>
            </tr>
        )
        // end return ()
    }
    // end render()
}

const mapStateToProps = (state: IState) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(DeckFillerComponenet)
