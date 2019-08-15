import React, { Component } from 'react';
import { ListGroup, ListGroupItem, Modal, ModalBody, ModalFooter, ModalHeader, PopoverBody, UncontrolledPopover, Col, Row } from 'reactstrap';

interface ICardHoverState {
    popoverIsOpen: boolean,
    modalIsOpen: boolean
}

interface ICardHoverProps {
    card: any,
    id: any
}

export default class CardHover extends Component<ICardHoverProps, ICardHoverState> {
    constructor(props: any) {
        super(props);

        this.state = {
            popoverIsOpen: false,
            modalIsOpen: false
        }
    }

    togglePopover = () => {
        this.setState({
            popoverIsOpen: !this.state.popoverIsOpen
        });
    }

    toggleModal = () => {
        this.setState({
            modalIsOpen: !this.state.modalIsOpen
        })
    }

    getImage = (type: string) => {
        if (!this.props.card) {
            return []
        }
        const card = this.props.card;
        let cardImages = [];
        let cardImageUri;

        if (card.layout === "transform") {
            card.card_faces.forEach((face: any) => {
                cardImageUri = (type === 'small') ? face.image_uris.small : face.image_uris.png;
                cardImages.push(<img className={`card-img-${type}`} key={`card-url-${cardImageUri}`} src={cardImageUri} alt={`${this.props.card.name} Image`} />);
            })
        } else {
            cardImageUri = (type === 'small') ? card.image_uris.small : card.image_uris.png;
            cardImages.push(<img className={`card-img-${type}`} key={`card-url-${cardImageUri}`} src={cardImageUri} alt={`${this.props.card.name} Image`} />);
        }

        return cardImages;
    }

    noClickPopover = (event: any) => {
        event.preventDefault();
    }

    noClickModal = (event: any) => {
        event.preventDefault();
        this.togglePopover();
        this.toggleModal();
    }

    render() {
        const cardFront = this.props.card.name.split(' // ')[0];
        return (
            <>
                <a className="text-light" href="#" id={`Popover-${this.props.id}`} onClick={this.noClickPopover}>
                    {cardFront}
                </a>
                <UncontrolledPopover className="popver-width-for-cards" trigger="legacy" placement="right" isOpen={this.state.popoverIsOpen} target={`Popover-${this.props.id}`} toggle={this.togglePopover}>
                    <PopoverBody className="p-1"><a href="#" id={`Popover-Modal-${this.props.id}`} onClick={this.noClickModal}>{this.getImage('small')}</a></PopoverBody>
                </UncontrolledPopover>
                <Modal isOpen={this.state.modalIsOpen} toggle={this.toggleModal}>
                    <ModalHeader className="bg-dark" toggle={this.toggleModal}>
                        {this.props.card.name}
                    </ModalHeader>
                    <ModalBody>
                        {this.getImage('normal')}
                    </ModalBody>
                    <ModalFooter className="bg-dark p-2">
                        <Row>
                            <Col className="col-4">
                                <ListGroup flush className="bg-transparent text-left">
                                    <ListGroupItem className="bg-transparent border-0 p-0">
                                        <a className="text-light" href={this.props.card.scryfall_uri}>See this card on Scryfall</a>
                                    </ListGroupItem>
                                </ListGroup>
                            </Col>
                            <Col className="col-8">
                                <ListGroup flush className="bg-transparent text-right">
                                    <ListGroupItem className="bg-transparent border-0 p-0">
                                        {`${this.props.card.prices.tix} tix, $${this.props.card.prices.usd} ($${this.props.card.prices.usd_foil} foil)`}
                                    </ListGroupItem>
                                    <ListGroupItem className="bg-transparent border-0 p-0">
                                        Buy from: <a className="text-light" href={this.props.card.purchase_uris.tcgplayer} target="_blank">TCGPlayer</a>, <a className="text-light" href={this.props.card.purchase_uris.cardhoarder} target="_blank">CardHoarder</a>, <a className="text-light" href={this.props.card.purchase_uris.cardmarket} target="_blank">CardMarket</a>
                                    </ListGroupItem>
                                </ListGroup>
                            </Col>
                        </Row>
                    </ModalFooter>
                </Modal >
            </>
        )
    }
}
