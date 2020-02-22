import React from 'react';
import logo from './logo.svg';
import './App.css';
import { useQuery } from '@apollo/react-hooks';
import { GET_ALL_TASKS } from './graphql/queries';
import { Block } from './components/atoms/block/block';

function App() {
  const { loading, error, data } = useQuery(GET_ALL_TASKS, {
    onCompleted: (data) => { return console.log(data) }
  });

  return (
    <Block width={"50%"} height={"50%"}>
      <Block background={"red"} height={"5rem"} width={"100%"}></Block>
    </Block>
  );
}

export default App;
