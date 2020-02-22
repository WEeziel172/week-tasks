import React from 'react';
import logo from './logo.svg';
import './App.css';
import { useQuery } from '@apollo/react-hooks';
import { GET_ALL_TASKS } from './graphql/queries';

function App() {
  const { loading, error, data } = useQuery(GET_ALL_TASKS, {
    onCompleted: (data) => { return console.log(data) }
  });

  return (
    <div className="App">
    </div>
  );
}

export default App;
