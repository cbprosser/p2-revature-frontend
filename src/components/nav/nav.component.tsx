import React from 'react';
import { Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, Collapse, DropdownToggle, DropdownMenu, DropdownItem, ButtonDropdown, } from 'reactstrap';
import logo from '../../assets/logo-bw.png';
import { Link } from 'react-router-dom';
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
  }

  toggleNavDropdown = () => {
    this.setState({
      dropdownIsOpen: !this.state.dropdownIsOpen
    });
  }

  render() {
    const user = this.props.user && this.props.user.user;
    return (
      <Navbar className="shadow bg-dark p-0" color="dark" dark fixed="top" expand="sm">
        <NavbarBrand className="col-sm-3 col-md-2 mr-0 text-center py-2">
          <Link to="/"><img src={logo} width="auto" height="25px" alt="Revature Logo" /></Link>
          <NavbarToggler onClick={this.toggleNavButton} className="float-right py-0" />
        </NavbarBrand>
        <Collapse className="px-3" isOpen={this.state.isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              {(() => {
                if (!user) {
                  return <Link className="nav-link" to="/login">Login</Link>
                } else {
                  return (
                    <>
                      <ButtonDropdown isOpen={this.state.dropdownIsOpen} toggle={this.toggleNavDropdown}>
                        <DropdownToggle id="dropdownMenuNavButton" className="nav-link" caret>
                          {user.username}
                        </DropdownToggle>
                        <DropdownMenu className="bg-dark">
                          <DropdownItem header>User Options</DropdownItem>
                          <DropdownItem className="bg-dark"><Link className="nav-link p-0" to="/account">Account</Link></DropdownItem>
                          {(() => {
                            if (user.role && user.role.roleId < 3) { // not null assertion operator
                              return (
                                <>
                                  <DropdownItem divider></DropdownItem>
                                  <DropdownItem header>Finance Options</DropdownItem>
                                  <DropdownItem className="bg-dark"><Link className="nav-link p-0" to="/users">Users</Link></DropdownItem>
                                  <DropdownItem className="bg-dark"><Link className="nav-link p-0" to="/reimbursements">Reimbursements</Link></DropdownItem>
                                </>
                              )
                            }
                          })()}
                          <DropdownItem divider></DropdownItem>
                          <DropdownItem className="bg-dark"><Link className="nav-link p-0" to="/logout">Log Out</Link></DropdownItem>
                        </DropdownMenu>
                      </ButtonDropdown>
                    </>
                  )
                }
              })()}

            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
}

const mapStateToProps = (state: IState) => ({
  user: state.auth.currentUser
})

export default connect(mapStateToProps)(NavComponent);