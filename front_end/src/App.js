import React from 'react';
import {
  Route, Switch, BrowserRouter, Redirect,
} from 'react-router-dom';
import Provider from './context/Provider';
import {
  LoginPage,
  SignUpPage,
  SchoolsPage,
  ClassesPage,
  ClassDetailsPage,
  AddSchoolsPage,
  AddClassPage,
} from './pages';

import './style/body.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Provider>
          <Switch>
            <Route exact path="/login" component={ LoginPage } />
            <Route exact path="/cadastro" component={ SignUpPage } />
            <Route exact path="/escolas" component={ SchoolsPage } />
            <Route exact path="/escolas/cadastrar" component={ AddSchoolsPage } />
            <Route exact path="/turmas/:idSchool" component={ ClassesPage } />
            <Route exact path="/turmas/cadastrar/:idSchool" component={ AddClassPage } />
            <Route exact path="/turmas/detalhes/:idSchool/:idClass" component={ ClassDetailsPage } />
            <Route exact path="/" component={ () => <Redirect to="/login" /> } />
          </Switch>
        </Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
