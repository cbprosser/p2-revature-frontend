import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Col, Row } from 'reactstrap';
import CollectionLandingPage from './components/collection-components/collection.landing.component';
import CollectionlistSubmitPageComponent from './components/collection-submit/collectionlist.submit.component';
import CollectionlistUpdatePageComponent from './components/collection-update/collectionlist.update.component';
import DeckLandingComponenet from './components/deck-landing/deck.landing.component';
import DecklistSubmitPageComponent from './components/deck-submit/decklist.submit.component';
import DecklistUpdatePageComponent from './components/deck-update/decklist.update.component';
import DecklistDisplayPageComponent from './components/decklist-display/decklist.display.page';
import LandingPageComponenet from './components/landing-page/landing.page.component';
import LoginComponent from './components/login/login.component';
import NavComponent from './components/nav/nav.component';
import NotFound from './components/not-found/not-found.component';
import SignupComponent from './components/sign-up/signup.component';
import UserPageComponent from './components/user-page/user.page.component';
import { store } from './store';
import CollectionlistDisplayPageComponent from './components/collection-components/collectionlist.display.page';

function App() {
  return (

    <Provider store={store}>

      <BrowserRouter>
        <NavComponent />
        <Row>
          <Col sm="3" md="2" className="d-none d-sm-none d-sm-block"></Col>
          <Col id="main-row" className="bg-light text-center">
            <Switch>
              <Route exact path="/" component={LandingPageComponenet} />
              <Route exact path="/login" component={LoginComponent} />
              <Route exact path="/signup" component={SignupComponent} />
              <Route exact path="/user" component={UserPageComponent} />

              <Route path="/deck/landing" component={DeckLandingComponenet} />
              <Route path="/deck/submit" component={DecklistSubmitPageComponent} />
              <Route path="/deck/update" component={DecklistUpdatePageComponent} />
              <Route exact path="/deck/:deckId" component={DecklistDisplayPageComponent} />
              <Route path="/deck/:deckId/update" component={DecklistUpdatePageComponent} />

              <Route path="/collection/landing" component={CollectionLandingPage} />
              <Route path="/collection/submit" component={CollectionlistSubmitPageComponent} />
              <Route path="/collection/update" component={CollectionlistUpdatePageComponent} />
              
              <Route path="/collection/:collectionId/update" component={CollectionlistUpdatePageComponent} />
              <Route path="/collection/:collectionId" component={CollectionlistDisplayPageComponent} />

              <Route component={NotFound} />
            </Switch>
          </Col>
          <Col className="col-2 d-none d-sm-none d-md-block"></Col>
        </Row>
      </BrowserRouter>

    </Provider >

  );
}

export default App;
