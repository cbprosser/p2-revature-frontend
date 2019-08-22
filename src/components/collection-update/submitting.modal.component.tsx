import React, { Component } from 'react';
import Collection from '../../models/collection';
import { Modal, ModalHeader, ModalBody, ModalFooter, Row, Col, ListGroup, ListGroupItem, Spinner } from 'reactstrap';

interface ISubmittingModelCollectionComponentState {
    modalIsOpen: boolean
}

interface ISubmittingModelCollectionComponentProps {
    submitCollection: Collection
    isOpen: boolean
}

export default class SubmittingModelCollectionComponent extends Component<ISubmittingModelCollectionComponentProps, ISubmittingModelCollectionComponentState> {
    constructor(props: ISubmittingModelCollectionComponentProps) {
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

    componentDidUpdate(prevProps: ISubmittingModelCollectionComponentProps) {
        if (prevProps.isOpen !== this.props.isOpen) {
            this.toggleModal();
        }
    }

    render() {
        return (
            <Modal isOpen={this.state.modalIsOpen}>
                <ModalHeader className="bg-dark">
                    <Spinner /> Submitting {this.props.submitCollection.collectionName}...
                </ModalHeader>
                <ModalBody className="bg-dark">
                    You will be re-directed to the Collection's page when it is finished submitting.
                </ModalBody>
            </Modal >

        )
    }
}
