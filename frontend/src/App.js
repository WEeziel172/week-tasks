import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { useQuery } from '@apollo/react-hooks';
import { GET_ALL_TASKS, GET_USER_WEEKLY_TASKS } from './graphql/queries';
import { Block } from './components/atoms/block/block';
import styled from "styled-components"
import { Paragraph } from './components/atoms/paragraph/paragraph';
import { Input } from './components/atoms/input/input';
import * as moment from 'moment';

const Container = styled(Block)`
width: 100%;
height: 100%;
display: flex;
justify-content: center;
align-items: center;
`

const List = styled(Block)`
width: 40%;
box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.1);
border-radius: 10px;
`

const ListHeader = styled(Block)`
width: 100%;
border-radius: 10px 10px 0 0;
height: 3rem;
display: flex;
justify-content: flex-end;
align-items: center;
`
const Item = styled(Block)`
  width: 100%;
  height: 3rem;
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
      <Paragraph color={"#bf6464"}>Siivoa</Paragraph>
    </Item>
  )
}

const ListItemsHeader = props => {
  return (
    <DayHeader>
      <Paragraph color={"#bf6464"}>Maanantai</Paragraph>
    </DayHeader>
  )
}

const WeekInput = styled(Input)`
width: 10rem;
height: 2rem;
border: none;
margin-left: 3rem;
`

const WeekPicker = props => {


  const log = (e) => {
    console.log(moment(e.target.value).toISOString())

  }
  return (
    <WeekInput onChange={(e) => props.onChange(e)} type={"week"} />
  )
}

function App() {

  const [weekDate, setWeekDate] = useState(new Date())
  const { loading, error, data, refetch } = useQuery(GET_USER_WEEKLY_TASKS, {
    variables: { week: weekDate, id: 1 },
    onCompleted: (data) => { return console.log(data) }
  });

  const log = (e) => {
    const date = moment(e.target.value).toISOString()
    setWeekDate(date)
    refetch()

  }
  return (
    <Container width={"50%"} height={"50%"}>
      <List>
        <ListHeader>
          <Paragraph color={"#bf6464"}>
            Todo list
          </Paragraph>
          <WeekPicker onChange={(e) => log(e)} />
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
