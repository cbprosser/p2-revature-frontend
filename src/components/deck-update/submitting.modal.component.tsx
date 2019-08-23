import React, { Component } from 'react';
import Deck from '../../models/deck';
import { Modal, ModalHeader, ModalBody, ModalFooter, Row, Col, ListGroup, ListGroupItem, Spinner } from 'reactstrap';

interface ISubmittingModalComponentState {
    modalIsOpen: boolean
}

interface ISubmittingModalComponentProps {
    submitDeck: Deck
    isOpen: boolean
}

export default class SubmittingModalComponent extends Component<ISubmittingModalComponentProps, ISubmittingModalComponentState> {
    constructor(props: ISubmittingModalComponentProps) {
        super(props);

        this.state = {
            modalIsOpen: false
        }
    }

    toggleModal = () => {
        this.setState({
            modalIsOpen: !this.state.modalIsOpen
        })
    }

    componentDidUpdate(prevProps: ISubmittingModalComponentProps) {
        if (prevProps.isOpen !== this.props.isOpen) {
            this.toggleModal();
        }
    }

    render() {
        return (
            <Modal isOpen={this.state.modalIsOpen}>
                <ModalHeader className="bg-dark">
                    <Spinner /> Submitting {this.props.submitDeck.deckName}...
                </ModalHeader>
                <ModalBody className="bg-dark">
                    You will be re-directed to the deck's page when it is finished submitting.
                </ModalBody>
            </Modal >

        )
    }
}
