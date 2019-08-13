import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import NotFound from './components/not-found/not-found.component';
import NavComponent from './components/nav/nav.component';
import LoginComponent from './components/login/login.component';
import IndexComponent from './components/index/index.component';
import ReimbursementsComponent from './components/reimbursements/reimbursements.component';
import { DecklistDisplay } from './components/decklist-display/decklist-display';
import CollectionListDisplay from './components/collectionlist-display/collection-display';

function App() {

  
  return (
    <Provider store={store}>
      <BrowserRouter>
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
      </BrowserRouter>
    </Provider>
  );
}

export default App;
