import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { IState } from '../../reducers';
import { Card, CardImg, CardTitle, CardText, CardColumns, CardSubtitle, Collapse, Progress } from 'reactstrap';
import { Container, Col, Row } from 'reactstrap';

interface ILandingProps {

}

interface ILandingState {
    // manaTypes: any[]
    decks: any[]
    collapse: boolean
}

export class LandingPageComponenet extends React.Component<ILandingProps, ILandingState> {

    constructor(props: any) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            // manaTypes: [],
            decks: [{
                id: 15,
                author: 'RTMater',
                name: 'Filler Deck',
                description: 'This is a filler deck. There are many like it but this one is mine.',
                private: false,
                prototype: true,
                format: 'Standard',
                featuredCard: 'Island'
            },
            {
                id: 16,
                author: 'RTMater2',
                name: 'Filler Deck #2',
                description: 'This is a filler deck. There are many like it but this one is mine.',
                private: false,
                prototype: true,
                format: 'Standard',
                featuredCard: 'Forest'
            },
            {
                id: 17,
                author: 'RTMater',
                name: 'Filler Deck #3',
                description: '',
                private: false,
                prototype: true,
                format: 'Standard',
                featuredCard: 'Swamp'
            },{
                id: 15,
                author: 'RTMater',
                name: 'Filler Deck',
                description: 'This is a filler deck. There are many like it but this one is mine.',
                private: false,
                prototype: true,
                format: 'Standard',
                featuredCard: 'Island'
            },
            {
                id: 16,
                author: 'RTMater2',
                name: 'Filler Deck #2',
                description: 'This is a filler deck. There are many like it but this one is mine.',
                private: false,
                prototype: true,
                format: 'Standard',
                featuredCard: 'Forest'
            },
            {
                id: 17,
                author: 'RTMater',
                name: 'Filler Deck #3',
                description: '',
                private: false,
                prototype: true,
                format: 'Standard',
                featuredCard: 'Swamp'
            },{
                id: 15,
                author: 'RTMater',
                name: 'Filler Deck',
                description: 'This is a filler deck. There are many like it but this one is mine.',
                private: false,
                prototype: true,
                format: 'Standard',
                featuredCard: 'Island'
            },
            {
                id: 16,
                author: 'RTMater2',
                name: 'Filler Deck #2',
                description: 'This is a filler deck. There are many like it but this one is mine.',
                private: false,
                prototype: true,
                format: 'Standard',
                featuredCard: 'Forest'
            },
            {
                id: 17,
                author: 'RTMater',
                name: 'Filler Deck #3',
                description: '',
                private: false,
                prototype: true,
                format: 'Standard',
                featuredCard: 'Swamp'
            },{
                id: 15,
                author: 'RTMater',
                name: 'Filler Deck',
                description: 'This is a filler deck. There are many like it but this one is mine.',
                private: false,
                prototype: true,
                format: 'Standard',
                featuredCard: 'Island'
            },
            {
                id: 16,
                author: 'RTMater2',
                name: 'Filler Deck #2',
                description: 'This is a filler deck. There are many like it but this one is mine.',
                private: false,
                prototype: true,
                format: 'Standard',
                featuredCard: 'Forest'
            },
            {
                id: 17,
                author: 'RTMater',
                name: 'Filler Deck #3',
                description: '',
                private: false,
                prototype: true,
                format: 'Standard',
                featuredCard: 'Swamp'
            },{
                id: 15,
                author: 'RTMater',
                name: 'Filler Deck',
                description: 'This is a filler deck. There are many like it but this one is mine.',
                private: false,
                prototype: true,
                format: 'Standard',
                featuredCard: 'Island'
            },
            {
                id: 16,
                author: 'RTMater2',
                name: 'Filler Deck #2',
                description: 'This is a filler deck. There are many like it but this one is mine.',
                private: false,
                prototype: true,
                format: 'Standard',
                featuredCard: 'Forest'
            },
            {
                id: 17,
                author: 'RTMater',
                name: 'Filler Deck #3',
                description: '',
                private: false,
                prototype: true,
                format: 'Standard',
                featuredCard: 'Swamp'
            }],
            collapse: false
        }
    }



    async componentDidMount() {
        this.state.decks.forEach(async (deck) => {
            const image = await this.getCardArt(deck.featuredCard);
            this.updateDeckImage(deck.featuredCard, image);
        })
    }

    updateDeckImage = (featuredCard: string, deckImage: any) => {
        this.setState({
            decks: this.state.decks.map(deck => {
                if (deck.featuredCard === featuredCard) {
                    return {
                        ...deck,
                        featuredCardImage: deckImage
                    }
                } else {
                    return deck;
                }
            })
        })
    }


    toggle() {
        this.setState(state => ({ collapse: !state.collapse }));
    }

    // getRandomCards = async () => {
    //     const resp = await fetch("https://api.scryfall.com/cards?page=2", {
    //     });
    //     const cardList = await resp.json();
    //     const cl = this.state.cards;
    //     console.log(cardList)
    //     for (let i = 0; i < 40; i++) {
    //         cl.push(cardList.data[i]);

    //     }
    //     this.setState({
    //         ...this.state,
    //         cards: cl
    //     });
    //}// end getRandomCards)()

    // getManaTypes = async () => {
    //     const resp = await fetch("https://api.scryfall.com/symbology", {
    //     });
    //     const mana = await resp.json();
    //     this.setState({
    //         ...this.state,
    //         manaTypes: mana.data
    //     });
    // }

    getCardArt = async (cardName: string) => {
        const resp = await fetch("https://api.scryfall.com/cards/named?exact=" + cardName, {
        });
        const card = await resp.json();
        // const img = card.image_uris.art_crop;// retreive the cropped art of the given card
        return (
            <>
                <CardImg src={card.image_uris.art_crop} onClick={this.toggle} style={{ marginBottom: '1rem' }} top width="100%" alt="Card image cap" />
            </>
        );
    }

    deckColumn = () => {
        const decks = this.state.decks;
        return [
            <>
                <Container >
                    <Row>
                        <Col xs="6" sm="4">
                            {decks.map(deck =>
                                <>
                                    {deck.featuredCardImage}
                                    <Card key={`deck-` + deck.id} style={{ backgroundColor: '#333', borderColor: '#333' }}  >
                                        <Collapse background-color="dark" isOpen={this.state.collapse}>
                                            {/* <Progress multi>  */}
                                                <Progress bar className="text-dark background-white" color="light" value="15">White</Progress>
                                                <Progress bar color="info" value="25">Blue</Progress>
                                                <Progress bar color="dark" value="20">Black</Progress>
                                                <Progress bar color="danger" value="10">Red</Progress>
                                                <Progress bar color="success" value="0">Green</Progress>
                                            {/* </Progress> */}
                                            <Card body inverse color="dark" >
                                                <CardTitle>{deck.name}</CardTitle>
                                                <CardSubtitle>{deck.author}</CardSubtitle>
                                                <CardSubtitle>{deck.format}</CardSubtitle>
                                                {deck.description && <CardText>{deck.description}</CardText>}
                                            </Card>
                                        </Collapse>
                                    </Card>
                                </>
                            )}
                        </Col>
                    </Row>
                </Container>
            </>
        ]
    }
    // end of deckColumn()

    // cardColumns = () => {
    //     const deck = this.state.deck;
    //     return (
    //         <CardColumns background="dark" >

    //             {cards.map(MTGcard => MTGcard.lang === "en"
    //                 ? <><Card style={{ backgroundColor: '#333', borderColor: '#333' }} key={`card-` + MTGcard.id} >
    //                     <CardImg color="dark" background="dark" target={`card-` + MTGcard.id} onClick={this.toggle} style={{ marginBottom: '1rem' }} top width="100%" src={MTGcard.image_uris.art_crop} alt="Card image cap" />
    //                     {/* <Button color="dark" background-color="light" }>Toggle</Button> */}
    //                     <Collapse background-color="dark" isOpen={this.state.collapse}>
    //                         <Progress multi> {/* Example of how we could linerally display deck color content */}
    //                             <Progress bar className="text-dark background-white" color="light" value="15">White</Progress>
    //                             <Progress bar color="info" value="25">Blue</Progress>
    //                             <Progress bar color="dark" value="20">Black</Progress>
    //                             <Progress bar color="danger" value="10">Red</Progress>
    //                             <Progress bar color="success" value="30">Green</Progress>
    //                         </Progress>
    //                         <Card body inverse color="dark">
    //                             <CardTitle>{MTGcard.name}</CardTitle>
    //                             {MTGcard.mana_cost && <CardSubtitle>{MTGcard.mana_cost}</CardSubtitle>}
    //                             {MTGcard.flavor_text && <CardText>"{MTGcard.flavor_text}"</CardText>}
    //                         </Card>
    //                     </Collapse>
    //                 </Card></>
    //                 : <></>
    //             )}
    //         </CardColumns>
    //     )
    // }
    // end of cardColumns()

    render() {
        return (
            <>
                {this.deckColumn()}
            </>
        )
    }
}

const mapStateToProps = (state: IState) => ({

})

const mapDispatchToProps = {
    // decks
}

export default connect(mapStateToProps, mapDispatchToProps)(LandingPageComponenet);


