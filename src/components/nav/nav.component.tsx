import React, { Component } from 'react';
import { connect } from 'react-redux';
import { IState } from '../../reducers';
import { NavbarToggler, NavbarBrand, Nav, NavLink, NavItem, Collapse, Container, Row, Col } from 'reactstrap';
// import logo from '../../assets/logo-bw.png';

// FUTURE CHRIS: Change token to be stored in localStorage so you can keep user logged in.

interface INavProps {
  user?: any
}

interface INavState {
  isOpen: boolean,
  dropdownIsOpen: boolean,
  collapsed: boolean
}

export class NavComponent extends Component<INavProps, INavState> {
  constructor(props: any) {
    super(props);
    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      isOpen: false,
      dropdownIsOpen: false,
      collapsed: true
    };
  }


  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  toggleNavButton = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }// end of toggleNavButton

  toggleNavDropdown = () => {
    this.setState({
      dropdownIsOpen: !this.state.dropdownIsOpen
    });
  }// end of toggleNaveDropdown



  render() {
    return (
      <Container fluid>
        <Row>
          <Col sm="2">
            <NavbarBrand href="/" className="mr-auto">TempoDeck</NavbarBrand>
            <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
            <Collapse isOpen={!this.state.collapsed} navbar>
              <Nav navbar >
                <NavItem>
                  <NavLink href="/deck">Decks</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/Collections/">Collections</NavLink>
                </NavItem>
              </Nav>
            </Collapse>
          </Col>
        </Row>
      </Container>
    );
  }// end of render()
}

const mapStateToProps = (state: IState) => ({
  user: state.auth.currentUser
})

export default connect(mapStateToProps)(NavComponent);