import React, { Component } from 'react';
import { Card, Collapse, Progress, CardTitle, CardSubtitle, CardText, CardImg } from 'reactstrap';

interface IDeckDisplayProps {
    deck: any
}

interface IDeckDisplayState {
    collapse: boolean
}

export default class DeckDisplay extends Component<IDeckDisplayProps, IDeckDisplayState> {
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
        return (

            <Card key={`deck-` + deck.id} style={{ backgroundColor: '#333', borderColor: '#333' }}  >
                <CardImg src={deck.featuredCardImage} onClick={this.toggleDropDown} style={{ marginBottom: '1rem' }} top width="100%" alt="Card image cap" />
                <Collapse background-color="dark" isOpen={this.state.collapse}>
                    <CardSubtitle>Artist: {deck.author}</CardSubtitle>
                    <Progress multi>
                        <Progress bar className="text-dark bg-white" color="light" value="25">White</Progress>
                        <Progress bar className="text-white bg-info" value="15">Blue</Progress>
                        <Progress bar className="text-white bg-dark" value="20">Black</Progress>
                        <Progress bar className="text-white bg-danger" value="10">Red</Progress>
                        <Progress bar className="text-white bg-success" value="10">Green</Progress>
                    </Progress>
                    <Card body inverse color="dark" >
                        <CardTitle>{deck.name}</CardTitle>
                        <CardSubtitle>{deck.author}</CardSubtitle>
                        <CardSubtitle>{deck.format}</CardSubtitle>
                        {deck.description && <CardText>{deck.description}</CardText>}
                    </Card>
                </Collapse>
            </Card>

        )
    }
}