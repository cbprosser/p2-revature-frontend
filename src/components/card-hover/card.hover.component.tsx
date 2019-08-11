import React, { Component } from 'react'
import { Button, Popover, PopoverHeader, PopoverBody, UncontrolledPopover } from 'reactstrap';
import { Link } from 'react-router-dom';

interface ICardHoverState {
    card: any,
    popoverIsOpen: boolean
}

interface ICardHoverProps {
    cardName: string,
    id: number
}

export default class CardHover extends Component<ICardHoverProps, ICardHoverState> {
    constructor(props: any) {
        super(props);

        this.state = {
            card: null,
            popoverIsOpen: false
        }
    }

    toggle = () => {
        this.setState({
            popoverIsOpen: !this.state.popoverIsOpen
        });
    }

    getCard = async () => {
        const resp = await fetch(`https://api.scryfall.com/cards/named?exact=${this.props.cardName}`);
        const card = await resp.json();
        if(card.object === 'error'){
            console.log(card)
            return;
        }
        this.setState({
            card
        })
    }

    getImage = () => {
        if(!this.state.card){
            return []
        }

        console.log(this.state.card)

        const card = this.state.card;

        let cardImages = [];
        
        let cardImageUri;

        

        if(card.card_faces){
            card.card_faces.forEach((face: any) => {
                cardImageUri = face.image_uris.small;
                cardImages.push(<img key={`card-url-${cardImageUri}`} src={cardImageUri} alt={`${this.props.cardName} Image`}/>);
            })
        } else {
            cardImageUri = card.image_uris.small;
            cardImages.push(<img key={`card-url-${cardImageUri}`} src={cardImageUri} alt={`${this.props.cardName} Image`}/>);
        }
        
        return cardImages;
    }

    noClick = (event: any) => {
        event.preventDefault();
    }

    componentWillMount() {
        this.getCard();
    }

    render() {
        return (
            <>
                <a className="text-light" href="#" id={'Popover-' + this.props.id} onClick={this.noClick}>
                    {this.props.cardName}
                </a>
                <UncontrolledPopover trigger="legacy" placement="right" isOpen={this.state.popoverIsOpen} target={'Popover-' + this.props.id} toggle={this.toggle}>
                    <PopoverHeader className="bg-dark">{this.props.cardName}</PopoverHeader>
                    <PopoverBody className="p-1">{this.getImage()}</PopoverBody>
                </UncontrolledPopover>
            </>
        )
    }
}
