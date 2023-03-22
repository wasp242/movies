import React from 'react';
import { Route } from 'react-router-dom';
import MainPage from './pages/MainPage/MainPage';
import ListPage from './pages/ListPage/ListPage';

import './reset.css';
import './common.css';

export default function App(){

  return (
    <div className="app">
      <Route path="/" exact component={MainPage} />
      <Route path="/list/:id" exact component={ListPage} />
    </div>
  );
}

