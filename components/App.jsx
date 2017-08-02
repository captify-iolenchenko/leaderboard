import React from 'react';
import PropTypes from 'prop-types';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { AppContainer } from 'react-hot-loader';

function App({ children }) {
  return (
    <AppContainer>
      <MuiThemeProvider>
        <div>
          hey
          {children}
        </div>
      </MuiThemeProvider>
    </AppContainer>
  );
}

App.propTypes = {
  children: PropTypes.node.isRequired,
};

export default App;
