import React from 'react';
import { View } from 'react-native';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { IState, IAuthState } from '../../reducers';
import { Button, Card, CardImg, CardTitle, CardText, CardColumns, CardSubtitle, CardBody, Collapse, Progress, Container } from 'reactstrap';

// interface ILandProps {

// }

interface ILandState {
    manaTypes: any[]
    cards: any[]
    collapse: boolean
}

export class LandingPageComponenet extends React.Component<{}, ILandState> {

    constructor(props: any) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            manaTypes: [],
            cards: [],
            collapse: false
        }
    }

    async componentDidMount() {
        this.getRandomCards();
        this.getManaTypes();
    }


    toggle() {
        this.setState(state => ({ collapse: !state.collapse }));
    }

    getRandomCards = async () => {
        const resp = await fetch("https://api.scryfall.com/cards?page=2", {
        });
        const cardList = await resp.json();
        const cl = this.state.cards;
        console.log(cardList)
        for (let i = 0; i < 40; i++) {
            cl.push(cardList.data[i]);

        }
        this.setState({
            ...this.state,
            cards: cl
        });
    }

    getManaTypes = async () => {
        const resp = await fetch("https://api.scryfall.com/symbology", {
        });
        const mana = await resp.json();
        this.setState({
            ...this.state,
            manaTypes: mana.data
        });
    }

    setupMana = async (card: any) => {
        console.log(card.mana_cost);
        const resp = await fetch("http://api.scryfall.com/symbology/parse-mana?cost=" + card.mana_cost, {
        });
        const img = await resp.json();
        console.log('returned img: ' + img);
        return (
            <CardSubtitle>{img.cost}</CardSubtitle>
        );
    }

    cardColumns = () => {
        const cards = this.state.cards;
        return (
            <CardColumns background="dark" >
                
                    {cards.map(MTGcard => MTGcard.lang === "en"
                        ? <><Card style={{ backgroundColor: '#333', borderColor: '#333' }} key={MTGcard.id} >
                            <CardImg color="dark" background="dark" onClick={this.toggle} style={{ marginBottom: '1rem' }} top width="100%" src={MTGcard.image_uris.art_crop} alt="Card image cap" />
                            {/* <Button color="dark" background-color="light" }>Toggle</Button> */}
                            <Collapse background-color="dark" isOpen={this.state.collapse}>
                                <Progress multi> {/* Example of how we could linerally display deck color content */}
                                    <Progress bar text-color="black" value="">White</Progress>
                                    <Progress bar color="success" value="30">Green</Progress>
                                    <Progress bar color="info" value="25">Blue</Progress>
                                    <Progress bar color="dark" value="20">Black</Progress>
                                    <Progress bar color="danger" value="10">Red</Progress>
                                </Progress>
                                <Card body inverse color="dark">
                                    <CardTitle>{MTGcard.name}</CardTitle>
                                    {MTGcard.mana_cost && <CardSubtitle>{MTGcard.mana_cost}</CardSubtitle>}
                                    {MTGcard.flavor_text && <CardText>"{MTGcard.flavor_text}"</CardText>}
                                </Card>
                            </Collapse>
                        </Card></>
                        : <></>
                    )}
            </CardColumns>
        )
    }

    render() {


        // this.getRandomCards();
        return (
            <div>
                {this.cardColumns()}
            </div>
        );
    }// end of render()


}



const mapStateToProps = (state: ILandState) => ({

})

export default connect()(LandingPageComponenet);


