import React, { Component } from 'react';
import { Button, ButtonGroup, Collapse, Input, InputGroup } from 'reactstrap';

interface IDeckInputTogglableProps {
    mainboardCount: number
    sideboardCount: number
    // liveUpdateCardInputEnterKey: (event: React.KeyboardEvent<HTMLInputElement>, sideboard?: boolean) => any
    liveUpdateCardInput: (event: any, sideboard?: boolean) => any
}

interface IDeckInputTogglablestate {
    showMainboard: boolean
    randomCardNumber: number[]
    randomCard: string[]
}

export default class DeckInputTogglable extends Component<IDeckInputTogglableProps, IDeckInputTogglablestate> {
    constructor(props: IDeckInputTogglableProps) {
        super(props);

        this.state = {
            showMainboard: true,
            randomCard: [],
            randomCardNumber: []
        }
    }

    getRandomCard = async () => {
        const resp = await fetch('https://api.scryfall.com/cards/random?q=legal%3Acommander');
        const randCard = await resp.json();
        const randomCard = [randCard.name.toLowerCase()];
        this.setState({
            randomCard: [
                ...this.state.randomCard,
                ...randomCard
            ]
        })
    }

    liveToggleMainboardSideboard = (event: React.MouseEvent<HTMLButtonElement>) => {
        let showMainboard: boolean = true;
        if (event.currentTarget.innerText.includes("Sideboard")) {
            showMainboard = false;
        }
        this.setState({
            showMainboard
        })
    }

    componentWillMount() {
        for (let i = 0; i < 2; i++) {
            this.getRandomCard();
        }
        const randomCardNumber: number[] = [
            Math.ceil(Math.random() * 4),
            Math.ceil(Math.random() * 4),
            Math.ceil(Math.random() * 4)
        ];
        this.setState({
            randomCardNumber
        })
    }

    render() {
        let decklistPlaceholder;
        if (this.state.randomCard.length < 2) {
            decklistPlaceholder = '';
        } else {
            decklistPlaceholder = `Decklist format example:
${this.state.randomCardNumber[0]}x ${this.state.randomCard[0]}
${this.state.randomCardNumber[1]}x ${this.state.randomCard[1]}
${this.state.randomCardNumber[2]}x ...`;
        }

        let sideboardPlaceholder = 'Sideboard format is the same as mainboard.'

        return (
            <>
                <ButtonGroup className="d-flex w-100" size="sm">
                    <Button
                        className="text-left border"
                        color="dark"
                        active={this.state.showMainboard}
                        onClick={this.liveToggleMainboardSideboard}>
                        Mainboard ({this.props.mainboardCount})
                    </Button>
                    <Button
                        className="text-right border"
                        color="dark"
                        active={!this.state.showMainboard}
                        onClick={this.liveToggleMainboardSideboard}>
                        ({this.props.sideboardCount}) Sideboard
                    </Button>
                </ButtonGroup>
                <Collapse isOpen={this.state.showMainboard}>
                    <InputGroup size="sm">
                        <Input
                            className="bg-dark text-light"
                            type="textarea"
                            id="deckListInput"
                            rows={6}
                            placeholder={decklistPlaceholder}
                            // onKeyPress={this.props.liveUpdateCardInputEnterKey}
                            onBlur={this.props.liveUpdateCardInput} />
                    </InputGroup>
                </Collapse>
                <Collapse isOpen={!this.state.showMainboard}>
                    <InputGroup size="sm">
                        <Input
                            className="bg-dark text-light"
                            type="textarea"
                            id="sideBoardInput"
                            rows={6}
                            placeholder={sideboardPlaceholder}
                            // onKeyPress={(event) => this.props.liveUpdateCardInputEnterKey(event, true)}
                            onBlur={(event) => this.props.liveUpdateCardInput(event, true)} />
                    </InputGroup>
                </Collapse>
            </>
        )
    }
}
