import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import User from '../../models/user.model';
import CardHover from '../card-hover/card.hover.component';
import { Card, Collapse, CardTitle, CardText, CardImg } from 'reactstrap';

export interface IDeckDisplayProps {
    deck: any
    user: User
}

export interface IDeckDisplayState {
    collapse: boolean
}

export default class LandingPageDeckDisplay extends Component<IDeckDisplayProps, IDeckDisplayState> {
    constructor(props: any) {
        super(props);

        this.state = {
            collapse: false        }
    }

    toggleDropDown = () => {
        this.setState({
            collapse: !this.state.collapse
        });
    }

    render() {
        const deck = this.props.deck;
        return (
            <Card key={`deck-` + deck.id} style={{ backgroundColor: '#333', borderColor: '#333' }}  >
                <CardImg src={deck.featuredCardImage} onClick={this.toggleDropDown} style={{ marginBottom: '1rem' }} top width="100%" alt="Card image cap" />
                <small className="text-muted">Artist: {deck.artist}</small>
                <Collapse background-color="dark" isOpen={this.state.collapse}>
                    {/* <Progress multi>
                        <Progress bar className="text-dark bg-white" color="light" value="25">White</Progress>
                        <Progress bar className="text-white bg-info" value="15">Blue</Progress>
                        <Progress bar className="text-white bg-dark" value="20">Black</Progress>
                        <Progress bar className="text-white bg-danger" value="10">Red</Progress>
                        <Progress bar className="text-white bg-success" value="10">Green</Progress>
                    </Progress> */}
                    <Card body inverse color="dark" className="flex-container justify-content-start">
                        <CardTitle><Link className="text-light" to={`/deck/${deck.id}`} >{deck.deckName}</Link></CardTitle>
                        <CardText className="text-muted">Author: {deck.author.username}</CardText>
                        <CardText className="text-warning">{deck.format}</CardText>
                        {deck.featuredCard
                            ?<CardHover id={`user-deck-${deck.id}`} card={deck.featuredCard} />
                            :<></>
                        }
                    </Card>
                </Collapse>
            </Card>

        )
    }
}