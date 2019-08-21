import React from 'react';
import { connect } from 'react-redux';
import { IState } from '../../reducers';
import User from '../../models/user.model';
import Collection from '../../models/collection';
import CardHover from '../card-hover/card.hover.component';
import { Link, RouteComponentProps } from 'react-router-dom';
import CollectionlistDisplayPageComponent from './collectionlist.display.page';
import { Collapse, Button } from 'reactstrap';

interface ICollectionLandingProps extends RouteComponentProps {
    loggedInUser?: User
}

interface ICollectionLandingState {
    featuredCards: any[]
    collections: Collection[]
    collectionID: any
    isOpen: boolean,
    dropdownIsOpen: boolean,
    collapsed: boolean
}

export class CollectionLandingComponenet extends React.Component<ICollectionLandingProps, ICollectionLandingState> {

    constructor(props: any) {
        super(props);
        this.toggleCards = this.toggleCards.bind(this);
        this.state = {
            featuredCards: [],
            collectionID: 0,
            isOpen: false,
            dropdownIsOpen: false,
            collapsed: true,
            collections: [
                new Collection(
                    1,
                    new User(2, 'lesco'),
                    'hola',
                    'es muy bueno',
                    true,
                    false,
                    [],
                    'Young Wolf'
                ),
                new Collection(
                    2,
                    new User(2, 'lesco'),
                    'muy',
                    'es muy malo',
                    false,
                    true,
                    [],
                    'Young Wolf'
                )
            ]
        }
    }

    componentWillMount = () => {
        this.getCollections();
        this.getCards(this.state.collections)
        // console.log('landing' + this.state.collections);
    }

    getCollections = async () => {
        const user = this.props.loggedInUser;
        if (user) {
            const resp = await fetch(``, {});
            // const resp = await fetch(`http://td-api.us-east-1.elasticbeanstalk.com/deck/${user.id}`, {});
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

    toggleCards() {
        this.setState({
          collapsed: !this.state.collapsed
        });
      }

      toggleNavButton = () => {
        this.setState({
          isOpen: !this.state.isOpen
        });
      }
      // end of toggleNavButton
    
      toggleNavDropdown = () => {
        this.setState({
          dropdownIsOpen: !this.state.dropdownIsOpen
        });
      }

    render() {
        const userCollections = this.state.collections;

        console.log('sup' + this.state.collectionID);
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
                            userCollections.map(collection =>
                                <tr key={`CollectionId-${collection.id}`}>
                                    <td>
                                        <Link to={`collection/${collection.author.id}/${collection.id}`}>{collection.collectionName}
                                        </Link></td>

                                    {/* 
                                //    <td><Link to={`/collection/${collection.author.id}/${deck}`} >{collection.deckName}</Link></td> */}


                                    {this.state.featuredCards &&
                                        <td><CardHover id={`user-Collection-${collection.id}`} card={this.state.featuredCards[collection.id]} /></td>
                                    }
                                    <td>{collection.collectionDescription}</td>
                                    {collection.isPrivate === true
                                        ? <td>Private</td>
                                        : <td>Public</td>
                                    }
                                    {collection.isPrototype === true
                                        ? <td>Prototype</td>
                                        : <td></td>
                                    }
                                    


                                    <td onClick={this.toggleCards}>cards
                                    <Collapse isOpen={!this.state.collapsed} >
                                            <CollectionlistDisplayPageComponent
                                                history={this.props.history}
                                                location={this.props.location}
                                                match={this.props.match}
                                                collections={collection}
                                                featuredCards={this.state.featuredCards}
                                                collectionID={collection.id}
                                            />
                                        </Collapse>
                                    </td>

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