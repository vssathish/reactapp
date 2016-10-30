// src/routes.js
import React from 'react'
import { Route, IndexRoute, IndexRedirect } from 'react-router'
import * as Containers from './containers'

const routes = (
  <Route path="/" component={Containers.App}>

    <IndexRedirect to="overview" />
    <Route path="overview" component={Containers.Overview} />

    <Route path="*" component={Containers.NotFoundPage} />
  </Route>
);

export default routes;
