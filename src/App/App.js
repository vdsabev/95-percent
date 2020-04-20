import React from 'react';
import styled from 'styled-components';

import { usePromise } from '../hooks';
import services from '../services';

const App = () => {
  const questions = usePromise(services.getQuestions, []);
  return (
    <AppContainer>
      <pre>{JSON.stringify(questions, null, 2)}</pre>
    </AppContainer>
  );
};

export default App;

const AppContainer = styled.div``;
