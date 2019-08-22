import React, { Component } from 'react'
import { InputGroup, InputGroupAddon, InputGroupText, Input, ButtonGroup, Button, CustomInput } from 'reactstrap';
import Collection from '../../models/collection';

interface ICollectionUpdateGroupProps {
    collection: Collection
    liveUpdateCollectionName: (event: any) => any
    liveTogglePrivate: () => any
    liveTogglePrototype: () => any
    liveSelectFormat: (event: any) => any
    liveUpdateFeaturedCard: (event: any) => any
    testFeaturedCard: () => any
}

interface ICollectionUpdateGroupState {
    isPrivate: boolean
    isPrototype: boolean
}

export default class CollectionUpdateGroup extends Component<ICollectionUpdateGroupProps, ICollectionUpdateGroupState> {
    constructor(props: ICollectionUpdateGroupProps) {
        super(props);

        this.state = {
            isPrivate: false,
            isPrototype: true
        }
    }

    componentDidMount() {
        this.setState({
             isPrivate: this.props.collection.isPrivate,
             isPrototype: this.props.collection.isPrototype
        })
    }

    componentDidUpdate(prevProps: any) {
        if (this.props !== prevProps) {
            this.setState({
                 isPrivate: this.props.collection.isPrivate,
                 isPrototype: this.props.collection.isPrototype
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
                        // defaultValue={this.props.collection.collectionName}
                        onChange={this.props.liveUpdateCollectionName} />
                </InputGroup>
                <InputGroup className="mb-2">
                    <ButtonGroup className="d-flex w-100" size="sm">
                        <Button
                            className="text-left border"
                            color="dark"
                            // active={this.props.collection.isPrivate}
                            // onClick={this.props.liveTogglePrivate}
                            >
                            Private
                        </Button>
                        <Button
                            className="text-right border"
                            color="dark"
                            id="tooltip-prototype"
                            // active={this.props.collection.isPrototype}
                            // onClick={this.props.liveTogglePrototype}
                            >
                            Prototype
                        </Button>
                    </ButtonGroup>
                </InputGroup>
                <InputGroup className="mb-2" size="sm">
                    <InputGroupAddon className="bg-dark text-light" addonType="prepend">
                        <InputGroupText className="bg-dark text-light">Featured Card</InputGroupText>
                    </InputGroupAddon>
                    <Input
                        className="bg-dark text-light"
                        type="text"
                        id="featuredCardInput"
                        // defaultValue={this.props.collection.featuredCard}
                        onChange={this.props.liveUpdateFeaturedCard}
                        onBlur={this.props.testFeaturedCard} />
                </InputGroup>
            </>
        )
    }
}
