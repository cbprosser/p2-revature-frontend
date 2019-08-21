import React from 'react';
import { connect } from 'react-redux';
import { IState } from '../../reducers';
import User from '../../models/user.model';
import Collection from '../../models/collection';
import CardHover from '../card-hover/card.hover.component';
import { Link } from 'react-router-dom';

interface ICollectionLandingProps {
    loggedInUser?: User
}

interface ICollectionLandingState {
    featuredCards: any[]
    collections: Collection[]
}

export class CollectionLandingComponenet extends React.Component<ICollectionLandingProps, ICollectionLandingState> {

    constructor(props: any) {
        super(props);
        this.state = {
            featuredCards: [],
            collections: [
                new Collection(
                    0,
                    new User(2, 'lescobosa'),
                    'Algo',
                    'es muy bueno',
                    true,
                    false,
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
                    'Pongify'
                ),
                new Collection(
                    1,
                    new User(2, 'lesco'),
                    'es muy malo',
                    'no me gusta',
                    false,
                    true,
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
                    'Young Wolf'
                )
            ]
        }
    }

    componentWillMount = () => {
        this.getCollections();
        this.getCards(this.state.collections)
    }

    getCollections = async () => {
        const user = this.props.loggedInUser;
        if(user) {
            const resp = await fetch(``, {});
            const userCollections = await resp.json();
            this.setState({
                collections: userCollections
            })
        }

        
    }

    getCards = async (d: Collection[]) => {
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

    // toggleDropDown = (Collection: Collection) => {
    //     const private = !Collection.isPrivate


    //     this.setState({
    //         Collections:
                
            
    //     });
    // }


    render() {
        const userCollections = this.state.collections;
        // console.log(this.state);
        return (
            <div>
                <table className="table table-striped table-dark">
                    <thead>
                        <tr>
                            <th scope='col'>Collection Name</th>
                            <th scope='col'>Featured Card</th>
                            <th scope='col'>Description</th>
                            <th scope='col'>Public/Private?</th>
                            <th scope='col'>Prototype Collection?</th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            userCollections.map(Collection =>
                                <tr key={`CollectionId-${Collection.id}`}>
                                    <td><Link to={`Collection/${Collection.author.id}/${Collection.id}`}>{Collection.collectionName}</Link></td>

                                    
                                    {this.state.featuredCards &&
                                       <td><CardHover id={`user-Collection-${Collection.id}`} card={this.state.featuredCards[Collection.id]} /></td>
                                    }
                                    <td>{Collection.collectionDescription}</td>
                                    {Collection.isPrivate === true
                                        ?<td>Private</td>
                                        :<td>Public</td>
                                    }
                                    {Collection.isPrototype === true
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

export default connect(mapStateToProps, mapDispatchToProps)(CollectionLandingComponenet)