import React from 'react';
import { store } from './store';
import { Provider } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import NavComponent from './components/nav/nav.component';
import NotFound from './components/not-found/not-found.component';
import LandingPageComponenet from './components/landing-page/landing.page.component';
import LoginComponent from './components/login/login.component';
// import IndexComponent from './components/index/index.component';
import ReimbursementsComponent from './components/reimbursements/reimbursements.component';
import { Container, Row, Col } from 'reactstrap';

function App() {


  return (
    <Provider store={store}>
      <BrowserRouter>
        <Container className="App" style={{flex:12, justifyContent: 'space-between'}}>
          <Row>
            <Col sm="10" med="9" style={{flex:10}}>
              <Switch>
                
                  <Route exact path="/" component={LandingPageComponenet} />
                  <Route path="/login" component={LoginComponent} />
                  <Route path="/reimbursements" component={ReimbursementsComponent} />
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
