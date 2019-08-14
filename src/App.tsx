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
import CollectionListDisplay from './components/collectionlist-display/collection-display';


function App() {


  return (
    <Provider store={store}>
      <BrowserRouter>
<<<<<<< HEAD
      <div className="App">
        <NavComponent/>
        <Switch>
          <Route exact path="/" component={IndexComponent}/>
          <Route path="/login" component={LoginComponent}/>
          <Route path="/reimbursements" component={ReimbursementsComponent}/>
          <Route path="/deck" component={DecklistDisplay}/>
          <Route path="/collection" component={CollectionListDisplay}/>
          <Route component={NotFound}/>
        </Switch>
      </div>
=======
        <Container className="App container-fluid">
          <Row>
            <Col sm="10" med="9" style={{flex:10}} content="width=device-width">
              <Switch>
                
                  <Route exact path="/" component={LandingPageComponenet} />
                  <Route path="/login" component={LoginComponent} />
                  <Route path="/deck" component={DecklistDisplay}/>
                  <Route component={NotFound} />
                
              </Switch>
            </Col>

            <Col sm="2" med="3" style={{flex:2}}>
              <NavComponent />
            </Col>
          </Row>
        </Container>
>>>>>>> origin/dev
      </BrowserRouter>
    </Provider>
  );
}

export default App;
