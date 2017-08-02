import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { AppContainer } from 'react-hot-loader';

import Snack from './Snack';
import Toolbar from './Toolbar';
import Table from './Table';

function App({ auth, data }) {
  return (
    <AppContainer>
      <MuiThemeProvider>
        <div style={{ margin: '0 auto', position: 'relative', width: 700 }}>
          <img src="captify-logo.png" alt="Captify" width="500" height="150" style={{ margin: '0 100px' }} />
          <Toolbar auth={auth} />
          {_.map(data, (rows, title) => <Table data={rows} title={title} key={title} />)}
          <Snack />
          <div style={{ textAlign: 'right' }}>
            <h4>THE FUTURES BOARD</h4>
            <h5><em>Amelia, Amy, Corin, Dave, Illia, Lloyd, Lucy, Oleksandr</em></h5>
          </div>
        </div>
      </MuiThemeProvider>
    </AppContainer>
  );
}

App.propTypes = {
  auth: PropTypes.shape({
    handleSignoutClick: PropTypes.func.isRequired,
  }).isRequired,
  data: PropTypes.shape({}).isRequired,
};

export default connect(state => ({
  isSigned: state.auth,
  data: state.data,
}))(App);
