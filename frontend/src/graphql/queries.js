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

export {
    GET_ALL_TASKS
}