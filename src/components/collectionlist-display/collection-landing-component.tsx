import React from 'react';
import { connect } from 'react-redux';
import { IState } from '../../reducers';
import { CardColumns, Container, Row, Button, Col } from 'reactstrap';
import DeckDisplay from '../deck-display/deck.display.component';
import { Link } from 'react-router-dom';

interface ICollectionLandingProps {

}

interface ICollectionLandingState {

}

export class CollectionLandingComponenet extends React.Component<ICollectionLandingProps, ICollectionLandingState> {

    constructor(props: any) {
        super(props);
        this.state = {
           
        }
    }

    render() {
        return (
            <>
            </>
        )
    }
    // end of render()
}

const mapStateToProps = (state: IState) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(CollectionLandingComponenet)