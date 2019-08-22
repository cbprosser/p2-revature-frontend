import React, { Component } from 'react';
import { connect } from 'react-redux';
import { IState } from '../../reducers';
import { NavbarToggler, NavbarBrand, Nav, NavLink, NavItem, Collapse, Navbar, CardImg } from 'reactstrap';
import { Link } from 'react-router-dom';
import logo from '../../assets/td.png';
import { checkLocalStorage } from '../../actions/auth.actions';

// FUTURE CHRIS: Change token to be stored in localStorage so you can keep user logged in.

interface INavProps {
  user?: any
  checkLocalStorage: () => any
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
  // end of toggleNavbar

  toggleNavButton = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  // end of toggleNavButton

  toggleNavDropdown = () => {
    this.setState({
      dropdownIsOpen: !this.state.dropdownIsOpen
    });
  }
  // end of toggleNaveDropdown

  checkForLocalstorageUser = () => {
    this.props.checkLocalStorage();
  }

  componentWillMount = () => {
    this.checkForLocalstorageUser();
  }

  render() {
    console.log("Navbar - User:")
    console.log(this.props.user);
    return (
      <div className="d-flex flex-column">
        <Navbar color="faded" dark>
          <NavbarBrand style={{ background: "transparent" }} className="mr-auto text-danger" ><Link to="/"><CardImg src={logo} style={{ width: 100, height: 75 }} /></Link></NavbarBrand>
          <h2 className="d-flex align-self-bottom">{this.props.user && this.props.user.username}</h2>
          <NavbarToggler onClick={this.toggleNavbar} className="ml-auto" />
          <Collapse isOpen={!this.state.collapsed} navbar>
            <Nav navbar>
              <NavItem>
                {this.props.user === undefined
                  ? <NavLink><Link className="text-light" onClick={this.toggleNavbar} to="/Login">Login</Link></NavLink>
                  : <>
                    <NavLink><Link className="text-light" onClick={this.toggleNavbar} to="/User">User</Link></NavLink>
                    <NavItem>
                      <NavLink><Link className="text-light" onClick={this.toggleNavbar} to="/deck/submit">Deck</Link></NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink><Link className="text-light" onClick={this.toggleNavbar} to="/collection/landing">Collections</Link></NavLink>
                    </NavItem>
                  </>
                }
              </NavItem>
              {/* <NavLink><Link className="text-light" onClick={this.toggleNavbar} to="/Signup">Signup</Link></NavLink> */}
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
  // end of render()
}

const mapStateToProps = (state: IState) => ({
  user: state.auth.currentUser
})

const mapDispatchToProps = {
  checkLocalStorage
}


export default connect(mapStateToProps, mapDispatchToProps)(NavComponent);