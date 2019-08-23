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
              <Route exact path="./public/" component={LandingPageComponenet} />
              <Route exact path="./public/login" component={LoginComponent} />
              <Route exact path="./public/signup" component={SignupComponent} />
              <Route exact path="./public/user" component={UserPageComponent} />

              <Route path="./public/deck/landing" component={DeckLandingComponenet} />
              <Route path="./public/deck/submit" component={DecklistSubmitPageComponent} />
              <Route path="./public/deck/update" component={DecklistUpdatePageComponent} />
              <Route exact path="./public/deck/:deckId" component={DecklistDisplayPageComponent} />
              <Route path="./public/deck/:deckId/update" component={DecklistUpdatePageComponent} />

              <Route path="./public/collection/landing" component={CollectionLandingPage} />
              <Route path="./public/collection/submit" component={CollectionlistSubmitPageComponent} />
              <Route path="./public/collection/update" component={CollectionlistUpdatePageComponent} />
              
              <Route path="./public/collection/:collectionId/update" component={CollectionlistUpdatePageComponent} />
              <Route path="./public/collection/:collectionId" component={CollectionlistDisplayPageComponent} />

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
