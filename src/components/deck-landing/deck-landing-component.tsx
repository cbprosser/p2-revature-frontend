import React from 'react';
import { connect } from 'react-redux';
import { IState } from '../../reducers';
import { CardColumns, Container, Row, Button, Col } from 'reactstrap';
import DeckDisplay from '../deck-display/deck.display.component';
import { Link } from 'react-router-dom';

interface IDeckLandingProps {

}

interface IDeckLandingState {

}

export class DeckLandingComponenet extends React.Component<IDeckLandingProps, IDeckLandingState> {

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

export default connect(mapStateToProps, mapDispatchToProps)(DeckLandingComponenet)