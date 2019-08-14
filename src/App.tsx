import React from 'react';
import { store } from './store';
import { Provider } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import NavComponent from './components/nav/nav.component';
import NotFound from './components/not-found/not-found.component';
import LandingPageComponenet from './components/landing-page/landing.page.component';
import LoginComponent from './components/login/login.component';
import IndexComponent from './components/index/index.component';
import { Container, Row, Col } from 'reactstrap';
import { DecklistDisplay } from './components/decklist-display/decklist-display';
import { DecklistSubmission } from './components/deck-submit/decklist.submit.component';


function App() {


  return (
    <Provider store={store}>
      <BrowserRouter>
      <NavComponent/>
        <Container fluid>
          <Row>
            <Col sm="3" md="2" className="d-none d-sm-none d-sm-block"></Col>
            <Col id="main-row" className="bg-light text-center">
              <Switch>

                <Route exact path="/" component={LandingPageComponenet} />
                <Route path="/login" component={LoginComponent} />
                <Route path="/deck/submit" component={DecklistSubmission} />
                <Route path="/deck" component={DecklistDisplay} />
                <Route component={NotFound} />

              </Switch>
            </Col>
            <Col className="col-2 d-none d-sm-none d-md-block"></Col>
          </Row>
        </Container>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
