import React from 'react';
import logo from './logo.svg';
import './App.css';
import { useQuery } from '@apollo/react-hooks';
import { GET_ALL_TASKS } from './graphql/queries';
import { Block } from './components/atoms/block/block';
import styled from "styled-components"
import { Paragraph } from './components/atoms/paragraph/paragraph';

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
box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.1);
border-radius: 10px;
`

const ListHeader = styled(Block)`
width: 100%;
border-radius: 10px 10px 0 0;
height: 5rem;
background: #f2f2ff;
display: flex;
justify-content: center;
align-items: center;
`
const Item = styled(Block)`
  width: 100%;
  height: 3rem;
  background: #f9f9ff;
  border-bottom: 0.1px solid #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;

`

const DayHeader = styled(Block)`
width: 100%;
height: 2rem;
display: flex;
padding: 0.5rem;
justify-content: flex-start;
align-items: center;
background: #ececec;
`

const ListItem = (props) => {
  return (
    <Item>
      <img width={"15px"} height={"15px"} src={"https://f0.pngfuel.com/png/817/856/red-and-black-arrow-logo-exclamation-mark-png-clip-art.png"} />
      <Paragraph color={"#79d7dc"}>Siivoa</Paragraph>
    </Item>
  )
}

const ListItemsHeader = props => {
  return (
    <DayHeader>
      <Paragraph color={"#bb407e"}>Maanantai</Paragraph>
    </DayHeader>
  )
}

function App() {
  const { loading, error, data } = useQuery(GET_ALL_TASKS, {
    onCompleted: (data) => { return console.log(data) }
  });

  return (
    <Container width={"50%"} height={"50%"}>
      <List>
        <ListHeader>
          <Paragraph color={"#bf6464"}>
            Todo list

          </Paragraph>
        </ListHeader>
        <ListItemsHeader />
        <ListItem>

        </ListItem>
        <ListItem>

        </ListItem>
        <ListItem>

        </ListItem>
      </List>
    </Container>
  );
}

export default App;
