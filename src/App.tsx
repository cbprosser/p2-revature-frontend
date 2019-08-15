import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Col, Container, Row } from 'reactstrap';
import DecklistDisplayPageComponent from './components/decklist-display/decklist-display-page';
import LandingPageComponenet from './components/landing-page/landing.page.component';
import LoginComponent from './components/login/login.component';
import NavComponent from './components/nav/nav.component';
import NotFound from './components/not-found/not-found.component';
import { store } from './store';


function App() {


  return (

    <Provider store={store}>
      <NavComponent />
      <Container fluid>

        <Row>
          <Col sm="3" md="2" className="d-none d-sm-none d-sm-block"></Col>
          <Col id="main-row" className="bg-light text-center">
            <BrowserRouter>
              <Switch>
                <Route exact path="/" component={LandingPageComponenet} />
                <Route path="/login" component={LoginComponent} />
                <Route path="/deck" component={DecklistDisplayPageComponent} />
                <Route component={NotFound} />
              </Switch>
            </BrowserRouter>
          </Col>
          <Col className="col-2 d-none d-sm-none d-md-block"></Col>
        </Row>
      </Container >
    </Provider >

  );
}

export default App;
