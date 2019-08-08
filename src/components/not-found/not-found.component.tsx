import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap';

export default class NotFound extends Component {
    render() {
        return (
            <Container fluid>
                <Row>
                    <Col sm="3" md="2" className="d-none d-sm-none d-sm-block"></Col>
                    <Col id="main-row" className="bg-light text-center">Page not found.</Col>
                    <Col className="col-2 d-none d-sm-none d-md-block"></Col>
                </Row>
            </Container>
        )
    }
}
