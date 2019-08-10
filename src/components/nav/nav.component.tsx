import React from 'react';
import { Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, Collapse, DropdownToggle, DropdownMenu, DropdownItem, ButtonDropdown, Card, Button, CardImg, CardTitle, CardText, CardColumns, CardSubtitle, CardBody } from 'reactstrap';
// import logo from '../../assets/logo-bw.png';
// import { Link } from 'react-router-dom';
import { IState, IAuthState } from '../../reducers';
import { connect } from 'react-redux';

// FUTURE CHRIS: Change token to be stored in localStorage so you can keep user logged in.

interface INavProps {
  user?: any
}

interface INavState {
  isOpen: boolean,
  dropdownIsOpen: boolean
}

export class NavComponent extends React.Component<INavProps, INavState> {
  constructor(props: any) {
    super(props);

    this.state = {
      isOpen: false,
      dropdownIsOpen: false
    };
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
      <>
      </>
    );
  }// end of render()
}

const mapStateToProps = (state: IState) => ({
  user: state.auth.currentUser
})

export default connect(mapStateToProps)(NavComponent);