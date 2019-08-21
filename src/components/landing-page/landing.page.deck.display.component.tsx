import { connect } from 'http2';
import { IState } from '../../reducers';
import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import User from '../../models/user.model';
import CardHover from '../card-hover/card.hover.component';
import { Card, Collapse, Progress, CardTitle, CardSubtitle, CardText, CardImg } from 'reactstrap';

export interface IDeckDisplayProps {
    deck: any
    user: any
}

export interface IDeckDisplayState {
    collapse: boolean
}

export default class LandingPageDeckDisplay extends Component<IDeckDisplayProps, IDeckDisplayState> {
    constructor(props: any) {
        super(props);

        this.state = {
            collapse: false
        }
    }

    toggleDropDown = () => {
        this.setState({
            collapse: !this.state.collapse
        });
    }

    render() {
        const deck = this.props.deck;
        const loggedUser = this.props.user;
        return (
            <Card key={`deck-` + deck.id} style={{ backgroundColor: '#333', borderColor: '#333' }}  >
                <CardImg src={deck.featuredCardImage} onClick={this.toggleDropDown} style={{ marginBottom: '1rem' }} top width="100%" alt="Card image cap" />
                <small className="text-muted">Artist: {deck.artist}</small>
                <Collapse background-color="dark" isOpen={this.state.collapse}>
                    {/* <CardSubtitle>Artist: {deck.author}</CardSubtitle> */}
                    {/* <Progress multi>
                        <Progress bar className="text-dark bg-white" color="light" value="25">White</Progress>
                        <Progress bar className="text-white bg-info" value="15">Blue</Progress>
                        <Progress bar className="text-white bg-dark" value="20">Black</Progress>
                        <Progress bar className="text-white bg-danger" value="10">Red</Progress>
                        <Progress bar className="text-white bg-success" value="10">Green</Progress>
                    </Progress> */}
                    <Card body inverse color="dark" className="flex-container flex-space-around" >
                        <CardTitle><Link to={`/deck/${deck.author.id}/${deck.id}`} >{deck.deckName}</Link></CardTitle>
                        <CardSubtitle className="text-muted">Author: {deck.author}</CardSubtitle>
                        <CardSubtitle className="text-warning">{deck.format}</CardSubtitle>
                        <CardHover id={`user-deck-${deck.id}`} card={deck.featuredCard} />
                        {deck.description && <CardText className="text-info">{deck.description}</CardText>}
                    </Card>
                </Collapse>
            </Card>

        )
    }
}