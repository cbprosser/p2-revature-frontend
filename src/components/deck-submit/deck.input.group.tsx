import React, { Component } from 'react'
import { InputGroup, InputGroupAddon, InputGroupText, Input, ButtonGroup, Button, CustomInput } from 'reactstrap';

interface IDeckInputGroupProps {
    isPrivate: boolean
    isPrototype: boolean
    deckFormat: string
    liveUpdateDeckName: (event: any) => any
    liveTogglePrivate: () => any
    liveTogglePrototype: () => any
    liveSelectFormat: (event: any) => any
    liveUpdateFeaturedCard: (event: any) => any
    testFeaturedCard: () => any
}

interface IDeckInputGroupState {
    isPrivate: boolean
    isPrototype: boolean
    deckFormat: string
}

export default class DeckInputGroup extends Component<IDeckInputGroupProps, IDeckInputGroupState> {
    constructor(props: IDeckInputGroupProps) {
        super(props);

        this.state = {
            isPrivate: false,
            isPrototype: true,
            deckFormat: 'Casual'
        }
    }

    componentWillMount() {
        this.setState({
            isPrivate: this.props.isPrivate,
            isPrototype: this.props.isPrototype,
            deckFormat: this.props.deckFormat
        })
    }

    componentDidUpdate(prevProps: any) {
        if (this.props != prevProps) {
            this.setState({
                isPrivate: this.props.isPrivate,
                isPrototype: this.props.isPrototype,
                deckFormat: this.props.deckFormat
            })
        }
    }

    render() {
        return (
            <>
                <InputGroup className="mb-2" size="sm">
                    <InputGroupAddon className="bg-dark text-light" addonType="prepend">
                        <InputGroupText className="bg-dark text-light">Deck Name</InputGroupText>
                    </InputGroupAddon>
                    <Input
                        className="bg-dark text-light"
                        type="text"
                        id="deckNameInput"
                        onChange={this.props.liveUpdateDeckName} />
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
                    <InputGroupAddon className="bg-dark text-light" addonType="prepend">
                        <InputGroupText className="bg-dark text-light">Format</InputGroupText>
                    </InputGroupAddon>
                    <CustomInput
                        className="bg-dark text-light"
                        type="select"
                        id="formatSelectInput"
                        onChange={this.props.liveSelectFormat}
                        defaultValue={this.props.deckFormat}>
                        <option value="Casual">Casual</option>
                        <option value="Standard">Standard</option>
                        <option value="Commander">Commander</option>
                        <option value="Modern">Modern</option>
                        <option value="Pauper">Pauper</option>
                        <option value="Legacy">Legacy</option>
                        <option value="Vintage">Vintage</option>
                        <option value="Brawl">Brawl</option>
                    </CustomInput>
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
