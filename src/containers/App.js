// This file bootstraps the app with the boilerplate necessary
// to support hot reloading in Redux
import React, {PropTypes} from 'react';
import MainMenu from 'components/MainMenu';
import Overview from './Overview';
import { browserHistory } from 'react-router';

class App extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {

    return (
      <div id="app-container" className="container-fluid">
        <MainMenu />

        <div id="app-body">
        	{this.props.children || Overview}
        </div>
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.node,
};

export default App
