import React from 'react';
import { ThemeProvider } from '@material-ui/core';
import themeStyle from './theme';
import { Text as Math } from './components';

function App() {
  return (
    <ThemeProvider theme={themeStyle}>
      <Math
        first={3}
        second={0}
        operator="/"
      />
    </ThemeProvider>
  );
}

export default App;
