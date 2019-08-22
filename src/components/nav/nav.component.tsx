import React, { Component } from 'react';
import { connect } from 'react-redux';
import { IState } from '../../reducers';
import { NavbarToggler, NavbarBrand, Nav, NavLink, NavItem, Collapse, Navbar, CardImg } from 'reactstrap';
import { Link } from 'react-router-dom';
import logo from '../../assets/td.png';
import { checkLocalStorage, logout } from '../../actions/auth.actions';

// FUTURE CHRIS: Change token to be stored in localStorage so you can keep user logged in.

interface INavProps {
  user?: any
  checkLocalStorage: () => any
  logout: () => any
}

interface INavState {
  isOpen: boolean,
  dropdownIsOpen: boolean,
  collapsed: boolean,
  navList: any[]
}

export class NavComponent extends Component<INavProps, INavState> {
  constructor(props: any) {
    super(props);
    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      isOpen: false,
      dropdownIsOpen: false,
      collapsed: true,
      navList: []
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

  logout = () => {
    this.props.logout();
    this.toggleNavbar();
  }

  renderList = () => {
    this.setState({
      navList: (!this.props.user)
      ? [<>
        <NavItem>
          <NavLink><Link className="text-light" onClick={this.toggleNavbar} to="/Login">Login</Link></NavLink>
        </NavItem>
      </>]
      : [<>
        <NavItem>
          <NavLink><Link className="text-light" onClick={this.toggleNavbar} to="/User">User</Link></NavLink>
        </NavItem>
        <NavItem>
          <NavLink><Link className="text-light" onClick={this.toggleNavbar} to="/deck/submit">New Deck</Link></NavLink>
        </NavItem>
        <NavItem>
          <NavLink><Link className="text-light" onClick={this.toggleNavbar} to="/collection/submit">New Collection</Link></NavLink>
        </NavItem>
        <NavItem>
          <NavLink><Link className="text-light" onClick={this.logout} to="/">Log out</Link></NavLink>
        </NavItem>
      </>]
      })
  }

  componentWillMount = () => {
    this.checkForLocalstorageUser();
    this.renderList();
  }

  componentDidUpdate = (prevProps: INavProps) => {
    if(this.props.user !== prevProps.user) {
      this.renderList();
    }
  }

  render() {
    return (
      <div className="d-flex flex-column">
        <Navbar color="faded" dark>
          <NavbarBrand style={{ background: "transparent" }} className="mr-auto text-danger" ><Link to="/"><CardImg src={logo} style={{ width: 100, height: 75 }} /></Link></NavbarBrand>
          <h3 className="d-flex align-self">{this.props.user && this.props.user.username}</h3>
          <NavbarToggler onClick={this.toggleNavbar} className="ml-auto" />
          <Collapse isOpen={!this.state.collapsed} navbar>
            <Nav navbar>
              {this.state.navList}
              {/* Sign-up component render for when you implament the endpoint to allow new users to sign up */}
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
  checkLocalStorage,
  logout
}


export default connect(mapStateToProps, mapDispatchToProps)(NavComponent);