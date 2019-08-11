import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { IState, IAuthState } from '../../reducers';
import { Button, Card, CardImg, CardTitle, CardText, CardColumns, CardSubtitle, CardBody } from 'reactstrap';

// interface ILandProps {

// }

interface ILandState {
    manaTypes: any[]
    cards: any[]
}

export class LandingPageComponenet extends React.Component<{}, ILandState> {

    constructor(props: any) {
        super(props);
        this.state = {
            manaTypes: [],
            cards: []
        }
    }

    async componentDidMount() {
        this.getRandomCards();
        this.getManaTypes();
    }

    getRandomCards = async () => {
        const resp = await fetch("https://api.scryfall.com/cards?page=4", {
        });
        const cardList = await resp.json();
        const cl = this.state.cards;
        console.log(cardList)
        for(let i = 0; i < 25; i++){
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
            <CardColumns>
                {cards.map(MTGcard  =>

                    <Card key={MTGcard.id}>
                        <CardImg top width="100%" src={MTGcard.image_uris.normal} alt="Card image cap" />

                        <Card body inverse color="primary">
                            <CardTitle>{MTGcard.name}</CardTitle>
                            <CardSubtitle>{MTGcard.mana_cost}</CardSubtitle> 
                            <CardText>{MTGcard.flavor_text}</CardText>
                            <Button>Button</Button>
                        </Card>
                    </Card>
                )
                }
            </CardColumns>
        )
    }

    render() {
        const cards = this.state.cards;

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


