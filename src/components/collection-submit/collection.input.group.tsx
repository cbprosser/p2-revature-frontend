import React, { Component } from 'react'
import { InputGroup, InputGroupAddon, InputGroupText, Input, ButtonGroup, Button, CustomInput } from 'reactstrap';

interface ICollectionInputGroupProps {
    isPrivate: boolean
    isPrototype: boolean
    liveUpdateCollectionName: (event: any) => any
    liveTogglePrivate: () => any
    liveTogglePrototype: () => any
    liveUpdateFeaturedCard: (event: any) => any
    testFeaturedCard: () => any
}

interface ICollectionInputGroupState {
    isPrivate: boolean
    isPrototype: boolean
    CollectionFormat: string
}

export default class CollectionInputGroup extends Component<ICollectionInputGroupProps, ICollectionInputGroupState> {
    constructor(props: ICollectionInputGroupProps) {
        super(props);

        this.state = {
            isPrivate: false,
            isPrototype: true,
            CollectionFormat: 'Casual'
        }
    }

    componentWillMount() {
        this.setState({
            isPrivate: this.props.isPrivate,
            isPrototype: this.props.isPrototype
            
        })
    }

    componentDidUpdate(prevProps: any) {
        if (this.props !== prevProps) {
            this.setState({
                isPrivate: this.props.isPrivate,
                isPrototype: this.props.isPrototype
             
            })
        }
    }

    render() {
        return (
            <>
                <InputGroup className="mb-2" size="sm">
                    <InputGroupAddon className="bg-dark text-light" addonType="prepend">
                        <InputGroupText className="bg-dark text-light">Collection Name</InputGroupText>
                    </InputGroupAddon>
                    <Input
                        className="bg-dark text-light"
                        type="text"
                        id="CollectionNameInput"
                        onChange={this.props.liveUpdateCollectionName} />
                </InputGroup>
                <InputGroup className="mb-2">
                    <ButtonGroup className="d-flex w-100" size="sm">
                        <Button
                            className="text-left border"
                            color="dark"
                            active={this.state.isPrivate}
                            onClick={this.props.liveTogglePrivate}>
                            Private
                        </Button>
                        <Button
                            className="text-right border"
                            color="dark"
                            id="tooltip-prototype"
                            active={this.state.isPrototype}
                            onClick={this.props.liveTogglePrototype}>
                            Prototype
                        </Button>
                    </ButtonGroup>
                </InputGroup>
                <InputGroup className="mb-2" size="sm">
                  
                </InputGroup>
                <InputGroup className="mb-2" size="sm">
                    <InputGroupAddon className="bg-dark text-light" addonType="prepend">
                        <InputGroupText className="bg-dark text-light">Featured Card</InputGroupText>
                    </InputGroupAddon>
                    <Input
                        className="bg-dark text-light"
                        type="text"
                        id="featuredCardInput"
                        onChange={this.props.liveUpdateFeaturedCard}
                        onBlur={this.props.testFeaturedCard} />
                </InputGroup>
            </>
        )
    }
}
