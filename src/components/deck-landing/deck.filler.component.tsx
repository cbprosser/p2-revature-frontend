import React from 'react';
import { connect } from 'react-redux';
import { IState } from '../../reducers';
import User from '../../models/user.model';
import Deck from '../../models/deck';
import CardHover from '../card-hover/card.hover.component';

interface IDeckFillerProps {
    deck: any,

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
        const resp = await fetch(`https://api.scryfall.com/cards/named?exact=${cardName}`, {        });
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
            <></>
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
