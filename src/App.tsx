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


function App() {


  return (
    <Provider store={store}>
      <BrowserRouter>
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
      </BrowserRouter>
    </Provider>
  );
}

export default App;
