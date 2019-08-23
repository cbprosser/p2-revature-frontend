import React, { Component } from 'react';
import { Button, ButtonGroup, Collapse, Input, InputGroup } from 'reactstrap';

interface ICollectionInputTogglableProps {
    cardsCount: number
    liveUpdateCardInput: (event: any) => any
}

interface ICollectionInputTogglablestate {
    showcards: boolean
    randomCardNumber: number[]
    randomCard: string[]
}

export default class CollectionInputTogglable extends Component<ICollectionInputTogglableProps, ICollectionInputTogglablestate> {
    constructor(props: ICollectionInputTogglableProps) {
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
        let CollectionlistPlaceholder;
        if (this.state.randomCard.length < 2) {
            CollectionlistPlaceholder = '';
        } else {
            CollectionlistPlaceholder = `Collectionlist format example:
                        ${this.state.randomCardNumber[0]}x ${this.state.randomCard[0]}
                        ${this.state.randomCardNumber[1]}x ${this.state.randomCard[1]}
                        ${this.state.randomCardNumber[2]}x ...`;
        }



        return (
            <>

                <Collapse isOpen={this.state.showcards}>
                    <InputGroup size="sm">
                        <Input
                            className="bg-dark text-light"
                            type="textarea"
                            id="CollectionListInput"
                            rows={6}
                            placeholder={CollectionlistPlaceholder}
                            // onKeyPress={this.props.liveUpdateCardInputEnterKey}
                            onBlur={this.props.liveUpdateCardInput} />
                    </InputGroup>
                </Collapse>
                <Collapse isOpen={!this.state.showcards}>

                </Collapse>
            </>
        )
    }
}
