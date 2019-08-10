import React from 'react';
import { connect } from 'react-redux';
import { IState, IAuthState } from '../../reducers';
import { Button, Card, CardImg, CardTitle, CardText, CardColumns, CardSubtitle, CardBody } from 'reactstrap';

interface ILandProps {

}

interface ILandState {
    cards: any[]
}

export class LandingPageComponenet extends React.Component<ILandProps, ILandState> {

    constructor(props: any) {
        super(props);
        this.state = {
            cards: []
        }
    }

    async componentDidMount() {
        this.getRandomCards();
    } 

    getRandomCards = async () => {
        const resp = await fetch("https://api.scryfall.com/cards?page=3", {
        });
        const cardList = await resp.json();
        this.setState({
            ...this.state,
            cards: cardList.data
        });
    }

    cardColumns = () => {
        const cards = this.state.cards;
        return (
            <CardColumns>
                {cards.map(aCard =>

                    <Card key={"card" + aCard.name}>
                        <CardImg top width="100%" src={aCard.image_uris.normal} alt="Card image cap" />
                        <CardBody class="">
                            <CardTitle>{aCard.name}</CardTitle>
                            <CardSubtitle>{aCard.mana_cost}</CardSubtitle>
                            <CardText>{aCard.flavor_text}</CardText>
                            <Button>Button</Button>
                        </CardBody>
                        {/* <Card body inverse color="primary">
                                <CardTitle>Special Title Treatment</CardTitle>
                                <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                                <Button color="secondary">Button</Button>
                            </Card> */}
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
