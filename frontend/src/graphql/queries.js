import { gql } from 'apollo-boost';

const GET_ALL_TASKS = gql`
query GetAllTasks {
  allTasks {
    nodes {
      body
      completed
      createdAt
      date
      id
    }
  }
}
`
const GET_USER_WEEKLY_TASKS = gql`
query GetUserWeeklyTasksFixit($id: Int!, $week: Date!) {
  getUserWeeklyTasksFixit(id: $id, week: $week) {
    nodes {
      body
      completed
      date
      id
    }
  }
}
`
export {
  GET_ALL_TASKS,
  GET_USER_WEEKLY_TASKS
}