import React, { Component } from 'react'
import { Container, Row, Col, Card, CardBody } from 'reactstrap';

export default class IndexComponent extends Component {
    render() {
        return (
            <Container fluid>
                <Row>
                    <Col sm="3" md="2" className="d-none d-sm-none d-sm-block"></Col>
                    <Col id="main-row" className="bg-light">
                        <Card className="bg-light">
                            <CardBody>
                                <p>Welcome to my Project 1 demo!</p>
                                <p>Above, you'll be able to select 'login' and provide the credentials I gave you.</p>
                                <p>When you do, you'll see the login button has been replaced with a dropdown menu.</p>
                                <p>Go ahead and view your profile, submit a reimbursement or two, and then modify your account. Maybe do this a few times over the next few days to see the changes to the status of your reimbursements.</p>
                                <p>If anything looks weird, please screenshot it and send it to me so I can try and fix it.</p>
                                <p>This page may change its look over the next week as well, I'm still toying around with it.</p>
                                <p>You can access the "Reimbursements" page and the "Users" page, but you shouldn't be able to do anything with them. If you <strong>can</strong>, please let me know because that's bad.</p>
                                <p>Remember, if you change your password and forget it, I can't recover it, I can only manually reset it to something else!</p>
                                <p>Thank you!</p>
                                <h6 className="text-muted">Oh, and please remember that this is going to be publicly shown to my bosses. Feel free to joke about with your reimbursement descriptions, but nothing that is NSFW please :)</h6>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col className="col-2 d-none d-sm-none d-md-block"></Col>
                </Row>
            </Container>
        )
    }
}
