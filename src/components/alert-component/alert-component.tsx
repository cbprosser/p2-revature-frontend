import React, { Component } from 'react'
import { Alert, ListGroupItemHeading, ListGroup } from 'reactstrap';

interface IAlertComponentState {
    isOpen: boolean
}

interface IAlertComponentProps {
    message?: string
}

export default class AlertComponent extends Component<IAlertComponentProps,IAlertComponentState> {
    constructor(props: IAlertComponentProps) {
        super(props);

        this.state = {
            isOpen: false
        }
    }

    toggleAlert = () => {
        this.setState({
            isOpen: false
        })
    }

    componentDidMount = () => {
        if(this.props.message) {
            this.setState({
                isOpen: true
            })
        }
    }

    render() {
        return (
            <Alert color="danger" isOpen={this.state.isOpen} toggle={this.toggleAlert}>
                {this.props.message}
            </Alert>
        )
    }
}
