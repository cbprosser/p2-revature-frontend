import React from 'react';
import { connect } from 'react-redux';
import { IState, IAuthState } from '../../reducers';
import { Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, Collapse, DropdownToggle, DropdownMenu, DropdownItem, ButtonDropdown, Card, Button, CardImg, CardTitle, CardText, CardColumns, CardSubtitle, CardBody } from 'reactstrap';

interface ILandProps {

}

interface ILandState {

}

export class LandingPageComponenet extends React.Component<ILandProps, ILandState> {

    constructor(props: any) {
        super(props);
    }


    cardColumns = () => {
        return (
            <CardColumns>
                <Card>
                    <CardImg top width="100%" src="https://img.scryfall.com/cards/large/front/8/b/8b457672-902b-42c0-9d53-a3c21be2f500.jpg?1562923137" alt="Card image cap" />
                    <CardBody>
                        <CardTitle>Card title</CardTitle>
                        <CardSubtitle>Card subtitle</CardSubtitle>
                        <CardText>This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</CardText>
                        <Button>Button</Button>
                    </CardBody>
                </Card>
                <Card>
                    <CardImg top width="100%" src="https://img.scryfall.com/cards/large/front/5/5/5542d236-af43-43b8-b30f-8980d74bbdd0.jpg?1562914979" alt="Card image cap" />
                </Card>
                <Card>
                    <CardBody>
                        <CardTitle>Card title</CardTitle>
                        <CardSubtitle>Card subtitle</CardSubtitle>
                        <CardText>This card has supporting text below as a natural lead-in to additional content.</CardText>
                        <Button>Button</Button>
                    </CardBody>
                </Card>
                <Card body inverse style={{ backgroundColor: '#333', borderColor: '#333' }}>
                    <CardTitle>Special Title Treatment</CardTitle>
                    <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                    <Button>Button</Button>
                </Card>
                <Card>
                    <CardImg top width="100%" src="https://img.scryfall.com/cards/large/front/5/e/5eb5a137-ecdd-41df-9708-7aca9bcbe032.jpg?1562545068" alt="Card image cap" />
                    <CardBody>
                        <CardTitle>Card title</CardTitle>
                        <CardSubtitle>Card subtitle</CardSubtitle>
                        <CardText>This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.</CardText>
                        <Button>Button</Button>
                    </CardBody>
                </Card>
                <Card body inverse color="primary">
                    <CardTitle>Special Title Treatment</CardTitle>
                    <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                    <Button color="secondary">Button</Button>
                </Card>
            </CardColumns>
        )
    }

    render() {
        return (
            <>
                {this.cardColumns()}
            </>
        );
    }// end of render()
}

export default connect()(LandingPageComponenet);
