import React from 'react';
import { connect } from 'react-redux';
import { IState } from '../../reducers';
import User from '../../models/user.model';
import Collection from '../../models/collection';
import CardHover from '../card-hover/card.hover.component';
import { Link, RouteComponentProps } from 'react-router-dom';
import CollectionlistDisplayPageComponent from './collectionlist.display.page';
import { Collapse, Button } from 'reactstrap';
import authReducer from '../../reducers/auth.reducer';


interface ICollectionLandingProps extends RouteComponentProps {
    user?: User
}

interface ICollectionLandingState {
    featuredCards: any[]
    collections: Collection[]
    collectionID: any
    expandedRows: any[]
}

export class CollectionLandingComponenet extends React.Component<ICollectionLandingProps, ICollectionLandingState> {

    constructor(props: any) {
        super(props);
        this.state = {
            featuredCards: [],
            collectionID: 0,
            expandedRows: [],
            collections: []
        }
    }

    componentWillMount = () => {

        if (this.props.user) {
            this.getCollection();
        } else {
            this.pushToFrontpageWithError("You must login to view your collections.");
        }
    }

    pushToFrontpageWithError = (errorMessage: string) => {
        this.props.history.push('/', { errorMessage });
    }

    getCollection = async () => {
        const user = this.props.user;

        if (user && user.id) {
            console.log('user'+ user.id);
            const resp = await fetch(`http://td-api.us-east-1.elasticbeanstalk.com/collection/author/${user.id}`, {});
            const userCollections = await resp.json();
            this.setState({
                collections: userCollections
            })
            this.getCollectionCards(userCollections);
        }
    }

    getCollectionCards = async (d: Collection[]) => {
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

    rowClick = (rid: number) => {
        const currentExpandedRows = this.state.expandedRows;
        const isRowExpanded = currentExpandedRows.includes(rid); // Is it already expanded?
        const newExpandedRows = (isRowExpanded) ? currentExpandedRows.filter(id => id !== rid) : currentExpandedRows.concat(rid); // if it is, filter it out, if it isn't, add it in.
        this.setState({
            expandedRows: newExpandedRows
        })
    }

    createRow = (rid: number) => {
        const data = this.state.collections;
        // if (!data || this.state.collections === 'Found no reimbursements' || data.length === 0 || (data && data[0].amount === null)) {
        //     return;
        // }
        const rowClickCallback = () => { this.rowClick(data![rid].id) }; // Moved out of line due to needing to pass in event variables
        let row = [
            (

                    <tr onClick={rowClickCallback} key={`parentRow${data![rid].id}`}>
                        <td>
                            <Link to={`collection/${data![rid].author.id}/${data![rid].id}`}>{data![rid].collectionName}
                            </Link></td>
                        {this.state.featuredCards &&
                            <td><CardHover id={`user-Collection-${data![rid].id}`} card={this.state.featuredCards[data![rid].id]} /></td>
                        }
                        <td>{data![rid].collectionDescription}</td>
                        {data![rid].isPrivate === true
                            ? <td>Private</td>
                            : <td>Public</td>
                        }
                        {data![rid].isPrototype === true
                            ? <td>Prototype</td>
                            : <td></td>
                        }

                    </tr>
            )];
        if (this.state.expandedRows.includes(data![rid].id)) {
            row.push(
                    <tr key={`childRow${data![rid].id}`}>
                        <td>
                            <CollectionlistDisplayPageComponent
                                history={this.props.history}
                                location={this.props.location}
                                match={this.props.match}
                                collections={data![rid]}
                                featuredCards={this.state.featuredCards}
                                collectionID={data![rid].id}
                            />
                        </td>

                    </tr>
            )
        }

        return row;
    }

    render() {
        const userCollections = this.state.collections;

        let allRows: any[] = [];

        const length: number = (userCollections) ? userCollections.length : 0;

        for (let i = 0; i < length; i++) {
            allRows.push(this.createRow(i));
        }

        const allDataLength: number = (userCollections.length) ? userCollections.length : 0;

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
                        {allRows}
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

export default connect(mapStateToProps, mapDispatchToProps)(CollectionLandingComponenet)