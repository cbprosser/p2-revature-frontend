import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Col, Container, Row } from 'reactstrap';
import { DecklistSubmitPageComponent } from './components/deck-submit/decklist.submit.component';
import DecklistDisplayPageComponent from './components/decklist-display/decklist-display-page';
import LandingPageComponenet from './components/landing-page/landing.page.component';
import LoginComponent from './components/login/login.component';
import NavComponent from './components/nav/nav.component';
import NotFound from './components/not-found/not-found.component';
import { store } from './store';
import { DecklistUpdatePageComponent } from './components/deck-update/decklist.update.component';


function App() {


  return (

    <Provider store={store}>
      <Container fluid>

        <BrowserRouter>
          <NavComponent />
          <Row>
            <Col sm="3" md="2" className="d-none d-sm-none d-sm-block"></Col>
            <Col id="main-row" className="bg-light text-center">
              <Switch>
                <Route exact path="/" component={LandingPageComponenet} />
                <Route path="/login" component={LoginComponent} />
                <Route exact path="/deck/:userId/:deckId" component={DecklistDisplayPageComponent} />
                <Route path="/deck/submit" component={DecklistSubmitPageComponent} />
                <Route path="/deck/:userId/:deckId/update" component={DecklistUpdatePageComponent} />
                <Route component={NotFound} />
              </Switch>
            </Col>
            <Col className="col-2 d-none d-sm-none d-md-block"></Col>
          </Row>
        </BrowserRouter>
      </Container >
    </Provider >

  );
}

export default App;
