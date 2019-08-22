import React, { Component } from 'react';
import { Button, ButtonGroup, Collapse, Input, InputGroup } from 'reactstrap';
import Collection from '../../models/collection';

interface ICollectionUpdateTogglableProps {
    collection: Collection
    cardsCount: number
    liveUpdateCardInput: (event: any, sideboard?: boolean) => any
}

interface ICollectionUpdateTogglablestate {
    showcards: boolean
    randomCardNumber: number[]
    randomCard: string[]
}

export default class CollectionUpdateTogglable extends Component<ICollectionUpdateTogglableProps, ICollectionUpdateTogglablestate> {
    constructor(props: ICollectionUpdateTogglableProps) {
        super(props);

        this.state = {
            showcards: true,
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
        let collectionlistPlaceholder;
        if (this.state.randomCard.length < 2) {
            collectionlistPlaceholder = '';
        } else {
            collectionlistPlaceholder = `Collectionlist format example:
${this.state.randomCardNumber[0]}x ${this.state.randomCard[0]}
${this.state.randomCardNumber[1]}x ${this.state.randomCard[1]}
${this.state.randomCardNumber[2]}x ...`;
        }

        let sideboardPlaceholder = 'Sideboard format is the same as cards.'

        return (
            <>
                <ButtonGroup className="d-flex w-100" size="sm">
                </ButtonGroup>
                <Collapse isOpen={this.state.showcards}>
                    <InputGroup size="sm">
                        <Input
                            className="bg-dark text-light"
                            type="textarea"
                            id="CollectionListInput"
                            rows={6}
                            // defaultValue={(() => this.setDefaultInputFormat(true))()}
                            placeholder={collectionlistPlaceholder}
                            // onKeyPress={this.props.liveUpdateCardInputEnterKey}
                            onBlur={this.props.liveUpdateCardInput} />
                    </InputGroup>
                </Collapse>
                <Collapse isOpen={!this.state.showcards}>
                    <InputGroup size="sm">
                        <Input
                            className="bg-dark text-light"
                            type="textarea"
                            id="sideBoardInput"
                            rows={6}
                            // defaultValue={(() => this.setDefaultInputFormat(false))()}
                            placeholder={sideboardPlaceholder}
                            // onKeyPress={(event) => this.props.liveUpdateCardInputEnterKey(event, true)}
                            onBlur={(event) => this.props.liveUpdateCardInput(event, true)} />
                    </InputGroup>
                </Collapse>
            </>
        )
    }
}
