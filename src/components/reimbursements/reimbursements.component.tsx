import React, { Component, ChangeEvent } from 'react'
import { connect } from 'react-redux'
import { Col, Row, Container, Card, CardBody, CardHeader, ButtonGroup, Button, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, ButtonToolbar, Input } from 'reactstrap';
import { IState } from '../../reducers';
import ReimbursementsTableComponent from '../reimbursements-table/reimbursements.table.component';
import { byId, byStatus } from '../../actions/reimbursements.actions';

interface IReimbursementProps {
    user: any,
    reimbursements: any,
    byId: (id: number, view: number, page: number) => any,
    byStatus: (status: string, view: number, page: number) => any
}

interface IReimbursementState {
    dropdownSearchByIsOpen: boolean,
    dropdownStatusIsOpen: boolean,
    dropdownViewIsOpen: boolean,
    searchBy?: string,
    status: string,
    id: number,
    page: number,
    view: number
}

export class ReimbursementsComponent extends Component<IReimbursementProps, IReimbursementState> {
    constructor(props: any) {
        super(props);

        this.state = {
            dropdownSearchByIsOpen: false,
            dropdownStatusIsOpen: false,
            dropdownViewIsOpen: false,
            status: 'Pending',
            id: this.props.user && this.props.user.user.userId,
            page: 1,
            view: 3
        }
    }

    getReimbursementsByStatus = async (status: string, view: number, page: number) => {
        this.props.byStatus(status, view, page);
    }

    getReimbursementsByID = async (id: number, view: number, page: number) => {
        this.props.byId(id, view, page);
    }

    toggleSearchByDropdown = () => {
        this.setState({
            dropdownSearchByIsOpen: !this.state.dropdownSearchByIsOpen
        })
    }

    toggleStatusDropdown = () => {
        this.setState({
            dropdownStatusIsOpen: !this.state.dropdownStatusIsOpen
        })
    }

    toggleViewDropdown = () => {
        this.setState({
            dropdownViewIsOpen: !this.state.dropdownViewIsOpen
        })
    }

    setSearchBy = (event: any) => {
        const target = event.currentTarget.innerText;
        this.setState({
            searchBy: target,
            page: 1
        })
    }

    setStatus = (event: any) => {
        const target = event.currentTarget.innerText;
        this.setState({
            status: target,
            page: 1
        })
    }

    setView = (event: any) => {
        const target = event.currentTarget.innerText;
        this.setState({
            view: target,
            page: 1
        })
    }

    updateId = (event: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            id: +event.target.value,
            page: 1
        })
    }

    getPage = (newPage: number) => {
        this.setState({
            page: newPage
        })
    }

    componentDidUpdate(prevProps: any, prevState: any) {
        if (prevState !== this.state) {
            switch (this.state.searchBy) {
                case 'Status':
                    this.getReimbursementsByStatus(this.state.status, this.state.view, this.state.page);
                    break;
                case 'User ID':
                    if(this.state.id === 0) {
                        break;
                    }
                    this.getReimbursementsByID(this.state.id, this.state.view, this.state.page)
                    break;
            }
        }
    }

    render() {
        return (
            <Container fluid>
                <Row>
                    <Col sm="3" md="2" className="d-none d-sm-none d-sm-block"></Col>
                    <Col id="main-row" className="bg-light text-center">
                        <Card className="bg-light text-left">
                            <CardHeader><h1 className="h3">{`Reimbursements${(this.state.searchBy) ? ` by ${this.state.searchBy}` : ''}`}</h1></CardHeader>
                            <CardBody>
                                <ButtonToolbar className="justify-content-between mb-2">
                                    <ButtonGroup>
                                        <ButtonDropdown isOpen={this.state.dropdownSearchByIsOpen} toggle={this.toggleSearchByDropdown}>
                                            <DropdownToggle caret>{this.state.searchBy || 'Search By'}</DropdownToggle>
                                            <DropdownMenu className="bg-dark">
                                                <DropdownItem header>Search By</DropdownItem>
                                                <DropdownItem className="bg-dark text-light" onClick={this.setSearchBy}>Status</DropdownItem>
                                                <DropdownItem className="bg-dark text-light" onClick={this.setSearchBy}>User ID</DropdownItem>
                                            </DropdownMenu>
                                        </ButtonDropdown>
                                    </ButtonGroup>
                                    <ButtonGroup>
                                        {(() => {
                                            switch (this.state.searchBy) {
                                                case 'Status':
                                                    return (
                                                        <ButtonDropdown isOpen={this.state.dropdownStatusIsOpen} toggle={this.toggleStatusDropdown}>
                                                            <DropdownToggle caret>{this.state.status}</DropdownToggle>
                                                            <DropdownMenu className="bg-dark">
                                                                <DropdownItem header>Status</DropdownItem>
                                                                <DropdownItem className="bg-dark text-light" onClick={this.setStatus}>Pending</DropdownItem>
                                                                <DropdownItem className="bg-dark text-light" onClick={this.setStatus}>Approved</DropdownItem>
                                                                <DropdownItem className="bg-dark text-light" onClick={this.setStatus}>Denied</DropdownItem>
                                                            </DropdownMenu>
                                                        </ButtonDropdown>
                                                    );
                                                case 'User ID':
                                                    return (
                                                        <Input className="bg-dark text-light" type="number" onChange={this.updateId} value={this.state.id} />
                                                    );
                                                default:
                                                    return;
                                            }
                                        })()}
                                        <ButtonDropdown isOpen={this.state.dropdownViewIsOpen} toggle={this.toggleViewDropdown}>
                                            <DropdownToggle caret>{this.state.view}</DropdownToggle>
                                            <DropdownMenu className="bg-dark">
                                                <DropdownItem header>Per page</DropdownItem>
                                                <DropdownItem className="bg-dark text-light" onClick={this.setView}>1</DropdownItem>
                                                <DropdownItem className="bg-dark text-light" onClick={this.setView}>3</DropdownItem>
                                                <DropdownItem className="bg-dark text-light" onClick={this.setView}>5</DropdownItem>
                                                <DropdownItem className="bg-dark text-light" onClick={this.setView}>10</DropdownItem>
                                                <DropdownItem className="bg-dark text-light" onClick={this.setView}>25</DropdownItem>
                                                <DropdownItem className="bg-dark text-light" onClick={this.setView}>50</DropdownItem>
                                            </DropdownMenu>
                                        </ButtonDropdown>
                                    </ButtonGroup>
                                </ButtonToolbar>
                                {(() => {
                                    switch (this.state.searchBy) {
                                        case 'Status':
                                            return (
                                                <ReimbursementsTableComponent pageFromParent={this.state.page} viewsFromParent={this.state.view} getPage={this.getPage} />
                                            );
                                        case 'User ID':
                                            return (
                                                <ReimbursementsTableComponent pageFromParent={this.state.page} viewsFromParent={this.state.view} getPage={this.getPage} />
                                            );
                                        default:
                                            return;
                                    }
                                })()}
                            </CardBody>
                        </Card>
                    </Col>
                    <Col className="col-2 d-none d-sm-none d-md-block"></Col>
                </Row>
            </Container>
        )
    }
}

const mapStateToProps = (state: IState) => ({
    user: state.auth.currentUser,
    reimbursements: state.reimbursements.reimbursements
})

const mapDispatchToProps = {
    byId,
    byStatus
}

export default connect(mapStateToProps, mapDispatchToProps)(ReimbursementsComponent)
