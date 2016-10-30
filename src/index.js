import 'babel-polyfill';

import React from 'react';
import {render} from 'react-dom';
import App from './containers/App';

import { Router, Route, browserHistory, hashHistory, IndexRedirect } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import { Button } from 'react-bootstrap';
import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';

import * as Containers from './containers';
import routes from './routes'

import './styles/styles.scss'; //Yep, that's right. You can import SASS/CSS files too! Webpack will run the associated loader and plug this into the page.
import './styles/bootstrap.css';
import './styles/bootstrap-theme.css';
import './styles/font-awesome.css';
import 'react-select/dist/react-select.css';
import './styles/highlight.scss';

render(
    <Router onUpdate={() => window.scrollTo(0, 0)} history = {browserHistory} routes={routes}>

    </Router>, document.getElementById('app')
);
