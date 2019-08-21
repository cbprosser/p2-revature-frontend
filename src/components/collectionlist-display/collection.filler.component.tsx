import React from 'react';
import { connect } from 'react-redux';
import { IState } from '../../reducers';
import User from '../../models/user.model';
import Collection from '../../models/collection';
import CardHover from '../card-hover/card.hover.component';

interface ICollectionFillerProps {
    collection: any
    featuredCard: any

}

interface ICollectionFillerState {
    collectionFeaturedCard: any
}

export class CollectionFillerComponenet extends React.Component<ICollectionFillerProps, ICollectionFillerState> {

    constructor(props: any) {
        super(props);
        this.state = {
            collectionFeaturedCard: {}
        }
    }


    async componentDidMount() {
        const collection = this.props.collection;
        const card = await this.getCardArt(collection.featuredCard);
        // this.setState = ({
        //    CollectionFeaturedCard: card
        // });
    }

    getCardArt = async (cardName: string) => {
        const resp = await fetch(`https://api.scryfall.com/cards/named?exact=${cardName}`, {});
        const card = await resp.json();
        return card;
    }


    // updateCollectionImage = ( card: any) => {
    //     this.setState = ({
    //         CollectionFeaturedCard: card
    //     })
    // }


    render() {
        const collection = this.props.collection;
        return (
            <tr key={`CollectionId-${collection.id}`}>
                <td>{collection.collectionName}</td>
                <td>{collection.featuredCard}</td>
                {/* {console.log(this.state)} */}
                {/* {this.state.featuredCards &&
                <CardHover id={`user-Collection-${Collection.id}`} card={this.state.featuredCards[Collection.id]} />
            } */}
                <td>{collection.collectionDescription}</td>
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

export default connect(mapStateToProps, mapDispatchToProps)(CollectionFillerComponenet)
