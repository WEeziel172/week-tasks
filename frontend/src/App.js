import React from 'react';
import logo from './logo.svg';
import './App.css';
import { useQuery } from '@apollo/react-hooks';
import { GET_ALL_TASKS } from './graphql/queries';
import { Block } from './components/atoms/block/block';
import styled from "styled-components"

const Container = styled(Block)`
width: 100%;
height: 100%;
display: flex;
justify-content: center;
align-items: center;
`

const List = styled(Block)`
width: 40%;
height: 50%;
box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
border-radius: 10px;
`

const ListHeader = styled(Block)`
width: 100%;
height: 5rem;
background: #f2f2ff;
`
const Item = styled(Block)`
width: 5rem;
height: 5rem;
`

function App() {
  const { loading, error, data } = useQuery(GET_ALL_TASKS, {
    onCompleted: (data) => { return console.log(data) }
  });

  return (
    <Container width={"50%"} height={"50%"}>
      <List>
        <ListHeader>
          <Paragraph>

          </Paragraph>
        </ListHeader>
        <Item background={"red"} height={"5rem"} width={"100%"}></Item>
        <Item background={"red"} height={"5rem"} width={"100%"}></Item>
        <Item background={"red"} height={"5rem"} width={"100%"}></Item>
      </List>
    </Container>
  );
}

export default App;
